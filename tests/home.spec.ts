import { expect, test } from '@playwright/test';

test.describe('Home', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.use({ storageState: 'playwright/.auth/user.json' });

	test('home page has expected h1', async ({ page }) => {
		const h1Element = page.locator('h1');
		await expect(h1Element).toBeVisible();
		await expect(h1Element).toHaveText(/home/i);
	});

	test('User can log out', async ({ page }) => {
		const logoutButton = page.getByRole('button', { name: /log out/i });
		await logoutButton.click();

		const loginTitle = page.getByRole('heading', { name: /log in/i });

		await expect(loginTitle).toBeVisible();
	});
});
