import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Box, Layers3, Maximize, Pause, Play, RotateCcw, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { minerals } from "@/lib/content";
import { mineralDetails } from "@/lib/mineral-discovery";
import { Specimen3D } from "./ui";
import { mineralCollections, mineralPhotos } from "@/lib/mineral-media";
import { QuarryFilm } from "./QuarryFilm";

export function MineralDiscovery() {
  const { pathname } = useLocation();
  const initial = Math.max(0, minerals.findIndex((m) => pathname.endsWith(m.slug)));
  const [selected, setSelected] = useState(initial);
  const [surface, setSurface] = useState<"natural" | "polished">("natural");
  const [paused, setPaused] = useState(false);
  const [separation, setSeparation] = useState(0);
  const [reset, setReset] = useState(0);
  const [photo, setPhoto] = useState<number | null>(null);
  const [shot, setShot] = useState(0);

  const [wireframe, setWireframe] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  useEffect(() => {
    setSelected(initial);
    setSeparation(0);
  }, [pathname, initial]);
  useEffect(() => {
    const update = () => {
      const bounds = section.current?.getBoundingClientRect();
      if (bounds) progress.current = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const mineral = minerals[selected] ?? minerals[0];
  const properties = mineralDetails[selected] ?? mineralDetails[0];
  const collection = mineralCollections[selected] ?? mineralCollections[0];

  if (!mineral || !properties) return null;
  return (
    <section ref={section} aria-label="Mineral discovery" className="mineral-discovery border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">The mineral collection</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">Nature. In extraordinary detail.</h2></div>
          <p className="max-w-xs text-sm text-muted-foreground">Raw materials. Distinct structures. Industrial possibilities.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-2" aria-label="Select mineral">
          {minerals.map((m, i) => <Button key={m.slug} variant={selected === i ? "default" : "outline"} onClick={() => { setSelected(i); setSeparation(0); }} aria-pressed={selected === i}>{m.name}</Button>)}
        </div>
        <div className="relative mt-8 grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative min-w-0">
            <div className="pointer-events-none absolute left-0 top-5 z-10 font-mono text-xs text-muted-foreground">SPECIMEN / 0{selected + 1}</div>
            <Specimen3D key={`${reset}-${mineral.slug}`} label={`${mineral.name} interactive geological specimen`} {...mineral.look} surface={surface} paused={paused} separation={separation} wireframe={wireframe} zoom={zoom} scrollProgress={progress} scrollLinked dust className="h-[340px] md:h-[480px]" />
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-3">
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" aria-label={paused ? "Resume specimen rotation" : "Pause specimen rotation"} title={paused ? "Resume rotation" : "Pause rotation"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
                <Button size="icon" variant="ghost" aria-label="Reset specimen view" title="Reset view" onClick={() => { setReset(reset + 1); setSeparation(0); setPaused(false); setZoom(1); setWireframe(false); }}><RotateCcw /></Button>
                <Button size="icon" variant="ghost" aria-label="Zoom in specimen" title="Zoom in" disabled={zoom >= 1.4} onClick={() => setZoom(Math.min(1.4, zoom + 0.2))}><ZoomIn /></Button>
                <Button size="icon" variant="ghost" aria-label="Zoom out specimen" title="Zoom out" disabled={zoom <= 0.8} onClick={() => setZoom(Math.max(0.8, zoom - 0.2))}><ZoomOut /></Button>
                <Button size="icon" variant={wireframe ? 'secondary' : 'ghost'} aria-pressed={wireframe} aria-label="Toggle specimen wireframe" title="Wireframe" onClick={() => setWireframe(!wireframe)}><Box /></Button>
                <Button size="icon" variant="ghost" aria-label="Expand specimen view" title="Expand view" onClick={() => setExpanded(true)}><Maximize /></Button>
              </div>
              <div className="flex gap-1" aria-label="Specimen surface">
                <Button size="sm" variant={surface === "natural" ? "secondary" : "ghost"} aria-pressed={surface === "natural"} onClick={() => setSurface("natural")}><Layers3 />Natural</Button>
                <Button size="sm" variant={surface === "polished" ? "secondary" : "ghost"} aria-pressed={surface === "polished"} onClick={() => setSurface("polished")}><Sparkles />Polished</Button>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label={`${mineral.name} photo collection`}>{collection.shots.map((s, i) => <button key={s.src} type="button" onClick={() => { setPhoto(selected); setShot(i); }} className={`mineral-strip-thumb${photo === selected && shot === i ? " is-active" : ""}`} aria-label={`Open ${mineral.name} photograph ${i + 1} of ${collection.shots.length}`}><img src={s.src} alt={s.alt} width={160} height={120} loading="lazy" /></button>)}</div>
          </div>

          <div className="min-w-0 lg:pl-6" aria-live="polite">
            <p className="eyebrow">Material profile</p><h3 className="mt-3 text-3xl font-bold">{mineral.name}</h3>
            <p className="mt-4 text-muted-foreground">{mineral.intro}</p>
            <dl className="mt-6 space-y-4 border-t border-border pt-5">
              <div><dt className="text-xs text-muted-foreground">Mineralogy</dt><dd className="mt-1 font-mono text-sm">{properties.formula}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Structure</dt><dd className="mt-1 text-sm">{properties.structure}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3">{properties.elements.map((element, i) => <span key={element} className="flex items-center gap-2 text-sm"><i className={`element-dot element-dot-${i}`} />{element}</span>)}</div>
            <div className="mt-7"><label className="mb-4 flex items-center justify-between text-xs text-muted-foreground" htmlFor="structure-separation">Structure separation <span>{separation}%</span></label><Slider id="structure-separation" aria-label="Structure separation" value={[separation]} onValueChange={(v) => setSeparation(v[0] ?? 0)} min={0} max={100} step={1} /></div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{properties.note}</p>
            <Button asChild variant="link" className="mt-3 px-0"><a href={`/products/${mineral.slug}`}>View supply specifications →</a></Button>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {minerals.map((m, i) => {
            const group = mineralCollections[i];
            return <Button key={m.slug} variant="ghost" className="group block h-auto min-w-0 overflow-hidden rounded-sm border border-border p-0 text-left hover:bg-card" aria-label={`View ${m.name} photo collection`} onClick={() => { setSelected(i); setShot(0); setPhoto(i); }}>
              <div className="mineral-photo mineral-photo-collection"><img src={group?.main ?? mineralPhotos[i]} alt={group?.mainAlt ?? `Illustrative ${m.name} geological specimen`} width={512} height={512} loading="lazy" />{group && group.shots.length > 1 && <span className="mineral-photo-stack" aria-hidden="true">{group.shots.slice(1, 3).map((s) => <img key={s.src} src={s.src} alt="" width={96} height={96} loading="lazy" />)}</span>}</div>
              <span className="flex items-center justify-between gap-2 p-4 text-sm">{m.name}<ZoomIn className="text-accent" /></span>
            </Button>;
          })}

        </div>
      </div>
      <QuarryFilm />
      <Dialog open={photo !== null} onOpenChange={(open) => { if (!open) setPhoto(null); }}><DialogContent className="max-w-3xl" aria-describedby={undefined}><DialogTitle>{minerals[photo ?? 0]?.name} — photo collection</DialogTitle>{photo !== null && <div><div className="mineral-photo"><img src={mineralCollections[photo]?.shots[shot]?.src ?? mineralPhotos[photo]} width={512} height={512} alt={mineralCollections[photo]?.shots[shot]?.alt ?? `Illustrative ${minerals[photo]?.name} specimen`} /></div><div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={`${minerals[photo]?.name} photographs`}>{mineralCollections[photo]?.shots.map((s, i) => <button key={s.src} type="button" onClick={() => setShot(i)} aria-pressed={i === shot} aria-label={`Show ${minerals[photo]?.name} photograph ${i + 1} of ${mineralCollections[photo].shots.length}`} className={`mineral-strip-thumb${i === shot ? " is-active" : ""}`}><img src={s.src} alt="" width={96} height={72} loading="lazy" /></button>)}</div></div>}</DialogContent></Dialog>
      <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="specimen-dialog" aria-describedby={undefined}><DialogTitle>{mineral.name} — geological specimen</DialogTitle><Specimen3D label={`${mineral.name} expanded specimen`} {...mineral.look} surface={surface} paused={paused} separation={separation} wireframe={wireframe} zoom={zoom} className="expanded-specimen" /><div className="flex justify-center gap-2"><Button variant="outline" aria-pressed={wireframe} onClick={() => setWireframe(!wireframe)}><Box />Wireframe</Button><Button variant="outline" onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}{paused ? 'Resume' : 'Pause'}</Button></div></DialogContent></Dialog>
    </section>
  );
}