# ✅ Use Case 2: Validation & Error Handling

> **Goal**: Provide immediate user feedback and prevent invalid command submission using Template-Driven strategies.

---

## 1. ❓ When to Use Template Validation?

Use Angular's template-based validation when:
*   **Simple Logic**: You just need standard checks like "required", "minlength", or "email format".
*   **Quick Feedback**: You want to show errors immediately as the user types or leaves a field.
*   **Visual States**: You want to style inputs (red border) based on validity without writing custom CSS logic.
*   **Legacy/Simple Apps**: You are maintaining a straightforward CRUD application where complex cross-field validation isn't needed.

---

## 2. 🌍 Real-World Scenarios

### 🛒 Scenario A: Checkout Address Form
*   **Requirement**: "Zip Code" must be exactly 5 digits.
*   **Implementation**: Use `pattern="^[0-9]{5}$"` and check `zipCtrl.errors?.pattern`.

### 📝 Scenario B: Signup Form
*   **Requirement**: "Username" is required but don't nag the user until they click away (blur).
*   **Implementation**: Show error only when `control.invalid && control.touched`.

### 📧 Scenario C: Newsletter Subscription
*   **Requirement**: Submit button should be disabled until a valid email is entered.
*   **Implementation**: Bind `[disabled]="form.invalid"` to the submit button.

---

## 3. 🔍 How It Works: Under the Hood

### The Mechanism
Angular attaches `FormControl` objects to every input with `ngModel`. These controls track three main states:
1.  **Status**: `valid` / `invalid` / `pending`
2.  **Interaction**: `touched` (blurred) / `untouched`
3.  **Changes**: `dirty` (changed) / `pristine`

By exporting `ngModel` to a local variable (`#emailCtrl="ngModel"`), you gain access to these states directly in your template.

### 📊 Validation Flow diagram

```mermaid
graph LR
    Input[Input Field] -->|Validators: required, email| Control[FormControl]
    
    Control -->|Validates| Errors{Has Errors?}
    
    Errors -- Yes --> StateInvalid[Invalid]
    Errors -- No --> StateValid[Valid]
    
    StateInvalid -->|#ref="ngModel"| Template[Show/Hide Logic]
    StateValid -->|#ref="ngModel"| Template
    
    Template -->|*ngIf="ref.errors?.required"| Msg[Error Message]
```

---

## 4. 🚀 Step-by-Step Implementation

### Step 1: Add Validator Attributes
Use standard HTML5 attributes (`required`, `minlength`, `maxlength`, `pattern`) or Angular directives (`email`).

```html
<input type="text" required minlength="3">
```

### Step 2: Export ngModel
This breaks open the black box so you can see inside the control.

```html
<input ... #nameCtrl="ngModel">
```

