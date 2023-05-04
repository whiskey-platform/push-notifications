import { Config, StackContext, Topic, use } from 'sst/constructs';
import { Secrets } from './Secrets';
import { TableStack } from './Table';
import { Tags } from 'aws-cdk-lib';

export const TopicStack = ({ stack, app }: StackContext) => {
  const { IOS_APP_ID, DB_HOST, DB_USERNAME, DB_PASSWORD, APPLE_TEAM_ID, PUSH_KEY, PUSH_KEY_ID } =
    use(Secrets);
  const table = use(TableStack);
  const APNS_BASE_URL = new Config.Parameter(stack, 'APNS_BASE_URL', {
    value:
      /*
      app.stage === 'prod'
        ? 'https://api.push.apple.com'
        : */ 'https://api.sandbox.push.apple.com',
  });
  const topic = new Topic(stack, 'NotificationsTopic', {
    subscribers: {
      notificationSender: 'packages/functions/src/notification-sender.handler',
    },
    defaults: {
      function: {
        timeout: '1 minute',
      },
    },
  });
  topic.bind([
    APNS_BASE_URL,
    IOS_APP_ID,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    APPLE_TEAM_ID,
    PUSH_KEY,
    PUSH_KEY_ID,
    table,
  ]);

  stack.getAllFunctions().forEach(fn => Tags.of(fn).add('lumigo:auto-trace', 'true'));

  return topic;
};
