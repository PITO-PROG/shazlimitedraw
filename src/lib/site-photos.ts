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
import wb_truck from '@/assets/mtwara/weighbridge-1.webp';
import wb_office from '@/assets/mtwara/weighbridge-2.webp';
import wb_documented from '@/assets/mtwara/weighbridge-3.webp';
import ld_berth from '@/assets/mtwara/loading-1.webp';
import ld_operation from '@/assets/mtwara/loading-2.webp';
import ld_alongside from '@/assets/mtwara/loading-3.webp';
import ld_stern from '@/assets/mtwara/loading-4.webp';
import al_approach from '@/assets/mtwara/alice-1.webp';
import al_berthed from '@/assets/mtwara/alice-2.webp';
import al_bow from '@/assets/mtwara/alice-3.webp';
import al_alongside from '@/assets/mtwara/alice-4.webp';
import al_crane from '@/assets/mtwara/alice-5.webp';
import al_crew from '@/assets/mtwara/alice-6.webp';
import ll_border_post from '@/assets/yards/lungalunga-1.webp';
import ll_screener from '@/assets/yards/lungalunga-2.webp';
import ll_stockpile from '@/assets/yards/lungalunga-3.webp';
import ll_loader from '@/assets/yards/lungalunga-4.webp';
import ll_shed from '@/assets/yards/lungalunga-5.webp';
import ll_yard from '@/assets/yards/lungalunga-6.webp';
import dv_conveyor from '@/assets/yards/devki-1.webp';
import dv_pointing from '@/assets/yards/devki-2.webp';
import dv_walking from '@/assets/yards/devki-3.webp';
import dv_group from '@/assets/yards/devki-4.webp';
import dv_piles from '@/assets/yards/devki-5.webp';
import dv_inspect from '@/assets/yards/devki-6.webp';
import { novemberMedia } from './november-media';

