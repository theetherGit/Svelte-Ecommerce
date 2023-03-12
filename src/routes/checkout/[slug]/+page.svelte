<script>
	export let data;
	const orders = data.history.processed
</script>

<section class="py-12 bg-white sm:py-16 lg:py-20">
	<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
		<div class="max-w-6xl mx-auto">
			<div class="flex items-start lg:items-center">
				<svg
					class="flex-shrink-0 text-green-500 w-11 h-11"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
				<div class="ml-4">
					<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">We received your order!</h1>
					<p class="mt-2 text-sm font-normal text-gray-600">
						Your order #{data.history.id} is completed and ready to ship
					</p>
				</div>
			</div>

			<div
				class="grid grid-cols-1 mt-8 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16"
			>
				<div class="pt-6 border-t border-gray-200 lg:col-span-3 xl:col-span-4">
					<h2 class="text-sm font-bold text-gray-500">Order Details</h2>
					<div class="flow-root mt-8">
						{#if Object.keys(orders) > 0}
						<ul class="divide-y divide-gray-200 -my-7">
							{#each Object.keys(orders) as order}
							<li class="flex items-stretch py-7">
								<div class="flex-shrink-0">
									<img
										class="object-cover rounded-lg w-28 h-28"
										src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-confirmation/2/product-1.png"
										alt=""
									/>
								</div>

								<div class="flex flex-col justify-between ml-5">
									<div class="flex-1">
										<p class="text-base font-bold text-gray-900">{order.name}</p>
										<p class="mt-1.5 text-sm font-medium text-gray-500">Golden</p>
									</div>

									<p class="mt-auto text-sm font-bold text-gray-900">$359</p>
								</div>
							</li>
								{/each}
						</ul>
							{/if}
					</div>

					<hr class="mt-6 border-gray-200" />

					<ul class="mt-6 space-y-4">
						<li class="flex items-center justify-between">
							<p class="text-sm font-medium text-gray-600">Subtotal</p>
							<p class="text-sm font-medium text-gray-600">$589</p>
						</li>

						<li class="flex items-center justify-between">
							<p class="text-sm font-medium text-gray-600">Tax</p>
							<p class="text-sm font-medium text-gray-600">$0</p>
						</li>

						<li class="flex items-center justify-between">
							<p class="text-sm font-medium text-gray-600">Shipping</p>
							<p class="text-sm font-medium text-gray-600">$10</p>
						</li>

						<li class="flex items-center justify-between">
							<p class="text-sm font-bold text-gray-900">Total</p>
							<p class="text-sm font-bold text-gray-900">$599</p>
						</li>
					</ul>
				</div>

				<div class="lg:col-span-2 lg:sticky lg:top-6">
					<div class="overflow-hidden rounded bg-gray-50">
						<div class="px-4 py-6 sm:p-6 lg:p-8">
							<div class="space-y-9">
								<div>
									<h3 class="text-sm font-bold text-gray-900">Shipping Address</h3>
									<p class="mt-4 text-sm font-medium text-gray-600">Wilson Baker</p>
									<p class="mt-3 text-sm font-medium text-gray-600">
										4517 Washington Ave. Manchester, Kentucky 39495, USA
									</p>
								</div>

								<div>
									<h3 class="text-sm font-bold text-gray-900">Billing Address</h3>
									<p class="mt-4 text-sm font-medium text-gray-600">Wilson Baker</p>
									<p class="mt-3 text-sm font-medium text-gray-600">
										4517 Washington Ave. Manchester, Kentucky 39495, USA
									</p>
								</div>

								<div>
									<h3 class="text-sm font-bold text-gray-900">Payment Info</h3>
									<p class="mt-4 text-sm font-medium text-gray-600">Credit Card</p>
									<p class="mt-1 text-sm font-medium text-gray-600">
										VISA<br />
										**** 4660
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
