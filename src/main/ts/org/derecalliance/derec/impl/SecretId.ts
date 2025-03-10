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

/**
 * Implementation of the Id class
 */
export class SecretId {
    private bytes: Uint8Array;

    constructor(bytes: Uint8Array) {
        this.setBytes(bytes);
    }

    getBytes(): Uint8Array {
        return this.bytes;
    }

    setBytes(bytes: Uint8Array): void {
        if (bytes.length < 1 || bytes.length > 16) {
            throw new Error("Secret Id must be between 1 and 16 bytes");
        }
        this.bytes = new Uint8Array(bytes);
    }

    equals(o: any): boolean {
        if (this === o) return true;
        if (!(o instanceof SecretId)) return false;

        const other = o as SecretId;
        if (this.bytes.length !== other.bytes.length) return false;

        for (let i = 0; i < this.bytes.length; i++) {
            if (this.bytes[i] !== other.bytes[i]) return false;
        }

        return true;
    }

    hashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.bytes.length; i++) {
            hash = ((hash << 5) - hash) + this.bytes[i];
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
