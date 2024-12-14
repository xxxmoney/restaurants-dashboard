import {ProxyService} from '../common/services/proxyService'
import {Hono} from 'hono'

const proxyRoute = new Hono();

// Gets proxied html
proxyRoute.get('/', async (c) => {
    const url = c.req.query('url');
    const charset = c.req.query('charset');

    if (!url) {
        return c.json({error: 'url is required'}, 400);
    }

    const html = await ProxyService.getHtml(url, charset);

    if (!html) {
        return c.notFound();
    }

    return c.html(html);
})


export {proxyRoute}
