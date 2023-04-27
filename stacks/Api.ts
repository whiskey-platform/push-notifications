import { use, StackContext, Api as ApiGateway } from 'sst/constructs';
import { Secrets } from './Secrets';
import { TopicStack } from './Topic';
import { DomainName } from '@aws-cdk/aws-apigatewayv2-alpha';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

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
          path: 'push-notifications',
          cdk: {
            domainName: DomainName.fromDomainNameAttributes(stack, 'ApiDomain', {
              name: StringParameter.valueFromLookup(
                stack,
                `/sst-outputs/${app.stage}-api-infra-Infra/domainName`
              ),
              regionalDomainName: StringParameter.valueFromLookup(
                stack,
                `/sst-outputs/${app.stage}-api-infra-Infra/regionalDomainName`
              ),
              regionalHostedZoneId: StringParameter.valueFromLookup(
                stack,
                `/sst-outputs/${app.stage}-api-infra-Infra/regionalHostedZoneId`
              ),
            }),
          },
        }
      : undefined,
  });

  return api;
}
