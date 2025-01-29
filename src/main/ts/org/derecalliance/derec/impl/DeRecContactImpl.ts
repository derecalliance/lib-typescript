class ContactMessage {
    publicEncryptionKeyId: number;
    publicEncryptionKey: string;
    nonce: bigint;
    transportUri: string;

    constructor(publicEncryptionKeyId: number, publicEncryptionKey: string, nonce: bigint, transportUri: string) {
        if (publicEncryptionKeyId <= 0) {
            console.error("Invalid publicEncryptionKeyId: Must be a positive number.");
            throw new Error("publicEncryptionKeyId must be a positive number.");
        }
        if (!publicEncryptionKey) {
            console.error("Invalid publicEncryptionKey: Cannot be empty.");
            throw new Error("publicEncryptionKey cannot be empty.");
        }
        if (!transportUri) {
            console.error("Invalid transportUri: Cannot be empty.");
            throw new Error("transportUri cannot be empty.");
        }
        if (typeof nonce !== "bigint") {
            console.error("Invalid nonce: Must be a BigInt.");
            throw new Error("nonce must be a BigInt.");
        }

        this.publicEncryptionKeyId = publicEncryptionKeyId;
        this.publicEncryptionKey = publicEncryptionKey;
        this.nonce = nonce;
        this.transportUri = transportUri;
    }

    serialize(): Uint8Array {
        try {
            const message = JSON.stringify(this);
            return new TextEncoder().encode(message);
        } catch (error) {
            console.error("Error during serialization:", error);
            throw new Error("Failed to serialize ContactMessage.");
        }
    }

    static deserialize(data: Uint8Array): ContactMessage {
        try {
            const messageString = new TextDecoder().decode(data);
            const parsedMessage = JSON.parse(messageString);

            if (!parsedMessage.publicEncryptionKey || !parsedMessage.transportUri || typeof parsedMessage.nonce === "undefined") {
                console.error("Deserialization error: Missing required fields.");
                throw new Error("Invalid serialized data: Missing required fields.");
            }

            return new ContactMessage(
                parsedMessage.publicEncryptionKeyId,
                parsedMessage.publicEncryptionKey,
                BigInt(parsedMessage.nonce),
                parsedMessage.transportUri
            );
        } catch (error) {
            console.error("Error during deserialization:", error);
            throw new Error("Failed to deserialize ContactMessage.");
        }
    }
}

class DeRecContactImpl {
    publicEncryptionKey: string;
    publicEncryptionKeyId: number;
    transportUri: string;
    nonce: bigint;

    constructor(publicEncryptionKey: string, publicEncryptionKeyId: number, transportUri: string) {
        if (!publicEncryptionKey) {
            console.error("Invalid publicEncryptionKey: Cannot be empty.");
            throw new Error("publicEncryptionKey cannot be empty.");
        }
        if (publicEncryptionKeyId <= 0) {
            console.error("Invalid publicEncryptionKeyId: Must be a positive number.");
            throw new Error("publicEncryptionKeyId must be a positive number.");
        }
        if (!transportUri) {
            console.error("Invalid transportUri: Cannot be empty.");
            throw new Error("transportUri cannot be empty.");
        }

        this.publicEncryptionKey = publicEncryptionKey;
        this.publicEncryptionKeyId = publicEncryptionKeyId;
        this.transportUri = transportUri;
        this.nonce = BigInt(Date.now());
    }

    createContactMessage(publicEncryptionKeyId: number, publicEncryptionKey: string, nonce: bigint, transportUri: string): Uint8Array {
        try {
            return new ContactMessage(publicEncryptionKeyId, publicEncryptionKey, nonce, transportUri).serialize();
        } catch (error) {
            console.error("Error creating ContactMessage:", error);
            throw new Error("Failed to create ContactMessage.");
        }
    }

    parseContactMessage(data: Uint8Array): DeRecContactImpl {
        try {
            const contactMessage = ContactMessage.deserialize(data);
            return new DeRecContactImpl(
                contactMessage.publicEncryptionKey,
                contactMessage.publicEncryptionKeyId,
                contactMessage.transportUri
            );
        } catch (error) {
            console.error("Error parsing ContactMessage:", error);
            throw new Error("Failed to parse ContactMessage.");
        }
    }
}
