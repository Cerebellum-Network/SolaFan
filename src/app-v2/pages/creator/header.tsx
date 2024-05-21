import {FullCreatorInterface} from '@cere/services-types';
import {Box} from '@material-ui/core';
import {useMemo} from 'react';

import {ReactComponent as VerifiedAuthorIcon} from '../../../assets/icons/verifiedAuthor.svg';
import {ResponsiveImage} from '../../components/primitives/ResponsiveImage/responsive-image';
import {useThemeBreakpoints} from '../../hooks/useThemeBreakpoints';

interface HeaderProps {
  creator: FullCreatorInterface | undefined;
}

export const Header = ({creator}: HeaderProps) => {
  const {isMobile, isTablet} = useThemeBreakpoints();

  const bgImage = useMemo(() => {
    if (isMobile) {
      return creator?.mobileBackgroundImage;
    }
    if (isTablet) {
      return creator?.tabletBackgroundImage;
    }
    return creator?.desktopBackgroundImage;
  }, [
    creator?.desktopBackgroundImage,
    creator?.mobileBackgroundImage,
    creator?.tabletBackgroundImage,
    isMobile,
    isTablet,
  ]);

  return (
    <div>
      <Box className="h-[120px] w-full md:h-[440px] relative">
        <ResponsiveImage
          alt=""
          formats={bgImage?.formats}
          className="object-cover lg:rounded-xl object-center w-full h-full"
          fallbackUrl={bgImage?.url}
        />
        <div className="absolute mx-auto left-0 right-0 translate-y-1/2 bottom-0 w-[100px] md:w-[178px] h-[100px] md:h-[178px] rounded-full overflow-hidden border-2 md:border-[6px] border-white box-border">
          <ResponsiveImage
            alt={creator?.name}
            formats={creator?.avatar.formats}
            className="w-full h-full object-cover"
            fallbackUrl={creator?.avatar.url}
          />
        </div>
      </Box>
      <Box className="flex items-center gap-x-1 justify-center font-bold text-[20px] md:text-[24px] pt-[56px] md:pt-[110px]">
        {creator?.name}
        <VerifiedAuthorIcon />
      </Box>
    </div>
  );
};
