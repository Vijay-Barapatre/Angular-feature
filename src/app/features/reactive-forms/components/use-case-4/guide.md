# ✅ Use Case 4: Built-in Validators

> **Goal**: Master Angular's built-in validators for common validation scenarios.

---

## 1. 🔍 How It Works (The Concept)

### The Core Mechanism

Validators are functions that check if a control's value meets certain criteria. Angular provides built-in validators for common scenarios. When validation fails, an **errors object** is populated.

```typescript
// Applying validators
new FormControl('', [Validators.required, Validators.minLength(3)])

// Errors object when invalid
{ required: true }
{ minlength: { requiredLength: 3, actualLength: 2 } }
```

### Default vs. Optimized Behavior

| Without Validators | With Validators |
|-------------------|-----------------|
| Accept any input | Enforce rules |
| No user feedback | Clear error messages |
| Submit invalid data | Prevent bad submissions |

### 📊 Validation Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#10b981'}}}%%
flowchart LR
    User["👤 User Types"] --> FC["FormControl"]
    FC --> V{"Validators Run"}
    V -->|Pass| Valid["✅ control.valid = true"]
    V -->|Fail| Invalid["❌ control.errors = { ... }"]
    Invalid --> UI["Show Error Message"]
    
    style V fill:#667eea,color:#fff
    style Valid fill:#10b981,color:#fff
    style Invalid fill:#ef4444,color:#fff
```

---

## 2. 🚀 Step-by-Step Implementation Guide

### Step 1: Import Validators

```typescript
import { Validators, FormControl, FormGroup } from '@angular/forms';
```

### Step 2: Apply Validators to Controls

```typescript
this.form = new FormGroup({
    // Single validator
    name: new FormControl('', Validators.required),
    
    // Multiple validators - use array
    email: new FormControl('', [
        Validators.required,
        Validators.email
    ]),
    
    // Numeric validators
    age: new FormControl(null, [
        Validators.min(18),
        Validators.max(100)
    ]),
    
    // Pattern (regex)
    phone: new FormControl('', Validators.pattern(/^\d{3}-\d{3}-\d{4}$/))
});
```

### Step 3: Display Errors in Template

```html
<input formControlName="email" [class.invalid]="isInvalid('email')">

@if (isInvalid('email')) {
    <div class="errors">
        @if (form.get('email')?.errors?.['required']) {
            <span>Email is required</span>
        }
        @if (form.get('email')?.errors?.['email']) {
            <span>Invalid email format</span>
        }
    </div>
}
```

### Step 4: Helper Method for Cleaner Template

```typescript
isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    // Show errors only if dirty or touched
    return !!(control?.invalid && (control.dirty || control.touched));
}
```

### 📊 Validators Reference Table

```mermaid
%%{init: {'theme':'base'}}%%
graph LR
    subgraph Validators["📋 Built-in Validators"]
        R["required"] --> R1["Field not empty"]
        ML["minLength(n)"] --> ML1["Min n chars"]
        MX["maxLength(n)"] --> MX1["Max n chars"]
        MIN["min(n)"] --> MIN1["Numeric >= n"]
        MAX["max(n)"] --> MAX1["Numeric <= n"]
        E["email"] --> E1["Valid email format"]
        P["pattern(regex)"] --> P1["Matches regex"]
        RT["requiredTrue"] --> RT1["Checkbox checked"]
    end
    
    style R fill:#667eea,color:#fff
    style E fill:#667eea,color:#fff
    style P fill:#667eea,color:#fff
