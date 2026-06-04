import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/BahiaImperial_API': {
                target: 'http://localhost:5248',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/BahiaImperial_API/, ''),
            },
        },
    },
})