import { writable } from 'svelte/store';
export function createSlug(str: string): string {
	const cleanedStr = str.replace(/[^\w\s]/gi, '').toLowerCase();
	const slug = cleanedStr.replace(/\s+/g, '-');
	return slug;
}

export const fetchHelper = async (method: string, url: string, data: any) => {
	const response = await fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json'
		}
	});
	return await response.json();
};

export const cartViewStore = writable(false);
