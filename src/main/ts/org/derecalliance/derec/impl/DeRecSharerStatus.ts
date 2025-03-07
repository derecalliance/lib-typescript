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

//impl to track and report sharer status
//checks if sharer is in recovery mode

import { DeRecIdentity } from './DeRecIdentity';
import { DeRecPairingStatus } from './DeRecPairingStatus';
import { PairingStatus } from './PairingStatus';

export class DeRecSharerStatusImpl implements DeRecSharerStatus {
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
        this.recoveryMode = isRecovering; //does not return anything
    }
}
