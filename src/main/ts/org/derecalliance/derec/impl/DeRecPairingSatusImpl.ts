//get status between sharer and helper

import { PairingStatus } from 'api-typescript/src/interfaces/PairingStatus';

export interface DeRecPairingStatus {
    getStatus(): PairingStatus;
}

/*
represents pairing status of helper that returns pairing 
status through method
*/
export class DeRecHelperStatus implements DeRecPairingStatus {
    private status: PairingStatus;

    constructor(status: PairingStatus) {
        if (!status) {
            console.error("Error: PiringStatus is needed");
            throw new Error("Pairing status is needed");
        }
        this.status = status;
    }

    getStatus(): PairingStatus {
        if (!this.status) {
            console.error("Error: PairingStatus is not defined").
            throw new Error("PairingStatus is not defined");
        }
        return this.status; //return pair status
    }
}