import { DeRecSecret, SecretId } from './DeRecSecret';
import { DeRecIdentity } from './DeRecIdentity';
import { DeRecSharerNotification } from './DeRecSharerNotification';
import { DeRecSecretImpl } from './DeRecSecretImpl';

/**
 * A factory for and container of Secrets in this API
 * 
 * Note: this interface is currently the subject of debate, especially regarding
 * the presence of the parameter "recovery" on each of the {@code newSecret} methods
 */
export class DeRecSharerImpl implements DeRecSharer {
    private secrets: Map<string, DeRecSecret> = new Map();
    private listener: (notification: DeRecSharerNotification) => void = () => {};

    newSecret(description: string, bytesToProtect: Uint8Array, helperIds: DeRecIdentity[], recovery: boolean): DeRecSecret {
        const secretId = this.generateSecretId();
        const secret = new DeRecSecretImpl(secretId, description, bytesToProtect);
        this.secrets.set(secretId.toString(), secret);
        // Handle pairing with helpers and recovery mode if needed
        return secret;
    }

    newSecret(secretId: SecretId, description: string, bytesToProtect: Uint8Array, helperIds: DeRecIdentity[], recovery: boolean): DeRecSecret {
        const secret = new DeRecSecretImpl(secretId, description, bytesToProtect);
        this.secrets.set(secretId.toString(), secret);
        // Handle pairing with helpers and recovery mode if needed
        return secret;
    }

    newSecret(description: string, bytesToProtect: Uint8Array, recovery: boolean): DeRecSecret {
        const secretId = this.generateSecretId();
        const secret = new DeRecSecretImpl(secretId, description, bytesToProtect);
        this.secrets.set(secretId.toString(), secret);
        // Handle recovery mode if needed
        return secret;
    }

    newSecret(secretId: SecretId, description: string, bytesToProtect: Uint8Array, recovery: boolean): DeRecSecret {
        const secret = new DeRecSecretImpl(secretId, description, bytesToProtect);
        this.secrets.set(secretId.toString(), secret);
        // Handle recovery mode if needed
        return secret;
    }

    getSecret(secretId: SecretId): DeRecSecret | null {
        return this.secrets.get(secretId.toString()) || null;
    }

    getSecrets(): DeRecSecret[] {
        return Array.from(this.secrets.values());
    }

    async getSecretIdsAsync(helper: DeRecIdentity): Promise<Map<SecretId, number[]>> {
        // Implementation for fetching secret IDs from a helper
        return new Map();
    }

    recoverSecret(secretId: SecretId, version: number, helpers: DeRecIdentity[]): DeRecSecret {
        // Implementation for recovering a secret
        return new DeRecSecretImpl(secretId, "Recovered Secret", new Uint8Array());
    }

    recoveryComplete(recoverySecretId: SecretId): void {
        // Implementation for marking recovery as complete
    }

    setListener(listener: (notification: DeRecSharerNotification) => void): void {
        this.listener = listener;
    }

    private generateSecretId(): SecretId {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        return new SecretIdImpl(bytes);
    }
}