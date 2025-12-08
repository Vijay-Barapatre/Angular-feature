/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: HTTP TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-1-http',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: HTTP Testing</h2>
                <p>Test HTTP calls with HttpClientTestingModule.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>Service with HTTP</h4>
                    <pre><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class UserService {{ '{' }}
  constructor(private http: HttpClient) {{ '{' }}{{ '}' }}
  
  getUsers(): Observable&lt;User[]&gt; {{ '{' }}
    return this.http.get&lt;User[]&gt;('/api/users');
  {{ '}' }}
  
  createUser(user: User): Observable&lt;User&gt; {{ '{' }}
    return this.http.post&lt;User&gt;('/api/users', user);
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>HTTP Tests</h4>
                    <pre><code>describe('UserService', () => {{ '{' }}
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {{ '{' }}
    TestBed.configureTestingModule({{ '{' }}
      imports: [HttpClientTestingModule],
      providers: [UserService]
    {{ '}' }});
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  {{ '}' }});

  afterEach(() => {{ '{' }}
    httpMock.verify(); // Ensure no pending requests
  {{ '}' }});

  it('should fetch users', () => {{ '{' }}
    const mockUsers = [{{ '{' }} id: 1, name: 'John' {{ '}' }}];
    
    service.getUsers().subscribe(users => {{ '{' }}
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('John');
    {{ '}' }});
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  {{ '}' }});

  it('should handle errors', () => {{ '{' }}
    service.getUsers().subscribe({{ '{' }}
      error: err => {{ '{' }}
        expect(err.status).toBe(404);
      {{ '}' }}
    {{ '}' }});
    
    const req = httpMock.expectOne('/api/users');
    req.flush('Not found', {{ '{' }} status: 404, statusText: 'Not Found' {{ '}' }});
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <div class="simulation">
                    <h3>🎮 Mock API Demo</h3>
                    <div class="api-buttons">
                        <button (click)="simulateSuccess()">Simulate Success</button>
                        <button (click)="simulate404()" class="error">Simulate 404</button>
                        <button (click)="simulate500()" class="error">Simulate 500</button>
                    </div>

                    @if (response()) {
                        <div class="response" [class.error]="response()?.error">
                            <h4>{{ response()?.error ? '❌ Error' : '✅ Success' }}</h4>
                            <pre>{{ response()?.data | json }}</pre>
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .simulation { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .api-buttons { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .api-buttons button { padding: 0.5rem 1rem; background: #14b8a6; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .api-buttons button.error { background: #ef4444; }
        .response { padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981; }
        .response.error { background: #fef2f2; border-color: #ef4444; }
        .response h4 { margin: 0 0 0.5rem; }
        .response pre { margin: 0; font-size: 0.85rem; }
    `]
})
export class Scenario1HttpTestingComponent {
    response = signal<{ error: boolean; data: any } | null>(null);

    simulateSuccess(): void {
        this.response.set({
            error: false,
            data: [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ]
        });
    }

    simulate404(): void {
        this.response.set({
            error: true,
            data: { status: 404, message: 'Users not found' }
        });
    }

    simulate500(): void {
        this.response.set({
            error: true,
            data: { status: 500, message: 'Internal server error' }
        });
    }
}