export const sitePhotos = [
  { src: novemberMedia.crystals, title: 'Clear crystal formations', category: 'Minerals', alt: 'Clear elongated crystals on a wooden surface' },
  { src: metallic, title: 'Metallic crystal faces', category: 'Minerals', alt: 'Reflective geometric faces of a metallic mineral cluster' },
  { src: texture, title: 'Geological surface detail', category: 'Minerals', alt: 'Grey rock surface with weathered geological texture' },
  { src: glowing, title: 'Thermal energy', category: 'Industry', alt: 'Glowing coals with grey ash and orange embers' },
  { src: novemberMedia.coal, title: 'Coal in bulk', category: 'Minerals', alt: 'A collection of dark coal granules' },
  { src: cement, title: 'Cement production', category: 'Industry', alt: 'Cement works with processing towers and industrial chimneys' },
  { src: novemberMedia.steel, title: 'Steel processing', category: 'Industry', alt: 'Industrial steel cutting with a shower of sparks' },
  { src: harbour, title: 'Port & logistics', category: 'Supply chain', alt: 'Shaz team member climbing a cargo hatch beside port cranes' },
  { src: novemberMedia.quarry, title: 'At the source', category: 'Supply chain', alt: 'Haul truck beside grey rock stockpiles in a quarry' },
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
  { src: wb_truck, title: 'Truck on the weighbridge', category: 'Weighbridge — Mtwara yard', alt: 'Loaded haul truck on the weighbridge beside the yard office, with mineral stockpiles behind' },
  { src: wb_office, title: 'The weighbridge office', category: 'Weighbridge — Mtwara yard', alt: 'Weighbridge office at the Mtwara yard with trucks and mineral stockpiles behind' },
  { src: wb_documented, title: 'Weighed and documented', category: 'Weighbridge — Mtwara yard', alt: 'Haul trucks queuing at the weighbridge for weighing and documentation' },
  { src: ld_berth, title: 'MV Alice at the berth', category: 'Loading at Mtwara Port', alt: 'Bulk carrier MV Alice berthed at Mtwara Port with harbour cranes and haul trucks on the quay' },
  { src: ld_operation, title: 'Loading operation under way', category: 'Loading at Mtwara Port', alt: 'Ongoing loading operation at Mtwara Port with the vessel, cranes and a queue of trucks' },
  { src: ld_alongside, title: 'Alongside at Mtwara', category: 'Loading at Mtwara Port', alt: 'Full side view of the bulk carrier alongside the quay at Mtwara Port' },
  { src: ld_stern, title: 'MV Alice, Panama', category: 'Loading at Mtwara Port', alt: 'Stern of the bulk carrier MV Alice of Panama moored at Mtwara Port' },
  { src: al_approach, title: 'Approaching Mtwara', category: 'MV Alice — New Berth, Mtwara', alt: 'Bulk carrier MV Alice approaching Mtwara, seen from the shoreline' },
  { src: al_berthed, title: 'Berthed at the New Berth', category: 'MV Alice — New Berth, Mtwara', alt: 'MV Alice berthed at the New Berth in Mtwara with mooring lines ashore' },
  { src: al_bow, title: 'Bow at the quay', category: 'MV Alice — New Berth, Mtwara', alt: 'Bow of the MV Alice towering over the quay at the New Berth' },
  { src: al_alongside, title: 'Alongside the New Berth', category: 'MV Alice — New Berth, Mtwara', alt: 'Full side view of MV Alice alongside the New Berth quay at Mtwara' },
  { src: al_crane, title: 'Harbour crane on the quay', category: 'MV Alice — New Berth, Mtwara', alt: 'Mobile harbour crane on the quay with the team standing by' },
  { src: al_crew, title: 'Team on the quay', category: 'MV Alice — New Berth, Mtwara', alt: 'Team members on the quay beside the berthed MV Alice' },
  { src: ll_border_post, title: 'HoroHoro One Stop Border Post', category: 'Lunga Lunga yard — HoroHoro border', alt: 'HoroHoro One Stop Border Post building near the Lunga Lunga yard' },
  { src: ll_screener, title: 'Screening plant on site', category: 'Lunga Lunga yard — HoroHoro border', alt: 'Mobile screening plant standing on the cleared Lunga Lunga yard' },
  { src: ll_stockpile, title: 'First stockpiles', category: 'Lunga Lunga yard — HoroHoro border', alt: 'Screener working a mineral stockpile at the Lunga Lunga yard' },
  { src: ll_loader, title: 'Wheel loader at work', category: 'Lunga Lunga yard — HoroHoro border', alt: 'Wheel loader working the surfaced yard at Lunga Lunga' },
  { src: ll_shed, title: 'Yard facilities', category: 'Lunga Lunga yard — HoroHoro border', alt: 'Storage shed and surfaced pads at the Lunga Lunga yard' },
  { src: ll_yard, title: 'The Lunga Lunga yard', category: 'Lunga Lunga yard — HoroHoro border', alt: 'Cleared and surfaced yard at Lunga Lunga near the HoroHoro border' },
  { src: dv_conveyor, title: 'Walking the stockpiles', category: 'Supplier visit — Devki yard', alt: 'Team walking past mineral stockpiles and conveyors at the Devki yard' },
  { src: dv_pointing, title: 'Discussing the ore', category: 'Supplier visit — Devki yard', alt: 'Team member pointing across a stockpile while discussing the material' },
  { src: dv_walking, title: 'Yard walkthrough', category: 'Supplier visit — Devki yard', alt: 'Team walking between dark mineral stockpiles at the Devki yard' },
  { src: dv_group, title: 'Under the conveyors', category: 'Supplier visit — Devki yard', alt: 'Group walking beneath the conveyor gantries at the Devki yard' },
  { src: dv_piles, title: 'Inspecting the piles', category: 'Supplier visit — Devki yard', alt: 'Team in high-visibility vests inspecting stockpiles at the Devki yard' },
  { src: dv_inspect, title: 'With the Devki team', category: 'Supplier visit — Devki yard', alt: 'Shaz team member walking with a Devki staff member in a branded vest' },
  { src: novemberMedia.loading, title: 'Loading for road transport', category: 'Supply chain', alt: 'Wheel loader transferring bulk material into a haul truck' },
  { src: novemberMedia.moltenMetal, title: 'Metal processing', category: 'Industry', alt: 'Molten metal being poured at an industrial foundry' },
  { src: novemberMedia.vessel, title: 'Bulk sea freight', category: 'Supply chain', alt: 'Bulk cargo ship underway on open water' },
  { src: novemberMedia.harbour, title: 'Port handling', category: 'Supply chain', alt: 'Cargo vessel alongside harbour cranes' },
  { src: novemberMedia.lab, title: 'Laboratory sampling', category: 'Quality', alt: 'Gloved hand preparing sample tubes in a laboratory' },
  { src: novemberMedia.quarryWater, title: 'Quarry landscape', category: 'Supply chain', alt: 'Water-filled quarry with exposed rock faces and surrounding trees' },
  { src: novemberMedia.limestone, title: 'Limestone extraction', category: 'Minerals', alt: 'Excavator among pale limestone rocks in a quarry' },
  { src: novemberMedia.crushing, title: 'Bulk material processing', category: 'Industry', alt: 'Mobile crushing plant working through piles of rock' },
] as const;

export type SitePhoto = (typeof sitePhotos)[number];
export function photosForPage(pathname: string): readonly SitePhoto[] {
  if (pathname === '/') return sitePhotos;
  const vessel = sitePhotos.filter(p => p.category === 'Vessel inspection');
  if (pathname.startsWith('/products')) return sitePhotos.filter(p => p.category === 'Minerals');
  if (pathname === '/quality') return [...sitePhotos.filter(p => p.category === 'Supplier visit — Devki yard' || p.category === 'Quality'), ...vessel.slice(6)];
  if (pathname === '/industries') return sitePhotos.filter(p => p.category === 'Industry');
  if (pathname === '/logistics' || pathname === '/services') return sitePhotos.filter(p => p.category === 'Supply chain' || p.category === 'Vessel inspection' || p.category === 'Weighbridge — Mtwara yard' || p.category === 'Loading at Mtwara Port' || p.category === 'MV Alice — New Berth, Mtwara' || p.category === 'Lunga Lunga yard — HoroHoro border');
  return [sitePhotos[8], sitePhotos[7], sitePhotos[9]];
}