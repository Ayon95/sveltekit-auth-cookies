import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { db } from '$lib/database';
import bcrypt from 'bcrypt';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/');
	}
};

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

const register: Action = async ({ request }) => {
	// Get form data
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	// Validate data
	if (!username || typeof username !== 'string') {
		return fail(400, { invalid: true, message: 'Invalid username was provided.' });
	}

	if (!password || typeof password !== 'string') {
		return fail(400, { invalid: true, message: 'Invalid password was provided.' });
	}

	// Check if user with the provided username already exists in the database
	const user = await db.user.findUnique({ where: { username } });

	if (user) {
		return fail(400, { user: true, message: 'The username is taken' });
	}
	// If user does not exist, create a user in the database
	const passwordHash = await bcrypt.hash(password, 10);

	await db.user.create({
		data: {
			username,
			passwordHash,
			userAuthToken: crypto.randomUUID(),
			// By default, new users will have the USER role
			role: { connect: { name: Roles.USER } }
		}
	});

	throw redirect(303, '/login');
};

export const actions: Actions = { register };
