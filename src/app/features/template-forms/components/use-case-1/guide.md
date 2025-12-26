# 🚀 Use Case 1: Template-Driven Forms (The Basics)

> **Goal**: Understand the fundamental building blocks of Template Driven Forms, why they exist, and the magic happening under the hood.

---

## 🖼️ Visual Flow

![Template Forms Flow](template-forms-use-case-1.png)

---

## 1. ❓ What Problem Does It Solve?

Imagine building a registration form in raw HTML/JS. You would need to:
1.  Query the DOM to get input values (`document.getElementById('email').value`).
2.  Add event listeners to every input to detect changes.
3.  Manually track if a field has been touched or modified.
4.  Write complex logic to sync the input value with your JavaScript variable.

**Template-Driven Forms** solve this by letting **Angular** handle the heavy lifting:
- **Automatic Sync**: Uses `[(ngModel)]` to keep your variables and inputs in sync.
- **Automatic State**: Automatically tracks if a form is `valid`, `dirty`, or `touched`.
- **Declarative**: You define validation (like `required`) right in the HTML, and Angular enforces it.

---

## 2. 🌍 Real-World Scenarios

### 📝 Scenario A: User Profile Edit
*   **Context**: A simple page where a user updates their "Display Name" and "Bio".
*   **Why Template-Driven?**: The data structure matches the UI exactly. You load `this.user` from an API, bind it with `[(ngModel)]`, and send it back. No complex form logic needed.

### 🔍 Scenario B: Search & Filter Bar
*   **Context**: A list of products with a sidebar containing filters for "Price Range" and "Category".
*   **Why Template-Driven?**: You need the values to live-update the list. Two-way binding (`[(ngModel)]`) makes it trivial to trigger a search whenever a filter changes.

### ⚙️ Scenario C: Settings Toggle
*   **Context**: A settings page with checkboxes for "Dark Mode", "Notifications", etc.
*   **Why Template-Driven?**: The state is simple boolean values. Binding directly to a `settings` object is cleaner than creating a reactive form control for every single toggle.

---

## 3. 🔍 How It Works: The "Magic" Classes

Under the hood, Angular uses three key directives to make this work. It's important to understand them for interviews.

### A. `NgForm` (The Container)
- **Selector**: `<form>` (Angular attaches this *automatically* if `FormsModule` is imported).
- **Role**: It creates a top-level `FormGroup` to track the state of the *entire form*.
- **Usage**: You normally export it to a template variable to check validity: `<form #myForm="ngForm">`.

### B. `NgModel` (The Binding)
- **Selector**: `[ngModel]`
- **Role**: It creates a `FormControl` instance for a single input and binds it to your component instance.
- **Critical Rule**: You **MUST** provide a `name` attribute (e.g., `name="email"`). This is how `NgModel` registers itself with the parent `NgForm`.

### C. `ControlValueAccessor` (The Bridge)
- **Role**: A hidden bridge that teaches Angular how to talk to specific DOM elements. It knows how to write to an `<input>` vs a checkbox vs a custom component.

---

## 4. 📝 Deep Dive Implementation

### Step 1: Import FormsModule
This enables the "magic" directives.

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule]
})
```

### Step 2: Template Setup
Define your form and hook up the data.

```html
<!-- 1. Attach #formRef to access state (valid, dirty, value) -->
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">

  <!-- 2. Bind Input -->
  <!-- [(ngModel)]: Two-way binding (View ↔ Component) -->
  <!-- name="email": Registers this control with the parent form as 'email' -->
  <input type="text" 
         name="email" 
         [(ngModel)]="user.email" 
         required>

  <!-- 3. Validation Feedback -->
  <!-- loginForm.controls['email'] gives us the specific FormControl -->
  <div *ngIf="loginForm.controls['email']?.invalid">
    Email is required!
  </div>

  <button type="submit" [disabled]="loginForm.invalid">Login</button>
