/**
 * Vite plugin that injects __DIWAN_DATA__ template into HTML during dev mode.
 * This allows the app to read initial page data without requiring a full prerender.
 */
import type { Plugin, ViteDevServer } from 'vite'
import { parse as parseUrl } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

export function devDataPlugin(): Plugin {
  let server: ViteDevServer

  return {
    name: 'diwan-dev-data',
    apply: 'serve', // Only run in dev mode

    configureServer(_server) {
      server = _server

      // Return a function to add middleware after Vite's built-in middleware
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // Only handle HTML requests (not assets, HMR, etc.)
          const url = req.url || '/'
          
          // Skip Vite internal routes and static assets
          if (
            url.startsWith('/@') ||
            url.startsWith('/__') ||
            url.startsWith('/node_modules') ||
            url.includes('.') && !url.endsWith('.html')
          ) {
            return next()
          }

          try {
            // Parse the pathname from the URL
            const { pathname } = parseUrl(url)
            const cleanPath = pathname || '/'

            // Read the index.html template
            const indexPath = path.resolve(server.config.root, 'index.html')
            let html = fs.readFileSync(indexPath, 'utf-8')

            // Apply Vite's HTML transforms (adds HMR client, etc.)
            html = await server.transformIndexHtml(url, html)

            // Load the server-page-data module via Vite's SSR loader
            // This handles TypeScript and path aliases
            const { getInitialPageData } = await server.ssrLoadModule(
              '/src/lib/server-page-data.ts'
            )

            // Get the page data for this route
            const pageData = getInitialPageData(cleanPath)

            // Inject the __DIWAN_DATA__ template before </head>
            const dataTemplate = `<template id="__DIWAN_DATA__">${JSON.stringify(pageData)}</template>`
            html = html.replace('</head>', `${dataTemplate}\n</head>`)

            // Send the response
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } catch (err) {
            // Log the error and let Vite's error overlay handle it
            console.error('[diwan-dev-data] Error:', err)
            next(err)
          }
        })
      }
    },
  }
}
