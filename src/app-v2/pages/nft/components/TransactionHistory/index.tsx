import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {memo, useMemo} from 'react';
import {Link} from 'react-router-dom';

import {ReactComponent as ExternalLinkIcon} from '../../../../assets/svg/external-link.svg';
import {Truncate} from '../../../../components/shared/Truncate';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {UsersNftCardInterface} from '../../../../types/nft';
import {NftTransfer} from '../../../../types/transfer';

const useStyles = makeStyles(() => ({
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
  externalLink: {
    width: '32px',
    height: '32px',
    padding: '8px',
    border: '1px solid #1D1B20',
    borderRadius: '8px',
  },
}));

interface Column {
  id: string;
  label: string;
  shortLabel?: string;
}
export const TransactionHistory = memo(
  ({
    transfers,
    nft,
    transitionDetailsLink,
  }: {
    transfers: NftTransfer[];
    nft: UsersNftCardInterface;
    transitionDetailsLink: string;
  }) => {
    dayjs.extend(relativeTime);

    const {t} = useLocalization();
    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery<Theme>(() => `${theme.breakpoints.down('sm')}`);

    const columns: Column[] = useMemo(
      () => [
        {id: 'event', label: t('Event')},
        {id: 'price', label: t('Price')},
        ...(isMobile ? [] : [{id: 'from', label: t('From')}]),
        {id: 'to', label: t('To')},
        ...(isMobile ? [] : [{id: 'date', label: t('Date')}]),
      ],
      [isMobile, t],
    );

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow>
              <TableCell>Sale</TableCell>
              <TableCell>${transfer.priceUsd}</TableCell>
              {!isMobile && (
                <TableCell>
                  <Truncate text={transfer.creator} variant="text" maxLength={8} />
                </TableCell>
              )}
              <TableCell>
                <Truncate text={transfer.buyer} variant="text" maxLength={8} />
              </TableCell>
              {!isMobile && <TableCell>{dayjs(transfer.created).fromNow()}</TableCell>}
              <TableCell align="right">
                <Link to={{pathname: transitionDetailsLink}} target="_blank">
                  <Box className={classes.externalLink}>
                    <ExternalLinkIcon />
                  </Box>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Mint</TableCell>
            <TableCell>${nft.priceUsd}</TableCell>
            {!isMobile && <TableCell />}
            <TableCell>
              <Truncate text={nft.minter} variant="text" maxLength={8} />
            </TableCell>
            {!isMobile && <TableCell>{dayjs(nft.availableFrom).fromNow()}</TableCell>}
            <TableCell align="right">
              <Box className={classes.externalLink}>
                <ExternalLinkIcon />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
);
