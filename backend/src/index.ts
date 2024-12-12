import {Hono} from 'hono'
import { menuRoute } from './routes/menu'
import { proxyRoute } from "./routes/proxy";

const app = new Hono()

app.route('/menus', menuRoute)
app.route('/proxy', proxyRoute)

export default app
