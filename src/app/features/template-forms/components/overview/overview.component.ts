
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
        <!-- Use Case 1: Basics -->
        <div class="card" routerLink="use-case-1">
          <div class="icon">🚀</div>
          <h2>Use Case 1: The Basics</h2>
          <p><strong>Two-Way Binding</strong></p>
          <p>Learn <code>[(ngModel)]</code>, <code>ngForm</code>, and handling form submission.</p>
        </div>

        <!-- Use Case 2: Validation -->
        <div class="card" routerLink="use-case-2">
          <div class="icon">✅</div>
          <h2>Use Case 2: Validation</h2>
          <p><strong>Error Handling</strong></p>
          <p>Built-in validators, error messages, and visual feedback.</p>
        </div>

        <!-- Use Case 3: Groups -->
        <div class="card" routerLink="use-case-3">
          <div class="icon">🗂️</div>
          <h2>Use Case 3: Grouping</h2>
          <p><strong>Nested Data</strong></p>
          <p>Using <code>ngModelGroup</code> to organize complex form data structures.</p>
        </div>

        <!-- Use Case 4: Custom Validator -->
        <div class="card" routerLink="use-case-4">
          <div class="icon">⚙️</div>
          <h2>Use Case 4: Custom Validators</h2>
          <p><strong>Advanced Logic</strong></p>
          <p>Creating custom directives for complex validation rules (e.g., password match).</p>
        </div>

        <!-- Use Case 5: Dynamic Forms -->
        <div class="card" routerLink="use-case-5">
          <div class="icon">🔢</div>
          <h2>Use Case 5: Dynamic Forms</h2>
          <p><strong>Complex Lists</strong></p>
          <p>Managing arrays, real-time calculations, and dynamic index-based naming.</p>
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
