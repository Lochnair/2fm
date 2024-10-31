// src/routes/my-page/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const bucket = platform?.env.STORAGE_BUCKET;

	if (!bucket) {
		throw new Error('R2 bucket not available');
	}

	const objects = await bucket.list(); // lists objects in the bucket
	console.log(objects);

	for (const obj in objects.objects) {
		console.log(obj);
	}

	return {
		objects
	};
};
