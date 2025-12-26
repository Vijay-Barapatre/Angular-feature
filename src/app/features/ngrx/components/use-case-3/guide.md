# 📦 Use Case 3: Entity Adapter

> **💡 Lightbulb Moment**: Entity Adapter transforms your arrays into a **dictionary/map** structure. Finding, updating, or deleting an item is now O(1) instead of O(n)!

---

## 1. 🔍 How It Works

### The Problem with Arrays

```typescript
// Finding user with ID 5 in array of 1000 users
users.find(u => u.id === 5);  // O(n) - might check all 1000

// Updating user with ID 5
users.map(u => u.id === 5 ? { ...u, name: 'New' } : u);  // O(n)
```

### The Entity Solution

```typescript
// Entity State structure
{
  ids: [1, 2, 3, 4, 5],  // Maintains order
  entities: {
    1: { id: 1, name: 'John' },
    2: { id: 2, name: 'Jane' },
    // ...
  }
}

// Finding user with ID 5
entities[5];  // O(1) - instant!

// Updating user with ID 5
{ ...entities, 5: { ...entities[5], name: 'New' } };  // O(1)
```

---

## 2. 🚀 Implementation

### Create Adapter

```typescript
import { createEntityAdapter, EntityState } from '@ngrx/entity';

interface User {
  id: number;
  name: string;
}

// Create adapter with optional sort
export const userAdapter = createEntityAdapter<User>({
  selectId: user => user.id,  // Default is 'id'
  sortComparer: (a, b) => a.name.localeCompare(b.name)  // Optional sorting
});

// Initial state using adapter
export interface UserState extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = userAdapter.getInitialState({
  loading: false,
  error: null
});
```

### Use in Reducer

```typescript
export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => 
    userAdapter.setAll(users, { ...state, loading: false })
  ),
  on(addUser, (state, { user }) => 
    userAdapter.addOne(user, state)
  ),
  on(updateUser, (state, { id, changes }) => 
    userAdapter.updateOne({ id, changes }, state)
  ),
  on(deleteUser, (state, { id }) => 
    userAdapter.removeOne(id, state)
  )
);
```

### Built-in Selectors

```typescript
// Adapter provides selectors automatically!
const { selectIds, selectEntities, selectAll, selectTotal } = userAdapter.getSelectors();

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, selectAll);
export const selectUserEntities = createSelector(selectUserState, selectEntities);
export const selectUserCount = createSelector(selectUserState, selectTotal);
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: What problem does Entity Adapter solve?
**Answer:** It solves the inefficiency of managing collections as arrays. Arrays require O(n) operations for find/update/delete, while Entity Adapter uses a dictionary structure for O(1) operations.

#### Q2: What is the Entity State structure?
**Answer:**
```typescript
{
  ids: string[] | number[],  // Ordered array of IDs
  entities: Dictionary<T>    // { [id]: entity } map
}
```

#### Q3: What selectors does the adapter provide?
**Answer:**
- `selectIds` - Array of all IDs
- `selectEntities` - Dictionary of entities
- `selectAll` - Array of all entities (reconstructed)
- `selectTotal` - Count of entities

---

### Scenario-Based Questions

#### Scenario 1: Upsert Pattern
**Question:** API returns data that may or may not exist. How do you handle "create if new, update if exists"?

**Answer:**
```typescript
on(saveUser, (state, { user }) =>
  userAdapter.upsertOne(user, state)
)

// upsertOne checks if ID exists:
// - If yes: updates the entity
// - If no: adds the entity
```

---

#### Scenario 2: Partial Updates
**Question:** User edits only their email. How do you update just that field?

**Answer:**
```typescript
on(updateEmail, (state, { userId, email }) =>
  userAdapter.updateOne(
    { 
      id: userId, 
      changes: { email }  // Only changed fields
    }, 
    state
  )
)
```

---

#### Scenario 3: Filtering Entities
**Question:** Show only active users from entity state.

**Answer:**
```typescript
export const selectActiveUsers = createSelector(
  selectAllUsers,
  users => users.filter(u => u.isActive)
);
```

---

#### Scenario 4: Finding by ID
**Question:** Get a specific user by ID from state.

**Answer:**
```typescript
// Option 1: Parameterized selector
export const selectUserById = (id: number) => createSelector(
  selectUserEntities,
  entities => entities[id]
);

