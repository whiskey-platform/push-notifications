import { SSTConfig } from 'sst';
import { Api } from './stacks/Api';
import { Secrets } from './stacks/Secrets';
import { TopicStack } from './stacks/Topic';
import { TableStack } from './stacks/Table';

export default {
  config(_input) {
    return {
      name: 'push-notifications',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      nodejs: {
        esbuild: {
          external: !app.local ? ['@aws-sdk/*', '@aws-lambda-powertools/*'] : undefined,
        },
      },
      environment: {
        POWERTOOLS_SERVICE_NAME: 'whiskey_push_notifications_service',
      },
    });
    app.stack(Secrets).stack(TableStack).stack(TopicStack).stack(Api);
  },
} satisfies SSTConfig;
