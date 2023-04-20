import { SNSService } from '@push-notifications/core/services';
import Container from 'typedi';
import { builder } from '../builder';
import { SendNotificationSNSMessage } from '@push-notifications/core/model';
import { Topic } from 'sst/node/topic';
import { camelToSnakeCase } from '@push-notifications/core/utils';
import { eventNames } from 'process';

const sns = Container.get(SNSService);

const SendPushNotificationInput = builder.inputType(
  'SendPushNotificationInput',
  {
    fields: (t) => ({
      body: t.field({
        type: builder.inputType('PushNotificationBody', {
          fields: (t) => ({
            aps: t.field({
              type: builder.inputType('APSInfo', {
                fields: (t) => ({
                  alert: t.field({
                    type: builder.inputType('APSAlert', {
                      fields: (t) => ({
                        title: t.string({ required: true }),
                        subtitle: t.string({ required: true }),
                        body: t.string({ required: true }),
                        launchImage: t.string(),
                      }),
                    }),
                  }),
                  badge: t.int(),
                  sound: t.field({
                    type: builder.enumType('APSSound', {
                      values: ['default'] as const,
                    }),
                  }),
                  threadId: t.string(),
                  category: t.string(),
                  contentAvailable: t.int(),
                  mutableContent: t.int(),
                  targetContentId: t.string(),
                  interruptionLevel: t.field({
                    type: builder.enumType('APSInterruptionLevel', {
                      values: [
                        'passive',
                        'active',
                        'timeSensitive',
                        'critical',
                      ] as const,
                    }),
                  }),
                  relevanceScore: t.int(),
                  filterCriteria: t.string(),
                  // Live Activities
                  staleDate: t.int(),
                  contentState: t.string(),
                  timestamp: t.int(),
                  events: t.string(),
                }),
              }),
            }),
          }),
        }),
      }),
      config: t.field({
        type: builder.inputType('APNSConfig', {
          fields: (t) => ({
            pushType: t.field({
              type: builder.enumType('APNSConfigPushType', {
                values: [
                  'alert',
                  'background',
                  'location',
                  'voip',
                  'complication',
                  'fileprovider',
                  'mdm',
                  'liveactivity',
                ] as const,
              }),
              required: true,
              defaultValue: 'alert',
            }),
            notificationId: t.string(),
            expiration: t.int({ required: true, defaultValue: 0 }),
            priority: t.int({ required: true, defaultValue: 10 }),
            collapseId: t.string(),
          }),
        }),
      }),
      userId: t.int(),
    }),
  }
);

builder.mutationFields((t) => ({
  sendPushNotification: t.boolean({
    args: {
      input: t.arg({ type: SendPushNotificationInput, required: true }),
    },
    resolve: async (root, args, context) => {
      try {
        const event: Record<string, any> = args.input;
        for (const key in event.body?.aps) {
          event.body.aps[camelToSnakeCase(key)] = event.body.aps[key];
          delete event.body.aps[key];
        }
        await sns.publishEvent(event, Topic.NotificationsTopic.topicArn);
        return true;
      } catch {
        return false;
      }
    },
  }),
}));
