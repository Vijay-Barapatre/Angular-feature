# 🎛️ Use Case 6: Multiple Inputs & Outputs

> **Goal**: Master the art of managing complex components that require many data points and emit multiple types of events.

---

## 1. 🔍 How It Works (The Concept)

### The Mechanism
Real-world components are rarely simple. A "User Profile Editor" might need a username, bio, avatar, and preferences (Inputs) and need to save, cancel, or validate (Outputs).
*   **Default Behavior**: Creating a separate `@Input` for every single property. This works but can get messy ("Input Soup").
*   **Optimized Behavior**: Grouping related inputs into **Configuration Objects** (Interfaces) and defining clear, distinct Output events for specific actions.

### 📊 Data Flow Diagram

```mermaid
graph TD
    subgraph "Parent Component"
        P_Data[User Data Object]
        P_Handlers[Handlers: onSave, onCancel]
    end

    subgraph "Child Component (Profile Editor)"
        C_Inputs[Inputs: username, bio, notifications]
        C_Logic[Internal Logic: Temp State]
        C_Outputs[Outputs: save, cancel, fieldChange]
    end

    P_Data --"1. Pass Individual Props"--> C_Inputs
    C_Inputs --"2. Init Temp State"--> C_Logic
    C_Logic --"3. User Edits"--> C_Logic
    C_Logic --"4. Emit Events"--> C_Outputs
    C_Outputs --"5. Update Parent"--> P_Handlers

    style P_Data fill:#e1f5fe,stroke:#01579b
    style C_Inputs fill:#fff3e0,stroke:#ff6f00
    style C_Outputs fill:#fff3e0,stroke:#ff6f00
```

---

## 2. 🚀 Step-by-Step Implementation Guide

### Step 1: Define the Data Shape
Always start with an Interface.

```typescript
// child.component.ts
export interface UserData {
  username: string;
  bio: string;
  notifications: boolean;
}
```

### Step 2: The Child Component (Provider)
Handle multiple inputs and outputs. Use internal state (`temp...`) to avoid mutating inputs directly.

```typescript
// child.component.ts
@Component({ ... })
export class ChildComponent {
  // --- Inputs ---
  @Input() username: string = '';
  @Input() bio: string = '';
  
  // --- Outputs ---
  @Output() save = new EventEmitter<UserData>();
  @Output() cancel = new EventEmitter<void>();
  @Output() fieldChange = new EventEmitter<string>();

  // --- Internal State ---
  tempUsername = '';

  ngOnChanges() {
    // Sync inputs to internal state when they change
    this.tempUsername = this.username;
  }

  onSave() {
    // Emit the full object back
    this.save.emit({
      username: this.tempUsername,
      bio: this.bio, // ... etc
      notifications: false
    });
  }
}
```

### Step 3: The Parent Component (Consumer)
Bind everything in the template.

```typescript
// parent.component.ts
@Component({
  template: `
    <app-child
      [username]="user.username"
      [bio]="user.bio"
      (save)="handleSave($event)"
      (cancel)="handleCancel()"
      (fieldChange)="logChange($event)">
    </app-child>
  `
})
export class ParentComponent {
  user = { username: 'Dev', bio: 'Coding...' };

  handleSave(newData: UserData) {
    this.user = newData; // Update source of truth
  }
}
```

### 📊 Implementation Visualization

```mermaid
sequenceDiagram
    participant Parent
    participant Child
    
    Note over Parent: user = { name: 'A', bio: 'B' }
    Parent->>Child: [username]='A', [bio]='B'
    
    Note over Child: User types 'C' in username
    Child->>Parent: (fieldChange).emit('username')
    
    Note over Child: User clicks Save
    Child->>Parent: (save).emit({ name: 'C', bio: 'B' })
    
    Note over Parent: Update user object
```

---

## 3. 🐛 Common Pitfalls & Debugging

### ❌ "Input Soup" (Too Many Inputs)
**Bad Code:**
```typescript
@Input() firstName: string;
@Input() lastName: string;
@Input() age: number;
@Input() address: string;
@Input() city: string;
// ... 20 more inputs
```
**Why it fails:** The template becomes unreadable: `<app-child [firstName]="..." [lastName]="..." ...>`.
**Fix:** Group them into a single configuration object: `@Input() config: UserConfig`.

### ❌ Mutating Inputs Directly
**Bad Code:**
```typescript
updateName(val: string) {
  this.username = val; // ❌ Modifying the Input directly!
}
```
**Why it fails:** If the parent re-renders, it will overwrite your local changes with the original value.
**Fix:** Copy inputs to a local property (`tempUsername`) on `ngOnInit` or `ngOnChanges`, edit the copy, then emit the result.

