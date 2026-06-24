import {Hono} from 'hono'
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";
import {useDb} from "../db";
import {DateTime} from "luxon";
import {DATE_FORMAT} from "../../../shared/constants/common.constants";
import {authMiddleware} from "../middleware/auth.middleware";
import {FavoriteMenuItem, FavoriteMenuItemCreate} from "../common/dto/favorite";
import {useYupValidatorMiddleware} from "../middleware/validator.middleware";
import {favoriteMenuItemCreateSchema} from "../common/schemas/favorite.schema";

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
});

menuRoute.get(':id/favorites', authMiddleware, async (c) => {
  const dateFromRaw = c.req.query('dateFrom');
  const dateToRaw = c.req.query('dateTo');

  if (!dateFromRaw || !dateToRaw) {
    return c.json({ error: 'Missing dateFrom or dateTo parameter' }, 400);
  }

  const dateFrom: DateTime = DateTime.fromFormat(dateFromRaw, DATE_FORMAT);
  const dateTo: DateTime = DateTime.fromFormat(dateToRaw, DATE_FORMAT);
  const user = (c.var as any).user;

  const { db } = useDb(c.env);

  const favorites = await db.query.favorites.findMany({
    where: (f, { gte, lte, or, and, eq }) =>
      and(
        eq(f.userId, user.id),
        or(
          gte(f.date, dateFrom.toJSDate()),
          lte(f.date, dateTo.toJSDate())
        )
      )
  });

  return c.json(favorites);
});

menuRoute.post(':id/favorites', authMiddleware, useYupValidatorMiddleware('json', favoriteMenuItemCreateSchema), async (c) => {
  const value = c.req.valid('json') as FavoriteMenuItemCreate;
  const user = (c.var as any).user;

  // TODO: finish and test this

});

export {menuRoute}
