/**
 * ============================================================================
 * 🔀 UNION & INTERSECTION TYPES - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT PROBLEM DOES THIS SOLVE?                                        │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. TYPE FLEXIBILITY: When a value can legitimately be multiple types    │
 * │    - API that returns string IDs or number IDs                         │
 * │    - Form field that accepts text or number input                      │
 * │    - Function parameter that handles different shapes                  │
 * │                                                                         │
 * │ 2. STATE MANAGEMENT: Model different states in a type-safe way         │
 * │    - Loading/Success/Error states (can only be ONE at a time)         │
 * │    - Different action types in NgRx reducers                          │
 * │    - API responses that vary based on success/failure                 │
 * │                                                                         │
 * │ 3. COMPOSING TYPES: Build complex types from simpler ones              │
 * │    - Add timestamps to any entity                                     │
 * │    - Combine user with permissions                                    │
 * │    - Mix base config with environment-specific settings               │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📋 WHEN TO USE                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ USE UNION (|) WHEN:                                                     │
 * │   ✅ A value can be one of several types (string | number)             │
 * │   ✅ Modeling mutually exclusive states (loading | success | error)   │
 * │   ✅ Restricting to specific literal values ('admin' | 'user')        │
 * │   ✅ Making values nullable (User | null)                              │
 * │                                                                         │
 * │ USE INTERSECTION (&) WHEN:                                              │
 * │   ✅ Combining multiple interfaces (User & Timestamps)                │
 * │   ✅ Adding properties to existing types                               │
 * │   ✅ Creating mixins (Serializable & Printable)                       │
 * │   ✅ Extending third-party types without modifying them               │
 * │                                                                         │
 * │ AVOID WHEN:                                                             │
 * │   ❌ Simple inheritance works (use interface extends instead)         │
 * │   ❌ Union has too many types (consider refactoring)                  │
 * │   ❌ Types are unrelated (probably a design issue)                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ UNION TYPES - "OR" (ONE OF)
// ============================================================================

/**
 * PROBLEM: I need a variable that can hold different types
 * SOLUTION: Union type allows the variable to be any of the specified types
 * 
 * REAL-WORLD EXAMPLE: Database IDs might be strings (MongoDB) or numbers (SQL)
 */
type StringOrNumber = string | number;

let id: StringOrNumber;
id = 'abc';  // ✅ Valid - using string ID (e.g., MongoDB ObjectId)
id = 123;    // ✅ Valid - using number ID (e.g., SQL auto-increment)
// id = true;  // ❌ Error - boolean not allowed

/**
 * PROBLEM: I want to restrict a value to specific options only
 * SOLUTION: Literal union type enforces exact values at compile time
 * 
 * WHEN TO USE:
 * - Dropdown options
 * - Configuration values
 * - Status fields
 */
type Direction = 'up' | 'down' | 'left' | 'right';
type Status = 'pending' | 'active' | 'completed' | 'cancelled';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

function move(direction: Direction): void {
    console.log(`Moving ${direction}`);
}

move('up');    // ✅ Valid
// move('diagonal');  // ❌ Error: not a valid direction - CAUGHT AT COMPILE TIME!

/**
 * PROBLEM: A value might not exist (could be null/undefined)
 * SOLUTION: Explicit union with null/undefined makes it clear and safe
 * 
 * WHEN TO USE:
 * - API responses that might not find data
 * - Optional configuration
 * - Uninitialized state
 */
type NullableString = string | null;
type OptionalNumber = number | undefined;
type Maybe<T> = T | null | undefined;

function findUser(id: number): User | null {
    // Return user or null if not found
    // Caller MUST handle null case - TypeScript enforces this!
    return null;
}


// ============================================================================
// 2️⃣ DISCRIMINATED UNIONS (TAGGED UNIONS)
// ============================================================================

/**
 * PROBLEM: I have multiple possible states with different data shapes
 * SOLUTION: Discriminated union with a common "tag" property
 * 
 * THIS IS THE #1 PATTERN FOR:
 * - Component state management
 * - API response handling
 * - NgRx action discrimination
 * - Form state tracking
 * 
 * WHY IT'S POWERFUL:
 * - TypeScript automatically narrows the type based on the discriminant
 * - Exhaustive checking ensures you handle all cases
 * - Each state has only the properties that make sense for it
 */

interface LoadingState {
    status: 'loading';  // Discriminant property
    // No data in loading state - makes sense!
}

