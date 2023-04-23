/* eslint-disable */
import {
  PostNotificationsRequestBody,
  PostDeviceTokensRequestBody,
  NotificationBody,
  APNSConfig,
  ErrorSchema,
} from "./models";

export const schemaDefinitions = {
  PostNotificationsRequestBody: info<PostNotificationsRequestBody>(
    "PostNotificationsRequestBody",
    "#/definitions/PostNotificationsRequestBody"
  ),
  PostDeviceTokensRequestBody: info<PostDeviceTokensRequestBody>(
    "PostDeviceTokensRequestBody",
    "#/definitions/PostDeviceTokensRequestBody"
  ),
  NotificationBody: info<NotificationBody>(
    "NotificationBody",
    "#/definitions/NotificationBody"
  ),
  APNSConfig: info<APNSConfig>("APNSConfig", "#/definitions/APNSConfig"),
  ErrorSchema: info<ErrorSchema>("ErrorSchema", "#/definitions/ErrorSchema"),
};

export interface SchemaInfo<T> {
  definitionName: string;
  schemaRef: string;
}

function info<T>(definitionName: string, schemaRef: string): SchemaInfo<T> {
  return { definitionName, schemaRef };
}
