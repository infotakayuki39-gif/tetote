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
        'staff-detail-02': resolve(__dirname, 'staff-detail-02.html'),
        'staff-detail-03': resolve(__dirname, 'staff-detail-03.html'),
        'staff-detail-04': resolve(__dirname, 'staff-detail-04.html'),
        'staff-detail-05': resolve(__dirname, 'staff-detail-05.html'),
        'staff-detail-06': resolve(__dirname, 'staff-detail-06.html'),
        blog: resolve(__dirname, 'blog.html'),
        'blog-detail': resolve(__dirname, 'blog-detail.html'),
        'blog-detail-02': resolve(__dirname, 'blog-detail-02.html'),
        'blog-detail-03': resolve(__dirname, 'blog-detail-03.html'),
        'blog-detail-04': resolve(__dirname, 'blog-detail-04.html'),
        'blog-detail-05': resolve(__dirname, 'blog-detail-05.html'),
        'blog-detail-06': resolve(__dirname, 'blog-detail-06.html'),
        'blog-detail-07': resolve(__dirname, 'blog-detail-07.html'),
        'blog-detail-08': resolve(__dirname, 'blog-detail-08.html'),
        'blog-detail-09': resolve(__dirname, 'blog-detail-09.html'),
        benefits: resolve(__dirname, 'benefits.html'),
        career: resolve(__dirname, 'career.html'),
        faq: resolve(__dirname, 'faq.html'),
        entry: resolve(__dirname, 'entry.html'),
        'entry-thanks': resolve(__dirname, 'entry-thanks.html'),
        detail: resolve(__dirname, 'detail.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
