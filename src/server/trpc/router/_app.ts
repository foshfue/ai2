import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { stripeRouter } from "./stripe";
import { summaryRouter } from "./summary";
import { userRouter } from "./user";
import { videoRouter } from "./video";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  summary: summaryRouter,
  video: videoRouter,
  user: userRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
