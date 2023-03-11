<script>
	import { page } from '$app/stores';
	import { dbIcon, newsIcon, blogIcon } from '$lib/icons';

	const allAdminPages = [
		{ name: 'Products', path: '/admin/products', icon: dbIcon },
		{ name: 'Blog', path: '/admin/blog', icon: blogIcon },
		{ name: 'Newsletter', path: '/admin/newsletter', icon: newsIcon }
	];
</script>

<div class="hidden py-3 border-t border-gray-200 lg:block">
	<div class="container px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
		<div class="flex items-center space-x-4">
			{#each allAdminPages as adminPage}
				<a
					href={adminPage.path}
					title=""
					class="inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-indigo-200 hover:text-indigo-600 {$page.url.pathname.startsWith(
						adminPage.path
					)
						? 'bg-indigo-600 text-white'
						: 'bg-indigo-200 text-indigo-600'}"
				>
					{@html adminPage.icon}
					{adminPage.name}
				</a>
			{/each}
		</div>
	</div>
</div>
<slot />
