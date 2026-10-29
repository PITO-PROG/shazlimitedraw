import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { minerals } from "@/lib/content";
import { Btn, Reveal, SectionHead, Specimen3D, TiltCard } from "@/components/site/ui";
import { MineralDiscovery } from "@/components/site/MineralDiscovery";
import { EnquiryForm } from "@/components/site/widgets";
import { HeroMotion } from '@/components/site/HeroMotion';
import { ResponsiveImage } from '@/components/site/ResponsiveImage';
import { mineralPhotos } from '@/lib/mineral-media';

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const m = minerals.find((x) => x.slug === params.slug);
    if (!m) throw notFound();
    return m;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
          { title: `${loaderData.name} Supply — Shaz Ventures` },
          { name: "description", content: loaderData.intro },
          { property: "og:title", content: `${loaderData.name} Supply — Shaz Ventures` },
          { property: "og:description", content: loaderData.intro },
        ]
      : [{ title: "Mineral not found — Shaz Ventures" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="text-3xl font-bold">Mineral not found</h1>
      <Link to="/products" className="mt-6 inline-block text-primary">See all minerals →</Link>
    </div>
  ),
  component: Product,
});

function Product() {
  const m = Route.useLoaderData();
  return (
    <>
      <HeroMotion className="product-hero relative overflow-hidden border-b border-border grain">
        <div className="hero-depth"><ResponsiveImage src={mineralPhotos[minerals.findIndex(mineral => mineral.slug === m.slug)]} alt="" width={1024} height={1024} className="hero-image" sizes="100vw" fetchPriority="high" /></div>
        <div className="hero-scrim" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-32 lg:grid-cols-2">
          <div>
            <Link to="/products" className="eyebrow">← All minerals</Link>
            <h1 className="mt-6 text-5xl font-black md:text-7xl">{m.name}</h1>
            <p className="mt-4 font-display text-2xl font-semibold text-copper">{m.headline}</p>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">{m.intro}</p>
            <div className="mt-9"><Btn to="/contact">Enquire About Supply</Btn></div>
          </div>
          <Specimen3D key={m.slug} label={`${m.name} specimen`} {...m.look} dust scrollLinked className="h-[440px] lg:h-[560px]" />
        </div>
      </HeroMotion>
      <MineralDiscovery />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
        <SectionHead eyebrow="Overview" title="Role in the value chain" text={m.overview} />
        <Reveal delay={120}>
          <p className="eyebrow">Product requirements we work to</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {m.requirements.map((r) => <li key={r} className="flex items-center gap-4 py-4"><span className="h-2 w-2 rotate-45 bg-accent" />{r}</li>)}
          </ul>
        </Reveal>
      </section>
      <section className="border-y border-border bg-graphite">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHead eyebrow="Applications" title={`Where ${m.name.toLowerCase()} is used`} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {m.applications.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}><TiltCard className="h-full"><p className="font-display text-xl font-bold">{a.title}</p><p className="mt-3 text-muted-foreground">{a.text}</p></TiltCard></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
        <SectionHead eyebrow="Supply approach" title="Specification first, then logistics." text="We qualify sources against your agreed specification, structure the commercial terms with you and coordinate logistics through to delivery. Capacity and timelines are confirmed per enquiry." />
        <Reveal delay={120}>
          <p className="eyebrow">Related services</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {([["/services", "Mineral sourcing"], ["/services", "Commodity trading"], ["/logistics", "Logistics"], ["/quality", "Quality assurance"]] as const).map(([to, l]) => (
              <Link key={l} to={to} className="rounded-lg border border-border p-5 font-display font-bold transition-colors hover:border-accent">{l} →</Link>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <SectionHead eyebrow="Enquiry" title={`Request ${m.name.toLowerCase()} supply`} className="mb-10" />
        <EnquiryForm key={m.slug} mineral={m.slug} />
      </section>
    </>
  );
}
