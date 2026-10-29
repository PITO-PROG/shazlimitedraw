import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMotionFrame } from './MotionSystem';

export function HeroMotion({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLElement>(null);
  const pointerFrame = useRef(0);
  useMotionFrame(({ reduced }) => {
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--hero-scroll', reduced ? '0px' : `${Math.min(100, Math.max(-60, -bounds.top * 0.12))}px`);
  });
  useEffect(() => {
    return () => { cancelAnimationFrame(pointerFrame.current); };
  }, []);
  return <section ref={ref} aria-label={label} className={cn('hero-motion', className)} onPointerMove={event => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const target = event.target;
    const overControl = target instanceof Element && Boolean(target.closest('a, button, input, [role="slider"]'));
    cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      element.dataset['cursorActive'] = 'true';
      element.dataset['cursorControl'] = String(overControl);
      element.style.setProperty('--hero-x', `${(x / bounds.width - 0.5) * 40}px`);
      element.style.setProperty('--hero-y', `${(y / bounds.height - 0.5) * 24}px`);
      element.style.setProperty('--cursor-x', `${x}px`);
      element.style.setProperty('--cursor-y', `${y}px`);
      element.style.setProperty('--cursor-sweep', `${x / bounds.width * 100}%`);
    });
  }} onPointerLeave={event => {
    cancelAnimationFrame(pointerFrame.current);
    event.currentTarget.dataset['cursorActive'] = 'false';
    event.currentTarget.style.setProperty('--hero-x', '0px');
    event.currentTarget.style.setProperty('--hero-y', '0px');
  }}>{children}<div className="cursor-sheen" aria-hidden="true" /><div className="mineral-cursor" aria-hidden="true"><span /></div></section>;
}