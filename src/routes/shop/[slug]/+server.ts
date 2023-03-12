import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ request, params }) => {
	const id = params.slug;
	let productData;
	try {
		productData = await prisma.tea.findUnique({
			where: {
				id
			},
			select: {
				quantity: true
			}
		});
	} catch (error) {
		console.log('Product GET Error', error);
		return json({
			success: false,
			message: `Prisma Error`
		});
	}
	return json({
		success: true,
		quantity: productData?.quantity,
		message: `Here is your quantity: ${productData?.quantity}`
	});
};
