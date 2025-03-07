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

//define class that gets identity and pairing status of helper
//indentity and pairing status identity stored as object
//return status of connection to helper

import { DeRecPairingStatus } from '../interfaces/DeRecPairingStatus';
import { DeRecIdentity } from './DeRecIdentity';

//get indentity of helper
export class DeRecHelperStatusImpl implements DeRecHelperStatus {
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
