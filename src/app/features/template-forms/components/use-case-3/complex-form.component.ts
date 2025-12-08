
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-complex-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
    <div class="form-container">
      <h1>🗂️ Use Case 3: Grouping Data</h1>
      <p class="desc">Using <code>ngModelGroup</code> to organize related fields into nested objects.</p>

      <form #addressForm="ngForm" (ngSubmit)="onSubmit(addressForm)">
        
        <!-- Standard Field (Top Level) -->
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" name="name" [(ngModel)]="model.name" required>
        </div>

        <!-- Group 1: Address -->
        <fieldset ngModelGroup="address">
          <legend>Address Details</legend>
          
          <div class="form-group">
            <label>Street</label>
            <input type="text" name="street" [(ngModel)]="model.address.street" required>
          </div>

          <div class="row">
            <div class="form-group half">
              <label>City</label>
              <input type="text" name="city" [(ngModel)]="model.address.city" required>
            </div>
            <div class="form-group half">
              <label>Zip Code</label>
              <input type="text" name="zip" [(ngModel)]="model.address.zip" required pattern="\\d{5}">
            </div>
          </div>
        </fieldset>

        <!-- Group 2: Preferences -->
        <fieldset ngModelGroup="preferences">
          <legend>Preferences</legend>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" name="newsletter" [(ngModel)]="model.preferences.newsletter">
              Subscribe to Newsletter
            </label>
            <label>
              <input type="checkbox" name="notifications" [(ngModel)]="model.preferences.notifications">
              Enable Notifications
            </label>
          </div>
        </fieldset>

        <button type="submit" [disabled]="addressForm.invalid">Save Contact</button>
      </form>

      <!-- Debug Panel -->
      <div class="debug-panel">
        <h3>🔍 Form Value Structure</h3>
        <pre>{{ addressForm.value | json }}</pre>
        <p class="hint">Notice how "address" and "preferences" are nested objects!</p>
      </div>

      <a routerLink="/template-forms" class="back-link">← Back to Overview</a>
    </div>
  `,
    styles: [`
    .form-container {
      max-width: 600px;
      margin: 30px auto;
      padding: 20px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    fieldset {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 20px;
    }

    legend {
      padding: 0 10px;
      font-weight: bold;
      color: var(--primary-color);
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: var(--text-primary);
    }

    input[type="text"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .row {
      display: flex;
      gap: 15px;
    }

    .half {
      flex: 1;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      cursor: pointer;
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
      background: #ccc;
      cursor: not-allowed;
    }

    .debug-panel {
      margin-top: 30px;
      padding: 15px;
      background: #1e293b;
      color: #cbd5e1;
      border-radius: 6px;
      overflow-x: auto;
    }

    pre {
      margin: 0;
      font-family: monospace;
    }
    
    .back-link {
        display: block;
        margin-top: 20px;
        text-align: center;
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .hint {
        color: #94a3b8;
        font-style: italic;
        margin-top: 10px;
        font-size: 0.9rem;
    }
  `]
})
export class ComplexFormComponent {
    model = {
        name: '',
        address: {
            street: '',
            city: '',
            zip: ''
        },
        preferences: {
            newsletter: true,
            notifications: false
        }
    };

    onSubmit(form: NgForm) {
        if (form.valid) {
            console.log('Submitted Structure:', form.value);
            alert('Form Saved! Check console for nested object structure.');
        }
    }
}
