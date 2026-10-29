import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA, PageHero, Reveal, TiltCard } from "@/components/site/ui";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Leadership Team — Shaz Ventures" },
      { name: "description", content: "The directors and managers leading Shaz Ventures Limited." },
      { property: "og:title", content: "Leadership Team — Shaz Ventures" },
      { property: "og:description", content: "Directors, Managing Director and Operations Managers." },
    ],
  }),
  component: Leadership,
});

const team = [
  { role: "Director", bio: "Biography to be supplied and approved by the board." },
  { role: "Director", bio: "Biography to be supplied and approved by the board." },
  { role: "Managing Director", bio: "Biography to be supplied and approved by the board." },
  { role: "Operations Manager", bio: "Biography to be supplied and approved by the board." },
  { role: "Operations Manager", bio: "Biography to be supplied and approved by the board." },
];

function Leadership() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero eyebrow="Leadership team" title="The people behind the supply chain." text="Our directors and managers bring commercial, operational and logistics experience to every customer relationship." />
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-24 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <button className="block w-full text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <TiltCard className="leadership-tile p-0">
                <div className="relative aspect-[4/5] bg-muted grain">
                  <div className="absolute inset-0 grid place-items-center font-display text-7xl font-black text-border">SV</div>
                  <div className={`absolute inset-0 flex items-end bg-background/90 p-6 transition-opacity duration-500 ${open === i ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-sm text-muted-foreground">{p.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-display text-lg font-bold">Name to be confirmed</p>
                  <p className="eyebrow mt-1">{p.role}</p>
                </div>
              </TiltCard>
            </button>
          </Reveal>
        ))}
      </section>
      <CTA />
    </>
  );
}
