import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "compas/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadiusKm = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  // Haversine formula
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = earthRadiusKm * c;

  return distanceKm;
}

export const experiencesRouter = createTRPCRouter({
  getExperiences: privateProcedure
    .input(
      z.object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.latitude || !input.longitude) {
        const user = await clerkClient.users.getUser(ctx.userId);
        return ctx.prisma.experience.findMany({
          where: {
            city: user.unsafeMetadata.city as string,
          },
        });
      }

      console.log(input.latitude, input.longitude);

      const nearExperiences = await ctx.prisma.experience.findMany({
        where: {
          latitude: {
            lte: input.latitude + 0.08,
            gte: input.latitude - 0.08,
          },
          longitude: {
            lte: input.longitude + 0.08,
            gte: input.longitude - 0.08,
          },
        },
      });

      const experiencesWithDistance = nearExperiences.map((expr) => {
        const distance = calculateDistance(
          expr.latitude,
          expr.longitude,
          input.latitude!,
          input.longitude!
        );
        return { ...expr, distance };
      });

      return experiencesWithDistance.sort((a, b) => {
        return a.distance - b.distance;
      });
    }),
});
