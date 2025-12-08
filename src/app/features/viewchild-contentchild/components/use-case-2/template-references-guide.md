# 🔗 Use Case 2: `@ViewChild` with Template References (DOM Access)

> **Goal**: Learn how to use `@ViewChild` with Template Reference Variables (`#ref`) to get direct access to native DOM elements.

---

## 1. 🔍 How It Works (The Concept)

### The Mechanism
In the previous use case, we accessed a **Component Instance**. But what if you need to access a raw HTML element like `<input>` or `<div>`?
You create a **Template Reference Variable** (e.g., `#myInput`) and then query it with `@ViewChild`. Angular gives you an `ElementRef`, which is a wrapper around the actual `nativeElement`.

### Default vs. Optimized Behavior
*   **Default (Manual Querying)**: `document.getElementById('myInput')`. This is error-prone and not Angular-aware.
*   **Optimized (ViewChild)**: `@ViewChild('myInput') inputRef: ElementRef`. Angular manages the reference lifecycle for you.

### 📊 Data Flow Diagram

```mermaid
graph TD
    subgraph "Template"
        Template["&lt;input #inputRef&gt;"]
    end

    subgraph "TypeScript Class"
        Decorator["@ViewChild('inputRef')"]
        Property["inputElement: ElementRef"]
        Native["inputElement.nativeElement"]
    end

    Template --"1. Template Ref Created"--> Decorator
    Decorator --"2. Resolves to"--> Property
    Property --"3. Access via"--> Native
    Native --"4. DOM API"--> DOMAction[".focus(), .value, etc."]

    style Template fill:#e1f5fe,stroke:#01579b
    style Decorator fill:#fff3e0,stroke:#ff6f00
    style Native fill:#c8e6c9,stroke:#2e7d32
```

---

## 2. 🚀 Step-by-Step Implementation Guide

### Step 1: Add Template Reference Variable
In your HTML template, add a `#` variable to the element.

```html
<!-- parent.component.html -->
<input #inputRef type="text" placeholder="Search...">
<div #scrollContainer class="content">
  ...
</div>
```

### Step 2: Query with `@ViewChild`
In TypeScript, query the reference by its string name.

```typescript
// parent.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({ ... })
export class ParentComponent implements AfterViewInit {
  // 🛡️ CRITICAL: Pass the string name of the template ref
  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('scrollContainer') scrollEl!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    // Available here!
    console.log(this.inputElement.nativeElement);
  }

  focusInput() {
    // 🛡️ CRITICAL: Access the real DOM via .nativeElement
    this.inputElement.nativeElement.focus();
  }

  scrollToBottom() {
    const el = this.scrollEl.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
```

### 📊 Implementation Visualization

```mermaid
sequenceDiagram
    participant Template
    participant Angular
    participant Component

    Note over Template: &lt;input #inputRef&gt;
    Angular->>Component: ngAfterViewInit()
    Angular->>Component: Sets this.inputElement = ElementRef

    Note over Component: User clicks "Focus" button
    Component->>Template: this.inputElement.nativeElement.focus()
    Note over Template: Input is now focused
```

---

## 3. 🐛 Common Pitfalls & Debugging

### ❌ Forgetting `.nativeElement`
**Bad Code:**
```typescript
focusInput() {
  this.inputElement.focus(); // ❌ ElementRef has no 'focus' method
}
```
**Fix:** Access the underlying DOM element via `.nativeElement`.
```typescript
focusInput() {
  this.inputElement.nativeElement.focus(); // ✅
}
```

### ❌ Using Wrong Type
**Bad Code:**
```typescript
@ViewChild('inputRef') inputElement!: ElementRef; // No type param
```
**Why it fails:** `.nativeElement` will be typed as `any`, losing autocompletion.
**Fix:** Provide the HTML element type:
```typescript
@ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>; // ✅
```

---

## 4. ⚡ Performance & Architecture

### Performance
*   **Direct Access**: Calling `.focus()` or `.scrollTop = x` is a single, direct DOM API call. There's no Angular overhead.
*   **Avoid Heavy DOM Manipulation**: If you find yourself doing loops of `.appendChild`, consider using Angular's `*ngFor` or structural directives instead.

### Architecture: When to Use
*   ✅ **Focus Management**: Moving focus to an input after an action.
*   ✅ **Scroll Control**: Scrolling a chat window to the latest message.
*   ✅ **Reading Dimensions**: Getting `getBoundingClientRect()` for positioning tooltips.
*   ❌ **Data Binding**: Don't use `nativeElement.value = ...` for regular data. Use `[(ngModel)]` or `formControl`.

---

## 5. 🌍 Real World Use Cases

1.  **Search Inputs**: Auto-focus the search box when a dropdown opens.
2.  **Chat Applications**: Scroll to the bottom of the message list when a new message arrives.
3.  **Custom Video/Audio Players**: Calling `.play()`, `.pause()`, `.currentTime = 0` on native `<video>` elements.

---

## 6. 📝 The Analogy: "The Name Tag" 🏷️

Imagine a conference with many attendees.
*   **Template Ref (`#inputRef`)**: You put a **Name Tag** on a specific person (DOM element).
*   **`@ViewChild('inputRef')`**: You ask the conference organizer (Angular), "Who is wearing the 'inputRef' name tag?"
*   **`ElementRef`**: The organizer gives you a photo ID card (wrapper) of that person.
*   **`.nativeElement`**: You look at the photo and find the actual person to talk to.

---

## 7. ❓ Interview & Concept Questions

### Q1: What is `ElementRef`?
**A:** A wrapper class that holds a reference to a native DOM element. You access the actual element via `.nativeElement`.

### Q2: Why use `ElementRef<HTMLInputElement>` instead of just `ElementRef`?
**A:** For type safety. Without the generic, `.nativeElement` is typed as `any`, losing TypeScript autocompletion and compile-time checks.

### Q3: Is using `nativeElement` a security risk?
**A:** Potentially. If you use `nativeElement.innerHTML = userInput`, you risk XSS attacks. Prefer Angular's data binding, which sanitizes inputs. For safe DOM manipulation, use `Renderer2`.

### Q4: Can I query multiple elements with the same template ref?
**A:** No. `@ViewChild` returns only the *first* match. To get multiple elements, use `@ViewChildren` (returns a `QueryList`).

### Q5: What is `Renderer2` and when should I use it?
**A:** `Renderer2` is an Angular service for platform-agnostic DOM manipulation. Use it for server-side rendering (SSR) or when building libraries that might run in non-browser environments (like Web Workers).
