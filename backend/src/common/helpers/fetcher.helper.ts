import { USE_REMOTE_PROXY } from "../constants/common.constants";
import {Context} from "hono";

export function getFetcher(context: Context): Fetcher | undefined {
    return USE_REMOTE_PROXY ? undefined : context.env.PROXY;
}