</form>
```

---

## 5. 🎤 Interview & Scenario Questions

### 🛑 Scenario 1: The "Missing Name" Error
**Q: I added `[(ngModel)]` to my input, but I get an error: *"If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone'."* Why?**
> **A:** When `NgModel` is inside an `NgForm`, it tries to register itself with the parent form to be part of the validation/value tracking. It uses the `name` attribute as the **key**. Without a `name`, it can't register.
> **Fix**: Add `name="myField"`.

### 🔄 Scenario 2: Two-Way Binding Syntax
**Q: Explain `[(ngModel)]`. What is it actually doing?**
> **A:** It is "Banana-in-a-Box" syntax, which combines a property binding `[ngModel]` (Model → View) and an event binding `(ngModelChange)` (View → Model). It keeps the component property and the input value perfectly in sync.

### 🆚 Scenario 3: Template vs Reactive Forms
**Q: When should I use Template-Driven forms over Reactive Forms?**
> **A:** 
> *   **Use Template-Driven** for simple forms (login, signup) where the logic is straightforward and validation structure is static. It's easier to write (less boilerplate).
> *   **Use Reactive Forms** for complex, dynamic forms, or when you need unit testing (since logic is in the Class, not the Template).

### 🛠️ Scenario 4: Accessing Form Data
**Q: How do I get the form values when the user clicks submit?**
> **A:** You can pass the form reference `(ngSubmit)="save(myForm)"`. In the method, `myForm.value` will give you a JSON object of all fields: `{ email: '...', password: '...' }`.

---

## 🧠 Summary Cheat Sheet

| Directive | Role | Critical Requirement |
| :--- | :--- | :--- |
| **`NgForm`** | Automatically attaches to `<form>`. Tracks overall validity. | Import `FormsModule`. |
| **`NgModel`** | Attaches to inputs. Tracks individual field state. | Requires `name` attribute. |
| **`#ref="ngForm"`** | Exports the form instance to a variable. | Used to disable buttons or show error messages. |

---

## ❓ Additional Interview Questions (20+)

### Basic Conceptual Questions

**Q5: What is FormsModule and why is it required?**
> A: FormsModule provides the directives (NgForm, NgModel) that enable template-driven forms. Without importing it, Angular won't recognize `ngModel` or track form state.

**Q6: What's the difference between `[ngModel]` and `[(ngModel)]`?**
> A: `[ngModel]` is one-way binding (model → view only). `[(ngModel)]` is two-way binding (model ↔ view).

**Q7: What does NgForm create under the hood?**
> A: NgForm creates a top-level `FormGroup` instance that aggregates all child `NgModel` controls.

**Q8: What CSS classes does Angular add to form controls?**
> A: Angular adds: `ng-valid/ng-invalid`, `ng-pristine/ng-dirty`, `ng-touched/ng-untouched`.

---

### Validation Questions

**Q9: How do you add validation in template-driven forms?**
> A: Use HTML5 attributes directly: `required`, `minlength`, `maxlength`, `pattern`, `email`.

**Q10: How do you show validation errors?**
> A: Export the control with `#email="ngModel"` and check `email.invalid && email.touched`.

**Q11: How do you create a custom validator?**
> A: Create a directive that implements `Validator` interface and provides `NG_VALIDATORS`.

**Q12: What's the difference between `invalid` and `touched`?**
> A: `invalid` means validation failed; `touched` means the user has focused and left the field.

---

### Form State Questions

**Q13: How do you reset a form?**
> A: Call `form.reset()` or `form.resetForm()` on the NgForm reference.

**Q14: How do you set initial values?**
> A: Bind the component property that `[(ngModel)]` is connected to.

**Q15: How do you check if form has unsaved changes?**
> A: Check `form.dirty` - it's true if any control value has changed.

**Q16: How do you disable the submit button?**
> A: `[disabled]="form.invalid"` or `[disabled]="!form.valid"`.

---

### Advanced Questions

**Q17: Can you use template-driven forms with signals?**
> A: Yes, but signals require manual integration. `[(ngModel)]` works with writable signals using `signal()` and `.set()`.

**Q18: What is `ngModelChange` event?**
> A: An event emitted when the model value changes - the second half of banana-in-a-box syntax.

**Q19: How do you access form values programmatically?**
> A: Use `form.value` object which contains all control values keyed by name.

**Q20: What's `standalone` in NgModel?**
> A: `[ngModel]="value" [ngModelOptions]="{standalone: true}"` creates a control outside NgForm.

**Q21: How do you validate matching passwords?**
> A: Create a custom validator directive that compares two fields in the form.

**Q22: When is ngAfterViewInit needed with forms?**
> A: When you need to access the NgForm reference, as it's a ViewChild.

**Q23: How do you handle async validation?**
> A: Create a directive implementing `AsyncValidator` with `NG_ASYNC_VALIDATORS`.

**Q24: What's the difference between NgForm and FormGroup?**
> A: NgForm is a directive that creates a FormGroup. FormGroup is the underlying model class.