// Usage
this.store.select(selectUserById(5));
```

---

## 🗄️ Filing Cabinet Analogy (Easy to Remember!)

Think of Entity Adapter like a **filing cabinet vs stacked papers**:

| Concept | Cabinet Analogy | Memory Trick |
|---------|----------------|--------------| 
| **Array** | 📚 **Stack of papers**: Find ID 5? Look through all | **"O(n) search"** |
| **Entity State** | 🗄️ **Filing cabinet**: Find ID 5? Go to folder 5 | **"O(1) lookup"** |
| **ids array** | 📑 **Index tabs**: Quick list of all folders | **"Ordered list"** |
| **entities** | 📁 **Folders**: { 1: {...}, 2: {...}, 5: {...} } | **"Dictionary"** |
| **Adapter** | 🏷️ **Label maker**: Creates/organizes files for you | **"Helper methods"** |

### 📖 Story to Remember:

> 🗄️ **The Office Filing System**
>
> You're managing 1000 employee records:
>
> **The Old Way (Array):**
> ```typescript
> // Find employee 857
> employees.find(e => e.id === 857);  // Check 1, 2, 3... 857
> // Had to check 857 papers! 🐌
> ```
>
> **The Smart Way (Entity Adapter):**
> ```typescript
> // Find employee 857
> entities[857];  // Go directly to folder 857!
> // Instant access! ⚡
> ```
>
> **Adapter does the organizing:**
> ```typescript
> adapter.addOne(employee, state);    // Files correctly
> adapter.updateOne({id, changes});   // Updates folder
> adapter.removeOne(id);              // Removes folder
> ```

### 🎯 Quick Reference:
```
📚 Array          = Stack of papers (slow search)
🗄️ Entity State   = Filing cabinet (instant access)
📑 ids            = Index tabs (order preserved)
📁 entities       = Folders (dictionary)
🏷️ Adapter        = Label maker (helper methods)
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Entity Adapter))
    Structure
      ids array
      entities dictionary
      O(1) lookups
    Methods
      addOne/addMany
      updateOne/updateMany
      removeOne/removeMany
      upsertOne/upsertMany
      setAll
    Selectors
      selectIds
      selectEntities
      selectAll
      selectTotal
    Benefits
      Performance
      Less boilerplate
      Sorting built-in
```

---

## 🎯 What Problem Does This Solve?

### The Problem: Array Operations Are Slow & Error-Prone

When managing collections in NgRx with plain arrays:

**Performance Issues:**
```typescript
// Finding user in array of 10,000 users
users.find(u => u.id === targetId);  // O(n) - checks up to 10,000!

// Updating one user
users.map(u => u.id === targetId ? { ...u, ...changes } : u);  // O(n)

// Deleting one user
users.filter(u => u.id !== targetId);  // O(n)
```

**Boilerplate Hell:**
```typescript
// ❌ Without Entity Adapter - lots of repetitive code
on(addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
})),
on(updateUser, (state, { id, changes }) => ({
    ...state,
    users: state.users.map(u => u.id === id ? { ...u, ...changes } : u)
})),
on(deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id)
}))
```

### How Entity Adapter Solves This

**Normalized State Structure:**
```typescript
// Instead of array:  [user1, user2, user3, ...]
// Entity uses dictionary:
{
    ids: [1, 2, 3],           // Preserves order
    entities: {
        1: { id: 1, name: 'John' },
        2: { id: 2, name: 'Jane' },
        3: { id: 3, name: 'Bob' }
    }
}
```

**O(1) Operations:**
```typescript
// Finding user 857
entities[857];  // Instant! O(1)

