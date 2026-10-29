import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/content";
import { CTA, PageHero, Reveal, SectionHead, TiltCard } from "@/components/site/ui";
import { SupplyRoute } from "@/components/site/widgets";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Services — Sourcing, Trading & Logistics | Shaz Ventures" },
      { name: "description", content: "Mineral sourcing, commodity trading, supply-chain coordination, logistics and cross-border distribution." },
      { property: "og:title", content: "Services — Shaz Ventures" },
      { property: "og:description", content: "End-to-end mineral supply services across East Africa." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>From source <span className="text-copper">to site.</span></>} text="One partner connecting sourcing, trading, transport and delivery — so your operations receive the right material, on schedule." />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="The supply route" title="Follow a shipment through our services." text="Select a stage to explore." />
        <div className="mt-12"><SupplyRoute /></div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}><TiltCard className="h-full"><p className="font-mono text-xs text-accent">0{i + 1}</p><p className="mt-6 font-display text-2xl font-bold">{s.title}</p><p className="mt-3 text-muted-foreground">{s.text}</p></TiltCard></Reveal>
        ))}
      </section>
      <CTA />
    </>
  );
}
