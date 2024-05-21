import {FullCreatorInterface} from '@cere/services-types';
import DateUtils from '@date-io/dayjs';
import {Box, Grid, makeStyles, MenuItem, TextField, Typography} from '@material-ui/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';
import {ChangeEvent, memo, ReactElement, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as VerifiedAuthor} from '../../primitives/AvatarWithName/verifiedAuthor.svg';
import {CloseButton} from '../../primitives/CloseButton';
import {FilterMenu} from '../FilterMenu';
import {FiltersButton} from '../FiltersButton';
import {FilterParams} from './types';

const ALL_CREATORS = 'all_creators';

const useStyles = makeStyles((theme) => ({
  nftCollectiblesHeader: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '24px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: '4px',
      paddingBottom: '28px',
    },
  },
  nftCollectiblesFilter: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '400px',
      maxWidth: '400px',
    },
  },
  closeButtonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
    },
  },
  authorIcon: {
    marginLeft: '4px',
  },
}));

type Props = {
  title: string;
  subTitle?: string;
  hideFilters: boolean;
  rightButton: ReactElement;
  creators: FullCreatorInterface[];
  filterParams: FilterParams;
  setCreatorFilter: (value: string) => void;
  setFromFilter: (value: string) => void;
  setToFilter: (value: string) => void;
  setDateFilter: (value: number) => void;
  clearFilters: () => void;
  applyFilters: () => void;
};

export const NftFilters = memo(
  ({
    title,
    subTitle,
    hideFilters,
    rightButton,
    creators,
    filterParams,
    setCreatorFilter,
    setFromFilter,
    setToFilter,
    setDateFilter,
    clearFilters,
    applyFilters,
  }: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    const [date, setDate] = useState<MaterialUiPickersDate>(null);
    const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);

    const onOpen = useCallback(() => setIsOpenFilterMenu(true), []);
    const onClose = useCallback(() => setIsOpenFilterMenu(false), []);

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
          case 'from':
            return setFromFilter(e.target.value);
          case 'to':
            return setToFilter(e.target.value);
        }
      },
      [setFromFilter, setToFilter],
    );

    const handleCreatorChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setCreatorFilter(e.target.value);
      },
      [setCreatorFilter],
    );

    const handleDateChange = useCallback(
      (date: MaterialUiPickersDate) => {
        setDate(date);
        date?.valueOf() && setDateFilter(date?.valueOf());
      },
      [setDateFilter],
    );

    const onClearFilters = useCallback(() => {
      clearFilters();
      handleDateChange(null);
      onClose();
    }, [clearFilters, handleDateChange, onClose]);

    const onApplyFilters = useCallback(() => {
      applyFilters();
      onClose();
    }, [applyFilters, onClose]);

    const filtersCount = useMemo(() => {
      const filterValues = Object.values(filterParams);
      return filterValues.filter((v) => !(v === ALL_CREATORS || !v)).length;
    }, [filterParams]);

    const creatorOptions = useMemo<{value: string; label: string; icon?: ReactElement}[]>(
      () => [
        {value: ALL_CREATORS, label: t('All creators')},
        ...creators.map((creator) => ({
          value: creator.id,
          label: creator.name,
          icon: <VerifiedAuthor className={styles.authorIcon} />,
        })),
      ],
      [creators, styles, t],
    );

    const priceFields = useMemo(
      () => (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="from"
              value={filterParams?.from ?? ''}
              onChange={handleInputChange}
              variant="outlined"
              placeholder={t('From')}
              fullWidth
              className={styles.input}
              inputProps={{type: 'number'}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="to"
              value={filterParams?.to ?? ''}
              onChange={handleInputChange}
              variant="outlined"
              placeholder={t('To')}
              fullWidth
              className={styles.input}
              inputProps={{type: 'number'}}
            />
          </Grid>
        </Grid>
      ),
      [filterParams?.from, filterParams?.to, handleInputChange, styles, t],
    );

    const creatorFields = useMemo(
      () => (
        <TextField
          select
          variant="outlined"
          value={filterParams?.creator ?? ALL_CREATORS}
          onChange={handleCreatorChange}
          fullWidth
          className={styles.input}
        >
          {creatorOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label} {option?.icon}
            </MenuItem>
          ))}
        </TextField>
      ),
      [filterParams?.creator, creatorOptions, handleCreatorChange, styles],
    );

    const dateFields = useMemo(
      () => (
        <MuiPickersUtilsProvider utils={DateUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            fullWidth
            format="MM/DD/YYYY"
            autoOk
            placeholder={t('Select date')}
            value={date}
            onChange={handleDateChange}
            className={styles.input}
          />
        </MuiPickersUtilsProvider>
      ),
      [date, handleDateChange, styles, t],
    );

    return (
      <>
        <Box className={styles.nftCollectiblesHeader}>
          <Box>
            <Typography variant="h2">{title}</Typography>
            {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
          </Box>
          {!hideFilters && (
            <Box className={styles.nftCollectiblesFilter}>
              <>
                {isOpenFilterMenu ? (
                  <Box className={styles.closeButtonBox}>
                    <CloseButton onClick={onClose} />
                  </Box>
                ) : (
                  <Grid container spacing={1} style={{width: '100%'}}>
                    <Grid item xs={6}>
                      <FiltersButton filtersCount={filtersCount} onClick={onOpen} />
                    </Grid>
                    <Grid item xs={6}>
                      {rightButton}
                    </Grid>
                  </Grid>
                )}
              </>
            </Box>
          )}
        </Box>

        <FilterMenu
          open={isOpenFilterMenu}
          priceFields={priceFields}
          creatorFields={creatorFields}
          dateFields={dateFields}
          onClose={onClose}
          onClear={onClearFilters}
          onApply={onApplyFilters}
        />
      </>
    );
  },
);
