
import { validator } from 'hono/validator'
import * as yup from 'yup'

export const useYupValidatorMiddleware = (
  target: 'json' | 'query' | 'param' | 'form',
  schema: yup.Schema
) => {
  return validator(target, (value, c) => {
    try {
      return schema.validateSync(value, {
        abortEarly: false,
        stripUnknown: true
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorDetails = error.inner.map(err => ({
          field: err.path,
          message: err.message
        }));
        return c.json({ error: 'Validation failed', details: errorDetails }, 400);
      }
      return c.json({ error: 'Invalid request data' }, 400);
    }
  })
}
