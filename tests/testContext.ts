import { test } from '@playwright/test';
import { mockRoutes } from './mockRoutes';

export const testMedApiMocks = test.extend({
  page: async ({ page }, use, testInfo) => {
    await mockRoutes(page);
    await use(page);
  },
});
