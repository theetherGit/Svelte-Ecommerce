import type { PageServerLoad } from './$types';
import { paymentById } from '$lib/server/prisma';
import { rp } from '$lib/server/rpClient';

export const load: PageServerLoad = async ({ params }) => {
	return {
		history: paymentById(params.slug)
	};
};
