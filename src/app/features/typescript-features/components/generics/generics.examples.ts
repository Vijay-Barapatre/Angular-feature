/**
 * ============================================================================
 * 🧬 TYPESCRIPT GENERICS - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * Generics allow you to write flexible, reusable code that works with
 * multiple types while maintaining type safety.
 * 
 * WHY USE GENERICS?
 * - Write once, use with any type
 * - Maintain type safety (no 'any')
 * - Better IDE autocomplete
 * - Catch errors at compile time, not runtime
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ BASIC GENERIC FUNCTION
// ============================================================================

/**
 * ❌ WITHOUT GENERICS - Loses type information
 */
function identityWithoutGenerics(value: any): any {
    return value;
}
const resultAny = identityWithoutGenerics(42);  // Type is 'any', not 'number'

/**
 * ✅ WITH GENERICS - Preserves type information
 * <T> is a type parameter (like a variable for types)
 */
function identity<T>(value: T): T {
    return value;
}

const resultNumber = identity(42);           // TypeScript infers: number
const resultString = identity('hello');      // TypeScript infers: string
const resultExplicit = identity<boolean>(true);  // Explicit type


// ============================================================================
// 2️⃣ GENERIC FUNCTIONS WITH ARRAYS
// ============================================================================

/**
 * Get first element of any array, returns the same type
 */
function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

const firstNum = first([1, 2, 3]);        // number | undefined
const firstStr = first(['a', 'b', 'c']);  // string | undefined

/**
 * Get last element of any array
 */
function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

/**
 * Filter array with predicate, maintains type
 */
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    return arr.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
const evens = filterArray(numbers, n => n % 2 === 0);  // number[]


// ============================================================================
// 3️⃣ MULTIPLE TYPE PARAMETERS
// ============================================================================

/**
 * Function with two type parameters
 */
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const tuple = pair('hello', 42);  // [string, number]

/**
 * Map function with key-value types
 */
function mapValues<K, V, R>(
    obj: Record<K extends string | number | symbol ? K : never, V>,
    mapper: (value: V) => R
): Record<K extends string | number | symbol ? K : never, R> {
    const result: any = {};
    for (const key in obj) {
        result[key] = mapper(obj[key]);
    }
    return result;
}


// ============================================================================
// 4️⃣ GENERIC CONSTRAINTS (extends)
// ============================================================================

/**
 * Constraint: T must have a 'length' property
 */
function logLength<T extends { length: number }>(item: T): void {
    console.log(`Length: ${item.length}`);
}

logLength('hello');          // ✅ string has length
logLength([1, 2, 3]);        // ✅ array has length
logLength({ length: 5 });    // ✅ object with length
// logLength(42);            // ❌ number has no length

/**
 * Constraint: T must have an 'id' property
 */
interface HasId {
    id: number | string;
}

function findById<T extends HasId>(items: T[], id: T['id']): T | undefined {
    return items.find(item => item.id === id);
}

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
];
const found = findById(users, 1);  // { id: number, name: string } | undefined

/**
 * Constraint using keyof
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: 'John', age: 30, email: 'john@test.com' };
const name = getProperty(user, 'name');   // string
const age = getProperty(user, 'age');     // number
// getProperty(user, 'invalid');           // ❌ Error: 'invalid' doesn't exist


// ============================================================================
// 5️⃣ GENERIC INTERFACES
// ============================================================================

/**
 * Generic API response wrapper
 */
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

// Use with different types
type UserResponse = ApiResponse<User>;
type ProductListResponse = ApiResponse<Product[]>;

const userResponse: UserResponse = {
    data: { id: 1, name: 'John', email: 'john@test.com' },
    status: 200,
    message: 'Success',
    timestamp: new Date()
};


// ============================================================================
// 6️⃣ GENERIC CLASSES
// ============================================================================

/**
 * Generic Stack data structure
 */
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Use with specific types
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const popped = numberStack.pop();  // number | undefined

const stringStack = new Stack<string>();
stringStack.push('hello');


