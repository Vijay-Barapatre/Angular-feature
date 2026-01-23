/**
 * ============================================================================
 * 🧰 UTILITY TYPES - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * TypeScript provides built-in utility types for common type transformations.
 * These are essential for Angular development, especially for:
 * - Form handling (Partial for updates)
 * - API DTOs (Omit, Pick)
 * - Configuration (Required, Readonly)
 * 
 * ============================================================================
 */


// ============================================================================
// BASE TYPES FOR EXAMPLES
// ============================================================================

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    createdAt: Date;
    updatedAt: Date;
    password: string;
    metadata: {
        lastLogin: Date;
        preferences: Record<string, unknown>;
    };
}


// ============================================================================
// 1️⃣ Partial<T> - All Properties Optional
// ============================================================================

/**
 * Makes all properties optional
 * Perfect for UPDATE operations where you only change some fields
 */

type PartialUser = Partial<User>;
// All properties become optional (?)

// Usage: Update function that accepts any subset of properties
function updateUser(id: number, updates: Partial<User>): void {
    // Can pass just the fields being updated
}

updateUser(1, { name: 'New Name' });  // ✅ Only name
updateUser(1, { email: 'new@email.com', role: 'admin' });  // ✅ Two fields

/**
 * Angular reactive forms example
 */
interface FormModel {
    name: string;
    email: string;
    phone: string;
}

function patchForm(patch: Partial<FormModel>): void {
    // form.patchValue(patch);
}

patchForm({ email: 'updated@email.com' });  // Only update email


// ============================================================================
// 2️⃣ Required<T> - All Properties Required
// ============================================================================

/**
 * Removes optional modifier from all properties
 * Opposite of Partial
 */

interface Config {
    apiUrl?: string;
    timeout?: number;
    retries?: number;
}

type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; }

// Ensure all config is provided
function initializeApp(config: Required<Config>): void {
    // All properties guaranteed to exist
    console.log(config.apiUrl);  // No undefined check needed
}


// ============================================================================
// 3️⃣ Readonly<T> - All Properties Readonly
// ============================================================================

/**
 * Prevents modification of properties after creation
 * Great for immutable state
 */

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: 'secret',
    metadata: { lastLogin: new Date(), preferences: {} }
};

// user.name = 'Jane';  // ❌ Error: Cannot assign to 'name' because it is read-only

/**
 * NgRx state should be readonly
 */
interface AppState {
    users: User[];
    loading: boolean;
}

type ImmutableState = Readonly<AppState>;


// ============================================================================
// 4️⃣ Pick<T, K> - Select Specific Properties
// ============================================================================

/**
 * Creates type with only specified properties
 * Use when you need a subset of a type
 */

type UserCredentials = Pick<User, 'email' | 'password'>;
// { email: string; password: string; }

type UserPreview = Pick<User, 'id' | 'name' | 'role'>;
// { id: number; name: string; role: 'admin' | 'user' | 'guest'; }

// Use case: API response with limited fields
function getPublicUsers(): UserPreview[] {
    return [
        { id: 1, name: 'John', role: 'user' }
    ];
}


// ============================================================================
// 5️⃣ Omit<T, K> - Exclude Specific Properties
// ============================================================================

/**
 * Creates type WITHOUT specified properties
 * Opposite of Pick
 */

type SafeUser = Omit<User, 'password'>;
// User without password field

type UserWithoutTimestamps = Omit<User, 'createdAt' | 'updatedAt'>;

// Common pattern: Create DTO without ID (ID is generated)
type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

function createUser(dto: CreateUserDto): User {
    return {
        ...dto,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
}


// ============================================================================
// 6️⃣ Record<K, V> - Object Type with Key-Value
// ============================================================================

/**
 * Creates an object type with specified key type and value type
 */

// String keys, User values
type UserMap = Record<string, User>;

const usersById: UserMap = {
    'user1': { id: 1, name: 'John', email: 'john@test.com', role: 'user', createdAt: new Date(), updatedAt: new Date(), password: 'x', metadata: { lastLogin: new Date(), preferences: {} } }
};

// Literal union keys
type Roles = 'admin' | 'user' | 'guest';
type RolePermissions = Record<Roles, string[]>;

const permissions: RolePermissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
};

// Number keys
type IndexedData = Record<number, string>;
const data: IndexedData = { 0: 'first', 1: 'second' };


