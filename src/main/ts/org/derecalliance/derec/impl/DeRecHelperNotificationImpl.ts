//define the structure of the notification
//creates notification to track any changes from sharer
//inputs for paramters are capturing changes made by the sharer
//helper is notified about changes

import { HelperNotificationType } from './HelperNotiicationType';
import { DeRecIdentity } from './DeRecIdentity';
import { SecretId } from './DeRecSecret';
import { DeRecHelperNotification } from './DeRecHelperNotification';


//get event details that notify the system/helper of changes made by sharer
export class DeRecHelperNotificationImpl implements DeRecHelperNotification {
    private type: HelperNotificationType;
    private sharerId: DeRecIdentity;
    private secretId: SecretId | null;
    private version: number;

    constructor(type: HelperNotificationType, sharerId: DeRecIdentity, secretId: SecretId | null = null, version: number = -1) {
        this.type = type;
        this.sharerId = sharerId;
        this.secretId = secretId;
        this.version = version;
    }

    getType(): HelperNotificationType {
        return this.type;
    }

    getSharerId(): DeRecIdentity {
        return this.sharerId;
    }

    getSecretId(): SecretId | null {
        return this.secretId;
    }

    getVersion(): number {
        return this.version;
    }
}