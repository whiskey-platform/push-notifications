import { db } from '@push-notifications/core/db';
import { builder } from '../builder';
import { logger } from '@push-notifications/core/utils';

const AddDeviceTokenInput = builder.inputType('AddDeviceTokenInput', {
  fields: (t) => ({
    token: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  getDeviceTokens: t.stringList({
    authScopes: {
      isLoggedIn: true,
    },
    resolve: async (root, args, context) =>
      (
        await db
          .selectFrom('device_tokens')
          .select('device_token')
          .where('user_id', '=', context.userId!)
          .execute()
      ).map((v) => v.device_token),
  }),
}));

builder.mutationFields((t) => ({
  addDeviceToken: t.boolean({
    authScopes: {
      isLoggedIn: true,
    },
    args: {
      input: t.arg({ type: AddDeviceTokenInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const count = (
        await db
          .selectFrom('device_tokens')
          .select('index')
          .where('user_id', '=', context.userId!)
          .execute()
      ).length;
      try {
        await db
          .insertInto('device_tokens')
          .values({
            user_id: context.userId!,
            index: count,
            device_token: args.input.token,
          })
          .execute();
        return true;
      } catch (error) {
        logger.error('Error seving device token to DB', error);
        return false;
      }
    },
  }),
}));
