//represent specific version of a secret
//track which helpers are protecting this version
//ensure secure storage and retrieval of secret

export class DeRecVersion {
    private secret: DeRecSecret;
    private versionNumber: number;
    private protectedValue: Uint8Array;
    private protectingHelpers: DeRecHelperStatus[];

    constructor(
        secret: DeRecSecret,
        versionNumber: number,
        protectedValue: Uint8Array,
        protectingHelpers: DeRecHelperStatus[] = []
    ) {
        this.secret = secret;
        this.versionNumber = versionNumber;
        this.protectedValue = protectedValue;
        this.protectingHelpers = protectingHelpers;
    }

    getSecret(): DeRecSecret {
        return this.secret;
    }

    getVersionNumber(): number {
        return this.versionNumber;
    }

    getProtectedValue(): Uint8Array {
        return this.protectedValue;
    }

    //version is protected even if its only one helper
    isProtected(): boolean {
        return this.protectingHelpers.length > 0;
    }

    getProtectingHelpers(): DeRecHelperStatus[] {
        return this.protectingHelpers;
    }

