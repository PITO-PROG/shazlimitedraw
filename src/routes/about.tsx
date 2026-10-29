import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, Reveal, SectionHead, Specimen3D, TiltCard } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Shaz Ventures — Mineral Trading Since 2020" },
      { name: "description", content: "Nairobi-based mineral sourcing and trading company serving East African industry since 2020." },
      { property: "og:title", content: "About Shaz Ventures" },
      { property: "og:description", content: "Our purpose, vision, mission and SUCCESS-i values." },
    ],
  }),
  component: About,
});

const values = [
  ["S", "Safety", "Protecting people, communities and the environment in every operation."],
  ["U", "Unity", "Working as one team with suppliers and customers."],
  ["C", "Customer focus", "Building supply around customer requirements."],
  ["C", "Commitment", "Delivering on what we agree."],
  ["E", "Excellence", "Operating to high professional standards."],
  ["S", "Sustainability", "Responsible sourcing for long-term value."],
  ["S", "Stewardship", "Accountable governance and ethical conduct."],
  ["i", "Innovation", "Using digital tools to improve supply chains."],
];
const milestones = [
  ["2020", "Shaz Ventures Limited established in Nairobi."],
  ["2021", "First regional mineral supply agreements."],
  ["2023", "Expanded logistics coordination across corridors."],
  ["Today", "Serving industrial customers across East Africa."],
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Shaz Ventures"
        title={<>A regional partner for <span className="text-copper">industrial minerals.</span></>}
        text="Established in 2020 and headquartered in Nairobi, we source, trade and coordinate the supply of minerals that power East Africa's cement, steel, construction and energy sectors."
        visual={<Specimen3D label="Rotating geological core sample" color="#8a7560" roughness={0.85} metalness={0.05} detail={0.1} shape="core" scrollLinked className="h-full" />}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-24 md:grid-cols-3">
        {[["Purpose", "To enable industrial growth in East Africa through reliable, responsibly sourced mineral supply."], ["Vision", "To be the region's most trusted mineral sourcing and supply-chain partner."], ["Mission", "To connect qualified mineral sources with industry through transparent trading and coordinated logistics."]].map(([t, x], i) => (
          <Reveal key={t} delay={i * 100}><TiltCard className="h-full"><p className="eyebrow">{t}</p><p className="mt-6 font-display text-xl font-semibold leading-snug">{x}</p></TiltCard></Reveal>
        ))}
      </section>
      <section className="border-y border-border bg-graphite">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHead eyebrow="Milestones" title="Our journey so far." />
          <div className="milestone-timeline relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-3 hidden h-px bg-border md:block" />
            {milestones.map(([y, t], i) => (
              <Reveal key={y} delay={i * 150}>
                <span className="relative block h-6 w-6 rotate-45 border-2 border-primary bg-background" />
                <p className="mt-6 font-display text-3xl font-black text-copper">{y}</p>
                <p className="mt-2 text-muted-foreground">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Our values" title="SUCCESS-i" text="Eight values that guide how we work with suppliers, customers and communities." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([l, t, x], i) => (
            <Reveal key={t} delay={i * 50}><TiltCard className="h-full"><p className="font-display text-5xl font-black text-copper">{l}</p><p className="mt-4 font-display font-bold">{t}</p><p className="mt-2 text-sm text-muted-foreground">{x}</p></TiltCard></Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
