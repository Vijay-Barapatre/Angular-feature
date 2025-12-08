# Reactive Forms Complex Scenarios

## 🟥 Scenario 1: Registration Form
Multi-field form with cross-field validation (password match).

## 🟥 Scenario 2: Dynamic FormArrays
Add/remove form fields dynamically.

```typescript
skills = new FormArray<FormControl<string>>([]);

addSkill(): void {
  this.skills.push(new FormControl(''));
}
```

## 🟥 Scenario 3: Cross-field Validation
Validate fields against each other (confirm password).

## 🟥 Scenario 4: Async Validators
Server-side validation (username availability).

```typescript
function usernameAvailable(): AsyncValidatorFn {
  return (control) => 
    http.get(`/api/check/${control.value}`).pipe(
      map(exists => exists ? { taken: true } : null)
    );
}
```

## 🟥 Scenario 5: Nested FormGroups
Complex forms with address, contact sub-forms.
