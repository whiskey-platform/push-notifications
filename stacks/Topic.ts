import { Config, StackContext, Topic, use } from 'sst/constructs';
import { Secrets } from './Secrets';

export const TopicStack = ({ stack, app }: StackContext) => {
  const {
    IOS_APP_ID,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    APPLE_TEAM_ID,
    PUSH_KEY,
    PUSH_KEY_ID,
  } = use(Secrets);
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
  ]);

  stack.addOutputs({
    TopicArn: topic.topicArn,
  });

  return topic;
};
