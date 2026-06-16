import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ locale: string }> };

export default async function WorkIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Work");

  return (
    <>
      <Navbar solid />
      <main className="min-h-screen bg-background px-6 pt-32 pb-28 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-6 flex items-center gap-3">
            <span className="inline-block h-0.5 w-6 bg-accent" />
            <Link href="/" className="eyebrow hover:text-foreground">
              <span className="rtl:rotate-180 inline-block">←</span>{" "}
              {t("backToWork")}
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-8xl">
              {t("indexTitle")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("indexSubtitle")}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal as="div" key={project.slug} delay={(i % 3) * 0.1}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-card">
                    <Image
                      src={project.imageUrl}
                      alt={t(`projects.${project.slug}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30"
                      style={{ background: project.color }}
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <span
                        className="font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                        style={{ color: project.color }}
                      >
                        {t(`projects.${project.slug}.category`)}
                      </span>
                      <h2 className="mt-1 font-display text-2xl font-bold uppercase leading-none text-foreground transition-colors group-hover:text-accent">
                        {t(`projects.${project.slug}.title`)}
                      </h2>
                    </div>
                    <span className="font-mono text-xs tracking-widest text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 font-display text-lg font-bold text-foreground/80">
                    {t(`projects.${project.slug}.metric`)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
