import {Hono} from 'hono'

const menuRoute = new Hono()

// Get all menus
menuRoute.get('/', (c) => {
    // TODO: Implement this
    return c.json([])
})

// Get menu by id
menuRoute.get('/:id', (c) => {
    const id = c.req.param('id');

    // TODO: Implement this
    return c.json({})
});

export {menuRoute}
