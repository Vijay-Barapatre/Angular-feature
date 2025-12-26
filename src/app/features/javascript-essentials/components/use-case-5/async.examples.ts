/**
 * ============================================================================
 * ⏳ ASYNC/AWAIT & PROMISES - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT PROBLEM DOES THIS SOLVE?                                        │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. CALLBACK HELL: Nested callbacks become unreadable                    │
 * │    - Before: fetchUser(id, (user) => fetchOrders(user.id, (orders) =>  │
 * │              fetchItems(orders[0].id, (items) => { ... })));           │
 * │    - After:  const user = await fetchUser(id);                         │
 * │              const orders = await fetchOrders(user.id);                │
 * │              const items = await fetchItems(orders[0].id);             │
 * │                                                                         │
 * │ 2. ERROR HANDLING: Catch errors from async operations cleanly           │
 * │    - Before: Each callback needs its own error handling                │
 * │    - After:  One try/catch wraps all async operations                  │
 * │                                                                         │
 * │ 3. SEQUENTIAL VS PARALLEL: Control execution order                      │
 * │    - Problem: Need to wait for multiple independent operations         │
 * │    - Solution: Promise.all() runs them in parallel                     │
 * │                                                                         │
 * │ 4. ASYNC FLOW CONTROL: Wait for operations before continuing            │
 * │    - Problem: JavaScript is non-blocking, operations run immediately   │
 * │    - Solution: await pauses until Promise resolves                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📋 WHEN TO USE                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ USE ASYNC/AWAIT WHEN:                                                   │
 * │   ✅ Making HTTP requests                                              │
 * │   ✅ Reading/writing files                                             │
 * │   ✅ Database operations                                               │
 * │   ✅ Any operation that takes time (I/O bound)                        │
 * │   ✅ You need sequential async operations                             │
 * │                                                                         │
 * │ USE Promise.all WHEN:                                                   │
 * │   ✅ Multiple independent operations can run together                  │
 * │   ✅ You need ALL results before continuing                           │
 * │                                                                         │
 * │ USE Promise.allSettled WHEN:                                            │
 * │   ✅ You want all results even if some fail                           │
 * │                                                                         │
 * │ IN ANGULAR, PREFER OBSERVABLES WHEN:                                    │
 * │   ✅ Value can emit multiple times (WebSocket, intervals)             │
 * │   ✅ Need to cancel subscription                                       │
 * │   ✅ Using RxJS operators for transformation                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */


// ============================================================================
// 1️⃣ CREATING PROMISES
// ============================================================================

/**
 * PROBLEM: I need to represent an operation that will complete later
 * SOLUTION: Promise wraps the async operation
 * 
 * WHEN TO USE:
 * - Wrapping callback-based APIs
 * - Creating delays/timers
 * - Custom async operations
 */
function fetchUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: 'John Doe', email: 'john@example.com' });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}

/**
 * PROBLEM: Need to test error handling
 * SOLUTION: Promise that randomly fails
 */
function unreliableOperation(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5
                ? resolve('Success!')
                : reject(new Error('Random failure'));
        }, 500);
    });
}


// ============================================================================
// 2️⃣ PROMISE CHAINING (.then/.catch/.finally)
// ============================================================================

/**
 * PROBLEM: Need to perform sequential async operations
 * SOLUTION: Chain .then() calls - each receives previous result
 * 
 * WHEN TO USE:
 * - When you prefer functional style
 * - Simple chains without complex error handling
 * 
 * AVOID WHEN:
 * - Complex logic with branching (use async/await instead)
 * - Many operations (gets hard to read)
 */
function loadUserDataWithChaining(userId: number): void {
    fetchUserById(userId)
        .then(user => {
            console.log('User loaded:', user.name);
            return fetchUserOrders(user.id);  // Return Promise for next .then
        })
        .then(orders => {
            console.log('Orders loaded:', orders.length);
            return fetchOrderDetails(orders[0].id);
        })
        .then(details => {
            console.log('Details loaded:', details);
        })
        .catch(error => {
            // Catches ANY error in the chain above
            console.error('Error:', error.message);
        })
        .finally(() => {
            // Always runs, regardless of success or failure
            // Good for: hiding loading spinners, cleanup
            console.log('Loading complete');
        });
}


// ============================================================================
// 3️⃣ ASYNC/AWAIT - RECOMMENDED APPROACH
// ============================================================================

/**
 * PROBLEM: Promise chains are hard to read and debug
 * SOLUTION: async/await makes async code look synchronous
 * 
 * BENEFITS:
 * - Code reads top to bottom like synchronous code
 * - Easy to debug (step through line by line)
 * - try/catch works naturally
 * - Variables stay in scope
 * 
 * RULES:
 * - await can only be used inside async function
 * - async function always returns a Promise
 */
