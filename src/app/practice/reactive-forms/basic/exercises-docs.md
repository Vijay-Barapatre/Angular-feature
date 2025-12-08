# Reactive Forms Basic Exercises

## 🟦 Exercise 1: FormControl
Create and bind a single FormControl with validation.

```typescript
username = new FormControl('', [Validators.required, Validators.minLength(3)]);

// Template
<input [formControl]="username">
<div *ngIf="username.errors?.['required']">Required!</div>
```

## 🟦 Exercise 2: FormGroup
Group multiple controls into a form.

```typescript
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});
```

## 🟦 Exercise 3: Validators
Apply built-in and custom validators.

## 🟦 Exercise 4: Custom Validators
Create reusable validation functions.

```typescript
function forbiddenName(name: string): ValidatorFn {
  return (control) => 
    control.value === name ? { forbidden: true } : null;
}
```
