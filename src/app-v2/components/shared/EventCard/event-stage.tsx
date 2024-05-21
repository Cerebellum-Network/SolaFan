import {css, cx} from '@linaria/core';

import {Nft} from '../../../api/creator/types';
import {UsersNftCardInterface} from '../../../types/nft';
import {ResponsiveImage} from '../../primitives/ResponsiveImage/responsive-image';

type Props = {
  nft: UsersNftCardInterface;
  status: Nft['purchaseStatus'];
};

const enabledCss = css`
  filter: unset;
`;
const disabledCss = css`
  filter: grayscale(80%) brightness(0.4);
`;

export function EventStage({nft, status}: Props) {
  const enabled = status === 'USER_HAS_NFT';
  return (
    <div className="group flex shrink-0 relative items-center justify-center w-[54px] lg:w-[96px]">
      <div
        className={cx(
          'absolute',
          'z-10',
          'w-full',
          'top-0',
          'bottom-0',
          'my-auto',
          'h-2',
          !enabled ? 'bg-gray-800' : 'bg-[#b0f41f]',
          'group-first:rounded-l-full',
          'group-last:rounded-r-full',
        )}
      />
      <ResponsiveImage
        className={cx(
          enabled ? enabledCss : disabledCss,
          'relative',
          'z-20',
          'h-6',
          'w-6',
          'bg-gray-700',
          'rounded-sm',
        )}
        formats={nft.formats}
        size={24}
        fallbackUrl={nft.image}
      />
    </div>
  );
}