interface SuccessState<T> {
    status: 'success';  // Discriminant property
    data: T;            // Only available on success
}

interface ErrorState {
    status: 'error';    // Discriminant property
    error: string;      // Only available on error
    code?: number;
}

type RequestState<T> = LoadingState | SuccessState<T> | ErrorState;

/**
 * TypeScript narrows the type automatically in switch/if statements
 * This is TYPE-SAFE state handling!
 */
function handleState<T>(state: RequestState<T>): string {
    switch (state.status) {
        case 'loading':
            // state is LoadingState here - no data property exists
            return 'Loading...';

        case 'success':
            // state is SuccessState<T> here - data IS available
            return `Loaded: ${JSON.stringify(state.data)}`;

        case 'error':
            // state is ErrorState here - error IS available
            return `Error ${state.code ?? 'unknown'}: ${state.error}`;
    }
    // If you add a new status and forget to handle it, TypeScript will error!
}

/**
 * REAL-WORLD ANGULAR COMPONENT STATE
 * 
 * PROBLEM: Component needs to show loading, data, or error UI
 * SOLUTION: Discriminated union ensures correct data for each state
 */
interface User {
    id: number;
    name: string;
    email: string;
}

type UsersState =
    | { status: 'idle' }                           // Initial, no action taken
    | { status: 'loading' }                        // Fetching data
    | { status: 'success'; users: User[] }         // Data loaded
    | { status: 'error'; message: string };        // Error occurred


// ============================================================================
// 3️⃣ INTERSECTION TYPES - "AND" (BOTH)
// ============================================================================

/**
 * PROBLEM: I want to combine multiple types into one
 * SOLUTION: Intersection type requires ALL properties from ALL types
 * 
 * WHEN TO USE:
 * - Adding common properties (timestamps, audit info)
 * - Mixing behaviors (serializable + printable)
 * - Extending types you don't control
 */

interface WithId {
    id: number;
}

interface WithTimestamps {
    createdAt: Date;
    updatedAt: Date;
}

interface WithSoftDelete {
    deletedAt?: Date;
    isDeleted: boolean;
}

/**
 * PROBLEM: All my entities need ID and timestamps
 * SOLUTION: Intersect common interfaces with entity-specific ones
 */
type BaseEntity = WithId & WithTimestamps;

type SoftDeletableEntity = WithId & WithTimestamps & WithSoftDelete;

// Must have ALL properties from ALL intersected types
const entity: SoftDeletableEntity = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
    // deletedAt is optional
};

/**
 * PROBLEM: I want to add properties to an existing type
 * SOLUTION: Intersect the original type with additional properties
 */
type UserEntity = User & WithId & WithTimestamps;


// ============================================================================
// 4️⃣ COMBINING UNION AND INTERSECTION
// ============================================================================

/**
 * PROBLEM: API responses have common fields but different payloads
 * SOLUTION: Base type intersection + union for variants
 */

interface ApiResponseBase {
    timestamp: Date;
    requestId: string;
}

interface ApiSuccess<T> extends ApiResponseBase {
    success: true;   // Literal type for discrimination
    data: T;
}

interface ApiError extends ApiResponseBase {
    success: false;  // Literal type for discrimination
    error: {
        code: string;
        message: string;
    };
}

type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * PROBLEM: Need to handle both success and error responses safely
 * SOLUTION: Check discriminant, TypeScript narrows automatically
 */
function handleApiResponse<T>(response: ApiResponse<T>): T | null {
    if (response.success) {
        // TypeScript knows: response is ApiSuccess<T>
        // response.data is available and correctly typed!
        return response.data;
    } else {
        // TypeScript knows: response is ApiError
        // response.error is available!
        console.error(`Error ${response.error.code}: ${response.error.message}`);
        return null;
    }
}


// ============================================================================
// 5️⃣ TYPE NARROWING WITH UNIONS
// ============================================================================

/**
 * PROBLEM: I have a union type but need to do type-specific operations
 * SOLUTION: Use type guards to narrow the type
 */

type StringOrNumberArray = string[] | number[];

function processArray(arr: StringOrNumberArray): void {
    // Common method works on both
    console.log(arr.length);

    // PROBLEM: Can't use string methods on potentially number array
    // SOLUTION: Narrow the type first with Array.isArray check
    if (arr.length > 0 && typeof arr[0] === 'string') {
        // TypeScript knows arr is string[]
        (arr as string[]).forEach(s => console.log(s.toUpperCase()));
    } else if (arr.length > 0) {
        // TypeScript knows arr is number[]
        const sum = (arr as number[]).reduce((a, b) => a + b, 0);
        console.log(sum);
    }
}

