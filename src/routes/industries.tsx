import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { industries } from "@/lib/content";
import { CTA, PageHero, Reveal } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Industries We Serve — Shaz Ventures" },
      { name: "description", content: "Cement, steel, construction, manufacturing, energy and mineral processing." },
      { property: "og:title", content: "Industries We Serve — Shaz Ventures" },
      { property: "og:description", content: "Mineral supply for the sectors building East Africa." },
    ],
  }),
  component: Industries,
});

function Industries() {
  const [active, setActive] = useState(0);
  return (
    <>
      <PageHero eyebrow="Industries we serve" title={<>Materials for the sectors <span className="text-copper">building the region.</span></>} text="We supply mineral inputs to operations where continuity of supply directly affects output." />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-2">
          {industries.map((ind, i) => (
            <button key={ind.name} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
              className={cn("flex items-center justify-between rounded-lg border px-6 py-5 text-left font-display text-xl font-bold transition-all", i === active ? "translate-x-2 border-accent bg-card" : "border-border")}>
              {ind.name}<span className="font-mono text-xs text-accent">0{i + 1}</span>
            </button>
          ))}
        </div>
        <Reveal>
          <div key={active} className="sticky top-28 animate-in fade-in slide-in-from-right-4 duration-500 rounded-xl border border-border bg-graphite p-12 grain">
            <p className="font-display text-8xl font-black text-copper">0{active + 1}</p>
            <h2 className="mt-6 text-4xl font-bold">{industries[active]!.name}</h2>
            <p className="mt-5 text-lg text-muted-foreground">{industries[active]!.text}</p>
          </div>
        </Reveal>
      </section>
      <CTA />
    </>
  );
}