---

## 4. ⚡ Performance & Architecture

### Performance: Config Object vs. Individual Inputs
*   **Individual Inputs**: Good for Change Detection (Angular knows exactly which property changed).
*   **Config Object**: Cleaner code, but if you pass a new object reference every time, you might trigger unnecessary checks.
    *   *Tip*: Use `OnPush` change detection.

### Architecture: The "Form" Pattern
This pattern (Inputs -> Internal State -> Output) mimics how HTML Forms work.
*   **Inputs**: `value="..."` (Initial state)
*   **Internal**: User types (Dirty state)
*   **Output**: `(submit)` (Final state)

---

## 5. 🌍 Real World Use Cases

1.  **Rich Text Editor**: Inputs for `content`, `toolbarConfig`, `readOnly`. Outputs for `contentChange`, `selectionChange`, `save`.
2.  **Dashboard Widget**: Inputs for `title`, `chartType`, `data`. Outputs for `refresh`, `expand`, `remove`.
3.  **Complex Filter Panel**: Inputs for `currentFilters`. Outputs for `applyFilters`, `clearAll`.

---

## 6. 📝 The Analogy: "The Sound Mixing Board" 🎚️

Think of a **DJ's Mixing Board**.
*   **Inputs**: The music tracks coming in (Channels 1, 2, 3).
*   **Knobs & Sliders**: The DJ (Child Component) adjusts volume, bass, treble (Internal State).
*   **Outputs**: The final "Master Mix" sent to the speakers (Parent).
*   The DJ doesn't change the *original* record; they manipulate the signal and send out a *new* mix.

---

## 🔧 Implementation Flow Mindmap

This mindmap shows **how multiple inputs and outputs are implemented** step-by-step:

```mermaid
mindmap
  root((Use Case 6 Implementation))
    Step 1 Define Data Shape
      Create UserData interface
        username string
        bio string
        notifications boolean
    Step 2 Child Inputs
      Multiple @Input decorators
        @Input username
        @Input bio
      Or config object
        @Input config UserData
    Step 3 Internal State
      Copy inputs locally
        tempUsername property
        tempBio property
      ngOnChanges sync
        Update temp on input change
      Never mutate inputs
        Edit copies only
    Step 4 Multiple Outputs
      Distinct events
        @Output save
        @Output cancel
        @Output fieldChange
      Typed payloads
        EventEmitter UserData
        EventEmitter void
    Step 5 Parent Binding
      Template
        Bind each input
        Listen to each output
      Handlers
        handleSave event
        handleCancel
        logChange field
    Step 6 Form Pattern
      Inputs equals initial state
      Internal equals dirty state
      Outputs equals final state
      Atomic updates
        Emit full object
```

---

## 🧠 Mind Map: Quick Visual Reference

```mermaid
mindmap
  root((Multiple Inputs Outputs))
    Managing Inputs
      Group related props
      Config object pattern
      Interface for shape
      Avoid Input Soup
    Multiple Outputs
      Distinct event names
      save cancel delete
      fieldChange for tracking
      Typed payloads
    Internal State
      Copy inputs locally
      tempValue pattern
      ngOnChanges sync
      Never mutate inputs
    Form Pattern
      Inputs equals Initial state
      Internal equals Dirty state
      Outputs equals Final state
      Atomic updates
    Performance
      OnPush friendly
      Config object refs
      Individual input changes
    Use Cases
      Profile editors
      Filter panels
      Dashboard widgets
```

---

## 7. ❓ Interview & Concept Questions

### Q1: When should I group inputs into an object?
**A:** When the inputs are tightly coupled (e.g., `street`, `city`, `zip` usually go together) or when you have more than 5-6 inputs related to the same entity.

### Q2: How do I handle state synchronization?
**A:** Use `ngOnChanges`. When the Parent updates an Input, the Child should detect it and update its internal `temp` state to match, ensuring the UI stays in sync.

### Q3: Can I have an Output with the same name as an Input?
**A:** No, but you can have `name` and `nameChange` (Two-Way Binding pattern). If they are unrelated, use distinct names to avoid confusion.

### Q4: What is the benefit of emitting a full object on Save?
**A:** Atomicity. The Parent receives the entire valid state at once. It avoids partial updates where the username is updated but the bio isn't.

### Q5: How does `OnPush` affect multiple inputs?
**A:** With `OnPush`, the Child only checks for updates if the *reference* of an Input changes. If you mutate a property inside an input object (`user.name = 'new'`), the Child won't see it. You must pass a new object (`user = { ...user, name: 'new' }`).
