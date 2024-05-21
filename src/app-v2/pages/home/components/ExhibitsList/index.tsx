import {ExhibitCardInterface} from '@cere/services-types';
import {Grid} from '@material-ui/core';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {CardSquare} from '../../../../components/shared/CardSquare/card-square';
import {ExhibitBadge} from '../../../../components/shared/ExhibitBadge';
import {ROUTES} from '../../../../constants/routes';
import {getDottedDate} from '../../../../utils/helpers/time';

type Props = {
  exhibits: ExhibitCardInterface[];
  onShareExhibit: (eventId: string) => void;
};

export const ExhibitsList = memo(({exhibits, onShareExhibit}: Props) => {
  const {i18n} = useTranslation();

  const renderBadge = useCallback(() => <ExhibitBadge />, []);

  return (
    <Grid container spacing={2}>
      {exhibits.map((exhibit) => (
        <Grid key={exhibit.id} item xs={12} md={6} lg={4}>
          <CardSquare
            title={exhibit.title}
            subTitle={exhibit.endsAt ? `Ends ${getDottedDate(exhibit.endsAt)}` : ''}
            image={exhibit.image.url}
            link={generatePath(ROUTES.EVENT, {locale: i18n.language, exhibitSlug: exhibit.slug})}
            onShareClick={onShareExhibit.bind(null, `${exhibit.id}`)}
            creator={exhibit.creator}
            renderBadge={renderBadge}
          />
        </Grid>
      ))}
    </Grid>
  );
});
