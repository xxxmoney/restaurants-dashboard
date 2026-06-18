import {drizzle} from "drizzle-orm/d1";
import {schema} from "./schema";

export * from "drizzle-orm";
export * from "./auth.schema";
export * from "./schema";

export const useDb = (env: any) => {
  const db = drizzle(env.DB, { schema, logger: true });

  return { db };
}
