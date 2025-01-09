import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode })=> {
	process.env = {
		...process.env,
		...loadEnv(mode, process.cwd()),
		PUBLIC_BUILD_MODE: process.env.PUBLIC_BUILD_MODE || 'none'
  }

	return {
		plugins: [sveltekit()],
		server: {
			port: 6040,
			host: true
		}
	}
});
