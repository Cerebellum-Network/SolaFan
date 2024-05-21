import {cx} from '@linaria/core';
import {Box, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core';
import {useCallback, useMemo} from 'react';

import {ReactComponent as TrashBin} from '../../../../assets/svg/trash-bin.svg';
import {CollapseBox} from '../../../../components/primitives/CollapseBox';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {Order} from '../../../../types/order';

export const useStyles = makeStyles((theme) => ({
  table: {
    '& .MuiTableRow-head': {
      '& .MuiTableCell-head': {
        borderBottom: 'none',
      },
    },
    '& .MuiTableCell-head': {
      color: '#5F5C64',
      fontSize: '12px',
      lineHeight: '18px',
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
      },
    },
  },
  accordion: {
    '&:first-child': {
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
    '&:last-child': {
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
  accordionDetails: {
    padding: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
  },
  trashButton: {
    display: 'inline-flex',
    border: '1px solid #FF4F59',
    width: '32px',
    height: '32px',
    padding: '8px!important',
    '& > svg': {
      width: '16px',
      height: '16px',
    },
    borderRadius: '8px',
    '@media (hover: hover)': {
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
}));

interface Column {
  id: string;
  label: string;
  shortLabel?: string;
}

export const SellOrders = ({
  sellOrders,
  showCancelOrderModal,
  className,
}: {
  sellOrders: Order[];
  showCancelOrderModal: (qty: number, orderId: string) => void;
  className?: string;
}) => {
  const styles = useStyles();
  const {t} = useLocalization();

  const columns: Column[] = useMemo(
    () => [
      {id: 'quantity', label: t('Quantity')},
      {id: 'price', label: t('Price')},
    ],
    [t],
  );

  const handleRemoveClick = useCallback(
    (qty: number, orderId: string) => showCancelOrderModal(qty, orderId),
    [showCancelOrderModal],
  );

  if (sellOrders.length === 0) {
    return null;
  }

  return (
    <Box className={cx('rounded-lg w-full border-gray-200 border mb-4 last:mb-0', className)}>
      <CollapseBox
        defaultExpanded={true}
        summary={<Typography variant="body1">{t('My sell orders')}</Typography>}
        classes={{details: styles.accordionDetails, root: styles.accordion}}
      >
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {sellOrders.map((order) => (
              <TableRow>
                <TableCell>{order.amount}</TableCell>
                <TableCell>${order.priceUsd}</TableCell>
                <TableCell align="right">
                  <Box
                    className={styles.trashButton}
                    onClick={() => handleRemoveClick(Number(order.amount), order.orderId.toString())}
                  >
                    <TrashBin />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CollapseBox>
    </Box>
  );
};
