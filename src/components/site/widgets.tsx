import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { countries, faqs, minerals, services } from "@/lib/content";
import { Specimen3D } from "./ui";
import { countryBoundaries, countryHubs } from '@/lib/east-africa-map';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from './ResponsiveImage';
import { capabilityPhotos } from '@/lib/editorial-media';

export function MineralOrbit() {
  const [active, setActive] = useState(0);
  const m = minerals[active]!;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative aspect-square max-h-[520px] w-full">
        <div className="absolute inset-6 rounded-full border border-border" />
        <div className="absolute inset-20 rounded-full border border-dashed border-border" />
        <Specimen3D key={m.slug} label={`${m.name} specimen`} {...m.look} className="absolute inset-12" />
        {minerals.map((x, i) => {
          const a = (i / minerals.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <button
              key={x.slug}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all",
                i === active ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background/80 text-muted-foreground hover:text-foreground",
              )}
              style={{ left: `${50 + Math.cos(a) * 44}%`, top: `${50 + Math.sin(a) * 44}%` }}
            >
              {x.name}
            </button>
          );
        })}
      </div>
      <div key={m.slug} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
        <p className="eyebrow">0{active + 1} / 0{minerals.length}</p>
        <h3 className="mt-3 text-4xl font-bold">{m.name}</h3>
        <p className="mt-2 text-xl text-copper font-display font-semibold">{m.headline}</p>
        <p className="mt-5 leading-relaxed text-muted-foreground">{m.intro}</p>
        <Link to="/products/$slug" params={{ slug: m.slug }} className="mt-7 inline-block font-semibold text-primary hover:underline">
          View {m.name} →
        </Link>
        <p className="mt-8 font-mono text-xs text-muted-foreground">Drag the specimen to rotate.</p>
      </div>
    </div>
  );
}

