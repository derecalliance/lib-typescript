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

import { DeRecPairingStatus } from './DeRecPairingStatus';
import { DeRecIdentity } from './DeRecIdentity';
import { PairingStatus } from './PairingStatus';


/**
 * Implementation of the DeRecHelperStatus interface
 */
export class DeRecHelperStatus extends DeRecPairingStatus {
    private id: DeRecIdentity;
    private lastVerificationTime: Date;

    constructor(id: DeRecIdentity, lastVerificationTime: Date, pairingStatus: PairingStatus) {
        super(pairingStatus);
        this.id = id;
        this.lastVerificationTime = lastVerificationTime;
    }

    getId(): DeRecIdentity {
        return this.id;
    }

    getLastVerificationTime(): Date {
        return this.lastVerificationTime;
    }
}
