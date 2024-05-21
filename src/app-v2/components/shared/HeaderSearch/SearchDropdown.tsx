import {Backdrop, Box, Button, makeStyles, Theme, Typography} from '@material-ui/core';
import {ChangeEvent, Fragment, KeyboardEvent, memo} from 'react';
import {Trans, useTranslation} from 'react-i18next';

import {SearchInput} from '../../primitives/SearchInput';
import {SearchSkeleton} from '../Skeletons';
import {FilterResult, SearchInputCoords} from './types';

const useStyles = makeStyles<Theme, SearchInputCoords>((theme) => ({
  backdrop: {
    zIndex: 10,
  },
  modalBox: {
    position: 'absolute',
    [theme.breakpoints.down('lg')]: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.background.paper,
    },
    [theme.breakpoints.up('lg')]: {
      top: ({top}) => `${top ?? 0}px`,
      left: ({left}) => `${left ?? 0}px`,
    },
  },
  searchInputBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    gap: '12px',
    [theme.breakpoints.up('md')]: {
      padding: '8px 40px',
      gap: '20px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: 0,
    },
  },
  searchInput: {
    [theme.breakpoints.down('lg')]: {
      flexGrow: 2,
    },
    [theme.breakpoints.up('lg')]: {
      width: ({width}) => `${width}px`,
    },
  },
  cancelButton: {
    textTransform: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  searchContainer: {
    padding: '8px',
    [theme.breakpoints.up('md')]: {
      padding: '8px 40px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '12px 16px',
      borderRadius: '12px',
      marginTop: '8px',
      backgroundColor: theme.palette.background.paper,
      width: ({width}) => `${width}px`,
    },
  },
  searchTitle: {
    fontSize: '12px',
    color: theme.palette.grey[700],
  },
  searchResultBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '8px 0',
  },
  searchOneResult: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  searchOneResultImage: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
  },
  totalResults: {
    paddingTop: '8px',
    fontSize: '12px',
    color: theme.palette.grey[700],
  },
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  onEnterPress?: () => void;
  filterResults: FilterResult[];
  totalResults: number;
  isLoading?: boolean;
  searchInputCoords?: SearchInputCoords;
};

export const SearchDropdown = memo(
  ({
    isOpen,
    onClose,
    filterValue,
    setFilterValue,
    onEnterPress,
    filterResults,
    totalResults,
    isLoading,
    searchInputCoords,
  }: Props) => {
    const {t} = useTranslation();
    const styles = useStyles(searchInputCoords ?? {});

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value);
    const onClear = () => setFilterValue('');
    const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Enter' && onEnterPress) {
        onEnterPress();
      }
    };

    return (
      <Backdrop open={isOpen} onClick={onClose} className={styles.backdrop}>
        <Box className={styles.modalBox}>
          <Box className={styles.searchInputBox}>
            <SearchInput
              value={filterValue}
              onChange={onInputChange}
              className={styles.searchInput}
              autoFocus
              onKeyPress={onKeyPress}
              onClear={onClear}
            />
            <Button variant="text" className={styles.cancelButton} onClick={onClose}>
              {t('Cancel')}
            </Button>
          </Box>

          {(filterResults.length || isLoading) && (
            <Box className={styles.searchContainer}>
              {isLoading && <SearchSkeleton />}

              {filterResults.map((filterResult) => (
                <Fragment key={filterResult.title}>
                  <Typography className={styles.searchTitle}>{filterResult.title}</Typography>
                  <Box className={styles.searchResultBlock}>
                    {filterResult.results.map((result) => (
                      <Box key={result.text} className={styles.searchOneResult}>
                        <img className={styles.searchOneResultImage} src={result.image} alt={result.text} />
                        <Typography>{result.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Fragment>
              ))}

              {filterResults.length && (
                <Typography className={styles.totalResults}>
                  <Trans
                    i18nKey="Total {{totalResults}} results - press enter to see all"
                    values={{
                      totalResults,
                    }}
                  />
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Backdrop>
    );
  },
);
