/**
 * Project catalogue. Drives the home gallery (`Portfolio`) and the lightbox.
 * Copy (title, category) is translated via the `Work` namespace using each
 * project's `slug` as the key; this module holds only the locale-agnostic data
 * (one image per project, tint color, status).
 *
 * Images live at `/assets/projects/<slug>.webp`. `status` and `color` are set to
 * sensible defaults — flip any project to `"concept"` to show the Concept badge.
 */

export type Project = {
  slug: string;
  /** Accent color for the gallery tile tint + category label. */
  color: string;
  /** "live" = shipped work; "concept" = self-initiated concept piece. */
  status: "live" | "concept";
  /** Single 3:2-ish landscape cover image. */
  imageUrl: string;
};

const img = (slug: string) => `/assets/projects/${slug}.webp`;

export const projects: Project[] = [
  { slug: "bridal", color: "#E84393", status: "live", imageUrl: img("bridal") },
  { slug: "grocery-store", color: "#12B886", status: "live", imageUrl: img("grocery-store") },
  { slug: "handyman-services", color: "#2D6AE3", status: "live", imageUrl: img("handyman-services") },
  { slug: "home-meal", color: "#E8590C", status: "live", imageUrl: img("home-meal") },
  { slug: "hookah-lounge", color: "#7C3AED", status: "live", imageUrl: img("hookah-lounge") },
  { slug: "immigration-services", color: "#0CA678", status: "live", imageUrl: img("immigration-services") },
  { slug: "live-arabic", color: "#FF4D00", status: "live", imageUrl: img("live-arabic") },
  { slug: "real-estate-agent", color: "#1098AD", status: "live", imageUrl: img("real-estate-agent") },
  { slug: "restaurant-app", color: "#F08C00", status: "live", imageUrl: img("restaurant-app") },
  { slug: "wedding-planner", color: "#C2255C", status: "live", imageUrl: img("wedding-planner") },
];
