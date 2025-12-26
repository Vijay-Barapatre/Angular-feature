/**
 * ============================================================================
 * 📋 TYPESCRIPT INTERFACES - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT PROBLEM DOES THIS SOLVE?                                        │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. RUNTIME ERRORS: JavaScript doesn't check object shapes              │
 * │    - Problem: obj.name crashes if 'name' doesn't exist                 │
 * │    - Solution: TypeScript catches missing/wrong properties at compile  │
 * │                                                                         │
 * │ 2. DOCUMENTATION: Code doesn't explain what shape data should have     │
 * │    - Problem: function createUser(data) - what is 'data'?              │
 * │    - Solution: function createUser(data: UserInput) - now it's clear!  │
 * │                                                                         │
 * │ 3. REFACTORING SAFETY: Changing object shapes breaks code silently     │
 * │    - Problem: Add/remove property, forget to update all usages         │
 * │    - Solution: Interface changes cause compile errors at all usages    │
 * │                                                                         │
 * │ 4. API CONTRACTS: No way to define what data services return           │
 * │    - Problem: What does /api/users return? No one knows!               │
 * │    - Solution: ApiResponse<User[]> clearly defines the shape           │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📋 WHEN TO USE                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ USE INTERFACES WHEN:                                                    │
 * │   ✅ Defining object shapes (most common use case)                     │
 * │   ✅ Creating contracts for classes to implement                       │
 * │   ✅ Defining function signatures                                      │
 * │   ✅ You might need declaration merging later                          │
 * │   ✅ Working with APIs - define request/response types                 │
 * │   ✅ Component @Input types                                            │
 * │                                                                         │
 * │ USE TYPE ALIAS INSTEAD WHEN:                                            │
 * │   ✅ Union types: 'success' | 'error'                                  │
 * │   ✅ Tuple types: [string, number]                                     │
 * │   ✅ Mapped/conditional types                                          │
 * │   ✅ Primitive aliases: type ID = string                               │
 * │                                                                         │
 * │ INTERFACE vs TYPE:                                                       │
 * │   - Interfaces can be extended/merged after definition                 │
 * │   - Types are more flexible for complex type operations                │
 * │   - Both work for objects - preference is often team convention        │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */

// ============================================================================
// 1️⃣ BASIC INTERFACE - Define Object Shape
// ============================================================================

/**
 * PROBLEM: JavaScript doesn't enforce object structure
 *          const user = { id: 1, nam: 'John' }; // Typo goes unnoticed!
 * 
 * SOLUTION: Interface defines required shape - typos caught at compile time
 * 
 * WHEN TO USE:
 * - Defining data models (User, Product, Order)
 * - API response types
 * - Component state shape
 */
interface User {
    id: number;
    name: string;
    email: string;
}

// Usage - TypeScript will enforce the shape
const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
};

// ❌ ERROR: Missing 'email' property
// const badUser: User = { id: 1, name: 'John' };


// ============================================================================
// 2️⃣ OPTIONAL & READONLY PROPERTIES
// ============================================================================

/**
 * Interface with modifiers:
 * - readonly: Cannot be changed after creation
 * - ?: Optional property
 */
interface Product {
    readonly id: string;           // Cannot be modified after creation
    readonly createdAt: Date;      // Immutable timestamp
    name: string;                  // Required, can be modified
    price: number;                 // Required, can be modified
    description?: string;          // Optional
    tags?: string[];               // Optional array
    metadata?: {                   // Optional nested object
        category: string;
        sku: string;
    };
}

const product: Product = {
    id: 'prod-001',
    createdAt: new Date(),
    name: 'Widget',
    price: 29.99
    // description and tags are optional, so we can omit them
};

// ❌ ERROR: Cannot assign to 'id' because it is a read-only property
// product.id = 'new-id';

// ✅ OK: Can modify non-readonly properties
product.name = 'Super Widget';
product.price = 39.99;


// ============================================================================
// 3️⃣ EXTENDING INTERFACES (Inheritance)
// ============================================================================

/**
 * Base interface - common properties
 */
interface Person {
    name: string;
    age: number;
}

/**
 * Extended interface - adds more properties
 * Employee has all Person properties PLUS its own
 */
interface Employee extends Person {
    employeeId: string;
    department: string;
    salary: number;
    hireDate: Date;
}

/**
 * Further extension - Manager extends Employee
 * Has all Person + Employee properties + its own
 */
interface Manager extends Employee {
    teamSize: number;
    directReports: Employee[];
    canApproveExpenses: boolean;
}

const manager: Manager = {
    // From Person
    name: 'Alice Smith',
    age: 35,
    // From Employee
    employeeId: 'EMP001',
    department: 'Engineering',
    salary: 120000,
    hireDate: new Date('2020-01-15'),
    // From Manager
    teamSize: 8,
    directReports: [],
    canApproveExpenses: true
};


// ============================================================================
// 4️⃣ MULTIPLE INHERITANCE - Extend Multiple Interfaces
// ============================================================================

interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

interface SoftDeletable {
    deletedAt?: Date;
    isDeleted: boolean;
}

