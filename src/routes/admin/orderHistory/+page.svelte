<script>
	import { goto } from '$app/navigation';
	export let data;
</script>

<div class="py-12 sm:py-16 lg:py-20">
	<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<p class="text-xl font-bold text-gray-100">Order History</p>

			<div class="inline-flex items-center justify-end">
				<label class="text-sm font-medium text-gray-300"> Client Details Only </label>
			</div>
		</div>

		<div class="flex flex-col mt-4 lg:mt-8">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<table class="min-w-full lg:divide-y lg:divide-gray-200">
						<thead class="hidden lg:table-header-group">
							<tr>
								<th
									class="py-3.5 pl-4 pr-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 sm:pl-6 md:pl-0"
								>
									<div class="flex items-center">Email</div>
								</th>

								<!--                            <th class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">-->
								<!--                                <div class="flex items-center">-->
								<!--                                    Customer Name-->
								<!--                                </div>-->
								<!--                            </th>-->

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">Name</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">Phone</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">Customer Address</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">State</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">Pin code</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">Total Amount</div>
								</th>
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200">
							{#each data.orders as orderKey}
								{@const userDetails = orderKey.userDetails}

								<tr
									on:click={async () => await goto(`/checkout/${orderKey.id}`)}
									data-sveltekit-preload-data="hover"
									class="cursor-pointer"
								>
									<td
										class="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0"
										>{userDetails.email}</td
									>

									<td class="px-4 py-4 text-sm font-bold text-gray-100 whitespace-nowrap">
										<div class="inline-flex items-center">
											<img
												class="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
												src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-landing-logo.png"
												alt=""
											/>
											{userDetails.name}
										</div>
										<div class="space-y-1 lg:hidden pl-11">
											<p class="text-sm font-medium text-gray-500">{userDetails.email}</p>
											<p class="text-sm font-medium text-gray-500">{userDetails.phone}</p>
										</div>
									</td>

									<td
										class="hidden px-4 py-4 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap"
										>{userDetails.phone}</td
									>

									<td
										class="hidden px-4 py-4 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap"
										>{userDetails.shipAddress}</td
									>

									<td
										class="hidden px-4 py-4 text-sm font-bold text-gray-100 lg:table-cell whitespace-nowrap"
										>{userDetails.shipState}</td
									>

									<td
										class="hidden px-4 py-4 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap"
										>{userDetails.shipPinCode}</td
									>

									<td
										class="px-4 py-4 text-sm font-medium text-right text-gray-100 whitespace-nowrap"
									>
										<div
											type="button"
											class="inline-flex items-center justify-center text-gray-400 transition-all duration-200"
										>
											&#8377;{orderKey.totalAmount}
										</div>
										<div class="mt-1 lg:hidden">
											<p>{userDetails.shipState}</p>
											<div class="inline-flex items-center justify-end mt-1">
												{userDetails.shipPinCode}
											</div>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
