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

//define the structure of the notification
//creates notification to track any changes from sharer
//inputs for paramters are capturing changes made by the sharer
//helper is notified about changes

import { HelperNotificationType } from './HelperNotificationType';
import { DeRecIdentity } from './DeRecIdentity';
import { SecretId } from './SecretId';

//get event details that notify the system/helper of changes made by sharer
export class DeRecHelperNotification {
    private type: HelperNotificationType;
    private sharerId: DeRecIdentity;
    private secretId: SecretId | null;
    private version: number;

    constructor(type: HelperNotificationType, sharerId: DeRecIdentity, secretId: SecretId | null = null, version: number = -1) {
        
        if (!type) {
            console.error("Invalid type: Cannot be undefined or null");
            throw new Error("Invalid type");
        }

        if (!sharerId || !(sharerId instanceof DeRecIdentity)) {
            console.error("Invalid sharerId: Must be a valid DeRecIdentity object");
            throw new Error("Invalid sharerId");
        }

        if (secretId === null) {
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