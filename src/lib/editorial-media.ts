import { novemberMedia } from './november-media';
import ore from '@/assets/editorial/ore-conveyor.jpg';
import cement from '@/assets/editorial/cement-silos.jpg';
import bridge from '@/assets/editorial/bridge.jpg';
import turbine from '@/assets/editorial/turbine.jpg';
import limestone from '@/assets/editorial/limestone-field.jpg';
import pipelines from '@/assets/editorial/pipelines.jpg';
import gypsum from '@/assets/editorial/gypsum-macro.jpg';
import iron from '@/assets/editorial/iron-macro.jpg';
const { quarry: source, moltenMetal: steelworks, harbour: port, loading: freight, lab, quarryWater: greenQuarry, quarry: quarryWall, vessel } = novemberMedia;

export const editorialMedia = { source, steelworks, port, freight, ore, cement, bridge, turbine, limestone, lab, pipelines, greenQuarry, quarryWall, gypsum, iron, vessel };
export const capabilityPhotos = [source, limestone, freight, port, steelworks, lab, pipelines, turbine];
export const industryPhotos = [cement, steelworks, bridge, novemberMedia.steel, turbine, novemberMedia.crushing];