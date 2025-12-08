/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: BASIC ROUTES
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exercise-1-basic',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Basic Routes</h2>
                <p>Understand how to define and navigate between routes.</p>
                
                <h4>Key Concepts:</h4>
                <ul>
                    <li>Defining routes in app.routes.ts</li>
                    <li>Using routerLink directive</li>
                    <li>Programmatic navigation with Router</li>
                    <li>router-outlet placement</li>
                </ul>
            </div>

            <div class="demo">
                <h3>📂 Route Configuration</h3>
                
                <div class="code-block">
                    <pre><code>// app.routes.ts
export const routes: Routes = [
  {{ '{' }} path: '', component: HomeComponent {{ '}' }},
  {{ '{' }} path: 'about', component: AboutComponent {{ '}' }},
  {{ '{' }} path: 'products', component: ProductsComponent {{ '}' }},
  {{ '{' }} path: '**', component: NotFoundComponent {{ '}' }}
];

// app.component.html
&lt;nav&gt;
  &lt;a routerLink="/" routerLinkActive="active"&gt;Home&lt;/a&gt;
  &lt;a routerLink="/about"&gt;About&lt;/a&gt;
  &lt;a routerLink="/products"&gt;Products&lt;/a&gt;
&lt;/nav&gt;
&lt;router-outlet&gt;&lt;/router-outlet&gt;</code></pre>
                </div>

                <h3>🎮 Navigation Demo</h3>
                
                <div class="nav-demo">
                    <div class="simulated-nav">
                        @for (route of routes(); track route.path) {
                            <button 
                                [class.active]="currentRoute() === route.path"
                                (click)="simulateNavigation(route.path)">
                                {{ route.label }}
                            </button>
                        }
                    </div>
                    
                    <div class="simulated-content">
                        <div class="outlet-label">← router-outlet</div>
                        <div class="page-content">
                            <h4>{{ currentPage().title }}</h4>
                            <p>{{ currentPage().content }}</p>
                        </div>
                    </div>
                </div>

                <h3>💻 Programmatic Navigation</h3>
                <div class="programmatic">
                    <button (click)="navigateWithRouter()">router.navigate(['/products'])</button>
                    <button (click)="navigateByUrl()">router.navigateByUrl('/about')</button>
                </div>
                <div class="log">
                    @for (entry of navLog(); track entry) {
                        <div class="log-entry">{{ entry }}</div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; overflow-x: auto; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .nav-demo { display: grid; gap: 1rem; margin-bottom: 1.5rem; }
        .simulated-nav { display: flex; gap: 0.5rem; padding: 0.75rem; background: #334155; border-radius: 8px 8px 0 0; }
        .simulated-nav button { padding: 0.5rem 1rem; background: transparent; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .simulated-nav button:hover { background: rgba(255,255,255,0.1); }
        .simulated-nav button.active { background: #ec4899; }
        .simulated-content { padding: 1.5rem; background: #f8fafc; border-radius: 0 0 8px 8px; position: relative; }
        .outlet-label { position: absolute; top: 0.5rem; right: 0.5rem; font-size: 0.75rem; color: #9ca3af; }
        .page-content h4 { margin: 0 0 0.5rem; color: #ec4899; }
        .page-content p { margin: 0; color: #6b7280; }
        .programmatic { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
        .programmatic button { padding: 0.5rem 1rem; background: #ec4899; color: white; border: none; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 0.8rem; }
        .log { padding: 0.75rem; background: #1e1e2e; border-radius: 8px; max-height: 100px; overflow-y: auto; }
        .log-entry { color: #a6e3a1; font-family: monospace; font-size: 0.8rem; }
    `]
})
export class Exercise1BasicComponent {
    routes = signal([
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/products', label: 'Products' },
        { path: '/contact', label: 'Contact' }
    ]);

    currentRoute = signal('/');
    navLog = signal<string[]>([]);

    pages: Record<string, { title: string; content: string }> = {
        '/': { title: '🏠 Home', content: 'Welcome to our application!' },
        '/about': { title: 'ℹ️ About', content: 'Learn more about us and our mission.' },
        '/products': { title: '📦 Products', content: 'Browse our amazing products.' },
        '/contact': { title: '📞 Contact', content: 'Get in touch with our team.' }
    };

    currentPage = signal(this.pages['/']);

    constructor(private router: Router) { }

    simulateNavigation(path: string): void {
        this.currentRoute.set(path);
        this.currentPage.set(this.pages[path] || this.pages['/']);
        this.addLog(`Navigated to: ${path}`);
    }

    navigateWithRouter(): void {
        this.addLog('router.navigate([\'/products\'])');
        this.simulateNavigation('/products');
    }

    navigateByUrl(): void {
        this.addLog('router.navigateByUrl(\'/about\')');
        this.simulateNavigation('/about');
    }

    private addLog(message: string): void {
        const time = new Date().toLocaleTimeString();
        this.navLog.update(log => [`[${time}] ${message}`, ...log].slice(0, 5));
    }
}
