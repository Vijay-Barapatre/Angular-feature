/**
 * ============================================================================
 * 📤 DESTRUCTURING - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * Destructuring allows you to extract values from objects and arrays
 * into distinct variables using a concise syntax.
 * 
 * WHY USE DESTRUCTURING?
 * - Cleaner, more readable code
 * - Extract only what you need
 * - Perfect for function parameters
 * - Common in Angular (route params, HTTP responses)
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ OBJECT DESTRUCTURING - BASICS
// ============================================================================

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: 'admin' | 'user';
}

const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    role: 'admin'
};

/**
 * Basic extraction
 */
const { name, email } = user;
console.log(name);   // 'John Doe'
console.log(email);  // 'john@example.com'

/**
 * All properties
 */
const { id, name: userName, email: userEmail, age, role } = user;


// ============================================================================
// 2️⃣ OBJECT DESTRUCTURING - ADVANCED
// ============================================================================

/**
 * Renaming/Aliasing
 * Syntax: { originalName: newName }
 */
const { name: fullName, email: contactEmail } = user;
console.log(fullName);      // 'John Doe'
console.log(contactEmail);  // 'john@example.com'

/**
 * Default values
 * Used when property is undefined
 */
interface Config {
    theme?: string;
    timeout?: number;
    retries?: number;
}

const config: Config = { timeout: 5000 };
const { theme = 'light', timeout = 3000, retries = 3 } = config;
console.log(theme);    // 'light' (default)
console.log(timeout);  // 5000 (from object)
console.log(retries);  // 3 (default)

/**
 * Combining rename and default
 */
const { theme: appTheme = 'dark' } = config;

/**
 * Nested destructuring
 */
interface UserWithAddress {
    name: string;
    address: {
        city: string;
        country: string;
        zip: string;
    };
}

const userWithAddress: UserWithAddress = {
    name: 'Jane',
    address: {
        city: 'New York',
        country: 'USA',
        zip: '10001'
    }
};

const { address: { city, country } } = userWithAddress;
console.log(city);     // 'New York'
console.log(country);  // 'USA'


// ============================================================================
// 3️⃣ ARRAY DESTRUCTURING
// ============================================================================

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

/**
 * Basic extraction
 */
const [first, second] = colors;
console.log(first);   // 'red'
console.log(second);  // 'green'

/**
 * Skip elements
 */
const [, , third] = colors;
console.log(third);  // 'blue'

const [primary, , , accent] = colors;
console.log(primary);  // 'red'
console.log(accent);   // 'yellow'

/**
 * Rest pattern - collect remaining elements
 */
const [firstColor, ...restColors] = colors;
console.log(firstColor);  // 'red'
console.log(restColors);  // ['green', 'blue', 'yellow', 'purple']

/**
 * Default values
 */
const [a, b, c = 'default'] = ['x', 'y'];
console.log(c);  // 'default'

/**
 * Swap variables without temp
 */
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2, 1


// ============================================================================
// 4️⃣ FUNCTION PARAMETER DESTRUCTURING
// ============================================================================

/**
 * Object parameter destructuring
 * Instead of: function createUser(options) { options.name... }
 */
interface CreateUserOptions {
    name: string;
    email: string;
    role?: 'admin' | 'user';
    active?: boolean;
}

function createUser({ name, email, role = 'user', active = true }: CreateUserOptions): User {
    return {
        id: Date.now(),
        name,
        email,
        role,
        age: 0
    };
}

// Clean function call
createUser({ name: 'Alice', email: 'alice@test.com' });

/**
 * Array parameter destructuring
 */
function getFirstAndRest<T>([first, ...rest]: T[]): { first: T; rest: T[] } {
    return { first, rest };
}

const result = getFirstAndRest([1, 2, 3, 4, 5]);
console.log(result.first);  // 1
console.log(result.rest);   // [2, 3, 4, 5]

/**
 * Destructure callback parameters
 */
const users: User[] = [
    { id: 1, name: 'John', email: 'john@test.com', age: 30, role: 'admin' },
    { id: 2, name: 'Jane', email: 'jane@test.com', age: 25, role: 'user' }
];

// Extract only what's needed in callback
users.forEach(({ name, email }) => {
    console.log(`${name}: ${email}`);
});

// Map with destructuring
const userEmails = users.map(({ email }) => email);


// ============================================================================
// 5️⃣ NgRx REDUCER DESTRUCTURING
// ============================================================================

/**
 * Common pattern in NgRx reducers
 */
interface AppState {
    users: User[];
    selectedId: number | null;
    loading: boolean;
}

// Action with payload
interface UpdateUserAction {
    type: 'UPDATE_USER';
    payload: {
        userId: number;
        changes: Partial<User>;
    };
}

/**
 * Destructure action payload in reducer
 */
function reducer(state: AppState, action: UpdateUserAction): AppState {
    // Destructure payload
    const { userId, changes } = action.payload;

    return {
        ...state,
        users: state.users.map(user =>
            user.id === userId
                ? { ...user, ...changes }
                : user
        )
    };
}


// ============================================================================
// 6️⃣ ANGULAR HTTP RESPONSE DESTRUCTURING
// ============================================================================

/**
 * Destructure Observable emissions
 * 
 * this.http.get<ApiResponse<User>>('/api/user').subscribe({
 *     next: ({ data, status, message }) => {
 *         this.user = data;
 *         console.log(`Status: ${status}, Message: ${message}`);
 *     }
 * });
 */

/**
 * Destructure route params
 * 
 * this.route.params.subscribe(({ id, type }) => {
 *     this.loadItem(id, type);
 * });
 */

/**
 * Destructure query params
 * 
 * this.route.queryParams.subscribe(({ page = 1, sort = 'name' }) => {
 *     this.loadPage(page, sort);
 * });
 */


// ============================================================================
// 7️⃣ ADVANCED PATTERNS
// ============================================================================

/**
 * Mixed destructuring (object + array)
 */
interface ApiResponse<T> {
    data: T;
    meta: {
        total: number;
        pages: [number, number, number];  // [current, total, perPage]
    };
}

const response: ApiResponse<User[]> = {
    data: users,
    meta: {
        total: 100,
        pages: [1, 10, 10]
    }
};

const {
    data: userList,
    meta: {
        total,
        pages: [currentPage, totalPages]
    }
} = response;

/**
 * Destructure with computed property names
 */
const key = 'name';
const { [key]: userName2 } = user;
console.log(userName2);  // 'John Doe'

/**
 * Function returning multiple values (using array)
 */
function getMinMax(numbers: number[]): [number, number] {
    return [Math.min(...numbers), Math.max(...numbers)];
}

const [min, max] = getMinMax([5, 2, 8, 1, 9]);
console.log(min, max);  // 1, 9

/**
 * Function returning named values (using object)
 */
function getStats(numbers: number[]): { min: number; max: number; avg: number } {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return {
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        avg: sum / numbers.length
    };
}

const { min: minVal, max: maxVal, avg } = getStats([1, 2, 3, 4, 5]);


// ============================================================================
// EXPORTS
// ============================================================================

export {
    createUser,
    getFirstAndRest,
    getMinMax,
    getStats
};

export type {
    User,
    Config,
    CreateUserOptions,
    ApiResponse
};
