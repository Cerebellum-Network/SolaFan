import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {ReactNode} from 'react';
import {useStore} from 'react-redux';
import {generatePath} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {ImageSquareResponsive} from '../../primitives/ImageSquare/image-square-responsive';
import {StyledLink} from '../../primitives/StyledLink';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
  },
  infoBox: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomInfoBox: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  actionElement: {
    width: 'fit-content',
  },
  title: {
    fontWeight: 600,
    paddingBottom: '4px',
  },
  price: {
    fontSize: '16px',
    fontWeight: 600,
  },
}));

export type CardHorizontalProps = {
  nftId: string;
  subTitle: NonNullable<ReactNode>;
  renderActionElement?: () => NonNullable<ReactNode>;
  classes?: Partial<Record<'root', string>>;
  hidePrice?: boolean;
};

export const CardHorizontal = ({
  nftId,
  subTitle,
  renderActionElement,
  classes,
  hidePrice = false,
}: CardHorizontalProps) => {
  const styles = useStyles();
  const {getState} = useStore();
  const state: any = getState();
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);

  if (!nft) {
    return <></>;
  }
  const cardLink = generatePath(ROUTES.NFT_PAGE, {nftId: nft.id, locale});

  return (
    <Box className={clsx(styles.root, classes?.root)}>
      <Box className="w-[100px] rounded-[12px] overflow-hidden">
        <StyledLink to={cardLink}>
          <ImageSquareResponsive size={100} nft={nft as any} />
        </StyledLink>
      </Box>
      <Box className={styles.infoBox}>
        <Box>
          <Typography className={styles.title}>{nft.title}</Typography>
          {subTitle}
        </Box>
        <Box className="flex flex-row-reverse items-end justify-between">
          <Box className={styles.actionElement}>{renderActionElement}</Box>
          {!hidePrice && <Typography className={styles.price}>${nft.priceUsd.toFixed(2)}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};
