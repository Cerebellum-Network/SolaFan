import {Box, Divider, Typography} from '@material-ui/core';
import {Help} from '@material-ui/icons';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {memo} from 'react';

import {ReactComponent as Logo} from '../../../assets/svg/logo.svg';
import {
  DISCORD_ONDAVINCI_URL,
  FACEBOOK_ONDAVINCI_URL,
  FAQ_URL,
  INSTAGRAM_ONDAVINCI_URL,
  TWITTER_ONDAVINCI_URL,
} from '../../../constants/common';
import {StyledLink} from '../../primitives/StyledLink';
import {LanguageSelect} from '../LanguageSelect';
import {PageContainer} from '../PageContainer';
import {ReactComponent as DiscordIcon} from './assets/discord.svg';
import {ReactComponent as FacebookIcon} from './assets/facebook.svg';
import {ReactComponent as InstagramIcon} from './assets/instagram.svg';
import {ReactComponent as TwitterIcon} from './assets/twitter.svg';

export const PageFooter = memo(() => {
  const {t, locale} = useLocalization();
  const isHelpBlockDisabled = false;

  return (
    <Box className="bg-[#F0F0F7] py-10">
      <PageContainer>
        <Box className="flex flex-col sm:flex-row sm:justify-between px-4 gap-3">
          <StyledLink to={`/${locale}/home`} className="flex flex-col gap-3">
            <Logo className="h-[30px]" />
            <Typography variant="body1">A New Level of Fan Engagement</Typography>
          </StyledLink>

          <Box className="flex flex-row justify-between items-center gap-6">
            {!isHelpBlockDisabled && (
              <Box className="">
                <a className="flex flex-row gap-2 items-center" href={FAQ_URL} target="_blank" rel="noreferrer">
                  <Help />
                  <span className="">{t('Help & Feedback')}</span>
                </a>
              </Box>
            )}
            <Box className="">
              <LanguageSelect />
            </Box>
          </Box>
        </Box>
      </PageContainer>
      <Box className="py-4">
        <Divider />
      </Box>
      <PageContainer>
        <Box className="flex flex-col sm:flex-row justify-between items-start gap-3 py-3 px-4">
          <Box className="flex">
            <Typography>{`©${new Date().getFullYear()} ${t('DaVinci')}. ${t('All rights reserved')}`}</Typography>
          </Box>

          <Box className="flex flex-row gap-6">
            <a href={INSTAGRAM_ONDAVINCI_URL} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a href={FACEBOOK_ONDAVINCI_URL} target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href={TWITTER_ONDAVINCI_URL} target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </a>
            <a href={DISCORD_ONDAVINCI_URL} target="_blank" rel="noopener noreferrer">
              <DiscordIcon />
            </a>
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
});

PageFooter.displayName = 'PageFooter';
