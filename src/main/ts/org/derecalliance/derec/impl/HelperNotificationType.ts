/*
 * Copyright (c) DeRec Alliance and its Contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//defines different types of notifications that can be sent and processed.  
//creates a notification class to store details like type, message, and timestamp.  
//implements a handler that manages, stores, and processes notifications based on their type.  

export enum HelperNotificationType {
    PAIR_INDICATION, //someone is trying to pair for a particular secret
    UNPAIR_INDICATION, //someone is unpairing for a particular secret
    UPDATE_INDICATION, //an update has been received for a secret
    VERIFY_INDICATION, //a verification request has been received for a secret
    LIST_SECRETS_INDICATION, //a request to list secrets has been received
    RECOVER_SECRET_INDICATION //a request to recover a secret has been received
}


//represents notification sent to a helper
export class HelperNotification {
    constructor(
        public type: HelperNotificationType,
        public message: string,
        public timestamp: Date = new Date()
    ) {}
}


//class that manages and processes notifications
export class NotificationHandler {
    private notifications: HelperNotification[] = []; //stores all notifications

    //method adds new notifications to the array
    addNotification(notification: HelperNotification): void {
        this.notifications.push(notification);
        this.processNotification(notification); //processes notification after array add
    }
    
    //method to process and check the notification type
    private processNotification(notification: HelperNotification): void {
        switch (notification.type) {
            case HelperNotificationType.PAIR_INDICATION:
                console.log("Processing pair indication:", notification.message);
                break;
            case HelperNotificationType.UNPAIR_INDICATION:
                console.log("Processing unpair indication:", notification.message);
                break;
            case HelperNotificationType.UPDATE_INDICATION:
                console.log("Processing update indication:", notification.message);
                break;
            case HelperNotificationType.VERIFY_INDICATION:
                console.log("Processing verify indication:", notification.message);
                break;
            case HelperNotificationType.LIST_SECRETS_INDICATION:
                console.log("Processing list secrets indication:", notification.message);
                break;
            case HelperNotificationType.RECOVER_SECRET_INDICATION:
                console.log("Processing recover secret indication:", notification.message);
                break;
            default:
                console.log("Unknown notification type:", notification.message);
        }
    }

    //method to return array of notifications
    getNotifications(): HelperNotification[] {
        return this.notifications;
    }
}