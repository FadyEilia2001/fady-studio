import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (_next, _vercel)
  // - files with an extension (e.g. /favicon.ico, /assets/*.webp)
  // Renamed from `middleware.ts` to `proxy.ts` per the Next.js 16 convention.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
