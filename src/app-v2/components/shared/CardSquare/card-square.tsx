import {CreatorInterface} from '@cere/services-types';
import {Box, Typography} from '@material-ui/core';
import {memo, ReactElement} from 'react';
import {generatePath} from 'react-router-dom';

import {ReactComponent as ShareIcon} from '../../../assets/svg/share.svg';
import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {AvatarWithName} from '../../primitives/AvatarWithName/avatar-with-name';
import {IconButton} from '../../primitives/IconButton';
import {ImageSquare} from '../../primitives/ImageSquare';
import {StyledLink} from '../../primitives/StyledLink';

type Props = {
  link: string;
  image: string;
  title: string;
  subTitle: string;
  creator: CreatorInterface;
  onShareClick: () => void;
  renderBadge: () => ReactElement;
};

export const CardSquare = memo(({image, link, title, subTitle, creator, onShareClick, renderBadge}: Props) => {
  const {locale} = useLocalization();
  const creatorLink = generatePath(ROUTES.CREATOR, {locale, artistId: creator.id});

  return (
    <Box className="relative rounded-[12px] overflow-hidden">
      <StyledLink to={link}>
        <ImageSquare image={image} />
      </StyledLink>

      <Box className="absolute top-[12px] left-[12px]">{renderBadge()}</Box>

      <IconButton className="absolute top-[12px] right-[12px]" onClick={onShareClick}>
        <ShareIcon />
      </IconButton>

      <Box className="absolute bottom-[12px] left-[12px] right-[12px]">
        <Typography className="text-[12px] font-semibold leading-[20px] text-white pb-[4px]">{subTitle}</Typography>
        <Typography className="text-[14px] font-semibold leading-[20px] text-white pb-[8px]">{title}</Typography>
        <StyledLink to={creatorLink}>
          <AvatarWithName creator={creator} isVerified classes={{name: 'text-white'}} />
        </StyledLink>
      </Box>
    </Box>
  );
});
