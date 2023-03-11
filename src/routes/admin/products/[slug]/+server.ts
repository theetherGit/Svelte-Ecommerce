import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '../../../../lib/server/prisma';

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	let productData;
	try {
		productData = await prisma.tea.delete({
			where: {
				id
			}
		});
	} catch (error) {
		console.log('Product Delete Error', error);
		return json({
			success: false,
			message: `Unable to delete ${productData?.name}`
		});
	}
	return json({
		success: true,
		message: `Deleted Successfully ${productData?.name}`
	});
};
