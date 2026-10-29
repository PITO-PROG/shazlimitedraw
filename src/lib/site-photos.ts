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
import v_deck_walk from '@/assets/vessel/deck-walk.jpg';
import v_hold_ladder from '@/assets/vessel/hold-ladder.jpg';
import v_captain_briefing from '@/assets/vessel/captain-briefing.jpg';
import v_agent_review from '@/assets/vessel/agent-review.jpg';
import v_hold_floor from '@/assets/vessel/hold-floor.jpg';
import v_crane_side from '@/assets/vessel/crane-side.jpg';
import v_hatch_climb from '@/assets/vessel/hatch-climb.jpg';
import v_quay_deck from '@/assets/vessel/quay-deck.jpg';
import v_master_meeting from '@/assets/vessel/master-meeting.jpg';

export const sitePhotos = [
  { src: crystals, title: 'Clear crystal formations', category: 'Minerals', alt: 'Transparent crystal cluster with natural inclusions' },
  { src: metallic, title: 'Metallic crystal faces', category: 'Minerals', alt: 'Reflective geometric faces of a metallic mineral cluster' },
  { src: texture, title: 'Geological surface detail', category: 'Minerals', alt: 'Grey rock surface with weathered geological texture' },
  { src: glowing, title: 'Thermal energy', category: 'Industry', alt: 'Glowing coals with grey ash and orange embers' },
  { src: coal, title: 'Carbon surface study', category: 'Minerals', alt: 'Dark carbon material with layered cracks and surface detail' },
  { src: cement, title: 'Cement production', category: 'Industry', alt: 'Cement works with processing towers and industrial chimneys' },
  { src: plant, title: 'Industrial operations', category: 'Industry', alt: 'Industrial processing plant with pipes, tanks and equipment' },
  { src: harbour, title: 'Port & logistics', category: 'Supply chain', alt: 'Shaz team member climbing a cargo hatch beside port cranes' },
  { src: quarry, title: 'At the source', category: 'Supply chain', alt: 'Open marble quarry with terraced rock and access roads' },
  { src: quartz, title: 'Quartz specimen', category: 'Minerals', alt: 'Quartz crystals with earthy inclusions and angular faces' },
  { src: v_captain_briefing, title: 'Meeting the Captain', category: 'Vessel inspection', alt: 'Shaz shipper and shipping agent in high-visibility vests meeting in the ship office' },
  { src: v_master_meeting, title: 'Pre-loading briefing', category: 'Vessel inspection', alt: 'Two team members in reflective vests seated in the vessel office' },
  { src: v_agent_review, title: 'Reviewing documents', category: 'Vessel inspection', alt: 'Shipping agent team reviewing paperwork at the ship conference table' },
  { src: v_deck_walk, title: 'On deck', category: 'Vessel inspection', alt: 'Team member in a reflective vest walking the deck toward the port cranes' },
  { src: v_quay_deck, title: 'Along the hatch covers', category: 'Vessel inspection', alt: 'Inspection team walking along the vessel deck at the quay' },
  { src: v_hatch_climb, title: 'Climbing to the holds', category: 'Vessel inspection', alt: 'Team member climbing a hatch ladder under blue sky' },
  { src: v_crane_side, title: 'Hatch inspection', category: 'Vessel inspection', alt: 'Inspector on the hatch coaming with port cranes behind' },
  { src: v_hold_ladder, title: 'Accessing the hold', category: 'Vessel inspection', alt: 'Two team members climbing down to inspect the cargo holds' },
  { src: v_hold_floor, title: 'Hold cleanliness check', category: 'Vessel inspection', alt: 'Empty cargo hold floor inspected for cleanliness before loading' },
] as const;

export type SitePhoto = (typeof sitePhotos)[number];
export function photosForPage(pathname: string): readonly SitePhoto[] {
  if (pathname === '/') return sitePhotos;
  const vessel = sitePhotos.filter(p => p.category === 'Vessel inspection');
  if (pathname.startsWith('/products')) return [sitePhotos[0], sitePhotos[1], sitePhotos[2], sitePhotos[4], sitePhotos[9]];
  if (pathname === '/quality') return [...vessel.slice(6), sitePhotos[0], sitePhotos[9]];
  if (pathname === '/industries') return [sitePhotos[5], sitePhotos[6], sitePhotos[3]];
  if (pathname === '/logistics' || pathname === '/services') return [...vessel, sitePhotos[7], sitePhotos[8]];
  return [sitePhotos[8], sitePhotos[7], sitePhotos[9]];
}