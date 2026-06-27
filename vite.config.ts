import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function asyncCssPreload() {
  return {
    name: 'async-css-preload',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html: string, ctx) {
        const cssFile = Object.keys(ctx.bundle ?? {}).find((file) => file.endsWith('.css'))
        if (!cssFile) return html

        const href = `/${cssFile}`
        let result = html.replace(
          /<link rel="stylesheet" crossorigin href="\/assets\/[^"]+\.css">\n?/,
          '',
        )
        result = result.replace(
          /<link rel="preload" href="\/assets\/index\.css" as="style" onload="this\.onload=null;this\.rel='stylesheet'">\s*<noscript><link rel="stylesheet" href="\/assets\/index\.css"><\/noscript>/,
          `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
        )

        const preloads = result.match(/<link rel="modulepreload"[^>]*>/g) ?? []
        const earlyLazyChunks = Object.keys(ctx.bundle ?? {}).filter(
          (file) =>
            file.endsWith('.js') &&
            (file.includes('HomeBelowFold') || file.includes('AppToaster')),
        )

        for (const chunk of earlyLazyChunks) {
          const tag = `<link rel="modulepreload" crossorigin href="/${chunk}">`
          if (!preloads.includes(tag)) {
            preloads.push(tag)
          }
        }

        if (preloads.length > 0) {
          result = result.replace(/<link rel="modulepreload"[^>]*>\n?/g, '')
          const scriptTag =
            result.match(/<script type="module" crossorigin src="\/assets\/[^"]+\.js"><\/script>/)?.[0] ??
            result.match(/<script type="module" crossorigin src="[^"]+"><\/script>/)?.[0]
          if (scriptTag) {
            result = result.replace(
              scriptTag,
              `${[...new Set(preloads)].join('\n')}\n      ${scriptTag}`,
            )
          }
        }

        return result
      },
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    asyncCssPreload(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    proxy: {
      "/api/qazcrm-lead": {
        target: "https://crm.tennet.kz",
        changeOrigin: true,
        rewrite: () =>
          "/api/public/forms/69cbec2a-1fe8-4f9a-b037-1e4767023765/",
      },
      "/api/make-lead": {
        target: "https://hook.eu1.make.com",
        changeOrigin: true,
        rewrite: () => "/ndmetggq64xyt12hi2we1w9bs8ami5fx",
      },
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || /\/react\//.test(id)) return 'vendor';
          if (id.includes('react-router')) return 'router';
          if (id.includes('lucide-react')) return 'ui';
          if (id.includes('sonner')) return 'sonner';
        },
      },
    },
    chunkSizeWarningLimit: 100,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
