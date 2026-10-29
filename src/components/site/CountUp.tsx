import { useEffect, useRef } from 'react';

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const stop = () => { cancelAnimationFrame(frame); element.textContent = value; };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      if (media.matches) return;
      const target = Number.parseInt(value, 10);
      const suffix = value.replace(/\d/g, '');
      const start = performance.now();
      const animate = (time: number) => {
        const progress = Math.min(1, (time - start) / 1200);
        element.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.6 });
    observer.observe(element);
    media.addEventListener('change', stop);
    return () => { stop(); observer.disconnect(); media.removeEventListener('change', stop); };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}