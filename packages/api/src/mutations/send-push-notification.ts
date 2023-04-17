import { SNSService } from '@push-notifications/core/services';
import { SendNotificationSNSMessage } from '@push-notifications/core/model';
import { builder } from 'src/graphql/builder';
import { Topic } from 'sst/node/topic';
import Container from 'typedi';

// sends a notification to the SNS topic for push notifications.

const SendPushNotificationInput = builder.inputRef<SendNotificationSNSMessage>(
  'SendPushNotificationInput'
);
interface ISendPushNotificationResponse {
  success: boolean;
  message?: string;
}
const SendPushNotificationResponse = builder.objectRef<
  ISendPushNotificationResponse
>('SendPushNotificationResponse');

const sns = Container.get(SNSService);

export function addSendPushNotificationMutation() {
  builder.mutationType({
    fields: (t) => ({
      sendPushNotification: t.field({
        type: SendPushNotificationResponse,
        args: {
          input: t.arg({ type: SendPushNotificationInput, required: true }),
        },
        resolve: async (root, args, context) => {
          try {
            await sns.publishEvent(
              args.input,
              Topic.NotificationsTopic.topicArn
            );
            return {
              success: true,
              message: 'Notification successfully sent to Topic for processing',
            };
          } catch {
            return { success: false };
          }
        },
      }),
    }),
  });
}
