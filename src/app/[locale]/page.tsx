import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
