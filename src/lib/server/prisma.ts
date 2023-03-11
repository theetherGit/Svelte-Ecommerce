import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const allBlogs = async () => {
	return await prisma.blog.findMany();
};

export const allProducts = async () => {
	return await prisma.tea.findMany();
};

export const productById = async (id: string) => {
	return await prisma.tea.findUnique({
		where: {
			id
		},
		include: {
			blog: true
		}
	});
};

export const productBySlug = async (slug: string) => {
	return await prisma.tea.findUnique({
		where: {
			slug
		},
		include: {
			blog: true,
			ProductImages: true
		}
	});
};
