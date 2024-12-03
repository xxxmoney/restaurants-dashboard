import {Hono} from 'hono'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello World, Hono!')
})

export default app