// ============================================================================
// 7️⃣ GENERIC REPOSITORY PATTERN (Common in Angular)
// ============================================================================

/**
 * Base interface for entities
 */
interface Entity {
    id: string | number;
}

/**
 * Generic CRUD repository
 */
interface Repository<T extends Entity> {
    findAll(): Promise<T[]>;
    findById(id: T['id']): Promise<T | null>;
    create(item: Omit<T, 'id'>): Promise<T>;
    update(id: T['id'], item: Partial<T>): Promise<T>;
    delete(id: T['id']): Promise<boolean>;
}

/**
 * Base implementation with common logic
 */
abstract class BaseRepository<T extends Entity> implements Repository<T> {
    protected items: T[] = [];

    async findAll(): Promise<T[]> {
        return [...this.items];
    }

    async findById(id: T['id']): Promise<T | null> {
        return this.items.find(item => item.id === id) ?? null;
    }

    abstract create(item: Omit<T, 'id'>): Promise<T>;
    abstract update(id: T['id'], item: Partial<T>): Promise<T>;
    abstract delete(id: T['id']): Promise<boolean>;
}


// ============================================================================
// 8️⃣ GENERIC UTILITY FUNCTIONS
// ============================================================================

/**
 * Deep clone any object
 */
function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge two objects with type safety
 */
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

/**
 * Group array by key
 */
function groupBy<T, K extends keyof T>(
    items: T[],
    key: K
): Map<T[K], T[]> {
    const map = new Map<T[K], T[]>();

    for (const item of items) {
        const keyValue = item[key];
        const existing = map.get(keyValue) || [];
        existing.push(item);
        map.set(keyValue, existing);
    }

    return map;
}

// Usage
const products = [
    { id: 1, category: 'electronics', name: 'Phone' },
    { id: 2, category: 'electronics', name: 'Laptop' },
    { id: 3, category: 'clothing', name: 'Shirt' }
];
const grouped = groupBy(products, 'category');
// Map { 'electronics' => [...], 'clothing' => [...] }


// ============================================================================
// 9️⃣ DEFAULT TYPE PARAMETERS
// ============================================================================

/**
 * Generic with default type
 */
interface Container<T = string> {
    value: T;
}

const stringContainer: Container = { value: 'hello' };      // T defaults to string
const numberContainer: Container<number> = { value: 42 };   // Override default

/**
 * Class with default type parameter
 */
class EventEmitter<T = void> {
    private handlers: ((data: T) => void)[] = [];

    on(handler: (data: T) => void): void {
        this.handlers.push(handler);
    }

    emit(data: T): void {
        this.handlers.forEach(h => h(data));
    }
}

// Usage
const clickEmitter = new EventEmitter();  // EventEmitter<void>
clickEmitter.emit(undefined as void);

const dataEmitter = new EventEmitter<{ x: number; y: number }>();
dataEmitter.emit({ x: 10, y: 20 });


// ============================================================================
// 🅰️ ANGULAR-SPECIFIC GENERIC PATTERNS
// ============================================================================

/**
 * Generic Angular Service
 * 
 * @Injectable({ providedIn: 'root' })
 * export class DataService<T extends Entity> {
 *     constructor(private http: HttpClient) {}
 *
 *     getAll(): Observable<T[]> {
 *         return this.http.get<T[]>(this.endpoint);
 *     }
 *
 *     getById(id: string | number): Observable<T> {
 *         return this.http.get<T>(`${this.endpoint}/${id}`);
 *     }
 * }
 */

/**
 * Generic Component Input
 * 
 * @Component({...})
 * export class ListComponent<T> {
 *     @Input() items: T[] = [];
 *     @Output() selected = new EventEmitter<T>();
 * }
 */


// ============================================================================
// EXPORTS
// ============================================================================

export {
    identity,
    first,
    last,
    filterArray,
    getProperty,
    Stack,
    groupBy,
    deepClone,
    merge
};

export type {
    ApiResponse,
    Repository,
    Entity
};
