import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname === '/admin') {
		throw redirect(307, '/admin/products');
	}
	const response = await resolve(event);
	return response;
}) satisfies Handle;
