import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { rp } from '$lib/server/rpClient';
import type { Orders } from 'razorpay/dist/types/orders';

export const POST: RequestHandler = async ({ request }) => {
	const { cartData, userData } = await request.json();
	const toBeSaved = structuredClone(cartData);
	const unableToProcessProduct: any = {};
	let totalAmount = 0;
	let error = false;
	const rp_details = {
		rpOrderId: '',
		rpPaymentId: '',
		rpSignature: '',
		receiptId: '',
	};
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
				const currentItemTotalAmount = currentItem.quantity * currentProduct.price;
				toBeSaved[key].totalAmount = currentItemTotalAmount;
				totalAmount += currentItemTotalAmount;
				console.log(totalAmount)
				await prisma.tea.update({
					where: {
						id: key
					},
					data: {
						quantity: updatedQuantity
					}
				});
			}
		} catch (e) {
			console.log('Check final error', e);
			error = true;
		}
	}
	if (userData['paymentMethod'] === 'cod') {
		message = 'Order placed successfully.';
	}
	if (userData['paymentMethod'] === 'online') {
		const paymentOptions = {
			amount: totalAmount,
			currency: 'INR',
			receipt: `test_online_${userData['name']}_${totalAmount}_${crypto.randomUUID()}`,
			notes: toBeSaved
		} as Orders.RazorpayOrderCreateRequestBody;
		rp.orders.create(paymentOptions, function (err, order) {
			if (err) {
				error = true;
				message = 'Unable to create order please try again.';
			}
			if (order) {
				rp_details["receiptId"] = order['receipt'] as string;
				rp_details["rpOrderId"] = order['id'] as string;
			}
		});
	}

	// const newPaymentHistory = await prisma.paymentHistory()

	console.log(totalAmount, toBeSaved, cartData, userData, unableToProcessProduct);

	return json({
		totalAmount,
		toBeSaved,
		cartData,
		userData,
		unableToProcessProduct,
		success: !error,
		message: `Here is your quantity:`
	});
};
