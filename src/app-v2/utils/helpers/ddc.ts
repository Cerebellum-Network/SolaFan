import {Url} from '../../branded-types/url';

export function buildIFileUrl(cdnUrl: Url | null, bucket: number, cid: string): string {
  if (cdnUrl == null) {
    return '';
  }
  const url = new URL(cdnUrl);
  url.pathname = `ddc/buc/${bucket}/ifile/${cid}`;
  return url.href;
}
