<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_RP_KEY } from '$env/static/public';
	import { cartStore, cartViewStore, fetchHelper } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import { slide, draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	$: cartViewStore.set(false);
	$: totalPayment = () => {
		let sumToPay = 0;
		Object.keys($cartStore).forEach((key) => {
			sumToPay += $cartStore[key].totalAmount;
		});
		return sumToPay;
	};
	$: totalPaymentSum = totalPayment();

	let handleMultipleData = {
		showInfo: true,
		showShipping: false,
		showBilling: false,
		showPayment: false
	};
	const allData = {
		name: '',
		email: '',
		phone: '',
		shipAddress: '',
		shipState: '',
		shipPinCode: '',
		billAddress: '',
		billState: '',
		billPinCode: '',
		shipIsBill: false,
		paymentMethod: 'online'
	};
	let enableCheckOutLoader = false;

	const handleMultipleDataShow = async (key) => {
		const newHandleMultipleData = { ...handleMultipleData };
		Object.keys(newHandleMultipleData).forEach((objectKey) => {
			if (objectKey === key) {
				newHandleMultipleData[key] = true;
			} else {
				newHandleMultipleData[objectKey] = false;
			}
		});
		handleMultipleData = newHandleMultipleData;
	};

	const handleServerSubmission = async () => {
		enableCheckOutLoader = true;
		let afterSuccessRedirectURL;
		const afterPaymentRpDetails = {
			rpOrderId: '',
			rpPaymentId: '',
			rpSignature: ''
		};
		const options = {
			key: PUBLIC_RP_KEY,
			amount: '',
			currency: 'INR',
			name: 'Test FromBhutan',
			description: 'Test Transaction',
			order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: function (response) {
				afterPaymentRpDetails['rpOrderId'] = response.razorpay_payment_id;
				afterPaymentRpDetails['rpPaymentId'] = response.razorpay_payment_id;
				afterPaymentRpDetails['rpSignature'] = response.razorpay_signature;
				const validation = fetchHelper('POST', afterSuccessRedirectURL.toString(), {
					rpOrderId: afterPaymentRpDetails['rpOrderId'],
					rpPaymentId: afterPaymentRpDetails['rpPaymentId'],
					rpSignature: afterPaymentRpDetails['rpSignature']
				});
				toast.success('Payment successfully completed.');
			},
			prefill: {
				name: allData['name'],
				email: allData['email'],
				contact: allData['phone']
			},
			notes: {},
			theme: {
				color: '#000'
			}
		};
		const response = await fetchHelper('POST', '/checkout', {
			userData: allData,
			cartData: $cartStore
		});
		if (!response.success) {
			toast.error(response.message);
			enableCheckOutLoader = false;
		}
		afterSuccessRedirectURL = `/checkout/${response.paymentHistory.id}`;
		if (Object.keys(response.toBeSaved).length < 1) {
			toast.error("Products you have in cart can't be processed because of availability");
			enableCheckOutLoader = false;
			return;
		}
		toast.success(response.message);
		if (response.userData['paymentMethod'] === 'cod') {
			await goto(afterSuccessRedirectURL);
			return;
		}
		options['order_id'] = response.rpDetails.rpOrderId;
		options['amount'] = response.totalAmount;
		let rpNewPayment = new Razorpay(options);
		rpNewPayment.on('payment.failed', function (response) {
			console.log(response.error, response);
			toast.error(
				`While completing your payment an error occurred. ${response.error.description}, ${response.error.reason}`
			);
			// alert(response.error.code);
			// alert(response.error.description);
			// alert(response.error.source);
			// alert(response.error.step);
			// alert(response.error.reason);
			// alert(response.error.metadata.order_id);
			// alert(response.error.metadata.payment_id);
		});
		rpNewPayment.open();

		enableCheckOutLoader = false;
	};

	$: if (allData['shipIsBill']) {
		allData['billState'] = allData['shipState'];
		allData['billAddress'] = allData['shipAddress'];
		allData['billPinCode'] = allData['shipPinCode'];
	}
</script>

<svelte:head>
	<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</svelte:head>
<section class="py-12 sm:py-16 lg:py-20">
	<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
		<div class="flex items-center justify-center">
			<h1 class="text-2xl font-bold text-gray-100">Checkout</h1>
			<span
				class="px-2 py-1 ml-4 text-xs font-bold tracking-widest uppercase bg-gray-500 rounded-full py-1 text-gray-100"
			>
				{Object.keys($cartStore).length} Items
			</span>
		</div>

		<div class="max-w-4xl mx-auto mt-8 md:mt-12">
			<div class="overflow-hidden bg-gray-500 shadow rounded-xl">
				<div class="grid grid-cols-1 md:grid-cols-2">
					<div class="px-5 py-6 bg-gray-400 md:px-8">
						<div class="flow-root">
							<ul class="divide-y divide-gray-200 -my-7">
								{#each Object.keys($cartStore) as key}
									<li class="flex items-stretch justify-between space-x-5 py-7">
										<div class="flex items-stretch flex-1">
											<div class="flex-shrink-0">
												<img
													class="w-20 h-20 border border-gray-200 rounded-lg"
													src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/2/product-1.png"
													alt=""
												/>
											</div>

											<div class="flex flex-col justify-between ml-5">
												<div class="flex-1">
													<p class="text-sm font-bold text-gray-900">{$cartStore[key].name}</p>
													<p class="mt-1.5 text-sm font-medium text-gray-500">
														&#8377; {$cartStore[key].price}
													</p>
												</div>

												<p class="mt-4 text-sm font-medium text-gray-500">
													x {$cartStore[key].quantity}
												</p>
											</div>
										</div>

										<div class="flex flex-col items-end justify-between ml-auto">
											<p class="text-sm font-bold text-right text-gray-900">
												&#8377; {$cartStore[key].totalAmount}
											</p>

											<button
												type="button"
												class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
											>
												<svg
													class="w-5 h-5"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</li>
								{/each}
							</ul>
						</div>

						<hr class="mt-6 border-gray-200" />

						<ul class="mt-6 space-y-3">
							<li class="flex items-center justify-between">
								<p class="text-sm font-medium text-gray-600">Sub total</p>
								<p class="text-sm font-medium text-gray-600">&#8377; {totalPaymentSum}</p>
							</li>

							<li class="flex items-center justify-between">
								<p class="text-sm font-medium text-gray-900">Total</p>
								<p class="text-sm font-bold text-gray-900">&#8377; {totalPaymentSum}</p>
							</li>
						</ul>
					</div>

					<div class="px-5 py-6 md:px-8">
						<div class="flow-root">
							<div class="-my-6 divide-y divide-gray-200">
								<div class="py-6">
									<h2
										on:click={async () => await handleMultipleDataShow('showInfo')}
										class="font-bold text-gray-200 text-base"
									>
										Contact Information
									</h2>
									{#if handleMultipleData['showInfo']}
										<div class="mt-6" transition:slide>
											<div class="space-y-5">
												<div>
													<label for="name" class="text-sm font-medium text-gray-300">
														Full Name
													</label>
													<div class="mt-2">
														<input
															type="text"
															name="name"
															id="name"
															placeholder="Enter first & last name"
															bind:value={allData['name']}
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<label for="email" class="text-sm font-medium text-gray-300">
														Email Address
													</label>
													<div class="mt-2">
														<input
															type="text"
															name="email"
															id="email"
															bind:value={allData['email']}
															placeholder="Enter email address"
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<label for="phone" class="text-sm font-medium text-gray-300">
														Phone
													</label>
													<div class="mt-2">
														<input
															type="number"
															name="phone"
															id="phone"
															bind:value={allData['phone']}
															placeholder="Enter phone"
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<button
														on:click={async () => {
															await handleMultipleDataShow('showShipping');
														}}
														type="submit"
														class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
													>
														Continue to Next
													</button>
												</div>
											</div>
										</div>
									{/if}
								</div>

								<div class="py-6">
									<h2
										class="font-bold text-gray-100 text-base"
										on:click={async () => await handleMultipleDataShow('showShipping')}
									>
										Shipping Information
									</h2>
									{#if handleMultipleData['showShipping']}
										<div class="mt-6" transition:slide>
											<div class="space-y-5">
												<div>
													<label for="shipAddress" class="text-sm font-medium text-gray-300">
														Address
													</label>
													<div class="mt-2">
														<input
															type="text"
															name="shipAddress"
															id="shipAddress"
															placeholder="Full Address"
															bind:value={allData['shipAddress']}
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<label for="shipState" class="text-sm font-medium text-gray-300">
														State
													</label>
													<div class="mt-2">
														<input
															type="text"
															name="shipState"
															id="shipState"
															bind:value={allData['shipState']}
															placeholder="Delhi"
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<label for="shipPinCode" class="text-sm font-medium text-gray-300">
														Pin Code
													</label>
													<div class="mt-2">
														<input
															type="number"
															name="shipPinCode"
															id="shipPinCode"
															bind:value={allData['shipPinCode']}
															placeholder="110007"
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<button
														on:click={async () => {
															await handleMultipleDataShow('showBilling');
														}}
														type="submit"
														class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
													>
														Continue to Next
													</button>
												</div>
											</div>
										</div>
									{/if}
								</div>

								<div class="py-6">
									<h2
										class="font-bold text-gray-100 text-base"
										on:click={async () => await handleMultipleDataShow('showBilling')}
									>
										Billing Information
									</h2>
									{#if handleMultipleData['showBilling']}
										<div class="mt-6" transition:slide>
											<div class="space-y-5">
												<div class="space-y-3">
													<div class="flex space-x-2">
														<div class="flex h-5 items-center">
															<input
																bind:value={allData['shipIsBill']}
																type="checkbox"
																id="billIsShip"
																name="billIsShip"
																class="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
															/>
														</div>
														<label for="billIsShip" class="flex space-x-2 text-sm">
															<div class="font-medium text-gray-700">
																Billing Address same as Shipping Address
															</div>
														</label>
													</div>
												</div>
												<div>
													<label for="billAddress" class="text-sm font-medium text-gray-300">
														Address
													</label>
													<div class="mt-2">
														<input
															type="text"
															name="billAddress"
															id="billAddress"
															placeholder="Full Address"
															bind:value={allData['billAddress']}
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<label for="billState" class="text-sm font-medium text-gray-300">
														State
													</label>
													<div class="mt-2">
														<input
															type="text"
															name="billState"
															id="billState"
															bind:value={allData['billState']}
															placeholder="Delhi"
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<label for="billPinCode" class="text-sm font-medium text-gray-300">
														Pin Code
													</label>
													<div class="mt-2">
														<input
															type="number"
															name="billPinCode"
															id="billPinCode"
															bind:value={allData['billPinCode']}
															placeholder="110007"
															class="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
														/>
													</div>
												</div>

												<div>
													<button
														on:click={async () => await handleMultipleDataShow('showPayment')}
														type="submit"
														class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
													>
														Continue to Next
													</button>
												</div>
											</div>
										</div>
									{/if}
								</div>

								<div class="py-6">
									<h2
										class="font-bold text-gray-100 text-base"
										on:click={async () => await handleMultipleDataShow('showPayment')}
									>
										Payment Method
									</h2>
									{#if handleMultipleData['showPayment']}
										<div class="mt-6" transition:slide>
											<div class="mx-auto space-y-5">
												<div class="flex space-x-2">
													<div class="flex h-5 items-center">
														<input
															type="radio"
															id="cod"
															name="cod"
															bind:group={allData['paymentMethod']}
															value="cod"
															class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
														/>
													</div>
													<label for="cod" class="text-sm">
														<div class="font-medium text-gray-100">COD</div>
														<p class="text-gray-300">Cash on Delivery</p>
													</label>
												</div>
												<div class="flex space-x-2">
													<div class="flex h-5 items-center">
														<input
															type="radio"
															id="online"
															name="online"
															bind:group={allData['paymentMethod']}
															value="online"
															class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
														/>
													</div>
													<label for="online" class="text-sm">
														<div class="font-medium text-gray-100">Online Payment</div>
														<p class="text-gray-300">Pay with UPI, Card, IB and Etc.</p>
													</label>
												</div>
												<div class="flex space-x-2">
													<div class="flex h-5 items-center">
														<input
															type="radio"
															id="card"
															name="card"
															bind:group={allData['paymentMethod']}
															value="card"
															class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
														/>
													</div>
													<label for="card" class="text-sm">
														<div class="font-medium text-gray-100">Card</div>
														<p class="text-gray-300">Pay with Card</p>
													</label>
												</div>
												<div>
													<button
														on:click={async () => await handleServerSubmission()}
														type="submit"
														class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
													>
														Complete Your {allData['paymentMethod'] === 'cod' ? 'Order' : 'Payment'}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="w-5 h-5 ml-3 {enableCheckOutLoader ? 'animate-spin' : ''}"
														>
															{#if enableCheckOutLoader}
																<path
																	transition:draw={{ duration: 2000, delay: 200, easing: quintOut }}
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
																/>
															{/if}
														</svg>
													</button>
												</div>
											</div>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
