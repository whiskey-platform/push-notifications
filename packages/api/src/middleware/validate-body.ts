import { MiddlewareObj } from '@middy/core';
import { Decoder } from '@push-notifications/defs';
import { APIGatewayJSONBodyEvent } from 'src/utils/lambda-utils';

export function validateBody<S>(decoder: Decoder<S>): MiddlewareObj<APIGatewayJSONBodyEvent<S>> {
  return {
    before: async request => {
      try {
        decoder.decode(request.event.body);
      } catch (err) {
        const error = err as Error;
        throw {
          message: 'Validation error',
          status: 400,
          cause: error.message,
        };
      }
    },
  };
}
