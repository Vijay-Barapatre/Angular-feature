/**
 * ============================================================================
 * SERVICES & DI PRACTICE - OVERVIEW AND ROUTES
 * ============================================================================
 */

import { Component, Injectable, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Routes } from '@angular/router';

// ============================================================================
// OVERVIEW COMPONENT
// ============================================================================
@Component({
    selector: 'app-services-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>💉 Services & DI Practice</h1>
                <p class="subtitle">Master Angular dependency injection</p>
            </header>

            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Basic Service</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Inject Function</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Providers</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Injection Tokens</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Hierarchical DI</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Factory Providers</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Multi Providers</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Optional Deps</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Service Scope</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #a855f7; text-decoration: none; font-size: 0.9rem; }
        h1 { margin: 0.5rem 0 0.25rem; color: #a855f7; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; font-size: 1rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(168, 85, 247, 0.1); }
        .nav-section a.active { background: #a855f7; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ServicesPracticeComponent { }

// ============================================================================
// BASIC EXERCISES
// ============================================================================
@Injectable({ providedIn: 'root' })
export class CounterService {
    count = signal(0);
    increment(): void { this.count.update(n => n + 1); }
    decrement(): void { this.count.update(n => n - 1); }
}

@Component({
    selector: 'app-exercise-1-basic',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Basic Service</h2>
                <p>Create a simple service with &#64;Injectable decorator.</p>
            </div>
            <div class="demo">
                <h3>Counter Service Demo</h3>
                <div class="counter">
                    <button (click)="counter.decrement()">-</button>
                    <span>{{ counter.count() }}</span>
                    <button (click)="counter.increment()">+</button>
                </div>
                <p class="hint">Service is shared - state persists across navigations!</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #a855f7; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .counter { display: flex; align-items: center; gap: 1rem; justify-content: center; padding: 2rem; }
        .counter button { width: 50px; height: 50px; font-size: 1.5rem; background: #a855f7; color: white; border: none; border-radius: 8px; cursor: pointer; }
        .counter span { font-size: 3rem; font-weight: bold; min-width: 100px; text-align: center; }
        .hint { text-align: center; color: #6b7280; margin-top: 1rem; }
    `]
})
export class Exercise1BasicComponent {
    counter = inject(CounterService);
}

@Component({
    selector: 'app-exercise-2-inject',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: inject() Function</h2>
                <p>Modern way to inject dependencies (Angular 14+).</p>
            </div>
            <div class="demo">
                <h3>Using inject() vs Constructor</h3>
                <div class="comparison">
                    <div class="method">
                        <h4>Modern: inject()</h4>
                        <code>private service = inject(MyService);</code>
                    </div>
                    <div class="method">
                        <h4>Classic: Constructor</h4>
                        <code>constructor(private service: MyService) {{'{}'}}</code>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #a855f7; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .method { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .method h4 { margin: 0 0 0.5rem; color: #a855f7; }
        .method code { display: block; padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; font-size: 0.85rem; }
    `]
})
export class Exercise2InjectComponent { }

@Component({
    selector: 'app-exercise-3-providers',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Providers</h2>
                <p>Different ways to provide services.</p>
            </div>
            <div class="demo">
                <h3>Provider Types</h3>
                <ul>
                    <li><strong>providedIn: 'root'</strong> - App-wide singleton</li>
                    <li><strong>Component providers</strong> - Instance per component</li>
                    <li><strong>useClass</strong> - Provide different implementation</li>
                    <li><strong>useValue</strong> - Provide a constant</li>
                    <li><strong>useFactory</strong> - Dynamic creation</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #a855f7; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo ul { padding-left: 1.5rem; }
        .demo li { margin-bottom: 0.5rem; }
    `]
})
export class Exercise3ProvidersComponent { }

@Component({
    selector: 'app-exercise-4-tokens',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Injection Tokens</h2>
                <p>Inject non-class dependencies using InjectionToken.</p>
            </div>
            <div class="demo">
                <h3>Injection Token Usage</h3>
                <pre><code>export const API_URL = new InjectionToken&lt;string&gt;('api.url');

// In providers:
{{ '{' }} provide: API_URL, useValue: 'https://api.example.com' {{ '}' }}

// In component:
private apiUrl = inject(API_URL);</code></pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #a855f7; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo pre { background: #1e1e2e; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        .demo code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise4TokensComponent { }

// ============================================================================
// COMPLEX SCENARIOS
// ============================================================================
@Component({
    selector: 'app-scenario-1-hierarchy',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Hierarchical DI</h2>
                <p>Understanding service scope in component hierarchy.</p>
            </div>
            <div class="content">
                <p>Services provided at different levels create separate instances.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class Scenario1HierarchyComponent { }

@Component({
    selector: 'app-scenario-2-factory',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Factory Providers</h2>
                <p>Create services with dynamic configuration.</p>
            </div>
            <div class="content"><p>Factory providers allow runtime service creation.</p></div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class Scenario2FactoryComponent { }

@Component({
    selector: 'app-scenario-3-multi',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Multi Providers</h2>
                <p>Provide multiple values for single token.</p>
            </div>
            <div class="content"><p>Use multi: true to collect multiple providers.</p></div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class Scenario3MultiComponent { }

@Component({
    selector: 'app-scenario-4-optional',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Optional Dependencies</h2>
                <p>Handle missing dependencies gracefully.</p>
            </div>
            <div class="content"><p>Use &#64;Optional() or inject with options.</p></div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class Scenario4OptionalComponent { }

@Component({
    selector: 'app-scenario-5-scope',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Service Scope</h2>
                <p>Control service lifetime and visibility.</p>
            </div>
            <div class="content"><p>Choose appropriate scope for your use case.</p></div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class Scenario5ScopeComponent { }

// ============================================================================
// ROUTES
// ============================================================================
export const SERVICES_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        component: ServicesPracticeComponent,
        children: [
            { path: 'basic/exercise-1', component: Exercise1BasicComponent },
            { path: 'basic/exercise-2', component: Exercise2InjectComponent },
            { path: 'basic/exercise-3', component: Exercise3ProvidersComponent },
            { path: 'basic/exercise-4', component: Exercise4TokensComponent },
            { path: 'complex/scenario-1', component: Scenario1HierarchyComponent },
            { path: 'complex/scenario-2', component: Scenario2FactoryComponent },
            { path: 'complex/scenario-3', component: Scenario3MultiComponent },
            { path: 'complex/scenario-4', component: Scenario4OptionalComponent },
            { path: 'complex/scenario-5', component: Scenario5ScopeComponent },
        ]
    }
];
