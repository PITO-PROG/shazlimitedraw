import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import captain from '@/assets/vessel/captain-briefing.jpg';
import holdFloor from '@/assets/vessel/hold-floor.jpg';
import hatch from '@/assets/vessel/hatch-climb.jpg';
import deck from '@/assets/vessel/deck-walk.jpg';
import { Reveal } from './ui';

const highlights = [
  { tag: 'On board · Vessel inspection', title: 'Our shipper and agent meet the Captain before loading begins', to: '/logistics', action: 'See the process' },
  { tag: 'Products · Industrial minerals', title: 'Thermal coal, clinker, iron ore, gypsum, lithium and limestone', to: '/products', action: 'Explore minerals' },
  { tag: 'Quality · Hold readiness', title: 'Every cargo hold checked for cleanliness before cargo is loaded', to: '/quality', action: 'Our standards' },
] as const;

/** Glencore/Vitol-style highlight strip directly beneath the hero. */
export function HighlightStrip() {
  return <section aria-label="Highlights" className="highlight-strip">
    <div className="mx-auto grid max-w-7xl md:grid-cols-3">
      {highlights.map(item => <Link key={item.title} to={item.to} className="highlight-item group">
        <span className="font-mono text-xs uppercase text-primary">{item.tag}</span>
        <span className="mt-3 block text-lg font-semibold leading-snug">{item.title}</span>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">{item.action}<ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" /></span>
      </Link>)}
    </div>
  </section>;
}

const steps = [
  { img: deck, title: 'Arrive on deck', text: 'The team boards at the quay and walks the vessel.' },
  { img: hatch, title: 'Inspect the hatches', text: 'Hatch covers and access ladders are checked.' },
  { img: holdFloor, title: 'Confirm clean holds', text: 'Holds are signed off clean before loading.' },
] as const;

/** People-first story band, inspired by Anglo American's "Our stories". */
export function OnTheGround() {
  return <section className="bg-background">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <Reveal><div className="relative overflow-hidden rounded-xl shadow-deep">
        <img src={captain} alt="Shaz shipper and shipping agent meeting the Captain in the ship office" loading="lazy" width={1200} height={1600} className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]" />
        <span className="story-badge">Meeting the Captain</span>
      </div></Reveal>
      <div>
        <p className="eyebrow">On the ground</p>
        <h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">People who see <span className="font-bold text-copper">every cargo</span> through.</h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">Before loading begins, our shipper and shipping agent meet the Captain on board, then inspect each hold for cleanliness. It is the hands-on work behind reliable mineral supply.</p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => <li key={s.title} className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={s.img} alt="" loading="lazy" width={600} height={600} className="aspect-square w-full object-cover" />
            <div className="p-4"><span className="font-mono text-xs text-copper">0{i + 1}</span><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-muted-foreground">{s.text}</p></div>
          </li>)}
        </ol>
        <Link to="/logistics" className="mt-8 inline-flex items-center gap-2 font-semibold text-copper">How we coordinate shipments<ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  </section>;
}
