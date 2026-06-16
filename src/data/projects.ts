/**
 * Project catalogue. Drives the home accordion gallery, the /work index,
 * and each /work/[slug] detail page. Copy is translated via the `Work`
 * namespace using each project's `slug` as the key; this module holds only
 * the locale-agnostic data (images, colors, ordering).
 */

export type Project = {
  slug: string;
  /** Accent color for the gallery panel + detail hero. */
  color: string;
  year: string;
  /** Primary cover image (Unsplash). */
  imageUrl: string;
  /** Additional images shown on the detail page. */
  gallery: string[];
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "bloom-commerce",
    color: "#FF4D00",
    year: "2025",
    imageUrl: u("photo-1556742049-0cfed4f6a45d"),
    gallery: [u("photo-1563013544-824ae1b704d3"), u("photo-1460925895917-afdab827c52f")],
  },
  {
    slug: "atlas-logistics",
    color: "#2D6AE3",
    year: "2024",
    imageUrl: u("photo-1586528116311-ad8dd3c8310d"),
    gallery: [u("photo-1551288049-bebda4e38f71"), u("photo-1518186285589-2f7649de83e0")],
  },
  {
    slug: "nexus-health",
    color: "#12B886",
    year: "2024",
    imageUrl: u("photo-1576091160550-2173dba999ef"),
    gallery: [u("photo-1505751172876-fa1923c5c528"), u("photo-1579684385127-1ef15d508118")],
  },
  {
    slug: "verde-studio",
    color: "#7C3AED",
    year: "2023",
    imageUrl: u("photo-1481487196290-c152efe083f5"),
    gallery: [u("photo-1561070791-2526d30994b5"), u("photo-1558655146-9f40138edfeb")],
  },
  {
    slug: "pulse-fitness",
    color: "#E8590C",
    year: "2023",
    imageUrl: u("photo-1571019613454-1cb2f99b2d8b"),
    gallery: [u("photo-1517836357463-d25dfeac3438"), u("photo-1534438327276-14e5300c3a48")],
  },
  {
    slug: "meridian-finance",
    color: "#0CA678",
    year: "2022",
    imageUrl: u("photo-1551288049-bebda4e38f71"),
    gallery: [u("photo-1611974789855-9c2a0a7236a3"), u("photo-1543286386-713bdd548da4")],
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
