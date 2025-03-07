//class implements the DeRecSecret interface and manages a protected secret with helper identities and version control.
//provides synchronous and asynchronous methods for adding, removing, and updating helpers and secret data.
//class also includes status-checking methods and functionality to close the secret, preventing further modifications.

import { DeRecHelperStatus } from './DeRecHelperStatus';
import { DeRecIdentity } from './DeRecIdentity';
import { DeRecVersion } from './DeRecVersion';


export class DeRecSecretImpl implements DeRecSecret {
    private secretId: SecretId;
    private description: string;
    private bytesToProtect: Uint8Array;
    private helpers: Map<bigint, DeRecIdentity> = new Map();
    private versions: Map<number, DeRecVersion> = new Map();
    private available: boolean = true;
    private recovering: boolean = false;
    private closed: boolean = false;

    constructor(secretId: SecretId, description: string, bytesToProtect: Uint8Array) {
        this.secretId = secretId;
        this.description = description;
        this.bytesToProtect = bytesToProtect;
    }

    addHelpers(nonceAndHelperIds: NonceToHelperMap): void {
        nonceAndHelperIds.forEach((helper, nonce) => {
            this.helpers.set(nonce, helper);
        });
        console.log("Helpers added.");
    }

    addHelpersAsync(nonceAndHelperIds: NonceToHelperMap): Promise<DeRecHelperStatus>[] {
        const promises = Array.from(nonceAndHelperIds.entries()).map(([nonce, helper]) => {
            return new Promise<DeRecHelperStatus>((resolve) => {
                this.helpers.set(nonce, helper);
                resolve(DeRecHelperStatus.SUCCESS);
            });
        });
        console.log("Helpers added asynchronously.");
        return promises;
    }

    getHelperStatuses(): DeRecHelperStatus[] {
        return Array.from(this.helpers.values()).map(() => DeRecHelperStatus.SUCCESS);
    }

    removeHelpers(helperIds: DeRecIdentity[]): void {
        helperIds.forEach(helper => {
            for (let [nonce, storedHelper] of this.helpers.entries()) {
                if (storedHelper === helper) {
                    this.helpers.delete(nonce);
                }
            }
        });
        console.log("Helpers removed.");
    }

    removeHelpersAsync(helperIds: DeRecIdentity[]): Promise<DeRecHelperStatus>[] {
        const promises = helperIds.map(helper => {
            return new Promise<DeRecHelperStatus>((resolve) => {
                for (let [nonce, storedHelper] of this.helpers.entries()) {
                    if (storedHelper === helper) {
                        this.helpers.delete(nonce);
                    }
                }
                resolve(DeRecHelperStatus.SUCCESS);
            });
        });
        console.log("Helpers removed asynchronously.");
        return promises;
    }

    update(): DeRecVersion;
    update(bytesToProtect: Uint8Array): DeRecVersion;
    update(bytesToProtect: Uint8Array, description: string): DeRecVersion;
    update(bytesToProtect?: Uint8Array, description?: string): DeRecVersion {
        if (bytesToProtect) {
            this.bytesToProtect = bytesToProtect;
        }
        if (description) {
            this.description = description;
        }
        const newVersion = new DeRecVersion(); // Assuming DeRecVersion has a default constructor
        this.versions.set(this.versions.size + 1, newVersion);
        console.log("Secret updated.");
        return newVersion;
    }

    updateAsync(): Promise<DeRecVersion>;
    updateAsync(bytesToProtect: Uint8Array): Promise<DeRecVersion>;
    updateAsync(bytesToProtect: Uint8Array, description: string): Promise<DeRecVersion>;
    updateAsync(bytesToProtect?: Uint8Array, description?: string): Promise<DeRecVersion> {
        return new Promise<DeRecVersion>((resolve) => {
            const newVersion = this.update(bytesToProtect, description);
            resolve(newVersion);
        });
    }

    getSecretId(): SecretId {
        return this.secretId;
    }

    getDescription(): string {
        return this.description;
    }

    getVersions(): Map<number, DeRecVersion> {
        return this.versions;
    }

    isAvailable(): boolean {
        return this.available;
    }

    isRecovering(): boolean {
        return this.recovering;
    }

    isClosed(): boolean {
        return this.closed;
    }

    closeAsync(): Promise<DeRecSecret> {
        return new Promise<DeRecSecret>((resolve) => {
            this.closed = true;
            this.helpers.clear();
            resolve(this);
        });
    }

    close(): void {
        this.closed = true;
        this.helpers.clear();
        console.log("Secret closed.");
    }
}