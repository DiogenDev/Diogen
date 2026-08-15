import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";
import CardSpotlight from "@/components/CardSpotlight";
import Lightbox from "@/components/Lightbox";
import SmoothScroll from "@/components/SmoothScroll";
import Magnetic from "@/components/Magnetic";
import ClipPlayer from "@/components/ClipPlayer";
import { site, socials } from "@/lib/site";
import { stackGroups } from "@/lib/content";

/** Разметка для поисковиков. Отдаётся статикой, запросов наружу не создаёт. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.nick,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  sameAs: socials.map((s) => s.href),
  knowsAbout: stackGroups.flatMap((g) => g.items),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <TechStack />
        <Timeline />
        <Services />
      </main>
      <Footer />
      {/* Поведение вынесено в отдельные контроллеры: каждый вешает
          один слушатель на документ и сам решает, включаться ли
          на этом устройстве. */}
      <SmoothScroll />
      <RevealController />
      <CardSpotlight />
      <Magnetic />
      <ClipPlayer />
      <Lightbox />
    </>
  );
}
