import type { PageServerLoad } from './$types';
import { productBySlug } from '$lib/server/prisma';

export const load: PageServerLoad = ({ params }) => {
	return {
		product: productBySlug(params.slug)
	};
};
