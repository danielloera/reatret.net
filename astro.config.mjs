import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindv4 from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://reatret.net',
    integrations: [react(), sitemap()],
    output: 'static',
    vite: {
        plugins: [
            tailwindv4(),
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
