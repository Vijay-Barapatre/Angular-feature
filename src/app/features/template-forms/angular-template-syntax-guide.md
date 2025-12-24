# 📘 Angular Template Syntax & Variables Guide

Angular uses a unique syntax in its HTML templates to interact with your Component's TypeScript code. Here is a detailed breakdown of the "variables" and symbols you see.

---

## 1. Property Binding `[ ]` (One-Way: TS ➔ HTML)
Think of `[ ]` as a **box** where you put value **INTO** an element.

*   **Meaning**: "Evaluate this as code/variable, not a string."
*   **Direction**: Component Class ➔ Template (HTML).
*   **Usage**: Setting properties of HTML elements, components, or directives.

### Examples
| Syntax | Meaning | Equivalent TS |
| :--- | :--- | :--- |
| `<img [src]="user.avatarUrl">` | Bind `src` property to `user.avatarUrl` variable. | `img.src = this.user.avatarUrl` |
| `<button [disabled]="!isValid">` | Disable button if `isValid` is false. | `btn.disabled = !this.isValid` |
| `<app-child [item]="currentItem">` | Pass `currentItem` data into child component's `@Input()`. | `child.item = this.currentItem` |

> **Key Rule**: If you omit `[]`, Angular treats the value as a plain **string literal**.
> *   `value="Hello"` → The string "Hello".
> *   `[value]="greeting"` → The value of the variable `greeting`.

---

## 2. Event Binding `( )` (One-Way: HTML ➔ TS)
Think of `( )` as a **tunnel** where events come **OUT** of an element.

*   **Meaning**: "Listen for this event."
*   **Direction**: Template (HTML) ➔ Component Class.
*   **Usage**: Reacting to user clicks, keystrokes, form submissions, etc.

### Examples
| Syntax | Meaning |
| :--- | :--- |
| `<button (click)="save()">` | Call the `save()` method when clicked. |
| `<input (input)="onType($event)">` | Call `onType` every time the user types. `$event` contains the data. |
| `<form (ngSubmit)="submit()">` | Listen to Angular's special form submission event. |

---

## 3. Two-Way Binding `[( )]` (Banana in a Box)
Combines `[ ]` (In) and `( )` (Out) to sync data both ways.

*   **Meaning**: "Keep the Template and Component in sync."
*   **Direction**: Component ⇄ Template.
*   **Usage**: Mostly forms inputs.

### Examples
```html
<input [(ngModel)]="username">
```
*   **TS updates**: If you change `this.username = 'Bob'`, the input updates.
*   **User types**: If user types 'Alice', `this.username` becomes 'Alice'.

> **Note**: This is syntactic sugar for:
> `<input [ngModel]="username" (ngModelChange)="username = $event">`

---

## 4. Template Reference Variables `#variable`
Think of `#` as a **sticky note** or label you put on an element to reference it elsewhere in the *same* template.

*   **Meaning**: "Give this element a local name."
*   **Scope**: Only available inside the HTML template (not in TS unless you use `@ViewChild`).

### Examples

**A. Referencing a DOM Element**
```html
<input #phoneInput type="text">
<button (click)="call(phoneInput.value)">Call</button>
```
*   `#phoneInput` creates a reference to the actual `<input>` DOM element.
*   We can access `.value` immediately in the button.

**B. Referencing a Directive/Component**
```html
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
```
*   Here, `#loginForm` does **NOT** point to the `<form>` element.
*   It points to the `ngForm` directive instance (which has properties like `.valid`, `.value`).
*   Syntax: `#name="exportAsName"`.

### 💡 Deep Dive: How `exportAs` Works?
When you write `#var="xyz"`, Angular looks for a Directive on that element that has defined `exportAs: 'xyz'` in its metadata.

**Example: NgForm Source Code**
```typescript
@Directive({
  selector: 'form:not([ngNoForm])',
  exportAs: 'ngForm', // <--- THIS is what you are referencing!
  ...
})
export class NgForm ...
```
1.  **`#ref` (No assignment)**: Gets the **ElementRef** (DOM Node).
2.  **`#ref="ngForm"`**: Gets the **NgForm Class Instance** (API).

