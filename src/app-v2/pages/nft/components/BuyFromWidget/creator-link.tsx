import {FullCreatorInterface} from '@cere/services-types/dist/types';
import {generatePath} from 'react-router-dom';

import {AvatarWithName} from '../../../../components/primitives/AvatarWithName/avatar-with-name';
import {StyledLink} from '../../../../components/primitives/StyledLink';
import {ROUTES} from '../../../../constants/routes';
import {useLocalization} from '../../../../hooks/use-locale.hook';

export const CreatorLink = ({creator}: {creator: FullCreatorInterface}) => {
  const {locale} = useLocalization();

  return (
    <StyledLink to={generatePath(ROUTES.CREATOR, {locale: locale, artistId: creator!.id})}>
      {creator && creator.name && creator.avatar && <AvatarWithName creator={creator} isVerified />}
    </StyledLink>
  );
};
