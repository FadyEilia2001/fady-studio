import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { projects, getProject, projectSlugs } from "@/data/projects";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("Work");
  const k = (key: string) => t(`projects.${slug}.${key}`);

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const blocks = [
    { label: t("overview"), body: k("description") },
    { label: t("theChallenge"), body: k("challenge") },
    { label: t("whatIBuilt"), body: k("build") },
    { label: t("theResult"), body: k("result") },
  ];

  return (
    <>
      <Navbar solid />

      {/* Dark hero header */}
      <header className="bg-dark px-6 pt-32 pb-16 text-dark-foreground md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-8 flex items-center gap-3">
            <span className="inline-block h-0.5 w-6 bg-accent" />
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-[0.2em] text-dark-muted transition-colors hover:text-accent"
            >
              <span className="rtl:rotate-180 inline-block">←</span>{" "}
              {t("backToWork")}
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: project.color }}
            >
              {k("category")} · {project.year}
            </span>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-8xl">
              {k("title")}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 font-display text-3xl font-bold text-accent md:text-4xl">
              {k("metric")}
            </p>
          </Reveal>
        </div>
      </header>

      <main className="bg-background">
        {/* Cover image */}
        <Reveal className="px-6 md:px-10">
          <div className="mx-auto -mt-8 max-w-[1400px]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-card shadow-2xl">
              <Image
                src={project.imageUrl}
                alt={k("title")}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Content blocks */}
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <div className="grid gap-x-20 gap-y-14 md:grid-cols-2">
            {blocks.map((block, i) => (
              <Reveal as="div" key={block.label} delay={(i % 2) * 0.1}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-block h-0.5 w-6 bg-accent" />
                  <span className="eyebrow">{block.label}</span>
                </div>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {block.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Gallery images */}
          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Reveal as="div" key={src} delay={(i % 2) * 0.1}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-card">
                  <Image
                    src={src}
                    alt={`${k("title")} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Next project */}
        <Link
          href={`/work/${next.slug}`}
          className="group block border-t border-border bg-card"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-16 md:px-10">
            <span className="eyebrow">{t("nextProject")}</span>
            <span className="font-display text-4xl font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-accent md:text-6xl">
              {t(`projects.${next.slug}.title`)}{" "}
              <span className="rtl:rotate-180 inline-block">→</span>
            </span>
          </div>
        </Link>
      </main>

      <Footer />
    </>
  );
}
