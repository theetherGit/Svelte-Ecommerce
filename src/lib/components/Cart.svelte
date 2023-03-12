<script>
	import {
		cartViewStore,
		cartStore,
		removeProductFromCart,
		decreaseProductQuantityInCart,
		increaseProductQuantityInCart
	} from '$lib/utils';
	import { quintOut } from 'svelte/easing';
	import { slide, fade } from 'svelte/transition';
	const disableItemUpdater = {};
	$: totalPayment = () => {
		let sumToPay = 0;
		Object.keys($cartStore).forEach((key) => {
			sumToPay += $cartStore[key].totalAmount;
		});
		return sumToPay;
	};
	$: totalPaymentSum = totalPayment();
</script>

{#if $cartViewStore}
	<div
		class="absolute min-h-screen z-30"
		transition:slide={{ duration: 1000, easing: quintOut, axis: 'x' }}
	>
		<div class="fixed inset-y-0 right-0 w-full h-full max-w-xs sm:max-w-sm">
			<div class="h-full overflow-hidden bg-white">
				<div class="flex flex-col h-full">
					<div class="flex-shrink-0 px-4 py-5">
						<div class="flex items-center justify-between">
							<p class="text-base font-bold text-gray-900">Shopping Cart</p>

							<button
								on:click={() => ($cartViewStore = false)}
								type="button"
								class="p-2 -m-2 text-gray-500 transition-all duration-200 bg-transparent rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
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
					</div>

					{#if Object.keys($cartStore).length > 0}
						<div class="flex-1 overflow-y-auto">
							<div class="px-4 py-2 sm:px-6">
								<div class="flow-root">
									<ul class="-my-5 divide-y divide-gray-200 divide-dotted">
										{#each Object.keys($cartStore) as product}
											<li class="flex py-5" in:slide out:fade>
												<div class="flex-shrink-0">
													<img
														class="object-cover w-16 h-16 rounded-lg"
														src="https://uploads-ssl.webflow.com/63a80885ac4e7cdae577faf0/63e8367cc21faad267ba2b41_Matsutake%20tes-p-1080.jpg"
														alt="Product Image"
													/>
												</div>

												<div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
													<div class="flex flex-col justify-between flex-1">
														<p class="text-sm font-bold text-gray-900">
															{$cartStore[product]?.name}
														</p>
														<div class="mx-auto max-w-xs space-y-4 ml-2 mt-2">
															<div>
																<div class="relative z-0 flex">
																	<div
																		on:click={async () => {
																			if (disableItemUpdater?.[product]) {
																				return;
																			}
																			disableItemUpdater[product] = true;
																			await increaseProductQuantityInCart(product);
																			disableItemUpdater[product] = false;
																		}}
																		on:keyup={async () => {
																			if (disableItemUpdater?.[product]) {
																				return;
																			}
																			disableItemUpdater[product] = true;
																			await increaseProductQuantityInCart(product);
																			disableItemUpdater[product] = false;
																		}}
																		class="cursor-pointer inset-y-0 left-0 flex items-center rounded-md rounded-r-none border border-r-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700"
																	>
																		+
																	</div>
																	<input
																		disabled
																		type="number"
																		id="example6"
																		class="w-full border text-center border-gray-300 shadow-sm focus:z-10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 w-5"
																		value={$cartStore[product]?.quantity}
																	/>
																	<div
																		on:click={async () => {
																			if (disableItemUpdater?.[product]) {
																				return;
																			}
																			disableItemUpdater[product] = true;
																			await decreaseProductQuantityInCart(product);
																			disableItemUpdater[product] = false;
																		}}
																		on:keydown={async () => {
																			if (disableItemUpdater?.[product]) {
																				return;
																			}
																			disableItemUpdater[product] = true;
																			await increaseProductQuantityInCart(product);
																			disableItemUpdater[product] = false;
																		}}
																		class="cursor-pointer inset-y-0 left-0 flex items-center rounded-md rounded-l-none border border-l-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700"
																	>
																		-
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div class="flex flex-col items-end justify-between">
														<p
															class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600"
														>
															&#8377; {$cartStore[product]?.totalAmount}
														</p>

														<button
															on:click={async () => {
																await removeProductFromCart(product);
															}}
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
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															</svg>
														</button>
													</div>
												</div>
											</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>

						<div class="px-4 py-5 border-t border-gray-200 sm:p-6">
							<ul class="space-y-4">
								<li class="flex items-center justify-between">
									<p class="text-sm font-medium text-gray-600">Sub total</p>
									<p class="text-sm font-medium text-gray-600">&#8377; {totalPaymentSum}</p>
								</li>

								<li class="flex items-center justify-between">
									<p class="text-sm font-medium text-gray-900">Total</p>
									<p class="text-sm font-bold text-gray-900">&#8377; {totalPaymentSum}</p>
								</li>
							</ul>

							<div class="mt-5 space-y-3">
								<a href="/checkout"
									type="button"
									class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
								>
									Checkout
								</a>

								<button
									on:click={async () => ($cartViewStore = false)}
									type="button"
									class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200 focus:bg-gray-200"
								>
									Continue Shopping
								</button>
							</div>
						</div>
					{:else}
						<div class="p-2">
							<div class="flex rounded-md bg-indigo-50 p-4 text-sm text-indigo-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="mr-3 h-5 w-5 flex-shrink-0"
								>
									<path
										fill-rule="evenodd"
										d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z"
										clip-rule="evenodd"
									/>
								</svg>
								<div>
									<h4 class="font-bold">No products in cart</h4>
									<div class="mt-1">Please add items to cart from shop to browse.</div>
									<div class="mt-2 flex space-x-4">
										<a href="/shop" class="inline-block font-bold leading-loose">Go to shop</a>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
