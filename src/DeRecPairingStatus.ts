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

//get status between sharer and helper

import { PairingStatus } from './PairingStatus.js';

export interface DeRecPairingStatus {
    getStatus(): PairingStatus;
}

/*
represents pairing status of helper that returns pairing 
status through method
*/
export class DeRecPairingStatus {
    private status: PairingStatus;

    constructor(status: PairingStatus) {
        if (!status) {
            console.error("Error: PairingStatus is needed");
            throw new Error("Pairing status is needed");
        }
        this.status = status;
    }

    getStatus(): PairingStatus {
        if (!this.status) {
            console.error("Error: PairingStatus is not defined");
            throw new Error("PairingStatus is not defined");
        }
        return this.status; //return pair status
    }
}
