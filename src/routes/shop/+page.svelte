<script>
	import { cartViewStore } from '$lib/utils';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	export let data;
	import { addProductToCart } from '$lib/utils';
</script>

<section class="py-12 sm:py-16 lg:py-20">
	<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
		<div class="max-w-md mx-auto text-center">
			<h2 class="text-2xl font-bold text-gray-100 sm:text-3xl">Featured Items</h2>
			<p class="mt-4 text-base font-normal leading-7 text-gray-400">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim
				tempus.
			</p>
		</div>

		<div
			class="grid grid-cols-1 gap-6 mt-12 text-center sm:grid-cols-2 lg:gap-5 lg:grid-cols-4 sm:mt-16"
		>
			{#each data.products as product}
				<div class="relative bg-gray-500 overflow-hidden flex flex-col">
					<div class="relative group">
						<div class="overflow-hidden aspect-w-1 aspect-h-1">
							<Splide
								aria-label="My Favorite Images"
								options={{ type: 'loop', autoplay: true, interval: 3000, rewind: true, speed: 500 }}
							>
								<SplideSlide>
									<img
										class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
										src="https://uploads-ssl.webflow.com/63a80885ac4e7cdae577faf0/63e8367cc21faad267ba2b41_Matsutake%20tes-p-1080.jpg"
										alt="Image 1"
									/>
								</SplideSlide>
								<SplideSlide>
									<img
										class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
										src="https://uploads-ssl.webflow.com/63a80885ac4e7cdae577faf0/63e851d7037f3bab28c8f76c_Mushroom%20box-p-1080.jpg"
										alt="Image 2"
									/>
								</SplideSlide>
							</Splide>
						</div>
						<a href="/shop/{product?.slug}">
							<h3 class="text-base font-bold text-gray-100 mt-4">
								<a href="/shop/{product?.slug}" title="">
									{product?.name}
									<span class="absolute inset-0" aria-hidden="true" />
								</a>
							</h3>
						</a>
					</div>
					<p class="mt-2 text-sm font-bold text-gray-100">&#8377; {product?.price}</p>

					<div class="relative mt-auto">
						<button
							on:click={async () => {
								$cartViewStore = true;
								await addProductToCart(product);
							}}
							disabled={product.quantity <= 0}
							type="button"
							class="relative flex items-center justify-center w-full px-4 py-4 mt-8 text-sm font-bold text-gray-100 transition-all duration-200 bg-transparent hover:text-white group"
						>
							<span
								class="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"
							/>
							<span class="relative"> Add to cart </span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
