import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import { DeviceToken as DeviceToken_DB, db } from '@push-notifications/core/db';
import { logger } from '@push-notifications/core/utils';
import { addAddDeviceTokenMutation } from 'src/mutations/add-device-token';

export const builder = new SchemaBuilder<{
  AuthScopes: {
    isLoggedIn: boolean;
  };
  Context: {
    isLoggedIn: boolean;
    userId?: number;
  };
}>({
  plugins: [ScopeAuthPlugin],
  authScopes: async (context) => ({
    isLoggedIn: context.isLoggedIn,
  }),
});

addAddDeviceTokenMutation();
