<script>
	import '../app.css';
	import Cart from '$lib/components/Cart.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Loader from "$lib/components/Loader.svelte";
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<div class="bg-black min-h-screen">
	<Loader />
	<Cart />
	<Toaster />
	<Navbar />
	<slot />
	<Footer />
</div>
