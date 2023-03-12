<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let data;
	$: product = data?.product;
	export let form;
	$: console.log(form);
</script>

<div class="flex flex-col flex-1 xl:pl-64">
	{#if product !== null || $page.params.slug === 'new'}
		<main>
			<div class="py-6">
				<div class="mt-6">
					<p class="text-base font-bold text-gray-100">
						{$page.params.slug === 'new' ? 'Add New Product' : `Update Product - ${product?.name}`}
					</p>
				</div>

				<form method="POST" class="max-w-3xl mt-12" use:enhance>
					{#if product && product?.id !== null}
						<input type="hidden" name="id" value={product.id} />
					{/if}
					<div class="space-y-8">
						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label for="name" class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2">
								Tea Name
							</label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Cordyceps (Caterpillar) Tea"
									value={product?.name ?? ''}
									class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
								/>
							</div>
						</div>
						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label
								for="productName"
								class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2"
							>
								Product Name
							</label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									name="productName"
									id="productName"
									placeholder="Soothing Sleep"
									value={product?.productName ?? ''}
									class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
								/>
							</div>
						</div>
						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label for="tagline" class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2">
								Tagline
							</label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									name="tagline"
									id="tagline"
									placeholder="For Better Sleep, Naturally"
									value={product?.tagline ?? ''}
									class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
								/>
							</div>
						</div>

						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label
								for="description"
								class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2"
							>
								Product Description
							</label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<textarea
									name="description"
									id="description"
									placeholder="Write about our product"
									rows="4"
									class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
									spellcheck="false">{product?.description ?? ''}</textarea
								>
							</div>
						</div>

						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2"> Price </label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<div class="relative flex">
									<div
										class="inline-flex items-center px-3 text-gray-100 border border-r-0 border-gray-300 rounded-l-lg sm:text-sm"
									>
										&#8377;
									</div>

									<input
										type="number"
										name="price"
										id="price"
										placeholder="2350"
										value={product?.price ?? ''}
										class="border flex-1 block w-full min-w-0 px-4 py-3 placeholder-gray-500 border-gray-300 rounded-none rounded-r-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
									/>
								</div>
							</div>
						</div>
						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label
								for="itemsPerBag"
								class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2"
							>
								Tea Bags Per Box
							</label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<input
									type="number"
									name="itemsPerBag"
									id="itemsPerBag"
									placeholder="For Better Sleep, Naturally"
									value={product?.itemsPerBag ?? ''}
									class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
								/>
							</div>
						</div>

						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
							<label for="quantity" class="block text-sm font-bold text-gray-100 sm:mt-px sm:pt-2">
								Tea Boxes Available
							</label>
							<div class="mt-2 sm:mt-0 sm:col-span-2">
								<input
									type="number"
									name="quantity"
									id="quantity"
									placeholder="For Better Sleep, Naturally"
									value={product?.quantity ?? ''}
									class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
								/>
							</div>
						</div>
						<!--						<div class="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">-->
						<!--							<label for="images" class="mb-1 block text-sm font-medium text-gray-100"-->
						<!--								>Upload file</label-->
						<!--							>-->
						<!--							<div class="mt-2 sm:mt-0 sm:col-span-2">-->
						<!--								<label-->
						<!--									class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"-->
						<!--								>-->
						<!--									<div class="space-y-1 text-center">-->
						<!--										<div-->
						<!--											class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"-->
						<!--										>-->
						<!--											<svg-->
						<!--												xmlns="http://www.w3.org/2000/svg"-->
						<!--												fill="none"-->
						<!--												viewBox="0 0 24 24"-->
						<!--												stroke-width="1.5"-->
						<!--												stroke="currentColor"-->
						<!--												class="h-6 w-6 text-gray-500"-->
						<!--											>-->
						<!--												<path-->
						<!--													stroke-linecap="round"-->
						<!--													stroke-linejoin="round"-->
						<!--													d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"-->
						<!--												/>-->
						<!--											</svg>-->
						<!--										</div>-->
						<!--										<div class="text-gray-600">-->
						<!--											<a href="#" class="font-medium text-primary-500 hover:text-primary-700"-->
						<!--												>Click to upload</a-->
						<!--											> or drag and drop-->
						<!--										</div>-->
						<!--										<p class="text-sm text-gray-500">PNG, JPG or GIF</p>-->
						<!--									</div>-->
						<!--									<input id="images" name="images" type="file" class="sr-only" multiple />-->
						<!--								</label>-->
						<!--							</div>-->
						<!--						</div>-->
					</div>

					<div class="mt-6 sm:mt-12">
						<button
							type="submit"
							class="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
						>
							{$page.params.slug === 'new' ? 'Add' : 'Update'} Product
						</button>
					</div>
				</form>
			</div>
		</main>
	{:else}
		<div class="rounded-lg bg-red-50 max-w-7xl mt-4">
			<div class="p-3">
				<div class="flex items-start justify-between">
					<svg
						class="flex-shrink-0 w-5 h-5 text-red-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/>
					</svg>

					<div class="flex-1 ml-3">
						<p class="text-sm font-bold text-red-700">No product found</p>
						<ul class="pl-4 mt-2 space-y-1 text-sm font-medium text-red-600 list-disc list-outside">
							<li>Please check product ID</li>
							<li>For more info contact admin</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
