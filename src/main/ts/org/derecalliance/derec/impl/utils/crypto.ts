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

/*
    This file contains utility functions for cryptographic operations.
*/

/**
 * Creates a message digest (hash) of the input data using SHA-384.
 * This function provides functionality similar to Java's MessageDigest.
 * 
 * @param data - The input data as a Uint8Array to be hashed
 * @returns Promise<Uint8Array> - The SHA-384 hash of the input data
 */
export async function createMessageDigest(data: Uint8Array): Promise<Uint8Array> {
    const hashBuffer = await crypto.subtle.digest('SHA-384', data);
    return new Uint8Array(hashBuffer);
}

/**
 * Converts a base64 encoded string to a Uint8Array.
 * This function provides functionality similar to Java's Base64.getDecoder().decode().
 * 
 * @param base64 - The base64 encoded string to convert
 * @returns Uint8Array - The decoded binary data as a Uint8Array
 */
export function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}