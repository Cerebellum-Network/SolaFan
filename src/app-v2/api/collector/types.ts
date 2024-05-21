import {FullCreatorInterface} from '@cere/services-types';
import {NftCardInterface} from '@cere/services-types';

import {ExhibitInterface} from '../../types/exhibit';
import {UploadedImageFormat} from '../../types/uploaded-image-format';

export type CollectorProfile = {
  collectedNfts: Nft[];
  collectedExhibitions: Exhibition[];
  collectedCreators: Creator[];
};

export type Nft = NftCardInterface & {
  formats?: Record<string, UploadedImageFormat>;
};

export type Exhibition = ExhibitInterface;

export type Creator = FullCreatorInterface & {nfts: Nft[]; exhibitions?: Exhibition[]};
