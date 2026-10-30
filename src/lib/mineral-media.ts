import coalBulk from '@/assets/photos/coal-texture.jpg';
import coalEmbers from '@/assets/photos/glowing-coals.jpg';
import clinkerSilos from '@/assets/editorial/cement-silos.jpg';
import clinkerWorks from '@/assets/editorial/cement-works.jpg';
import ironStockpile from '@/assets/iron-study.jpg';
import ironHillside from '@/assets/editorial/iron-macro.jpg';
import ironConveyor from '@/assets/editorial/ore-conveyor.jpg';
import gypsumQuarry from '@/assets/editorial/quarry-wall.jpg';
import gypsumSurface from '@/assets/photos/geological-texture.jpg';
import lithiumConcentrate from '@/assets/photos/metallic-crystals.jpg';
import lithiumPlant from '@/assets/photos/industrial-plant.jpg';
import limestoneBoulders from '@/assets/editorial/limestone-field.jpg';
import limestoneQuarry from '@/assets/editorial/green-quarry.jpg';
import limestoneBench from '@/assets/photos/marble-quarry.jpg';

export type MineralShot = { src: string; alt: string };
export type MineralCollection = { main: string; mainAlt: string; shots: MineralShot[] };

/** One representative bulk-material photo per mineral, in minerals[] order. */
export const mineralPhotos = [coalBulk, clinkerSilos, ironStockpile, gypsumQuarry, lithiumConcentrate, limestoneBoulders];

/** The bulk / stockpile studies shown behind each mineral, in minerals[] order. */
export const mineralCollections: MineralCollection[] = [
  {
    main: coalBulk,
    mainAlt: 'Illustrative thermal coal in bulk — fractured dark coal surface',
    shots: [
      { src: coalBulk, alt: 'Illustrative thermal coal in bulk — fractured dark coal surface' },
      { src: coalEmbers, alt: 'Illustrative thermal coal handled as fuel — glowing coal embers' },
    ],
  },
  {
    main: clinkerSilos,
    mainAlt: 'Illustrative clinker storage — cement silos at a grinding plant',
    shots: [
      { src: clinkerSilos, alt: 'Illustrative clinker storage — cement silos at a grinding plant' },
      { src: clinkerWorks, alt: 'Illustrative clinker production — cement works with kiln stacks' },
    ],
  },
  {
    main: ironStockpile,
    mainAlt: 'Illustrative iron ore stockpiles at a handling site',
    shots: [
      { src: ironStockpile, alt: 'Illustrative iron ore stockpiles at a handling site' },
      { src: ironHillside, alt: 'Illustrative iron ore at source — excavated hillside with rocky piles' },
      { src: ironConveyor, alt: 'Illustrative iron ore handling — crushed ore stockpile beside a conveyor' },
    ],
  },
  {
    main: gypsumQuarry,
    mainAlt: 'Illustrative gypsum quarry — pale terraced open pit with haul trucks',
    shots: [
      { src: gypsumQuarry, alt: 'Illustrative gypsum quarry — pale terraced open pit with haul trucks' },
      { src: gypsumSurface, alt: 'Illustrative gypsum surface — pale weathered mineral texture' },
    ],
  },
  {
    main: lithiumConcentrate,
    mainAlt: 'Illustrative lithium concentrate — granular mineral aggregate',
    shots: [
      { src: lithiumConcentrate, alt: 'Illustrative lithium concentrate — granular mineral aggregate' },
      { src: lithiumPlant, alt: 'Illustrative lithium processing — plant with pipes and tanks' },
    ],
  },
  {
    main: limestoneBoulders,
    mainAlt: 'Illustrative limestone at the source — boulders on open ground',
    shots: [
      { src: limestoneBoulders, alt: 'Illustrative limestone at the source — boulders on open ground' },
      { src: limestoneQuarry, alt: 'Illustrative limestone quarry — open pit in a green landscape' },
      { src: limestoneBench, alt: 'Illustrative limestone bench — terraced quarry face with haul trucks' },
    ],
  },
];
