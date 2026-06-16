import type { D1Database, IncomingRequestCfProperties } from "@cloudflare/workers-types";
import { betterAuth } from "better-auth";
import { withCloudflare } from "better-auth-cloudflare";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1";
import { schema } from "../db";
import {BACKEND_URL_BASE, FRONTEND_URL_BASE} from "../../../shared/constants/common.constants";
import {dash} from "@better-auth/infra";

function createAuth(env?: any) {
  const db = env ? drizzle(env.DB, { schema, logger: true }) : ({} as any);

  return betterAuth({
    baseURL: BACKEND_URL_BASE,
    ...withCloudflare(
      {
        autoDetectIpAddress: false,
        geolocationTracking: false,
        d1: env
          ? {
            db,
            options: {
              usePlural: true,
              debugLogs: true,
            },
          }
          : undefined,
      },
      {
        emailAndPassword: {
          enabled: true,
        },

        plugins: [dash({
          apiKey: env?.BETTER_AUTH_API_KEY!,
        })],

        trustedOrigins: [
          FRONTEND_URL_BASE
        ],

        secret: env?.BETTER_AUTH_API_KEY!,

        socialProviders: {
          google: {
            prompt: "select_account", // Ask for account each time
            clientId: env?.GOOGLE_CLIENT_ID!,
            clientSecret: env?.GOOGLE_CLIENT_SECRET!,
          }
        },

        advanced: {
          cookiePrefix: "restaurants-dashboard",
          defaultCookieAttributes: {
            sameSite: "none",
            secure: true
          }
        }
      }
    ),

    ...(env
      ? {}
      : {
        database: drizzleAdapter({} as D1Database, {
          provider: "sqlite",
          usePlural: true,
          debugLogs: true,
        }),
      }),
  });
}

// Export for CLI schema generation
export const auth = createAuth();

// Export for runtime usage
export { createAuth };
