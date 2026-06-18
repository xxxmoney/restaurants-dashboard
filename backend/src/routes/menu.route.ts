import {Hono} from 'hono'
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";
import {useDb} from "../db";
import {DateTime} from "luxon";
import {DATE_FORMAT} from "../../../shared/constants/common.constants";
import {createAuth} from "../auth";
import {authGuard} from "../middleware/auth.middleware";

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

// TODO: test this
menuRoute.get(':id/favorites', authGuard, async (c) => {
  const dateFromRaw = c.req.param('dateFrom');
  const dateToRaw = c.req.param('dateTo');

  if (!dateFromRaw || !dateToRaw) {
    return c.json({ error: 'Missing dateFrom or dateTo parameter' }, 400);
  }

  const auth = createAuth(c.env);

  const dateFrom: DateTime = DateTime.fromFormat(dateFromRaw, DATE_FORMAT);
  const dateTo: DateTime = DateTime.fromFormat(dateToRaw, DATE_FORMAT);
  const user = c.var.user; // TODO: fix this

  const { db } = useDb(c.env);

  const favorites = db.query.favorites.findMany({
    where: (f, { gte, lte, or, and, eq }) =>
      and(
        eq(f.userId, user['id']), // You usually want to scope this to the logged-in user!
        or(
          gte(f.date, dateFrom.toJSDate()),
          lte(f.date, dateTo.toJSDate())
        )
      )
  });
})

export {menuRoute}
