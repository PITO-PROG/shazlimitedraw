import crystals from '@/assets/photos/clear-crystals.jpg';
import metallic from '@/assets/photos/metallic-crystals.jpg';
import texture from '@/assets/photos/geological-texture.jpg';
import glowing from '@/assets/photos/glowing-coals.jpg';
import coal from '@/assets/photos/coal-texture.jpg';
import cement from '@/assets/photos/cement-works.jpg';
import plant from '@/assets/photos/industrial-plant.jpg';
import harbour from '@/assets/photos/harbour-logistics.jpg';
import quarry from '@/assets/photos/marble-quarry.jpg';
import quartz from '@/assets/photos/quartz-specimen.jpg';

export const sitePhotos = [
  { src: crystals, title: 'Clear crystal formations', category: 'Minerals', alt: 'Transparent crystal cluster with natural inclusions' },
  { src: metallic, title: 'Metallic crystal faces', category: 'Minerals', alt: 'Reflective geometric faces of a metallic mineral cluster' },
  { src: texture, title: 'Geological surface detail', category: 'Minerals', alt: 'Grey rock surface with weathered geological texture' },
  { src: glowing, title: 'Thermal energy', category: 'Industry', alt: 'Glowing coals with grey ash and orange embers' },
  { src: coal, title: 'Carbon surface study', category: 'Minerals', alt: 'Dark carbon material with layered cracks and surface detail' },
  { src: cement, title: 'Cement production', category: 'Industry', alt: 'Cement works with processing towers and industrial chimneys' },
  { src: plant, title: 'Industrial operations', category: 'Industry', alt: 'Industrial processing plant with pipes, tanks and equipment' },
  { src: harbour, title: 'Port & logistics', category: 'Supply chain', alt: 'Container ships and cranes at a brightly lit harbour at night' },
  { src: quarry, title: 'At the source', category: 'Supply chain', alt: 'Open marble quarry with terraced rock and access roads' },
  { src: quartz, title: 'Quartz specimen', category: 'Minerals', alt: 'Quartz crystals with earthy inclusions and angular faces' },
] as const;

export type SitePhoto = (typeof sitePhotos)[number];
export function photosForPage(pathname: string): readonly SitePhoto[] {
  if (pathname === '/') return sitePhotos;
  if (pathname.startsWith('/products') || pathname === '/quality') return [sitePhotos[0], sitePhotos[1], sitePhotos[2], sitePhotos[4], sitePhotos[9]];
  if (pathname === '/industries') return [sitePhotos[5], sitePhotos[6], sitePhotos[3]];
  if (pathname === '/logistics' || pathname === '/services') return [sitePhotos[7], sitePhotos[6], sitePhotos[8]];
  return [sitePhotos[8], sitePhotos[7], sitePhotos[9]];
}