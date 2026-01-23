/**
 * ============================================================================
 * FEATURE MODULES & LAZY LOADING
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-feature-modules',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Feature Modules</h1>
                <p class="subtitle">Organize and Lazy Load</p>
            </header>

            <section class="concept-section">
                <h2>What is a Feature Module?</h2>
                <p>
                    A feature module groups related functionality - components, services, 
                    routes - into a cohesive unit that can be <strong>lazy loaded</strong>.
                </p>
            </section>

            <section class="structure-section">
                <h2>📁 Typical Structure</h2>
                <pre class="code"><code>src/app/
├── app.module.ts
├── app-routing.module.ts
└── features/
    └── admin/
        ├── admin.module.ts
        ├── admin-routing.module.ts
        ├── components/
        │   ├── dashboard/
        │   └── users/
        └── services/
            └── admin.service.ts</code></pre>
            </section>

            <section class="feature-module-section">
                <h2>🛠️ Feature Module Structure</h2>
                <pre class="code"><code>// admin.module.ts
&#64;NgModule({{ '{' }}
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,  // Feature's routes
    SharedModule         // Reusable components
  ]
{{ '}' }})
export class AdminModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="lazy-loading-section">
                <h2>🚀 Lazy Loading</h2>
                <pre class="code"><code>// app-routing.module.ts
const routes: Routes = [
  {{ '{' }}
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule)
  {{ '}' }}
];

&#64;NgModule({{ '{' }}
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
{{ '}' }})
export class AppRoutingModule {{ '{' }} {{ '}' }}</code></pre>
                <p class="note">
                    <strong>Result:</strong> AdminModule only loads when user navigates to /admin
                </p>
            </section>

            <section class="feature-routing-section">
                <h2>🛤️ Feature Routing Module</h2>
                <pre class="code"><code>// admin-routing.module.ts
const routes: Routes = [
  {{ '{' }}
    path: '',  // /admin
    component: AdminLayoutComponent,
    children: [
      {{ '{' }} path: 'dashboard', component: DashboardComponent {{ '}' }},
      {{ '{' }} path: 'users', component: UsersComponent {{ '}' }},
      {{ '{' }} path: 'users/:id', component: UserDetailComponent {{ '}' }}
    ]
  {{ '}' }}
];

&#64;NgModule({{ '{' }}
  imports: [RouterModule.forChild(routes)],  // forChild, not forRoot!
  exports: [RouterModule]
{{ '}' }})
export class AdminRoutingModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="benefits-section">
                <h2>✨ Benefits</h2>
                <div class="benefit-grid">
                    <div class="benefit">
                        <span class="icon">📦</span>
                        <h4>Organization</h4>
                        <p>Group related code</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🚀</span>
                        <h4>Performance</h4>
                        <p>Load on demand</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">👥</span>
                        <h4>Team Work</h4>
                        <p>Parallel development</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🔧</span>
                        <h4>Maintainability</h4>
                        <p>Smaller, focused modules</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; font-size: 0.85rem; }

        section { margin-bottom: 2rem; }
        .note { background: #dcfce7; padding: 0.75rem; border-radius: 6px; margin-top: 1rem; }

        .benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .benefit { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; text-align: center; }
        .benefit .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .benefit h4 { margin: 0 0 0.25rem; font-size: 0.9rem; }
        .benefit p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }
    `]
})
export class FeatureModulesComponent { }
