import { use, StackContext, Api as ApiGateway } from 'sst/constructs';
import { Secrets } from './Secrets';
import { TopicStack } from './Topic';

export function Api({ stack, app }: StackContext) {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, AUTH_BASE_URL } = use(Secrets);
  const topic = use(TopicStack);
  const api = new ApiGateway(stack, 'api', {
    defaults: {
      function: {
        bind: [DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, AUTH_BASE_URL, topic],
      },
    },
    routes: {
      'POST /device-tokens': 'packages/api/src/functions/add-device-token.handler',
      'POST /notifications': 'packages/api/src/functions/send-push-notification.handler',
    },
    customDomain: !app.local
      ? {
          domainName: `api${app.stage !== 'prod' ? `.${app.stage}` : ''}.whiskey.mattwyskiel.com`,
          hostedZone: 'mattwyskiel.com',
          path: 'push-notifications',
        }
      : undefined,
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
