import { db } from '$lib/database';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the session cookie from the browser
	const sessionCookie = event.cookies.get('session');

	// If the cookie does not exist, load the page as usual
	if (!sessionCookie) {
		return await resolve(event);
	}
	// If the cookie exists, get the user corresponding to the session
	const user = await db.user.findUnique({
		where: { userAuthToken: sessionCookie },
		select: { username: true, role: true }
	});

	// If the user exists, populate event.locals with the user object
	if (user) {
		event.locals.user = { name: user.username, role: user.role.name };
	}
	// If the user does not exist, load the page as usual
	return await resolve(event);
};
