import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {menuRoute} from './routes/menu.route'
import {websRoute} from "./routes/web.route";

const app = new Hono()

// Logger middleware
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
app.route('/webs', websRoute)


export default app
