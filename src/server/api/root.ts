import { createTRPCRouter } from "compas/server/api/trpc";
import { compasRouter } from "./routers/compas";
import { experiencesRouter } from "./routers/experiences";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  experiences: experiencesRouter,
  compas: compasRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
