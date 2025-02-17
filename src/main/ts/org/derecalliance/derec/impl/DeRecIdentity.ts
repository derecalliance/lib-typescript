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

import { createMessageDigest, base64ToUint8Array } from "./util/crypto";

export class DeRecIdentity {
    private name: string; // human readable identification
    private contact: string; // how to contact me outside the protocol
    private address: string | null; // URI transport address
    private publicEncryptionKeyId: number;
    private publicEncryptionKey: string;
    private publicSignatureKey: string | null;
    private publicEncryptionKeyDigest: Uint8Array;
    private publicSignatureKeyDigest?: Uint8Array;

    private constructor(
        name: string,
        contact: string,
        address: string | null,
        publicEncryptionKeyId: number,
        publicEncryptionKey: string,
        publicSignatureKey: string | null,
        publicEncryptionKeyDigest: Uint8Array,
        publicSignatureKeyDigest?: Uint8Array
    ) {
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.publicEncryptionKeyId = publicEncryptionKeyId;
        this.publicEncryptionKey = publicEncryptionKey;
        this.publicSignatureKey = publicSignatureKey;
        this.publicEncryptionKeyDigest = publicEncryptionKeyDigest;
        this.publicSignatureKeyDigest = publicSignatureKeyDigest;
    }

    /*
        Creates a new DeRecIdentity object.
    */
    static async create(
        name: string,
        contact: string,
        address: string | null,
        publicEncryptionKeyId: number,
        publicEncryptionKey: string,
        publicSignatureKey: string | null
    ): Promise<DeRecIdentity> {
        const encryptionKeyBytes = base64ToUint8Array(publicEncryptionKey);
        const encryptionKeyDigest = await createMessageDigest(encryptionKeyBytes);

        let signatureKeyDigest: Uint8Array | undefined;
        if (publicSignatureKey) {
            const signatureKeyBytes = base64ToUint8Array(publicSignatureKey);
            signatureKeyDigest = await createMessageDigest(signatureKeyBytes);
        }

        return new DeRecIdentity(
            name,
            contact,
            address,
            publicEncryptionKeyId,
            publicEncryptionKey,
            publicSignatureKey,
            encryptionKeyDigest,
            signatureKeyDigest
        );
    }

    private async initializeEncryptionDigest(
        publicEncryptionKey: string
    ): Promise<void> {
        // Decode base64 strings to Uint8Array
        const publicEncryptionKeyBytes = base64ToUint8Array(publicEncryptionKey);

        // Create message digests
        this.publicEncryptionKeyDigest = await createMessageDigest(publicEncryptionKeyBytes);
    }

    private async initializePublicSignatureKeyDigest(publicSignatureKey: string): Promise<void> {
        const publicSignatureKeyBytes = base64ToUint8Array(publicSignatureKey);
        this.publicSignatureKeyDigest = await createMessageDigest(publicSignatureKeyBytes);
    }

    getName(): string {
        return this.name;
    }

    getContact(): string {
        return this.contact;
    }

    getAddress(): string | null {
        return this.address;
    }

    getPublicEncryptionKeyId(): number {
        return this.publicEncryptionKeyId;
    }

    getPublicEncryptionKey(): string {
        return this.publicEncryptionKey;
    }

    getPublicSignatureKey(): string | null {
        return this.publicSignatureKey;
    }

    getPublicEncryptionKeyDigest(): Uint8Array {
        return this.publicEncryptionKeyDigest;
    }

    getPublicSignatureKeyDigest(): Uint8Array | undefined {
        return this.publicSignatureKeyDigest;
    }

    setPublicSignatureKey(publicSignatureKey: string): void {
        this.publicSignatureKey = publicSignatureKey;
        this.initializePublicSignatureKeyDigest(publicSignatureKey);
    }

    equals(other: DeRecIdentity): boolean {
        return (
            this.name === other.getName() &&
            this.contact === other.getContact() &&
            this.address === other.getAddress() &&
            this.publicEncryptionKeyId === other.getPublicEncryptionKeyId() &&
            this.publicEncryptionKey === other.getPublicEncryptionKey() &&
            this.publicSignatureKey === other.getPublicSignatureKey()
        );
    }

    equalsKey(other: DeRecIdentity): boolean {
        return (
            this.publicEncryptionKey === other.getPublicEncryptionKey() &&
            this.publicEncryptionKeyId === other.getPublicEncryptionKeyId() &&
            this.publicSignatureKey === other.getPublicSignatureKey()
        );
    }

    toString(): string {
        return `Name: ${this.name}, Contact: ${this.contact}, Address: ${this.address}, ` +
            `pubEncryptionKeyId: ${this.publicEncryptionKeyId === 0 ? "null" : this.publicEncryptionKeyId}, ` +
            `pubEncryptionKeyDigest: ${this.publicEncryptionKeyDigest ? btoa(String.fromCharCode(...this.publicEncryptionKeyDigest)) : "null"}, ` +
            `pubSignatureKeyDigest: ${this.publicSignatureKeyDigest ? btoa(String.fromCharCode(...this.publicSignatureKeyDigest)) : "null"}`;
    }
    
}