# Template Forms - Detailed Exercises

## 🟦 Exercise 1: ngModel Binding

### Problem
Create two-way binding with ngModel.

### Solution
```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="name" placeholder="Enter name">
    <p>Hello, {{ name }}!</p>
  `
})
export class GreetComponent {
  name = '';
}
```

## 🟦 Exercise 2: Two-way Binding

### Problem
Synchronize multiple form fields.

### Solution
```html
<input [(ngModel)]="user.name" name="name">
<input [(ngModel)]="user.email" name="email">

<p>Name: {{ user.name }}</p>
<p>Email: {{ user.email }}</p>
```

## 🟦 Exercise 3: Form Validation

### Problem
Apply validation to template forms.

### Solution
```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <input 
    ngModel 
    name="email" 
    required 
    email 
    #emailField="ngModel">
  
  @if (emailField.invalid && emailField.touched) {
    @if (emailField.errors?.['required']) {
      <p class="error">Email is required</p>
    }
    @if (emailField.errors?.['email']) {
      <p class="error">Invalid email format</p>
    }
  }
  
  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>
```

## 🟦 Exercise 4: Form Submission

### Problem
Handle form submission with ngSubmit.

### Solution
```typescript
@Component({
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <input ngModel name="username" required>
      <input ngModel name="password" type="password" required>
      <button type="submit" [disabled]="f.invalid">Login</button>
    </form>
  `
})
export class LoginComponent {
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form values:', form.value);
      // { username: '...', password: '...' }
      
      form.resetForm();  // Reset form after submit
    }
  }
}
```
