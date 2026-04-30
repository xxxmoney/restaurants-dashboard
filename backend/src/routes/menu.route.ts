import {Hono} from 'hono'
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";

const menuRoute = new Hono()

menuRoute.get('/:id', async (c) => {
    const id: number = parseInt(c.req.param('id'));

    return c.json(await MenuProcessor.getProcessedMenusWithCache(c.env, id));
});

menuRoute.delete('/:id/cache', async (c) => {
    const id: number = parseInt(c.req.param('id'));

    const { clear } = useMenuCache(c.env, id);
    await clear();

    return c.text('OK');
})

export {menuRoute}
