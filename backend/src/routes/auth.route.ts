import {Hono} from 'hono'
import {useAuth} from "../common/composables/auth.comp";

const authRoute = new Hono()

authRoute.on(["POST", "GET"], "/*", (c) => {
  const { auth } = useAuth(c.env);
  return auth.handler(c.req.raw);
});

export {authRoute}
