export interface DeRecSharer {
    newSecret(
        description: string,
        bytesToProtect: Uint8Array,
        helperIds: DeRecIdentity[],
        recovery: boolean
    ): DeRecSecret;

    newSecret(
        secretId: SecretId,
        description: string,
        bytesToProtect: Uint8Array,
        helperIds: DeRecIdentity[],
        recovery: boolean
    ): DeRecSecret;

    newSecret(
        description: string,
        bytesToProtect: Uint8Array,
        recovery: boolean
    ): DeRecSecret;

    newSecret(
        secretId: SecretId,
        description: string,
        bytesToProtect: Uint8Array,
        recovery: boolean
    ): DeRecSecret;

    getSecret(secretId: SecretId): DeRecSecret | null;

    getSecrets(): DeRecSecret[];

    getSecretIdsAsync(helper: DeRecIdentity): Promise<Map<SecurityPolicyViolationEventDisposition, number[]>>

    recoverSecret(
        secretId: SecretId,
        version: number,
        helpers: DeRecIdentity[]
    ): DeRecSecret;

    recoveryComplete(recoverySecretId: SecretId): void;

    setListener(listener: (notification: DeRecSharerNotification) => void): void;
}