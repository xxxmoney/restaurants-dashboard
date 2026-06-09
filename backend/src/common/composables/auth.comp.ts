
import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import {BACKEND_URL_BASE, FRONTEND_URL_BASE} from "../../../../shared/constants/common.constants";

export const useAuth = (env: any) => {
  const auth = betterAuth({
    baseURL: BACKEND_URL_BASE,

    trustedOrigins: [
      FRONTEND_URL_BASE
    ],

    secret: env.BETTER_AUTH_API_KEY!,

    plugins: [
      dash({
        apiKey: env.BETTER_AUTH_API_KEY!,
      })
    ],

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      }
    }

    // TODO: setup database
  });

  return {auth};
};
