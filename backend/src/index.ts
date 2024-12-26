import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {menuRoute} from './routes/menu.route'
import {websRoute} from "./routes/web.route";
import {setup} from "./setup";

const app = new Hono()

setup();

// Logger middleware
app.use('*', logger());

// Error handling
app.onError((error, c) => {
    console.error('An error occurred:', error)

    const response = {
        message: error.message,
        request: {
            url: c.req.url,
            method: c.req.method
        },
        stack: error.stack
    };

    c.status(500)
    return c.json(response)
});

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
