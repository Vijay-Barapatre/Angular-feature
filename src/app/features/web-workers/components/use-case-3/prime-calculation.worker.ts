/// <reference lib="webworker" />

/**
 * Prime Calculation Web Worker
 * CPU-intensive prime number generation in background thread
 */

interface WorkerMessage {
    type: 'FIND_PRIMES' | 'IS_PRIME' | 'FACTORIZE';
    limit?: number;
    number?: number;
}

addEventListener('message', ({ data }: { data: WorkerMessage }) => {
    const startTime = performance.now();

    try {
        let result;

        switch (data.type) {
            case 'FIND_PRIMES':
                result = findPrimes(data.limit || 100000);
                break;
            case 'IS_PRIME':
                result = { isPrime: isPrime(data.number || 0), number: data.number };
                break;
            case 'FACTORIZE':
                result = factorize(data.number || 0);
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

function findPrimes(limit: number): { primes: number[]; count: number } {
    const primes: number[] = [];
    const progressInterval = Math.floor(limit / 100);

    for (let num = 2; num <= limit; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }

        // Report progress
        if (num % progressInterval === 0) {
            const progress = Math.floor((num / limit) * 100);
            postMessage({ type: 'PROGRESS', progress, currentCount: primes.length });
        }
    }

    return { primes, count: primes.length };
}

function isPrime(num: number): boolean {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }

    return true;
}

function factorize(num: number): { number: number; factors: number[] } {
    const factors: number[] = [];
    let n = num;

    // Find 2s
    while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
    }

    // n must be odd at this point
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }

        // Report progress
        const progress = Math.floor((i / Math.sqrt(num)) * 100);
        if (progress % 10 === 0) {
            postMessage({ type: 'PROGRESS', progress });
        }
    }

    // If n is still greater than 1, it's a prime factor
    if (n > 1) {
        factors.push(n);
    }

    return { number: num, factors };
}
