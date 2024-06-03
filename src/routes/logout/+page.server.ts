import { redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	// We only need to use this route as an API endpoint, and don't need to render a page
	throw redirect(303, '/');
};

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(303, '/login');
	}
};
