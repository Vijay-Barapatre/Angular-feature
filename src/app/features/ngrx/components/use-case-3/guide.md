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