// Updating user 857
{ ...entities, 857: { ...entities[857], ...changes } };  // O(1)
```

**Clean Reducer Code:**
```typescript
// ✅ With Entity Adapter - clean and simple
on(addUser, (state, { user }) => adapter.addOne(user, state)),
on(updateUser, (state, { update }) => adapter.updateOne(update, state)),
on(deleteUser, (state, { id }) => adapter.removeOne(id, state))
```

| Aspect | Array | Entity Adapter |
|--------|-------|---------------|
| Find by ID | O(n) loop | O(1) lookup |
| Update one | O(n) map | O(1) update |
| Delete one | O(n) filter | O(1) remove |
| Code complexity | High (manual) | Low (helper methods) |
| Order preserved | Yes | Yes (ids array) |

---

## 📚 Key Classes & Types Explained

### 1. `EntityState<T>` (from `@ngrx/entity`)

```typescript
export interface EntityState<T> {
    ids: string[] | number[];
    entities: Dictionary<T>;
}
```

**What it is:** The shape of normalized state for collections.

**Properties:**
- `ids`: Ordered array of entity IDs (preserves insertion/sort order)
- `entities`: Dictionary mapping ID → entity object

**How to extend:**
```typescript
export interface UserState extends EntityState<User> {
    loading: boolean;
    error: string | null;
    selectedUserId: number | null;
}
```

---

### 2. `createEntityAdapter<T>()` (from `@ngrx/entity`)

```typescript
export const userAdapter = createEntityAdapter<User>({
    selectId: (user) => user.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});
```

**What it is:** Factory function that creates an adapter for your entity type.

**Configuration Options:**

| Option | Purpose | Default |
|--------|---------|---------|
| `selectId` | Function to extract ID from entity | `entity.id` |
| `sortComparer` | Sorting function | None (insertion order) |

**When to use sortComparer:**
- Alphabetical lists: `(a, b) => a.name.localeCompare(b.name)`
- Date ordering: `(a, b) => b.createdAt - a.createdAt`
- Priority: `(a, b) => a.priority - b.priority`

---

### 3. Adapter CRUD Methods

#### Add Methods
```typescript
adapter.addOne(entity, state)      // Add single entity
adapter.addMany(entities, state)   // Add multiple entities
adapter.setAll(entities, state)    // Replace ALL entities
adapter.setOne(entity, state)      // Add or replace single entity
```

#### Update Methods
```typescript
adapter.updateOne({ id, changes }, state)   // Partial update
adapter.updateMany(updates, state)          // Partial update multiple
adapter.upsertOne(entity, state)            // Add if new, update if exists
adapter.upsertMany(entities, state)         // Upsert multiple
```

#### Remove Methods
```typescript
adapter.removeOne(id, state)       // Remove by ID
adapter.removeMany(ids, state)     // Remove multiple by IDs
adapter.removeAll(state)           // Remove ALL entities
```

#### Utility Methods
```typescript
adapter.getInitialState()          // Get empty EntityState
adapter.getInitialState({ loading: false })  // With extra properties
adapter.getSelectors()             // Get built-in selectors
```

---

### 4. `Update<T>` Type

```typescript
interface Update<T> {
    id: string | number;
    changes: Partial<T>;
}
```

**What it is:** Shape for partial updates.

**Usage:**
```typescript
// Update only email of user 5
const update: Update<User> = {
    id: 5,
    changes: { email: 'new@email.com' }
};

adapter.updateOne(update, state);
```

**Why Partial?** You only specify changed fields, not the entire entity.

---

### 5. Built-in Selectors

```typescript
const { selectIds, selectEntities, selectAll, selectTotal } = 
    adapter.getSelectors();
```

| Selector | Returns | Use Case |
|----------|---------|----------|
| `selectIds` | `string[] \| number[]` | Get ordered list of IDs |
| `selectEntities` | `Dictionary<T>` | Get entities dictionary |
| `selectAll` | `T[]` | Get all as array (for *ngFor) |
| `selectTotal` | `number` | Get count of entities |

**Composing with Feature Selector:**
```typescript
const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
    selectUserState,
    selectAll  // From adapter
);

export const selectUserCount = createSelector(
    selectUserState,
    selectTotal
);
```

---

### 6. `Dictionary<T>` Type

```typescript
type Dictionary<T> = { [id: string]: T | undefined };
```

**What it is:** TypeScript type for the entities object.

**Why `undefined`?** Looking up a non-existent ID returns `undefined`:
```typescript
const user = entities[999];  // User | undefined
```

---

## 🌍 Real-World Use Cases

### 1. Product Catalog Management
```typescript
export const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.sku,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

