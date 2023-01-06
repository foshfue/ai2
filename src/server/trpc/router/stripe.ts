import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { getOrCreateStripeCustomerIdForUser } from "../../stripe/stripe-webhook-handlers";
import { router, protectedProcedure } from "../trpc";

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure
    .input(z.object({ userPackage: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { stripe, session, prisma, req } = ctx;

      const userPackage = input.userPackage;

      const priceItem =
        userPackage === "basic"
          ? env.STRIPE_PRICE_ID_1
          : userPackage === "premium"
          ? env.STRIPE_PRICE_ID_2
          : env.STRIPE_PRICE_ID_3;

      const purchaseItem = {
        price: priceItem,
        quantity: 1,
      };

      const customerId = await getOrCreateStripeCustomerIdForUser({
        prisma,
        stripe,
        userId: session.user?.id,
      });

      if (!customerId) {
        throw new Error("Could not create customer");
      }

      const baseUrl =
        env.NODE_ENV === "development"
          ? `http://${req.headers.host}`
          : `https://${req.headers.host}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: session.user?.id,
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [purchaseItem],
        success_url: `${baseUrl}/app/account?checkoutSuccess=true`,
        cancel_url: `${baseUrl}/app/account?checkoutCanceled=true`,
        subscription_data: {
          metadata: {
            userId: session.user?.id,
          },
        },
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),
  createBillingPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const { stripe, session, prisma, req } = ctx;

    const customerId = await getOrCreateStripeCustomerIdForUser({
      prisma,
      stripe,
      userId: session.user?.id,
    });

    if (!customerId) {
      throw new Error("Could not create customer");
    }

    const baseUrl =
      env.NODE_ENV === "development"
        ? `http://${req.headers.host}`
        : `https://${req.headers.host}`;

    const stripeBillingPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/app/account`,
      });

    if (!stripeBillingPortalSession) {
      throw new Error("Could not create billing portal session");
    }

    return { billingPortalUrl: stripeBillingPortalSession.url };
  }),
});
