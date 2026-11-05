import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Maximize, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import port from '@/assets/november/harbour-cranes.webp';
import quarry from '@/assets/november/quarry-haulage.webp';
import onboard from '@/assets/vessel/crane-side.jpg';
import { HeroMotion } from './HeroMotion';
import { PhotoViewer } from './PhotoViewer';
import { QuarryVideo } from './QuarryVideo';
import { DustLayer } from './MotionSystem';
import { ResponsiveImage } from './ResponsiveImage';

const slides = [
  { image: port, alt: 'Cargo vessel alongside harbour cranes in daylight', label: 'Source to site', title: 'Mineral Supply.', copy: 'Industrial minerals, strategic sourcing and coordinated supply-chain solutions — built around your operational requirements.', to: '/products', action: 'Explore Our Minerals' },
  { image: onboard, alt: 'Shaz inspector on a vessel hatch with port cranes behind', label: 'On board', title: 'Inspected Before Loading.', copy: 'Our shipper and shipping agent meet the Captain and check every hold for cleanliness before cargo goes aboard.', to: '/logistics', action: 'See How We Ship' },
  { image: quarry, alt: 'Haul truck beside grey quarry stockpiles', label: 'From the earth', title: 'Sourced. Coordinated. Delivered.', copy: 'Connecting mineral sources with industrial operations through strategic trading and coordinated regional logistics.', to: '/logistics', action: 'Explore Our Supply Chain' },
] as const;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [visible, setVisible] = useState(true);
  const touch = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const move = (step: number) => setActive(value => (value + step + slides.length) % slides.length);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    const visibility = () => setVisible(!document.hidden);
    update(); media.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting) && !document.hidden));
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (paused || reduced || engaged || photo !== null || !visible) return;
    const timer = window.setTimeout(() => move(1), 6500);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced, engaged, visible, photo]);
  const slide = slides[active] ?? slides[0];
  return <div ref={root} onFocusCapture={() => setEngaged(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }} onTouchStart={event => { touch.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => { const end = event.changedTouches[0]?.clientX; if (touch.current !== null && end !== undefined && Math.abs(end - touch.current) > 45) move(end < touch.current ? 1 : -1); touch.current = null; }}>
    <HeroMotion className="immersive-hero cinematic-hero" label="Featured mineral supply slides">
      <div className="hero-depth" aria-hidden="true">{slides.map((item, index) => <div key={item.label} className="hero-slide-image" data-active={index === active}><ResponsiveImage src={item.image} alt="" width={1600} height={912} className="hero-image" sizes="100vw" fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} />{index === 0 && <QuarryVideo active={active === 0 && !paused && !reduced && !engaged && visible && photo === null} />}</div>)}</div>
      <div className="hero-scrim" />
      <DustLayer />
      <div className="hero-content">
        <div key={active} className="hero-slide-copy">
          <p className="eyebrow mb-6">Industrial minerals · East Africa</p>
          <h1>Shaz Ventures<span className="block text-copper">{slide.title}</span></h1>
          <p className="hero-copy">{slide.copy}</p>
          <div className="mt-8 flex flex-wrap gap-4"><Button asChild size="lg"><Link to={slide.to}>{slide.action}<ArrowRight /></Link></Button><Button asChild variant="outline" size="lg"><Link to="/contact">Discuss Your Requirements</Link></Button></div>
        </div>
        <div className="hero-slide-footer">
          <div className="hero-slide-tabs" aria-label="Choose featured slide">{slides.map((item, index) => <Button key={item.label} variant="ghost" className="hero-slide-tab" aria-label={`Show slide ${index + 1}: ${item.label}`} aria-pressed={index === active} onClick={() => setActive(index)}><span className="font-mono">0{index + 1}</span><span>{item.label}</span><span className="slide-progress" data-running={index === active && !paused && !reduced && !engaged && visible} key={`${index}-${active}`} /></Button>)}</div>
          <div className="flex gap-1"><Button size="icon" variant="outline" aria-label="Previous hero slide" title="Previous slide" onClick={() => move(-1)}><ArrowLeft /></Button><Button size="icon" variant="outline" aria-label={paused ? 'Play hero slides' : 'Pause hero slides'} title={paused ? 'Play slides' : 'Pause slides'} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button><Button size="icon" variant="outline" aria-label="Next hero slide" title="Next slide" onClick={() => move(1)}><ArrowRight /></Button></div>
        </div>
      </div>
      <a href="#mineral-collection" className="hero-discover" aria-label="Discover mineral collection"><ArrowDown /></a>
      <Button size="icon" variant="outline" className="hero-photo-control" aria-label="Explore hero photograph" title="Explore photograph" onClick={() => setPhoto(active)}><Maximize /></Button>
      <span className="sr-only" aria-live={paused || engaged ? 'polite' : 'off'}>{slide.alt}</span>
    </HeroMotion>
    <PhotoViewer photos={slides.map(item => ({ src: item.image, alt: item.alt, title: item.label, category: 'Supply chain' }))} index={photo} onIndexChange={setPhoto} />
  </div>;
}