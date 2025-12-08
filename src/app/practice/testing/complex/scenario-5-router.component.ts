/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: ROUTER TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scenario-5-router',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Router Testing</h2>
                <p>Test navigation, guards, and route parameters.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>Router Testing Setup</h4>
                    <pre><code>describe('Navigation', () => {{ '{' }}
  let router: Router;
  let location: Location;

  beforeEach(() => {{ '{' }}
    TestBed.configureTestingModule({{ '{' }}
      imports: [
        RouterTestingModule.withRoutes([
          {{ '{' }} path: '', component: HomeComponent {{ '}' }},
          {{ '{' }} path: 'products', component: ProductsComponent {{ '}' }},
          {{ '{' }} path: 'products/:id', component: ProductDetailComponent {{ '}' }}
        ])
      ]
    {{ '}' }});
    
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  {{ '}' }});

  it('should navigate to products', fakeAsync(() => {{ '{' }}
    router.navigate(['/products']);
    tick();
    expect(location.path()).toBe('/products');
  {{ '}' }}));

  it('should navigate with params', fakeAsync(() => {{ '{' }}
    router.navigate(['/products', 123]);
    tick();
    expect(location.path()).toBe('/products/123');
  {{ '}' }}));
{{ '}' }});</code></pre>
                </div>

                <div class="code-block">
                    <h4>Testing Route Guards</h4>
                    <pre><code>describe('AuthGuard', () => {{ '{' }}
  let guard: AuthGuard;
  let authService: jasmine.SpyObj&lt;AuthService&gt;;
  let router: jasmine.SpyObj&lt;Router&gt;;

  beforeEach(() => {{ '{' }}
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({{ '{' }}
      providers: [
        AuthGuard,
        {{ '{' }} provide: AuthService, useValue: authService {{ '}' }},
        {{ '{' }} provide: Router, useValue: router {{ '}' }}
      ]
    {{ '}' }});
    guard = TestBed.inject(AuthGuard);
  {{ '}' }});

  it('should allow if logged in', () => {{ '{' }}
    authService.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  {{ '}' }});

  it('should redirect if not logged in', () => {{ '{' }}
    authService.isLoggedIn.and.returnValue(false);
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🎮 Navigation Simulation</h3>
                <div class="nav-demo">
                    <div class="nav-bar">
                        @for (route of routes(); track route.path) {
                            <button 
                                [class.active]="currentRoute() === route.path"
                                (click)="navigateTo(route.path)">
                                {{ route.label }}
                            </button>
                        }
                    </div>

                    <div class="route-display">
                        <p>Current route: <code>{{ currentRoute() }}</code></p>
                        <p>Params: <code>{{ currentParams() | json }}</code></p>
                    </div>

                    <div class="guard-status">
                        <label>
                            <input type="checkbox" [checked]="isLoggedIn()" (change)="toggleLogin()">
                            User logged in
                        </label>
                        @if (!isLoggedIn() && currentRoute().includes('admin')) {
                            <div class="guard-block">
                                🚫 AuthGuard: Access denied - Redirecting to /login
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
  styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #14b8a6; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .nav-demo { padding: 1.5rem; background: #f8fafc; border-radius: 8px; }
        .nav-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .nav-bar button { padding: 0.5rem 1rem; background: #e5e7eb; border: none; border-radius: 4px; cursor: pointer; }
        .nav-bar button.active { background: #14b8a6; color: white; }
        .route-display { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; }
        .route-display p { margin: 0.25rem 0; color: white; }
        .route-display code { color: #a6e3a1; }
        .guard-status { padding: 1rem; background: white; border-radius: 8px; }
        .guard-status label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .guard-block { margin-top: 0.75rem; padding: 0.75rem; background: #fef2f2; color: #dc2626; border-radius: 6px; font-size: 0.9rem; }
    `]
})
export class Scenario5RouterComponent {
  routes = signal([
    { path: '/', label: 'Home', params: {} as Record<string, string> },
    { path: '/products', label: 'Products', params: {} as Record<string, string> },
    { path: '/products/123', label: 'Product #123', params: { id: '123' } as Record<string, string> },
    { path: '/admin', label: 'Admin', params: {} as Record<string, string> }
  ]);

  currentRoute = signal('/');
  currentParams = signal<Record<string, string>>({});
  isLoggedIn = signal(true);

  navigateTo(path: string): void {
    const route = this.routes().find(r => r.path === path);
    if (route) {
      this.currentRoute.set(route.path);
      this.currentParams.set(route.params);
    }
  }

  toggleLogin(): void {
    this.isLoggedIn.update(v => !v);
  }
}

