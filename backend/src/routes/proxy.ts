import { ProxyService } from '../common/services/proxyService'
import {Hono} from 'hono'

const proxyRoute = new Hono()

// Gets proxied html
proxyRoute.get('/', async (c) => {
    const url = c.req.param('url');
    const charset = c.req.param('charset');

    if (!url) {
        return c.status(400);
    }

    const html = await ProxyService.getHtml(url, charset);

    if (!html) {
        return c.status(404);
    }

    return c.text(html as string);
})


export { proxyRoute }
