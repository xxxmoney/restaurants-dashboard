import {Hono} from 'hono'
import {menuRoute} from './routes/menu'
import {proxyRoute} from "./routes/proxy"
import {logger} from 'hono/logger'

const app = new Hono()
app.use(logger());

// Allow any origin
app.use('*', async (c, next) => {
    await next()
    c.res.headers.set('Access-Control-Allow-Origin', '*')
});

// Default get response
app.get('/', (c) => {
    return c.text('Hello, Hono Here!')
});

// Routes
app.route('/menus', menuRoute)
app.route('/proxy', proxyRoute)

export default app
