import { StackContext, Topic } from 'sst/constructs';

export const TopicStack = ({ stack }: StackContext) => {
  const topic = new Topic(stack, 'PushNotificationsTopic', {
    cdk: {
      topic: {},
    },
  });
};
