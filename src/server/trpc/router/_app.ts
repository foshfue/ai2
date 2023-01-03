import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { summaryRouter } from "./summary";
import { userRouter } from "./user";
import { videoRouter } from "./video";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  summary: summaryRouter,
  video: videoRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
