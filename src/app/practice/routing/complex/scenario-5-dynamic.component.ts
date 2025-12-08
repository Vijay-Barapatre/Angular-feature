/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: DYNAMIC ROUTES
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DynamicRoute {
    path: string;
    component: string;
    data?: Record<string, string>;
}

@Component({
    selector: 'app-scenario-5-dynamic',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Dynamic Routes</h2>
                <p>Create and modify routes at runtime based on configuration.</p>
            </div>

            <div class="content">
                <h3>📝 Route Builder</h3>
                
                <div class="route-builder">
                    <div class="form-row">
                        <label>Path:</label>
                        <input [(ngModel)]="newRoute.path" placeholder="/custom-path">
                    </div>
                    <div class="form-row">
                        <label>Component:</label>
                        <select [(ngModel)]="newRoute.component">
                            <option value="DashboardComponent">Dashboard</option>
                            <option value="ListComponent">List View</option>
                            <option value="DetailComponent">Detail View</option>
                            <option value="FormComponent">Form</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <label>Title:</label>
                        <input [(ngModel)]="newRoute.title" placeholder="Page Title">
                    </div>
                    <button (click)="addRoute()">Add Route</button>
                </div>

                <h3>🗂️ Current Routes</h3>
                
                <div class="routes-table">
                    <div class="route-header">
                        <span>Path</span>
                        <span>Component</span>
                        <span>Data</span>
                        <span>Actions</span>
                    </div>
                    @for (route of routes(); track route.path) {
                        <div class="route-row">
                            <span class="path">{{ route.path }}</span>
                            <span class="component">{{ route.component }}</span>
                            <span class="data">{{ route.data | json }}</span>
                            <button class="delete" (click)="removeRoute(route.path)">🗑️</button>
                        </div>
                    }
                </div>

                <div class="code-output">
                    <h4>Generated Routes Config</h4>
                    <pre><code>export const routes: Routes = [
@for (route of routes(); track route.path) {
  {{ '{' }} 
    path: '{{ route.path }}',
    component: {{ route.component }},
    data: {{ route.data | json }}
  {{ '}' }},
}</code>];</pre>
                </div>

                <div class="use-cases">
                    <h4>💡 Use Cases for Dynamic Routes</h4>
                    <ul>
                        <li>CMS-driven page creation</li>
                        <li>Feature flags and A/B testing</li>
                        <li>User role-based menu generation</li>
                        <li>Plugin/module system</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ec4899; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .route-builder { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1.5rem; }
        .form-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .form-row label { min-width: 80px; }
        .form-row input, .form-row select { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .route-builder button { width: 100%; padding: 0.75rem; background: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 0.5rem; }
        .routes-table { margin-bottom: 1.5rem; }
        .route-header, .route-row { display: grid; grid-template-columns: 1fr 1fr 1.5fr auto; gap: 0.5rem; padding: 0.5rem; align-items: center; }
        .route-header { background: #1e1e2e; color: white; border-radius: 8px 8px 0 0; font-weight: bold; font-size: 0.85rem; }
        .route-row { background: #f8fafc; border-bottom: 1px solid #e5e7eb; font-size: 0.9rem; }
        .route-row:last-child { border-radius: 0 0 8px 8px; }
        .path { color: #ec4899; font-family: monospace; }
        .component { color: #6b7280; }
        .data { font-family: monospace; font-size: 0.8rem; color: #6b7280; }
        .delete { padding: 0.25rem 0.5rem; background: transparent; border: none; cursor: pointer; font-size: 1rem; }
        .code-output { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .code-output h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-output pre { margin: 0; color: #a6e3a1; font-size: 0.85rem; overflow-x: auto; }
        .use-cases { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .use-cases h4 { margin: 0 0 0.5rem; }
        .use-cases ul { margin: 0; padding-left: 1.25rem; }
        .use-cases li { margin-bottom: 0.25rem; }
    `]
})
export class Scenario5DynamicComponent {
    routes = signal<DynamicRoute[]>([
        { path: 'home', component: 'DashboardComponent', data: { title: 'Home' } },
        { path: 'products', component: 'ListComponent', data: { title: 'Products' } },
        { path: 'products/:id', component: 'DetailComponent', data: { title: 'Product Detail' } }
    ]);

    newRoute = {
        path: '',
        component: 'DashboardComponent',
        title: ''
    };

    addRoute(): void {
        if (!this.newRoute.path) return;

        const route: DynamicRoute = {
            path: this.newRoute.path.replace(/^\//, ''),
            component: this.newRoute.component,
            data: { title: this.newRoute.title || this.newRoute.path }
        };

        this.routes.update(routes => [...routes, route]);
        this.newRoute = { path: '', component: 'DashboardComponent', title: '' };
    }

    removeRoute(path: string): void {
        this.routes.update(routes => routes.filter(r => r.path !== path));
    }
}
