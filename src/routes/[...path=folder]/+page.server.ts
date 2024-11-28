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

	const response = await S3.fetch(createR2UrlForBucket(params.path));

	if (response.status != 200) {
		throw new Error("Something went wrong retrieving object list from S3");
	}

	const result = await response.text();
	const parser = new XMLParser();
	const jObj = parser.parse(result);

	console.log('From API:');
	console.log(jObj.ListBucketResult);

	const prefixLength = jObj.ListBucketResult.Prefix.length;
	const publicUrl = !S3_PUBLIC_URL ? S3_URL : S3_PUBLIC_URL;

	// The S3 API returns an object for if there's only one object
	// To avoid having to deal with it in frontend code, check if it's an array,
	// and if not, move the object to an array instead
	let commonPrefixes = jObj.ListBucketResult.CommonPrefixes
		? Array.isArray(jObj.ListBucketResult.CommonPrefixes)
			? jObj.ListBucketResult.CommonPrefixes
			: [jObj.ListBucketResult.CommonPrefixes]
		: [];

	let contents = jObj.ListBucketResult.Contents
	? Array.isArray(jObj.ListBucketResult.Contents)
		? jObj.ListBucketResult.Contents
		: [jObj.ListBucketResult.Contents]
	: [];

	commonPrefixes = commonPrefixes.map((p: { Prefix: string }) =>
		p.Prefix.slice(prefixLength)
	);

	contents = contents.map((c: any) => ({...c, Name: c.Key.slice(prefixLength), Url:  `${publicUrl}${c.Key}`}))

	console.log('Result:');

	const data = {
		commonPrefixes: commonPrefixes,
		contents: contents
	}

	console.log(data);

	return data;
};
