import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation APIs. Use these everywhere instead of the
// equivalents from `next/link` and `next/navigation` so links and
// redirects automatically carry the active locale.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
