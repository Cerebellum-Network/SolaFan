import fnv from 'fnv-lite';
import {useMemo} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {EXHIBITION_PREVIEW_KEY} from '../../config/common';

export const checkPreviewKey = (slug: string, previewKey: string): boolean => {
  if (!slug || !previewKey) {
    return false;
  }
  return previewKey === fnv.hex(`${slug}+${EXHIBITION_PREVIEW_KEY()}`);
};

export interface ExhibitPageRouteParams {
  exhibitSlug: string;
}

export const useIsPreviewMode = () => {
  const {exhibitSlug: slug} = useParams<ExhibitPageRouteParams>();
  const history = useHistory();
  return useMemo(() => {
    const query = new URLSearchParams(history.location.search);
    const eventSlug = (slug || query.get('event')) ?? undefined;
    const previewKey = query.get('preview_key') ?? undefined;
    return checkPreviewKey(eventSlug!, previewKey!);
  }, [history.location.search, slug]);
};