on(loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state, loading: false })
),
on(updateStock, (state, { sku, quantity }) =>
    productAdapter.updateOne({ id: sku, changes: { stock: quantity } }, state)
)
```

### 2. Shopping Cart with Quantities
```typescript
export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

const cartAdapter = createEntityAdapter<CartItem>({
    selectId: (item) => item.productId
});

on(addToCart, (state, { productId, price }) => {
    const existing = state.entities[productId];
    if (existing) {
        return cartAdapter.updateOne(
            { id: productId, changes: { quantity: existing.quantity + 1 } },
            state
        );
    }
    return cartAdapter.addOne({ productId, quantity: 1, price }, state);
})
```

### 3. User Management Dashboard
```typescript
// Bulk operations
on(deleteSelectedUsers, (state) =>
    userAdapter.removeMany(state.selectedIds, state)
),
on(activateAllUsers, (state) =>
    userAdapter.updateMany(
        state.ids.map(id => ({ id, changes: { isActive: true } })),
        state
    )
)
```

### 4. Real-Time Chat Messages
```typescript
const messageAdapter = createEntityAdapter<Message>({
    sortComparer: (a, b) => a.timestamp - b.timestamp  // Oldest first
});

on(newMessageReceived, (state, { message }) =>
    messageAdapter.addOne(message, state)
),
on(markAsRead, (state, { messageIds }) =>
    messageAdapter.updateMany(
        messageIds.map(id => ({ id, changes: { read: true } })),
        state
    )
)
```

### 5. Kanban Board with Drag-Drop
```typescript
const taskAdapter = createEntityAdapter<Task>();

