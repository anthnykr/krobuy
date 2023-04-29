import { checkoutRouter } from "./routers/checkout";
import { signupRouter } from "./routers/signup";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  checkout: checkoutRouter,
  signup: signupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
