import { useRef, useState } from 'react';
import { capabilityPhotos } from '@/lib/editorial-media';
import { useMotionFrame } from './MotionSystem';
import { ResponsiveImage } from './ResponsiveImage';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';
import { PhotoViewer } from './PhotoViewer';
import { sitePhotos } from '@/lib/site-photos';

export function CapabilitiesPhoto() {
  const [active, setActive] = useState(0);
  const [viewing, setViewing] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useMotionFrame(({ height }) => {
    const section = ref.current?.closest('section');
    if (!section) return;
    const items = Array.from(section.querySelectorAll('.editorial-index'));
    let closest = 0;
    let distance = Infinity;
    items.forEach((item, index) => { const gap = Math.abs(item.getBoundingClientRect().top - height * 0.45); if (gap < distance) { distance = gap; closest = index; } });
    setActive(closest);
    items.forEach((item, index) => item.setAttribute('data-active', String(index === closest)));
  });
  return <><div ref={ref} className="capabilities-crossfade"><Button variant="ghost" onClick={() => setViewing(active)} aria-label="View photograph: Industrial operations" className="h-full w-full p-0">{capabilityPhotos.map((src, index) => <ResponsiveImage key={src} src={src} width={960} height={960} alt="Industrial operations" loading="lazy" data-active={active === index} />)}<span className="photo-expand-icon"><Maximize className="size-4" /></span></Button></div><PhotoViewer photos={capabilityPhotos.map(src => ({ ...sitePhotos[6], src }))} index={viewing} onIndexChange={setViewing} /></>;
}