### 🔍 Deep Dive Example: `#regForm="ngForm"`

1.  **`#regForm`**: Creates a generic template variable.
    *   *Normally*: Points to the raw HTML `<form>` element.
2.  **`="ngForm"`**: The `exportAs` assignment.
    *   *Effect*: Tells Angular, "Don't give me the HTML Element. Give me the instance of the **`NgForm` directive** instead."
3.  **Why?**
    *   **HTMLFormElement** is 'dumb'.
    *   **NgForm Directive** is 'smart'—it contains API properties like `.valid`, `.value`, `.reset()`, etc.

### 🔍 Deep Dive Example: `<input #nameCtrl="ngModel">`

1.  **`#nameCtrl`**: Creates a variable name for this input.
2.  **`="ngModel"`**: The critical `exportAs` assignment.
    *   *Effect*: Gets the **`NgModel` directive instance** attached to this input.
3.  **Why?**
    *   **HTMLInputElement**: Has `value` but doesn't know about validation rules, touched state, or Angular validators.
    *   **NgModel Directive**: Tracks:
        *   `.valid` / `.invalid` (Did it pass validators?)
        *   `.touched` (Did user leave the field?)
        *   `.dirty` (Did user change the value?)
        *   `.errors` (Specific validation failures like `{ required: true }`)

---

## 5. Structural Directive Variables `let-variable`
Used with `*ngFor` and `*ngIf` (newer `@for` / `@if`) to create local variables for that block of HTML.

```html
<div *ngFor="let user of users; let i = index">
  {{ i + 1 }}. {{ user.name }}
</div>
```
*   `let user`: Creates a local variable `user` for each iteration.
*   `let i`: Creates a local variable `i` for the index.
*   **Scope**: Only exists inside the `<div>`.

### B. New Syntax (@for)
```html
@for (user of users; track user.id; let i = $index) {
  <p>{{ i }} - {{ user.name }}</p>
}
```

---

## 6. Interpolation `{{ }}`
The "Mustache" syntax.

*   **Meaning**: "Print this string value here."
*   **Usage**: Displaying read-only text.

```html
<h1>Welcome, {{ user.firstName }}!</h1>
<p>Sum: {{ 1 + 1 }}</p>
```

---

## 7. Class & Style Parsing `[class.x]` / `[style.y]`
Special bindings for CSS.

### Class Binding
*   `[class.my-class]="condition"`: Adds class `my-class` if `condition` is true.
    *   Example: `<div [class.error]="hasError">`

### Style Binding
*   `[style.color]="isImportant ? 'red' : 'black'"`: Sets the CSS style property.
*   `[style.width.px]="100"`: Sets width to 100px.

---

---

## 8. Accessing Validation Errors `control.errors?.['key']`
A common pattern in forms to check specific validation failures.

```typescript
nameCtrl.errors?.['required']
```
**Breakdown:**
1.  **`nameCtrl`**: The Template Variable referring to the `ngModel` directive.
2.  **`.errors`**: The property holding validation errors (null if valid).
3.  **`?.` (Safe Navigation Operator)**: Checking "Does errors exist?". If `errors` is null, it stops and returns null (preventing a crash).
4.  **`['required']`**: Checking if the specific error key `required` exists in the error object.

---

## Summary Cheat Sheet

| Symbol | Name | Variable Type | Example |
| :--- | :--- | :--- | :--- |
| `{{ }}` | Interpolation | Read Value | `Hello {{ name }}` |
| `[ ]` | Property Binding | Input Code | `[disabled]="isValid"` |
| `( )` | Event Binding | Output Event | `(click)="go()"` |
| `[( )]` | Two-Way Binding | Input & Output | `[(ngModel)]="name"` |
| `#` | Template Reference | Element/Directive Ref | `<form #myForm="ngForm">` |
| `let` | Structural Variable | Loop Item/Context | `*ngFor="let item of list"` |
| `*` | Structural Directive | Changes Layout | `*ngIf="show"` |
