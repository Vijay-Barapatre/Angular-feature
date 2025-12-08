import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="not-found-container">
      <div class="content">
        <h1 class="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a routerLink="/" class="btn btn-primary">Go Home</a>
      </div>
    </div>
  `,
    styles: [`
    .not-found-container {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .error-code {
      font-size: 8rem;
      margin: 0;
      line-height: 1;
    }
    h2 {
      font-size: 2rem;
      margin: var(--spacing-lg) 0;
    }
    p {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
    }
  `]
})
export class NotFoundComponent { }
