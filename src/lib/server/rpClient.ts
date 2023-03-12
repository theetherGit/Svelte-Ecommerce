import Razorpay from 'razorpay';
import { RP_KEY, RP_SECRET } from '$env/static/private';

export const rp = new Razorpay({
	key_id: RP_KEY,
	key_secret: RP_SECRET
});
