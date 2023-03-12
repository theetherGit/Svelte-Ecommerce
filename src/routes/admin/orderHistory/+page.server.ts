import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	return {
		orders: prisma.paymentHistory.findMany()
	};
};
