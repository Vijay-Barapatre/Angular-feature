# 🔗 Use Case 6: Chaining Pipes

> **💡 Lightbulb Moment**: Pipes can be chained! Output of one becomes input of the next.

---

## 1. 🔍 How Chaining Works

```html
{{ value | pipe1 | pipe2 | pipe3 }}
```

Each pipe transforms the output of the previous one.

---

## 2. 🚀 Examples

### Text Transformation
```html
{{ name | lowercase | titlecase }}
<!-- "JOHN DOE" → "john doe" → "John Doe" -->
```

### Date + Uppercase
```html
{{ birthDate | date:'MMMM' | uppercase }}
<!-- date object → "December" → "DECEMBER" -->
```

### Async + JSON
```html
<pre>{{ user$ | async | json }}</pre>
<!-- Observable → User object → JSON string -->
```

### Slice + Custom
```html
{{ items | slice:0:5 | sortBy:'name' }}
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: What order do chained pipes execute?
**Answer:** Left to right. First pipe's output is second pipe's input.

#### Q2: Can you chain any pipes?
**Answer:** Yes, as long as output type of pipe N matches input type of pipe N+1.

---

### Scenario-Based Questions

#### Scenario: Format Currency with Symbol
**Question:** Display price as "$1,234.56 USD" (with code)

**Answer:**
```html
{{ price | currency:'USD':'symbol':'1.2-2' }} USD
<!-- Or create custom pipe that does both -->
```

#### Scenario: Top 3 Sorted Users
**Question:** Get first 3 users sorted by name from observable.

**Answer:**
```html
@for (user of users$ | async | sortBy:'name' | slice:0:3; track user.id) {
    {{ user.name }}
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Pipe Chaining))
    Order
      Left to right
      Output to input
      Type compatibility
    Common Chains
      async + json
      date + uppercase
      slice + custom
    Performance
      Each pipe runs
      Pure = cached
      Order matters
```
