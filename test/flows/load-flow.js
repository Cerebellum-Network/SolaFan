const {expect} = require('playwright/test');
const {baseUrl} = require('../utils');

async function signInFlow({page, email, otp = '555555'}) {
  const emailToEnter = email || `play.wright+${Math.floor(Math.random() * 1000000)}@cere.io`;

  let signInButton = page.locator('button').filter({hasText: 'Sign in'}).first();
  const signInButtonVisible = await signInButton.isVisible();
  if (!signInButtonVisible) {
    await page.getByLabel('toggle menu').click();
    signInButton = page.locator('button').filter({hasText: 'Sign in'}).first();
  }
  await expect(signInButton).toBeVisible();
  await signInButton.click();

  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .getByLabel('Email *')
    .click();
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .getByLabel('Email *')
    .fill(emailToEnter);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .getByLabel('Email *')
    .press('Enter');
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .locator('[data-id="0"]')
    .fill(otp[0]);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .locator('[data-id="1"]')
    .fill(otp[1]);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .locator('[data-id="2"]')
    .fill(otp[2]);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .locator('[data-id="3"]')
    .fill(otp[3]);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .locator('[data-id="4"]')
    .fill(otp[4]);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .locator('[data-id="5"]')
    .fill(otp[5]);
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .getByRole('button', {name: 'Verify'})
    .click();
  await page
    .frameLocator('#torusIframe')
    .frameLocator('iframe[title="Embedded browser"]')
    .getByRole('button', {name: 'Continue'})
    .click();

  await page.getByLabel('toggle menu').click();
  await page.getByRole('menu').getByText(emailToEnter).isVisible();
  await page.getByLabel('close menu').click();
}

async function purchaseFlow({
  page,
  pan = '4111 1111 1111 1111',
  expiry = '12 / 25',
  cvc = '123',
  name = 'Play Wright',
}) {
  const buyButton = page.locator('button').filter({hasText: 'Buy'}).first();
  await expect(buyButton).toBeVisible();
  await buyButton.click();

  const purchasePopup = await page.waitForEvent('popup');
  await purchasePopup.getByPlaceholder('1234 1234 1234').click();
  await purchasePopup.getByPlaceholder('1234 1234 1234').fill(pan);
  await purchasePopup.getByPlaceholder('1234 1234 1234').press('Tab');
  await purchasePopup.getByPlaceholder('MM / YY').fill(expiry);
  await purchasePopup.getByPlaceholder('MM / YY').press('Tab');
  await purchasePopup.getByPlaceholder('CVC').fill(cvc);
  await purchasePopup.getByPlaceholder('Full name on card').click();
  await purchasePopup.getByPlaceholder('Full name on card').fill(name);
  await purchasePopup.getByTestId('hosted-payment-submit-button').click();

  await page.getByText('Thank you for your purchase!').isVisible();
  await page.getByText('Thank you for your purchase!').press('Escape');
}

async function viewPurchaseFlow({page}) {
  await page.getByLabel('toggle menu').click();
  await page.getByRole('menuitem', {name: 'Your Collector Profile'}).click();
  await page.getByRole('heading', {name: 'My Collectibles'}).click();
  const collectibleLinks = await page.$$(`a[href^="/en/home/collectible/"]`);
  await collectibleLinks[0]?.click();
  await page.getByText('Collected').isVisible();
}

module.exports = {
  async loadFlow(page) {
    const landingPage = `/en/home/event/joey_collins`;
    await page.goto(`${baseUrl}${landingPage}`);
    if (Math.random() > 0.5) {
      await signInFlow({page});
      if (Math.random() > 0.8) {
        await purchaseFlow({page});
        await viewPurchaseFlow({page});
      }
    }
  },
};
