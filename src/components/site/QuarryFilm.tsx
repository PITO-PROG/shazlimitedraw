import { useEffect, useRef, useState } from 'react';
import { Maximize, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import film from '@/assets/quarry-film.webm';
import mp4Film from '@/assets/quarry-film.mp4';
import poster from '@/assets/photos/marble-quarry.jpg';

export function QuarryFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const manualPause = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const update = () => {
      if (inView && !document.hidden && !media.matches && !manualPause.current) { setVisible(true); element.play().catch(() => {}); }
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      update();
    }, { threshold: 0.2 });
    observer.observe(element);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    if (visible && !manualPause.current && !document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.play().catch(() => {});
  }, [visible]);
  return (
    <section className="quarry-film" aria-label="Quarry landscape film">
      <video ref={video} poster={poster} muted loop playsInline preload={visible ? 'metadata' : 'none'} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Illustrative aerial quarry film">
        {visible && <><source src={film} type="video/webm" /><source src={mp4Film} type="video/mp4" /></>}
      </video>
      <div className="quarry-scrim" />
      <div className="film-caption">
        <div><p className="eyebrow">From source to industry</p><h2>Every supply chain<br />begins with the earth.</h2></div>
        <div className="flex gap-2">
          <Button size="icon" variant="secondary" title={playing ? 'Pause film' : 'Play film'} aria-label={playing ? 'Pause quarry film' : 'Play quarry film'} onClick={() => { manualPause.current = playing; if (playing) video.current?.pause(); else { setVisible(true); video.current?.play().catch(() => {}); } }}>{playing ? <Pause /> : <Play />}</Button>
          <Button size="icon" variant="secondary" title="Fullscreen film" aria-label="Fullscreen quarry film" onClick={() => video.current?.requestFullscreen?.().catch(() => {})}><Maximize /></Button>
        </div>
      </div>
    </section>
  );
}