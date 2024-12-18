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

    let html: string | undefined;

    try {
        html = await ProxyService.getHtml(url, charset);
    } catch (e) {
        console.error(e);
    }

    if (!html) {
        return c.json({error: 'Failed to get html'}, 500);
    }

    return c.html(html);
})


export {proxyRoute}
