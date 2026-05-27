import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://reatret.net',
    integrations: [react(), tailwind(), sitemap()],
    output: 'static',
    vite: {
        plugins: [
            {
                name: 'dev-rewrite',
                configureServer(server) {
                    server.middlewares.use((req, res, next) => {
                        if (req.url && req.url.startsWith('/photo/') && !req.url.includes('.')) {
                            req.url = '/photo';
                        }
                        next();
                    });
                }
            }
        ]
    }
});
