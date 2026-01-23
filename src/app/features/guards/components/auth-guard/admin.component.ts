
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="admin-container">
      <div class="header">
        <h1>🔐 Admin Dashboard</h1>
        <span class="badge">Protected Route</span>
      </div>

      <div class="content">
        <p>Welcome back, <strong>{{ authService.currentUser() }}</strong>!</p>
        <p>You have successfully passed the <code>CanActivate</code> guard.</p>
        
        <div class="actions">
          <button (click)="logout()" class="btn-logout">Logout</button>
        </div>
      </div>

      <div class="debug-info">
        <h3>How it worked:</h3>
        <ol>
          <li>You clicked the link.</li>
          <li>Router checked <code>authGuard</code>.</li>
          <li>Guard verified <code>isLoggedIn()</code> was true.</li>
          <li>Navigation allowed.</li>
        </ol>
      </div>
    </div>
  `,
    styles: [`
    .admin-container {
      padding: 30px;
      background: #f0fdf4; /* Green tint */
      border: 2px solid #22c55e;
      border-radius: 12px;
      max-width: 600px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h1 {
      margin: 0;
      color: #15803d;
    }

    .badge {
      background: #22c55e;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .btn-logout {
      background: #ef4444;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
    }

    .btn-logout:hover {
      background: #dc2626;
    }

    .debug-info {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px dashed #22c55e;
      color: #166534;
    }
  `]
})
export class AdminComponent {
    authService = inject(AuthService);
    router = inject(Router);

    logout() {
        this.authService.logout();
        this.router.navigate(['/guards/use-case-1/login']);
    }
}
