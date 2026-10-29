import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';

type MotionFrame = { scroll: number; height: number; reduced: boolean };
type Listener = (frame: MotionFrame) => void;
const MotionContext = createContext<Set<Listener> | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const listeners = useRef(new Set<Listener>());
  const { pathname } = useLocation();
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const value = { scroll: window.scrollY, height: window.innerHeight, reduced: media.matches };
        document.documentElement.style.setProperty('--scroll-progress', String(value.scroll / Math.max(1, document.documentElement.scrollHeight - value.height)));
        listeners.current.forEach(listener => listener(value));
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    media.addEventListener('change', update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); media.removeEventListener('change', update); };
  }, [pathname]);
  return <MotionContext.Provider value={listeners.current}>{children}</MotionContext.Provider>;
}

export function useMotionFrame(listener: Listener) {
  const listeners = useContext(MotionContext);
  const latest = useRef(listener);
  useEffect(() => { latest.current = listener; });
  useEffect(() => {
    if (!listeners) return;
    const callback: Listener = frame => latest.current(frame);
    listeners.add(callback);
    callback({ scroll: window.scrollY, height: window.innerHeight, reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
    return () => { listeners.delete(callback); };
  }, [listeners]);
}

export function DustLayer() {
  return <div className="dust-layer" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 9) % 100}%`, top: `${(i * 23 + 5) % 100}%`, animationDelay: `${i * -0.9}s`, animationDuration: `${14 + i % 7}s` }} />)}</div>;
}