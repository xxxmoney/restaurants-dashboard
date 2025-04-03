import {Hono} from 'hono'
import {getFetcher} from "../common/helpers/fetcher.helper";
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {MenuProviderService} from "../common/services/menuProvider.service";

const menuRoute = new Hono()

// Get menu by id
menuRoute.get('/:id', async (c) => {
    const id: number = parseInt(c.req.param('id'));

    const menuService = MenuProviderService.getMenuService(id, c.env, getFetcher(c));
    return c.json(await MenuProcessor.getProcessedMenu(id, c.env, await menuService.getMenus()));
});

export {menuRoute}
