import { expect, test } from '@playwright/test';

test.describe('Admin as user', () => {
	// Tests with USER role
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('shows welcome message with username', async ({ page }) => {
		await page.goto('/admin');
		const welcomeMessage = page.getByText(/welcome user1!/i);
		await expect(welcomeMessage).toBeVisible();
	});

	test('shows user role privilege message', async ({ page }) => {
		await page.goto('/admin');
		const privilegeMessage = page.getByText(/you do not have admin privileges\./i);
		await expect(privilegeMessage).toBeVisible();
	});
});

test.describe('Admin as admin', () => {
	// Tests with ADMIN role
	test.use({ storageState: 'playwright/.auth/admin.json' });

	test('shows admin role privilege message', async ({ page }) => {
		await page.goto('/admin');
		const privilegeMessage = page.getByText(/you have admin privileges\./i);
		await expect(privilegeMessage).toBeVisible();
	});
});
