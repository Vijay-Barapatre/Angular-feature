/**
 * JavaScript Functions & Parameters - Live Examples
 * All function types, parameters, and complex patterns
 */

// ============================================
// 1. FUNCTION TYPES
// ============================================

// Function Declaration
export function greetDeclaration(name: string): string {
    return `Hello, ${name} from declaration!`;
}

// Arrow Functions
export const double = (x: number) => x * 2;
export const add = (a: number, b: number) => a + b;
export const getRandom = () => Math.random();

// Generator Function
export function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// Infinite ID Generator
export function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

// ============================================
// 2. PARAMETER TYPES
// ============================================

// Rest Parameters
export function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

export function multiply(multiplier: number, ...numbers: number[]): number[] {
    return numbers.map(n => n * multiplier);
}

// Destructured Parameters
export function createUser({ name, age, role = 'user' }: {
    name: string;
    age: number;
    role?: string
}) {
    return { name, age, role };
}

export function getCoordinates([x, y, z = 0]: [number, number, number?]) {
    return { x, y, z };
}

// ============================================
// 3. HIGHER-ORDER FUNCTIONS
// ============================================

// Function returning function
export function multiplier(factor: number) {
    return function (number: number) {
        return number * factor;
    };
}

// Function taking function as argument
export function applyOperation<T, U>(
    arr: T[],
    operation: (item: T) => U
): U[] {
    return arr.map(operation);
}

// ============================================
// 4. CLOSURES
// ============================================

export function createCounter() {
    let count = 0; // Private variable

    return {
        increment() {
            return ++count;
        },
        decrement() {
            return --count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
        }
    };
}

// Closure with parameters
export function createMultiplier(factor: number) {
    return (value: number) => value * factor;
}

// ============================================
// 5. CURRYING
// ============================================

// Manual currying
export function curry(a: number) {
    return function (b: number) {
        return function (c: number) {
            return a + b + c;
        };
    };
}

// Simpler curry
export const curriedAdd = (a: number) => (b: number) => a + b;

// Generic curry helper
export function curryN<T extends any[], R>(
    fn: (...args: T) => R
): any {
    return function curried(...args: any[]): any {
        if (args.length >= fn.length) {
            return fn(...args as T);
        }
        return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    };
}

// ============================================
// 6. FUNCTION COMPOSITION
// ============================================

export const compose = <T>(...fns: Array<(x: T) => T>) => (x: T) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

export const pipe = <T>(...fns: Array<(x: T) => T>) => (x: T) =>
    fns.reduce((acc, fn) => fn(acc), x);

// Example compositions
const doubleNum = (x: number) => x * 2;
const addTen = (x: number) => x + 10;

export const doubleThenAdd = compose(addTen, doubleNum);
export const addThenDouble = pipe(addTen, doubleNum);

// ============================================
// 7. MEMOIZATION
// ============================================

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();

    return function (...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    } as T;
}

// Fibonacci with memoization
export const memoizedFib = memoize(function fib(n: number): number {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

// ============================================
// 8. RECURSION PATTERNS
// ============================================

// Basic recursion
export function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Tail recursion (optimizable)
export function factorialTail(n: number, acc = 1): number {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);
}

// Flatten array recursively
export function flatten(arr: any[]): any[] {
    return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

// ============================================
// 9. DEBOUNCE & THROTTLE
// ============================================

export function createDebounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: any;

    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

export function createThrottle<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let lastCall = 0;

    return function (...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

// ============================================
// 10. ADVANCED PATTERNS
// ============================================

// Partial application
export function partial<T extends any[], U>(
    fn: (...args: T) => U,
    ...fixedArgs: any[]
): (...args: any[]) => U {
    return function (...remainingArgs: any[]) {
        return fn(...[...fixedArgs, ...remainingArgs] as T);
    };
}

// Once - function that runs only once
export function once<T extends (...args: any[]) => any>(fn: T): T {
    let called = false;
    let result: ReturnType<T>;

    return function (...args: Parameters<T>): ReturnType<T> {
        if (!called) {
            called = true;
            result = fn(...args);
        }
        return result;
    } as T;
}

// Pipe with async
export const pipeAsync = <T>(...fns: Array<(x: T) => Promise<T>>) =>
    async (x: T): Promise<T> => {
        let result = x;
        for (const fn of fns) {
            result = await fn(result);
        }
        return result;
    };

// Retry with delay
export async function retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return retry(fn, retries - 1, delay);
        }
        throw error;
    }
}

// Middleware pattern
export interface Middleware<T = any> {
    (context: T, next: () => void): void;
}

export function createMiddlewareChain<T = any>() {
    const middlewares: Middleware<T>[] = [];

    return {
        use(middleware: Middleware<T>) {
            middlewares.push(middleware);
            return this;
        },

        execute(context: T) {
            let index = 0;

            function next() {
                if (index < middlewares.length) {
                    const middleware = middlewares[index++];
                    middleware(context, next);
                }
            }

            next();
        }
    };
}
