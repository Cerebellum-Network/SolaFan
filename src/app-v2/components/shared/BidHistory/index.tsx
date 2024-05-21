import {WalletInterface} from '@cere/services-types';
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {BID_STATUSES, BidInterfaceWithStatus} from '../../../types/auction';
import {getIsUserBid} from '../../../utils/helpers/auction';
import {getMaticNetworkUrl} from '../../../utils/helpers/getMaticNetworkUrl';
import {getDottedDate, getTime} from '../../../utils/helpers/time';
import {ReactComponent as Check} from './assets/check.svg';
import {ReactComponent as EmptyBids} from './assets/emptyBids.svg';
import {ReactComponent as IsProcessing} from './assets/isProcessing.svg';
import {ReactComponent as User} from './assets/user.svg';

const useStyles = makeStyles((theme) => ({
  emptyBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '48px',
  },
  emptyImage: {
    width: '100px',
  },
  emptyText: {
    fontSize: '14px',
    color: theme.palette.text.disabled,
  },

  row: {
    position: 'relative',
    '&:hover': {
      '&::after': {
        content: "''",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.info.main,
        opacity: 0.15,
        pointerEvents: 'none',
      },
    },
  },
  headCell: {
    border: 'none',
    fontSize: '10px',
    fontWeight: 600,
    padding: 0,
  },
  cell: {
    border: 'none',
    padding: 0,
  },
  cellBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '48px',
    padding: '4px',
    [theme.breakpoints.up('md')]: {
      height: '34px',
    },
  },
  firstCellBox: {
    paddingLeft: '12px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '24px',
    },
  },
  endCellBox: {
    paddingRight: '12px',
    [theme.breakpoints.up('md')]: {
      paddingRight: '24px',
    },
  },
  tableText: {
    fontSize: '12px',
    color: theme.palette.grey[700],
  },
  transactionId: {
    maxWidth: '55px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      maxWidth: '120px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '250px',
    },
  },
  dateBox: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

type Column = {
  id: string;
  label: string;
  shortLabel?: string;
};

type Props = {
  bids: BidInterfaceWithStatus[];
  userWalletAddress: string | null;
  externalWallets: WalletInterface[];
  classes?: Partial<Record<'headCell' | 'tableText', string>>;
};

export const BidHistory = memo(({bids, userWalletAddress, externalWallets, classes}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const {isMobile} = useThemeBreakpoints();

  const columns: Column[] = useMemo(
    () => [
      {id: 'priceInUsdCents', label: t('Bids')},
      {id: 'timestamp', label: t('Timestamp')},
      {id: 'transactionId', label: t('Transaction ID'), shortLabel: t('Trans. ID')},
      {id: 'status', label: t('Status')},
    ],
    [t],
  );

  const networkUrl = getMaticNetworkUrl();

  const STATUSES_DATA = useMemo(
    () => ({
      [BID_STATUSES.PENDING]: {icon: <IsProcessing />, text: t('Transaction processing')},
      [BID_STATUSES.COMPLETED]: {icon: <Check />, text: t('Bid setted')},
    }),
    [t],
  );

  if (!bids) {
    return <></>;
  }

  if (bids.length === 0) {
    return (
      <Box className={styles.emptyBox}>
        <EmptyBids className={styles.emptyImage} />
        <Typography className={styles.emptyText}>{t('Be the first to place a bid')}</Typography>
      </Box>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column, i) => (
            <TableCell key={column.id} className={clsx(styles.headCell, classes?.headCell)}>
              <Box className={clsx(styles.cellBox, i === 0 && styles.firstCellBox)}>
                {isMobile && column.shortLabel ? column.shortLabel : column.label}
              </Box>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {bids.map((bid) => (
          <TableRow className={styles.row}>
            <TableCell key={`price-${bid.id}`} className={styles.cell}>
              <Box className={clsx(styles.cellBox, styles.firstCellBox)}>
                <Typography className={clsx(styles.tableText, classes?.tableText)}>${bid.price.toFixed(2)}</Typography>
                {userWalletAddress && getIsUserBid(bid, userWalletAddress, externalWallets) && (
                  <Box ml="10px">
                    <Tooltip title={t('Your bid')}>
                      <User />
                    </Tooltip>
                  </Box>
                )}
              </Box>
            </TableCell>
            <TableCell key={`timestamp-${bid.timestamp}`} className={styles.cell}>
              <Box className={styles.cellBox}>
                <Typography className={clsx(styles.tableText, styles.dateBox, classes?.tableText)}>
                  <span>
                    {getDottedDate(bid.timestamp)}
                    {', '}
                  </span>
                  <span>{getTime(bid.timestamp)}</span>
                </Typography>
              </Box>
            </TableCell>
            <TableCell key={`transactionId-${bid.id}`} className={styles.cell}>
              <Box className={styles.cellBox}>
                <Tooltip title={bid.id}>
                  <Typography className={clsx(styles.tableText, styles.transactionId, classes?.tableText)}>
                    {!!bid.txHash ? (
                      <a href={`${networkUrl}/tx/${bid.txHash}`} className={clsx(styles.tableText, classes?.tableText)}>
                        {bid.id}
                      </a>
                    ) : (
                      bid.id
                    )}
                  </Typography>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell key={`successBid-${bid.timestamp}`} className={styles.cell}>
              <Box className={clsx(styles.cellBox, styles.endCellBox)}>
                {STATUSES_DATA[bid.bidStatus].icon}
                {!isMobile && (
                  <Typography className={clsx(styles.tableText, classes?.tableText)}>
                    {STATUSES_DATA[bid.bidStatus].text}
                  </Typography>
                )}
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
