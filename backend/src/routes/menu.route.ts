import {Hono} from 'hono'
import {MenuProcessor} from "../common/services/menuProcessor.service";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    const id: number = parseInt(c.req.param('id'));

    return c.json(await MenuProcessor.getProcessedMenusWithCache(c.env, id));
});

export {menuRoute}
