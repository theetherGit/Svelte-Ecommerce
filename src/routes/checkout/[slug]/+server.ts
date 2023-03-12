import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { RP_SECRET } from '$env/static/private';
import crypto from 'crypto';
import { prisma } from '$lib/server/prisma';
import { rp } from '$lib/server/rpClient';

export const POST: RequestHandler = async ({ request, params }) => {
	const { rpOrderId, rpPaymentId, rpSignature } = await request.json();
	const currentPayment = await prisma.paymentHistory.findUnique({
		where: {
			id: params.slug
		}
	});

	let paymentStatus;
	if (rpOrderId) {
		try {
			paymentStatus = await rp.orders.fetch(rpOrderId);
		} catch (e) {
			console.log(e);
		}
	}

	const newData = await prisma.paymentHistory.update({
		where: {
			id: params.slug
		},
		data: {
			rpOrderId: rpOrderId,
			rpSignature: rpSignature,
			rpPaymentId: rpPaymentId,
			paymentIsDone: paymentStatus?.status === 'paid'
		}
	});
	return json({});
};
