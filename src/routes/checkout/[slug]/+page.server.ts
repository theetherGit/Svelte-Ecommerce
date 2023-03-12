import type {PageServerLoad} from "./$types";
import {paymentById} from "$lib/server/prisma";


export const load: PageServerLoad = async ({params}) => {
    return {
        history: paymentById(params.slug)
    };
};
