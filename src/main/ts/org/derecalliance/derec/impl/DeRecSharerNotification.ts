//create class that holds necessary properties for sharer's notification
//methods return specific notification details

import { DeRecVersion } from './DeRecVersion';
import { DeRecHelperStatus } from './DeRecHelperStatus';
import { DeRecSecret } from './DeRecSecret';
import { SharerNotificationSeverity, SharerNotificationType } from './/SharerNotificationType';

export class DeRecSharerNotificationImpl implements DeRecSharerNotification {
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
