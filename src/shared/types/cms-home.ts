import {UploadFile} from '@cere/services-types';

import {CmsExhibition, CmsNft, CmsNftWithWallets} from './graphql';

export interface ComponentCmsHomeBannerVisual {
  id: string;
  cms_nft: CmsNftWithWallets;
  cms_exhibit: CmsExhibition;
  mobile: UploadFile;
  tablet: UploadFile;
  desktop: UploadFile;
}

export interface ComponentCmsMarketplaceNft {
  id: string;
  featuredNfts: CmsNft[];
}

export interface CmsHome {
  id: string;
  home_banner_visual: ComponentCmsHomeBannerVisual[];
  home_featured_row: ComponentCmsMarketplaceNft;
}
