// src/routes/my-page/+page.server.ts
import { AwsClient } from 'aws4fetch';
import type { PageServerLoad } from './$types';
import { XMLParser } from 'fast-xml-parser';
import { S3_KEY, S3_PUBLIC_URL, S3_SECRET, S3_URL } from '$env/static/private';

function createR2UrlForBucket(path: string) {
	return `${S3_URL}?list-type=2&prefix=${path ? path + '/' : ''}&delimiter=/`;
}

export const load: PageServerLoad = async ({ params }) => {
	if (!S3_KEY || !S3_SECRET || !S3_URL) {
		throw new Error('S3_KEY or S3_SECRET or S3_URL is not set');
	}

	const S3 = new AwsClient({
		region: 'auto',
		service: 's3',
		accessKeyId: S3_KEY,
		secretAccessKey: S3_SECRET
	});

	const ListObjectsV2Result = await S3.fetch(createR2UrlForBucket(params.path));
	const result = await ListObjectsV2Result.text();
	const parser = new XMLParser();
	const jObj = parser.parse(result);

	console.log(jObj.ListBucketResult.Contents);

	// The S3 API returns an object for Contents if there's only one object
	// To avoid having to deal with it in frontend code, check if it's an array,
	// and if not, move the object to an array instead
	if (!Array.isArray(jObj.ListBucketResult.Contents)) {
		const tmp = jObj.ListBucketResult.Contents;
		jObj.ListBucketResult.Contents = [tmp];
	}

	const prefixLength = jObj.ListBucketResult.Prefix.length;
	const publicUrl = !S3_PUBLIC_URL ? S3_URL : S3_PUBLIC_URL;
	jObj.ListBucketResult.Contents.forEach(function (object) {
		object.Name = object.Key.slice(prefixLength);
		object.Url = `${publicUrl}${object.Key}`;
	});

	return {
		objects: jObj.ListBucketResult
	};
};
