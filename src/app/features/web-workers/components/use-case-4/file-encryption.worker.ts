/// <reference lib="webworker" />

/**
 * File Encryption Web Worker
 * Uses Web Crypto API for encryption/hashing in background thread
 */

interface WorkerMessage {
    type: 'HASH' | 'ENCRYPT' | 'DECRYPT';
    data: ArrayBuffer;
    algorithm?: 'SHA-256' | 'SHA-384' | 'SHA-512';
    password?: string;
}

addEventListener('message', async ({ data }: { data: WorkerMessage }) => {
    const startTime = performance.now();

    try {
        let result;

        switch (data.type) {
            case 'HASH':
                result = await hashData(data.data, data.algorithm || 'SHA-256');
                break;
            case 'ENCRYPT':
                result = await encryptData(data.data, data.password || 'default');
                break;
            case 'DECRYPT':
                result = await decryptData(data.data, data.password || 'default');
                break;
            default:
                throw new Error('Unknown operation type');
        }

        const processingTime = Math.round(performance.now() - startTime);

        postMessage({
            type: 'COMPLETE',
            result,
            processingTime
        });
    } catch (error) {
        postMessage({
            type: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

async function hashData(data: ArrayBuffer, algorithm: string): Promise<{ hash: string; algorithm: string }> {
    postMessage({ type: 'PROGRESS', progress: 10, stage: 'Preparing data...' });

    const hashBuffer = await crypto.subtle.digest(algorithm, data);

    postMessage({ type: 'PROGRESS', progress: 80, stage: 'Converting hash...' });

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    postMessage({ type: 'PROGRESS', progress: 100, stage: 'Complete' });

    return { hash: hashHex, algorithm };
}

async function encryptData(data: ArrayBuffer, password: string): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
    postMessage({ type: 'PROGRESS', progress: 10, stage: 'Deriving key from password...' });

    // Derive key from password
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const passwordHash = await crypto.subtle.digest('SHA-256', passwordBuffer);

    const key = await crypto.subtle.importKey(
        'raw',
        passwordHash,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );

    postMessage({ type: 'PROGRESS', progress: 30, stage: 'Generating IV...' });

    // Generate IV
    const iv = crypto.getRandomValues(new Uint8Array(12));

    postMessage({ type: 'PROGRESS', progress: 50, stage: 'Encrypting data...' });

    // Encrypt
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        data
    );

    postMessage({ type: 'PROGRESS', progress: 100, stage: 'Complete' });

    return { encrypted, iv };
}

async function decryptData(data: ArrayBuffer, password: string): Promise<{ decrypted: ArrayBuffer }> {
    postMessage({ type: 'PROGRESS', progress: 10, stage: 'Deriving key from password...' });

    // Derive key from password
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const passwordHash = await crypto.subtle.digest('SHA-256', passwordBuffer);

    const key = await crypto.subtle.importKey(
        'raw',
        passwordHash,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );

    postMessage({ type: 'PROGRESS', progress: 50, stage: 'Decrypting data...' });

    // Extract IV (first 12 bytes) and ciphertext
    const iv = new Uint8Array(data.slice(0, 12));
    const ciphertext = data.slice(12);

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ciphertext
    );

    postMessage({ type: 'PROGRESS', progress: 100, stage: 'Complete' });

    return { decrypted };
}
