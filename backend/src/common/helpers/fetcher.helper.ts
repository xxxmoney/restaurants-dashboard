import {FORCE_USE_REMOTE_PROXY} from "../constants/common.constants";
import {Context} from "hono";

export function getFetcher(env: any): Fetcher | undefined {
    return FORCE_USE_REMOTE_PROXY ? undefined : env.PROXY;
}
