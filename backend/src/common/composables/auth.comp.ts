
import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import {BACKEND_URL} from "../../../../shared/constants/common.constants";

export const useAuth = (env: any) => {
  const auth = betterAuth({
    baseURL: BACKEND_URL,

    secret: env.BETTER_AUTH_API_KEY!,

    // TODO: setup auth
    plugins: [
      dash()
    ],
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      }
    }
  });

  return {auth};
};
