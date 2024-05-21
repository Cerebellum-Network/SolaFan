import {Box, Button} from '@material-ui/core';
import {SubTitle, Title} from 'app-v2/components/primitives/Title';
import {Condition, ConditionsList} from 'app-v2/components/shared/Conditions';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import React from 'react';

import {useGridStyles} from './styles';

export interface NFTFilteredGridProps {
  children: JSX.Element | JSX.Element[];
  placeholder?: JSX.Element;
  title: string;
  subTitle?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export const NFTGrid = ({children, title, subTitle, hasMore, onLoadMore, placeholder}: NFTFilteredGridProps) => {
  const {t} = useLocalization();
  const styles = useGridStyles();
  const childrenArray = React.Children.toArray(children);

  return (
    <Box>
      <Box className={styles.header}>
        <Box className={styles.headerContentWrapper}>
          <Box className={styles.textContent}>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
          </Box>
        </Box>
      </Box>
      <ConditionsList>
        <Condition condition={childrenArray.length > 0}>
          <>{children}</>
          {hasMore && onLoadMore && (
            <Box className={styles.controlsContainer}>
              <Button className={styles.loadMoreButton} onClick={onLoadMore}>
                {t('Show more NFTs')}
              </Button>
            </Box>
          )}
        </Condition>
        <Condition condition={Boolean(placeholder) && !childrenArray.length}>
          <Box className={styles.placeholder}>{placeholder}</Box>
        </Condition>
      </ConditionsList>
    </Box>
  );
};
