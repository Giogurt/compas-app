import { createTRPCRouter } from "compas/server/api/trpc";
import { compasRouter } from "./routers/compas";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  compas: compasRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
