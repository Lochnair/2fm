// src/routes/my-page/+page.server.ts
import { AwsClient } from 'aws4fetch';
import type { PageServerLoad } from './$types';
import { XMLParser } from 'fast-xml-parser';
import {
	BUCKET_NAME,
	CLOUDFLARE_ACCESS_KEY_ID,
	CLOUDFLARE_ACCOUNT_ID,
	CLOUDFLARE_SECRET_ACCESS_KEY
} from '$env/static/private';

const R2_URL_BASE = `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;

function createR2UrlForBucket(path: string) {
	return `${R2_URL_BASE}/${BUCKET_NAME}?list-type=2&prefix=${path ? path + '/' : ''}&delimiter=/`;
}

export const load: PageServerLoad = async ({ params }) => {
	if (!CLOUDFLARE_ACCESS_KEY_ID || !CLOUDFLARE_SECRET_ACCESS_KEY) {
		throw new Error('CLOUDFLARE_ACCESS_KEY_ID or CLOUDFLARE_SECRET_ACCESS_KEY is not set');
	}

	const S3 = new AwsClient({
		region: 'auto',
		service: 's3',
		accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY
	});

	const ListObjectsV2Result = await S3.fetch(createR2UrlForBucket(params.path));
	const result = await ListObjectsV2Result.text();
	const parser = new XMLParser();
	const jObj = parser.parse(result);

	// The S3 API returns an object for Contents if there's only one object
	// To avoid having to deal with it in frontend code, check if it's an array,
	// and if not, move the object to an array instead
	if (!Array.isArray(jObj.ListBucketResult.Contents)) {
		const tmp = jObj.ListBucketResult.Contents;
		jObj.ListBucketResult.Contents = [tmp];
	}

	const prefixLength = jObj.ListBucketResult.Prefix.length;
	jObj.ListBucketResult.Contents.forEach(function (object) {
		object.Key = object.Key.slice(prefixLength);
	});

	return {
		objects: jObj.ListBucketResult
	};
};
