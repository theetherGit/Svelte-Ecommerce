import type { PageServerLoad } from './$types';
import { allProducts } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		products: allProducts()
	};
};