```

---

## 3. 🐛 Common Pitfalls & Debugging

### ❌ Pitfall 1: Showing Errors Immediately

**Bad Code:**
```html
<!-- Shows error before user interacts -->
@if (form.get('email')?.invalid) {
    <span>Email is required</span>
}
```

**Issue:** User sees error on page load before they've done anything!

**Fix:**
```html
<!-- Only show if dirty or touched -->
@if (form.get('email')?.invalid && form.get('email')?.touched) {
    <span>Email is required</span>
}
```

---

### ❌ Pitfall 2: Confusing min/max with minLength/maxLength

**Bad Code:**
```typescript
// ❌ Want to limit password to 8+ chars
password: new FormControl('', Validators.min(8))
```

**Issue:** `Validators.min` is for NUMBERS, not strings!

**Fix:**
```typescript
// ✅ Use minLength for string length
password: new FormControl('', Validators.minLength(8))
```

---

### ❌ Pitfall 3: Accessing Wrong Error Key

**Bad Code:**
```html
<!-- ❌ Wrong key 'minLength' (camelCase) -->
@if (form.get('name')?.errors?.['minLength']) { ... }
```

**Issue:** Error keys are lowercase: `minlength`, `maxlength`

**Fix:**
```html
<!-- ✅ Correct lowercase key -->
@if (form.get('name')?.errors?.['minlength']) { ... }
```

---

## 4. ⚡ Performance & Architecture

### Performance Tips

| Tip | Why |
|-----|-----|
| Use `updateOn: 'blur'` | Validate only when user leaves field, not on every keystroke |
| Combine validators wisely | Don't add redundant checks |
| Async validators last | Run expensive checks only if sync validators pass |

### Update Strategy

```typescript
// Validate on blur instead of change (better UX)
new FormControl('', {
    validators: [Validators.required],
    updateOn: 'blur'
});
```

---

## 5. 🌍 Real World Use Cases

1. **Registration Form**: Username (3-20 chars), email (valid format), password (8+ chars, complexity).
2. **Payment Form**: Credit card (pattern), expiry (pattern MM/YY), CVV (3-4 digits).
3. **Profile Settings**: Age (18-120), phone (pattern), website (pattern URL).

---

## 🚪 Club Bouncer Analogy (Easy to Remember!)

Think of validators like **bouncers at a club**:

| Validator | Bouncer Rule | Memory Trick |
|-----------|-------------|--------------| 
| **required** | 🪪 **"Show ID!"**: Must have something | **"Not empty"** |
| **minLength(8)** | 📏 **"Too short!"**: Check length | **"Min chars"** |
| **email** | 📧 **"Valid email?"**: Format check | **"@ required"** |
| **min(18)** | 🔞 **"Must be 18+"**: Age check | **"Min number"** |
| **pattern** | 👔 **"Dress code"**: Specific format | **"Regex match"** |

### 📖 Story to Remember:

> 🚪 **The Club Door**
>
> Your form fields have bouncers:
>
> **Setting up the rules:**
> ```typescript
> email: new FormControl('', [
>   Validators.required,  // 🪪 "Need an email!"
>   Validators.email      // 📧 "Must look like email!"
> ]),
> age: new FormControl('', [
>   Validators.min(18)    // 🔞 "Must be 18 or older!"
> ])
> ```
>
> **Why you're rejected:**
> ```typescript
> // Bouncer tells you WHY:
> errors = {
>   required: true,           // 🪪 "No ID!"
>   email: true,              // 📧 "Invalid format!"
>   minlength: { required: 8, actual: 3 }  // 📏 "Too short!"
> }
> ```
>
> **Every bouncer reports exactly what's wrong!**

### 🎯 Quick Reference:
```
🪪 required       = "Show ID" (must have value)
📏 minLength(n)   = "Too short" (string length)
🔞 min(n)         = "Must be N+" (number value)
📧 email          = "Valid email?" (format)
👔 pattern(rx)    = "Dress code" (regex match)
```

---

## 7. ❓ Interview & Concept Questions

### Q1: How do you apply multiple validators to one control?
**A:** Pass an array: `new FormControl('', [Validators.required, Validators.email])`.

### Q2: What's the difference between `min` and `minLength`?
**A:** `min(n)` validates numeric VALUES (e.g., age >= 18). `minLength(n)` validates string LENGTH (e.g., password has 8+ characters).

### Q3: How do you prevent showing errors before user interaction?
**A:** Check `control.dirty || control.touched` before displaying errors.

### Q4: What does the errors object look like?
**A:** It's null if valid. If invalid, it contains keys like `{ required: true, minlength: { requiredLength: 3, actualLength: 2 } }`.

### Q5 (Scenario): User should only see errors after clicking Submit. How?
**A:** Call `form.markAllAsTouched()` in submit handler:
```typescript
onSubmit() {
    if (this.form.invalid) {
        this.form.markAllAsTouched(); // Now all errors show
        return;
    }
}
```

---

## 🔧 Implementation Flow Mindmap

```mermaid
mindmap
  root((Built-in Validators))
    Step 1 Import
      Import Validators
      From @angular/forms
    Step 2 Apply
      Second arg to FormControl
      Array for multiple
    Step 3 Display Errors
      Check invalid
      Check dirty or touched
      Access errors object
    Step 4 UX
      Mark all touched on submit
      Use updateOn blur
```

---

## 🧠 Mind Map: Quick Visual Reference

```mermaid
mindmap
  root((Built-in Validators))
    Text Validators
      required
      minLength(n)
      maxLength(n)
      pattern(regex)
      email
    Numeric Validators
      min(n)
      max(n)
    Boolean
      requiredTrue
    Error Object
      null if valid
      Object with keys if invalid
      Keys are lowercase
    Best Practices
      Check dirty or touched
      Mark all touched on submit
      Use updateOn blur
```
