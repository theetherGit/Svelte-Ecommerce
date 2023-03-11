import type { Actions, PageServerLoad } from './$types';
import { allBlogs, productById, prisma } from '$lib/server/prisma';
import { createSlug } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = ({ params }) => {
	console.log(params);
	if (params.slug === 'new') {
		return {
			allBlogs: allBlogs()
		};
	}
	return {
		product: productById(params.slug)
	};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const formatData: Record<any, any> = Object.fromEntries(await request.formData());
		console.log(formatData);
		let id = '-1';
		if (formatData?.id) {
			id = formatData.id;
		}
		console.log(id);
		const newProduct = await prisma.tea.upsert({
			where: {
				id
			},
			update: {
				name: formatData.name.toString(),
				productName: formatData.productName.toString(),
				tagline: formatData.tagline.toString(),
				description: formatData.description.toString(),
				slug: createSlug(formatData.name.toString()),
				price: Number(formatData.price),
				itemsPerBag: Number(formatData.itemsPerBag),
				quantity: Number(formatData.quantity),
				additionalInfo: {},
				productInfo: {}
			},
			create: {
				name: formatData.name.toString(),
				productName: formatData.productName.toString(),
				tagline: formatData.tagline.toString(),
				description: formatData.description.toString(),
				slug: createSlug(formatData.name.toString()),
				price: Number(formatData.price),
				itemsPerBag: Number(formatData.itemsPerBag),
				quantity: Number(formatData.quantity),
				additionalInfo: {},
				productInfo: {}
			}
		});
		console.log(newProduct);
		throw redirect(307, `/admin/products/${newProduct.id}`);
	}
};
