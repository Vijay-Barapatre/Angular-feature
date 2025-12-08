# 🟥 Scenario 3: Cross-field Validation - Solution

```typescript
function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;
  
  if (!start || !end) return null;
  
  return new Date(start) < new Date(end) 
    ? null 
    : { invalidDateRange: true };
}

dateForm = new FormGroup({
  startDate: new FormControl('', Validators.required),
  endDate: new FormControl('', Validators.required)
}, { validators: dateRangeValidator });
```

```html
<form [formGroup]="dateForm">
  <input type="date" formControlName="startDate">
  <input type="date" formControlName="endDate">
  
  @if (dateForm.errors?.['invalidDateRange']) {
    <p class="error">End date must be after start date</p>
  }
</form>
```
