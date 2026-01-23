/**
 * ============================================================================
 * ➡️ ARROW FUNCTIONS - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT PROBLEM DOES THIS SOLVE?                                        │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. 'this' CONTEXT NIGHTMARE:                                            │
 * │    - Traditional functions: 'this' depends on HOW function is called   │
 * │    - Arrow functions: 'this' depends on WHERE function is defined      │
 * │    - Before: setTimeout(function() { this.count++ }, 1000); // BROKEN! │
 * │    - After:  setTimeout(() => { this.count++ }, 1000); // WORKS!       │
 * │                                                                         │
 * │ 2. VERBOSE SYNTAX:                                                      │
 * │    - Before: function(x) { return x * 2; }                             │
 * │    - After:  x => x * 2                                                │
 * │                                                                         │
 * │ 3. CALLBACK HELL READABILITY:                                           │
 * │    - Array methods with traditional functions are verbose              │
 * │    - Arrow functions make functional programming readable              │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📋 WHEN TO USE                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ USE ARROW FUNCTIONS WHEN:                                               │
 * │   ✅ Callbacks in setTimeout, setInterval                              │
 * │   ✅ Array methods (map, filter, reduce, etc.)                        │
 * │   ✅ RxJS operators and subscriptions                                  │
 * │   ✅ Event handlers in Angular components                              │
 * │   ✅ You need to preserve 'this' context                              │
 * │   ✅ Short, inline functions                                          │
 * │                                                                         │
 * │ AVOID ARROW FUNCTIONS WHEN:                                             │
 * │   ❌ Object methods that need dynamic 'this'                          │
 * │   ❌ Prototype methods                                                 │
 * │   ❌ Constructors (arrow functions can't be constructors)             │
 * │   ❌ When you need 'arguments' object                                 │
 * │   ❌ DOM event handlers that need 'this' to be the element            │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ SYNTAX VARIATIONS
// ============================================================================

/**
 * PROBLEM: Traditional function syntax is verbose
 * SOLUTION: Arrow function provides concise alternatives
 */

// Full syntax (with braces and explicit return)
// USE WHEN: Multiple statements needed
const addFull = (a: number, b: number): number => {
    const sum = a + b;
    return sum;  // Must use return with braces
};

// Concise syntax (implicit return)
// USE WHEN: Single expression to return
const addConcise = (a: number, b: number): number => a + b;

// Single parameter (parentheses optional in plain JS)
// Note: TypeScript usually needs type annotation
const double = (n: number): number => n * 2;

// No parameters
const getTimestamp = (): number => Date.now();
const sayHello = () => console.log('Hello!');

/**
 * PROBLEM: Returning object literal looks like function body
 * SOLUTION: Wrap object in parentheses
 */
const createUser = (name: string, age: number) => ({
    name,
    age,
    createdAt: new Date()
});


// ============================================================================
// 2️⃣ 'this' BINDING - THE CRITICAL DIFFERENCE
// ============================================================================

/**
 * PROBLEM: Traditional functions lose 'this' context in callbacks
 * 
 * This is the #1 reason arrow functions were created!
 */

class CounterTraditional {
    count = 0;

    /**
     * ❌ BROKEN: 'this' is undefined/window in the callback
     */
    incrementBroken() {
        setTimeout(function () {
            // this.count++;  // ERROR! 'this' is not CounterTraditional
            // In strict mode: 'this' is undefined
            // In non-strict: 'this' is window/global
        }, 1000);
    }

    /**
     * OLD WORKAROUND #1: Save 'this' reference
     */
    incrementWithThat() {
        const that = this;  // Save reference before callback
        setTimeout(function () {
            that.count++;  // Works, but ugly
        }, 1000);
    }

    /**
     * OLD WORKAROUND #2: Use .bind(this)
     */
    incrementWithBind() {
        setTimeout(function (this: CounterTraditional) {
            this.count++;
        }.bind(this), 1000);  // Explicitly bind 'this'
    }
}

/**
 * SOLUTION: Arrow functions inherit 'this' from enclosing scope
 * 
 * 'this' is determined when arrow function is DEFINED, not called
 */
class CounterArrow {
    count = 0;

