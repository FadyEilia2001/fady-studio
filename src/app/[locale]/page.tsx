import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Insights from "@/components/Insights";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Portfolio />
        <Insights />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
