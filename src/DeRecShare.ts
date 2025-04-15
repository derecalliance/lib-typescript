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

//class that links sharer status and secretId
//methods return the current states of properties defined in class
//remove() method checks if link is alredy removed
//if not, marks it as removed and updates enum state

import { SecretId } from './SecretId.js';
import { DeRecSharerStatus } from './DeRecSharerStatus.js';

export class DeRecShare {
    public sharerStatus: DeRecSharerStatus;
    public secretId: SecretId;
    public versionNumbers: number[];
    private isRemoved: boolean;
    
    // Initialize the properties
    constructor(sharer: DeRecSharerStatus, secretId: SecretId, versions: number[]) {
        this.sharerStatus = sharer;
        this.secretId = secretId;
        this.versionNumbers = versions;
        this.isRemoved = false; // Assuming connection between sharer and secret is still active
    }

    getSharer(): DeRecSharerStatus {
        return this.sharerStatus;
    }

    getSecretId(): SecretId {
        return this.secretId;
    }

    getVersions(): number[] {
        return this.versionNumbers;
    }

    // Handles removal process when triggered externally
    remove(): boolean {
        if (this.isRemoved) {
            return false; // Returns false if share is already marked as removed (no action needed)
        }
        this.isRemoved = true; // Marks share as removed (if not already)
        this.sharerStatus.setRecoveryMode(true); // Updates sharer's status to recovery mode instead of setStatus
        return true; // Indicates removal request successfully processed
    }
}