async function loadUserDataAsync(userId: number): Promise<void> {
    try {
        // Each await pauses until Promise resolves
        // Execution continues on next line with the resolved value
        const user = await fetchUserById(userId);
        console.log('User loaded:', user.name);

        const orders = await fetchUserOrders(user.id);
        console.log('Orders loaded:', orders.length);

        const details = await fetchOrderDetails(orders[0].id);
        console.log('Details loaded:', details);
    } catch (error) {
        // Catches any error from any await above
        console.error('Error:', (error as Error).message);
    } finally {
        // Always runs
        console.log('Loading complete');
    }
}

/**
 * Arrow function version
 */
const getUserAsync = async (id: number): Promise<User> => {
    const user = await fetchUserById(id);
    return user;
};


// ============================================================================
// 4️⃣ PARALLEL EXECUTION - Promise.all()
// ============================================================================

/**
 * PROBLEM: Sequential await is slow when operations are independent
 * 
 * ❌ SEQUENTIAL (SLOW):
 * - Each operation waits for previous to complete
 * - Total time: sum of all operation times
 */
async function loadDataSequential(): Promise<void> {
    console.time('sequential');

    const users = await fetchUsers();      // 1 second wait
    const products = await fetchProducts(); // Then 1 second wait
    const orders = await fetchOrders();     // Then 1 second wait

    console.timeEnd('sequential'); // Total: ~3000ms
}

/**
 * SOLUTION: Promise.all() runs all operations simultaneously
 * 
 * ✅ PARALLEL (FAST):
 * - All operations start at the same time
 * - Total time: longest single operation
 */
async function loadDataParallel(): Promise<void> {
    console.time('parallel');

    // All three start immediately, wait for all to complete
    const [users, products, orders] = await Promise.all([
        fetchUsers(),      // Starts immediately
        fetchProducts(),   // Starts immediately  
        fetchOrders()      // Starts immediately
    ]);

    console.timeEnd('parallel'); // Total: ~1000ms (3x faster!)
}

/**
 * PROBLEM: Promise.all fails fast - one rejection fails everything
 * SOLUTION: Promise.allSettled gets all results regardless of failures
 * 
 * WHEN TO USE:
 * - Loading multiple optional data sources
 * - When you want partial results even if some fail
 */
