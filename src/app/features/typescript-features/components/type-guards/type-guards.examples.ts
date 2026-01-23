/**
 * ============================================================================
 * 🛡️ TYPE GUARDS - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * Type guards narrow down types at runtime to help TypeScript understand
 * what type a variable is within a specific code block.
 * 
 * WHY USE TYPE GUARDS?
 * - Safely access type-specific properties
 * - Avoid runtime errors
 * - Get better IDE autocomplete
 * - Make union types practical
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ typeof TYPE GUARD (Primitives)
// ============================================================================

/**
 * typeof works for primitives: string, number, boolean, symbol, undefined
 * ⚠️ typeof null returns 'object' (historical bug)
 */
function formatValue(value: string | number | boolean): string {
    if (typeof value === 'string') {
        // TypeScript knows: value is string
        return value.toUpperCase();
    }

    if (typeof value === 'number') {
        // TypeScript knows: value is number
        return value.toFixed(2);
    }

    // TypeScript knows: value is boolean
    return value ? 'Yes' : 'No';
}

console.log(formatValue('hello'));  // 'HELLO'
console.log(formatValue(42.567));   // '42.57'
console.log(formatValue(true));     // 'Yes'


// ============================================================================
// 2️⃣ instanceof TYPE GUARD (Classes)
// ============================================================================

class Dog {
    bark(): string { return 'Woof!'; }
}

class Cat {
    meow(): string { return 'Meow!'; }
}

class Bird {
    chirp(): string { return 'Tweet!'; }
}

type Pet = Dog | Cat | Bird;

/**
 * instanceof checks the prototype chain
 * Works with classes, not interfaces (interfaces don't exist at runtime)
 */
function makeSound(pet: Pet): string {
    if (pet instanceof Dog) {
        // TypeScript knows: pet is Dog
        return pet.bark();
    }

    if (pet instanceof Cat) {
        // TypeScript knows: pet is Cat
        return pet.meow();
    }

    // TypeScript knows: pet is Bird
    return pet.chirp();
}


// ============================================================================
// 3️⃣ 'in' OPERATOR TYPE GUARD
// ============================================================================

interface Admin {
    name: string;
    role: 'admin';
    privileges: string[];
}

interface StandardUser {
    name: string;
    role: 'user';
    email: string;
}

type User = Admin | StandardUser;

/**
 * 'in' operator checks if a property exists
 * Good for interfaces (unlike instanceof)
 */
function getUserInfo(user: User): string {
    // Common property - always safe
    console.log(user.name);

    if ('privileges' in user) {
        // TypeScript knows: user is Admin
        return `Admin with privileges: ${user.privileges.join(', ')}`;
    }

    // TypeScript knows: user is StandardUser
    return `User email: ${user.email}`;
}


// ============================================================================
// 4️⃣ DISCRIMINATED UNIONS (Recommended Pattern)
// ============================================================================

/**
 * Each type has a common literal type field that distinguishes it
 * This is the BEST way to handle unions in TypeScript
 */

interface LoadingState {
    status: 'loading';
}

interface SuccessState {
    status: 'success';
    data: unknown[];
}

interface ErrorState {
    status: 'error';
    message: string;
}

type RequestState = LoadingState | SuccessState | ErrorState;

function handleState(state: RequestState): string {
    // Switch on the discriminant property
    switch (state.status) {
        case 'loading':
            return 'Loading...';

        case 'success':
            // TypeScript knows: state is SuccessState
            return `Loaded ${state.data.length} items`;

        case 'error':
            // TypeScript knows: state is ErrorState
            return `Error: ${state.message}`;
    }
}


// ============================================================================
// 5️⃣ CUSTOM TYPE GUARD FUNCTIONS (is keyword)
// ============================================================================

interface Fish {
    swim(): void;
    layEggs(): void;
}

interface Bird2 {
    fly(): void;
    layEggs(): void;
}

/**
 * Custom type guard function
 * Returns a "type predicate": pet is Fish
 */
