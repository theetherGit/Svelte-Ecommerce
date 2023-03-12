import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { rp } from '$lib/server/rpClient';
import type { Orders } from 'razorpay/dist/types/orders';

let receipt_count = 0;
export const POST: RequestHandler = async ({ request }) => {
	const { cartData, userData } = await request.json();
	const toBeSaved = structuredClone(cartData);
	const unableToProcessProduct: any = {};
	let totalAmount = 0;
	let error = false;
	let rpDetails: any = {
		rpOrderId: '',
		rpPaymentId: '',
		rpSignature: '',
		receiptId: ''
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
				console.log(totalAmount);
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
	totalAmount = totalAmount * 100;

	if (userData['paymentMethod'] === 'online') {
		const paymentOptions = {
			amount: totalAmount,
			currency: 'INR',
			receipt: `online_${receipt_count}`
		} as Orders.RazorpayOrderCreateRequestBody;
		receipt_count++;
		rp.orders.create(paymentOptions, function (err, order) {
			if (err) {
				error = true;
				message = 'Unable to create order please try again.';
			}
			if (order !== null) {
				rpDetails['receiptId'] = order.receipt;
				rpDetails['rpOrderId'] = order.id;
				console.log(order, rpDetails);

			}
		});
	}

	const finalOrders = Object.keys(toBeSaved).map((key) => ({ productId: key }));
	const newPaymentHistory = await prisma.paymentHistory.create({
		data: {
			unProcessed: unableToProcessProduct,
			processed: toBeSaved,
			userDetails: userData,
			paymentMethod: userData['paymentMethod'],
			totalAmount,
			paymentIsDone: false,
			rpOrderId: rpDetails.rpOrderId,
			rpPaymentId: rpDetails.rpPaymentId,
			rpSignature: rpDetails.rpSignature,
			receiptId: rpDetails.receiptId,
			Order: {
				createMany: {
					data: finalOrders
				}
			}
		}
	});

	console.log(totalAmount, toBeSaved, cartData, userData, unableToProcessProduct, error);

	return json({
		totalAmount,
		toBeSaved,
		cartData,
		userData,
		unableToProcessProduct,
		rpDetails,
		paymentHistory: newPaymentHistory,
		success: !error,
		message
	});
};
