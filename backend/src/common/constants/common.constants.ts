import {IS_DEBUG} from "../../../../shared/constants/common.constants";

export const USE_REMOTE_PROXY = false;

export const PROXY_URL = IS_DEBUG ? 'http://localhost:8788' : 'https://proxy-worker.xxxmoney111.workers.dev';
