
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordMatchDirective } from '../../directives/password-match.directive';

@Component({
    selector: 'app-custom-validator',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, PasswordMatchDirective], // Import the directive!
    template: `
    <div class="form-container">
      <h1>⚙️ Custom Validators</h1>
      <p class="desc">Using a custom directive <code>[appPasswordMatch]</code> to cross-validate two fields.</p>

      <form #signupForm="ngForm" (ngSubmit)="onSubmit(signupForm)">
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" [(ngModel)]="model.email" required email>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            [(ngModel)]="model.password" 
            #pwd="ngModel"
            required 
            minlength="6">
          <small class="hint" *ngIf="pwd.dirty && pwd.valid">Password is valid!</small>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            [(ngModel)]="model.confirmPassword" 
            #confirm="ngModel"
            required
            appPasswordMatch="password"
            [class.invalid]="confirm.invalid && confirm.touched"
          >
          
          <div *ngIf="confirm.invalid && confirm.touched" class="error-msg">
            <small *ngIf="confirm.errors?.['required']">Confirmation is required.</small>
            <small *ngIf="confirm.errors?.['passwordMismatch']">Passwords do not match!</small>
          </div>
        </div>

        <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>
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
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    input.invalid {
      border-color: #ef4444;
      background-color: #fff5f5;
    }

    .error-msg {
      color: #dc2626;
      font-size: 0.85rem;
      margin-top: 5px;
    }

    .hint {
      color: #16a34a;
      font-size: 0.85rem;
    }

    button {
      width: 100%;
      padding: 12px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: #ccc;
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
export class CustomValidatorComponent {
    model = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    onSubmit(form: NgForm) {
        if (form.valid) {
            alert('Signup Successful! Passwords match.');
        }
    }
}