export function RegionMap() {
  const [active, setActive] = useState(0);
  const hub = countryHubs[0];
  if (!hub) return null;
  return (
    <div className="region-map grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="region-map-stage relative aspect-[4/3] rounded border border-border bg-graphite grain">
        <svg viewBox="0 0 370 450" className="h-full w-full" role="img" aria-label="East Africa supply map: Kenya, Uganda, Rwanda and Tanzania">
          <defs><pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" className="stroke-border" strokeWidth="0.5" /></pattern></defs>
          <rect width="370" height="450" fill="url(#map-grid)" />
          {countryBoundaries.map(boundary => <path key={boundary.name} d={boundary.path} data-active={countries[active]?.name === boundary.name} className="map-country fill-muted stroke-border" strokeWidth="1.3" onMouseEnter={() => { const index = countries.findIndex(country => country.name === boundary.name); if (index >= 0) setActive(index); }} />)}
          {countryHubs.slice(1).map((point, index) => <path key={index} d={`M${hub.x},${hub.y} Q${(hub.x + point.x) / 2},${Math.min(hub.y, point.y) - 28} ${point.x},${point.y}`} className="fill-none stroke-primary dash-flow" strokeWidth="1.4" />)}
          {countries.map((c, i) => (
            <g key={c.name}>
              <circle cx={countryHubs[i]?.x} cy={countryHubs[i]?.y} r={7} className={cn("pulse-ring", i === active ? "fill-accent/40" : "fill-primary/30")} />
              <circle cx={countryHubs[i]?.x} cy={countryHubs[i]?.y} r={3.5} className={i === active ? "fill-accent" : "fill-primary"} />
              <text x={(countryHubs[i]?.x ?? 0) + (i === 2 ? -58 : 10)} y={(countryHubs[i]?.y ?? 0) + (i === 1 ? -12 : 4)} className="map-label fill-foreground font-mono" fontSize={10}>{c.name.toUpperCase()}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        {countries.map((c, i) => (
          <Button variant="ghost" aria-pressed={i === active} key={c.name} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
            className={cn("country-option block h-auto whitespace-normal rounded border p-5 text-left transition-all", i === active ? "border-accent bg-card" : "border-border hover:bg-card")}>
            <p className="font-display text-lg font-bold">{c.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
          </Button>
        ))}
        <p className="font-mono text-xs text-muted-foreground">Coverage subject to confirmation.</p>
      </div>
    </div>
  );
}

export function SupplyRoute({ stages = services.map((s) => s.title) }: { stages?: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="supply-route">
      <div className="relative">
        <svg viewBox="0 0 1000 120" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
          <path d="M20 60 C 200 0, 300 120, 500 60 S 800 0, 980 60" className="fill-none stroke-border" strokeWidth={2} />
          <path d="M20 60 C 200 0, 300 120, 500 60 S 800 0, 980 60" className="fill-none stroke-primary dash-flow" strokeWidth={2} />
          <circle r="5" className="shipment-marker fill-primary"><animateMotion dur="9s" repeatCount="indefinite" path="M20 60 C 200 0, 300 120, 500 60 S 800 0, 980 60" /></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-[1%]">
          {stages.map((s, i) => (
            <button key={s} onClick={() => setActive(i)} aria-label={s}
              className={cn("h-5 w-5 rounded-full border-2 transition-all", i <= active ? "border-accent bg-accent scale-125" : "border-primary bg-background")} />
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {stages.map((s, i) => (
          <button key={s} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
            className={cn("rounded-lg border p-4 text-left transition-all", i === active ? "border-accent bg-card" : "border-border")}>
            <p className="font-mono text-xs text-accent">0{i + 1}</p>
            <p className="mt-1 font-display font-bold">{s}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function StepExplorer({ steps }: { steps: { title: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button onClick={() => setActive(i)} className={cn("flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all", i === active ? "border-accent bg-card" : "border-border")}>
              <span className={cn("grid h-9 w-9 shrink-0 rotate-45 place-items-center rounded-sm border", i <= active ? "border-accent bg-accent text-accent-foreground" : "border-border")}>
                <span className="-rotate-45 font-mono text-xs">{i + 1}</span>
              </span>
              <span className="font-display font-bold">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div key={active} className="animate-in fade-in zoom-in-95 duration-500 rounded-xl border border-border bg-graphite p-10 grain">
        <p className="eyebrow">Stage {active + 1} of {steps.length}</p>
        <h3 className="mt-4 text-3xl font-bold">{steps[active]!.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{steps[active]!.text}</p>
        <div className="mt-8 h-1 rounded bg-muted"><div className="h-1 rounded bg-copper transition-all duration-700" style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}

export function FaqList({ items = faqs, photographic = false }: { items?: { q: string; a: string }[]; photographic?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={photographic ? 'faq-photo-layout' : ''}>
    {photographic && <div className="faq-side-image" aria-hidden="true">{capabilityPhotos.slice(0, items.length).map((src, i) => <ResponsiveImage key={src} src={src} alt="" width={960} height={960} loading="lazy" data-active={(open ?? 0) === i} />)}</div>}
    <div className="divide-y divide-border border-y border-border">
      {items.map((f, i) => (
        <div key={f.q}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
            <span className="font-display text-lg font-semibold">{f.q}</span>
            <span className={cn("h-3 w-3 shrink-0 rotate-45 border border-accent transition-all", open === i && "bg-accent rotate-[225deg]")} />
          </button>
          <div className={cn("grid transition-all duration-500", open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]")}>
            <div className="overflow-hidden">
              <div className="h-px w-0 bg-copper transition-all duration-700" style={{ width: open === i ? "6rem" : 0 }} />
              <p className="mt-4 max-w-3xl text-muted-foreground">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

const field = "w-full rounded border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent";

export function EnquiryForm({ mineral }: { mineral?: string }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent)
    return (
      <div className="rounded-xl border border-accent bg-card p-10">
        <p className="eyebrow">Enquiry received</p>
        <h3 className="mt-3 text-2xl font-bold">Thank you — our team will be in touch.</h3>
        <button className="mt-6 text-sm text-primary" onClick={() => setSent(false)}>Send another enquiry</button>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <input required className={field} placeholder="Full name" aria-label="Full name" />
      <input required className={field} placeholder="Company" aria-label="Company" />
      <input required type="email" className={field} placeholder="Business email" aria-label="Business email" />
      <input className={field} placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp" />
      <select required defaultValue={mineral ?? ""} className={field} aria-label="Mineral of interest">
        <option value="" disabled>Mineral of interest</option>
        {minerals.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
        <option value="other">Other minerals</option>
      </select>
      <input className={field} placeholder="Form, grade or specifications" aria-label="Specifications" />
      <input className={field} placeholder="Estimated quantity (tonnes)" aria-label="Quantity" />
      <select defaultValue="" className={field} aria-label="Order frequency">
        <option value="" disabled>Order frequency</option>
        <option>One-off</option><option>Monthly</option><option>Quarterly</option><option>Long-term agreement</option>
      </select>
      <input className={field} placeholder="Delivery destination" aria-label="Delivery destination" />
      <input className={field} placeholder="Preferred schedule" aria-label="Preferred schedule" />
      <select defaultValue="email" className={field} aria-label="Preferred contact method">
        <option value="email">Contact me by email</option><option value="phone">Contact me by phone</option><option value="whatsapp">Contact me on WhatsApp</option>
      </select>
      <label className="flex items-center gap-3 rounded border border-dashed border-input px-4 py-3 text-sm text-muted-foreground">
        <input type="file" className="text-xs" aria-label="Specification document" /> 
      </label>
      <textarea className={cn(field, "md:col-span-2")} rows={4} placeholder="Additional notes" aria-label="Additional notes" />
      <label className="flex items-start gap-3 text-sm text-muted-foreground md:col-span-2">
        <input required type="checkbox" className="mt-1 accent-[var(--accent)]" />
        I agree that Shaz Ventures may use these details to respond to my enquiry.
      </label>
      <button className="rounded bg-copper px-6 py-3.5 font-semibold text-primary-foreground md:col-span-2 md:justify-self-start">Submit enquiry →</button>
    </form>
  );
}
