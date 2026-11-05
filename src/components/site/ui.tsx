import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SpecimenProps } from "@/components/three/SpecimenCanvas";
import { cn } from "@/lib/utils";
import { mineralPhotos } from '@/lib/mineral-media';
import { HeroMotion } from './HeroMotion';
import { photosForPage } from '@/lib/site-photos';
import { PhotoViewer } from './PhotoViewer';
import { PhotoGallery } from './PhotoGallery';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';
import { useMotionFrame } from './MotionSystem';
import { editorialMedia } from '@/lib/editorial-media';

const mineralImages: Record<string, string | undefined> = {
  coal: mineralPhotos[0],
  clinker: mineralPhotos[1],
  iron: mineralPhotos[2],
  gypsum: mineralPhotos[3],
  lithium: mineralPhotos[4],
  limestone: mineralPhotos[5],
  core: mineralPhotos[5],
};

function photoFor(label: string) {
  const l = label.toLowerCase();
  const key = Object.keys(mineralImages).find((k) => l.includes(k));
  return key ? mineralImages[key] : mineralPhotos[2];
}

/** Mineral photograph (replaces the former 3D specimen). */
export function Specimen3D({ className, label }: SpecimenProps & { className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionFrame(({ reduced, height }) => {
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const shift = reduced ? 0 : Math.max(-18, Math.min(18, (height * 0.5 - bounds.top - bounds.height * 0.5) * 0.04));
    element.style.setProperty('--specimen-shift', `${shift}px`);
  });
  return (
    <div ref={ref} role="img" aria-label={label} className={cn("photographic-specimen relative overflow-hidden", className)}>
      <ResponsiveImage src={photoFor(label)} alt={label} className="specimen-photo" loading="lazy" width={1024} height={1024} sizes="(max-width: 768px) 100vw, 640px" />
    </div>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-shown={shown} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Card that tilts toward the pointer for depth. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
        el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      }}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
      className={cn(
        "tilt-tile group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-transform duration-300 ease-out will-change-transform",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        "before:bg-[radial-gradient(400px_circle_at_var(--mx)_var(--my),color-mix(in_oklab,var(--accent)_14%,transparent),transparent_60%)]",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, text, className }: { eyebrow: string; title: ReactNode; text?: string; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, text, visual }: { eyebrow: string; title: ReactNode; text: string; visual?: ReactNode }) {
  const { pathname } = useLocation();
  const photos = photosForPage(pathname);
  const heroImages: Record<string, string> = { '/about': editorialMedia.quarryWall, '/services': editorialMedia.freight, '/industries': editorialMedia.steelworks, '/logistics': editorialMedia.vessel, '/quality': editorialMedia.lab, '/sustainability': editorialMedia.greenQuarry, '/why': editorialMedia.port, '/leadership': editorialMedia.pipelines, '/insights': editorialMedia.cement, '/faq': editorialMedia.limestone };
  const heroPhotos = photos.map((item, index) => index === 0 ? { ...item, src: heroImages[pathname] ?? item.src } : item);
  const photo = heroPhotos[0];
  const [viewing, setViewing] = useState<number | null>(null);
  return (
    <HeroMotion className="page-hero border-b border-border">
      <div className="hero-depth"><ResponsiveImage src={photo?.src} alt={photo?.alt} width={1920} height={1280} className="hero-image" sizes="100vw" fetchPriority="high" /></div>
      <div className="hero-scrim" />
      <div className="page-hero-inner">
        <div className="hero-slide-copy">
      <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{text}</p>
        </div>
        {visual && <div className="page-hero-visual">{visual}</div>}
      </div>
      <Button size="icon" variant="outline" className="hero-photo-control" aria-label="Explore hero photograph" title="Explore photograph" onClick={() => setViewing(0)}><Maximize /></Button>
      <PhotoViewer photos={heroPhotos} index={viewing} onIndexChange={setViewing} />
    </HeroMotion>
  );
}

export function Btn({ to, children, variant = "primary" }: { to: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 rounded px-6 py-3.5 text-sm font-semibold tracking-wide transition-all",
        variant === "primary"
          ? "bg-copper text-primary-foreground shadow-deep hover:brightness-110"
          : "border border-input text-foreground hover:border-accent hover:text-accent",
      )}
    >
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

export function CTA() {
  return (
    <><div className="section-light"><PhotoGallery /></div>
    <section className="cta-band" aria-labelledby="cta-title">
      <ResponsiveImage src={editorialMedia.port} alt="Cargo vessel alongside harbour cranes in daylight" loading="lazy" width={1920} height={1280} sizes="100vw" />
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Start a supply conversation</p>
          <h2 id="cta-title" className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">Ready to discuss your mineral supply requirements?</h2>
          <p className="mt-5 max-w-xl text-lg text-stone">Tell us the mineral, specification, quantity and destination — our team will respond with a structured proposal.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Btn to="/contact">Start an enquiry</Btn><Btn to="/products" variant="ghost">Explore our minerals</Btn></div>
        </Reveal>
      </div>
    </section></>
  );
}
