// src/routes/my-page/+page.server.ts
import { AwsClient } from 'aws4fetch';
import type { PageServerLoad } from './$types';
import { XMLParser } from 'fast-xml-parser';
import {
	CLOUDFLARE_ACCESS_KEY_ID,
	CLOUDFLARE_ACCOUNT_ID,
	CLOUDFLARE_SECRET_ACCESS_KEY
} from '$env/static/private';

export const load: PageServerLoad = async () => {
	if (!CLOUDFLARE_ACCESS_KEY_ID || !CLOUDFLARE_SECRET_ACCESS_KEY) {
		throw new Error('CLOUDFLARE_ACCESS_KEY_ID or CLOUDFLARE_SECRET_ACCESS_KEY is not set');
	}

	const R2_URL_BASE = `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;

	const createR2UrlForBucket = (bucketName: string) => `${R2_URL_BASE}/${bucketName}`;

	const S3 = new AwsClient({
		region: 'auto',
		service: 's3',
		accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY
	});

	const ListObjectsV2Result = await S3.fetch(
		`${createR2UrlForBucket('2fm')}?list-type=2&delimiter=/`
	);
	const result = await ListObjectsV2Result.text();
	console.log(result);
	const parser = new XMLParser();
	const jObj = parser.parse(result);
	console.log(jObj.ListBucketResult);
	return jObj.ListBucketResult;
};
