
import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";

export const useAuth = (env: any) => {
  const auth = betterAuth({
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
