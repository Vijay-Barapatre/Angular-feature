
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="form-container">
      <h1>✅ Use Case 2: Validation</h1>
      <p class="desc">Registration form with built-in validators and visual feedback.</p>

      <!-- 
        EXPLANATION OF #regForm="ngForm":
        1. #regForm: Creates a generic template variable (normally refers to the HTML <form> element).
        2. ="ngForm": This is the 'exportAs' syntax. It tells Angular:
           "Don't give me the raw HTML Element. Give me the instance of the NgForm directive instead."
        
        Why? The raw HTMLFormElement is 'dumb'. The NgForm directive is 'smart'—it contains 
        API properties like .valid, .value, .reset(), etc.
      -->
      <form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)">
        
        <!-- Full Name: Required, MinLength -->
        <div class="form-group">
          <label>Full Name</label>
          <!-- 
            EXPLANATION OF #nameCtrl="ngModel":
            1. #nameCtrl: Creates a template variable for this specific input.
            2. ="ngModel": Tells Angular to give us the NgModel directive instance 
               (which has .valid, .touched, .errors) instead of the raw HTMLInputElement.
          -->
          <input 
            type="text" 
            name="fullName"
            [(ngModel)]="user.name"
            #nameCtrl="ngModel"
            required
            minlength="3"
            [class.invalid]="nameCtrl.invalid && nameCtrl.touched"
          >
          <!-- Error Messages -->
          <div *ngIf="nameCtrl.invalid && nameCtrl.touched" class="error-msg">
            <small *ngIf="nameCtrl.errors?.['required']">Name is required.</small>
            <small *ngIf="nameCtrl.errors?.['minlength']">
              Must be at least 3 characters (Current: {{nameCtrl.errors?.['minlength'].actualLength}}).
            </small>
          </div>
        </div>

        <!-- Email: Required, Email Format -->
        <div class="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email"
            [(ngModel)]="user.email"
            #emailCtrl="ngModel"
            required
            email
            [class.invalid]="emailCtrl.invalid && emailCtrl.touched"
          >
          <div *ngIf="emailCtrl.invalid && emailCtrl.touched" class="error-msg">
            <small *ngIf="emailCtrl.errors?.['required']">Email is required.</small>
            <small *ngIf="emailCtrl.errors?.['email']">Please enter a valid email.</small>
          </div>
        </div>

        <!-- Role: Required (Select) -->
        <div class="form-group">
          <label>Role</label>
          <select 
            name="role" 
            [(ngModel)]="user.role"
            #roleCtrl="ngModel"
            required
            [class.invalid]="roleCtrl.invalid && roleCtrl.touched"
          >
            <option value="">Select a role...</option>
            <option value="dev">Developer</option>
            <option value="designer">Designer</option>
            <option value="pm">Manager</option>
          </select>
          <div *ngIf="roleCtrl.invalid && roleCtrl.touched" class="error-msg">
            <small>Please select a role.</small>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" [disabled]="regForm.invalid">Register</button>
      </form>

      <a routerLink="/template-forms" class="back-link">← Back to Overview</a>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 30px auto;
      padding: 20px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: var(--text-primary);
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: border-color 0.2s;
    }

    /* Valid state is optional, but often nice */
    input.ng-valid.ng-touched {
      border-left: 5px solid #16a34a;
    }

    /* Invalid state styling */
    input.invalid, select.invalid {
      border-color: #ef4444;
      border-left: 5px solid #ef4444;
      background-color: #fff5f5;
    }

    .error-msg {
      color: #dc2626;
      font-size: 0.85rem;
      margin-top: 5px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
    }

    button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }

    .back-link {
        display: block;
        margin-top: 20px;
        text-align: center;
        color: var(--primary-color);
        text-decoration: none;
    }
  `]
})
export class ValidationComponent {
  user = {
    name: '',
    email: '',
    role: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      alert('Registration Successful!\n' + JSON.stringify(this.user, null, 2));
    } else {
      // Force validation tick (usually handled automatically by button disable)
      form.control.markAllAsTouched();
    }
  }
}
