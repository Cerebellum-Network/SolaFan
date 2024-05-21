import {VideoPlayer} from '@cere/media-sdk-react';
import {css, cx} from '@linaria/core';
import {styled} from '@linaria/react';
import {useTheme} from '@material-ui/core';

import {ReactComponent as DownloadIcon} from '../../../../assets/svg/download.svg';
import {Loader} from '../../../../components/shared/ContentSlider/SliderItem/loader';
import {UsersNftCardInterface} from '../../../../types/nft';
import {ShareNftButton} from './share-nft-button';

const videoRoot = css`
  & .plyr__poster {
    background-size: cover;
  }

  & .plyr__control.plyr__control--overlaid {
    display: none;
  }
`;

type Props = {
  className?: string;
  onShareClick?: (nftId: string) => void;
  nft: UsersNftCardInterface & {
    teaser?: {
      content?: {
        url: string;
      };
      poster?: {
        url: string;
      };
    };
  };
};

const Download = styled.a<{bg: string}>`
  background-color: ${({bg}) => bg};
  transition: background-color 100ms linear;

  &:hover {
    background-color: transparent;
  }
`;
export function NftTeaser({nft, className, onShareClick}: Props) {
  const theme = useTheme();

  if (nft?.teaser == null || nft?.teaser?.content?.url == null) {
    return null;
  }

  return (
    <div className={cx(className, 'relative', 'rounded-t-xl', 'rounded-b-lg', 'overflow-hidden')}>
      <VideoPlayer
        className={videoRoot}
        src={nft.teaser.content.url}
        hlsEnabled={false}
        loadingComponent={<Loader />}
        videoOverrides={{poster: nft.teaser.poster?.url}}
      />
      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-y-2">
        {onShareClick && <ShareNftButton share={() => onShareClick(nft.id)} />}
        <Download
          target="_blank"
          rel="nofollow noopener"
          href={nft.teaser.content.url}
          download
          bg={theme.palette.grey[900]}
          className="w-[30px] h-[30px] flex items-center justify-center p-[2px] rounded-full"
        >
          <DownloadIcon />
        </Download>
      </div>
    </div>
  );
}
