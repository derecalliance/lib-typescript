//impl to track and report sharer status
//checks if sharer is in recovery mode

export class DeRecSharerStatus {
    private sharerId: DeRecIdentity;
    private recoveryMode: boolean;

    constructor(sharerId: DeRecIdentity, recoveryMode: boolean = false) {
        this.sharerId = sharerId;
        this.recoveryMode = recoveryMode;
    }

    //implement methods
    getId(): DeRecIdentity {
        return this.sharerId;
    }

    isRecovering(): boolean {
        return this.recoveryMode;
    }

    setRecoveryMode(isRecovering: boolean): void {
        this.recoveryMode = isRecovering;
    }
}
