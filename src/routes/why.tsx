import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA, PageHero } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { novemberMedia } from "@/lib/november-media";

const pillarPhotos = [novemberMedia.harbour, novemberMedia.loading, novemberMedia.lab, novemberMedia.vessel, novemberMedia.quarry];

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Why Shaz Ventures — Your Mineral Supply Partner" },
      { name: "description", content: "Regional expertise, reliable supply, customer focus, integrated capabilities and long-term partnerships." },
      { property: "og:title", content: "Why Shaz Ventures" },
      { property: "og:description", content: "What makes us a dependable mineral supply partner." },
    ],
  }),
  component: Why,
});

const pillars = [
  ["Regional expertise", "Deep understanding of East African markets, corridors and regulation."],
  ["Reliable supply", "Qualified sources and planning that keep your operations running."],
  ["Customer focus", "Supply structured around your specification and schedule."],
  ["Integrated capabilities", "Sourcing, trading and logistics coordinated by one partner."],
  ["Long-term partnerships", "Relationships built for repeat, term supply — not one-off trades."],
];

function Why() {
  const [a, setA] = useState(0);
  return (
    <>
      <PageHero eyebrow="Why Shaz Ventures" title={<>Five reasons industry <span className="text-copper">partners with us.</span></>} text="Select a pillar to explore each value proposition." />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="pillar-cards grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(([t], i) => (
            <button key={t} onClick={() => setA(i)} onMouseEnter={() => setA(i)} aria-pressed={a === i}
              className={cn("group overflow-hidden rounded-lg border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg", a === i ? "border-primary ring-2 ring-primary/30" : "border-border")}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={pillarPhotos[i]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <span className="mt-1 block font-display text-base font-bold leading-snug">{t}</span>
              </div>
            </button>
          ))}
        </div>
        <div key={a} className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-10 rounded-lg border-l-4 border-primary bg-card p-8 shadow-sm">
          <h2 className="text-3xl font-bold md:text-4xl">{pillars[a]![0]}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{pillars[a]![1]}</p>
        </div>
      </section>
      <CTA />
    </>
  );
}
