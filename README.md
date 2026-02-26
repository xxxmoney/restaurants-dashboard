# Simple Restaurant Dashboard App

## Description

Simple restaurant menus overview app.
Built with Tauri, so there is support for browser, desktop and mobile.

Consists of 3 main parts:

- Frontend: Vue.js
- Backend: Hono Cloudflare
- Proxy - Legacy Cloudflare

Each parts have its own README - check them out for more details.

## General Info
 - /backend - Hono Cloudflare project
 - /app/tauri-app - Tauri project with Vue.js frontend
 - /proxy - Legacy Cloudflare project (for proxying requests for restaurant menus - bypassing reasons)

## Prerequisites
 - Install Node.js
 - Install dependencies for /app/tauri-app
 - Install dependencies for /backend
 - Install dependencies for /backend
 - Create a .dev.vars file in /backend with following
   - `GEMINI_KEY = <your google gemini key>`
 - Setup for local debug in explained in /shared/README.md
 - Run all projects with `npm run dev`

## Quick Start - Run all projects

Install packages: `npm install`

Run all projects: `npm run dev`

## Quick Start - Run Each Project

Frontend: `npm run dev:frontend`

Backend: `npm run dev:backend`

Proxy: `npm run dev:proxy`


