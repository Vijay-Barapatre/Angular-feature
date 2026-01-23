# 📦 Variables & Data Types

> **💡 Key Insight**: JavaScript variables are containers for data. Understanding `var`, `let`, `const`, and data types is **fundamental** to writing Angular applications.


## 📋 Table of Contents
- [1. 🔍 Variable Declarations](#1--variable-declarations)
  - [var vs let vs const](#var-vs-let-vs-const)
  - [📊 Scope Visualization](#scope-visualization)
- [2. 📝 Primitive Data Types (7 Types)](#2--primitive-data-types-7-types)
  - [Primitive vs Reference](#primitive-vs-reference)
- [3. 📦 Reference Types](#3--reference-types)
- [4. ⚠️ Type Coercion](#4--type-coercion)
  - [Loose vs Strict Equality](#loose-vs-strict-equality)
  - [Truthy and Falsy Values](#truthy-and-falsy-values)
- [5. 🅰️ Usage in Angular](#5--usage-in-angular)
  - [Component Properties](#component-properties)
  - [Template Type Safety](#template-type-safety)
  - [Service with Typed Data](#service-with-typed-data)
- [6. ❓ Interview Questions](#6--interview-questions)
  - [Q1: What's the difference between `null` and `undefined`?](#q1-whats-the-difference-between-null-and-undefined)
  - [Q2: Why should you avoid `var` in modern JavaScript?](#q2-why-should-you-avoid-var-in-modern-javascript)
  - [Q3: What's the Temporal Dead Zone (TDZ)?](#q3-whats-the-temporal-dead-zone-tdz)
  - [Q4: Why does `typeof null` return "object"?](#q4-why-does-typeof-null-return-object)
  - [Q5: How do you create a true copy of an object?](#q5-how-do-you-create-a-true-copy-of-an-object)
- [7. 🧠 Quick Reference](#7--quick-reference)
- [🎯 What Problem Does This Solve?](#what-problem-does-this-solve)
  - [The Problem: JavaScript's Loose Typing Causes Runtime Errors](#the-problem-javascripts-loose-typing-causes-runtime-errors)
  - [How Proper Understanding Solves This](#how-proper-understanding-solves-this)
- [📚 Key Concepts Explained in Detail](#key-concepts-explained-in-detail)
  - [1. Hoisting](#1-hoisting)
  - [2. Temporal Dead Zone (TDZ)](#2-temporal-dead-zone-tdz)
  - [3. Primitive vs Reference Types](#3-primitive-vs-reference-types)
  - [4. typeof Operator Quirks](#4-typeof-operator-quirks)
- [🌍 Real-World Use Cases in Angular](#real-world-use-cases-in-angular)
  - [1. Component State Management](#1-component-state-management)
  - [2. Form Validation with Type Checks](#2-form-validation-with-type-checks)
  - [3. Safe Object Updates (Immutability)](#3-safe-object-updates-immutability)
  - [4. Null-safe Property Access](#4-null-safe-property-access)
  - [5. Type Guards for APIs](#5-type-guards-for-apis)
- [❓ Complete Interview Questions (20+)](#complete-interview-questions-20)
  - [Basic Conceptual Questions](#basic-conceptual-questions)
  - [Type and Coercion Questions](#type-and-coercion-questions)
  - [Scope Questions](#scope-questions)
  - [Reference vs Value Questions](#reference-vs-value-questions)
  - [Angular-Specific Questions](#angular-specific-questions)
  - [Advanced Questions](#advanced-questions)

---
---

## 1. 🔍 Variable Declarations

### var vs let vs const

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| **Scope** | Function | Block | Block |
| **Redeclare** | ✅ Yes | ❌ No | ❌ No |
| **Reassign** | ✅ Yes | ✅ Yes | ❌ No |
| **Hoisting** | ✅ (undefined) | ❌ TDZ | ❌ TDZ |
| **Use in Angular** | ❌ Avoid | ✅ For changing values | ✅ Preferred |

### 📊 Scope Visualization

```
┌─────────────────── function scope ───────────────────┐
│ var x = 1;                                           │
│ ┌─────────────── block scope ───────────────┐        │
│ │ let y = 2;                                │        │
│ │ const z = 3;                              │        │
│ │                                           │        │
│ │ console.log(x);  // ✅ 1 (function scope) │        │
│ │ console.log(y);  // ✅ 2 (same block)     │        │
│ │ console.log(z);  // ✅ 3 (same block)     │        │
│ └───────────────────────────────────────────┘        │
│                                                      │
│ console.log(x);  // ✅ 1 (still in function)         │
│ console.log(y);  // ❌ ReferenceError (out of block) │
│ console.log(z);  // ❌ ReferenceError (out of block) │
└──────────────────────────────────────────────────────┘
```

---

## 2. 📝 Primitive Data Types (7 Types)

JavaScript has **7 primitive** (immutable) data types:

```typescript
// 1. String - text data
const name: string = "Angular";
const greeting = `Hello, ${name}!`;  // Template literal

// 2. Number - integers and floats (no separate int/float)
const age: number = 25;
const price: number = 19.99;
const scientific: number = 1e6;  // 1,000,000

// 3. Boolean - true/false
const isActive: boolean = true;
const hasPermission: boolean = false;

// 4. Undefined - declared but not assigned
let user;  // undefined
console.log(user);  // undefined

// 5. Null - intentionally empty
const data: null = null;

// 6. Symbol - unique identifier (ES6)
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2);  // false (always unique!)

// 7. BigInt - large integers (ES2020)
const bigNumber: bigint = 9007199254740991n;
```

### Primitive vs Reference

```
┌──────────────────────────────────────────────────────────────┐
│  PRIMITIVES (copied by value)                                │
│  ─────────────────────────────                               │
│  let a = 10;                                                 │
│  let b = a;     // b gets COPY of value                      │
│  b = 20;                                                     │
│  console.log(a);  // 10 (unchanged!)                         │
│  console.log(b);  // 20                                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  REFERENCES (copied by reference)                            │
│  ─────────────────────────────────                           │
│  let obj1 = { name: 'John' };                                │
│  let obj2 = obj1;  // obj2 points to SAME object             │
│  obj2.name = 'Jane';                                         │
│  console.log(obj1.name);  // 'Jane' (CHANGED!)               │
│  console.log(obj2.name);  // 'Jane'                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. 📦 Reference Types

```typescript
// Object - key-value pairs
const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};

// Array - ordered collection
const colors: string[] = ['red', 'green', 'blue'];
const numbers: number[] = [1, 2, 3, 4, 5];

// Function - callable object
const greet = (name: string): string => {
    return `Hello, ${name}!`;
};

// Date - date/time
const now: Date = new Date();

// RegExp - pattern matching
const emailPattern: RegExp = /^[\w-]+@[\w-]+\.\w+$/;

// Map - key-value with any key type
const map = new Map<string, number>();
map.set('one', 1);

// Set - unique values only
const uniqueIds = new Set<number>([1, 2, 2, 3]); // {1, 2, 3}
```

---

## 4. ⚠️ Type Coercion

JavaScript automatically converts types in certain situations:

### Loose vs Strict Equality

```typescript
// ❌ LOOSE EQUALITY (==) - performs type coercion
"5" == 5       // true (string converted to number)
0 == false     // true (both coerced to 0)
null == undefined  // true
"" == false    // true

// ✅ STRICT EQUALITY (===) - no coercion
"5" === 5      // false (different types)
0 === false    // false
null === undefined  // false
"" === false   // false
```

> 🔴 **Angular Best Practice**: ALWAYS use `===` and `!==` to avoid unexpected behavior!

### Truthy and Falsy Values

```typescript
// FALSY values (evaluate to false in boolean context)
const falsyValues = [
    false,      // boolean false
    0,          // zero
    -0,         // negative zero
    0n,         // BigInt zero
    "",         // empty string
    null,       // null
    undefined,  // undefined
    NaN         // Not a Number
];

// TRUTHY values (everything else)
const truthyValues = [
    true,           // boolean true
    1,              // non-zero numbers
    "hello",        // non-empty strings
    [],             // empty array (!)
    {},             // empty object (!)
    () => {},       // functions
];

// Usage in Angular templates
@if (user) {
    <p>Welcome, {{ user.name }}!</p>
}
```

---

## 5. 🅰️ Usage in Angular

### Component Properties

```typescript
@Component({
    selector: 'app-user',
    template: `...`
})
export class UserComponent {
    // ✅ const behavior - readonly property
    readonly API_ENDPOINT = 'https://api.example.com';
    
    // ✅ let behavior - can change
    userName: string = 'Guest';
    isLoggedIn: boolean = false;
    items: string[] = [];
    
    // ✅ Signals (Angular 16+) - reactive state
    count = signal(0);
    
    // ✅ const for configuration objects
    readonly config = {
        maxRetries: 3,
        timeout: 5000
    };
}
```

### Template Type Safety

```html
<!-- Angular performs compile-time type checking -->
<div *ngIf="user">
    {{ user.name }}  <!-- TypeScript ensures 'name' exists -->
</div>

<!-- Nullish coalescing -->
<p>{{ user?.name ?? 'Anonymous' }}</p>
```

### Service with Typed Data

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
    private users: User[] = [];
    
    getUser(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}
```

---

## 6. ❓ Interview Questions

### Q1: What's the difference between `null` and `undefined`?

> **A**: `undefined` means a variable was declared but not assigned a value. `null` is an intentional assignment meaning "no value". In practice:
> - Use `undefined` to check if something exists
> - Use `null` to explicitly indicate "empty"

### Q2: Why should you avoid `var` in modern JavaScript?

> **A**: 
> 1. `var` is function-scoped, not block-scoped (causes bugs in loops)
> 2. `var` allows redeclaration (accidental overwrites)
> 3. `var` is hoisted with value `undefined` (confusing behavior)
> 4. Use `const` by default, `let` when reassignment needed

### Q3: What's the Temporal Dead Zone (TDZ)?

> **A**: The TDZ is the period between entering a scope and the variable's declaration being executed. Accessing `let` or `const` variables in TDZ throws `ReferenceError`:
> ```javascript
> console.log(x);  // ReferenceError: Cannot access 'x' before initialization
> let x = 5;
> ```

### Q4: Why does `typeof null` return "object"?

> **A**: This is a historical bug in JavaScript from the first implementation. `null` was represented with a zero pointer, and objects were identified by a type tag of 0. It was never fixed for backward compatibility.

### Q5: How do you create a true copy of an object?

> **A**: 
> ```typescript
> // Shallow copy
> const copy1 = { ...original };
> const copy2 = Object.assign({}, original);
> 
> // Deep copy (nested objects)
> const deepCopy = structuredClone(original);
> const deepCopy2 = JSON.parse(JSON.stringify(original)); // older method
> ```

---

## 7. 🧠 Quick Reference

```
VARIABLES
─────────
var   → ❌ Avoid (function-scoped, hoisted)
let   → ✅ For changing values (block-scoped)
const → ✅ Default choice (block-scoped, immutable binding)

PRIMITIVES (7)
──────────────
string, number, boolean, undefined, null, symbol, bigint

REFERENCE TYPES
───────────────
Object, Array, Function, Date, RegExp, Map, Set

TYPE CHECKING
─────────────
typeof value    → Returns type as string
value === null  → Use for null check (typeof fails)
Array.isArray() → Use for array check (typeof returns "object")

BEST PRACTICES
──────────────
✅ Use const by default
✅ Use let only when reassignment needed
✅ Always use === for comparisons
✅ Check for null/undefined before accessing properties
✅ Use TypeScript for compile-time type safety
```

---

## 🎯 What Problem Does This Solve?

### The Problem: JavaScript's Loose Typing Causes Runtime Errors

**Without Understanding Types (BAD):**
```javascript
// Accidental type coercion
const price = "10";
const quantity = 5;
const total = price * quantity;  // 50 (works by accident!)
const display = price + quantity;  // "105" (string concatenation!)

// Unexpected equality
if (0 == false) {
    console.log("This runs!");  // Confusing!
}

// Scope issues with var
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3 (not 0, 1, 2!)

// Reference vs value confusion
const user = { name: 'John' };
const copy = user;
copy.name = 'Jane';
console.log(user.name);  // 'Jane' - original changed!
```

**Problems:**
1. **Type coercion bugs**: Unexpected `+` concatenation vs `*` multiplication
2. **Loose equality surprises**: `==` converts types silently
3. **Scope confusion**: `var` leaks out of blocks
4. **Reference mutations**: Objects changed unexpectedly

### How Proper Understanding Solves This

**With Proper Knowledge (GOOD):**
```typescript
// Type-safe arithmetic
const price: number = 10;
const quantity: number = 5;
const total: number = price * quantity;  // 50 ✅

// Strict equality
if (0 === false) {
    console.log("Never runs - different types");
}

// Block-scoped let
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Logs: 0, 1, 2 ✅

// Intentional copy
const user = { name: 'John' };
const copy = { ...user };  // Spread creates new object
copy.name = 'Jane';
console.log(user.name);  // 'John' - original safe!
```

| Problem | Solution |
|---------|----------|
| Type coercion | Use TypeScript, explicit parsing |
| Loose equality | Always use `===` and `!==` |
| var scope issues | Use `const` and `let` |
| Reference mutation | Spread operator or structuredClone |

---

## 📚 Key Concepts Explained in Detail

### 1. Hoisting

```javascript
// What you write:
console.log(x);  // undefined (not error!)
var x = 5;

// What JavaScript sees (hoisted):
var x;           // Declaration moved to top
console.log(x);  // undefined
x = 5;

// let/const are hoisted but in TDZ:
console.log(y);  // ReferenceError!
let y = 5;
```

**Memory Trick**: `var` declarations float to the top like a balloon 🎈

---

### 2. Temporal Dead Zone (TDZ)

```javascript
// TDZ starts here →
console.log(x);  // ❌ ReferenceError - x is in TDZ
let x = 5;       // TDZ ends here
console.log(x);  // ✅ 5
```

The TDZ is the "danger zone" between scope entry and variable declaration.

---

### 3. Primitive vs Reference Types

```
PRIMITIVES (Stored by VALUE)
────────────────────────────
Stack Memory:
┌───────────┐
│ a = 10    │ ← Copy of value
├───────────┤
│ b = 10    │ ← Independent copy
└───────────┘
Changing b doesn't affect a!

REFERENCES (Stored by POINTER)
──────────────────────────────
Stack:              Heap:
┌───────────┐      ┌──────────────┐
│ obj1 = ●──┼──────►{ name: 'John' }
├───────────┤      └──────────────┘
│ obj2 = ●──┼──────────────┘
└───────────┘
Both point to SAME object!
```

---

### 4. typeof Operator Quirks

| Value | typeof Result | Notes |
|-------|---------------|-------|
| `"hello"` | `"string"` | ✅ |
| `42` | `"number"` | ✅ |
| `true` | `"boolean"` | ✅ |
| `undefined` | `"undefined"` | ✅ |
| `null` | `"object"` | ⚠️ Bug! |
| `[]` | `"object"` | Use Array.isArray() |
| `{}` | `"object"` | ✅ |
| `() => {}` | `"function"` | ✅ |
| `Symbol()` | `"symbol"` | ✅ |
| `10n` | `"bigint"` | ✅ |

---

## 🌍 Real-World Use Cases in Angular

### 1. Component State Management
```typescript
@Component({...})
export class UserComponent {
    // const-like: readonly configuration
    readonly MAX_ITEMS = 100;
    
    // let-like: changing state
    username = '';
    isLoggedIn = false;
    
    // Reference type: object state
    user: User | null = null;
    items: Item[] = [];
}
```

### 2. Form Validation with Type Checks
```typescript
validateEmail(value: unknown): boolean {
    // Type narrowing
    if (typeof value !== 'string') return false;
    if (value === '') return false;
    return value.includes('@');
}

validateAge(value: unknown): boolean {
    if (typeof value !== 'number') return false;
    if (Number.isNaN(value)) return false;
    return value >= 0 && value <= 150;
}
```

### 3. Safe Object Updates (Immutability)
```typescript
// ❌ Mutates original
updateUser(user: User) {
    user.name = 'New Name';  // Mutates!
}

// ✅ Creates new object
updateUserImmutable(user: User): User {
    return { ...user, name: 'New Name' };
}

// ✅ Deep clone for nested
updateUserDeep(user: User): User {
    return structuredClone(user);
}
```

### 4. Null-safe Property Access
```typescript
// ❌ Crashes if user is null
const name = user.profile.name;

// ✅ Optional chaining
const name = user?.profile?.name;

// ✅ With fallback
const name = user?.profile?.name ?? 'Guest';
```

### 5. Type Guards for APIs
```typescript
interface ApiResponse {
    data: User[];
    error?: string;
}

function handleResponse(response: unknown): User[] {
    // Type guard
    if (
        typeof response === 'object' &&
        response !== null &&
        'data' in response &&
        Array.isArray((response as ApiResponse).data)
    ) {
        return (response as ApiResponse).data;
    }
    return [];
}
```

---

## ❓ Complete Interview Questions (20+)

### Basic Conceptual Questions

**Q1: What's the difference between `var`, `let`, and `const`?**
> A:
> - `var`: Function-scoped, hoisted, can redeclare
> - `let`: Block-scoped, TDZ, can reassign
> - `const`: Block-scoped, TDZ, cannot reassign binding

**Q2: What are the 7 primitive types in JavaScript?**
> A: `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`

**Q3: What's the difference between `==` and `===`?**
> A: `==` performs type coercion before comparing; `===` compares both value AND type without conversion.

**Q4: Why does `typeof null` return `"object"`?**
> A: It's a historical bug from JavaScript's first implementation that was never fixed for backward compatibility.

**Q5: What is the Temporal Dead Zone?**
> A: The period between entering a scope and the variable declaration where `let`/`const` cannot be accessed.

---

### Type and Coercion Questions

**Q6: What are truthy and falsy values?**
> A: Falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.

**Q7: What does `"5" + 3` return?**
> A: `"53"` (string). The `+` operator concatenates when one operand is a string.

**Q8: What does `"5" - 3` return?**
> A: `2` (number). The `-` operator only does arithmetic, so it converts the string.

**Q9: How do you safely convert a string to a number?**
> A: `Number("123")`, `parseInt("123", 10)`, or `parseFloat("12.5")`. Check with `isNaN()` after.

**Q10: How do you check if a value is an array?**
> A: `Array.isArray(value)`. Don't use `typeof` (returns "object").

---

### Scope Questions

**Q11: What will this code log?**
```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```
> A: `3, 3, 3`. `var` is function-scoped, so all callbacks share the same `i`.

**Q12: How do you fix the above code?**
> A: Use `let` instead of `var`:
> ```javascript
> for (let i = 0; i < 3; i++) {
>     setTimeout(() => console.log(i), 100);
> }
> // Logs: 0, 1, 2
> ```

**Q13: What is hoisting?**
> A: JavaScript moves declarations to the top of their scope before execution. `var` declarations are hoisted with value `undefined`; `let`/`const` are hoisted but not initialized.

---

### Reference vs Value Questions

**Q14: What's the difference between primitive and reference types?**
> A: Primitives are copied by value; reference types point to the same memory location.

**Q15: How do you create a shallow copy of an object?**
> A: `{ ...obj }` or `Object.assign({}, obj)`

**Q16: How do you create a deep copy of an object?**
> A: `structuredClone(obj)` (modern) or `JSON.parse(JSON.stringify(obj))` (older, has limitations)

**Q17: Why doesn't this work as expected?**
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // [1, 2, 3, 4]
```
> A: `const` only prevents reassignment of the variable binding. The array content can still be mutated.

---

### Angular-Specific Questions

**Q18: Why use `readonly` in Angular components?**
> A: To indicate values that shouldn't change after initialization, making code intent clearer and catching accidental mutations.

**Q19: How do you handle optional inputs safely?**
> A: Use optional chaining `?.`, nullish coalescing `??`, or check with `if (value != null)`.

**Q20: What's the best way to compare objects in Angular?**
> A: For reference equality: `===`. For value equality: `JSON.stringify()` or a deep comparison function.

---

### Advanced Questions

**Q21: What is a Symbol and when would you use it?**
> A: A unique, immutable primitive used as object keys to avoid name collisions.

**Q22: What is BigInt?**
> A: A numeric type for integers larger than `Number.MAX_SAFE_INTEGER` (9007199254740991).

**Q23: Explain lexical scoping.**
> A: Inner functions have access to variables from their outer (parent) scopes at the time of definition.

**Q24: What is a closure?**
> A: A function that remembers its outer scope variables even after the outer function has returned.

**Q25: How do you check if a variable is undefined vs null?**
> A:
> ```javascript
> // Check undefined
> if (typeof value === 'undefined') { }
> 
> // Check null
> if (value === null) { }
> 
> // Check both (nullish)
> if (value == null) { }  // true for both null and undefined
> ```

