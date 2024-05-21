import {NftType} from '@cere/services-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@material-ui/core';
import {ArrowForward, ExpandMoreRounded} from '@material-ui/icons';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';

import {Exhibition, Nft} from '../../../api/collector/types';
import {QrCodeTicketGenerateButton} from '../../../components/connected/QRCodeTicketGenerateButton/QrCodeTicketGenerateButtons';
import {ResponsiveImage} from '../../../components/primitives/ResponsiveImage/responsive-image';
import {EventTypeEnum} from '../../../types/exhibit';

type Props = {
  summaryIcon: ReactNode;
  summaryText: string;
  exhibitions: Exhibition[];
  purchasedNfts: Nft[];
  totalExhibitions: number | undefined;
  walletPublicKey?: string;
};

export const ExhibitionListAccordion: FC<Props> = ({
  summaryIcon,
  summaryText,
  exhibitions,
  purchasedNfts,
  totalExhibitions,
  walletPublicKey,
}) => {
  const {t, locale} = useLocalization();

  const eventTypeToLabel = (exhibition: Exhibition) => {
    switch (exhibition.eventType) {
      case EventTypeEnum.IN_PERSON:
        return exhibition.eventHiddenLocation || exhibition.eventPublicLocation || t('Hidden location');
      case EventTypeEnum.LIVE_STREAM:
        return t('Online');
      default:
        return t('Pre-recorded');
    }
  };

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        aria-controls="panel1-content"
        style={{backgroundColor: '#FBFBFB'}}
      >
        <Box px={1} display="flex" gridGap={8} alignItems="center">
          {summaryIcon}
          <Box flex={1} display="flex" flexDirection="column" gridGap={2}>
            <Typography variant="subtitle2">{summaryText}</Typography>
            <Box display="flex" gridGap={4} alignItems="center">
              <Typography variant="caption" color="textSecondary">
                {t('Events')}:
              </Typography>
              <Typography variant="subtitle2">
                {exhibitions.length} / {totalExhibitions || 0}
              </Typography>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails style={{display: 'flex', flexDirection: 'column', padding: 0}}>
        {exhibitions.map((exhibition, index) => {
          const exhibitionAccessNfts = exhibition.nfts.filter((nft) => nft.relType === NftType.ACCESS);
          const exhibitionNfts = purchasedNfts.filter((nft) => nft.exhibitionId === exhibition.id);
          const unlocked = exhibitionAccessNfts.length === exhibitionNfts.length;

          return (
            <>
              <Link to={`/${locale}/home/event/${exhibition.slug}`}>
                <Box
                  display="flex"
                  style={{gap: 12}}
                  px={2.5}
                  py={1.5}
                  borderBottom={index === exhibitions.length - 1 ? undefined : '1px solid #f1f1f1'}
                  alignItems="center"
                >
                  <Box borderRadius={8} overflow="hidden" bgcolor="#f1f1f1" height="48px">
                    <ResponsiveImage
                      alt={exhibition.title}
                      formats={exhibition.image.formats}
                      size={50}
                      className="w-[50px] h-[50px] object-cover object-center"
                      fallbackUrl={exhibition.image.url}
                    />
                  </Box>
                  <Box pt={0.5} flex={1} display="flex" flexDirection="column" gridGap={2}>
                    <Typography variant="subtitle2">{exhibition.title}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {eventTypeToLabel(exhibition)}
                    </Typography>
                    <Box display="flex" alignItems="center" gridGap={5}>
                      <Typography variant="caption" color="textSecondary">
                        {t('Collected')}
                      </Typography>
                      <Typography variant="caption" style={{fontWeight: 700}}>
                        {exhibitionNfts.length}
                        {' / '}
                        {exhibitionAccessNfts.length}
                      </Typography>
                      <Typography variant="caption" style={{fontWeight: 700, color: unlocked ? 'green' : 'red'}}>
                        {t(unlocked ? 'Unlocked' : 'Locked')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ArrowForward style={{opacity: 0.9, fontSize: 16}} />
                  </Box>
                </Box>
              </Link>
              <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
                <QrCodeTicketGenerateButton
                  userWalletAddress={walletPublicKey}
                  userNfts={purchasedNfts}
                  event={exhibition}
                  buttonSize="small"
                ></QrCodeTicketGenerateButton>
              </Box>
            </>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
