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

import { DeRecSecret } from './DeRecSecret.js';
import { SecretId } from './SecretId.js';
import { DeRecIdentity } from './DeRecIdentity.js';
import { DeRecSharerNotification } from './DeRecSharerNotification.js';

/**
 * Options for creating a new secret
 */
interface NewSecretOptions {
    description: string;
    bytesToProtect: Uint8Array;
    helperIds?: DeRecIdentity[];
    recovery: boolean;
    secretId?: SecretId;
}

/**
 * A factory for and container of Secrets in this API
 * 
 * Note: this interface is currently the subject of debate, especially regarding
 * the presence of the parameter "recovery" on each of the {@code newSecret} methods
 */
export class DeRecSharer {
    private secrets: Map<string, DeRecSecret> = new Map();
    private listener: (notification: DeRecSharerNotification) => void = () => {};

    // Create a new secret with an auto-generated SecretId
    newSecretFromDescription(
        description: string,
        bytesToProtect: Uint8Array,
        helperIds?: DeRecIdentity[],
        recovery = false
    ): DeRecSecret {
        const secretId = this.generateSecretId();
        const secret = new DeRecSecret(secretId, description, bytesToProtect);
        this.secrets.set(secretId.toString(), secret);

        // Handle helperIds if provided
        if (helperIds && helperIds.length > 0) {
            // Additional logic for handling helpers could go here
        }

        return secret;
    }

    // Create a new secret with a provided SecretId
    newSecretFromSecretId(
        secretId: SecretId,
        description: string,
        bytesToProtect: Uint8Array,
        helperIds?: DeRecIdentity[],
        recovery = false
    ): DeRecSecret {
        const secret = new DeRecSecret(secretId, description, bytesToProtect);
        this.secrets.set(secretId.toString(), secret);

        // Handle helperIds if provided
        if (helperIds && helperIds.length > 0) {
            // Additional logic for handling helpers could go here
        }

        return secret;
    }

    getSecret(secretId: SecretId): DeRecSecret | null {
        return this.secrets.get(secretId.toString()) || null;
    }

    getSecrets(): DeRecSecret[] {
        return Array.from(this.secrets.values());
    }

    async getSecretIdsAsync(helper: DeRecIdentity): Promise<Map<SecretId, number[]>> {
        return new Map();
    }

    recoverSecret(secretId: SecretId, version: number, helpers: DeRecIdentity[]): DeRecSecret {
        return new DeRecSecret(secretId, "Recovered Secret", new Uint8Array());
    }

    recoveryComplete(recoverySecretId: SecretId): void {
        // Mark recovery as complete
    }

    setListener(listener: (notification: DeRecSharerNotification) => void): void {
        this.listener = listener;
    }

    private generateSecretId(): SecretId {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        return new SecretId(bytes);
    }
}
