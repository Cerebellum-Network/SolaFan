import {Box, IconButton, makeStyles} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import clsx from 'clsx';
import {MouseEvent, useState} from 'react';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {SearchInput} from '../../primitives/SearchInput';
import {SearchDropdown} from './SearchDropdown';
import {FilterResult, SearchInputCoords} from './types';

const useStyles = makeStyles(() => ({
  searchInputBox: {
    position: 'relative',
    width: 'fit-content',
  },
  searchInputBoxHidden: {
    opacity: 0,
  },
}));

type Props = {
  filterValue: string;
  setFilterValue: (value: string) => void;
  filterResults: FilterResult[];
  filterTotalResults: number;
  isFilterLoading: boolean;
};

export const HeaderSearch = ({
  filterValue,
  setFilterValue,
  filterResults,
  filterTotalResults,
  isFilterLoading,
}: Props) => {
  const styles = useStyles();
  const {isDesktop} = useThemeBreakpoints();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onOpen = () => setIsSearchOpen(true);
  const onClose = () => setIsSearchOpen(false);

  const [searchInputCoords, setSearchInputCoords] = useState<SearchInputCoords>({});
  const onSearchInputClick = (e: MouseEvent<HTMLDivElement>) => {
    setSearchInputCoords(e.currentTarget.getBoundingClientRect());
    onOpen();
  };

  return (
    <>
      {!isDesktop ? (
        <IconButton size="small" color="primary">
          <Search onClick={onOpen} />
        </IconButton>
      ) : (
        <Box
          onClick={onSearchInputClick}
          className={clsx(styles.searchInputBox, isSearchOpen && styles.searchInputBoxHidden)}
        >
          <SearchInput value={filterValue} onFocus={(e) => e.target.blur()} />
        </Box>
      )}

      <SearchDropdown
        isOpen={isSearchOpen}
        onClose={onClose}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        filterResults={filterResults}
        totalResults={filterTotalResults}
        isLoading={isFilterLoading}
        searchInputCoords={searchInputCoords}
      />
    </>
  );
};
