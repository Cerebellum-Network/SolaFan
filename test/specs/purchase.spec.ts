import {test} from 'playwright/test';

import {purchaseFlow} from '../flows/purchase-flow';
import {signInFlow} from '../flows/sign-in-flow';
import {viewPurchaseFlow} from '../flows/view-purchase-flow';
import {baseUrl} from '../utils';

const landingPage = `${baseUrl}/en/home/event/joey_collins`;

test('Sign in, purchase and view purchase', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(landingPage);

  await signInFlow({page});
  await purchaseFlow({page});
  await viewPurchaseFlow({page});
});
