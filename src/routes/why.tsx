import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA, PageHero } from "@/components/site/ui";
import { cn } from "@/lib/utils";

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
        <div className="pillar-chart flex h-[440px] items-end gap-3">
          {pillars.map(([t], i) => (
            <button key={t} onClick={() => setA(i)} onMouseEnter={() => setA(i)} aria-pressed={a === i}
              className={cn("relative flex-1 rounded-t-lg border border-b-0 transition-all duration-500", a === i ? "h-full border-accent bg-card" : "border-border bg-graphite")}
              style={{ height: a === i ? "100%" : `${45 + i * 9}%` }}>
              <span className="absolute left-4 top-4 font-mono text-xs text-accent">0{i + 1}</span>
              <span className="absolute bottom-4 left-4 right-4 text-left font-display text-sm font-bold md:text-lg">{t}</span>
            </button>
          ))}
        </div>
        <div key={a} className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-t border-accent pt-10">
          <h2 className="text-3xl font-bold md:text-4xl">{pillars[a]![0]}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{pillars[a]![1]}</p>
        </div>
      </section>
      <CTA />
    </>
  );
}
