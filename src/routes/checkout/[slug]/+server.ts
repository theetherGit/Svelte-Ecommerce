import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { RP_SECRET } from '$env/static/private';
import crypto from "crypto"
import {prisma} from "$lib/server/prisma";


export const POST: RequestHandler = async ({ request, params }) => {
	const { rpOrderId, rpPaymentId, rpSignature } = await request.json();
	const currentPayment = await prisma.paymentHistory.findUnique({
		where: {
			id: params.slug
		}
	});
	const key = (rpOrderId + rpPaymentId).toString();
	const expectedSignature = await crypto.createHmac('sha256', RP_SECRET).update(key).digest('hex');
	await prisma.paymentHistory.update({
		where: {
			id: params.slug
		},
		data: {
			rpSignature: rpSignature,
			rpPaymentId: rpPaymentId,
			paymentIsDone: expectedSignature === rpSignature
		}
	});
	console.log(rpOrderId, expectedSignature, rpSignature, expectedSignature === rpSignature);
	return json({isValid: expectedSignature === rpSignature});
};
