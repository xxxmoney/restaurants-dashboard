import { ProxyService } from '../services/proxyService'
import {Hono} from 'hono'

const proxyRoute = new Hono()

// Get proxied html
proxyRoute.get('/', async (c) => {
    return await ProxyService.fetch(c.req);
})


export { proxyRoute }