/**
 * PROBLEM: Need to differentiate objects by their properties
 * SOLUTION: Use 'in' operator for narrowing
 */
interface Dog {
    bark(): void;
}

interface Cat {
    meow(): void;
}

type Pet = Dog | Cat;

function speak(pet: Pet): void {
    if ('bark' in pet) {
        pet.bark();  // TypeScript knows: pet is Dog
    } else {
        pet.meow();  // TypeScript knows: pet is Cat
    }
}


// ============================================================================
// 6️⃣ FUNCTION OVERLOADS WITH UNIONS
// ============================================================================

/**
 * PROBLEM: Function behavior varies based on input type
 * SOLUTION: Overloaded signatures + union implementation
 * 
 * WHEN TO USE:
 * - Library functions that accept multiple types
 * - Utility functions with type-dependent return types
 */
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;
function format(value: string | number | Date): string {
    if (typeof value === 'string') {
        return value.trim();
    }
    if (typeof value === 'number') {
        return value.toFixed(2);
    }
    return value.toISOString();
}

// TypeScript knows the return type based on input
const formattedString = format('  hello  ');  // string
const formattedNumber = format(42.123);       // string
const formattedDate = format(new Date());     // string


// ============================================================================
// 7️⃣ CONDITIONAL TYPES
// ============================================================================

/**
 * PROBLEM: Type should change based on another type
 * SOLUTION: Conditional types with extends
 * 
 * WHEN TO USE:
 * - Generic utilities that vary by type
 * - Extracting types from complex types
 * - Type-level programming
 */
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

/**
 * PROBLEM: Need to extract specific types from a union
 * SOLUTION: Conditional type with never for filtering
 */
type ExtractString<T> = T extends string ? T : never;

type Mixed = 'a' | 'b' | 1 | 2;
type OnlyStrings = ExtractString<Mixed>;  // 'a' | 'b'

/**
 * PROBLEM: Need to get the return type of a function
 * SOLUTION: Infer keyword extracts types
 */
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User {
    return { id: 1, name: 'John', email: 'john@test.com' };
}

type UserReturnType = ReturnTypeOf<typeof getUser>;  // User


// ============================================================================
// 8️⃣ ANGULAR USE CASES
// ============================================================================

/**
 * PROBLEM: Component has multiple states and each needs different handling
 * SOLUTION: Discriminated union for type-safe state management
 * 
 * BENEFITS:
 * - TypeScript ensures you handle all states
 * - Each state has exactly the right properties
 * - Template can use type guards for conditional rendering
 */
type ComponentState<T> =
    | { type: 'initial' }
    | { type: 'loading' }
    | { type: 'loaded'; data: T }
    | { type: 'error'; error: Error };

class DataComponent {
    state: ComponentState<User[]> = { type: 'initial' };

    async loadData(): Promise<void> {
        this.state = { type: 'loading' };

        try {
            const data = await fetch('/api/users').then(r => r.json());
            this.state = { type: 'loaded', data };
        } catch (e) {
            this.state = { type: 'error', error: e as Error };
        }
    }

    /**
     * Template helper - type-safe state rendering
     */
    renderState(): string {
        switch (this.state.type) {
            case 'initial': return 'Click to load';
            case 'loading': return 'Loading...';
            case 'loaded': return `${this.state.data.length} users`;
            case 'error': return `Error: ${this.state.error.message}`;
        }
    }
}

/**
 * PROBLEM: NgRx reducer needs to handle different actions
 * SOLUTION: Union of action types with discriminated type property
 */
interface LoadUsersAction {
    type: '[Users] Load';
}

interface LoadUsersSuccessAction {
    type: '[Users] Load Success';
    payload: User[];
}

interface LoadUsersFailureAction {
    type: '[Users] Load Failure';
    payload: { error: string };
}

type UserActions = LoadUsersAction | LoadUsersSuccessAction | LoadUsersFailureAction;


// ============================================================================
// EXPORTS
// ============================================================================

export type {
    StringOrNumber,
    Direction,
    Status,
    RequestState,
    ApiResponse,
    ComponentState,
    UserActions
};

export {
    handleState,
    handleApiResponse,
    format,
    DataComponent
};
