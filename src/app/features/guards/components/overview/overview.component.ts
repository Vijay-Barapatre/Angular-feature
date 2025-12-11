
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
          <p><strong>canActivate</strong></p>
          <p>Protect routes from unauthorized access. Block entry to routes.</p>
        </div>

        <!-- Use Case 2: CanDeactivate -->
        <div class="card" routerLink="use-case-2">
          <div class="icon">💾</div>
          <h2>Use Case 2: Prevention</h2>
          <p><strong>canDeactivate</strong></p>
          <p>Prevent users from losing unsaved changes. Block leaving routes.</p>
        </div>

        <!-- Use Case 3: Resolve -->
        <div class="card" routerLink="use-case-3">
          <div class="icon">⏳</div>
          <h2>Use Case 3: Pre-fetching</h2>
          <p><strong>resolve</strong></p>
          <p>Load data before the component activates.</p>
        </div>

        <!-- Use Case 4: CanMatch -->
        <div class="card" routerLink="use-case-4">
          <div class="icon">🎭</div>
          <h2>Use Case 4: Matching</h2>
          <p><strong>canMatch</strong></p>
          <p>Role-based routing. Same URL, different components.</p>
        </div>

        <!-- Use Case 5: CanLoad -->
        <div class="card" routerLink="use-case-5">
          <div class="icon">📦</div>
          <h2>Use Case 5: Loading</h2>
          <p><strong>canLoad</strong></p>
          <p>Prevent lazy modules from downloading.</p>
        </div>

        <!-- Use Case 6: CanActivateChild -->
        <div class="card" routerLink="use-case-6">
          <div class="icon">👶</div>
          <h2>Use Case 6: Child Routes</h2>
          <p><strong>canActivateChild</strong></p>
          <p>Protect all child routes with one guard.</p>
        </div>

        <!-- Use Case 7: Combined Guards -->
        <div class="card" routerLink="use-case-7">
          <div class="icon">🔗</div>
          <h2>Use Case 7: Combined</h2>
          <p><strong>Multiple Guards</strong></p>
          <p>Chain guards for multi-layer security.</p>
        </div>

        <!-- Use Case 8: Async Guards -->
        <div class="card" routerLink="use-case-8">
          <div class="icon">⚡</div>
          <h2>Use Case 8: Async</h2>
          <p><strong>Observable Guards</strong></p>
          <p>Guards that make API calls.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overview-container {
      max-width: 1200px;
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 24px;
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
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h2 {
      font-size: 1.1rem;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    p {
      color: var(--text-muted);
      margin: 3px 0;
      line-height: 1.4;
      font-size: 0.9rem;
    }

    .card p strong {
      color: var(--accent-color);
    }
  `]
})
export class GuardsOverviewComponent { }

