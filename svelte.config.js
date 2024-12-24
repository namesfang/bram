import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	onwarn: (waring, handler)=> {
		if (waring.code.startsWith('ally-')) {
			return
		}
		handler(waring)
	},
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false
		},
		alias: {
			$assets: 'src/assets',
			$components: 'src/components',
		}
	}
};

export default config;
