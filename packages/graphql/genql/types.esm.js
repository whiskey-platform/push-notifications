export default {
    "scalars": [
        1,
        2,
        3,
        6,
        7,
        10
    ],
    "types": {
        "APNSConfig": {
            "collapseId": [
                1
            ],
            "expiration": [
                2
            ],
            "notificationId": [
                1
            ],
            "priority": [
                2
            ],
            "pushType": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "Int": {},
        "APNSConfigPushType": {},
        "APSAlert": {
            "body": [
                1
            ],
            "launchImage": [
                1
            ],
            "subtitle": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "APSInfo": {
            "alert": [
                4
            ],
            "badge": [
                2
            ],
            "category": [
                1
            ],
            "contentAvailable": [
                2
            ],
            "contentState": [
                1
            ],
            "events": [
                1
            ],
            "filterCriteria": [
                1
            ],
            "interruptionLevel": [
                6
            ],
            "mutableContent": [
                2
            ],
            "relevanceScore": [
                2
            ],
            "sound": [
                7
            ],
            "staleDate": [
                2
            ],
            "targetContentId": [
                1
            ],
            "threadId": [
                1
            ],
            "timestamp": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "APSInterruptionLevel": {},
        "APSSound": {},
        "AddDeviceTokenInput": {
            "token": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "addDeviceToken": [
                10,
                {
                    "input": [
                        8,
                        "AddDeviceTokenInput!"
                    ]
                }
            ],
            "sendPushNotification": [
                10,
                {
                    "input": [
                        13,
                        "SendPushNotificationInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "PushNotificationBody": {
            "aps": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "getDeviceTokens": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendPushNotificationInput": {
            "body": [
                11
            ],
            "config": [
                0
            ],
            "userId": [
                2
            ],
            "__typename": [
                1
            ]
        }
    }
}