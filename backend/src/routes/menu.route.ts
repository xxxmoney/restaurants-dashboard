import {Hono} from 'hono'
import {MenuService} from "../common/services/menu.service";
import {getFetcher} from "../common/helpers/fetcher.helper";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    // @ts-ignore
    const kv = c.env.KV_CACHE;
    const cacheKey = 'menu-get-id-' + c.req.param('id');

    // TODO: caching helper, expiration ttl to constants, etc
    const cachedValue = await kv.get(cacheKey);
    if (cachedValue) {
        const cachedValueParsed = JSON.parse(cachedValue);
        return c.json(cachedValueParsed);
    }

    const id: number = parseInt(c.req.param('id'));

    // @ts-ignore
    console.log(c.env.PROXY)
    // @ts-ignore
    const menus = await MenuService.getMenu(id, getFetcher(c.env));
    const menusJson = JSON.stringify(menus);
    console.log('Caching value: ', menusJson);
    await kv.put(cacheKey, menusJson, {expirationTtl: 60});

    return c.json(menus);
});

export {menuRoute}
