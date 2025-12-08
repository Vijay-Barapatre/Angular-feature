
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-guards-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="overview-container">
      <h1>🛡️ Angular Route Guards & Resolvers</h1>
      <p class="subtitle">Master component protection, data pre-fetching, and navigation control.</p>

      <div class="grid">
        <!-- Use Case 1: CanActivate -->
        <div class="card" routerLink="use-case-1">
          <div class="icon">🔒</div>
          <h2>Use Case 1: Protection</h2>
          <p><strong>CanActivate (Functional)</strong></p>
          <p>Protect routes from unauthorized access. Learn how to create a functional auth guard.</p>
        </div>

        <!-- Use Case 2: CanDeactivate -->
        <div class="card" routerLink="use-case-2">
          <div class="icon">💾</div>
          <h2>Use Case 2: Prevention</h2>
          <p><strong>CanDeactivate (Functional)</strong></p>
          <p>Prevent users from losing unsaved changes. Implement a "dirty state" check.</p>
        </div>

        <!-- Use Case 3: Resolve -->
        <div class="card" routerLink="use-case-3">
          <div class="icon">⏳</div>
          <h2>Use Case 3: Data Pre-fetching</h2>
          <p><strong>Resolve (Functional)</strong></p>
          <p>Load data <em>before</em> the component activates to ensure a ready state.</p>
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
export class GuardsOverviewComponent { }
