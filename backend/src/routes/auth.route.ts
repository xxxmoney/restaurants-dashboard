import {Hono} from 'hono'
import {createAuth} from "../auth";
const authRoute = new Hono()

authRoute.all( "*", (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

export {authRoute}
