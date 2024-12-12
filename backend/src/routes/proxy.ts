import { ProxyService } from '../services/proxyService'
import {Hono} from 'hono'

const proxyRoute = new Hono()

// Get proxied html
proxyRoute.get('html', (c) => {
    const html = ProxyService.getHtml()

    return c.json([])
})



export { proxyRoute }
