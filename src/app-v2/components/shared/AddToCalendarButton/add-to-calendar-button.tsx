import {cx} from '@linaria/core';
import {Box, Dialog, Link, Typography} from '@material-ui/core';
import {google, ics, office365, outlook, yahoo} from 'calendar-link';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {ReactComponent as CloseIcon} from '../../../assets/svg/close.svg';
import {ReactComponent as DownloadIcon} from '../../../assets/svg/download.svg';
import {ReactComponent as GoogleCalendarIcon} from '../../../assets/svg/google-calendar.svg';
import {ReactComponent as Microsoft365Icon} from '../../../assets/svg/microsoft-365.svg';
import {ReactComponent as MicrosoftOutlookIcon} from '../../../assets/svg/microsoft-outlook.svg';
import {ReactComponent as YahooIcon} from '../../../assets/svg/yahoo.svg';
import {CmsExhibit} from '../../../types/exhibit';

type Props = {
  event: Pick<
    CmsExhibit,
    'startsAt' | 'endsAt' | 'title' | 'eventHiddenLocation' | 'eventPublicLocation' | 'description'
  >;
};

export const AddToCalendarButton = ({event}: Props) => {
  const {t} = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const dateStart = new Date(event?.startsAt!);
  const dateEnd = new Date(event.endsAt || dateStart.getTime() + 1000 * 60 * 2);
  const location = event.eventHiddenLocation || event.eventPublicLocation;
  const description = event.description;
  const title = event.title;

  const onClose = () => {
    setShowDialog(false);
  };
  const addGoogleCalendarHandler = () => {
    const link = google({
      start: dateStart,
      end: dateEnd,
      title,
      location,
      description,
    });
    window.open(link, '_blank');
    setShowDialog(false);
  };

  const addOutlookCalendarHandler = () => {
    const link = outlook({
      start: dateStart,
      end: dateEnd,
      title,
      location,
      description,
    });
    window.open(link, '_blank');
    setShowDialog(false);
  };

  const addOffice365CalendarHandler = () => {
    const link = office365({
      start: dateStart,
      end: dateEnd,
      title,
      location,
      description,
    });
    window.open(link, '_blank');
    setShowDialog(false);
  };

  const addYahooCalendarHandler = () => {
    const link = yahoo({
      start: dateStart,
      end: dateEnd,
      title,
      location,
      description,
    });
    window.open(link, '_blank');
    setShowDialog(false);
  };

  const addIcsCalendarHandler = () => {
    const link = ics({
      start: dateStart,
      end: dateEnd,
      title,
      location,
      description,
    });
    window.open(link);
    setShowDialog(false);
  };

  return (
    <>
      <Link
        href="#"
        onClick={() => setShowDialog(true)}
        color="secondary"
        underline="always"
        className={cx(GoogleAnalyticsId.AddEventToCalendarBtn)}
      >
        {t('Add to Calendar')}
      </Link>
      <Dialog open={showDialog} onClose={onClose}>
        <Box className="flex flex-col min-w-[300px] px-5 pt-5 pb-2 divide-y">
          <Box className="flex flex-row justify-between items-center pb-3">
            <Typography variant="h3">{t('Add to Calendar')}</Typography>
            <Box className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center" onClick={onClose}>
              <CloseIcon className="w-3 h-3" />
            </Box>
          </Box>
          <Box className="flex flex-row items-center cursor-pointer gap-2 py-3 px-1" onClick={addGoogleCalendarHandler}>
            <GoogleCalendarIcon className="w-5 h-5" />
            <Typography>{t('Google Calendar')}</Typography>
          </Box>
          <Box
            className="flex flex-row items-center cursor-pointer gap-2 py-3 px-1"
            onClick={addOffice365CalendarHandler}
          >
            <Microsoft365Icon className="w-5 h-5" />
            <Typography>{t('Microsoft 365')}</Typography>
          </Box>
          <Box
            className="flex flex-row items-center cursor-pointer gap-2 py-3 px-1"
            onClick={addOutlookCalendarHandler}
          >
            <MicrosoftOutlookIcon className="w-5 h-5" />
            <Typography>{t('Microsoft Outlook')}</Typography>
          </Box>
          <Box className="flex flex-row items-center cursor-pointer gap-2 py-3 px-1" onClick={addYahooCalendarHandler}>
            <YahooIcon className="w-5 h-5" />
            <Typography>{t('Yahoo Calendar')}</Typography>
          </Box>
          <Box className="flex flex-row items-center cursor-pointer gap-2 py-3 px-1" onClick={addIcsCalendarHandler}>
            <DownloadIcon className="w-5 h-5 stroke-black" />
            <Typography>{t('Download ICS')}</Typography>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
