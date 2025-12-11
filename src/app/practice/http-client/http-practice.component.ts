/**
 * ============================================================================
 * HTTP CLIENT PRACTICE - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-http-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🌐 HTTP Client Practice</h1>
                <p class="subtitle">Master API calls, interceptors, and error handling</p>
            </header>

            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">
                        Exercise 1: GET Requests
                    </a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">
                        Exercise 2: POST/PUT/DELETE
                    </a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">
                        Exercise 3: Query Parameters
                    </a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">
                        Exercise 4: Error Handling
                    </a>
                    <a routerLink="basic/exercise-5" routerLinkActive="active">
                        Exercise 5: API Chaining
                    </a>
                    <a routerLink="basic/exercise-6" routerLinkActive="active">
                        Exercise 6: Parallel Calls
                    </a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">
                        Scenario 1: CRUD Application
                    </a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">
                        Scenario 2: Auth Interceptor
                    </a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">
                        Scenario 3: Caching Service
                    </a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">
                        Scenario 4: File Upload
                    </a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">
                        Scenario 5: Polling & SSE
                    </a>
                    <a routerLink="complex/scenario-6" routerLinkActive="active">
                        Scenario 6: Promise Patterns
                    </a>
                    <a routerLink="complex/scenario-7" routerLinkActive="active">
                        Scenario 7: Type-ahead Search
                    </a>
                </div>
            </nav>

            <main class="exercise-content">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #10b981; text-decoration: none; font-size: 0.9rem; }
        h1 { margin: 0.5rem 0 0.25rem; color: #06b6d4; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; font-size: 1rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(6, 182, 212, 0.1); }
        .nav-section a.active { background: #06b6d4; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class HttpPracticeComponent { }
