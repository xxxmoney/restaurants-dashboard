import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {menuRoute} from './routes/menu.route'
import {websRoute} from "./routes/web.route";
import {setup} from "./setup";
import {IS_DEBUG} from "../../shared/constants/common.constants";

const app = new Hono()

setup();

// Logger middleware
if (IS_DEBUG) {
    app.use('*', logger());
}

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
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
}))

// Default get response
app.get('/', (c) => {
    return c.text('Hello, Hono Here!')
});

// Routes
app.route('/menus', menuRoute)
app.route('/webs', websRoute)


export default app
