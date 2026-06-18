import {createAuth} from "../auth";
import {Context} from "hono";

export const authGuard = async (c: Context, next: any) => {
  const auth = createAuth(c.env); // TODO: test this and use this

  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
};
