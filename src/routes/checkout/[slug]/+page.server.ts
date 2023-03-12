import type { PageServerLoad } from './$types';
import { paymentById } from '$lib/server/prisma';
import { rp } from '$lib/server/rpClient';

export const load: PageServerLoad = async ({ params }) => {
	const history = await paymentById(params.slug);
	console.log(history);
	let paymentStatus: any = {};
	if (history) {
		try {
			paymentStatus = await rp.orders.fetch(history.rpOrderId);
		} catch (e) {
			console.log(e);
		}
	}
	console.log(paymentStatus);
	return {
		history,
		paymentStatus
	};
};
