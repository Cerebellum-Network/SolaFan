import {Box, Button, makeStyles, Menu, MenuItem, Typography} from '@material-ui/core';
import {Check} from '@material-ui/icons';
import {memo, MouseEvent, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {SortingOrder, SortingVariants} from '../../../types/filters';
import {CloseButton} from '../../primitives/CloseButton';
import {ReactComponent as RecentlyAddedIcon} from './recentlyAdded.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    textTransform: 'none',
    backgroundColor: theme.palette.common.white,
    whiteSpace: 'nowrap',
  },
  menu: {
    padding: 0,
  },
  menuBox: {
    padding: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.text.disabled,
  },
  menuItem: {
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '16px',
    fontWeight: 600,
  },
  icon: {
    color: theme.palette.success.main,
  },
}));

type Props = {
  setSortingOrder: (variant: SortingVariants, order: SortingOrder) => void;
};

export const SortByButton = memo(({setSortingOrder}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const options = useMemo(
    () => [
      {
        variant: SortingVariants.CREATED_AT,
        order: SortingOrder.DESC,
        text: t('Recently added'),
      },
      {
        variant: SortingVariants.PRICE,
        order: SortingOrder.ASC,
        text: t('Lowest price'),
      },
      {
        variant: SortingVariants.PRICE,
        order: SortingOrder.DESC,
        text: t('Highest price'),
      },
    ],
    [t],
  );

  const [buttonText, setButtonText] = useState(options[0].text);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget), []);
  const onClose = useCallback(() => setAnchorEl(null), []);

  const onItemClick = useCallback(
    (text: string, variant: SortingVariants, order: SortingOrder) => {
      setButtonText(text);
      setSortingOrder(variant, order);
      onClose();
    },
    [setSortingOrder, onClose],
  );

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<RecentlyAddedIcon />}
        className={styles.button}
        onClick={onClick}
      >
        {buttonText}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose} classes={{list: styles.menu}}>
        <Box className={styles.menuBox}>
          <Box className={styles.header}>
            <Typography className={styles.headerTitle}> {t('Sort by')}</Typography>
            <CloseButton onClick={onClose} />
          </Box>
          {options.map((option) => (
            <MenuItem
              key={option.text}
              className={styles.menuItem}
              onClick={onItemClick.bind(null, option.text, option.variant, option.order)}
            >
              {option.text}
              {buttonText === option.text && <Check className={styles.icon} />}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
});
