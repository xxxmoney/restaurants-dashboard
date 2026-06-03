import { betterAuth } from "better-auth";

export const useAuth = (env: any) => {
  const auth = betterAuth({
    // TODO: setup auth

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      }
    }
  });

  return {auth};
};
