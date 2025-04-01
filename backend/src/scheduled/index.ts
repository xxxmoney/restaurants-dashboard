import {DateTime} from "luxon";
import {REFRESH_CACHE_CRON} from "../common/constants/scheduled.constants";
import {handleRefreshCache} from "./refreshCache.scheduled";

export async function scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext): Promise<void> {
    console.info(`Cron Trigger: ${event.cron}, Scheduled Time: ${DateTime.fromMillis(event.scheduledTime)}`);

    let scheduledTaskPromise: Promise<void>;

    // Handle jobs based on cron
    switch (event.cron) {
        case REFRESH_CACHE_CRON:
            scheduledTaskPromise = handleRefreshCache(env);
            break;
        default:
            throw new Error(`Unhandled cron schedule: ${event.cron}`);
    }

    // Use ctx.waitUntil to ensure async task completes
    if (scheduledTaskPromise) {
        ctx.waitUntil(scheduledTaskPromise);
    }
}
