/**
 * ============================================================================
 * 🔄 ARRAY METHODS - COMPREHENSIVE EXAMPLES
 * ============================================================================
 * 
 * Functional array methods are essential for Angular development.
 * They're used constantly in components, services, and NgRx selectors.
 * 
 * KEY PRINCIPLES:
 * - These methods DON'T mutate the original array
 * - They return new arrays/values
 * - Can be chained together
 * - Perfect for reactive programming (RxJS)
 * 
 * ============================================================================
 */


// ============================================================================
// SAMPLE DATA
// ============================================================================

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
    quantity: number;
}

const products: Product[] = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999, inStock: true, quantity: 10 },
    { id: 2, name: 'Phone', category: 'electronics', price: 699, inStock: true, quantity: 25 },
    { id: 3, name: 'Headphones', category: 'electronics', price: 199, inStock: false, quantity: 0 },
    { id: 4, name: 'Desk', category: 'furniture', price: 299, inStock: true, quantity: 5 },
    { id: 5, name: 'Chair', category: 'furniture', price: 149, inStock: true, quantity: 15 },
    { id: 6, name: 'Lamp', category: 'furniture', price: 49, inStock: false, quantity: 0 },
];


// ============================================================================
// 1️⃣ map() - TRANSFORM EACH ELEMENT
// ============================================================================

/**
 * map creates a NEW array with transformed elements
 * Original array is NOT modified
 */

// Get array of names
const productNames: string[] = products.map(p => p.name);
// ['Laptop', 'Phone', 'Headphones', 'Desk', 'Chair', 'Lamp']

// Transform to different shape
interface ProductDTO {
    id: number;
    displayName: string;
    formattedPrice: string;
}

const productDTOs: ProductDTO[] = products.map(p => ({
    id: p.id,
    displayName: `${p.name} (${p.category})`,
    formattedPrice: `$${p.price.toFixed(2)}`
}));

// Apply calculation
const pricesWithTax = products.map(p => ({
    ...p,
    priceWithTax: p.price * 1.1
}));

// Get index in map
const indexed = products.map((p, index) => ({
    ...p,
    position: index + 1
}));


// ============================================================================
// 2️⃣ filter() - SELECT ELEMENTS
// ============================================================================

/**
 * filter creates a NEW array with elements that pass the test
 */

// Simple condition
const inStockProducts = products.filter(p => p.inStock);
const outOfStock = products.filter(p => !p.inStock);

// Multiple conditions
const affordableElectronics = products.filter(
    p => p.category === 'electronics' && p.price < 500
);

// Complex conditions
const readyToShip = products.filter(
    p => p.inStock && p.quantity > 0
);

// Truthy filtering
const withQuantity = products.filter(p => p.quantity);  // quantity > 0


// ============================================================================
// 3️⃣ reduce() - AGGREGATE VALUES
// ============================================================================

/**
 * reduce processes array into a single value
 * Parameters: (accumulator, currentValue, index, array)
 */

// Sum
const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0  // Initial value
);

// Count
const inStockCount = products.reduce(
    (count, p) => p.inStock ? count + 1 : count,
    0
);

// Build object from array
const productById: Record<number, Product> = products.reduce(
    (map, p) => ({ ...map, [p.id]: p }),
    {}
);

// Group by category
const byCategory: Record<string, Product[]> = products.reduce(
    (groups, p) => ({
        ...groups,
        [p.category]: [...(groups[p.category] || []), p]
    }),
    {} as Record<string, Product[]>
);

// Find min/max
const cheapest = products.reduce(
    (min, p) => p.price < min.price ? p : min
);

const mostExpensive = products.reduce(
    (max, p) => p.price > max.price ? p : max
);

// Average
const averagePrice = products.reduce(
    (sum, p) => sum + p.price,
    0
) / products.length;


// ============================================================================
// 4️⃣ find() & findIndex() - SEARCH
// ============================================================================

/**
 * find returns FIRST element that matches (or undefined)
 */
const laptop = products.find(p => p.name === 'Laptop');
const firstElectronic = products.find(p => p.category === 'electronics');

/**
 * findIndex returns index of FIRST match (or -1)
 */
const laptopIndex = products.findIndex(p => p.name === 'Laptop');
const chairIndex = products.findIndex(p => p.id === 5);


// ============================================================================
// 5️⃣ some() & every() - TEST CONDITIONS
// ============================================================================

/**
 * some - returns true if ANY element passes (short-circuits)
 */
