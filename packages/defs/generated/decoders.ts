/* eslint-disable */

import Ajv from "ajv";

import { Decoder } from "./helpers";
import { validateJson } from "./validate";
import {
  PostNotificationsRequestBody,
  PostDeviceTokensRequestBody,
  NotificationBody,
  APNSConfig,
  ErrorSchema,
} from "./models";
import jsonSchema from "./schema.json";

const ajv = new Ajv({ strict: false });
ajv.compile(jsonSchema);

// Decoders
export const PostNotificationsRequestBodyDecoder: Decoder<PostNotificationsRequestBody> =
  {
    definitionName: "PostNotificationsRequestBody",
    schemaRef: "#/definitions/PostNotificationsRequestBody",

    decode(json: unknown): PostNotificationsRequestBody {
      const schema = ajv.getSchema(
        PostNotificationsRequestBodyDecoder.schemaRef
      );
      if (!schema) {
        throw new Error(
          `Schema ${PostNotificationsRequestBodyDecoder.definitionName} not found`
        );
      }
      return validateJson(
        json,
        schema,
        PostNotificationsRequestBodyDecoder.definitionName
      );
    },
  };
export const PostDeviceTokensRequestBodyDecoder: Decoder<PostDeviceTokensRequestBody> =
  {
    definitionName: "PostDeviceTokensRequestBody",
    schemaRef: "#/definitions/PostDeviceTokensRequestBody",

    decode(json: unknown): PostDeviceTokensRequestBody {
      const schema = ajv.getSchema(
        PostDeviceTokensRequestBodyDecoder.schemaRef
      );
      if (!schema) {
        throw new Error(
          `Schema ${PostDeviceTokensRequestBodyDecoder.definitionName} not found`
        );
      }
      return validateJson(
        json,
        schema,
        PostDeviceTokensRequestBodyDecoder.definitionName
      );
    },
  };
export const NotificationBodyDecoder: Decoder<NotificationBody> = {
  definitionName: "NotificationBody",
  schemaRef: "#/definitions/NotificationBody",

  decode(json: unknown): NotificationBody {
    const schema = ajv.getSchema(NotificationBodyDecoder.schemaRef);
    if (!schema) {
      throw new Error(
        `Schema ${NotificationBodyDecoder.definitionName} not found`
      );
    }
    return validateJson(json, schema, NotificationBodyDecoder.definitionName);
  },
};
export const APNSConfigDecoder: Decoder<APNSConfig> = {
  definitionName: "APNSConfig",
  schemaRef: "#/definitions/APNSConfig",

  decode(json: unknown): APNSConfig {
    const schema = ajv.getSchema(APNSConfigDecoder.schemaRef);
    if (!schema) {
      throw new Error(`Schema ${APNSConfigDecoder.definitionName} not found`);
    }
    return validateJson(json, schema, APNSConfigDecoder.definitionName);
  },
};
export const ErrorSchemaDecoder: Decoder<ErrorSchema> = {
  definitionName: "ErrorSchema",
  schemaRef: "#/definitions/ErrorSchema",

  decode(json: unknown): ErrorSchema {
    const schema = ajv.getSchema(ErrorSchemaDecoder.schemaRef);
    if (!schema) {
      throw new Error(`Schema ${ErrorSchemaDecoder.definitionName} not found`);
    }
    return validateJson(json, schema, ErrorSchemaDecoder.definitionName);
  },
};
