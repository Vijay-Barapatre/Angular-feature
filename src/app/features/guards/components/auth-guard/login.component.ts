
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="login-container">
      <h1>👤 Login Required</h1>
      <p>The Admin Dashboard is protected. Please login to continue.</p>

      <div class="card">
        <button (click)="login('AdminUser')" class="btn-login">
          Login as AdminUser
        </button>
        <p class="hint">Clicking this sets <code>isLoggedIn = true</code> in the service.</p>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      padding: 30px;
      background: #fffafa; /* Red tint */
      border: 2px solid #ef4444;
      border-radius: 12px;
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
    }

    h1 {
      color: #b91c1c;
    }

    .btn-login {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.1s;
    }

    .btn-login:hover {
      background: #2563eb;
      transform: scale(1.05);
    }

    .hint {
      margin-top: 15px;
      font-size: 0.9rem;
      color: #64748b;
    }
  `]
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);

    login(username: string) {
        this.authService.login(username);
        // Navigate to the protected route
        this.router.navigate(['/guards/auth-guard/admin']);
    }
}
