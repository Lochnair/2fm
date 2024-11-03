import { S3_PUBLIC_URL, S3_URL } from '$env/static/private';

export function GET(request: Request) {
	const publicUrl = !S3_PUBLIC_URL ? S3_URL : S3_PUBLIC_URL;
	const url = new URL(request.url.pathname, publicUrl);

	return new Response(null, {
		status: 302, // Temporary redirect
		headers: {
			Location: `${url.href}`
		}
	});
}
