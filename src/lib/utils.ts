import { type Writable, writable, get } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
import toast from 'svelte-french-toast';

export function createSlug(str: string): string {
	const cleanedStr = str.replace(/[^\w\s]/gi, '').toLowerCase();
	const slug = cleanedStr.replace(/\s+/g, '-');
	return slug;
}

export const fetchHelper = async (method: string, url: string, data: any) => {
	const options: any = {
		method: method,
		headers: {
			'content-type': 'application/json'
		}
	};
	if (method.toLowerCase() !== "get") {
		options['body'] = JSON.stringify(data)
	}
	const response = await fetch(url, options);
	return await response.json();
};

export const cartViewStore: Writable<Boolean> = writable(false);
// export const cartStore: Writable<any> = writable({});
export const cartStore = persisted('cartStore', {});

export const addProductToCart = async (data: any) => {
	let currentProducts: any = get(cartStore);
	const dataId = data.id;
	if (currentProducts.hasOwnProperty(dataId)) {
		toast.error(`Product ${data?.name} exist in cart.`);
		return;
	}
	let cartData: any = {
		id: dataId,
		name: data.name,
		quantity: 1,
		price: data.price,
		totalAmount: data.price
	};
	currentProducts[dataId] = cartData;
	cartStore.set(currentProducts);
	toast.success(`Product ${data?.name} added in cart successfully.`);
	return;
};

export const removeProductFromCart = async (key: any) => {
	let currentProducts: any = get(cartStore);
	delete currentProducts[key];
	console.log(currentProducts);
	cartStore.set(currentProducts);
	toast.success(`Product deleted successfully from cart.`);
	return;
};

export const increaseProductQuantityInCart = async (key: any) => {
	let currentProducts: any = get(cartStore);
	const dataForCurrentUpdate = currentProducts[key];
	const currentQuantity = await fetchHelper("GET", `/shop/${key}`, { key });
	if (currentQuantity.quantity <= dataForCurrentUpdate.quantity) {
		toast.error(`Product ${dataForCurrentUpdate?.name}'s is not in stock.`);
		return;
	}
	const updatedData = {
		id: key,
		name: dataForCurrentUpdate.name,
		quantity: dataForCurrentUpdate.quantity + 1,
		price: dataForCurrentUpdate.price,
		totalAmount: dataForCurrentUpdate.price * (dataForCurrentUpdate.quantity + 1)
	};
	currentProducts[key] = updatedData;
	cartStore.set(currentProducts);
	return;
};

export const decreaseProductQuantityInCart = async (key: any) => {
	let currentProducts: any = get(cartStore);
	const dataForCurrentUpdate = currentProducts[key];
	if (dataForCurrentUpdate.quantity === 1) return;
	const updatedData = {
		id: key,
		name: dataForCurrentUpdate.name,
		quantity: dataForCurrentUpdate.quantity - 1,
		price: dataForCurrentUpdate.price,
		totalAmount: dataForCurrentUpdate.price * (dataForCurrentUpdate.quantity - 1)
	};
	currentProducts[key] = updatedData;
	cartStore.set(currentProducts);
	return;
};
