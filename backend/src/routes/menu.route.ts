import {Hono} from 'hono'
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";
import {useDb} from "../db";
import {DateTime} from "luxon";
import {DATE_FORMAT} from "../../../shared/constants/common.constants";
import {authMiddleware} from "../middleware/auth.middleware";
import {FavoriteMenuItem, FavoriteMenuItemUpdate} from "../common/dto/favorite";
import {useYupValidatorMiddleware} from "../middleware/validator.middleware";
import {favoriteMenuItemSchema, favoriteMenuItemUpdateSchema} from "../common/schemas/favorite.schema";
import {favorites} from "../db/favorites.schema";
import { eq, and, or, lte, gte } from 'drizzle-orm';

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

  const dbItems = await db.select()
    .from(favorites)
    .where(
      and(
        eq(favorites.userId, user.id),
        or(
          gte(favorites.date, dateFrom.toJSDate()),
          lte(favorites.date, dateTo.toJSDate())
        )
    ));
  const items = dbItems.map(item => ({
    id: item.id,
    date: DateTime.fromJSDate(item.date),
    restaurantId: item.restaurantId,
    text: item.text,
    userId: item.userId
  })) as FavoriteMenuItem[]

  return c.json(items);
});

menuRoute.post(':id/favorites', authMiddleware, useYupValidatorMiddleware('json', favoriteMenuItemUpdateSchema), async (c) => {
  const id: number = parseInt(c.req.param('id'));
  const favoriteCreate = c.req.valid('json') as FavoriteMenuItemUpdate;

  const user = (c.var as any).user;
  const { db } = useDb(c.env);

  const [favoriteNew] = await db.insert(favorites).values({
    date: favoriteCreate.date.toJSDate(),
    text: favoriteCreate.text,
    restaurantId: id.toString(),
    userId: user.id
  }).returning();

  return c.json(favoriteNew);
});

menuRoute.delete(':id/favorites', authMiddleware, useYupValidatorMiddleware('json', favoriteMenuItemUpdateSchema), async (c) => {
  const id: number = parseInt(c.req.param('id')!);
  const favoriteDelete = c.req.valid('json') as FavoriteMenuItemUpdate;

  const user = (c.var as any).user;
  const { db } = useDb(c.env);

  await db.delete(favorites).where(and(
    eq(favorites.userId, user.id),
    eq(favorites.restaurantId, id.toString()),
    eq(favorites.date, favoriteDelete.date.toJSDate()),
    eq(favorites.text, favoriteDelete.text)
  ));

});

export {menuRoute}
