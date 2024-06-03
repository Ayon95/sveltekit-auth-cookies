import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';
import { db } from '$lib/database';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/');
	}
};

const login: Action = async ({ request, cookies }) => {
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
	// Check if user exists
	const user = await db.user.findUnique({ where: { username } });

	if (!user) {
		return fail(400, { credentials: true, message: 'Wrong credentials provided.' });
	}

	// Check if password matches
	const passwordMatches = await bcrypt.compare(password, user.passwordHash);

	if (!passwordMatches) {
		return fail(400, { credentials: true, message: 'Wrong credentials provided.' });
	}
	// Generate new auth token in case the current one gets compromised
	const authenticatedUser = await db.user.update({
		where: { username: user.username },
		data: { userAuthToken: crypto.randomUUID() }
	});

	// Set a session cookie containing auth token
	cookies.set('session', authenticatedUser.userAuthToken, {
		// send cookie for every page
		path: '/',
		// client-side JavaScript cannot access the cookie, for example, by document.cookie
		httpOnly: true,
		// Only requests made from the same site can send this cookie
		sameSite: 'strict',
		// In production, cookies can be sent only when a request is made over HTTPS
		secure: process.env.NODE_ENV === 'production',
		// The cookie will expire after a month
		maxAge: 30 * 24 * 60 * 60
	});

	// Redirect the user
	redirect(303, '/');
};

export const actions: Actions = { login };
