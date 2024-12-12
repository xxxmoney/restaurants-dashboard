import {Hono} from 'hono'
import { menuRoute } from './routes/menu'

const app = new Hono()

app.route('/menus', menuRoute)

export default app
