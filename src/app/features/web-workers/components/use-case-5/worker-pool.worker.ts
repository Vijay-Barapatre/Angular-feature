/// <reference lib="webworker" />

/**
 * Worker Pool - Individual Worker
 * Handles tasks assigned from the pool manager
 */

interface Task {
    id: string;
    type: 'FIBONACCI' | 'FACTORIAL' | 'PRIME_CHECK' | 'RANDOM_WORK';
    data: number;
}

addEventListener('message', ({ data }: { data: Task }) => {
    const startTime = performance.now();

    try {
        let result;

        switch (data.type) {
            case 'FIBONACCI':
                result = fibonacci(data.data);
                break;
            case 'FACTORIAL':
                result = factorial(data.data);
                break;
            case 'PRIME_CHECK':
                result = isPrime(data.data);
                break;
            case 'RANDOM_WORK':
                result = randomWork(data.data);
                break;
            default:
                throw new Error('Unknown task type');
        }

        const processingTime = Math.round(performance.now() - startTime);

        postMessage({
            type: 'COMPLETE',
            taskId: data.id,
            result,
            processingTime
        });
    } catch (error) {
        postMessage({
            type: 'ERROR',
            taskId: data.id,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

function fibonacci(n: number): number {
    if (n <= 1) return n;

    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

function factorial(n: number): number {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
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

function randomWork(iterations: number): number {
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < iterations; i++) {
        result += Math.sqrt(i) * Math.sin(i);
    }
    return result;
}
