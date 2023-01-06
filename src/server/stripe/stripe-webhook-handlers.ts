import type { PrismaClient } from "@prisma/client";
import type Stripe from "stripe";
import { env } from "../../env/server.mjs";

// retrieves a Stripe customer id for a given user if it exists or creates a new one
export const getOrCreateStripeCustomerIdForUser = async ({
  stripe,
  prisma,
  userId,
}: {
  stripe: Stripe;
  prisma: PrismaClient;
  userId: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // create a new customer
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    // use metadata to link this Stripe customer to internal user id
    metadata: {
      userId,
    },
  });

  // update with new customer id
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeCustomerId: customer.id,
    },
  });

  if (updatedUser.stripeCustomerId) {
    return updatedUser.stripeCustomerId;
  }
};

export const handleInvoicePaid = async ({
  event,
  stripe,
  prisma,
}: {
  event: Stripe.Event;
  stripe: Stripe;
  prisma: PrismaClient;
}) => {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = invoice.subscription;
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId as string
  );
  const userId = subscription.metadata.userId;
  const subscriptionItems = await stripe.subscriptionItems.list({
    subscription: subscriptionId as string,
  });

  //TODO: FIX
  const priceId = subscriptionItems.data[0]?.price.id;

  const userPackage =
    priceId === env.STRIPE_PRICE_ID_1
      ? "basic"
      : priceId === env.STRIPE_PRICE_ID_2
      ? "premium"
      : "pro";

  const coinIncement =
    userPackage === "basic" ? 15 : userPackage === "premium" ? 60 : 260;

  // update user with subscription data
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
      stripeSubscriptionPlan: userPackage,
      coins: {
        increment: coinIncement,
      },
    },
  });
};

export const handleSubscriptionCreatedOrUpdated = async ({
  event,
  prisma,
  stripe,
}: {
  event: Stripe.Event;
  prisma: PrismaClient;
  stripe: Stripe;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  // TODO: FIX
  const priceId = subscription.items.data[0]?.price.id;

  const userPackage =
    priceId === env.STRIPE_PRICE_ID_1
      ? "basic"
      : priceId === env.STRIPE_PRICE_ID_2
      ? "premium"
      : "pro";

  // const changeExists= userPackage !==
  //TODO:FIX THE upgrade down grade

  const coinIncement =
    userPackage === "basic" ? 15 : userPackage === "premium" ? 60 : 260;

  // update user with subscription data
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
      stripeSubscriptionPlan: userPackage,
      // coins: {
      //   increment: coinIncement,
      // },
    },
  });
};

export const handleSubscriptionCanceled = async ({
  event,
  prisma,
}: {
  event: Stripe.Event;
  prisma: PrismaClient;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  // remove subscription data from user
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeSubscriptionId: null,
      stripeSubscriptionStatus: null,
      stripeSubscriptionPlan: null,
    },
  });
};
