export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	return new Response(number.toString(), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
