import {Hono} from 'hono'
import {WebService} from "../common/services/web.service";

const websRoute = new Hono()

// Get menu by id
websRoute.get('/:id', async (c) => {
    const id: number = parseInt(c.req.param('id'));

    return c.json({
        id: id,
        html: await WebService.getWebHtml(id)
    })
});

export {websRoute}
