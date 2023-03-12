import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { RP_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request, params }) => {
	const { rpOrderId, rpPaymentId, rpSignature } = await request.json();
	const key = (rpOrderId + rpPaymentId).toString();
	const expectedSignature = await crypto.createHmac('sha256', RP_SECRET).update(key).digest('hex');
	console.log(expectedSignature, rpSignature, expectedSignature === rpSignature);
	return json({});
};
