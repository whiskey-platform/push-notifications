import { db } from '@push-notifications/core/db';
import { logger } from '@push-notifications/core/utils';
import { builder } from 'src/graphql/builder';

export function addAddDeviceTokenMutation() {
  const AddDeviceTokenInput = builder.inputType('AddDeviceTokenInput', {
    fields: (t) => ({
      token: t.string({ required: true }),
    }),
  });
  interface IDeviceTokenResponse {
    success: boolean;
  }
  const AddDeviceTokenResponse = builder.objectRef<IDeviceTokenResponse>(
    'AddDeviceTokenResponse'
  );
  builder.objectType(AddDeviceTokenResponse, {
    fields: (t) => ({}),
  });

  builder.mutationFields((t) => ({
    addDeviceToken: t.field({
      type: AddDeviceTokenResponse,
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
          return { success: true };
        } catch (error) {
          logger.error('Error seving device token to DB', error);
          return { success: false };
        }
      },
    }),
  }));
}
