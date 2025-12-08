# 💾 Use Case 2: CanDeactivate (Functional)

> **Goal**: Prevent users from accidentally losing unsaved work by intercepting navigation attempts.

---

## 1. 🔍 How It Works

### The Mechanism
1.  **Component Interface**: Define a contract (e.g., `hasUnsavedChanges()`) that your component implements.
2.  **Guard Logic**: The guard checks if the *current component instance* satisfies the condition.
3.  **User Choice**: If changes exist, block navigation (`return false`) or prompt the user (`window.confirm`).

### 📊 Guard Flow

```mermaid
graph TD
    User([User]) -->|Tries to Leave| Navigation
    Navigation -->|Triggers| Guard{unsavedChangesGuard}
    
    Guard -->|Check Component| Dirty{isDirty?}
    
    Dirty -- Yes --> Confirm{User Confirms?}
    Dirty -- No --> Allow
    
    Confirm -- Stay --> Block[Cancel Nav]
    Confirm -- Leave --> Allow[Proceed Nav]
    
    style Guard fill:#fff3e0,stroke:#f59e0b
    style Dirty fill:#e1f5fe,stroke:#01579b
    style Block fill:#fee2e2,stroke:#b91c1c
```

---

## 2. 🚀 Step-by-Step Implementation

### Step 1: Interface & Guard
Define what capability you are checking for.

```typescript
// unsaved-changes.guard.ts
export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('Discard changes?');
  }
  return true;
};
```

### Step 2: The Component
Implement the interface logic.

```typescript
// form.component.ts
export class FormComponent implements CanComponentDeactivate {
  isDirty = false;

  hasUnsavedChanges() {
    return this.isDirty;
  }
}
```

### Step 3: Registering in Routes
Add it to `canDeactivate`.

```typescript
// guards.routes.ts
{
  path: 'edit',
  component: FormComponent,
  canDeactivate: [unsavedChangesGuard] // <--- Here
}
```

---

## 🔧 Implementation Flow Mindmap

This mindmap shows **how the use case is implemented** step-by-step:

```mermaid
mindmap
  root((CanDeactivate Implementation))
    Step 1 Define Interface
      CanComponentDeactivate
      hasUnsavedChanges method
    Step 2 Create Guard
      Check component instance
      Call hasUnsavedChanges
      Return boolean or confirm
    Step 3 Component
      Implement Interface
      Track dirty state
    Step 4 Register
      Open Route Config
      Add to canDeactivate array
```

---

## 3. 🧠 Mind Map: Quick Visual Reference

```mermaid
mindmap
  root((CanDeactivate))
    Purpose
      Prevent Data Loss
      Confirm Navigation
    Key Elements
      CanDeactivateFn
      Component Instance
      Return Boolean / Observable
    Best Practice
      Use Interface
      Keep Guard Generic
```