    /**
     * ✅ WORKS: Arrow function preserves 'this'
     */
    increment() {
        setTimeout(() => {
            this.count++;  // 'this' refers to CounterArrow instance!
            console.log(this.count);
        }, 1000);
    }

    /**
     * ✅ ALSO WORKS: Arrow function as class property
     * Guaranteed to always have correct 'this', even when passed as callback
     */
    decrement = () => {
        this.count--;
        console.log(this.count);
    };
}

// Why this matters in Angular:
// When you pass a method as a callback, it loses 'this' context
// Arrow functions prevent this problem


// ============================================================================
// 3️⃣ ARRAY METHOD CALLBACKS
// ============================================================================

/**
 * PROBLEM: Transforming/filtering arrays requires verbose code
 * SOLUTION: Arrow functions make array operations readable
 */

interface User {
    id: number;
    name: string;
    age: number;
    active: boolean;
}

const users: User[] = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 35, active: true }
];

/**
 * map - transform each element
 * USE WHEN: You need a new array with each element transformed
 */
const names = users.map(user => user.name);
// ['Alice', 'Bob', 'Charlie']

const userDTOs = users.map(({ id, name }) => ({ id, name }));
// Strip to just id and name

/**
 * filter - select elements matching condition
 * USE WHEN: You need a subset of the array
 */
const activeUsers = users.filter(user => user.active);
const adults = users.filter(user => user.age >= 18);

/**
 * find - get first element matching condition
 * USE WHEN: You need one specific item
 */
const alice = users.find(user => user.name === 'Alice');

/**
 * some/every - test array for conditions
 * USE WHEN: You need a boolean answer about the array
 */
const hasInactive = users.some(user => !user.active);  // true
const allAdults = users.every(user => user.age >= 18); // true

/**
 * reduce - accumulate into single value
 * USE WHEN: You need to compute a single value from all elements
 */
const totalAge = users.reduce((sum, user) => sum + user.age, 0);

const userMap = users.reduce((map, user) => {
    map[user.id] = user;
    return map;
}, {} as Record<number, User>);

/**
 * sort - order elements
 * USE WHEN: Array needs to be in a specific order
 */
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
const sortedByName = [...users].sort((a, b) => a.name.localeCompare(b.name));


// ============================================================================
// 4️⃣ RxJS WITH ARROW FUNCTIONS
// ============================================================================

/**
 * PROBLEM: RxJS operators need callback functions
 * SOLUTION: Arrow functions keep code readable and 'this' correct
 *
 * this.http.get<User[]>('/api/users').pipe(
 *     map(users => users.filter(u => u.active)),    // Transform data
 *     map(users => users.map(u => u.name)),         // Transform again
 *     catchError(error => of([]))                   // Handle errors
 * ).subscribe(names => {
 *     this.names = names;  // 'this' works because of arrow function!
 * });
 */

/**
 * Subscription with arrow function
 *
 * this.userService.user$.subscribe(user => {
 *     this.currentUser = user;  // 'this' is component, not undefined!
 * });
 */


// ============================================================================
// 5️⃣ HIGHER-ORDER FUNCTIONS
// ============================================================================

/**
 * PROBLEM: Need to create specialized functions at runtime
 * SOLUTION: Function that returns a function (currying)
 * 
 * WHEN TO USE:
 * - Partial application (pre-filling some arguments)
 * - Creating function factories
 */
const multiply = (a: number) => (b: number): number => a * b;

const multiplyBy2 = multiply(2);   // Creates x => 2 * x
const multiplyBy10 = multiply(10); // Creates x => 10 * x

console.log(multiplyBy2(5));   // 10
console.log(multiplyBy10(5));  // 50

/**
 * PROBLEM: Need to apply transformation twice
 * SOLUTION: Higher-order function taking function as argument
 */
const applyTwice = <T>(fn: (x: T) => T, value: T): T => fn(fn(value));

const addOne = (n: number) => n + 1;
console.log(applyTwice(addOne, 5));  // 7 (5 + 1 + 1)

/**
 * PROBLEM: Need to compose multiple transformations
 * SOLUTION: Compose function chains functions together
 */
