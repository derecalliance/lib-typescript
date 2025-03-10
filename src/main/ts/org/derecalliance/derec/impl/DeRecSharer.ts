import { DeRecSecret, SecretId } from './DeRecSecret';
import { DeRecIdentity } from './DeRecIdentity';
import { DeRecSharerNotification } from './DeRecSharerNotification';

/**
 * A factory for and container of Secrets in this API
 * 
 * Note: this interface is currently the subject of debate, especially regarding
 * the presence of the parameter "recovery" on each of the {@code newSecret} methods
 */
export class DeRecSharer {
    private secrets: Map<string, DeRecSecret> = new Map();
    private listener: (notification: DeRecSharerNotification) => void = () => {};

    // Method signatures (overloads)
    newSecret(description: string, bytesToProtect: Uint8Array, helperIds: DeRecIdentity[], recovery: boolean): DeRecSecret;
    newSecret(secretId: SecretId, description: string, bytesToProtect: Uint8Array, helperIds: DeRecIdentity[], recovery: boolean): DeRecSecret;
    newSecret(description: string, bytesToProtect: Uint8Array, recovery: boolean): DeRecSecret;
    newSecret(secretId: SecretId, description: string, bytesToProtect: Uint8Array, recovery: boolean): DeRecSecret;

    // Single method implementation
    newSecret(
        secretIdOrDescription: string | SecretId, 
        description?: string, 
        bytesToProtect?: Uint8Array, 
        helperIds?: DeRecIdentity[], 
        recovery?: boolean
    ): DeRecSecret {
        if (typeof secretIdOrDescription === "string") {
            // Case 1: newSecret(description, bytesToProtect, helperIds, recovery)
            if (description && bytesToProtect && helperIds && recovery !== undefined) {
                const secretId = this.generateSecretId();
                const secret = new DeRecSecret(secretId, secretIdOrDescription, bytesToProtect);
                this.secrets.set(secretId.toString(), secret);
                return secret;
            }
            // Case 2: newSecret(description, bytesToProtect, recovery)
            if (description && bytesToProtect && recovery !== undefined) {
                const secretId = this.generateSecretId();
                const secret = new DeRecSecret(secretId, secretIdOrDescription, bytesToProtect);
                this.secrets.set(secretId.toString(), secret);
                return secret;
            }
        } else {
            // Case 3: newSecret(secretId, description, bytesToProtect, helperIds, recovery)
            if (description && bytesToProtect && helperIds && recovery !== undefined) {
                const secret = new DeRecSecret(secretIdOrDescription, description, bytesToProtect);
                this.secrets.set(secretIdOrDescription.toString(), secret);
                return secret;
            }
            // Case 4: newSecret(secretId, description, bytesToProtect, recovery)
            if (description && bytesToProtect && recovery !== undefined) {
                const secret = new DeRecSecret(secretIdOrDescription, description, bytesToProtect);
                this.secrets.set(secretIdOrDescription.toString(), secret);
                return secret;
            }
        }
    
        throw new Error("Invalid parameters for newSecret");
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
