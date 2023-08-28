import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/signin"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
