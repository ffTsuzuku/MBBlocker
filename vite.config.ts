import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                block: 'block.html',
                main2: 'src/main.tsx',
                sourceContent: 'src/contentScripts/block.ts',
                background: 'src/backgroundJobs/background.ts',
                tabs: '/src/utility/tabs.ts',
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name][extname]',
            },
        },
    },
})