async function loadWithAllSettled(): Promise<void> {
    const results = await Promise.allSettled([
        fetchUsers(),          // Must succeed
        unreliableOperation(), // Might fail - that's OK
        fetchProducts()        // Must succeed
    ]);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Promise ${index} succeeded:`, result.value);
        } else {
            // Promise.allSettled doesn't throw, just reports the failure
            console.log(`Promise ${index} failed:`, result.reason);
        }
    });
}


// ============================================================================
// 5️⃣ Promise.race() - First One Wins
// ============================================================================

/**
 * PROBLEM: Need to timeout slow operations
 * SOLUTION: Race between actual operation and timeout
 * 
 * WHEN TO USE:
 * - Adding timeouts to operations
 * - Fastest server selection
 * - Cancellation patterns
 */
async function fetchWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number
): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
    });

    // First one to complete wins - either data or timeout
    return Promise.race([promise, timeout]);
}

// Usage: API call with 5 second timeout
async function fetchUserSafe(id: number): Promise<User | null> {
    try {
        return await fetchWithTimeout(fetchUserById(id), 5000);
    } catch (error) {
        console.error('Fetch failed or timed out:', (error as Error).message);
        return null;
    }
}


// ============================================================================
// 6️⃣ ERROR HANDLING PATTERNS
// ============================================================================

/**
 * PATTERN 1: Traditional try/catch
 * 
 * WHEN TO USE:
 * - Most common pattern
 * - When you need to handle errors locally
 */
async function withTryCatch(): Promise<string> {
    try {
        const result = await unreliableOperation();
        return result;
    } catch (error) {
        console.error('Caught error:', error);
        return 'default value';  // Fallback
    }
}

/**
 * PATTERN 2: Go-style error handling (returns [data, error] tuple)
 * 
 * PROBLEM: try/catch can be verbose with many operations
 * SOLUTION: Wrapper that returns result or error in a tuple
 * 
 * WHEN TO USE:
 * - Many sequential operations needing individual error handling
 * - When you prefer explicit error checking over try/catch
 */
async function safeAsync<T>(
    promise: Promise<T>
): Promise<[T | null, Error | null]> {
    try {
        const data = await promise;
        return [data, null];  // Success: data exists, no error
    } catch (error) {
        return [null, error as Error];  // Failure: no data, error exists
    }
}

// Usage - clean, explicit error handling
async function useGoStyleErrorHandling(): Promise<void> {
    const [user, error] = await safeAsync(fetchUserById(1));

    if (error) {
        console.error('Failed to fetch user:', error.message);
        return;  // Handle error and stop
    }

    // TypeScript knows user is not null here
    console.log('User:', user?.name);
}

/**
 * PATTERN 3: Global unhandled rejection handler
 * 
 * PROBLEM: Forgotten awaits or missing catch can cause silent failures
 * SOLUTION: Global handler catches all unhandled rejections
 */
if (typeof process !== 'undefined') {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // In production: log to error tracking service
    });
}


// ============================================================================
// 7️⃣ RETRY PATTERN
// ============================================================================

/**
 * PROBLEM: Network requests can fail temporarily
 * SOLUTION: Retry with exponential backoff
 * 
 * WHEN TO USE:
 * - Flaky network connections
 * - Rate-limited APIs
 * - Operations that may fail transiently
 */
async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            const delay = baseDelay * Math.pow(2, attempt);  // 1000, 2000, 4000...
            console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError!;  // All retries failed
}

// Usage
async function fetchWithRetry(): Promise<void> {
    const data = await retryWithBackoff(
        () => unreliableOperation(),
        3,   // max 3 retries
        1000 // start with 1 second delay
    );
    console.log('Finally got:', data);
}


// ============================================================================
// 8️⃣ ASYNC ITERATION (for await...of)
// ============================================================================

/**
 * PROBLEM: Need to process paginated API data as it arrives
 * SOLUTION: Async generator yields values over time
 * 
 * WHEN TO USE:
 * - Paginated API responses
 * - Streaming data
 * - Large datasets processed in chunks
 */
async function* fetchPaginatedData(
    totalPages: number
): AsyncGenerator<{ page: number; data: string[] }> {
    for (let page = 1; page <= totalPages; page++) {
        // Simulate API call for each page
        await new Promise(resolve => setTimeout(resolve, 500));
        yield { page, data: [`Item from page ${page}`] };
    }
}

// Consuming async generator with for-await-of
async function processAllPages(): Promise<void> {
    // Each iteration awaits the next value automatically
    for await (const { page, data } of fetchPaginatedData(5)) {
        console.log(`Page ${page}:`, data);
        // Process each page as it arrives, don't wait for all pages
    }
}


// ============================================================================
// 🅰️ ANGULAR-SPECIFIC ASYNC PATTERNS
// ============================================================================

/**
 * PATTERN 1: Convert Observable to Promise
 * 
 * PROBLEM: Sometimes you just need a single value, not a stream
 * SOLUTION: firstValueFrom converts Observable to Promise
 * 
 * import { firstValueFrom } from 'rxjs';
 * 
 * async loadUsers(): Promise<void> {
 *     // Convert Observable to Promise
 *     const users = await firstValueFrom(this.http.get<User[]>('/api/users'));
 *     this.users = users;
 * }
 */

/**
 * PATTERN 2: Async in ngOnInit
 * 
 * PROBLEM: Need to load data when component initializes
 * SOLUTION: Make ngOnInit async
 * 
 * async ngOnInit(): Promise<void> {
 *     try {
 *         this.loading = true;
 *         this.user = await this.userService.getUser();
 *         this.orders = await this.orderService.getOrders(this.user.id);
 *     } finally {
 *         this.loading = false;
 *     }
 * }
 */

/**
 * PATTERN 3: Async route resolver
 * 
 * PROBLEM: Need data before route activates
 * SOLUTION: Resolver can return Promise
 * 
 * export const userResolver: ResolveFn<User> = async (route) => {
 *     const userService = inject(UserService);
 *     const id = route.params['id'];
 *     return await firstValueFrom(userService.getById(id));
 * };
 */

/**
 * WHEN TO USE Observable vs Promise IN ANGULAR:
 * 
 * USE OBSERVABLE:
 * ✅ HTTP requests (Angular's default, better for interceptors)
 * ✅ Values that emit multiple times (WebSockets, intervals)
 * ✅ Need RxJS operators (debounce, switchMap, etc.)
 * ✅ Need to cancel subscription
 * 
 * USE PROMISE (async/await):
 * ✅ Simple one-shot operations
 * ✅ When you find Observable overhead unnecessary
 * ✅ Interoperating with Promise-based libraries
 * ✅ Route resolvers with simple data
 */


// ============================================================================
// HELPER TYPES & MOCK FUNCTIONS
// ============================================================================

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    userId: number;
    total: number;
}

interface OrderDetails {
    id: number;
    items: string[];
}

async function fetchUsers(): Promise<User[]> {
    await new Promise(r => setTimeout(r, 1000));
    return [{ id: 1, name: 'John', email: 'john@test.com' }];
}

async function fetchProducts(): Promise<string[]> {
    await new Promise(r => setTimeout(r, 1000));
    return ['Product 1', 'Product 2'];
}

async function fetchOrders(): Promise<Order[]> {
    await new Promise(r => setTimeout(r, 1000));
    return [{ id: 1, userId: 1, total: 100 }];
}

async function fetchUserOrders(userId: number): Promise<Order[]> {
    await new Promise(r => setTimeout(r, 500));
    return [{ id: 1, userId, total: 99.99 }];
}

async function fetchOrderDetails(orderId: number): Promise<OrderDetails> {
    await new Promise(r => setTimeout(r, 500));
    return { id: orderId, items: ['Item 1', 'Item 2'] };
}


// ============================================================================
// EXPORTS
// ============================================================================

export {
    fetchUserById,
    safeAsync,
    retryWithBackoff,
    fetchWithTimeout,
    loadDataParallel,
    loadWithAllSettled,
    fetchPaginatedData
};
