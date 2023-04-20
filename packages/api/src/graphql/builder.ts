import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import { DeviceToken as DeviceToken_DB, db } from '@push-notifications/core/db';
import { logger } from '@push-notifications/core/utils';
import { addAddDeviceTokenMutation } from 'src/mutations/add-device-token';
import { addSendPushNotificationMutation } from 'src/mutations/send-push-notification';

export type SchemaBase = {
  AuthScopes: {
    isLoggedIn: boolean;
  };
  Context: {
    isLoggedIn: boolean;
    userId?: number;
  };
};

export const builder = new SchemaBuilder<SchemaBase>({
  plugins: [ScopeAuthPlugin],
  authScopes: async (context) => ({
    isLoggedIn: context.isLoggedIn,
  }),
});
builder.mutationType({ fields: (t) => ({}) });
builder.queryType({ fields: (t) => ({}) });
