// src/params/folder.ts
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
	return !/\.[a-z0-9]+$/.test(param); // Matches any string without a file extension
}) satisfies ParamMatcher;
