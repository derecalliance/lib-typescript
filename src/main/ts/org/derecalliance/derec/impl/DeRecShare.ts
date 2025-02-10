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

export class DeRecShare {
    private sharer: DeRecSharerStatus();
    private secretId: SecrectId();
    private versions: number[];
    private isRemoved: boolean;
    
    //initialize the properties
    constructor(sharer: DeRecSharerStatus, secretId: SecretId, versions: number[]) {
        this.sharer = sharer;
        this.secretId = secretId;
        this.versions = versions;
        this.isRemoved = false; //assuming connection between sharer and secret is still active
    }

    getSharer(): DeRecSharerStatus {
        return this.sharer;
    }

    getSecretId(): SecretId {
        return this.secretId;
    }

    getVersions(): number[] {
        return this.versions;
    }

    //handles removal process when triggered externally
    remove(): boolean {
        if (this.isRemoved) {
            return false; //returns false if share is alredy marked as removed (no action needed)
        }
        this.isRemoved = true; //marks share as removed (if not already)
        this.sharer.setStatus('PENDING_REMOVAL'); //updates sharer's status, awaiting unpairing
        return true; //indicates removal request successfully processed
    }
}