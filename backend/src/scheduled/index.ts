import {DateTime} from "luxon";
import {REFRESH_CACHE_CRON} from "../common/constants/scheduled.constants";
import {handleRefreshCache} from "./refreshCache.scheduled";

async function handler(event: ScheduledEvent, func: Promise<void>): Promise<void> {
    try {
        await func;
        console.info(`Scheduled task completed successfully: '${event.cron}'`);
    } catch (e: any) {
        // Throw error with the message
        throw new Error(`Scheduled task failed: '${event.cron}': ${e.message}`);
    }
}

export async function scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext): Promise<void> {
    console.info(`Cron Trigger: ${event.cron}, Scheduled Time: ${DateTime.fromMillis(event.scheduledTime)}`);

    let handlerPromise: Promise<void>;

    // Handle jobs based on cron
    switch (event.cron) {
        case REFRESH_CACHE_CRON:
            handlerPromise = handler(event, handleRefreshCache(env));
            break;
        default:
            throw new Error(`Unhandled cron schedule: ${event.cron}`);
    }

    // Use ctx.waitUntil to ensure async task completes
    ctx.waitUntil(handlerPromise);
}
