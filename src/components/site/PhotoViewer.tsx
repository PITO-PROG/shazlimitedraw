import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { SitePhoto } from '@/lib/site-photos';
import { ResponsiveImage } from './ResponsiveImage';

export function PhotoViewer({ photos, index, onIndexChange }: { photos: readonly SitePhoto[]; index: number | null; onIndexChange: (index: number | null) => void }) {
  const [zoom, setZoom] = useState(1);
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const photo = photos[index ?? 0];
  const move = (step: number) => onIndexChange(((index ?? 0) + step + photos.length) % photos.length);
  useEffect(() => { setZoom(1); stage.current?.style.setProperty('--photo-origin', '50% 50%'); }, [index]);
  if (!photo) return null;
  return <Dialog open={index !== null} onOpenChange={open => { if (!open) onIndexChange(null); }}>
    <DialogContent className="photo-dialog" aria-describedby={undefined} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
      <DialogTitle className="pr-8">{photo.title}</DialogTitle>
      <div ref={stage} className="photo-stage" data-zoomed={zoom > 1} onPointerMove={event => {
        if (zoom === 1) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--photo-origin', `${Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))}% ${Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100))}%`);
      }} onTouchStart={event => { touch.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => {
        const end = event.changedTouches[0]?.clientX;
        if (zoom === 1 && touch.current !== null && end !== undefined && Math.abs(end - touch.current) > 45) move(end < touch.current ? 1 : -1);
        touch.current = null;
      }}><ResponsiveImage key={photo.src} src={photo.src} alt={photo.alt} width={1920} height={1280} sizes="90vw" style={{ transform: `scale(${zoom})` }} /></div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2"><Button size="icon" variant="outline" aria-label="Previous photograph" title="Previous photograph" disabled={photos.length < 2} onClick={() => move(-1)}><ArrowLeft /></Button><span className="font-mono text-xs text-muted-foreground">{(index ?? 0) + 1} / {photos.length}</span><Button size="icon" variant="outline" aria-label="Next photograph" title="Next photograph" disabled={photos.length < 2} onClick={() => move(1)}><ArrowRight /></Button></div>
        <div className="flex gap-1"><Button size="icon" variant="ghost" aria-label="Zoom out photograph" title="Zoom out" disabled={zoom <= 1} onClick={() => setZoom(Math.max(1, zoom - 0.5))}><ZoomOut /></Button><Button size="icon" variant="ghost" aria-label="Zoom in photograph" title="Zoom in" disabled={zoom >= 3} onClick={() => setZoom(Math.min(3, zoom + 0.5))}><ZoomIn /></Button><Button size="icon" variant="ghost" aria-label="Reset photograph zoom" title="Reset zoom" onClick={() => setZoom(1)}><RotateCcw /></Button></div>
      </div>
    </DialogContent>
  </Dialog>;
}