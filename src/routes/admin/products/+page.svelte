<script lang="ts">
	import { fetchHelper } from '../../../lib/utils';
	import toast from 'svelte-french-toast';
	import { invalidateAll } from '$app/navigation';

	export let data;
	const deleteProduct = async (id: string) => {
		const response = await fetchHelper('DELETE', `/admin/products/${id}`, { id });
		await invalidateAll();
		if (response.success) return toast.success(response.message);
		if (!response.success) return toast.error(response.message);
	};
</script>

<div class="py-12 sm:py-16 lg:py-20">
	<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<p class="text-xl font-bold text-gray-100">All Products</p>

			<div class="inline-flex items-center justify-end">
				<a
					href="/admin/products/new"
					type="button"
					class="inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 bg-indigo-600 rounded-lg bg-indigo-600 text-white hover:bg-indigo-200 hover:text-indigo-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 mr-2 -ml-1"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>

					Add New Product
				</a>
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
									<div class="flex items-center">
										Name
										<svg
											class="w-4 h-4 ml-2"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8 9l4-4 4 4m0 6l-4 4-4-4"
											/>
										</svg>
									</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">
										Product Name
										<svg
											class="w-4 h-4 ml-2"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8 9l4-4 4 4m0 6l-4 4-4-4"
											/>
										</svg>
									</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">
										Price
										<svg
											class="w-4 h-4 ml-2"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8 9l4-4 4 4m0 6l-4 4-4-4"
											/>
										</svg>
									</div>
								</th>

								<th
									class="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500"
								>
									<div class="flex items-center">
										Quantity
										<svg
											class="w-4 h-4 ml-2"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8 9l4-4 4 4m0 6l-4 4-4-4"
											/>
										</svg>
									</div>
								</th>

								<th class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
									<span class="sr-only"> Actions </span>
								</th>
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200">
							{#each data?.products as product}
								<tr>
									<td
										class="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0"
										>{product?.name}</td
									>

									<td class="px-4 py-4 text-sm font-bold text-gray-100 whitespace-nowrap">
										<div class="inline-flex items-center">
											<img
												class="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
												src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-landing-logo.png"
												alt=""
											/>
											{product?.productName}
										</div>
										<div class="space-y-1 lg:hidden pl-11">
											<p class="text-sm font-medium text-gray-100">{product?.name}</p>
											<p class="text-sm font-medium text-gray-100">{product?.productName}</p>
										</div>
									</td>

									<td
										class="hidden px-4 py-4 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap"
										>&#8377; {product?.price}</td
									>

									<td
										class="hidden px-4 py-4 text-sm font-medium text-gray-100 lg:table-cell whitespace-nowrap"
										>{product?.quantity}</td
									>

									<td
										class="px-4 py-4 text-sm font-medium text-right text-gray-100 whitespace-nowrap"
									>
										<a
											href="/admin/products/{product?.id}"
											class="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke="currentColor"
												class="w-4 h-4 text-amber-500"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
												/>
											</svg>
										</a>
										<button
											on:click={() => deleteProduct(product?.id)}
											type="button"
											class="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-4 h-4 text-red-500"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
										<div class="mt-1 lg:hidden">
											<p>&#8377; {product?.price}</p>
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
