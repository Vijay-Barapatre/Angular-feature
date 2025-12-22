# Use Case 7: Input Setters

This guide explains the "Input Setter" pattern in Angular, a powerful technique for intercepting, validating, and reacting to data changes passed from a parent component.

## ❓ What Problem Does It Solve?

When building reusable components, you often face these challenges:

1.  **Validation**: A parent might pass invalid data (e.g., a status that doesn't exist).
2.  **Normalization**: Data might arrive in different formats (e.g., "Active", "active", "  active  ").
3.  **Derived State**: Changing one input might need to update other internal properties (e.g., looking up a color code based on a status string).
4.  **Side Effects**: You might need to trigger a log, an animation, or an API call *specifically* when one input changes.

Using `ngOnChanges` for this can be overkill and messy if you have many unrelated inputs. The **Input Setter** pattern keeps the logic clean and collocated with the property itself.

## 🛠️ The Implementation

### 1. The Syntax

Instead of a simple property:

```typescript
@Input() status: string;
```

You split it into a private property, a setter, and a getter:

```typescript
private _status: string; // Internal storage

@Input()
set status(value: string) {
    // 1. Intercept & Execute Logic
    console.log('Got new status:', value);
    
    // 2. Assign to internal property
    this._status = value;
}

get status(): string {
    return this._status;
}
```

### 2. Real-World Example: Status Badge

In our example component, we want to display a badge. The parent sends a string, but we need to:
1.  **Clean it**: "  ACTIVE " -> "active"
2.  **Validate it**: Only allow ['active', 'inactive', 'pending', 'error']
3.  **Color it**: Pick a color based on the final status.

```typescript
@Input()
set status(value: string) {
    // Sanitize
    const normalized = (value || '').trim().toLowerCase();
    
    // Validate
    const valid = ['active', 'inactive', 'pending', 'error'].includes(normalized);
    this._status = valid ? normalized : 'unknown';

    // Derived State (Side Effect)
    this.statusColor = this.getColorFor(this._status);
}
```

## 🆚 Comparison

| Feature | Input Setter | ngOnChanges | Signals (computed) |
| :--- | :--- | :--- | :--- |
| **Scope** | Specific to ONE input | All inputs in the component | Reactive derived state |
| **Trigger** | Runs on assignment | Runs on change detection cycle | Runs on read (lazy) |
| **Use Case** | Validation, Side Effects on specific prop | Complex dependency between multiple props | Derived data, performance |

## 💡 Key Takeaways

- Use **Setters** to protect your component from bad data ("Defense in Depth").
- Use **Setters** to trigger lightweight side effects (logging, simple calculations).
- Keep the logic fast; setters run every time the parent updates the binding.