const hasOutOfStock = products.some(p => !p.inStock);
const hasExpensive = products.some(p => p.price > 500);

/**
 * every - returns true if ALL elements pass
 */
const allInStock = products.every(p => p.inStock);
const allAffordable = products.every(p => p.price < 1000);


// ============================================================================
// 6️⃣ includes() & indexOf() - EXISTENCE CHECK
// ============================================================================

const numbers = [1, 2, 3, 4, 5];

/**
 * includes - check if value exists
 */
const hasThree = numbers.includes(3);  // true
const hasTen = numbers.includes(10);   // false

/**
 * indexOf - get index of value
 */
const indexOfThree = numbers.indexOf(3);  // 2
const indexOfTen = numbers.indexOf(10);   // -1


// ============================================================================
// 7️⃣ sort() - ORDER ELEMENTS
// ============================================================================

/**
 * ⚠️ sort MUTATES the original array!
 * Always spread first: [...array].sort()
 */

// Sort numbers (default is string comparison!)
const nums = [10, 2, 30, 4];
const sortedNums = [...nums].sort((a, b) => a - b);  // [2, 4, 10, 30]
const descNums = [...nums].sort((a, b) => b - a);     // [30, 10, 4, 2]

// Sort objects
const byPriceAsc = [...products].sort((a, b) => a.price - b.price);
const byPriceDesc = [...products].sort((a, b) => b.price - a.price);

// Sort strings
const byName = [...products].sort((a, b) => a.name.localeCompare(b.name));

// Multi-level sort
const byCategoryThenPrice = [...products].sort((a, b) => {
    const categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare !== 0) return categoryCompare;
    return a.price - b.price;
});


// ============================================================================
// 8️⃣ flat() & flatMap() - FLATTEN ARRAYS
// ============================================================================

/**
 * flat - flatten nested arrays
 */
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.flat();  // [1, 2, 3, 4, 5, 6]

const deepNested = [1, [2, [3, [4]]]];
const deepFlat = deepNested.flat(Infinity);  // [1, 2, 3, 4]

/**
 * flatMap - map then flatten (one level)
 */
interface Order {
    id: number;
    items: string[];
}

const orders: Order[] = [
    { id: 1, items: ['apple', 'banana'] },
    { id: 2, items: ['orange', 'grape'] }
];

const allItems = orders.flatMap(order => order.items);
// ['apple', 'banana', 'orange', 'grape']


// ============================================================================
// 9️⃣ METHOD CHAINING - COMBINE METHODS
// ============================================================================

/**
 * Chain methods for complex transformations
 * This is the POWER of functional array methods
 */

// Real-world example: Get display-ready product list
const displayProducts = products
    .filter(p => p.inStock)                              // Only in stock
    .filter(p => p.price < 500)                          // Under $500
    .map(p => ({                                          // Transform shape
        id: p.id,
        label: p.name,
        displayPrice: `$${p.price.toFixed(2)}`,
        badge: p.quantity < 5 ? 'Low Stock' : null
    }))
    .sort((a, b) => a.label.localeCompare(b.label));     // Sort A-Z

// NgRx selector pattern
const selectAffordableElectronics = (state: { products: Product[] }) =>
    state.products
        .filter(p => p.category === 'electronics')
        .filter(p => p.inStock)
        .filter(p => p.price < 300)
        .sort((a, b) => a.price - b.price);


// ============================================================================
// 🔟 UTILITY FUNCTIONS
// ============================================================================

/**
 * Unique values
 */
function unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

const categories = unique(products.map(p => p.category));
// ['electronics', 'furniture']

/**
 * Group by key
 */
function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
    return arr.reduce((groups, item) => {
        const keyValue = String(item[key]);
        return {
            ...groups,
            [keyValue]: [...(groups[keyValue] || []), item]
        };
    }, {} as Record<string, T[]>);
}

const grouped = groupBy(products, 'category');

/**
 * Chunk array
 */
function chunk<T>(arr: T[], size: number): T[][] {
    return arr.reduce((chunks, item, index) => {
        const chunkIndex = Math.floor(index / size);
        if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
        chunks[chunkIndex].push(item);
        return chunks;
    }, [] as T[][]);
}

const chunked = chunk([1, 2, 3, 4, 5], 2);  // [[1, 2], [3, 4], [5]]


// ============================================================================
// EXPORTS
// ============================================================================

export {
    products,
    productDTOs,
    byCategory,
    productById,
    unique,
    groupBy,
    chunk
};

export type {
    Product,
    ProductDTO
};
