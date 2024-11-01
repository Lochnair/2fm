import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, route }) => {
	return {
		url: params.path
	};
};
