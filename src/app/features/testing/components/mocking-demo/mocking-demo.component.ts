/**
 * ============================================================================
 * MOCKING DEMO COMPONENT
 * ============================================================================
 * 
 * Component that depends on UserService.
 * Demonstrates how to test components with mocked dependencies.
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from './user.service';

@Component({
    selector: 'app-mocking-demo',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎭 Mocking Dependencies</h1>
                <p class="subtitle">Spy Objects & Mock Providers</p>
            </header>

            <section class="demo-section">
                <h2>User Display</h2>
                
                @if (loading()) {
                    <div class="loading" data-testid="loading">Loading...</div>
                } @else if (error()) {
                    <div class="error" data-testid="error">{{ error() }}</div>
                } @else if (user()) {
                    <div class="user-card" data-testid="user-card">
                        <div class="avatar">{{ user()!.name.charAt(0) }}</div>
                        <div class="info">
                            <h3 data-testid="user-name">{{ user()!.name }}</h3>
                            <p data-testid="user-email">{{ user()!.email }}</p>
                            <span class="badge" [class]="user()!.role" data-testid="user-role">
                                {{ user()!.role }}
                            </span>
                        </div>
                    </div>
                }

                <button class="btn" (click)="loadUser(1)" data-testid="load-btn">
                    Load User
                </button>
            </section>

            <section class="code-section">
                <h2>📝 Mocking Patterns</h2>
                
                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>🎭 createSpyObj</h3>
                        <pre><code>const mockService = jasmine.createSpyObj(
  'UserService', 
  ['getUser', 'isAdmin']
);
mockService.getUser.and.returnValue(of(mockUser));</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>💉 Provide Mock</h3>
                        <pre><code>TestBed.configureTestingModule({{ '{' }}
  imports: [Component],
  providers: [
    {{ '{' }} provide: UserService, useValue: mockService {{ '}' }}
  ]
{{ '}' }});</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>✅ Verify Calls</h3>
                        <pre><code>expect(mockService.getUser)
  .toHaveBeenCalledWith(1);
expect(mockService.getUser)
  .toHaveBeenCalledTimes(1);</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🔄 Control Returns</h3>
                        <pre><code>// Success case
mockService.getUser.and.returnValue(of(user));

// Error case
mockService.getUser.and.returnValue(
  throwError(() => new Error('Not found'))
);</code></pre>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }
        .subtitle { color: var(--text-secondary, #666); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 2rem;
        }

        .loading { color: var(--primary-color, #667eea); padding: 2rem; }
        .error { color: #ef4444; padding: 2rem; }

        .user-card {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            margin: 1.5rem auto;
            max-width: 400px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
        }
        .info { text-align: left; }
        .info h3 { margin: 0 0 0.25rem 0; }
        .info p { margin: 0 0 0.5rem 0; color: var(--text-secondary, #666); }
        .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        .badge.admin { background: #fef3c7; color: #d97706; }
        .badge.user { background: #dbeafe; color: #2563eb; }
        .badge.guest { background: #f3f4f6; color: #6b7280; }

        .btn {
            padding: 0.75rem 1.5rem;
            background: var(--primary-color, #667eea);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
        }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
        }
        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #f59e0b;
        }
        .concept-card h3 { margin-top: 0; }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.8rem;
        }
    `]
})
export class MockingDemoComponent implements OnInit {
    private userService = inject(UserService);

    user = signal<User | null>(null);
    loading = signal(false);
    error = signal<string | null>(null);

    ngOnInit(): void {
        // Auto-load on init for demo
    }

    loadUser(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.userService.getUser(id).subscribe({
            next: (user) => {
                this.user.set(user);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message || 'Failed to load user');
                this.loading.set(false);
            }
        });
    }
}
