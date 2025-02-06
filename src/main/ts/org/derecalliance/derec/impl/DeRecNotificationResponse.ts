//class for how to respond to notifications

export class NotificationResponse {
    unpairPlease: boolean;
    result: boolean;
    reason?: string;
    reference?: Notification;

    constructor(unpairPlease: boolean, result: boolean, reason?: string, reference?: Notification) {
        this.unpairPlease = unpairPlease;
        this.result = result;
        this.reason = reason;
        this.reference = reference;
    }

    //method to handle responses
    handleResponse(): void {
        if (this.unpairPlease) {
            console.log("Helper has refused the request and unpaired");
        } else {
            console.log("Helper has accepted the request");
        }

        console.log(`Result of the notification handling: ${this.result}`);
        if (this.reason) {
            console.log(`Reason: ${this.reason}`);
        }
        if (this.reference) {
            console.log(`Notification Reference:`, this.reference);
        }
    }
}