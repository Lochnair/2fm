import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    // Add this
    css: {
        preprocessorOptions: {
            // if using SCSS
            scss: {                                 
                quietDeps: true,
				silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'legacy-js-api']
            },
            // if using SASS
            sass: {                                 
                quietDeps: true,
				silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'legacy-js-api']
            },
        },
    }
});
