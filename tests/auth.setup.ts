import { test as setup, expect } from '@playwright/test';

const adminFile = 'playwright/.auth/admin.json';

setup('Authenticate as admin', async ({ page }) => {
	await page.goto('/login');
	await page.getByLabel('Username').fill('admin1');
	await page.getByLabel('Password').fill('pass1234');
	await page.getByRole('button', { name: /log in/i }).click();

	// Wait for cookies to be set and redirect to /
	await page.waitForURL('/');

	const logoutButton = page.getByRole('button', { name: /log out/i });

	await expect(logoutButton).toBeVisible();

	await page.context().storageState({ path: adminFile });
});

const userFile = 'playwright/.auth/user.json';

setup('Authenticate as user', async ({ page }) => {
	await page.goto('/login');
	await page.getByLabel('Username').fill('user1');
	await page.getByLabel('Password').fill('pass123');
	await page.getByRole('button', { name: /log in/i }).click();

	// Wait for cookies to be set and redirect to /
	await page.waitForURL('/');

	const logoutButton = page.getByRole('button', { name: /log out/i });

	await expect(logoutButton).toBeVisible();

	await page.context().storageState({ path: userFile });
});