interface Auditable {
    createdBy: string;
    updatedBy: string;
}

/**
 * Combine multiple interfaces
 * AuditedEntity has properties from ALL parent interfaces
 */
interface AuditedEntity extends Timestamps, SoftDeletable, Auditable {
    id: string;
}

const entity: AuditedEntity = {
    id: 'entity-001',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    createdBy: 'admin',
    updatedBy: 'admin'
};


// ============================================================================
// 5️⃣ FUNCTION INTERFACES
// ============================================================================

/**
 * Interface for a function signature
 * Defines what parameters it takes and what it returns
 */
interface SearchFunction {
    (query: string, limit?: number): Promise<SearchResult[]>;
}

interface SearchResult {
    id: string;
    title: string;
    score: number;
}

// Implement the function following the interface
const searchUsers: SearchFunction = async (query, limit = 10) => {
    // Implementation here...
    return [
        { id: '1', title: `Result for: ${query}`, score: 0.95 }
    ];
};

/**
 * Interface with multiple call signatures
 */
interface Formatter {
    (value: number): string;
    (value: Date): string;
    (value: string): string;
}


// ============================================================================
// 6️⃣ INDEX SIGNATURES - Dynamic Properties
// ============================================================================

/**
 * When you don't know all property names at compile time
 * Use index signature to define the type of dynamic keys
 */
interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    hello: 'Hola',
    goodbye: 'Adiós',
    thanks: 'Gracias'
    // Can add any string key with string value
};

/**
 * Mixed: known properties + dynamic properties
 */
interface Config {
    apiUrl: string;                    // Required
    timeout: number;                   // Required
    [key: string]: string | number;    // Any additional properties
}

const config: Config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,                        // Dynamic property
    environment: 'production'          // Dynamic property
};


// ============================================================================
// 7️⃣ GENERIC INTERFACES
// ============================================================================

/**
 * Generic interface - T is a type parameter
 * Makes the interface reusable with different types
 */
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}

// Use with specific types
type UserResponse = ApiResponse<User>;
type ProductListResponse = ApiResponse<Product[]>;

const userResponse: UserResponse = {
    data: { id: 1, name: 'John', email: 'john@test.com' },
    status: 200,
    message: 'Success',
    timestamp: new Date()
};

/**
 * Generic interface with constraints
 * T must have an 'id' property
 */
interface Repository<T extends { id: string | number }> {
    findAll(): Promise<T[]>;
    findById(id: T['id']): Promise<T | null>;
    create(item: Omit<T, 'id'>): Promise<T>;
    update(id: T['id'], item: Partial<T>): Promise<T>;
    delete(id: T['id']): Promise<boolean>;
}


// ============================================================================
// 8️⃣ TYPE ALIAS vs INTERFACE
// ============================================================================

/**
 * TYPE ALIAS - Use for:
 * - Union types
 * - Primitive types
 * - Tuples
 * - Function types
 * - Complex type transformations
 */
type ID = string | number;                              // Union
type Status = 'pending' | 'active' | 'inactive';       // Literal union
type Coordinates = [number, number];                    // Tuple
type Callback<T> = (data: T) => void;                  // Function type
type Nullable<T> = T | null;                           // Transformation

/**
 * INTERFACE - Use for:
 * - Object shapes
 * - Class contracts
 * - Declaration merging (adding to existing interface)
 */

// Declaration merging - interfaces can be extended after definition
interface Window {
    myCustomProperty: string;
}

// Now Window interface has myCustomProperty added!


// ============================================================================
// 9️⃣ CLASS IMPLEMENTATION
// ============================================================================

/**
 * Interfaces as contracts for classes
 * Class must implement all interface members
 */
interface Printable {
    print(): void;
}

interface Serializable {
    serialize(): string;
    deserialize(data: string): void;
}

class Document implements Printable, Serializable {
    constructor(public content: string) { }

    print(): void {
        console.log(this.content);
    }

    serialize(): string {
        return JSON.stringify({ content: this.content });
    }

    deserialize(data: string): void {
        this.content = JSON.parse(data).content;
    }
}


// ============================================================================
// 🅰️ ANGULAR-SPECIFIC EXAMPLES
// ============================================================================

/**
 * Angular Component Input Interface
 */
interface CardConfig {
    title: string;
    subtitle?: string;
    icon?: string;
    theme?: 'light' | 'dark';
    actions?: CardAction[];
}

interface CardAction {
    label: string;
    handler: () => void;
    disabled?: boolean;
}

/**
 * Angular HTTP Response Interface
 */
interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

/**
 * Angular Form Model Interface
 */
interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}

/**
 * Angular Route Data Interface
 */
interface RouteData {
    title: string;
    permissions: string[];
    breadcrumb: string;
}


// ============================================================================
// EXPORTS - Make interfaces available for import
// ============================================================================

export {
    User,
    Product,
    Employee,
    Manager,
    ApiResponse,
    Repository,
    CardConfig,
    PaginatedResponse,
    LoginForm,
    RouteData
};
