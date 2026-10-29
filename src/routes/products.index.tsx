import { createFileRoute, Link } from "@tanstack/react-router";
import { minerals } from "@/lib/content";
import { mineralPhotos } from "@/lib/mineral-media";
import { CTA, PageHero, Reveal, Specimen3D } from "@/components/site/ui";
import { ResponsiveImage } from '@/components/site/ResponsiveImage';

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Minerals — Shaz Ventures" },
      { name: "description", content: "Thermal coal, clinker, iron ore, gypsum, lithium, limestone and other minerals for East African industry." },
      { property: "og:title", content: "Our Minerals — Shaz Ventures" },
      { property: "og:description", content: "Explore our interactive mineral gallery." },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <>
      <PageHero eyebrow="Our products" title={<>An interactive <span className="text-copper">mineral gallery.</span></>} text="Each mineral is sourced to agreed specifications and coordinated through to delivery. Drag a specimen to rotate it, or open it for details." />
      <section className="mx-auto max-w-7xl space-y-28 px-6 py-28">
        {minerals.map((m, i) => (
          <Reveal key={m.slug}>
            <article className="showcase-row group" data-flip={i % 2 === 1}>
              <div className="showcase-media">
                <ResponsiveImage src={mineralPhotos[i]} alt={`${m.name} surface study`} loading="lazy" width={1024} height={1024} sizes="(max-width: 768px) 100vw, 640px" />
                <Specimen3D label={`${m.name} specimen`} {...m.look} className="showcase-specimen" />
              </div>
              <div>
                <p className="font-mono text-xs text-accent">0{i + 1} / 0{minerals.length}</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">{m.name}</h2>
                <p className="mt-3 font-display text-xl text-stone">{m.headline}</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{m.intro}</p>
                <ul className="mt-7 border-t border-border">
                  {m.applications.map((a) => (
                    <li key={a.title} className="flex justify-between gap-4 border-b border-border py-3 text-sm"><span className="font-semibold">{a.title}</span><span className="text-right text-muted-foreground">{a.text}</span></li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
                  <Link to="/products/$slug" params={{ slug: m.slug }} className="text-primary">View details →</Link>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground">Request a quote</Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="section-light border-y border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6 py-20">
          <div className="max-w-xl">
            <p className="eyebrow">Other minerals</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Additional commodities on request.</h2>
            <p className="mt-2 text-muted-foreground">Availability confirmed case by case against your specification.</p>
          </div>
          <Link to="/contact" className="text-sm font-semibold text-primary">Ask about a mineral →</Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
