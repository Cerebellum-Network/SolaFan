import {Page} from 'playwright';

export async function viewPurchaseFlow({page}: {page: Page}) {
  await page.getByLabel('toggle menu').click();
  await page.getByRole('menuitem', {name: 'Your Collector Profile'}).click();
  await page.getByRole('heading', {name: 'My Collectibles'}).click();
  const collectibleLinks = await page.$$(`a[href^="/en/home/collectible/"]`);
  await collectibleLinks[0]?.click();
  await page.getByText('Collected').click();
}
