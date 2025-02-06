//define class that gets identity and pairing status of helper
//indentity and pairing status identity stored as object
//return status of connection to helper

//get indentity of helper
export class DeRecHelperStatus {
    private id: DeRecIdentity;
    private lastVerificationTime: Date;

    constructor(id: DeRecIdentity, lastVerificationTime: Date) {
        if (!id) {
            console.error("Error: Invalid DeRecIdentity: id cannot be null or undefined");
            throw new Error("Invalid DeRecIdentity: id cannot be null or undefined");
        }
        if (!(lastVerificationTime instanceof Date)) {
            console.error("Error: Invalid Date: lastVerificationTime must be a valid Date object");
            throw new Error("Invalid Date: lastVerificationTime must be a valid Date object");
        }
        this.id = id;
        this.lastVerificationTime = lastVerificationTime;
    }

    getId(): DeRecIdentity {
        if (!this.id) {
            console.error("Error: DeRecIdentity is not set");
            throw new Error("DeRecIdentity is not set");
        }
        return this.id;
    }

    getLastVerificationTime(): Date {
        if (!(this.lastVerificationTime instanceof Date)) {
            console.error("Error: Invalid Date: lastVerificationTime must be a valid Date object");
            throw new Error("Invalid Date: lastVerificationTime must be a valid Date object");
        }
        return this.lastVerificationTime;
    }

    getPairingStatus(): string {
        if (!this.lastVerificationTime) {
            console.error("Error: Cannot determine pairing status: lastVerificationTime is undefined");
            throw new Error("Cannot determine pairing status: lastVerificationTime is undefined");
        }
        return "active"; //placeholder for status
    }
}
