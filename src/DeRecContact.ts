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

/*class that provides methods for retrieving contact details, 
serializing the contact into a byte array, and parsing a serialized contact message
*/
export class DeRecContact {
    private publicEncryptionKey: string;
    private publicEncryptionKeyId: number;
    private transportUri: string;
    private nonce: bigint;

    constructor(publicEncryptionKey: string, publicEncryptionKeyId: number, transportUri: string, nonce?: bigint) {
        if (!publicEncryptionKey) {
            throw new Error("publicEncryptionKey cannot be empty.");
        }
        if (publicEncryptionKeyId <= 0) {
            throw new Error("publicEncryptionKeyId must be a positive number.");
        }
        if (!transportUri) {
            throw new Error("transportUri cannot be empty.");
        }

        this.publicEncryptionKey = publicEncryptionKey;
        this.publicEncryptionKeyId = publicEncryptionKeyId;
        this.transportUri = transportUri;
        this.nonce = nonce ?? BigInt(Date.now()); //preserve nonce if provided, otherwise generate one
    }

    //implemented methods 
    getPublicEncryptionKey(): string {
        return this.publicEncryptionKey;
    }

    getPublicEncryptionKeyId(): number {
        return this.publicEncryptionKeyId;
    }

    getTransportUri(): string {
        return this.transportUri;
    }

    getNonce(): bigint {
        return this.nonce;
    }

    //serialization method to create a contact message as a byte array
    createContactMessage(): Uint8Array {
        try {
            const message = JSON.stringify({
                publicEncryptionKey: this.publicEncryptionKey,
                publicEncryptionKeyId: this.publicEncryptionKeyId,
                transportUri: this.transportUri,
                nonce: this.nonce.toString(), //convert bigInt to string for JSON serialization
            });
            return new TextEncoder().encode(message);
        } catch (error) {
            console.error("Error during serialization:", error);
            throw new Error("Failed to serialize DeRecContact.");
        }
    }

    //deserialization method to parse a contact message
    static parseContactMessage(data: Uint8Array): DeRecContact {
        try {
            const messageString = new TextDecoder().decode(data);
            const parsedMessage = JSON.parse(messageString);

            if (!parsedMessage.publicEncryptionKey || !parsedMessage.transportUri || typeof parsedMessage.nonce === "undefined") {
                throw new Error("Invalid serialized data: Missing required fields.");
            }

            return new DeRecContact(
                parsedMessage.publicEncryptionKey,
                parsedMessage.publicEncryptionKeyId,
                parsedMessage.transportUri,
                BigInt(parsedMessage.nonce) //convert string back to BigInt
            );
        } catch (error) {
            console.error("Error during deserialization:", error);
            throw new Error("Failed to deserialize DeRecContact.");
        }
    }
}

