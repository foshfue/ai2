import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    }),
  getMyInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),

  subscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx;

    if (!session.user?.id) {
      throw new Error("Not authenticated");
    }

    const data = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        stripeSubscriptionStatus: true,
        stripeSubscriptionPlan: true,
      },
    });

    if (!data) {
      throw new Error("Could not find user");
    }

    return {
      stripeSubscriptionStatus: data.stripeSubscriptionStatus,
      stripeSubscriptionPlan: data.stripeSubscriptionPlan,
    };
  }),
  

});
