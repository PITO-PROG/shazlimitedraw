import coalBulk from '@/assets/november/coal-granules.webp';
import clinkerBulk from '@/assets/november/clinker-bulk.webp';
import { novemberMedia } from './november-media';
import coalEmbers from '@/assets/photos/glowing-coals.jpg';
import coalHandling from '@/assets/photos/industrial-plant.jpg';
import clinkerSilos from '@/assets/editorial/cement-silos.jpg';
import clinkerWorks from '@/assets/photos/cement-works.jpg';
import clinkerSamples from '@/assets/editorial/lab.jpg';
import ironStockpile from '@/assets/iron-study.jpg';
import ironHillside from '@/assets/editorial/iron-macro.jpg';
import ironConveyor from '@/assets/editorial/ore-conveyor.jpg';
import gypsumQuarry from '@/assets/editorial/quarry-wall.jpg';
import gypsumSurface from '@/assets/photos/geological-texture.jpg';
import gypsumPit from '@/assets/editorial/source.jpg';
import lithiumMine from '@/assets/landscape.jpg';
import lithiumExcavation from '@/assets/quarry.jpg';
import lithiumConcentrate from '@/assets/photos/metallic-crystals.jpg';
import limestoneBoulders from '@/assets/editorial/limestone-field.jpg';
import limestoneQuarry from '@/assets/editorial/green-quarry.jpg';
import limestoneBench from '@/assets/photos/marble-quarry.jpg';

export type MineralShot = { src: string; alt: string };
export type MineralCollection = { main: string; mainAlt: string; shots: MineralShot[] };

/** One representative bulk-material photo per mineral, in minerals[] order. */
export const mineralPhotos = [coalBulk, clinkerBulk, ironStockpile, gypsumQuarry, lithiumMine, novemberMedia.limestone];

/** The bulk / stockpile studies shown behind each mineral, in minerals[] order. */
export const mineralCollections: MineralCollection[] = [
  {
    main: coalBulk,
    mainAlt: 'Thermal coal study — a collection of dark coal granules',
    shots: [
      { src: coalBulk, alt: 'Thermal coal study — a collection of dark coal granules' },
      { src: coalEmbers, alt: 'Illustrative thermal coal handled as fuel — glowing coal embers' },
      { src: coalHandling, alt: 'Illustrative thermal coal handling — processing facility in daylight' },
    ],
  },
  {
    main: clinkerBulk,
    mainAlt: 'Portland cement clinker — a collection of grey nodules',
    shots: [
      { src: clinkerBulk, alt: 'Portland cement clinker — a collection of grey nodules' },
      { src: clinkerSilos, alt: 'Illustrative clinker storage — cement silos at a grinding plant' },
      { src: clinkerWorks, alt: 'Illustrative clinker production — cement works with kiln stacks' },
      { src: clinkerSamples, alt: 'Illustrative clinker quality check — sample trays of bulk aggregate and powder' },
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
      { src: gypsumPit, alt: 'Illustrative gypsum extraction — terraced rock quarry with machinery' },
    ],
  },
  {
    main: lithiumMine,
    mainAlt: 'Illustrative lithium hard-rock mine — open pit in daylight',
    shots: [
      { src: lithiumMine, alt: 'Illustrative lithium hard-rock mine — open pit in daylight' },
      { src: lithiumExcavation, alt: 'Illustrative lithium excavation — open pit with excavator and haul truck' },
      { src: lithiumConcentrate, alt: 'Illustrative lithium concentrate — granular mineral aggregate' },
    ],
  },
  {
    main: novemberMedia.limestone,
    mainAlt: 'Limestone extraction study — excavator among pale quarry rocks',
    shots: [
      { src: novemberMedia.limestone, alt: 'Limestone extraction study — excavator among pale quarry rocks' },
      { src: limestoneBoulders, alt: 'Illustrative limestone at the source — boulders on open ground' },
      { src: limestoneQuarry, alt: 'Illustrative limestone quarry — open pit in a green landscape' },
      { src: limestoneBench, alt: 'Illustrative limestone bench — terraced quarry face with haul trucks' },
    ],
  },
];
