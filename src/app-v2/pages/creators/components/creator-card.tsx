import {FullCreatorInterface, UploadFileInterface} from '@cere/services-types/dist/types';
import {cx} from '@linaria/core';
import {Tooltip} from '@material-ui/core';
import {generatePath, Link} from 'react-router-dom';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {ReactComponent as VerifiedAuthorIcon} from '../../../../assets/icons/verifiedAuthor.svg';
import {ResponsiveImage} from '../../../components/primitives/ResponsiveImage/responsive-image';
import {AutoExpandedBlock} from '../../../components/shared/AutoExpandedBlock/auto-expanded-block';
import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {useValueByResolution} from '../../../utils/hooks/use-resolution.hook';

type Props = {
  creator: FullCreatorInterface;
};

export function CreatorCard({creator}: Props) {
  const {locale} = useLocalization();
  const {value: bgImageByResolution} = useValueByResolution<UploadFileInterface>({
    desktop: creator.desktopBackgroundImage,
    tablet: creator.tabletBackgroundImage,
    mobile: creator.mobileBackgroundImage,
  });

  return (
    <div className="h-[300px] shadow-lg overflow-hidden border-[1px] border-gray-200 md:h-[310px] rounded-lg">
      <Link
        className={cx('h-full', GoogleAnalyticsId.ViewCreatorBtn)}
        to={generatePath(ROUTES.CREATOR, {locale, artistId: creator.id})}
      >
        <div className="h-full">
          <div className={cx('h-[140px]', 'header')}>
            <ResponsiveImage
              className="object-cover block w-full h-full"
              formats={bgImageByResolution?.formats}
              size={500}
              fallbackUrl={bgImageByResolution?.url}
              alt={creator.name}
            />
          </div>
          <div className="relative">
            <ResponsiveImage
              alt={creator.name}
              size={64}
              formats={creator.avatar.formats}
              className="block w-16 h-16 rounded-full object-cover object-center border-4 border-white mx-auto -mt-8 left-0 right-0 bottom-[-32px]"
              fallbackUrl={creator.avatar.url}
            />
            <Tooltip title={creator.name}>
              <div className="flex items-center justify-center gap-x-2 pt-2 mb-2">
                <p className="text-base font-[500] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {creator.name}
                </p>
                <VerifiedAuthorIcon />
              </div>
            </Tooltip>
            <AutoExpandedBlock className="mx-8 text-center" lines={3} disabled>
              <div className="text-[12px]">{creator.about}</div>
            </AutoExpandedBlock>
          </div>
        </div>
      </Link>
    </div>
  );
}
