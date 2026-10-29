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
import wb_truck from '@/assets/mtwara/weighbridge-1.webp.asset.json';
import wb_office from '@/assets/mtwara/weighbridge-2.webp.asset.json';
import wb_documented from '@/assets/mtwara/weighbridge-3.webp.asset.json';
import ld_berth from '@/assets/mtwara/loading-1.webp.asset.json';
import ld_operation from '@/assets/mtwara/loading-2.webp.asset.json';
import ld_alongside from '@/assets/mtwara/loading-3.webp.asset.json';
import ld_stern from '@/assets/mtwara/loading-4.webp.asset.json';
import al_approach from '@/assets/mtwara/alice-1.webp.asset.json';
import al_berthed from '@/assets/mtwara/alice-2.webp.asset.json';
import al_bow from '@/assets/mtwara/alice-3.webp.asset.json';
import al_alongside from '@/assets/mtwara/alice-4.webp.asset.json';
import al_crane from '@/assets/mtwara/alice-5.webp.asset.json';
import al_crew from '@/assets/mtwara/alice-6.webp.asset.json';
import ll_border_post from '@/assets/yards/lungalunga-1.webp.asset.json';
import ll_screener from '@/assets/yards/lungalunga-2.webp.asset.json';
import ll_stockpile from '@/assets/yards/lungalunga-3.webp.asset.json';
import ll_loader from '@/assets/yards/lungalunga-4.webp.asset.json';
import ll_shed from '@/assets/yards/lungalunga-5.webp.asset.json';
import ll_yard from '@/assets/yards/lungalunga-6.webp.asset.json';
import dv_conveyor from '@/assets/yards/devki-1.webp.asset.json';
import dv_pointing from '@/assets/yards/devki-2.webp.asset.json';
import dv_walking from '@/assets/yards/devki-3.webp.asset.json';
import dv_group from '@/assets/yards/devki-4.webp.asset.json';
import dv_piles from '@/assets/yards/devki-5.webp.asset.json';
import dv_inspect from '@/assets/yards/devki-6.webp.asset.json';

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
  { src: wb_truck.url, title: 'Truck on the weighbridge', category: 'Weighbridge — Mtwara yard', alt: 'Loaded haul truck on the weighbridge beside the yard office, with mineral stockpiles behind' },
  { src: wb_office.url, title: 'The weighbridge office', category: 'Weighbridge — Mtwara yard', alt: 'Weighbridge office at the Mtwara yard with trucks and mineral stockpiles behind' },
  { src: wb_documented.url, title: 'Weighed and documented', category: 'Weighbridge — Mtwara yard', alt: 'Haul trucks queuing at the weighbridge for weighing and documentation' },
  { src: ld_berth.url, title: 'MV Alice at the berth', category: 'Loading at Mtwara Port', alt: 'Bulk carrier MV Alice berthed at Mtwara Port with harbour cranes and haul trucks on the quay' },
  { src: ld_operation.url, title: 'Loading operation under way', category: 'Loading at Mtwara Port', alt: 'Ongoing loading operation at Mtwara Port with the vessel, cranes and a queue of trucks' },
  { src: ld_alongside.url, title: 'Alongside at Mtwara', category: 'Loading at Mtwara Port', alt: 'Full side view of the bulk carrier alongside the quay at Mtwara Port' },
  { src: ld_stern.url, title: 'MV Alice, Panama', category: 'Loading at Mtwara Port', alt: 'Stern of the bulk carrier MV Alice of Panama moored at Mtwara Port' },
] as const;

export type SitePhoto = (typeof sitePhotos)[number];
export function photosForPage(pathname: string): readonly SitePhoto[] {
  if (pathname === '/') return sitePhotos;
  const vessel = sitePhotos.filter(p => p.category === 'Vessel inspection');
  if (pathname.startsWith('/products')) return [sitePhotos[0], sitePhotos[1], sitePhotos[2], sitePhotos[4], sitePhotos[9]];
  if (pathname === '/quality') return [...vessel.slice(6), sitePhotos[0], sitePhotos[9]];
  if (pathname === '/industries') return [sitePhotos[5], sitePhotos[6], sitePhotos[3]];
  if (pathname === '/logistics' || pathname === '/services') return sitePhotos.filter(p => p.category === 'Vessel inspection' || p.category === 'Weighbridge — Mtwara yard' || p.category === 'Loading at Mtwara Port');
  return [sitePhotos[8], sitePhotos[7], sitePhotos[9]];
}