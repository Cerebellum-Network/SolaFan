import {NotificationEventType} from '@cere/services-types';
import {TransactionalNotificationStatus} from 'app-v2/api/notifications/enums';
import {TransactionalNotification} from 'app-v2/api/notifications/types';
import i18n from 'i18n';
import {ReactElement} from 'react';
import {Trans} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {getPastTime} from '../../../../shared/lib/past-time';
import {ReactComponent as CereIcon} from '../../../assets/svg/cere.svg';
import {ROUTES} from '../../../constants/routes';
import {ResponsiveImage} from '../../primitives/ResponsiveImage/responsive-image';

export const getNotificationImage = (
  notification: TransactionalNotification,
  className: string,
): ReactElement | undefined => {
  if (notification.type === NotificationEventType.CERE_WALLET_CREATED) {
    return <CereIcon className={className} />;
  }

  switch (notification.type) {
    case NotificationEventType.REMINDER_EXHIBIT_STARTS:
    case NotificationEventType.EXHIBITION_LAST_REMINDER:
    case NotificationEventType.EXHIBITION_EARLY_REMINDER:
      return (
        <ResponsiveImage
          alt=""
          className={className}
          formats={notification?.exhibit?.image?.formats}
          size={50}
          fallbackUrl={notification?.exhibit?.image?.url}
        />
      );
    case NotificationEventType.AUCTION_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.LIMITED_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.ACCESS_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.NFT_LISTING_CONFIRMATION:
    case NotificationEventType.NFT_LISTING_SALE_CONFIRMATION:
    case NotificationEventType.AUCTION_BID_CONFIRMATION:
    case NotificationEventType.AUCTION_BID_RECEIVED_CONFIRMATION:
    case NotificationEventType.AUCTION_OVERBID:
    case NotificationEventType.RECOVER_ABANDONED_CARD:
      return (
        <ResponsiveImage
          alt=""
          className={className}
          formats={notification?.nft?.cardImage?.formats}
          size={50}
          fallbackUrl={notification?.nft?.cardImage?.url}
        />
      );
  }

  return undefined;
};

export const getNotificationTitle = (notification: TransactionalNotification): ReactElement => {
  switch (notification.type) {
    case NotificationEventType.AUCTION_OVERBID:
      return (
        <p>
          <Trans
            i18nKey="<strong>{{title}}</strong> overbid in auction, place a new bid"
            values={{title: notification?.nft?.title}}
          />
        </p>
      );

    case NotificationEventType.REMINDER_EXHIBIT_STARTS:
      return (
        <p>
          <Trans i18nKey="<strong>{{title}}</strong> starts now" values={{title: notification?.exhibit?.title}} />
        </p>
      );
    case NotificationEventType.EXHIBITION_EARLY_REMINDER:
      return (
        <p>
          <Trans i18nKey="<strong>{{title}}</strong> starts in 7 days" values={{title: notification?.exhibit?.title}} />
        </p>
      );
    case NotificationEventType.EXHIBITION_LAST_REMINDER:
      return (
        <p>
          <Trans i18nKey="<strong>{{title}}</strong> ends in 2 hours" values={{title: notification?.exhibit?.title}} />
        </p>
      );
    case NotificationEventType.AUCTION_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.LIMITED_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.ACCESS_NFT_PURCHASE_CONFIRMATION:
      return (
        <p>
          <Trans i18nKey="<strong>{{title}}</strong> purchase successful" values={{title: notification?.nft?.title}} />
        </p>
      );
    case NotificationEventType.NFT_LISTING_CONFIRMATION:
      return (
        <p>
          <Trans
            i18nKey="<strong>{{title}}</strong> marketplace listing placed"
            values={{title: notification?.nft?.title}}
          />
        </p>
      );
    case NotificationEventType.NFT_LISTING_SALE_CONFIRMATION:
      return (
        <p>
          <Trans i18nKey="<strong>{{title}}</strong> listing sold" values={{title: notification?.nft?.title}} />
        </p>
      );
    case NotificationEventType.AUCTION_BID_CONFIRMATION:
      return (
        <p>
          <Trans
            i18nKey="<strong>{{title}}</strong> bid placed successfully"
            values={{title: notification?.nft?.title}}
          />
        </p>
      );
    case NotificationEventType.AUCTION_BID_RECEIVED_CONFIRMATION:
      return (
        <p>
          <Trans
            i18nKey="<strong>{{title}}</strong> offer received on listing"
            values={{title: notification?.nft?.title}}
          />
        </p>
      );
    case NotificationEventType.RECOVER_ABANDONED_CARD:
      return (
        <p>
          <Trans
            i18nKey="<strong>{{title}}</strong>  is still available to purchase"
            values={{title: notification?.nft?.title}}
          />
        </p>
      );
    case NotificationEventType.CERE_WALLET_CREATED:
      return (
        <p>
          <Trans i18nKey="Cere wallet created" />
        </p>
      );
    default:
      return <></>;
  }
};

export const getDateLabel = (notification: TransactionalNotification): string => getPastTime(notification.createdAt);

export const getStatusLabel = (notification: TransactionalNotification): string => {
  switch (notification.status) {
    case TransactionalNotificationStatus.NEW:
      return i18n.t('New');
    case TransactionalNotificationStatus.UNREAD:
      return i18n.t('Unread');
    default:
      return '';
  }
};

export const getNotificationLink = (notification: TransactionalNotification, locale: string): string => {
  switch (notification.type) {
    case NotificationEventType.REMINDER_EXHIBIT_STARTS:
    case NotificationEventType.EXHIBITION_EARLY_REMINDER:
    case NotificationEventType.EXHIBITION_LAST_REMINDER:
    case NotificationEventType.AUCTION_NFT_PURCHASE_CONFIRMATION:
      return `/${locale}/home/event/${notification.exhibit?.slug}`;
    case NotificationEventType.AUCTION_OVERBID:
    case NotificationEventType.LIMITED_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.ACCESS_NFT_PURCHASE_CONFIRMATION:
    case NotificationEventType.NFT_LISTING_CONFIRMATION:
    case NotificationEventType.NFT_LISTING_SALE_CONFIRMATION:
    case NotificationEventType.AUCTION_BID_CONFIRMATION:
    case NotificationEventType.AUCTION_BID_RECEIVED_CONFIRMATION:
    case NotificationEventType.RECOVER_ABANDONED_CARD:
      const nftId = notification.nft?.id;
      return nftId == null ? '' : generatePath(ROUTES.NFT_PAGE, {nftId, locale});
    case NotificationEventType.CERE_WALLET_CREATED:
      return '';
    default:
      return `/${locale}/home`;
  }
};
