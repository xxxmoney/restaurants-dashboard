export const IS_DEBUG = false;

export const DATE_FORMAT = 'yyyy-MM-dd';

export const FRONTEND_URL_BASE = IS_DEBUG ? 'http://localhost:1420' : 'https://xxxmoney.github.io';
export const FRONTEND_URL = FRONTEND_URL_BASE + '/restaurants-dashboard/';

export const BACKEND_URL_BASE = IS_DEBUG ? 'http://localhost:8787' : 'https://restaurants-backend.xxxmoney111.workers.dev';
export const BACKEND_URL = BACKEND_URL_BASE + '/api';
