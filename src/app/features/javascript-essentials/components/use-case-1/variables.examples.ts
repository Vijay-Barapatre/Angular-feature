/**
 * ============================================================================
 * 📦 JAVASCRIPT VARIABLES & DATA TYPES - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * This file demonstrates variable declarations, data types, and best practices
 * for JavaScript/TypeScript development in Angular.
 * 
 * KEY CONCEPTS:
 * - var: Function-scoped (AVOID in modern code)
 * - let: Block-scoped, can be reassigned
 * - const: Block-scoped, cannot be reassigned (PREFERRED)
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ VARIABLE DECLARATIONS: var vs let vs const
// ============================================================================

/**
 * ❌ VAR - Function scoped, hoisted, can be redeclared
 * Problems: Leaks out of blocks, confusing hoisting behavior
 */
function varExample(): void {
    // var is hoisted to function scope
    console.log(hoistedVar);  // undefined (not error!)
    var hoistedVar = 'value';

    if (true) {
        var varInBlock = 'I leak out!';
    }
    console.log(varInBlock);  // Works! var ignores block scope

    var duplicate = 1;
    var duplicate = 2;  // No error, can redeclare (BAD!)
}

/**
 * ✅ LET - Block scoped, cannot redeclare
 * Use when you need to reassign the variable
 */
function letExample(): void {
    // let is NOT hoisted (Temporal Dead Zone)
    // console.log(letVar);  // ❌ ReferenceError!
    let letVar = 'value';

    if (true) {
        let letInBlock = 'I stay in block';
    }
    // console.log(letInBlock);  // ❌ ReferenceError!

    let counter = 0;
    counter = 1;  // ✅ Can reassign
    counter++;    // ✅ Can modify

    // let counter = 2;  // ❌ Cannot redeclare in same scope
}

/**
 * ✅ CONST - Block scoped, cannot reassign (PREFERRED)
 * Use by default for most declarations
 */
function constExample(): void {
    const API_URL = 'https://api.example.com';
    // API_URL = 'new-url';  // ❌ Error: Cannot reassign const

    // ⚠️ CONST for objects - reference can't change, but properties can!
    const user = { name: 'John', age: 30 };
    user.name = 'Jane';      // ✅ Can modify properties
    user.age = 31;           // ✅ Can modify properties
    // user = { name: 'Bob' };  // ❌ Cannot reassign reference

    // Same with arrays
    const items: string[] = ['a', 'b'];
    items.push('c');         // ✅ Can modify array
    items[0] = 'x';          // ✅ Can modify elements
    // items = ['new'];      // ❌ Cannot reassign reference
}


// ============================================================================
// 2️⃣ PRIMITIVE DATA TYPES (7 Types)
// ============================================================================

/**
 * JavaScript has 7 primitive types
 * Primitives are IMMUTABLE and passed by VALUE
 */

// STRING - text data
const firstName: string = 'John';
const lastName: string = "Doe";
const greeting: string = `Hello, ${firstName}!`;  // Template literal
const multiLine: string = `
    This is a
    multi-line string
`;

// NUMBER - all numbers (no separate int/float)
const integer: number = 42;
const float: number = 3.14159;
const negative: number = -17;
const scientific: number = 1e6;       // 1,000,000
const hexadecimal: number = 0xff;     // 255
const binary: number = 0b1010;        // 10
const infinity: number = Infinity;
const notANumber: number = NaN;       // Result of invalid math

// BOOLEAN - true or false
const isActive: boolean = true;
const hasPermission: boolean = false;
const isEmpty: boolean = Boolean(0);  // false

// UNDEFINED - variable declared but not assigned
let undefinedVar: undefined;
console.log(undefinedVar);  // undefined

// NULL - intentional absence of value
const emptyValue: null = null;

// SYMBOL - unique identifier (ES6)
const sym1: symbol = Symbol('id');
const sym2: symbol = Symbol('id');
console.log(sym1 === sym2);  // false - always unique!

// BIGINT - large integers (ES2020)
const bigNumber: bigint = 9007199254740991n;
const anotherBig: bigint = BigInt(9007199254740991);


// ============================================================================
// 3️⃣ REFERENCE TYPES (Objects)
// ============================================================================

/**
 * Reference types are passed by REFERENCE, not value
 * Modifying a reference affects the original
 */

// OBJECT - key-value pairs
const person: { name: string; age: number } = {
    name: 'John',
    age: 30
};

// ARRAY - ordered collection
const numbers: number[] = [1, 2, 3, 4, 5];
const mixed: (string | number)[] = [1, 'two', 3];
const matrix: number[][] = [[1, 2], [3, 4]];

// FUNCTION - callable object
const add = (a: number, b: number): number => a + b;
const greet = function (name: string): string {
    return `Hello, ${name}!`;
};

