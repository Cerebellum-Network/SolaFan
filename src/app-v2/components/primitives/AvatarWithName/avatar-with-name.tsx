import {CreatorInterface, UploadFileFormatsInterface} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Avatar, Box, Typography} from '@material-ui/core';
import {memo} from 'react';

import {Condition, ConditionsList, Defaults} from '../../shared/Conditions';
import {ResponsiveImage} from '../ResponsiveImage/responsive-image';
import {ReactComponent as VerifiedAuthor} from './verifiedAuthor.svg';

type CreatorAvatar = {
  url: string;
  formats?: UploadFileFormatsInterface;
};

type Creator = Pick<CreatorInterface, 'name'> & {
  avatar?: CreatorAvatar;
};

type Props = {
  creator: Creator | undefined;
  isVerified?: boolean;
  classes?: Partial<Record<'root' | 'avatar' | 'name' | 'verifiedBadge', string>>;
};

export const AvatarWithName = memo(({creator, isVerified, classes}: Props) => {
  const initials = (creator?.name ?? '')
    .split(' ')
    .slice(0, 2)
    .map((text) => text[0])
    .join('');

  return (
    <Box className="flex flex-row gap-1 items-center">
      <ConditionsList>
        <Condition condition={creator?.avatar != null}>
          <ResponsiveImage
            formats={creator?.avatar?.formats}
            className={cx('rounded-full w-[22px] h-[22px] object-center object-cover', classes?.avatar)}
            fallbackUrl={creator?.avatar?.url}
            size={22}
            alt={creator?.name}
          />
        </Condition>
        <Defaults>
          <Avatar className={cx('rounded-full w-[22px] h-[22px]', classes?.avatar)}>{initials}</Avatar>
        </Defaults>
      </ConditionsList>
      <Typography variant="subtitle2" className={classes?.name}>
        {creator?.name}
      </Typography>
      {isVerified && <VerifiedAuthor className="w-[22px] h-[22px]" />}
    </Box>
  );
});

AvatarWithName.displayName = 'AvatarWithName';
