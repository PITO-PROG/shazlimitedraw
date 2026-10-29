import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from 'react';
import { Maximize, ArrowUpRight, Globe2, ShieldCheck, Truck } from 'lucide-react';
import { HeroSlideshow } from '@/components/site/HeroSlideshow';
import { capabilities, industries, insights, faqs } from "@/lib/content";
import { CTA, Reveal, SectionHead } from "@/components/site/ui";
import { Button } from '@/components/ui/button';
import { PhotoViewer } from '@/components/site/PhotoViewer';
import { sitePhotos, type SitePhoto } from '@/lib/site-photos';
import { MineralDiscovery } from "@/components/site/MineralDiscovery";
import { FaqList, RegionMap } from "@/components/site/widgets";
import { CountUp } from '@/components/site/CountUp';
import { CapabilitiesPhoto } from '@/components/site/CapabilitiesPhoto';
import { ResponsiveImage } from '@/components/site/ResponsiveImage';
import { editorialMedia, industryPhotos } from '@/lib/editorial-media';

const homePhotos = sitePhotos.map((photo, index) => ({ ...photo, src: ({ 8: editorialMedia.quarryWall, 7: editorialMedia.vessel, 6: editorialMedia.pipelines, 0: editorialMedia.limestone } as Record<number, string>)[index] ?? photo.src }));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Shaz Ventures — Reliable Mineral Supply for East Africa" },
      { name: "description", content: "Thermal coal, clinker, iron ore, gypsum, lithium and limestone — sourced, traded and delivered across East Africa." },
      { property: "og:title", content: "Shaz Ventures — Reliable Mineral Supply for East Africa" },
      { property: "og:description", content: "Industrial minerals, strategic sourcing and coordinated supply-chain solutions." },
    ],
  }),
  component: Home,
});

function SectionPhoto({ photo, onView, className = '' }: { photo: SitePhoto; onView: () => void; className?: string }) {
  return <Button variant="ghost" onClick={onView} aria-label={`View photograph: ${photo.title}`} className={`group relative block h-auto w-full overflow-hidden rounded p-0 ${className}`}>
    <ResponsiveImage src={photo.src} alt={photo.alt} loading="lazy" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105" />
    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded bg-background text-foreground shadow-deep"><Maximize className="h-4 w-4" /></span>
  </Button>;
}

