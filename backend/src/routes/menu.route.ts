import {Hono} from 'hono'
import {getFetcher} from "../common/helpers/fetcher.helper";
import {useEndpointCache} from "../common/composables/cache.comp";
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {MENU_CACHE_EXPIRATION} from "../common/constants/cache.constants";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    // @ts-ignore
    const cache = useEndpointCache(c, MENU_CACHE_EXPIRATION);

    const cachedValue = await cache.get();
    if (cachedValue) {
        return c.json(cachedValue);
    }

    const id: number = parseInt(c.req.param('id'));
    // @ts-ignore
    const menus = await MenuProcessor.getProcessedMenu(id, c.env, getFetcher(c));
    await cache.set(menus);

    return c.json(menus);
});

export {menuRoute}
