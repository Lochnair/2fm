import type { Request } from '@sveltejs/kit';
import { AwsClient } from 'aws4fetch';
import { S3_KEY, S3_SECRET, S3_URL } from '$env/static/private';

const S3 = new AwsClient({
	region: 'auto',
	service: 's3',
	accessKeyId: S3_KEY,
	secretAccessKey: S3_SECRET
});

export async function GET(request: Request) {
	const endpoint = new URL(S3_URL + request.url.pathname);
	console.log('Object href: ' + endpoint.href);

	// Make a signed request to R2
	const s3Response = await S3.fetch(endpoint.href);

	if (!s3Response.ok) {
		return new Response('File not found or access denied', { status: 404 });
	}

	console.log(s3Response.headers);

	// Extract headers to include in the response
	const headers = new Headers(s3Response.headers);

	// Add Content-Disposition for download
	headers.set(
		'Content-Disposition',
		`attachment; filename="${request.url.pathname.split('/').pop()}"`
	);

	// Stream the file to the client
	return new Response(s3Response.body, {
		headers,
		status: s3Response.status
	});
}
