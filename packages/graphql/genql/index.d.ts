import {
  FieldsSelection,
  GraphqlOperation,
  ClientOptions,
  Observable,
} from '@genql/runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
export * from './schema'
import {
  QueryRequest,
  QueryPromiseChain,
  Query,
  MutationRequest,
  MutationPromiseChain,
  Mutation,
} from './schema'
export declare const createClient: (options?: ClientOptions) => Client
export declare const everything: { __scalar: boolean }
export declare const version: string

export interface Client {
  wsClient?: SubscriptionClient

  query<R extends QueryRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Query, R>>

  mutation<R extends MutationRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Mutation, R>>

  chain: {
    query: QueryPromiseChain

    mutation: MutationPromiseChain
  }
}

export type QueryResult<fields extends QueryRequest> = FieldsSelection<
  Query,
  fields
>

export declare const generateQueryOp: (
  fields: QueryRequest & { __name?: string },
) => GraphqlOperation
export type MutationResult<fields extends MutationRequest> = FieldsSelection<
  Mutation,
  fields
>

export declare const generateMutationOp: (
  fields: MutationRequest & { __name?: string },
) => GraphqlOperation

export declare const enumApnsConfigPushType: {
  readonly alert: 'alert'
  readonly background: 'background'
  readonly complication: 'complication'
  readonly fileprovider: 'fileprovider'
  readonly liveactivity: 'liveactivity'
  readonly location: 'location'
  readonly mdm: 'mdm'
  readonly voip: 'voip'
}

export declare const enumApsInterruptionLevel: {
  readonly active: 'active'
  readonly critical: 'critical'
  readonly passive: 'passive'
  readonly timeSensitive: 'timeSensitive'
}

export declare const enumApsSound: {
  readonly default: 'default'
}
