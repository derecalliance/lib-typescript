/*
 * Copyright (c) DeRec Alliance and its Contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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