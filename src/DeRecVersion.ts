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

//represent specific version of a secret
//track which helpers are protecting this version
//ensure secure storage and retrieval of secret

import { DeRecSecret } from './DeRecSecret';
import { DeRecHelperStatus } from './DeRecHelperStatus';

export class DeRecVersion {
    private secret: DeRecSecret;
    private versionNumber: number;
    private protectedValue: Uint8Array;
    private protectingHelpers: DeRecHelperStatus[];

    constructor(
        secret: DeRecSecret,
        versionNumber: number,
        protectedValue: Uint8Array,
        protectingHelpers: DeRecHelperStatus[] = []
    ) {
        this.secret = secret;
        this.versionNumber = versionNumber;
        this.protectedValue = protectedValue;
        this.protectingHelpers = protectingHelpers;
    }

    getSecret(): DeRecSecret {
        return this.secret;
    }

    getVersionNumber(): number {
        return this.versionNumber;
    }

    getProtectedValue(): Uint8Array {
        return this.protectedValue;
    }

    //version is protected even if its only one helper
    isProtected(): boolean {
        return this.protectingHelpers.length > 0;
    }

    getProtectingHelpers(): DeRecHelperStatus[] {
        return this.protectingHelpers;
    }
}
