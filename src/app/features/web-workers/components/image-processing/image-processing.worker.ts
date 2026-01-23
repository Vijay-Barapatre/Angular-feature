/// <reference lib="webworker" />

/**
 * Image Processing Web Worker
 * Handles heavy image filter operations in background thread
 */

interface ImageFilter {
    type: 'grayscale' | 'blur' | 'brightness' | 'contrast' | 'sepia';
    intensity?: number;
}

interface WorkerMessage {
    type: 'PROCESS_IMAGE';
    imageData: ImageData;
    filter: ImageFilter;
}

addEventListener('message', ({ data }: { data: WorkerMessage }) => {
    if (data.type === 'PROCESS_IMAGE') {
        const startTime = performance.now();
        const { imageData, filter } = data;

        try {
            const processed = processImage(imageData, filter);
            const processingTime = Math.round(performance.now() - startTime);

            postMessage({
                type: 'COMPLETE',
                result: processed,
                processingTime
            });
        } catch (error) {
            postMessage({
                type: 'ERROR',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
});

function processImage(imageData: ImageData, filter: ImageFilter): ImageData {
    const data = new Uint8ClampedArray(imageData.data);
    const length = data.length;
    const chunkSize = Math.floor(length / 100);

    for (let i = 0; i < length; i += 4) {
        // Apply filter based on type
        switch (filter.type) {
            case 'grayscale':
                applyGrayscale(data, i);
                break;
            case 'sepia':
                applySepia(data, i);
                break;
            case 'brightness':
                applyBrightness(data, i, filter.intensity ?? 50);
                break;
            case 'contrast':
                applyContrast(data, i, filter.intensity ?? 50);
                break;
            case 'blur':
                // Note: Real blur requires neighborhood pixels - simplified version
                applyBlur(data, i, filter.intensity ?? 50);
                break;
        }

        // Report progress every chunk
        if (i % chunkSize === 0) {
            const progress = Math.floor((i / length) * 100);
            postMessage({ type: 'PROGRESS', progress });
        }
    }

    return new ImageData(data, imageData.width, imageData.height);
}

function applyGrayscale(data: Uint8ClampedArray, i: number): void {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;     // R
    data[i + 1] = avg; // G
    data[i + 2] = avg; // B
}

function applySepia(data: Uint8ClampedArray, i: number): void {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
}

function applyBrightness(data: Uint8ClampedArray, i: number, intensity: number): void {
    const factor = 1 + (intensity - 50) / 50; // 0.0 to 2.0
    data[i] = Math.min(255, Math.max(0, data[i] * factor));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor));
}

function applyContrast(data: Uint8ClampedArray, i: number, intensity: number): void {
    const factor = 1 + (intensity - 50) / 25; // 0.0 to 3.0
    data[i] = Math.min(255, Math.max(0, 128 + (data[i] - 128) * factor));
    data[i + 1] = Math.min(255, Math.max(0, 128 + (data[i + 1] - 128) * factor));
    data[i + 2] = Math.min(255, Math.max(0, 128 + (data[i + 2] - 128) * factor));
}

function applyBlur(data: Uint8ClampedArray, i: number, intensity: number): void {
    // Simplified blur - just reduce contrast slightly based on intensity
    const factor = 1 - (intensity / 200);
    data[i] = Math.min(255, Math.max(0, 128 + (data[i] - 128) * factor));
    data[i + 1] = Math.min(255, Math.max(0, 128 + (data[i + 1] - 128) * factor));
    data[i + 2] = Math.min(255, Math.max(0, 128 + (data[i + 2] - 128) * factor));
}
