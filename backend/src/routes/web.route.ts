import {Hono} from 'hono'
import {WebService} from "../common/services/web.service";
import {getFetcher} from "../common/helpers/fetcher.helper";
import {useEndpointCache} from "../common/composables/cache.comp";
import {WEB_CACHE_EXPIRATION} from "../common/constants/cache.constants";

const websRoute = new Hono()

// Get menu by id
websRoute.get('/:id', async (c) => {
    const cache = useEndpointCache<{ html: string }>(c, WEB_CACHE_EXPIRATION);

    const id: number = parseInt(c.req.param('id'));
    let html: string;

    const cachedValue = await cache.get();
    if (cachedValue) {
        html = cachedValue.html;
    } else {
        // @ts-ignore
        html = await WebService.getWebHtml(id, getFetcher(c));
        await cache.set({html});
    }

    return c.json({
        id: id,
        html: html
    })
});

export {websRoute}
