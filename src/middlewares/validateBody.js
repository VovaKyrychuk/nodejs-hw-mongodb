// import createHttpError from 'http-errors';

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, {
//       abortEarly: false,
//     });
//     next();
//   } catch (err) {
//     const error = createHttpError(400, error.details[0].message, {
//       errors: err.details,
//     });
//     next(error);
//   }
// };
import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const httpError = createHttpError(400, error.details[0].message, {
        expose: true,
      });
      return next(httpError);
    }
    next();
  };
};