on(moveTask, (state, { taskId, newStatus, newIndex }) => {
    // Update task status
    const updated = taskAdapter.updateOne(
        { id: taskId, changes: { status: newStatus, order: newIndex } },
        state
    );
    // Reorder affected tasks
    return {
        ...updated,
        ids: reorderIds(updated.ids, taskId, newIndex)
    };
})
```

---

## ❓ Complete Interview Questions (20+)

### Basic Conceptual Questions

**Q1: What is the main performance benefit of Entity Adapter?**
> A: O(1) lookups instead of O(n) array searches. Finding, updating, or deleting by ID is instant regardless of collection size.

**Q2: What is the normalized state structure?**
> A: `{ ids: [], entities: {} }` - an ordered ID array and an entities dictionary.

**Q3: Why keep both `ids` array and `entities` object?**
> A: `ids` preserves order (for sorting/display), `entities` provides O(1) lookup. Best of both worlds.

**Q4: What's the difference between `addOne` and `setOne`?**
> A: `addOne` only adds if ID doesn't exist. `setOne` adds if new OR replaces if exists.

**Q5: What does `upsertOne` do?**
> A: "Update or Insert" - adds entity if new, updates if already exists. Perfect for sync operations.

---

### Method-Specific Questions

**Q6: When would you use `setAll` vs `addMany`?**
> A: 
> - `setAll`: REPLACES entire collection (initial load, refresh)
> - `addMany`: ADDS to existing collection (pagination, lazy load)

**Q7: How do you perform a partial update?**
> A: Use `updateOne` with only changed fields:
> ```typescript
> adapter.updateOne({ id: 5, changes: { email: 'new@email.com' } }, state)
> ```

**Q8: What happens if you `addOne` with an existing ID?**
> A: Nothing! The entity is NOT added. Use `setOne` or `upsertOne` to overwrite.

**Q9: How do you clear all entities but keep other state properties?**
> A: Use `removeAll`:
> ```typescript
> adapter.removeAll({ ...state, loading: false })
> ```

---

### Selector Questions

**Q10: What selectors does the adapter provide?**
> A: `selectIds`, `selectEntities`, `selectAll`, `selectTotal`

**Q11: How do you select a single entity by ID?**
> A: Create parameterized selector:
> ```typescript
> export const selectUserById = (id: number) => createSelector(
>     selectUserEntities,
>     entities => entities[id]
> );
> ```

**Q12: How do you filter entities (e.g., only active users)?**
> A: Compose with `selectAll`:
> ```typescript
> export const selectActiveUsers = createSelector(
>     selectAllUsers,
>     users => users.filter(u => u.isActive)
> );
> ```

---

### Configuration Questions

**Q13: How do you use a custom ID field (not `id`)?**
> A: Provide `selectId` function:
> ```typescript
> createEntityAdapter<Product>({
>     selectId: (product) => product.sku
> })
> ```

**Q14: How do you maintain sorted order?**
> A: Provide `sortComparer`:
> ```typescript
> createEntityAdapter<User>({
>     sortComparer: (a, b) => a.lastName.localeCompare(b.lastName)
> })
> ```

**Q15: Can you change sort order after creation?**
> A: Not directly. You'd need to either:
> - Create a new adapter with different comparer
> - Use `setAll` to re-normalize with new order

---

### Scenario-Based Questions

**Q16: API returns list of items. Some exist, some are new. How do you handle?**
> A: Use `upsertMany`:
> ```typescript
> on(loadItemsSuccess, (state, { items }) =>
>     adapter.upsertMany(items, state)
> )
> ```

**Q17: User selects multiple items and clicks "Delete Selected". How?**
> A: Use `removeMany` with selected IDs:
> ```typescript
> on(deleteSelected, (state) =>
>     adapter.removeMany(state.selectedIds, state)
> )
> ```

**Q18: How do you implement "Select All" checkbox?**
> A: Store selected IDs separately, derive from adapter:
> ```typescript
> export const selectAllSelected = createSelector(
>     selectAllUsers,
>     selectSelectedIds,
>     (users, selectedIds) => users.length === selectedIds.length
> );
> ```

**Q19: Real-time data arrives. How do you merge without losing local changes?**
> A: Use `upsertMany` with conflict resolution:
> ```typescript
> on(realTimeUpdate, (state, { items }) => {
>     // Filter out items user is currently editing
>     const safeItems = items.filter(i => !state.editingIds.includes(i.id));
>     return adapter.upsertMany(safeItems, state);
> })
> ```

**Q20: How do you implement optimistic delete with undo?**
> A: Store deleted entity, remove immediately, restore on undo:
> ```typescript
> on(deleteUser, (state, { id }) => ({
>     ...adapter.removeOne(id, state),
>     lastDeleted: state.entities[id]  // Save for undo
> })),
> on(undoDelete, (state) =>
>     state.lastDeleted 
>         ? adapter.addOne(state.lastDeleted, { ...state, lastDeleted: null })
>         : state
> )
> ```

---

### Advanced Architecture Questions

**Q21: How do you handle multiple entity types in one feature?**
> A: Create separate adapters:
> ```typescript
> const productAdapter = createEntityAdapter<Product>();
> const reviewAdapter = createEntityAdapter<Review>();
> 
> interface CatalogState {
>     products: EntityState<Product>;
>     reviews: EntityState<Review>;
> }
> ```

**Q22: How do you handle related entities (e.g., User has many Posts)?**
> A: Store relationships via IDs:
> ```typescript
> interface User {
>     id: number;
>     postIds: number[];  // References to Post entities
> }
> ```

**Q23: When should you NOT use Entity Adapter?**
> A: 
> - Very small collections (< 20 items)
> - Non-unique items (no ID)
> - When order changes frequently without ID changes

**Q24: How do you persist entity state to localStorage?**
> A: Serialize normally, but consider hydration:
> ```typescript
> // Save
> localStorage.setItem('users', JSON.stringify({
>     ids: state.ids,
>     entities: state.entities
> }));
> 
> // Restore
> const saved = JSON.parse(localStorage.getItem('users'));
> return adapter.setAll(Object.values(saved.entities), initialState);
> ```

**Q25: Can you use Entity Adapter with ngrx/data?**
> A: Yes! `@ngrx/data` uses Entity Adapter internally. You get the benefits automatically with less boilerplate.