// ============================================================================
// 7️⃣ Exclude<T, U> - Remove Types from Union
// ============================================================================

/**
 * Removes types from a union that are assignable to U
 */

type AllRoles = 'admin' | 'user' | 'guest' | 'superadmin';
type RegularRoles = Exclude<AllRoles, 'admin' | 'superadmin'>;
// 'user' | 'guest'

type Primitives = string | number | boolean | null | undefined;
type NonNullablePrimitives = Exclude<Primitives, null | undefined>;
// string | number | boolean


// ============================================================================
// 8️⃣ Extract<T, U> - Keep Only Matching Types
// ============================================================================

/**
 * Keeps only types from T that are assignable to U
 * Opposite of Exclude
 */

type StringOrNumberTypes = Extract<string | number | boolean | object, string | number>;
// string | number

type AdminRoles = Extract<AllRoles, 'admin' | 'superadmin'>;
// 'admin' | 'superadmin'


// ============================================================================
// 9️⃣ NonNullable<T> - Remove null and undefined
// ============================================================================

/**
 * Removes null and undefined from type
 */

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

function processValue(value: MaybeString): void {
    const definite: DefiniteString = value!;  // Assert non-null
    // Or use type guard
    if (value != null) {
        const safe: DefiniteString = value;
    }
}


// ============================================================================
// 🔟 ReturnType<T> - Get Function Return Type
// ============================================================================

/**
 * Extracts the return type of a function
 */

function getUser(): User {
    return {} as User;
}

type GetUserResult = ReturnType<typeof getUser>;
// User

async function fetchUsers(): Promise<User[]> {
    return [];
}

type FetchUsersResult = ReturnType<typeof fetchUsers>;
// Promise<User[]>


// ============================================================================
// 1️⃣1️⃣ Parameters<T> - Get Function Parameters
// ============================================================================

/**
 * Extracts parameter types as a tuple
 */

function createOrder(userId: number, items: string[], total: number): void { }

type CreateOrderParams = Parameters<typeof createOrder>;
// [number, string[], number]

// Extract individual params
type FirstParam = Parameters<typeof createOrder>[0];  // number


// ============================================================================
// 1️⃣2️⃣ COMBINING UTILITY TYPES
// ============================================================================

/**
 * Utility types can be combined for complex transformations
 */

// Partial of specific fields only
type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
type UserWithOptionalEmail = PartialPick<User, 'email'>;

// Make specific fields required
type RequireFields<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

// Create update DTO: ID required, rest optional
type UpdateUserDto = Pick<User, 'id'> & Partial<Omit<User, 'id'>>;

// API input (no timestamps, no ID)
type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

// Read-only version without password
type PublicReadonlyUser = Readonly<Omit<User, 'password'>>;


// ============================================================================
// 1️⃣3️⃣ ANGULAR PRACTICAL EXAMPLES
// ============================================================================

/**
 * Form update type
 */
interface ProfileForm {
    name: string;
    bio: string;
    avatar: string;
    settings: {
        notifications: boolean;
        theme: 'light' | 'dark';
    };
}

type ProfileUpdate = Partial<ProfileForm>;

/**
 * HTTP response types
 */
interface ApiEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// For creating (no id/timestamps)
type CreateDto<T extends ApiEntity> = Omit<T, keyof ApiEntity>;

// For updating (partial, keep id)
type UpdateDto<T extends ApiEntity> = Pick<T, 'id'> & Partial<Omit<T, 'id'>>;

/**
 * Component config with defaults
 */
interface ChartConfig {
    width: number;
    height: number;
    title: string;
    showLegend: boolean;
    colors: string[];
}

function createChart(config: Partial<ChartConfig>): void {
    const defaults: ChartConfig = {
        width: 800,
        height: 600,
        title: 'Chart',
        showLegend: true,
        colors: ['#3498db', '#e74c3c', '#2ecc71']
    };

    const finalConfig = { ...defaults, ...config };
}

createChart({ title: 'My Chart' });  // Only override title


// ============================================================================
// EXPORTS
// ============================================================================

export type {
    PartialUser,
    RequiredConfig,
    ReadonlyUser,
    UserCredentials,
    SafeUser,
    CreateUserDto,
    UpdateUserDto,
    PublicReadonlyUser,
    CreateDto,
    UpdateDto
};

export {
    updateUser,
    createUser,
    getPublicUsers,
    createChart
};
