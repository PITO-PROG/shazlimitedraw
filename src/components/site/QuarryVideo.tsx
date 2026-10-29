import { useEffect, useRef, useState } from 'react';
import film from '@/assets/quarry-film.webm';
import mp4 from '@/assets/quarry-film.mp4';
import poster from '@/assets/photos/marble-quarry.jpg';

export function QuarryVideo({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) return;
    ref.current?.load();
  }, [loaded]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let intersecting = false;
    const update = () => {
      if (active && intersecting && !media.matches && !document.hidden) { setLoaded(true); element.play().catch(() => {}); }
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { intersecting = Boolean(entry?.isIntersecting); update(); }, { threshold: 0.1 });
    observer.observe(element);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { element.pause(); observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, [active]);
  return <video ref={ref} className="hero-quarry-video" data-loaded={loaded} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" onLoadedData={() => { if (active && !document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.play().catch(() => {}); }}>{loaded && <><source src={film} type="video/webm" /><source src={mp4} type="video/mp4" /></>}</video>;
}