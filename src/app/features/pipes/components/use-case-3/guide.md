# ⚡ Use Case 3: Pure vs Impure Pipes

> **💡 Lightbulb Moment**: Pure pipes are cached and only run when inputs change. Impure pipes run on EVERY change detection - use carefully!

---

## 1. 🔍 Pure vs Impure

| Aspect | Pure (default) | Impure |
|--------|---------------|--------|
| Caching | Yes (memoized) | No |
| Runs when | Input changes | Every CD cycle |
| Performance | Great | Can be bad |
| Use case | Stateless transforms | Dynamic data |

---

## 2. 🚀 Examples

### Pure Pipe (Default)
```typescript
@Pipe({ name: 'double', standalone: true, pure: true })  // pure: true is default
export class DoublePipe implements PipeTransform {
    transform(value: number): number {
        console.log('DoublePipe called');  // Rarely logs
        return value * 2;
    }
}
```

### Impure Pipe
```typescript
@Pipe({ name: 'filter', standalone: true, pure: false })
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchTerm: string): any[] {
        console.log('FilterPipe called');  // Logs FREQUENTLY
        return items.filter(item => item.name.includes(searchTerm));
    }
}
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: Why doesn't my pipe update when I push to an array?
**Answer:** Pure pipes only run when the reference changes. `array.push()` doesn't change reference:
```typescript
// Won't trigger pure pipe
this.items.push(newItem);

// Will trigger pure pipe
this.items = [...this.items, newItem];
```

#### Q2: Why are impure pipes bad for performance?
**Answer:** They run on EVERY change detection cycle, potentially hundreds of times per second. Each run recalculates the entire result.

#### Q3: When to use impure pipes?
**Answer:** Rarely! Consider:
- Async pipe (built-in impure)
- Pipes that depend on external state
- When you NEED array mutation detection

---

### Scenario-Based Questions

#### Scenario: Filter Pipe Not Updating
**Question:** Filter pipe doesn't update when array changes. Why?

**Answer:**
```typescript
// Problem: Pure pipe + mutation
this.users.push(newUser);  // No update!

// Solutions:
// 1. Create new array reference
this.users = [...this.users, newUser];

// 2. Make pipe impure (not recommended)
@Pipe({ name: 'filter', pure: false })

// 3. Don't use pipe - filter in component
get filteredUsers() {
    return this.users.filter(...);
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Pure vs Impure))
    Pure Default
      Memoized
      Reference check
      Great performance
    Impure
      Every CD cycle
      Mutation detected
      Performance cost
    Solutions
      New references
      Component filtering
      Careful design
```
