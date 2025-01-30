//define the structure of the notification
//creates notification to track any changes from sharer
//inputs for paramters are capturing changes made by the sharer
//helper is notified about changes

import { HelperNotificationType } from 'api-typescript/src/interfaces/HelperNotificationType';
import { DeRecIdentity } from 'api-typescript/src/interfaces/DeRecIdentity';
import { SecretId } from 'api-typescript/src/interfaces/DeRecSecret';
import { DeRecHelperNotification } from 'api-typescript/src/interfaces/DeRecHelperNotification';


//get event details that notify the system/helper of changes made by sharer
export class DeRecHelperNotificationImpl implements DeRecHelperNotification {
    private type: HelperNotificationType;
    private sharerId: DeRecIdentity;
    private secretId: SecretId | null;
    private version: number;

    constructor(type: HelperNotificationType, sharerId: DeRecIdentity, secretId: SecretId | null = null, version: number = -1) {
        
        if (!type) {
            console.error("Invalid type: Cannot be undefined or null");
            throw new Error("Invalid type");
        }

        if (!sharerId || typeof sharerId !== 'object') {
            console.error("Invalid sharerId: Must be a valid DeRecIdentity object");
            throw new Error("Invalid sharerId");
        }

        if (type === 'someSpecificType' && secretId === null) {
            console.error("secretId is required for this notification type");
            throw new Error("secretId is required");
        }

        if (version < 0) {
            console.warn("Version is negative, using default version -1");
        }
        
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
        if (this.secretId === null) {
            console.warn("Warning secretId is null");
        }
        return this.secretId;
    }

    getVersion(): number {
        return this.version;
    }
}