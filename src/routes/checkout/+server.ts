import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const { cartData, userData } = await request.json();
	const toBeSaved = structuredClone(cartData);
	const unableToProcessProduct: any = {};
	let totalAmount = 0;
	let error = false;
	let message = 'Order successfully created, Please complete your payment.';
	for (const key of Object.keys(cartData)) {
		const currentItem = cartData[key];
		try {
			const currentProduct = await prisma.tea.findUnique({
				where: {
					id: key
				},
				select: {
					quantity: true,
					price: true
				}
			});
			if (currentProduct) {
				if (currentProduct.quantity < currentItem.quantity) {
					unableToProcessProduct[key] = currentItem;
					delete toBeSaved[key];
					continue;
				}
				const updatedQuantity = currentProduct.quantity - currentItem.quantity;
				const currentItemTotalAmount= currentItem.quantity * currentProduct.price;
				toBeSaved[key].totalAmount = currentItemTotalAmount;
				totalAmount += currentItemTotalAmount;
				await prisma.tea.update({
					where: {
						id: key
					},
					data: {
						quantity: updatedQuantity
					}
				})

			}
		} catch (e) {
			console.log("Check final error", e);
			error = true;
		}
	}
	if (userData["paymentMethod"] === 'cod') {
		message = 'Order placed successfully.';
	}

	console.log(totalAmount, toBeSaved, cartData, userData, unableToProcessProduct);

	return json({
		totalAmount, toBeSaved, cartData, userData, unableToProcessProduct,
		success: !error,
		message: `Here is your quantity:`
	});
};
