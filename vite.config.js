import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        staff: resolve(__dirname, 'staff.html'),
        'staff-detail': resolve(__dirname, 'staff-detail.html'),
        blog: resolve(__dirname, 'blog.html'),
        'blog-detail': resolve(__dirname, 'blog-detail.html'),
        benefits: resolve(__dirname, 'benefits.html'),
        career: resolve(__dirname, 'career.html'),
        faq: resolve(__dirname, 'faq.html'),
        entry: resolve(__dirname, 'entry.html'),
        'entry-thanks': resolve(__dirname, 'entry-thanks.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
