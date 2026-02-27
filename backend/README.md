# Backend - Hono Worker

## About
 - Hono Cloudflare Worker backend for providing menus for restaurants
 - Parses html content of restaurant websites, processes using Cheerio, processes the result with LLM for categorisation
 - Uses caching using Cloudflare Workers KV
 - Endpoints defined in src/routes/* (used in src/index.ts - `Routes`)

## Prerequisites
 - Install dependencies: `npm install`
 - For local debugging, uncomment a section in wrangler.toml
   - Section below this comment in file: `# Uncomnent for tests to work`

## Running the app
 - To run the app, simply run this: `npm run dev`

## Publish to Cloudflare Workers
 - To publish, simply run this: `npm run deploy`
