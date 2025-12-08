# 🟦 Exercise 4: Custom Validators - Solution

```typescript
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// Custom validator function
function forbiddenWords(words: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toLowerCase();
    const forbidden = words.find(word => value?.includes(word));
    return forbidden ? { forbiddenWord: { word: forbidden } } : null;
  };
}

// Strong password validator
function strongPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    
    const valid = hasUpper && hasLower && hasNumber && hasSpecial;
    return valid ? null : { 
      weakPassword: { 
        hasUpper, hasLower, hasNumber, hasSpecial 
      } 
    };
  };
}

// Usage
username = new FormControl('', forbiddenWords(['admin', 'root', 'test']));
password = new FormControl('', [Validators.minLength(8), strongPassword()]);
```
