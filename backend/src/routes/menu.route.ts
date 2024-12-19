import {Hono} from 'hono'
import {MenuService} from "../common/services/menu.service";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    const id: number = parseInt(c.req.param('id'));
    
    // @ts-ignore
    const menus = await MenuService.getMenu(id, c.env.PROXY);

    return c.json(menus);
});

export {menuRoute}