// DATE - date and time
const now: Date = new Date();
const birthday: Date = new Date('1990-01-15');
const timestamp: Date = new Date(1609459200000);

// REGEXP - pattern matching
const emailPattern: RegExp = /^[\w-]+@[\w-]+\.\w+$/;
const phonePattern: RegExp = new RegExp('^\\d{10}$');

// MAP - key-value with any key type
const userRoles = new Map<string, string>();
userRoles.set('john', 'admin');
userRoles.set('jane', 'user');

// SET - unique values only
const uniqueIds = new Set<number>([1, 2, 2, 3, 3]);
console.log(uniqueIds);  // Set { 1, 2, 3 }


// ============================================================================
// 4️⃣ TYPE COERCION & CHECKING
// ============================================================================

/**
 * typeof operator - check primitive types
 */
function checkTypes(): void {
    console.log(typeof 'hello');      // 'string'
    console.log(typeof 42);           // 'number'
    console.log(typeof true);         // 'boolean'
    console.log(typeof undefined);    // 'undefined'
    console.log(typeof null);         // 'object' (historical bug!)
    console.log(typeof Symbol());     // 'symbol'
    console.log(typeof 42n);          // 'bigint'
    console.log(typeof {});           // 'object'
    console.log(typeof []);           // 'object' (arrays are objects)
    console.log(typeof (() => { }));   // 'function'
}

/**
 * Array.isArray() - check if value is array
 */
function checkArray(value: unknown): boolean {
    return Array.isArray(value);
}

/**
 * == vs === (ALWAYS use ===)
 */
function equalityExamples(): void {
    // ❌ Loose equality (==) - performs type coercion
    console.log('5' == 5);         // true (string converted to number)
    console.log(0 == false);       // true
    console.log(null == undefined); // true
    console.log('' == false);      // true

    // ✅ Strict equality (===) - no coercion
    console.log('5' === 5);        // false
    console.log(0 === false);      // false
    console.log(null === undefined); // false
    console.log('' === false);     // false
}

/**
 * Truthy and Falsy values
 */
function truthyFalsyExamples(): void {
    // FALSY values (evaluate to false)
    const falsyValues = [
        false,      // boolean false
        0,          // zero
        -0,         // negative zero
        0n,         // BigInt zero
        '',         // empty string
        null,       // null
        undefined,  // undefined
        NaN         // Not a Number
    ];

    // TRUTHY values (everything else)
    const truthyValues = [
        true,           // boolean true
        1,              // non-zero numbers
        'hello',        // non-empty strings
        [],             // empty array (!)
        {},             // empty object (!)
        () => { },       // functions
        new Date()      // date objects
    ];

    // Practical usage
    const user = { name: '' };
    if (user.name) {
        console.log('Has name');
    } else {
        console.log('No name');  // This runs (empty string is falsy)
    }
}


// ============================================================================
// 5️⃣ NULLISH COALESCING & OPTIONAL CHAINING
// ============================================================================

interface UserProfile {
    name: string;
    settings?: {
        theme?: string;
        notifications?: boolean;
    };
}

function modernOperators(): void {
    const userProfile: UserProfile = { name: 'John' };

    // OPTIONAL CHAINING (?.) - safe property access
    const theme = userProfile.settings?.theme;  // undefined (no error)

    // NULLISH COALESCING (??) - default only for null/undefined
    const notificationSetting = userProfile.settings?.notifications ?? true;

    // DIFFERENCE: ?? vs ||
    const zero = 0;
    console.log(zero || 'default');   // 'default' (0 is falsy)
    console.log(zero ?? 'default');   // 0 (0 is NOT nullish)

    const emptyString = '';
    console.log(emptyString || 'default');  // 'default' ('' is falsy)
    console.log(emptyString ?? 'default');  // '' ('' is NOT nullish)
}


// ============================================================================
// 6️⃣ BEST PRACTICES FOR ANGULAR
// ============================================================================

/**
 * Angular Component Example
 */
class ExampleComponent {
    // ✅ Use const behavior with readonly
    readonly API_ENDPOINT = 'https://api.example.com';
    readonly MAX_RETRIES = 3;

    // ✅ Regular properties for state
    userName: string = 'Guest';
    isLoggedIn: boolean = false;
    items: string[] = [];

    // ✅ Object properties (could be interface)
    config = {
        theme: 'dark',
        language: 'en'
    };

    // ✅ Use definite assignment for required inputs
    userId!: number;  // Will be set by @Input()

    // ✅ Use | undefined for optional values
    selectedItem: string | undefined;

    // ✅ Use | null for explicitly empty values
    error: Error | null = null;
}


// ============================================================================
// EXPORTS
// ============================================================================

export {
    varExample,
    letExample,
    constExample,
    checkTypes,
    equalityExamples,
    modernOperators,
    ExampleComponent
};
