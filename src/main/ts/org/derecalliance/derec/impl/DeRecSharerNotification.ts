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

//create class that holds necessary properties for sharer's notification
//methods return specific notification details

import { DeRecVersion } from './DeRecVersion';
import { DeRecHelperStatus } from './DeRecHelperStatus';
import { DeRecSecret } from './DeRecSecret';
import { SharerNotificationSeverity, SharerNotificationType } from './/SharerNotificationType';

export class DeRecSharerNotification {
    private notificationType: SharerNotificationType;
    private notificationMessage: string;
    private notificationVersion: DeRecVersion | null;
    private helperStatus: DeRecHelperStatus | null;
    private secretId: DeRecSecret;
    private severity: SharerNotificationSeverity;

    constructor(
        notificationType: SharerNotificationType,
        notificationMessage: string,
        notificationVersion: DeRecVersion | null,
        helperStatus: DeRecHelperStatus | null,
        secretId: DeRecSecret,
        severity: SharerNotificationSeverity
    ) {
        this.notificationType = notificationType;
        this.notificationMessage = notificationMessage;
        this.notificationVersion = notificationVersion;
        this.helperStatus = helperStatus;
        this.secretId = secretId;
        this.severity = severity;
    }

    getType(): SharerNotificationType {
        return this.notificationType;
    }

    getMessage(): string {
        return this.notificationMessage;
    }

    getVersion(): DeRecVersion | null {
        return this.notificationVersion;
    }

    getHelper(): DeRecHelperStatus | null {
        return this.helperStatus;
    }

    getSecret(): DeRecSecret {
        return this.secretId;
    }

    getSeverity(): SharerNotificationSeverity {
        return this.severity;
    }
}
