import {FullCreatorInterface} from '@cere/services-types';
import {Box} from '@material-ui/core';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useTranslation} from 'react-i18next';

import {SubTitle} from '../../components/primitives/Title';
import {CreatorsRowSkeleton} from '../../components/shared/Skeletons';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {CreatorCard} from './components/creator-card';

export type CreatorsPageViewProps = {
  loading: boolean;
  creators: FullCreatorInterface[];
  loadCreators: () => void;
};

export const CreatorsPageView = ({creators, loading, loadCreators}: CreatorsPageViewProps) => {
  const {t} = useTranslation();

  useOnComponentRendered(loadCreators);

  return (
    <PageContainer>
      <div className="pt-8 mb-6 w-3/4">
        <h1 className="text-[28px] font-bold mb-1">{t('Creators')}</h1>
        <SubTitle>
          {t(
            'Verified creators bringing transforming their best work in unique experiences which are exclusively sold on DaVinci.',
          )}
        </SubTitle>
      </div>

      <Box className="pb-8">
        {loading ? (
          <CreatorsRowSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {creators.map((creator) => (
              <div key={creator.id}>
                <CreatorCard creator={creator} />
              </div>
            ))}
          </div>
        )}
      </Box>
    </PageContainer>
  );
};
