import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { photosForPage } from '@/lib/site-photos';
import { PhotoViewer } from './PhotoViewer';
import { ResponsiveImage } from './ResponsiveImage';

export function PhotoGallery() {
  const { pathname } = useLocation();
  const photos = photosForPage(pathname);
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState<number | null>(null);
  const visible = photos.filter(photo => category === 'All' || category === photo.category);
  const categories = ['All', ...new Set(photos.map(photo => photo.category))];
  return <section className="border-y border-border bg-background" aria-label="Photographic collection">
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">Earth · industry · connection</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">Material perspectives.</h2>
      <div className="mt-8 flex flex-wrap gap-2" aria-label="Photo categories">{categories.map(item => <Button key={item} variant={category === item ? 'default' : 'outline'} aria-pressed={category === item} onClick={() => { setCategory(item); setIndex(null); }}>{item}</Button>)}</div>
      <div className="photo-grid mt-8">{visible.map((photo, i) => <Button key={photo.src} variant="ghost" className="photo-tile group" aria-label={`View photograph: ${photo.title}`} onClick={() => setIndex(i)}><ResponsiveImage src={photo.src} alt={photo.alt} loading="lazy" width={1920} height={1280} sizes="(max-width: 640px) 45vw, 320px" /><span className="photo-tile-caption"><span><span className="block font-mono text-xs text-stone">{photo.category}</span><span className="mt-2 block text-lg font-semibold">{photo.title}</span></span><Maximize className="shrink-0" /></span></Button>)}</div>
      <p className="mt-5 text-xs text-muted-foreground">Photographic studies of minerals and industrial environments; not Shaz Ventures facilities or shipment samples.</p>
    </div>
    <PhotoViewer photos={visible} index={index} onIndexChange={setIndex} />
  </section>;
}