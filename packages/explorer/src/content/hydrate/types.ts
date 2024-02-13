import type { GalactiksConfig } from '@galactiks/config';
import type {
  Content,
  ContentlayerPerson,
  ContentlayerWebPageDocument,
  ContentlayerWebsite,
} from '../../types/index.js';

export type ComputeDTO<T> = {
  config: GalactiksConfig;
  documents: T[];
  websites: ContentlayerWebsite[];
  people: ContentlayerPerson[];
};

export type ComputeHandler = (
  config: GalactiksConfig,
  websites: ContentlayerWebsite[],
  people: ContentlayerPerson[]
) => (documents: ContentlayerWebPageDocument) => Promise<Content[]>;
