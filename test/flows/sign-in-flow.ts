import {Page} from 'playwright';
import {expect} from 'playwright/test';

export async function signInFlow({page, email, otp = '555555'}: {page: Page; email?: string; otp?: string}) {
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
