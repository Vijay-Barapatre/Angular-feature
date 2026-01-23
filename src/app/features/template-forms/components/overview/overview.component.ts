
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-template-forms-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="overview-container">
      <h1>📝 Template Driven Forms</h1>
      <p class="subtitle">Master the art of building forms using pure HTML templates and Angular directives.</p>

      <div class="grid">
        <!-- Basics -->
        <div class="card" routerLink="basic-form">
          <div class="icon">🚀</div>
          <h2>The Basics</h2>
          <p><strong>Two-Way Binding</strong></p>
          <p>Learn <code>[(ngModel)]</code>, <code>ngForm</code>, and handling form submission.</p>
        </div>

        <!-- Validation -->
        <div class="card" routerLink="validation">
          <div class="icon">✅</div>
          <h2>Validation</h2>
          <p><strong>Error Handling</strong></p>
          <p>Built-in validators, error messages, and visual feedback.</p>
        </div>

        <!-- Groups -->
        <div class="card" routerLink="complex-form">
          <div class="icon">🗂️</div>
          <h2>Grouping</h2>
          <p><strong>Nested Data</strong></p>
          <p>Using <code>ngModelGroup</code> to organize complex form data structures.</p>
        </div>

        <!-- Custom Validator -->
        <div class="card" routerLink="custom-validator">
          <div class="icon">⚙️</div>
          <h2>Custom Validators</h2>
          <p><strong>Advanced Logic</strong></p>
          <p>Creating custom directives for complex validation rules (e.g., password match).</p>
        </div>

        <!-- Dynamic Forms -->
        <div class="card" routerLink="dynamic-form">
          <div class="icon">🔢</div>
          <h2>Dynamic Forms</h2>
          <p><strong>Complex Lists</strong></p>
          <p>Managing arrays, real-time calculations, and dynamic index-based naming.</p>
        </div>

        <!-- Async Validators -->
        <div class="card" routerLink="async-validator">
          <div class="icon">⏳</div>
          <h2>Async Validators</h2>
          <p><strong>API Validation</strong></p>
          <p>Check username availability with async validator directives.</p>
        </div>

        <!-- Value Changes -->
        <div class="card" routerLink="value-changes">
          <div class="icon">📡</div>
          <h2>Form Observables</h2>
          <p><strong>Reactive Streams</strong></p>
          <p>Subscribe to valueChanges and statusChanges with RxJS.</p>
        </div>

        <!-- Signals Integration -->
        <div class="card" routerLink="signals-integration">
          <div class="icon">🚦</div>
          <h2>Signals Integration</h2>
          <p><strong>Modern Angular</strong></p>
          <p>Bridge template forms with Angular Signals for reactive UI.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overview-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    h1 {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 10px;
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: var(--text-muted);
      font-size: 1.2rem;
      margin-bottom: 50px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 30px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .card:hover {
      transform: translateY(-5px);
      border-color: var(--primary-color);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: var(--text-primary);
    }

    p {
      color: var(--text-muted);
      margin: 5px 0;
      line-height: 1.5;
    }

    .card p strong {
      color: var(--accent-color);
    }
  `]
})
export class TemplateFormsOverviewComponent { }
