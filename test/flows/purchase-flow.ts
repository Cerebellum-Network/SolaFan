import {Page} from 'playwright';
import {expect} from 'playwright/test';

export async function purchaseFlow({
  page,
  pan = '4111 1111 1111 1111',
  expiry = '12 / 25',
  cvc = '123',
  name = 'Play Wright',
}: {
  page: Page;
  pan?: string;
  expiry?: string;
  cvc?: string;
  name?: string;
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
