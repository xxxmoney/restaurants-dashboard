import { ProxyService } from '../services/proxyService'
import {Hono} from 'hono'

const proxyRoute = new Hono()

// Get proxied html
proxyRoute.get('/', async (c) => {
    const url = c.req.param('url');

    const html = await ProxyService.getHtml(url as string);

    if (html == null) {
        return c.status(404);
    }

    return c.text(html as string);
})


export { proxyRoute }
