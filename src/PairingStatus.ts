//defines, tracks, and manages the status of a pairing relationship through different states
//allows for various actions ensuring valid transitions between states
//helps manage lifecycle of a pairing, ensuring proper handling of each stage

export enum PairingStatus {
    NONE = 'NONE', //not yet invited
    INVITED = 'INVITED', //no reply yet
    PAIRED = 'PAIRED', //replied positively
    REFUSED = 'REFUSED', //replied negatively
    PENDING_REMOVAL = 'PENDING_REMOVAL', //in the process of being removed
    REMOVED = 'REMOVED', //at sharer request
    FAILED = 'FAILED', //timeout, disconnect etc.
    GONE = 'GONE' //disconnected at Helper Request
}


//represents a pairing relationship
export class Pairing {
    private status: PairingStatus;

    constructor() {
        this.status = PairingStatus.NONE;
    }

    getStatus(): PairingStatus {
        return this.status;
    }

    invite(): void {
        if (this.status === PairingStatus.NONE) {
            this.status = PairingStatus.INVITED;
            console.log("Invitation sent.");
        } else {
            console.log("Cannot invite. Current status:", this.status);
        }
    }

    accept(): void {
        if (this.status === PairingStatus.INVITED) {
            this.status = PairingStatus.PAIRED;
            console.log("Invitation accepted.");
        } else {
            console.log("Cannot accept. Current status:", this.status);
        }
    }

    refuse(): void {
        if (this.status === PairingStatus.INVITED) {
            this.status = PairingStatus.REFUSED;
            console.log("Invitation refused.");
        } else {
            console.log("Cannot refuse. Current status:", this.status);
        }
    }

    remove(): void {
        if (this.status === PairingStatus.PAIRED) {
            this.status = PairingStatus.PENDING_REMOVAL;
            console.log("Removal in progress.");
        } else {
            console.log("Cannot remove. Current status:", this.status);
        }
    }

    completeRemoval(): void {
        if (this.status === PairingStatus.PENDING_REMOVAL) {
            this.status = PairingStatus.REMOVED;
            console.log("Removal complete.");
        } else {
            console.log("Cannot complete removal. Current status:", this.status);
        }
    }

    fail(): void {
        if (this.status !== PairingStatus.FAILED) {
            this.status = PairingStatus.FAILED;
            console.log("Pairing failed.");
        } else {
            console.log("Already in failed state.");
        }
    }

    disconnect(): void {
        if (this.status !== PairingStatus.GONE) {
            this.status = PairingStatus.GONE;
            console.log("Disconnected at helper request.");
        } else {
            console.log("Already disconnected.");
        }
    }
}