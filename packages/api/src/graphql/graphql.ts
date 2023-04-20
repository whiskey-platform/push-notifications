import 'reflect-metadata';
import { schema } from './schema';
import { GraphQLHandler } from 'sst/node/graphql';
import { AuthService } from '@push-notifications/core/services';
import { logger } from '@push-notifications/core/utils';
import Container from 'typedi';

const auth = Container.get(AuthService);

export const handler = GraphQLHandler({
  schema,
  context: async (req) => {
    let isLoggedIn = false;
    try {
      isLoggedIn = await auth.verifyAuthToken(req.event.headers.authorization!);
    } catch (error) {
      logger.error('Error verifying auth token', { error });
    }
    let userId: number | undefined = undefined;
    try {
      const user = await auth.getUserInfo(req.event.headers.authorization!);
      userId = user.id;
    } catch (error) {
      logger.error('Error getting user info', { error });
    }
    return {
      isLoggedIn,
      userId,
    };
  },
});
