<script>
	import { cartViewStore } from '$lib/utils';
	import {quintOut} from "svelte/easing";
	import {slide} from "svelte/transition";
</script>

{#if $cartViewStore}
	<div class="absolute min-h-screen z-10" transition:slide={{duration: 1000, easing: quintOut, axis: 'x'}}>
		<div class="fixed inset-y-0 right-0 w-full h-full max-w-xs sm:max-w-sm">
			<div class="h-full overflow-hidden bg-white">
				<div class="flex flex-col h-full">
					<div class="flex-shrink-0 px-4 py-5">
						<div class="flex items-center justify-between">
							<p class="text-base font-bold text-gray-900">Shopping Cart</p>

							<button
								on:click={() => cartViewStore.set(false)}
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

					<div class="flex-1 overflow-y-auto">
						<div class="px-4 py-2 sm:px-6">
							<div class="flow-root">
								<ul class="-my-5 divide-y divide-gray-200 divide-dotted">
									<li class="flex py-5">
										<div class="flex-shrink-0">
											<img
												class="object-cover w-16 h-16 rounded-lg"
												src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-1.png"
												alt=""
											/>
										</div>

										<div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
											<div class="flex flex-col justify-between flex-1">
												<p class="text-sm font-bold text-gray-900">
													Apple Watch Series 7 - Golden Edition
												</p>
												<div class="mx-auto max-w-xs space-y-4 ml-2 mt-2">
													<div>
														<div class="relative z-0 flex">
															<div class="inset-y-0 left-0 flex items-center rounded-md rounded-r-none border border-r-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700">+</div>
															<input type="number" id="example6" class="w-full border text-center border-gray-300 shadow-sm focus:z-10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 w-5" value="1" />
															<div class="inset-y-0 left-0 flex items-center rounded-md rounded-l-none border border-l-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700">-</div>
														</div>
													</div>
												</div>
											</div>

											<div class="flex flex-col items-end justify-between">
												<p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
													&#8377; 259.00
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
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</div>
									</li>

									<li class="flex py-5">
										<div class="flex-shrink-0">
											<img
												class="object-cover w-16 h-16 rounded-lg"
												src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-2.png"
												alt=""
											/>
										</div>

										<div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
											<div class="flex flex-col justify-between flex-1">
												<p class="text-sm font-bold text-gray-900">Beoplay M5 Bluetooth Speaker</p>
												<p class="mt-1.5 text-sm font-medium text-gray-500">Qty: 1</p>
											</div>

											<div class="flex flex-col items-end justify-between">
												<p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
													$46.50
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
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</div>
									</li>

									<li class="flex py-5">
										<div class="flex-shrink-0">
											<img
												class="object-cover w-16 h-16 rounded-lg"
												src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-3.png"
												alt=""
											/>
										</div>

										<div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
											<div class="flex flex-col justify-between flex-1">
												<p class="text-sm font-bold text-gray-900">Beylob 90 Speaker</p>
												<p class="mt-1.5 text-sm font-medium text-gray-500">Qty: 1</p>
											</div>

											<div class="flex flex-col items-end justify-between">
												<p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
													$219.00
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
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</div>
									</li>

									<li class="flex py-5">
										<div class="flex-shrink-0">
											<img
												class="object-cover w-16 h-16 rounded-lg"
												src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-2.png"
												alt=""
											/>
										</div>

										<div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
											<div class="flex flex-col justify-between flex-1">
												<p class="text-sm font-bold text-gray-900">Beoplay M5 Bluetooth Speaker</p>
												<p class="mt-1.5 text-sm font-medium text-gray-500">Qty: 1</p>
											</div>

											<div class="flex flex-col items-end justify-between">
												<p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
													$149.00
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
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="px-4 py-5 border-t border-gray-200 sm:p-6">
						<ul class="space-y-4">
							<li class="flex items-center justify-between">
								<p class="text-sm font-medium text-gray-600">Sub total</p>
								<p class="text-sm font-medium text-gray-600">$399</p>
							</li>

							<li class="flex items-center justify-between">
								<p class="text-sm font-medium text-gray-900">Total</p>
								<p class="text-sm font-bold text-gray-900">$399</p>
							</li>
						</ul>

						<div class="mt-5 space-y-3">
							<button
								type="button"
								class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
							>
								Checkout
							</button>

							<button
								type="button"
								class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200 focus:bg-gray-200"
							>
								Continue Shopping
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
