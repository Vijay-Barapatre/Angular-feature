/**
 * ============================================================================
 * 🎀 DECORATORS - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT PROBLEM DOES THIS SOLVE?                                        │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. CROSS-CUTTING CONCERNS: Add behavior without modifying code          │
 * │    - Logging method calls without adding console.log everywhere        │
 * │    - Caching results without changing function logic                    │
 * │    - Measuring performance without timing code in each method          │
 * │                                                                         │
 * │ 2. METADATA ANNOTATION: Attach configuration to classes/methods         │
 * │    - Angular uses @Component to define template/styles                 │
 * │    - @Injectable tells Angular how to provide the service              │
 * │    - @Input/@Output mark component's public API                        │
 * │                                                                         │
 * │ 3. VALIDATION & TRANSFORMATION: Enforce rules on properties             │
 * │    - Validate that a property is not empty                             │
 * │    - Transform values automatically (e.g., uppercase)                  │
 * │    - Enforce minimum/maximum values                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📋 WHEN TO USE                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ USE DECORATORS WHEN:                                                    │
 * │   ✅ Adding behavior that applies to many classes/methods              │
 * │   ✅ Separating concerns (logging, caching, validation)                │
 * │   ✅ Creating reusable cross-cutting functionality                     │
 * │   ✅ Building frameworks/libraries (like Angular does)                 │
 * │   ✅ Need to modify behavior without changing source code              │
 * │                                                                         │
 * │ AVOID WHEN:                                                             │
 * │   ❌ Simple one-off functionality (just write the code directly)      │
 * │   ❌ Behavior is specific to one class (not reusable)                 │
 * │   ❌ You need to pass complex runtime data (use composition instead)  │
 * │   ❌ Performance is critical (decorators add overhead)                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ CLASS DECORATORS
// ============================================================================

/**
 * PROBLEM: I want to prevent modifications to a class after it's defined
 * SOLUTION: Class decorator that seals the constructor
 * 
 * WHEN TO USE:
 * - Configuration classes that shouldn't be changed
 * - Core classes that need to be immutable
 */
function Sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@Sealed
class BankAccount {
    balance = 0;
}

/**
 * PROBLEM: I want to log when classes are instantiated
 * SOLUTION: Decorator factory that adds logging
 * 
 * WHEN TO USE:
 * - Debugging/development
 * - Tracking class usage
 * - Audit trails
 */
function Logger(prefix: string) {
    return function (constructor: Function) {
        console.log(`${prefix}: ${constructor.name} created`);
    };
}

@Logger('INFO')
class UserService {
    // When UserService is defined, logs: "INFO: UserService created"
}

/**
 * PROBLEM: I want all my entities to have timestamp properties
 * SOLUTION: Decorator that adds properties to any class
 * 
 * WHEN TO USE:
 * - Adding common properties to multiple classes
 * - Mixins without multiple inheritance
 */
function WithTimestamp<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdAt = new Date();
        updatedAt = new Date();
    };
}

@WithTimestamp
class Document {
    title = '';
}

const doc = new Document();
// doc now has createdAt and updatedAt automatically!


// ============================================================================
// 2️⃣ METHOD DECORATORS
// ============================================================================

/**
 * PROBLEM: I want to log all method calls for debugging
 * SOLUTION: Method decorator that wraps the original method
 * 
 * WHEN TO USE:
 * - Debugging: See what methods are called with what arguments
 * - Monitoring: Track method usage
 * - Development: Understand code flow
 */
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`${propertyKey} returned:`, result);
        return result;
    };

    return descriptor;
}

class Calculator {
    @Log
    add(a: number, b: number): number {
        return a + b;
    }
    // Calling add(2, 3) will log:
    // "Calling add with: [2, 3]"
    // "add returned: 5"
}

/**
 * PROBLEM: I need to track how long async operations take
 * SOLUTION: Decorator that measures and logs execution time
 * 
 * WHEN TO USE:
 * - Performance monitoring
 * - Identifying slow operations
 * - API call timing
 */
function Measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${(end - start).toFixed(2)}ms`);
        return result;
    };

    return descriptor;
}

/**
 * PROBLEM: Expensive calculations are repeated unnecessarily
 * SOLUTION: Memoization decorator caches results
 * 
 * WHEN TO USE:
 * - Pure functions with expensive computations
 * - Methods called frequently with same arguments
 * - API calls that can be cached
 */
function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const cache = new Map<string, any>();
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(`Cache hit for ${propertyKey}(${key})`);
            return cache.get(key);
        }
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };

    return descriptor;
}

class MathService {
    @Memoize
    fibonacci(n: number): number {
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
    // Without memoization: fibonacci(40) = 102,334,155 and takes seconds
    // With memoization: instant after first call
}

/**
 * PROBLEM: Method is called too frequently (e.g., on every keystroke)
 * SOLUTION: Debounce decorator delays execution
 * 
 * WHEN TO USE:
 * - Search input handlers
 * - Window resize handlers
 * - Auto-save functionality
 */
function Debounce(ms: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let timeout: NodeJS.Timeout;
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => originalMethod.apply(this, args), ms);
        };

        return descriptor;
    };
}


// ============================================================================
// 3️⃣ PROPERTY DECORATORS
// ============================================================================

/**
 * PROBLEM: I need to validate that a property is never empty
 * SOLUTION: Property decorator that throws on invalid assignment
 * 
 * WHEN TO USE:
 * - Form validation
 * - Required fields
 * - Data integrity
 */
function Required(target: any, propertyKey: string) {
    let value: any;

    const getter = () => value;
    const setter = (newValue: any) => {
        if (newValue === undefined || newValue === null || newValue === '') {
            throw new Error(`${propertyKey} is required`);
        }
        value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

/**
 * PROBLEM: Numeric property must meet minimum value requirement
 * SOLUTION: Property decorator with validation
 * 
 * WHEN TO USE:
 * - Age validation (min 0 or 18)
 * - Price validation (min 0)
 * - Quantity checks
 */
function Min(limit: number) {
    return function (target: any, propertyKey: string) {
        let value: number;

        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue: number) => {
                if (newValue < limit) {
                    throw new Error(`${propertyKey} must be at least ${limit}`);
                }
                value = newValue;
            }
        });
    };
}

/**
 * PROBLEM: I want strings to always be uppercase
 * SOLUTION: Property decorator that transforms on set
 * 
 * WHEN TO USE:
 * - Normalizing data formats
 * - Currency codes (always uppercase)
 * - Category codes
 */
function Uppercase(target: any, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue: string) => {
            value = newValue?.toUpperCase();
        }
    });
}

class User {
    @Required
    name!: string;

    @Min(0)
    age!: number;

    @Uppercase
    country!: string;
}

// const user = new User();
// user.name = '';  // ❌ Error: name is required
// user.age = -5;   // ❌ Error: age must be at least 0
// user.country = 'usa';  // Stored as 'USA'


// ============================================================================
// 4️⃣ PARAMETER DECORATORS
// ============================================================================

/**
 * PROBLEM: Need to mark which parameters should be validated
 * SOLUTION: Parameter decorator that stores metadata
 * 
 * WHEN TO USE:
 * - Framework development
 * - Dependency injection markers
 * - Validation hints
 */
function Validate(target: any, propertyKey: string, parameterIndex: number) {
    const existingParams: number[] = Reflect.getMetadata('validate', target, propertyKey) || [];
    existingParams.push(parameterIndex);
    Reflect.defineMetadata('validate', existingParams, target, propertyKey);
}

class OrderService {
    createOrder(@Validate orderId: string, @Validate userId: string) {
        // Framework can read metadata to know which params need validation
    }
}


// ============================================================================
// 5️⃣ HOW ANGULAR DECORATORS WORK (CONCEPTUAL)
// ============================================================================

/**
 * PROBLEM: Angular needs to know component metadata (template, styles, selector)
 * SOLUTION: @Component decorator attaches metadata to the class
 * 
 * This is a SIMPLIFIED version of how Angular's decorators work internally.
 */

interface ComponentMetadata {
    selector: string;
    template?: string;
    templateUrl?: string;
    styles?: string[];
    styleUrls?: string[];
}

function Component(metadata: ComponentMetadata) {
    return function (constructor: Function) {
        // Store metadata on the class for Angular to read later
        (constructor as any).__annotations__ = metadata;
    };
}

/**
 * PROBLEM: Angular needs to know which services are injectable
 * SOLUTION: @Injectable decorator marks the class and specifies scope
 */
interface InjectableMetadata {
    providedIn?: 'root' | 'platform' | 'any' | null;
}

function Injectable(metadata?: InjectableMetadata) {
    return function (constructor: Function) {
        (constructor as any).__injectable__ = true;
        (constructor as any).__providedIn__ = metadata?.providedIn || null;
    };
}

/**
 * PROBLEM: Parent component needs to pass data to child
 * SOLUTION: @Input decorator marks property as bindable from template
 */
function Input(alias?: string) {
    return function (target: any, propertyKey: string) {
        const inputs = target.constructor.__inputs__ || [];
        inputs.push({ property: propertyKey, alias: alias || propertyKey });
        target.constructor.__inputs__ = inputs;
    };
}

/**
 * PROBLEM: Child component needs to emit events to parent
 * SOLUTION: @Output decorator marks property as event emitter
 */
function Output(alias?: string) {
    return function (target: any, propertyKey: string) {
        const outputs = target.constructor.__outputs__ || [];
        outputs.push({ property: propertyKey, alias: alias || propertyKey });
        target.constructor.__outputs__ = outputs;
    };
}


// ============================================================================
// 6️⃣ REAL ANGULAR USAGE (REFERENCE)
// ============================================================================

/**
 * This shows how Angular decorators are actually used.
 * (This code won't run without Angular, but demonstrates the patterns)
 * 
 * @Component({
 *     selector: 'app-user-card',
 *     template: `
 *         <div class="card">
 *             <h2>{{ user.name }}</h2>
 *             <button (click)="onSelect()">Select</button>
 *         </div>
 *     `,
 *     styles: [`
 *         .card { padding: 1rem; border: 1px solid #ccc; }
 *     `]
 * })
 * export class UserCardComponent {
 *     @Input() user!: User;                      // Data from parent
 *     @Output() selected = new EventEmitter<User>(); // Events to parent
 *
 *     onSelect() {
 *         this.selected.emit(this.user);
 *     }
 * }
 *
 * @Injectable({ providedIn: 'root' })  // Singleton service
 * export class AuthService {
 *     isAuthenticated = false;
 *
 *     login(credentials: Credentials): Observable<User> {
 *         return this.http.post<User>('/api/login', credentials);
 *     }
 * }
 */


// ============================================================================
// 7️⃣ DECORATOR COMPOSITION
// ============================================================================

/**
 * PROBLEM: Need multiple behaviors on the same target
 * SOLUTION: Stack decorators - they compose together
 * 
 * EXECUTION ORDER:
 * - Evaluation: top to bottom
 * - Calling: bottom to top
 */

@Logger('MyService')
@Sealed
class MyService {
    @Log
    @Measure
    async fetchData(): Promise<string> {
        await new Promise(r => setTimeout(r, 100));
        return 'data';
    }
}


// ============================================================================
// EXPORTS
// ============================================================================

export {
    Sealed,
    Logger,
    WithTimestamp,
    Log,
    Measure,
    Memoize,
    Debounce,
    Required,
    Min,
    Uppercase,
    Component,
    Injectable,
    Input,
    Output
};
