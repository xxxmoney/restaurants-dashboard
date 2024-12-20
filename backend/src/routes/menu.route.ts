import {Hono} from 'hono'
import {MenuService} from "../common/services/menu.service";
import {getFetcher} from "../common/helpers/fetcher.helper";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    // @ts-ignore
    const kv = c.env.KV_CACHE;
    const cacheKey = 'menu-get-id-' + c.req.param('id');

    const cachedValue = await kv.get(cacheKey);
    console.log('Cached Value: ', cachedValue);
    if (cachedValue) {
        return c.json(JSON.parse(cachedValue));
    }

    const id: number = parseInt(c.req.param('id'));

    // @ts-ignore
    console.log(c.env.PROXY)
    // @ts-ignore
    const menus = await MenuService.getMenu(id, getFetcher(c.env));
    console.log('Caching value: ', menus);
    await kv.put(cacheKey, JSON.stringify(menus), {expirationTtl: 10});

    return c.json(menus);
});

export {menuRoute}
