import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, Reveal, SectionHead, TiltCard } from "@/components/site/ui";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sustainability — Shaz Ventures" },
      { name: "description", content: "Responsible sourcing, ethical business practices, efficiency and community contribution." },
      { property: "og:title", content: "Sustainability — Shaz Ventures" },
      { property: "og:description", content: "Our commitments to responsible mineral supply." },
    ],
  }),
  component: Sustainability,
});

const items = [
  ["Responsible sourcing", "Working with suppliers who respect people, land and regulation."],
  ["Ethical business", "Transparent, accountable commercial practices."],
  ["Operational efficiency", "Planning logistics to reduce waste, empty runs and delays."],
  ["Community & industry", "Supporting regional industry and the communities around it."],
];

function Sustainability() {
  return (
    <>
      <PageHero eyebrow="Sustainability" title={<>Supply that respects the <span className="text-copper">land it comes from.</span></>} text="Responsible sourcing, ethical business practices and coordinated supply." />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Our commitments" title="Four principles guide how we operate." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map(([t, x], i) => (
            <Reveal key={t} delay={i * 100}><TiltCard className="h-full"><p className="font-display text-2xl font-bold">{t}</p><p className="mt-3 text-muted-foreground">{x}</p></TiltCard></Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