function Home() {
  const [viewing, setViewing] = useState<number | null>(null);
  return (
    <>
      <HeroSlideshow />
      <div id="mineral-collection"><MineralDiscovery /></div>

      <section className="who-section border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal><SectionPhoto photo={{ ...sitePhotos[8], src: editorialMedia.quarryWall }} onView={() => setViewing(8)} className="aspect-[5/4]" /></Reveal>
          <div>
            <SectionHead eyebrow="Who we are" title="From mineral sources to regional industry." />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Established in Nairobi in 2020, Shaz Ventures connects qualified mineral sources with industrial customers across East Africa.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[["2020", "Established"], ["4", "Countries"], ["6+", "Minerals"]].map(([n, l]) => (
                <div key={l} className="stat-facet min-w-0 border-l-2 border-primary pl-2 sm:pl-4"><p className="font-display text-3xl font-black text-copper sm:text-4xl"><CountUp value={n ?? ''} /></p><p className="mt-1 font-mono text-[10px] uppercase text-muted-foreground sm:text-xs">{l}</p></div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-block font-semibold text-primary">About Shaz Ventures →</Link>
          </div>
        </div>
      </section>

      <section className="capabilities-section mx-auto grid max-w-7xl gap-14 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow="Core capabilities" title="Built on eight operating disciplines." />
          <Reveal delay={120} className="mt-10"><CapabilitiesPhoto /></Reveal>
        </div>
        <ol className="self-end">
          {capabilities.map((c, i) => (
            <Reveal key={c} delay={i * 50}>
              <li className="editorial-index">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="font-display text-2xl font-bold leading-snug md:text-3xl">{c}</span>
                <span aria-hidden className="h-2 w-2 rotate-45 bg-copper" />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="industries-section border-y border-border bg-background"><div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrow="Industries served" title="Supplying the sectors that build the region." />
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const photo = sitePhotos[[5, 1, 8, 6, 3, 2][i] ?? 5];
            if (!photo) return null;
            return <Reveal key={ind.name} delay={i * 50}>
              <Link to="/industries" className="industry-panel group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded"><ResponsiveImage src={industryPhotos[i] ?? photo.src} alt={photo.alt} loading="lazy" width={1920} height={1280} className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" /><span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded bg-background text-primary"><ArrowUpRight className="h-5 w-5" /></span></div>
                <h3 className="mt-5 font-display text-xl font-bold group-hover:text-primary">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.text}</p>
              </Link>
            </Reveal>;
          })}
        </div>
      </div></section>

      <section className="region-section border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <SectionHead eyebrow="Regional presence" title="Coordinating supply across East Africa." />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <Reveal><SectionPhoto photo={{ ...sitePhotos[7], src: editorialMedia.vessel }} onView={() => setViewing(7)} className="aspect-[4/3]" /><Link to="/logistics" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">From port to plant <ArrowUpRight className="h-4 w-4" /></Link></Reveal>
            <RegionMap />
          </div>
        </div>
      </section>

      <section className="assurance-section mx-auto grid max-w-7xl gap-6 px-6 py-28 md:grid-cols-2">
        <Reveal>
            <Link to="/quality" className="assurance-panel group block h-full overflow-hidden rounded border border-border bg-card">
             <div className="aspect-[16/9] overflow-hidden"><ResponsiveImage src={editorialMedia.lab} alt={sitePhotos[9].alt} loading="lazy" width={1920} height={1280} className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" /></div>
            <div className="p-6 md:p-8">
            <p className="eyebrow">Quality assurance</p>
            <h3 className="mt-4 text-3xl font-bold">Sample → verify → inspect → document.</h3>
             <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Supplier", "Material", "Shipment", "Docs"].map((s, i) => (
                <div key={s} className="flex-1 rounded border border-border p-3 text-center font-mono text-[11px] uppercase transition-all group-hover:border-accent" style={{ transitionDelay: `${i * 90}ms` }}>{s}</div>
              ))}
            </div>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <Link to="/sustainability" className="assurance-panel group block h-full overflow-hidden rounded border border-border bg-card">
            <div className="aspect-[16/9] overflow-hidden">
             <ResponsiveImage src={editorialMedia.greenQuarry} alt="Terraced marble quarry landscape" loading="lazy" width={1920} height={1280} className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
            </div>
            <div className="p-6 md:p-8">
              <p className="eyebrow">Sustainability</p>
              <h3 className="mt-4 text-3xl font-bold">Responsible sourcing, ethical business.</h3>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="partner-section bg-background"><div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrow="Why partner with us" title="Regional expertise. Integrated delivery." />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { title: 'Regional expertise', text: 'Responsive commercial support.', photo: 6 },
            { title: 'Reliable sourcing', text: 'Long-term supplier relationships.', photo: 0 },
            { title: 'Integrated delivery', text: 'Supply-chain and logistics coordination.', photo: 7 },
          ].map((item, index) => <Reveal key={item.title} className="partner-card">
            <SectionPhoto photo={homePhotos[item.photo] ?? sitePhotos[0]} onView={() => setViewing(item.photo)} className="aspect-[4/3]" />
            <span className="partner-icon" aria-hidden="true">{index === 0 ? <Globe2 /> : index === 1 ? <ShieldCheck /> : <Truck />}</span>
            <h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="mt-2 text-muted-foreground">{item.text}</p>
          </Reveal>)}
        </div>
      </div></section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 lg:grid-cols-2">
          <div>
            <Reveal className="mb-8"><SectionPhoto photo={sitePhotos[5]} onView={() => setViewing(5)} className="aspect-[16/9]" /></Reveal>
            <SectionHead eyebrow="Latest insight" title={insights[0]?.title ?? "Mineral supply insights"} />
            <Reveal><Link to="/insights" className="mt-6 inline-block font-semibold text-primary">Read insights →</Link></Reveal>
          </div>
          <div>
            <p className="eyebrow mb-4">Buyer questions</p>
            <FaqList items={faqs.slice(0, 3)} />
          </div>
        </div>
      </section>
      <CTA />
      <PhotoViewer photos={homePhotos} index={viewing} onIndexChange={setViewing} />
    </>
  );
}
