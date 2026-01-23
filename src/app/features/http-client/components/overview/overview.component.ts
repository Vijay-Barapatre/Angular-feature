/**
 * ============================================================================
 * HTTP CLIENT OVERVIEW COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface UseCase {
    id: number;
    title: string;
    description: string;
    path: string;
    icon: string;
    level: 'Basic' | 'Intermediate' | 'Advanced';
}

@Component({
    selector: 'app-http-client-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="overview-container">
            <header class="header">
                <h1>🌐 HttpClient &#38; Observables</h1>
                <p class="subtitle">
                    Master Angular's HTTP communication with Observables and RxJS.
                </p>
            </header>

            <section class="info-cards">
                <div class="info-card observable">
                    <h3>📡 Observable</h3>
                    <p>Lazy, cancellable stream of data. Can emit multiple values over time.</p>
                </div>
                <div class="info-card promise">
                    <h3>🤝 Promise</h3>
                    <p>Eager, single value. Good for simple one-time requests.</p>
                </div>
                <div class="info-card rxjs">
                    <h3>🔧 RxJS</h3>
                    <p>Powerful operators: map, filter, switchMap, retry, catchError.</p>
                </div>
            </section>

            <section class="use-cases">
                <h2>📚 Use Cases (Basic → Advanced)</h2>
                <div class="use-cases-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card" [class]="useCase.level.toLowerCase()">
                            <div class="card-header">
                                <span class="use-case-icon">{{ useCase.icon }}</span>
                                <span class="level-badge">{{ useCase.level }}</span>
                            </div>
                            <h3>{{ useCase.title }}</h3>
                            <p>{{ useCase.description }}</p>
                        </a>
                    }
                </div>
            </section>

            <section class="api-note">
                <h3>⚠️ Mock API Required</h3>
                <p>Run the mock API server: <code>cd mock-api &#38;&#38; node server.js</code></p>
                <p>API runs on: <code>http://localhost:3000/api</code></p>
            </section>
        </div>
    `,
    styles: [`
        .overview-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; }
        .header h1 { font-size: 2.5rem; color: #1a1a2e; margin-bottom: 1rem; }
        .subtitle { font-size: 1.2rem; color: #666; max-width: 600px; margin: 0 auto; }

        .info-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .info-card { padding: 1.5rem; border-radius: 12px; color: white; }
        .info-card.observable { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .info-card.promise { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .info-card.rxjs { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .info-card h3 { margin-top: 0; }

        .use-cases h2 { text-align: center; margin-bottom: 1.5rem; color: #1a1a2e; }
        .use-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .use-case-card {
            background: white; border: 2px solid #e0e0e0; border-radius: 12px;
            padding: 1.5rem; text-decoration: none; color: inherit;
            transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .use-case-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .use-case-card.basic { border-left: 4px solid #4ade80; }
        .use-case-card.intermediate { border-left: 4px solid #fbbf24; }
        .use-case-card.advanced { border-left: 4px solid #ef4444; }
        .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
        .use-case-icon { font-size: 1.5rem; }
        .level-badge { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; }
        .basic .level-badge { background: #dcfce7; color: #166534; }
        .intermediate .level-badge { background: #fef3c7; color: #92400e; }
        .advanced .level-badge { background: #fee2e2; color: #b91c1c; }
        .use-case-card h3 { margin: 0 0 0.5rem 0; color: #1a1a2e; font-size: 1.1rem; }
        .use-case-card p { margin: 0; color: #666; font-size: 0.9rem; line-height: 1.5; }

        .api-note { background: #fef3c7; padding: 1.5rem; border-radius: 12px; margin-top: 2rem; }
        .api-note h3 { margin-top: 0; color: #92400e; }
        .api-note code { background: #1a1a2e; color: #4ade80; padding: 0.25rem 0.5rem; border-radius: 4px; }
    `]
})
export class HttpClientOverviewComponent {
    useCases: UseCase[] = [
        { id: 1, title: 'Basic GET with Observable', description: 'Fetch data, subscribe, async pipe, loading states.', path: 'basic-get', icon: '📥', level: 'Basic' },
        { id: 2, title: 'CRUD Operations', description: 'POST, PUT, DELETE with request bodies and responses.', path: 'crud', icon: '✏️', level: 'Basic' },
        { id: 3, title: 'Error Handling &#38; Retry', description: 'catchError, retry, custom error handlers.', path: 'error-handling', icon: '🐛', level: 'Intermediate' },
        { id: 4, title: 'HTTP Interceptors', description: 'Auth tokens, logging, global error handling.', path: 'interceptors', icon: '🔒', level: 'Intermediate' },
        { id: 5, title: 'Promise-based Requests', description: 'lastValueFrom, async/await patterns.', path: 'promises', icon: '🤝', level: 'Intermediate' },
        { id: 6, title: 'RxJS Operators', description: 'switchMap, concatMap, forkJoin, debounce.', path: 'rxjs-operators', icon: '🔧', level: 'Advanced' },
        { id: 7, title: 'Caching Strategies', description: 'shareReplay, BehaviorSubject, cache invalidation.', path: 'caching', icon: '💾', level: 'Advanced' },
        { id: 8, title: 'File Upload/Download', description: 'Progress tracking, blob handling.', path: 'file-operations', icon: '📁', level: 'Advanced' }
    ];
}
