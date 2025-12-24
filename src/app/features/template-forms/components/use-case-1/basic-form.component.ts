
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // 1. Import FormsModule
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // 2. Add to imports
  template: `
    <div class="form-container">
      <h1>🚀 Use Case 1: The Basics</h1>
      <p class="desc">A simple login form demonstrating <code>[(ngModel)]</code> and <code>ngForm</code>.</p>

      <!-- 3. Define the form with a template reference variable -->
      <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
        
        <div class="form-group">
          <label for="username">Username</label>
          <!-- 4. Add ngModel and name attribute -->
          <input 
            type="text" 
            id="username" 
            name="username" 
            [(ngModel)]="model.username"
            placeholder="Enter username"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            [(ngModel)]="model.password"
            placeholder="Enter password"
          >
        </div>

        <button type="submit" [disabled]="!loginForm.form.valid">Login</button>
      </form>

      <!-- Visualization of Form State -->
      <div class="debug-panel">
        <h3>📊 Form State Debugger</h3>
        <p><strong>Values:</strong> {{ loginForm.value | json }}</p>
        <p><strong>Valid:</strong> {{ loginForm.valid }}</p>
        <p><strong>Touched:</strong> {{ loginForm.touched }}</p>
        <p><strong>Dirty:</strong> {{ loginForm.dirty }}</p>
      </div>
      
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
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: var(--text-primary);
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      width: 100%;
      padding: 10px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .debug-panel {
      margin-top: 30px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px dashed #ced4da;
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
export class BasicFormComponent {
  // Initial model state
  model = {
    username: '',
    password: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      alert(`Login Successful for: ${this.model.username}`);

      // Optional: Reset form
      // form.reset();
    }
  }
}
