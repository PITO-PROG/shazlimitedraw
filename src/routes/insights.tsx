import { createFileRoute } from "@tanstack/react-router";
import { insights } from "@/lib/content";
import { CTA, PageHero, Reveal, TiltCard } from "@/components/site/ui";
import { ResponsiveImage } from '@/components/site/ResponsiveImage';
import { editorialMedia } from '@/lib/editorial-media';

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "News & Insights — Shaz Ventures" },
      { name: "description", content: "Company updates, commodity explainers and regional industrial insights." },
      { property: "og:title", content: "News & Insights — Shaz Ventures" },
      { property: "og:description", content: "Perspectives on minerals and supply chains in East Africa." },
    ],
  }),
  component: Insights,
});

function Insights() {
  return (
    <>
      <PageHero eyebrow="News & insights" title={<>Notes from the <span className="text-copper">supply chain.</span></>} text="Company updates, commodity explainers and regional industrial insights." />
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-24 md:grid-cols-3">
        {insights.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <TiltCard className="insight-tile flex h-full min-h-72 flex-col">
              <ResponsiveImage src={[editorialMedia.cement, editorialMedia.freight, editorialMedia.port][i]} width={960} height={960} alt="" loading="lazy" className="insight-photo" />
              <p className="eyebrow">{p.tag}</p>
              <h2 className="mt-6 flex-1 text-2xl font-bold leading-snug">{p.title}</h2>
              <p className="mt-6 font-mono text-xs text-muted-foreground">{p.date} · Coming soon</p>
            </TiltCard>
          </Reveal>
        ))}
      </section>
      <CTA />
    </>
  );
}
