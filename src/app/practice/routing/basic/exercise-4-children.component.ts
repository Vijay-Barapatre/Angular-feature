/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: CHILD ROUTES
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exercise-4-children',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Child Routes</h2>
                <p>Create nested navigation with child routes and outlets.</p>
            </div>

            <div class="demo">
                <div class="code-block">
                    <h4>Child Route Configuration</h4>
                    <pre><code>{{ '{' }}
  path: 'admin',
  component: AdminComponent,
  children: [
    {{ '{' }} path: '', redirectTo: 'dashboard', pathMatch: 'full' {{ '}' }},
    {{ '{' }} path: 'dashboard', component: DashboardComponent {{ '}' }},
    {{ '{' }} path: 'users', component: UsersComponent {{ '}' }},
    {{ '{' }} path: 'settings', component: SettingsComponent {{ '}' }}
  ]
{{ '}' }}</code></pre>
                </div>

                <h3>🎮 Nested Layout Demo</h3>
                
                <div class="layout-demo">
                    <div class="main-nav">
                        @for (section of mainSections(); track section.path) {
                            <button 
                                [class.active]="currentSection() === section.path"
                                (click)="selectSection(section.path)">
                                {{ section.label }}
                            </button>
                        }
                    </div>

                    <div class="content-area">
                        <aside class="child-nav">
                            <h4>{{ currentSectionLabel() }}</h4>
                            @for (child of currentChildren(); track child.path) {
                                <button 
                                    [class.active]="currentChild() === child.path"
                                    (click)="selectChild(child.path)">
                                    {{ child.label }}
                                </button>
                            }
                        </aside>

                        <main class="child-content">
                            <div class="breadcrumb">
                                {{ currentSection() }} / {{ currentChild() }}
                            </div>
                            <div class="outlet-marker">
                                ← router-outlet (child)
                            </div>
                            <div class="page-content">
                                <h4>{{ currentChildLabel() }}</h4>
                                <p>This content renders in the child router-outlet</p>
                            </div>
                        </main>
                    </div>
                </div>

                <div class="url-display">
                    <span class="label">Current URL:</span>
                    <code>/{{ currentSection() }}/{{ currentChild() }}</code>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .code-block h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .layout-demo { border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .main-nav { display: flex; background: #1e1e2e; padding: 0.5rem; gap: 0.5rem; }
        .main-nav button { padding: 0.5rem 1rem; background: transparent; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .main-nav button:hover { background: rgba(255,255,255,0.1); }
        .main-nav button.active { background: #ec4899; }
        .content-area { display: grid; grid-template-columns: 150px 1fr; min-height: 200px; }
        .child-nav { padding: 1rem; background: #f8fafc; border-right: 1px solid #e5e7eb; }
        .child-nav h4 { margin: 0 0 0.75rem; font-size: 0.85rem; color: #6b7280; }
        .child-nav button { display: block; width: 100%; padding: 0.5rem; margin-bottom: 0.25rem; background: transparent; border: none; text-align: left; border-radius: 4px; cursor: pointer; }
        .child-nav button:hover { background: #fdf2f8; }
        .child-nav button.active { background: #ec4899; color: white; }
        .child-content { padding: 1rem; }
        .breadcrumb { font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem; }
        .outlet-marker { font-size: 0.75rem; color: #ec4899; margin-bottom: 1rem; }
        .page-content h4 { margin: 0 0 0.5rem; color: #ec4899; }
        .page-content p { margin: 0; color: #6b7280; }
        .url-display { margin-top: 1rem; padding: 0.75rem; background: #334155; border-radius: 8px; }
        .url-display .label { color: #94a3b8; margin-right: 0.5rem; }
        .url-display code { color: #a6e3a1; }
    `]
})
export class Exercise4ChildrenComponent {
    mainSections = signal([
        {
            path: 'admin',
            label: '🔧 Admin',
            children: [
                { path: 'dashboard', label: 'Dashboard' },
                { path: 'users', label: 'Users' },
                { path: 'settings', label: 'Settings' }
            ]
        },
        {
            path: 'shop',
            label: '🛒 Shop',
            children: [
                { path: 'products', label: 'Products' },
                { path: 'cart', label: 'Cart' },
                { path: 'checkout', label: 'Checkout' }
            ]
        },
        {
            path: 'account',
            label: '👤 Account',
            children: [
                { path: 'profile', label: 'Profile' },
                { path: 'orders', label: 'Orders' },
                { path: 'preferences', label: 'Preferences' }
            ]
        }
    ]);

    currentSection = signal('admin');
    currentChild = signal('dashboard');

    currentSectionLabel(): string {
        return this.mainSections().find(s => s.path === this.currentSection())?.label || '';
    }

    currentChildren(): { path: string; label: string }[] {
        return this.mainSections().find(s => s.path === this.currentSection())?.children || [];
    }

    currentChildLabel(): string {
        return this.currentChildren().find(c => c.path === this.currentChild())?.label || '';
    }

    selectSection(path: string): void {
        this.currentSection.set(path);
        const firstChild = this.mainSections().find(s => s.path === path)?.children[0];
        if (firstChild) {
            this.currentChild.set(firstChild.path);
        }
    }

    selectChild(path: string): void {
        this.currentChild.set(path);
    }
}
