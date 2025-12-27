/**
 * TypeScript Advanced Function Types - Live Examples
 * Generics, Overloads, Type Guards, and Complex Patterns
 */

// ============================================
// 1. GENERIC FUNCTIONS
// ============================================

// Basic generic identity
export function identity<T>(value: T): T {
    return value;
}

// Generic array operations
export function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

export function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

// Multiple type parameters
export function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

export function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

// ============================================
// 2. GENERIC CONSTRAINTS
// ============================================

// Constraint: must have specific property
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Constraint: must be object type
export function merge<T extends object, U extends object>(
    obj1: T,
    obj2: U
): T & U {
    return { ...obj1, ...obj2 };
}

// Constraint: must have length
interface HasLength {
    length: number;
}

export function logLength<T extends HasLength>(item: T): number {
    return item.length;
}

// ============================================
// 3. FUNCTION OVERLOADS
// ============================================

// Overload signatures
export function format(value: string): string;
export function format(value: number): string;
export function format(value: boolean): string;

// Implementation
export function format(value: string | number | boolean): string {
    if (typeof value === 'string') return value.toUpperCase();
    if (typeof value === 'number') return value.toFixed(2);
    return value ? 'YES' : 'NO';
}

// Complex overloads with different return types
export function parse(value: string): object;
export function parse(value: number): number;
export function parse(value: boolean): boolean;

export function parse(value: string | number | boolean): object | number | boolean {
    if (typeof value === 'string') return JSON.parse(value);
    return value;
}

// ============================================
// 4. TYPE GUARDS & PREDICATES
// ============================================

// Type predicate
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

// Using type guards
export function processValue(value: string | number): string {
    if (isString(value)) {
        return value.toUpperCase();
    }
    return value.toFixed(2);
}

// Complex type guards
interface User {
    name: string;
    email: string;
}

interface Admin extends User {
    role: 'admin';
    permissions: string[];
}

export function isAdmin(user: User | Admin): user is Admin {
    return (user as Admin).role === 'admin';
}

// ============================================
// 5. ASSERTION FUNCTIONS
// ============================================

export function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Value is not a string!');
    }
}

export function assertNonNull<T>(value: T): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error('Value is null or undefined!');
    }
}

// ============================================
// 6. CONDITIONAL RETURN TYPES
// ============================================

type ArrayOrSingle<T, IsArray extends boolean> =
    IsArray extends true ? T[] : T;

export function getValue<T, IsArray extends boolean = false>(
    value: T,
    asArray?: IsArray
): ArrayOrSingle<T, IsArray> {
    return (asArray ? [value] : value) as ArrayOrSingle<T, IsArray>;
}

// ============================================
// 7. GENERIC HIGHER-ORDER FUNCTIONS
// ============================================

export function map<T, U>(
    arr: T[],
    fn: (item: T, index: number) => U
): U[] {
    return arr.map(fn);
}

export function filter<T, U extends T>(
    arr: T[],
    predicate: (item: T) => item is U
): U[] {
    return arr.filter(predicate);
}

export function reduce<T, U>(
    arr: T[],
    reducer: (acc: U, item: T) => U,
    initial: U
): U {
    return arr.reduce(reducer, initial);
}

// Generic compose
type Fn<T, U> = (arg: T) => U;

export function compose<A, B, C>(
    f: Fn<B, C>,
    g: Fn<A, B>
): Fn<A, C> {
    return (x: A) => f(g(x));
}

// ============================================
// 8. ADVANCED PATTERNS
// ============================================

// Type-safe curry
type Curry<T> = T extends (...args: infer Args) => infer Return
    ? Args extends [infer First, ...infer Rest]
    ? (arg: First) => Curry<(...args: Rest) => Return>
    : Return
    : never;

export function curry<T extends (...args: any[]) => any>(
    fn: T
): Curry<T> {
    return function curried(...args: any[]): any {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    } as Curry<T>;
}

// ============================================
// 9. TYPE-SAFE EVENT EMITTER
// ============================================

export class TypedEventEmitter<Events extends Record<string, any>> {
    private listeners = new Map<keyof Events, Function[]>();

    on<K extends keyof Events>(
        event: K,
        listener: (data: Events[K]) => void
    ): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
    }

    emit<K extends keyof Events>(event: K, data: Events[K]): void {
        const listeners = this.listeners.get(event) || [];
        listeners.forEach(listener => listener(data));
    }

    off<K extends keyof Events>(
        event: K,
        listener: (data: Events[K]) => void
    ): void {
        const listeners = this.listeners.get(event) || [];
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
}

// ============================================
// 10. BUILDER PATTERN
// ============================================

export class QueryBuilder<T> {
    private query: Partial<T> = {};

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.query[field] = value;
        return this;
    }

    select<K extends keyof T>(...fields: K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;
        fields.forEach(field => {
            if (this.query[field] !== undefined) {
                result[field] = this.query[field]!;
            }
        });
        return result;
    }

    build(): Partial<T> {
        return { ...this.query };
    }
}

// ============================================
// 11. UTILITY TYPE FUNCTIONS
// ============================================

// Deep partial
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function deepPartial<T>(obj: T): DeepPartial<T> {
    return obj as DeepPartial<T>;
}

// Pick specific keys
export function pick<T, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}

// Omit specific keys
export function omit<T, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result as Omit<T, K>;
}

// ============================================
// 12. PROMISE & ASYNC UTILITIES
// ============================================

export async function asyncMap<T, U>(
    arr: T[],
    fn: (item: T) => Promise<U>
): Promise<U[]> {
    return Promise.all(arr.map(fn));
}

export async function asyncFilter<T>(
    arr: T[],
    predicate: (item: T) => Promise<boolean>
): Promise<T[]> {
    const results = await Promise.all(
        arr.map(async (item) => ({
            item,
            keep: await predicate(item)
        }))
    );
    return results.filter(r => r.keep).map(r => r.item);
}

// Retry with types
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

// ============================================
// 13. TYPE INFERENCE HELPERS
// ============================================

// Infer function return type
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

// Infer function parameter types
type ParametersOf<T> = T extends (...args: infer P) => any ? P : never;

// Unwrap Promise type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export function unwrapPromise<T>(promise: Promise<T>): T {
    throw new Error('Use await instead');
}
