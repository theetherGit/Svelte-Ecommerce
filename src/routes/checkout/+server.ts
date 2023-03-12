import {json, type RequestHandler} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST: RequestHandler = async ({ request }) => {
    const { cartData, userData } = await request.json();
    // let productData;
    console.log(cartData, userData)
    // try {
    //     productData = await prisma.tea.findUnique({
    //         where: {
    //             id
    //         },
    //         select: {
    //             quantity: true
    //         }
    //     });
    // } catch (error) {
    //     console.log('Product GET Error', error);
    //     return json({
    //         success: false,
    //         message: `Prisma Error`
    //     });
    // }
    return json({
        success: true,
        message: `Here is your quantity:`
    });
};
