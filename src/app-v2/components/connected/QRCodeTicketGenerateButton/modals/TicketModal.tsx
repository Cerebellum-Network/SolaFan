import {Box, Dialog, Typography} from '@material-ui/core';
import dayjs from 'dayjs';
import QRCode from 'react-qr-code';

import {ReactComponent as CloseIcon} from '../../../../assets/svg/close.svg';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {CmsExhibit, EventTypeEnum, EventTypeName} from '../../../../types/exhibit';
import {ResponsiveImage} from '../../../primitives/ResponsiveImage/responsive-image';

interface TicketModelProps {
  event: Pick<CmsExhibit, 'creator' | 'image' | 'eventType' | 'eventHiddenLocation' | 'startsAt' | 'title'>;
  open: boolean;
  qrCodeData: Record<string, string>;
  onClose: () => void;
}

export const TicketModal = ({event, open, onClose, qrCodeData}: TicketModelProps) => {
  console.log('TicketModal event', event);
  const {t} = useLocalization();

  const qrCodeStringData = JSON.stringify(qrCodeData);

  return (
    <Dialog open={open} className="min-w-[300px]" onClose={onClose}>
      <Box className="p-4">
        <Box className="divide-y flex flex-col gap-4">
          <Box className="flex flex-col">
            <Box className="flex flex-row justify-between">
              <Typography variant="h3">
                {t('In person event with {{creatorName}} - {{eventName}}', {
                  creatorName: event.creator.name,
                  eventName: event.title,
                })}
              </Typography>
              <Box
                className="rounded-full aspect-square bg-gray-200 w-7 h-7 flex items-center justify-center"
                onClick={onClose}
              >
                <CloseIcon className="w-3 h-3" />
              </Box>
            </Box>
            <Box className="flex flex-row gap-4">
              <Box className="basis-1/2 flex flex-col">
                <ResponsiveImage
                  formats={event.image.formats}
                  fallbackUrl={event.image.url}
                  alt="Exhibit"
                  className={'object-scale-down'}
                />
              </Box>
              <Box className="basis-1/2 flex flex-col divide-y">
                <Box className="flex flex-col">
                  <Typography variant="subtitle1">{t('Event type')}</Typography>
                  <Typography>{EventTypeName[event.eventType as EventTypeEnum]}</Typography>
                </Box>
                <Box className="flex flex-col">
                  <Typography variant="subtitle1">{t('Location')}</Typography>
                  <Typography>{t('Offline')}</Typography>
                </Box>
                {event?.startsAt && (
                  <Box className="flex flex-col">
                    <Typography variant="subtitle1">{t('Date & Time')}</Typography>
                    <Typography>{dayjs(event.startsAt).format('MMM DD, YYYY, HH:mm')}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box className="p-4 flex flex-col justify-center items-center">
            <QRCode className="h-[250px] w-[250px]" value={qrCodeStringData} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
