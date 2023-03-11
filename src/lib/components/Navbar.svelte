<script>
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	let show = false;
	$: show = show ? innerWidth < 1024 : false;

	const allPages = [
		{ name: 'Shop', path: '/shop' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'Contact', path: '/contact' }
	];
</script>

<header class="py-4 sm:py-6">
	<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<div class="shrink-0">
				<a href="/" title="" class="flex">
					<img class="w-auto h-9" src="{$page.url.origin}/logo.svg" alt="" />
				</a>
			</div>

			<div class="flex md:hidden">
				<button
					class="relative -mr-6 h-8 w-10 p-6 lg:hidden mr-1"
					on:click={() => {
						console.log(show);
						show = !show;
					}}
				>
					<span class="sr-only">Open main menu</span>
					<div
						class="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform"
					>
						<span
							aria-hidden="true"
							class="hamburger-line {show === true ? 'rotate-45' : '-translate-y-1.5'}"
						/>
						<span
							aria-hidden="true"
							class="absolute block bg-white h-0.5 w-3 transform rounded bg-secondary transition duration-500 ease-in-out {show ===
							true
								? 'opacity-0'
								: ''}"
						/>
						<span
							aria-hidden="true"
							class="hamburger-line {show === true ? '-rotate-45' : 'translate-y-1.5'}"
						/>
					</div>
				</button>
			</div>

			<nav class="hidden md:flex md:items-center md:justify-end md:space-x-12">
				{#each allPages as page}
					<a
						href={page.path}
						title=""
						class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
					>
						{page.name}
					</a>
				{/each}
				<a
					href="#"
					title=""
					class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
				>
					Cart
				</a>
			</nav>
		</div>
		{#if show}
			<nav transition:slide class="z-10 fixed bg-black w-full text-center">
				<div class="flex flex-col pt-8 pb-4 space-y-6 opacity-50">
					<a
						href="/shop"
						title=""
						class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
					>
						Shop
					</a>

					<a
						href="#"
						title=""
						class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
					>
						Contact
					</a>

					<a
						href="#"
						title=""
						class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
					>
						Blog
					</a>

					<a
						href="#"
						title=""
						class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
					>
						Cart
					</a>
				</div>
			</nav>
		{/if}
	</div>
</header>

<style>
	.hamburger-line {
		@apply absolute block  h-0.5 w-5 transform rounded bg-white transition duration-500 ease-in-out;
	}
</style>
