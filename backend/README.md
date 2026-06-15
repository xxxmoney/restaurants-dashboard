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

## Authentication
- Authentication is handled by [BetterAuth](https://better-auth.com)
- Along with package `better-auth-cloudflare`
- Uses [db1](https://www.cloudflare.com/products/d1/)
- Social (Google Sign-In) is used in the app

## Database
- [Drizzle](https://orm.drizzle.team/docs/get-started) is used for ORM, schema, migrations etc
- [Migrations](https://orm.drizzle.team/docs/migrations) as a code-first db approach
- Schemas are present in `src/db/*.schema.ts` - all schemas are used in `src/db/schema.ts`
- Scripts are present in `package.json`
- To migrate
  - `db:migrate:dev` / `db:migrate:prod`
- Preview of the database
  - Db studio `db:studio:dev` / `db:studio:prod`

