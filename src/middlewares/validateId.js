// import { isValidObjectId } from 'mongoose';
// import createHttpError from 'http-errors';

// export const validateId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     return next(HttpError(404, 'Not found'));
//   }
//   next();
// };

import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateId =
  (idName = 'id') =>
  (req, res, next) => {
    try {
      const id = req.params[idName];

      if (!id) {
        throw new Error('ID in validateId is not provided');
      }

      if (!isValidObjectId(id)) {
        return next(createHttpError(400, 'Invalid ID'));
      }
      return next();
    } catch (error) {
      return next(createHttpError(500, error.message));
    }
  };
