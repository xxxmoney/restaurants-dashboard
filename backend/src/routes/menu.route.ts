import {Hono} from 'hono'
import {MenuService} from "../common/services/menu.service";
import {getFetcher} from "../common/helpers/fetcher.helper";
import {useEndpointCache} from "../common/composables/cache.comp";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    // @ts-ignore
    const cache = useEndpointCache(c);

    const cachedValue = await cache.get();
    if (cachedValue) {
        return c.json(cachedValue);
    }

    const id: number = parseInt(c.req.param('id'));
    // @ts-ignore
    const menus = await MenuService.getMenu(id, getFetcher(c), c.env);
    await cache.set(menus);

    return c.json(menus);
});

export {menuRoute}
