import {Hono} from 'hono'
import { menuRoute } from './routes/menu'
import { proxyRoute } from "./routes/proxy"
import { logger } from 'hono/logger'

const app = new Hono()
app.use(logger());

app.route('/menus', menuRoute)
app.route('/proxy', proxyRoute)

export default app