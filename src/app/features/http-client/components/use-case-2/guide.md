# ✏️ Use Case 2: CRUD Operations

> **Goal**: Master Create, Read, Update, Delete operations with HttpClient.

---

## 1. 🔍 How It Works

### HTTP Methods Mapping

| Operation | HTTP Method | Request Body | Response |
|-----------|-------------|--------------|----------|
| **Create** | POST | ✅ Yes | Created resource |
| **Read** | GET | ❌ No | Resource(s) |
| **Update** | PUT/PATCH | ✅ Yes | Updated resource |
| **Delete** | DELETE | ❌ Usually no | Empty (204) |

### 📊 CRUD Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#667eea'}}}%%
flowchart LR
    subgraph Client
        C[Component]
        S[Service]
    end
    
    subgraph Server
        API[REST API]
        DB[(Database)]
    end
    
    C -->|"createUser(data)"| S
    S -->|"POST /users"| API
    API -->|"INSERT"| DB
    DB -->|"New ID"| API
    API -->|"201 Created"| S
    S -->|"Observable<User>"| C
    
    style C fill:#667eea,color:#fff
    style API fill:#f5576c,color:#fff
```

---

## 2. 🚀 Step-by-Step Implementation

### CREATE (POST)

```typescript
createUser(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/users`, userData);
    // Body is automatically serialized to JSON
}

// Usage
this.apiService.createUser({ name: 'John', email: 'john@test.com' })
    .subscribe(newUser => console.log('Created:', newUser));
```

### READ (GET)

```typescript
// Get all
getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
}

// Get one
getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${id}`);
}
```

### UPDATE (PUT)

```typescript
updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/users/${id}`, data);
}
```

### DELETE

```typescript
deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/users/${id}`);
}
```

---

## 3. 🐛 Common Pitfalls

### ❌ Mutating Original Data

```typescript
// ❌ BAD: Mutates the original object in the list
selectUser(user: User) {
    this.editingUser = user;
}
```

**Fix:**
```typescript
// ✅ GOOD: Create a copy
selectUser(user: User) {
    this.editingUser = { ...user };
}
```

---

## 4. 🌍 Real World Uses

1. **Admin Panel** - Manage users, products, content
2. **Form Submissions** - Create/update records
3. **Shopping Cart** - Add/remove items

---

## 5. ❓ Interview Questions

### Basic Questions

#### Q1: What's the difference between PUT and PATCH?
**Answer:**
| Method | Purpose | What it sends |
|--------|---------|---------------|
| PUT | Replace entire resource | Full object |
| PATCH | Update specific fields | Only changed fields |

```typescript
// PUT: Send entire user object
http.put('/users/1', { id: 1, name: 'John', email: 'j@test.com', age: 30 })

// PATCH: Send only what changed
http.patch('/users/1', { name: 'John Updated' })
```

#### Q2: What HTTP status codes indicate success for each CRUD operation?
**Answer:**
| Operation | Success Status |
|-----------|---------------|
| Create (POST) | 201 Created |
| Read (GET) | 200 OK |
| Update (PUT/PATCH) | 200 OK or 204 No Content |
| Delete (DELETE) | 200 OK or 204 No Content |

#### Q3: Why should you clone objects before editing?
**Answer:**
To avoid mutating the original data in the list. If you edit the original and the save fails, the UI shows incorrect data.
```typescript
// ❌ Bad: Editing original reference
this.editingUser = user;

// ✅ Good: Create a copy
this.editingUser = { ...user };
```

---

### Scenario-Based Questions

#### Scenario 1: Optimistic Updates
**Question:** The user edits a record. You want to update the UI immediately for better UX, but rollback if the server save fails. How do you implement this?

**Answer:**
```typescript
saveEdit(): void {
    // 1. Store original for rollback
    const original = { ...this.users[index] };
    
    // 2. Update UI immediately (optimistic)
    this.users[index] = this.editingUser;
    
    // 3. Sync with server
    this.apiService.updateUser(this.editingUser).subscribe({
        next: () => {
            this.showSuccess('Saved!');
        },
        error: () => {
            // 4. ROLLBACK on failure
            this.users[index] = original;
            this.showError('Save failed');
        }
    });
}
```

---

#### Scenario 2: Bulk Delete
**Question:** User selects 5 items and clicks "Delete Selected". How do you handle this efficiently?

**Answer:**
**Option A: Single batch endpoint (preferred)**
```typescript
deleteSelected(ids: number[]): Observable<void> {
    return this.http.post('/api/users/bulk-delete', { ids });
}
```

**Option B: Parallel individual deletes**
```typescript
deleteSelected(ids: number[]): void {
    forkJoin(
        ids.map(id => this.apiService.deleteUser(id))
    ).subscribe({
        next: () => this.loadUsers(),
        error: (err) => this.showError('Some deletes failed')
    });
}
```

---

#### Scenario 3: Refresh After Create
**Question:** After creating a new user, you need to refresh the list. What's the best approach?

**Answer:**
**Option A: Add returned user to list (no extra request)**
```typescript
this.apiService.createUser(newUser).subscribe(createdUser => {
    // Server returns user with ID
    this.users.push(createdUser);
});
```

**Option B: Refetch entire list (simpler, but more network)**
```typescript
this.apiService.createUser(newUser).pipe(
    switchMap(() => this.apiService.getUsers())
).subscribe(users => {
    this.users = users;
});
```

---

#### Scenario 4: Inline Edit vs Modal Edit
**Question:** When would you choose inline editing vs modal editing?

**Answer:**
| Inline Edit | Modal Edit |
|-------------|------------|
| Quick, simple fields | Complex forms |
| Single field changes | Multiple related fields |
| High-frequency edits | Validation needed |
| List/table context | Need more space |

---

### Advanced Questions

#### Q4: What is idempotency and why does it matter?
**Answer:**
An idempotent operation produces the same result regardless of how many times it's executed.

| Method | Idempotent? | Why |
|--------|-------------|-----|
| GET | ✅ Yes | Reading doesn't change state |
| PUT | ✅ Yes | Same data = same result |
| DELETE | ✅ Yes | Deleting deleted resource = no change |
| POST | ❌ No | Each call may create new resource |

#### Q5: How do you handle concurrent edits (two users editing same record)?
**Answer:**
1. **Optimistic Locking**: Check version/timestamp before saving
2. **ETags**: Server returns ETag, client sends If-Match header
3. **Last Write Wins**: Simple but may lose data
4. **Lock Record**: Prevent other edits while one user is editing

---

## 🧠 Mind Map

```mermaid
mindmap
  root((CRUD))
    Create
      POST
      Request body
      Returns new resource
    Read
      GET
      No body
      Returns data
    Update
      PUT full replace
      PATCH partial
      Request body
    Delete
      DELETE
      No body usually
      Returns 204
```

