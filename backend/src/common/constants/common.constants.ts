import {IS_DEBUG} from "../../../../shared/constants/common.constants";

export const FORCE_USE_REMOTE_PROXY = false;

export const REMOTE_PROXY_URL = 'https://proxy-worker.xxxmoney111.workers.dev';
export const PROXY_URL = IS_DEBUG ? 'http://localhost:8788' : REMOTE_PROXY_URL;