function isFish(pet: Fish | Bird2): pet is Fish {
    // Check if the 'swim' method exists
    return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird2): void {
    if (isFish(pet)) {
        // TypeScript knows: pet is Fish
        pet.swim();
    } else {
        // TypeScript knows: pet is Bird2
        pet.fly();
    }
}


// ============================================================================
// 6️⃣ ASSERTION FUNCTIONS (asserts keyword)
// ============================================================================

/**
 * Assertion function throws if condition is false
 * After the call, TypeScript narrows the type
 */
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error(`Expected string but got ${typeof value}`);
    }
}

function processValue(value: unknown): void {
    assertIsString(value);
    // After assertion, TypeScript knows: value is string
    console.log(value.toUpperCase());
}

/**
 * Assert non-null
 */
function assertDefined<T>(value: T | null | undefined): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error('Value is null or undefined');
    }
}


// ============================================================================
// 7️⃣ ARRAY TYPE GUARDS
// ============================================================================

/**
 * Check if array contains specific type
 */
function isStringArray(arr: unknown[]): arr is string[] {
    return arr.every(item => typeof item === 'string');
}

function isNumberArray(arr: unknown[]): arr is number[] {
    return arr.every(item => typeof item === 'number');
}

function processArray(arr: unknown[]): void {
    if (isStringArray(arr)) {
        // TypeScript knows: arr is string[]
        console.log(arr.map(s => s.toUpperCase()));
    } else if (isNumberArray(arr)) {
        // TypeScript knows: arr is number[]
        console.log(arr.reduce((a, b) => a + b, 0));
    }
}


// ============================================================================
// 8️⃣ NULLISH TYPE GUARDS
// ============================================================================

/**
 * Check for null/undefined
 */
function isNotNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

function processNullable(value: string | null | undefined): string {
    if (isNotNull(value)) {
        // TypeScript knows: value is string
        return value.toUpperCase();
    }
    return 'default';
}

/**
 * Filter nullish values from array
 */
function filterNullish<T>(arr: (T | null | undefined)[]): T[] {
    return arr.filter(isNotNull);
}

const mixedArray = ['a', null, 'b', undefined, 'c'];
const cleanArray = filterNullish(mixedArray);  // string[]


// ============================================================================
// 9️⃣ COMPLEX TYPE GUARD EXAMPLES
// ============================================================================

/**
 * API response type guard
 */
interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

interface ApiErrorResponse {
    success: false;
    error: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

function isSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
    return response.success === true;
}

async function fetchData(): Promise<void> {
    const response: ApiResponse<User[]> = await fetch('/api/users').then(r => r.json());

    if (isSuccess(response)) {
        // TypeScript knows: response is ApiSuccessResponse<User[]>
        console.log(`Loaded ${response.data.length} users`);
    } else {
        // TypeScript knows: response is ApiErrorResponse
        console.error(`Error: ${response.error}`);
    }
}


// ============================================================================
// 🅰️ ANGULAR-SPECIFIC TYPE GUARDS
// ============================================================================

/**
 * Check if HttpErrorResponse
 * 
 * import { HttpErrorResponse } from '@angular/common/http';
 *
 * function isHttpError(error: unknown): error is HttpErrorResponse {
 *     return error instanceof HttpErrorResponse;
 * }
 * 
 * catch (error) {
 *     if (isHttpError(error)) {
 *         console.log(`HTTP ${error.status}: ${error.message}`);
 *     }
 * }
 */

/**
 * Check activated route data
 * 
 * interface RouteData {
 *     title: string;
 *     requiresAuth: boolean;
 * }
 *
 * function hasRouteData(data: unknown): data is RouteData {
 *     return typeof data === 'object' && data !== null
 *         && 'title' in data && 'requiresAuth' in data;
 * }
 */


// ============================================================================
// HELPER TYPES
// ============================================================================

interface User {
    id: number;
    name: string;
    email: string;
}


// ============================================================================
// EXPORTS
// ============================================================================

export {
    formatValue,
    makeSound,
    getUserInfo,
    handleState,
    isFish,
    assertIsString,
    assertDefined,
    isStringArray,
    isNotNull,
    filterNullish,
    isSuccess
};
