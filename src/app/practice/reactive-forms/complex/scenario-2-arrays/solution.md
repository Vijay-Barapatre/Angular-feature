# 🟥 Scenario 2: Dynamic FormArrays - Solution

```typescript
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

form = new FormGroup({
  name: new FormControl('', Validators.required),
  skills: new FormArray<FormControl<string>>([])
});

get skills(): FormArray {
  return this.form.get('skills') as FormArray;
}

addSkill(): void {
  this.skills.push(new FormControl('', Validators.required));
}

removeSkill(index: number): void {
  this.skills.removeAt(index);
}
```

```html
<form [formGroup]="form">
  <input formControlName="name" placeholder="Name">
  
  <div formArrayName="skills">
    <h4>Skills ({{ skills.length }})</h4>
    @for (skill of skills.controls; track $index) {
      <div>
        <input [formControlName]="$index" placeholder="Skill">
        <button type="button" (click)="removeSkill($index)">❌</button>
      </div>
    }
  </div>
  
  <button type="button" (click)="addSkill()">+ Add Skill</button>
</form>
```
