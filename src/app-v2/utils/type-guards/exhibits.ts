import {ExhibitCardInterface, UploadFile} from '@cere/services-types';

export interface CmsHome {
  id: string;
  home_banner_visual: unknown[];
  home_featured_row: unknown;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonical?: string;
  seoImage?: UploadFile;
}

export const isExhibit = (data: unknown): data is ExhibitCardInterface => {
  const exhibit = data as ExhibitCardInterface;
  return Boolean(
    exhibit.id &&
      exhibit.title &&
      exhibit.slug &&
      exhibit.subtitle &&
      exhibit.description &&
      exhibit.image &&
      exhibit.creator,
  );
};

export const isExhibitSeo = (data: unknown): data is CmsHome => {
  const exhibitSeo = data as CmsHome;
  return Boolean(exhibitSeo.seoTitle && exhibitSeo.seoCanonical && exhibitSeo.seoImage);
};
