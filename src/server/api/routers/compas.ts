import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "compas/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";

export const compasRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: privateProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        description: z.string(),
        country: z.string(),
        state: z.string(),
        city: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const clerkData = {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        unsafeMetadata: {
          description: input.description,
          country: input.country,
          state: input.state,
          city: input.city,
        },
      };
      clerkClient.users.updateUser(ctx.userId, clerkData);
      const compa = await ctx.prisma.compa.create({
        data: {
          authId: ctx.userId,
        },
      });
      return compa;
    }),
});