### Step 3: Show Errors
Combine `invalid` and `touched` (so you don't yell at the user before they start typing).

```html
<div *ngIf="nameCtrl.invalid && nameCtrl.touched">
  <small *ngIf="nameCtrl.errors?.['required']">Required!</small>
</div>
```

### Step 4: Styling
Angular automatically adds CSS classes like `.ng-invalid`, `.ng-dirty`, `.ng-touched` to the input element. You can style these directly.

```css
input.ng-invalid.ng-touched {
  border-color: red;
}
```

---

## 5. 🎤 Interview & Scenario Questions

### 🛑 Scenario 1: "Dirty" vs "Touched"
**Q: What is the difference between `dirty` and `touched`? When should I use which?**
> **A:** 
> *   **`dirty`**: The value has been *changed* by the user. Use this if you want to know if there is unsaved work.
> *   **`touched`**: The user has focused and then left (blurred) the field. Use this for validation messages so you don't show errors before they've even finished typing.

### ❓ Scenario 2: Disabling Submit Button
**Q: How do I disable the submit button if the form is invalid?**
> **A:** Export the `ngForm` (`<form #f="ngForm">`) and bind to its global validity: `<button [disabled]="f.invalid">Submit</button>`.

### 🐛 Scenario 3: Pattern Validation
**Q: My `pattern` validator isn't working for a regex like `[A-Z]+`. Why?**
> **A:** In HTML, attributes are strings. Angular might interpret simple regex as just a string. Safe bet: Bind it as a property `[pattern]="'^[A-Z]+$'"`. Also, ensure `ngModel` is present.

### 🔍 Scenario 4: Accessing Errors
**Q: How do I know *which* error failed?**
> **A:** Access the `errors` object on the control reference (`ref.errors`). It will contain keys like `{ required: true }` or `{ minlength: { requiredLength: 5, actualLength: 3 } }`.

---

---

## 6. Deep Dive: The Validation Error Object
When a validator fails, it returns a `ValidationErrors` object (a simple JSON object).

### 🧐 How is it created?
Every validator function follows this signature:
`ValidatorFn = (control) => Errors | null`

1.  **If Valid**: Returns `null`.
2.  **If Invalid**: Returns an object where:
    *   **Key**: The name of the error (e.g., `required`, `minlength`).

### 🛠️ Who decides the structure?
**The Validator Function.**
Angular doesn't magically know what `requiredLength` is. The `MinLengthValidator` code explicitly creates that object.

**Example: A Custom "Must be 'Admin'" Validator**
```typescript
function adminValidator(control: AbstractControl) {
  const value = control.value;
  
  // 1. Logic: Check if value is NOT 'admin'
  if (value !== 'admin') {
    
    // 2. Return the Error Object (YOU decide the structure)
    return { 
      'notAdmin': { // <--- The Key 
        expected: 'admin', 
        actual: value 
      } 
    }; 
  }
  
  // 3. Valid? Return null
  return null;
}
```
*   **Result in Template**: `control.errors?.['notAdmin']`

**Example: How `MinLength` actually works internally**
This is why you see `requiredLength` and `actualLength` in the error object:
```typescript
function minLengthValidator(minLength: number) {
    return (control) => {
        // 1. Angular runs this logic
        if (control.value.length < minLength) {
            
            // 2. The Validator MANUALLY creates this object
            return { 
                minlength: { 
                    requiredLength: minLength, 
                    actualLength: control.value.length 
                } 
            };
        }
        return null; // Valid
    };
}
```



### 🧬 Anatomy of the Error Object
Let's inspect what `nameCtrl.errors` actually looks like in memory:

#### Case 1: Required Error
```javascript
{
  "required": true
}
```

#### Case 2: MinLength Error (More details!)
```javascript
{
  "minlength": {
    "requiredLength": 5,
    "actualLength": 3
  }
}
```

#### Case 3: Multiple Errors (Rare, as usually one fails first)
```javascript
{
  "required": true,
  "pattern": { "requiredPattern": "^[A-Z]+$", "actualValue": "abc" }
}
```

### 🔓 Accessing It Safely
Since `errors` is `null` when the field is valid, you MUST use the **Safe Navigation Operator (`?.`)** or Angular's safe indexing.

**Syntax Breakdown:**
```html
control.errors?.['errorName']
```
1.  **`control`**: Your exported variable (`#nameCtrl="ngModel"`).
2.  **`.errors`**: The property holding the object above.
3.  **`?.`**: "only proceed if not null".
4.  **`['errorName']`**: Access the specific key (e.g., `minlength`).

---

## 7. 🧠 Summary Cheat Sheet

| State Property | Meaning | Example Use Case |
| :--- | :--- | :--- |
| **`valid`** | Passes all checks. | Enable "Submit" button. |
| **`invalid`** | Fails at least one check. | Show red border / error text. |
| **`touched`** | User visited & left. | Show error messages (don't nag too early). |
| **`dirty`** | User changed value. | Warn "Unsaved Changes". |
| **`pristine`** | Value is unchanged. | Hide "Reset" button. |
| **`errors`** | Object with failure details. | Display specific message (e.g. "Too short"). |

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  TEMPLATE FORM VALIDATION                                   │
│                                                             │
│   SETUP:                                                    │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ <input                                                │ │
│   │   name="email"                                        │ │
│   │   [(ngModel)]="user.email"                            │ │
│   │   required                     ← HTML5 validator      │ │
│   │   minlength="3"                ← Length check         │ │
│   │   email                        ← Angular email check  │ │
│   │   #emailCtrl="ngModel"         ← Export control ref!  │ │
│   │ >                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   SHOW ERRORS (when touched):                               │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ <div *ngIf="emailCtrl.invalid && emailCtrl.touched">  │ │
│   │   <span *ngIf="emailCtrl.errors?.['required']">       │ │
│   │     Email is required!                                │ │
│   │   </span>                                             │ │
│   │   <span *ngIf="emailCtrl.errors?.['email']">          │ │
│   │     Invalid email format!                             │ │
│   │   </span>                                             │ │
│   │ </div>                                                │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   CSS CLASSES (auto-added by Angular):                      │
│   ng-valid, ng-invalid, ng-touched, ng-dirty, ng-pristine  │
└─────────────────────────────────────────────────────────────┘
```

---

## ❓ Additional Interview Questions (20+)

### Validation State Questions

**Q5: What's the difference between pristine and dirty?**
> A: `pristine` - value never changed; `dirty` - value has been modified.

**Q6: When is a control considered touched?**
> A: When the user has focused and then blurred (left) the field.

**Q7: How do you programmatically mark a control as touched?**
> A: `control.markAsTouched()` or `form.markAllAsTouched()`.

**Q8: What's pending status?**
> A: `pending` means async validators are running and haven't completed.

---

### Validator Questions

**Q9: List built-in template validators.**
> A: `required`, `minlength`, `maxlength`, `pattern`, `email`, `min`, `max`.

**Q10: How do you access minlength error details?**
> A: `errors?.['minlength'].requiredLength` and `.actualLength`.

**Q11: Can you have multiple errors at once?**
> A: Yes, `errors` object can have multiple keys (all failing validators).

**Q12: How do you create custom template validators?**
> A: Create directive implementing `Validator` with `NG_VALIDATORS` provider.

---

### Error Handling Questions

**Q13: Why use touched check before showing errors?**
> A: To avoid showing errors before user has interacted with the field.

**Q14: How do you show all errors at once?**
> A: Iterate over `Object.keys(control.errors)` or check each one.

**Q15: How do you reset validation state?**
> A: `form.resetForm()` or `control.reset()`.

**Q16: How do you force validation to run?**
> A: `control.updateValueAndValidity()`.

---

### CSS Styling Questions

**Q17: What CSS classes does Angular add for validation?**
> A: `ng-valid/ng-invalid`, `ng-pristine/ng-dirty`, `ng-touched/ng-untouched`.

**Q18: How do you style invalid touched fields?**
> A: `input.ng-invalid.ng-touched { border-color: red; }`.

**Q19: How do you add custom classes on validation?**
> A: Use `[class.error]="control.invalid && control.touched"`.

---

### Advanced Questions

**Q20: How do async validators work in template forms?**
> A: Create directive with `AsyncValidator` and `NG_ASYNC_VALIDATORS`.

**Q21: How do you validate matching passwords?**
> A: Custom directive comparing two fields, applied to form group.

**Q22: What's updateOn option?**
> A: `[ngModelOptions]="{updateOn: 'blur'}"` - validate on blur, not every keystroke.

**Q23: How do you show server-side errors?**
> A: Set errors manually: `control.setErrors({serverError: 'Email taken'})`.

