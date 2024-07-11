import createHttpError from 'http-errors';
import { Sessions } from '..db/models/session.js';
import UsersCollection from '..db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const sessions = await Sessions.findOne({ accessToken: token });

    if (!sessions) {
      return next(createHttpError(401, 'Session not found'));
    }

    if (Date.now() > sessions.accessTokenValidUntil) {
      return next(createHttpError(401, 'Session token is expired!'));
    }

    const user = await UsersCollection.findById(sessions.userId);

    if (!user) {
      return next(createHttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