const compose = <T>(...fns: ((x: T) => T)[]) => (value: T): T =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const addTwo = (n: number) => n + 2;
const multiplyByThree = (n: number) => n * 3;

const combined = compose(multiplyByThree, addTwo);  // (x + 2) * 3
console.log(combined(5));  // 21


// ============================================================================
// 6️⃣ IMMEDIATELY INVOKED ARROW FUNCTIONS (IIFE)
// ============================================================================

/**
 * PROBLEM: Need to compute a value from complex logic at initialization
 * SOLUTION: IIFE executes immediately and returns result
 * 
 * WHEN TO USE:
 * - Complex initialization logic
 * - Conditional configuration
 * - Async initialization
 */
const config = (() => {
    const env = (typeof process !== 'undefined' && process.env?.['NODE_ENV']) || 'development';
    return {
        apiUrl: env === 'production'
            ? 'https://api.example.com'
            : 'http://localhost:3000',
        debug: env !== 'production'
    };
})();

/**
 * Async IIFE for top-level await alternative
 */
(async () => {
    // Can use await here without async function wrapper
    // const data = await fetch('/api/init');
})();


// ============================================================================
// 7️⃣ WHEN NOT TO USE ARROW FUNCTIONS
// ============================================================================

/**
 * ❌ PROBLEM: Object method needs dynamic 'this'
 * Arrow function would capture wrong 'this'
 */
const calculator = {
    value: 0,

    // ❌ Arrow function - 'this' is NOT the calculator object
    // addWrong: (n: number) => { this.value += n; },  // this is undefined!

    // ✅ Regular function - 'this' IS the calculator object
    add(n: number) {
        this.value += n;
        return this;  // For chaining
    },

    // ✅ Shorthand method syntax also works
    subtract(n: number) {
        this.value -= n;
        return this;
    }
};

calculator.add(5).subtract(2);  // Works!

/**
 * ❌ PROBLEM: Prototype methods need dynamic 'this'
 */
function Person(this: any, name: string) {
    this.name = name;
}

// ✅ Use regular function for prototype methods
Person.prototype.greet = function () {
    return `Hello, I'm ${this.name}`;  // 'this' is the Person instance
};

/**
 * ❌ PROBLEM: DOM event handler needs 'this' to be the element
 * 
 * // If you need 'this' to be the clicked element:
 * button.addEventListener('click', function() {
 *     this.classList.add('clicked');  // 'this' is the button element
 * });
 * 
 * // Arrow function won't work:
 * button.addEventListener('click', () => {
 *     this.classList.add('clicked');  // 'this' is NOT the button!
 * });
 */


// ============================================================================
// 8️⃣ ANGULAR COMPONENT PATTERNS
// ============================================================================

/**
 * Angular Component with arrow function best practices
 */
class UserComponent {
    users: User[] = [];
    selectedUser: User | null = null;
    loading = false;

    /**
     * ✅ Arrow function for async callbacks
     * Ensures 'this' refers to component in all async operations
     */
    loadUsers = async (): Promise<void> => {
        this.loading = true;
        // const users = await firstValueFrom(this.http.get<User[]>('/api'));
        // this.users = users;  // 'this' is guaranteed to be UserComponent
        this.loading = false;
    };

    /**
     * ✅ Arrow function for event handlers passed to child components
     * When passing method as @Input callback, arrow ensures correct 'this'
     */
    onUserSelect = (user: User): void => {
        this.selectedUser = user;
    };

    /**
     * Regular method is fine when called directly
     * 'this' context is preserved by Angular's template binding
     */
    handleClick(): void {
        console.log('Clicked');
    }

    /**
     * ✅ Arrow for methods used in template expressions
     */
    getActiveUsers = (): User[] => this.users.filter(u => u.active);

    /**
     * ✅ Arrow for trackBy in *ngFor (ensures consistent 'this')
     */
    trackByUserId = (_: number, user: User): number => user.id;
}


// ============================================================================
// EXPORTS
// ============================================================================

export {
    addFull,
    addConcise,
    double,
    createUser,
    multiply,
    compose,
    applyTwice,
    CounterArrow,
    UserComponent
};
