<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	export let data;
</script>

<section class="py-5 sm:py-8 lg:py-10">
	<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
		<div class="relative sm:p-10 xl:p-14">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10 xl:gap-x-20">
				<div class="relative lg:col-span-5">
					<Splide
						aria-label="My Favorite Images"
						options={{ type: 'loop', autoplay: true, interval: 3000, rewind: true, speed: 500 }}
					>
						<SplideSlide>
							<img
								class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 rounded-lg"
								src="https://uploads-ssl.webflow.com/63a80885ac4e7cdae577faf0/63e8367cc21faad267ba2b41_Matsutake%20tes-p-1080.jpg"
								alt="Image 1"
							/>
						</SplideSlide>
						<SplideSlide>
							<img
								class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 rounded-lg"
								src="https://uploads-ssl.webflow.com/63a80885ac4e7cdae577faf0/63e851d7037f3bab28c8f76c_Mushroom%20box-p-1080.jpg"
								alt="Image 2"
							/>
						</SplideSlide>
					</Splide>
				</div>

				<div class="px-4 pb-8 lg:col-span-7 xl:pr-16">
					<nav class="flex">
						<ol role="list" class="flex items-center space-x-1">
							<li>
								<div class="-m-1">
									<a
										href="/shop"
										class="p-1 text-sm font-medium text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:text-gray-100 focus:ring-gray-900 hover:text-gray-700"
									>
										Shop
									</a>
								</div>
							</li>

							<li>
								<div class="flex items-center">
									<span class="flex-shrink-0 text-gray-300"> - </span>
									<div class="-m-1">
										<a
											href="/shop"
											class="p-1 ml-1 text-sm font-medium text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:text-gray-100 focus:ring-gray-900 hover:text-gray-700"
										>
											Products
										</a>
									</div>
								</div>
							</li>

							<li>
								<div class="flex items-center">
									<span class="flex-shrink-0 text-gray-300"> - </span>
									<div class="-m-1">
										<a
											href="/shop/{data?.product.slug}"
											class="p-1 ml-1 text-sm font-medium text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:text-gray-100 focus:ring-gray-900 hover:text-gray-700"
											aria-current="page"
										>
											{data?.product.name}
										</a>
									</div>
								</div>
							</li>
						</ol>
					</nav>
					<div class="space-y-2">
						<h1 class="mt-8 text-lg font-bold text-gray-200 sm:text-4xl">
							{data?.product.name}
						</h1>
						<h1 class="text-3xl font-bold text-gray-100 sm:text-3xl">
							{data?.product.productName}
						</h1>
						<p class="mt-5 text-base font-normal leading-7 text-gray-400">
							{data?.product.description}
						</p>
					</div>

					<!--					<h2 class="mt-10 text-base font-bold text-gray-100">Highlights:</h2>-->
					<!--					<ul class="mt-4 space-y-3 text-base font-medium text-gray-600 list-disc list-inside">-->
					<!--						<li>Made with full cotton</li>-->
					<!--						<li>Slim fit for any body</li>-->
					<!--						<li>Quality control by JC</li>-->
					<!--					</ul>-->

					<div class="inline-grid grid-cols-2 gap-4 mt-10 sm:grid-cols-3 sm:gap-0">
						<div class="rounded-lg bg-gray-500 sm:rounded-r-none">
							<div class="px-5 py-4">
								<p class="text-xs font-medium tracking-widest text-gray-100 uppercase">Tea Bags</p>
								<div class="relative mt-1 text-white">
									{data?.product.itemsPerBag}
								</div>
							</div>
						</div>

						<div
							class="col-span-2 sm:col-span-1 sm:rounded-r-lg sm:bg-gray-500 sm:flex sm:items-center sm:justify-center"
						>
							<div class="py-2 sm:px-5 sm:py-4">
								<p class="text-3xl font-bold text-gray-100">&#8377; {data?.product.price}</p>
							</div>
						</div>
					</div>

					<div class="mt-5 sm:mt-8 sm:flex sm:items-center sm:space-x-5">
						<button
							type="button"
							class="
                                items-center
                                justify-center
                                w-full
                                px-12
                                py-3
                                text-base
                                font-bold
                                leading-7
                                text-center text-white
                                transition-all
                                duration-200
                                bg-gray-900
                                border border-transparent
                                rounded-md
                                inlin-flex
                                sm:w-auto
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                hover:bg-gray-700
                            "
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
