# Frontend - Tauri App

## Prerequisites

Install packages:
`npm install`

## Running the app

To run the app, simply run this:
`npm run dev`

## Publish to Github Pages

To publish, simply run this:
`npm run deploy`

## Business logic

# How to add new menu/web
 - Add new value to `/shared/constants/restaurant.enum.js`
 - Add new value to `/shared/constants/restaurant.constants.js`
 - Add new value to `/app/tauri-app/src/constants/menu.constants.js`
 - Add new value to (if you want to have web view) `/app/tauri-app/constants/web.constants.js`
 - Add handling to `/backend/src/common/services/menu.service.ts`
 - Add handling to (only if needed) `/backend/src/common/services/web.service.ts`
 - Add handling to `/backend/src/common/services/menuProcessor.service.ts`


