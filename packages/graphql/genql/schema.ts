import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    Int: number,
    Boolean: boolean,
}

export type APNSConfigPushType = 'alert' | 'background' | 'complication' | 'fileprovider' | 'liveactivity' | 'location' | 'mdm' | 'voip'

export type APSInterruptionLevel = 'active' | 'critical' | 'passive' | 'timeSensitive'

export type APSSound = 'default'

export interface Mutation {
    addDeviceToken: Scalars['Boolean']
    sendPushNotification: Scalars['Boolean']
    __typename: 'Mutation'
}

export interface Query {
    getDeviceTokens: Scalars['String'][]
    __typename: 'Query'
}

export interface APNSConfig {collapseId?: (Scalars['String'] | null),expiration: Scalars['Int'],notificationId?: (Scalars['String'] | null),priority: Scalars['Int'],pushType: APNSConfigPushType}

export interface APSAlert {body: Scalars['String'],launchImage?: (Scalars['String'] | null),subtitle: Scalars['String'],title: Scalars['String']}

export interface APSInfo {alert?: (APSAlert | null),badge?: (Scalars['Int'] | null),category?: (Scalars['String'] | null),contentAvailable?: (Scalars['Int'] | null),contentState?: (Scalars['String'] | null),events?: (Scalars['String'] | null),filterCriteria?: (Scalars['String'] | null),interruptionLevel?: (APSInterruptionLevel | null),mutableContent?: (Scalars['Int'] | null),relevanceScore?: (Scalars['Int'] | null),sound?: (APSSound | null),staleDate?: (Scalars['Int'] | null),targetContentId?: (Scalars['String'] | null),threadId?: (Scalars['String'] | null),timestamp?: (Scalars['Int'] | null)}

export interface AddDeviceTokenInput {token: Scalars['String']}

export interface MutationRequest{
    addDeviceToken?: [{input: AddDeviceTokenInput}]
    sendPushNotification?: [{input: SendPushNotificationInput}]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PushNotificationBody {aps?: (APSInfo | null)}

export interface QueryRequest{
    getDeviceTokens?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SendPushNotificationInput {body?: (PushNotificationBody | null),config?: (APNSConfig | null),userId?: (Scalars['Int'] | null)}


const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface MutationPromiseChain{
    addDeviceToken: ((args: {input: AddDeviceTokenInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    sendPushNotification: ((args: {input: SendPushNotificationInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface MutationObservableChain{
    addDeviceToken: ((args: {input: AddDeviceTokenInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    sendPushNotification: ((args: {input: SendPushNotificationInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface QueryPromiseChain{
    getDeviceTokens: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>})
}

export interface QueryObservableChain{
    getDeviceTokens: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>})
}