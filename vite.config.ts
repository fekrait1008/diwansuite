import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { devDataPlugin } from './vite-plugin-dev-data'

function buildCspHeader() {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "frame-src 'self' https://www.googletagmanager.com",
    "form-action 'self' mailto: https://wa.me",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://assets.apollo.io https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://assets.apollo.io https://aplo-evnt.com https://static.cloudflareinsights.com https://cloudflareinsights.com",
    "worker-src 'self' blob: https://assets.apollo.io",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join('; ')
}

function buildSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
    'Content-Security-Policy': buildCspHeader(),
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH?.trim() || '/'
  const isProduction = mode === 'production'
  const securityHeaders = buildSecurityHeaders()

  return {
    base,
    plugins: [devDataPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    esbuild: isProduction
      ? {
          drop: ['console', 'debugger'],
        }
      : undefined,
    build: {
      target: ['chrome100', 'edge100', 'firefox100', 'safari15'],
      manifest: true,
      ssrManifest: true,
      cssMinify: 'lightningcss',
      sourcemap: false,
      modulePreload: {
        polyfill: false,
      },
      reportCompressedSize: true,
      chunkSizeWarningLimit: 220,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react')) return 'react-core'
            if (id.includes('node_modules/lucide-react')) return 'icon-vendor'
            if (id.includes('web-vitals')) return 'rum-vitals'
            if (id.includes('/src/components/shared/InternalPageLayout')) return 'internal-pages'
            return undefined
          },
        },
      },
    },
    server: {
      port: 4173,
      strictPort: true,
      headers: securityHeaders,
    },
    preview: {
      port: 4173,
      headers: securityHeaders,
    },
  }
})
