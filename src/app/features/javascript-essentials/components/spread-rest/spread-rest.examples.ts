/**
 * ============================================================================
 * ✨ SPREAD & REST OPERATORS - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * The ... operator (three dots) has two uses:
 * 1. SPREAD: Expands an iterable into individual elements
 * 2. REST: Collects multiple elements into an array/object
 * 
 * WHY IT'S IMPORTANT FOR ANGULAR:
 * - NgRx state management (immutable updates)
 * - Component property copying
 * - Function parameter handling
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ SPREAD: ARRAY OPERATIONS
// ============================================================================

/**
 * Copy arrays (shallow)
 */
const original = [1, 2, 3];
const copy = [...original];           // New array: [1, 2, 3]
const copyLong = Array.from(original); // Alternative

/**
 * Merge arrays
 */
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];     // [1, 2, 3, 4, 5, 6]

/**
 * Add elements (at beginning, middle, end)
 */
const addStart = [0, ...original];     // [0, 1, 2, 3]
const addEnd = [...original, 4];       // [1, 2, 3, 4]
const addMiddle = [1, ...arr2, 7];     // [1, 4, 5, 6, 7]

/**
 * Remove elements (immutably)
 */
const items = ['a', 'b', 'c', 'd'];
const withoutSecond = [...items.slice(0, 1), ...items.slice(2)];  // ['a', 'c', 'd']

/**
 * Convert iterable to array
 */
const str = 'hello';
const chars = [...str];  // ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 2, 3]);
const uniqueArr = [...set];  // [1, 2, 3]


// ============================================================================
// 2️⃣ SPREAD: OBJECT OPERATIONS
// ============================================================================

/**
 * Copy objects (shallow)
 */
const user = { name: 'John', age: 30 };
const userCopy = { ...user };          // New object with same properties

/**
 * Merge objects
 */
const defaults = { theme: 'light', language: 'en' };
const userPrefs = { theme: 'dark' };
const settings = { ...defaults, ...userPrefs };  // { theme: 'dark', language: 'en' }
// Later properties override earlier ones!

/**
 * Update specific properties (immutably) - CRITICAL FOR NgRx
 */
const updatedUser = {
    ...user,
    age: 31  // Override age, keep other properties
};

/**
 * Add new properties
 */
const withEmail = {
    ...user,
    email: 'john@example.com'
};

/**
 * Remove properties (with destructuring)
 */
const { age, ...userWithoutAge } = user;
// userWithoutAge = { name: 'John' }


// ============================================================================
// 3️⃣ REST: FUNCTION PARAMETERS
// ============================================================================

/**
 * Collect remaining arguments into array
 */
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2);           // 3
sum(1, 2, 3, 4, 5);  // 15

/**
 * Named parameters + rest
 */
function greet(greeting: string, ...names: string[]): string {
    return `${greeting}, ${names.join(' and ')}!`;
}

greet('Hello', 'John', 'Jane', 'Bob');  // "Hello, John and Jane and Bob!"

/**
 * With typed tuple-like behavior
 */
function logData(first: string, second: number, ...rest: boolean[]): void {
    console.log(first, second, rest);
}

logData('test', 42, true, false, true);


// ============================================================================
// 4️⃣ REST: DESTRUCTURING
// ============================================================================

/**
 * Array destructuring with rest
 */
const numbers2 = [1, 2, 3, 4, 5];
const [first, second, ...remaining] = numbers2;
// first = 1, second = 2, remaining = [3, 4, 5]

/**
 * Object destructuring with rest
 */
interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

const userData: UserData = { id: 1, name: 'John', email: 'john@test.com', role: 'admin' };
const { id, ...userInfo } = userData;
// id = 1, userInfo = { name: 'John', email: 'john@test.com', role: 'admin' }


// ============================================================================
// 5️⃣ NgRx STATE MANAGEMENT PATTERNS
// ============================================================================

/**
 * These patterns are CRITICAL for NgRx reducers
 * State must be updated IMMUTABLY (never mutate directly)
 */

// State interface
interface AppState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

// Initial state
const initialState: AppState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

/**
 * Pattern 1: Update a simple property
 */
function setLoading(state: AppState, loading: boolean): AppState {
    return {
        ...state,
        loading  // Shorthand for loading: loading
    };
}

/**
 * Pattern 2: Add item to array
 */
function addUser(state: AppState, user: User): AppState {
    return {
        ...state,
        users: [...state.users, user]
    };
}

/**
 * Pattern 3: Remove item from array
 */
function removeUser(state: AppState, userId: number): AppState {
    return {
        ...state,
        users: state.users.filter(u => u.id !== userId)
    };
}

/**
 * Pattern 4: Update item in array
 */
function updateUser(state: AppState, updatedUser: User): AppState {
    return {
        ...state,
        users: state.users.map(u =>
            u.id === updatedUser.id ? updatedUser : u
        )
    };
}

/**
 * Pattern 5: Update nested property
 */
function updateUserEmail(state: AppState, userId: number, email: string): AppState {
    return {
        ...state,
        users: state.users.map(u =>
            u.id === userId
                ? { ...u, email }  // Create new user object with updated email
                : u
        )
    };
}

/**
 * Pattern 6: Reset state
 */
function resetState(): AppState {
    return {
        ...initialState
    };
}


// ============================================================================
// 6️⃣ ANGULAR COMPONENT PATTERNS
// ============================================================================

/**
 * Merge component config with defaults
 */
interface ComponentConfig {
    theme: 'light' | 'dark';
    showHeader: boolean;
    animationDuration: number;
}

const defaultConfig: ComponentConfig = {
    theme: 'light',
    showHeader: true,
    animationDuration: 300
};

function createComponent(userConfig: Partial<ComponentConfig>): ComponentConfig {
    return {
        ...defaultConfig,
        ...userConfig
    };
}

const customComponent = createComponent({ theme: 'dark' });
// { theme: 'dark', showHeader: true, animationDuration: 300 }

/**
 * Props forwarding pattern
 */
interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

interface IconButtonProps extends ButtonProps {
    icon: string;
}

function createIconButton(props: IconButtonProps) {
    const { icon, ...buttonProps } = props;
    // buttonProps can be spread to child button component
    return { icon, buttonProps };
}


// ============================================================================
// 7️⃣ ADVANCED PATTERNS
// ============================================================================

/**
 * Deep clone (for nested objects)
 * Note: Spread only does SHALLOW copy!
 */
function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// Alternative with structuredClone (modern browsers)
// const clone = structuredClone(original);

/**
 * Conditional spread
 */
interface Options {
    name: string;
    debug?: boolean;
}

function createOptions(debug: boolean): Options {
    return {
        name: 'MyApp',
        ...(debug && { debug: true })  // Only include if debug is true
    };
}

/**
 * Array deduplication
 */
function unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

const duplicates = [1, 2, 2, 3, 3, 3];
const uniqueNumbers = unique(duplicates);  // [1, 2, 3]


// ============================================================================
// EXPORTS
// ============================================================================

export {
    sum,
    greet,
    setLoading,
    addUser,
    removeUser,
    updateUser,
    updateUserEmail,
    createComponent,
    deepClone,
    unique
};

export type {
    AppState,
    ComponentConfig
};
