import { use, StackContext, Api as ApiGateway } from 'sst/constructs';
import { Secrets } from './Secrets';
import { TopicStack } from './Topic';

export function Api({ stack }: StackContext) {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, AUTH_BASE_URL } = use(
    Secrets
  );
  const topic = use(TopicStack);
  const api = new ApiGateway(stack, 'api', {
    defaults: {
      function: {
        bind: [
          DB_HOST,
          DB_NAME,
          DB_PASSWORD,
          DB_USERNAME,
          AUTH_BASE_URL,
          topic,
        ],
      },
    },
    routes: {
      'POST /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/api/src/graphql/graphql.handler',
        },
        pothos: {
          schema: 'packages/api/src/graphql/schema.ts',
          output: 'packages/graphql/schema.graphql',
          commands: [
            'cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm',
          ],
        },
      },
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
