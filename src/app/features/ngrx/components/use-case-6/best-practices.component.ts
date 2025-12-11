/**
 * ============================================================================
 * 📋 NgRx Best Practices & Common Patterns
 * ============================================================================
 * 
 * This component consolidates NgRx best practices, common patterns,
 * and anti-patterns to avoid.
 * 
 * ============================================================================
 * 📚 CORE PRINCIPLES
 * ============================================================================
 * 
 * 1. SINGLE SOURCE OF TRUTH
 *    - All shared state in one store
 *    - Components read from store, not each other
 * 
 * 2. STATE IS READ-ONLY
 *    - Never mutate state directly
 *    - Only actions can trigger state changes
 * 
 * 3. PURE FUNCTIONS FOR CHANGES
 *    - Reducers are pure functions
 *    - Same input = same output, no side effects
 * 
 * 4. SIDE EFFECTS IN EFFECTS
 *    - API calls, navigation, localStorage in Effects
 *    - Never in reducers or components
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Practice {
    title: string;
    description: string;
    goodCode?: string;
    badCode?: string;
    category: 'pattern' | 'anti-pattern' | 'tip';
}

@Component({
    selector: 'app-best-practices',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>📋 Use Case 6: Best Practices</h1>
                <p>Patterns, Anti-Patterns, and Production Tips</p>
            </header>

            <div class="tabs">
                <button 
                    [class.active]="selectedTab() === 'patterns'" 
                    (click)="selectedTab.set('patterns')">
                    ✅ Patterns
                </button>
                <button 
                    [class.active]="selectedTab() === 'antipatterns'" 
                    (click)="selectedTab.set('antipatterns')">
                    ❌ Anti-Patterns
                </button>
                <button 
                    [class.active]="selectedTab() === 'checklist'" 
                    (click)="selectedTab.set('checklist')">
                    📋 Checklist
                </button>
            </div>

            <!-- PATTERNS -->
            @if (selectedTab() === 'patterns') {
                <div class="patterns-grid">
                    @for (practice of patterns; track practice.title) {
                        <div class="practice-card good">
                            <h3>{{ practice.title }}</h3>
                            <p>{{ practice.description }}</p>
                            @if (practice.goodCode) {
                                <div class="code-block">
                                    <pre>{{ practice.goodCode }}</pre>
                                </div>
                            }
                        </div>
                    }
                </div>
            }

            <!-- ANTI-PATTERNS -->
            @if (selectedTab() === 'antipatterns') {
                <div class="patterns-grid">
                    @for (practice of antiPatterns; track practice.title) {
                        <div class="practice-card bad">
                            <h3>❌ {{ practice.title }}</h3>
                            <p>{{ practice.description }}</p>
                            @if (practice.badCode) {
                                <div class="code-block bad">
                                    <span class="label">Don't do this:</span>
                                    <pre>{{ practice.badCode }}</pre>
                                </div>
                            }
                            @if (practice.goodCode) {
                                <div class="code-block good">
                                    <span class="label">Do this instead:</span>
                                    <pre>{{ practice.goodCode }}</pre>
                                </div>
                            }
                        </div>
                    }
                </div>
            }

            <!-- CHECKLIST -->
            @if (selectedTab() === 'checklist') {
                <div class="checklist-container">
                    <section class="checklist-section">
                        <h2>📦 Store Setup</h2>
                        <ul class="checklist">
                            <li>✅ Configure StoreModule.forRoot() in AppModule</li>
                            <li>✅ Use feature modules with StoreModule.forFeature()</li>
                            <li>✅ Enable StoreDevtools only in development</li>
                            <li>✅ Use strict runtime checks during development</li>
                        </ul>
                    </section>

                    <section class="checklist-section">
                        <h2>🎬 Actions</h2>
                        <ul class="checklist">
                            <li>✅ Follow naming convention: [Source] Event</li>
                            <li>✅ Use createAction with props for payloads</li>
                            <li>✅ Create action triad for async: Load, Success, Failure</li>
                            <li>✅ Keep actions granular and specific</li>
                        </ul>
                    </section>

                    <section class="checklist-section">
                        <h2>⚙️ Reducers</h2>
                        <ul class="checklist">
                            <li>✅ Always return new state object (immutability)</li>
                            <li>✅ Never call APIs or have side effects</li>
                            <li>✅ Use spread operator for updates</li>
                            <li>✅ Initialize state properly</li>
                        </ul>
                    </section>

                    <section class="checklist-section">
                        <h2>⚡ Effects</h2>
                        <ul class="checklist">
                            <li>✅ Always use catchError inside inner pipe</li>
                            <li>✅ Choose correct flattening operator</li>
                            <li>✅ Use {{ '{ dispatch: false }' }} for non-dispatching effects</li>
                            <li>✅ Keep effects focused (single responsibility)</li>
                        </ul>
                    </section>

                    <section class="checklist-section">
                        <h2>🔍 Selectors</h2>
                        <ul class="checklist">
                            <li>✅ Create feature selector first</li>
                            <li>✅ Compose small, reusable selectors</li>
                            <li>✅ Use Entity Adapter selectors for collections</li>
                            <li>✅ Keep selectors pure (no side effects)</li>
                        </ul>
                    </section>

                    <section class="checklist-section">
                        <h2>🏗️ Architecture</h2>
                        <ul class="checklist">
                            <li>✅ Smart components: connect to store</li>
                            <li>✅ Dumb components: receive Input, emit Output</li>
                            <li>✅ Normalize nested data</li>
                            <li>✅ Use facade services for complex feature modules</li>
                        </ul>
                    </section>
                </div>
            }
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
        h1 { color: #f8fafc; margin: 0.5rem 0; }
        p { color: #94a3b8; }

        .tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; }
        .tabs button {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            border: 1px solid #334155;
            background: #1e293b;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.2s;
        }
        .tabs button.active { background: #3b82f6; color: white; border-color: #3b82f6; }

        .patterns-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }

        .practice-card {
            background: #1e293b;
            border-radius: 12px;
            padding: 1.5rem;
            border-left: 4px solid;
        }
        .practice-card.good { border-color: #10b981; }
        .practice-card.bad { border-color: #ef4444; }
        .practice-card h3 { color: #f8fafc; margin: 0 0 0.5rem 0; }
        .practice-card p { color: #94a3b8; margin: 0 0 1rem 0; }

        .code-block {
            background: #0f172a;
            padding: 1rem;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            margin-top: 0.5rem;
        }
        .code-block pre { margin: 0; color: #10b981; white-space: pre-wrap; }
        .code-block.bad pre { color: #fca5a5; }
        .code-block.good { margin-top: 1rem; }
        .code-block .label { display: block; color: #64748b; font-size: 0.75rem; margin-bottom: 0.5rem; }

        .checklist-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .checklist-section {
            background: #1e293b;
            border-radius: 12px;
            padding: 1.5rem;
        }
        .checklist-section h2 { color: #f8fafc; margin: 0 0 1rem 0; font-size: 1.1rem; }
        .checklist { list-style: none; padding: 0; margin: 0; }
        .checklist li {
            padding: 0.5rem 0;
            color: #94a3b8;
            border-bottom: 1px solid #334155;
        }
        .checklist li:last-child { border-bottom: none; }
    `]
})
export class BestPracticesComponent {
    selectedTab = signal<'patterns' | 'antipatterns' | 'checklist'>('patterns');

    patterns: Practice[] = [
        {
            title: 'Action Naming Convention',
            description: 'Use [Source] Event format for clear debugging in DevTools.',
            goodCode: `export const loadUsers = createAction('[Users Page] Load Users');
export const addToCart = createAction('[Product Page] Add To Cart');`,
            category: 'pattern'
        },
        {
            title: 'Action Triad for Async',
            description: 'Create three actions for every async operation: trigger, success, failure.',
            goodCode: `export const loadUsers = createAction('[Users] Load');
export const loadUsersSuccess = createAction('[Users] Load Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Failure', props<{ error: string }>());`,
            category: 'pattern'
        },
        {
            title: 'Facade Pattern',
            description: 'Create a facade service to encapsulate store interactions for a feature.',
            goodCode: `@Injectable()
export class UsersFacade {
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);
  
  loadUsers() { this.store.dispatch(loadUsers()); }
  deleteUser(id: number) { this.store.dispatch(deleteUser({ id })); }
}`,
            category: 'pattern'
        },
        {
            title: 'Normalized State',
            description: 'Store entities by ID to avoid nested data and enable O(1) lookups.',
            goodCode: `// Instead of nested arrays
{ 
  users: { 
    ids: [1, 2], 
    entities: { 
      1: { id: 1, name: 'John' }, 
      2: { id: 2, name: 'Jane' } 
    } 
  } 
}`,
            category: 'pattern'
        }
    ];

    antiPatterns: Practice[] = [
        {
            title: 'Mutating State in Reducer',
            description: 'Never modify state directly. Always return a new object.',
            badCode: `on(increment, state => {
  state.count++;  // ❌ MUTATION
  return state;
})`,
            goodCode: `on(increment, state => ({
  ...state,
  count: state.count + 1  // ✅ NEW OBJECT
}))`,
            category: 'anti-pattern'
        },
        {
            title: 'API Calls in Reducer',
            description: 'Reducers must be synchronous and pure. Use Effects for async.',
            badCode: `on(loadUsers, state => {
  this.http.get('/api/users').subscribe(...);  // ❌ SIDE EFFECT
  return state;
})`,
            goodCode: `// In Effect:
this.actions$.pipe(
  ofType(loadUsers),
  mergeMap(() => this.http.get('/api/users'))
)`,
            category: 'anti-pattern'
        },
        {
            title: 'Missing catchError in Effects',
            description: 'Without catchError, the effect stream dies on first error.',
            badCode: `mergeMap(() => this.api.getData().pipe(
  map(data => loadSuccess({ data }))
  // ❌ No catchError - stream will die!
))`,
            goodCode: `mergeMap(() => this.api.getData().pipe(
  map(data => loadSuccess({ data })),
  catchError(err => of(loadFailure({ error: err.message })))  // ✅
))`,
            category: 'anti-pattern'
        },
        {
            title: 'Subscribing to Store in Service',
            description: 'Services should not subscribe. Return Observable for component to handle.',
            badCode: `// In Service
this.store.select(selectUser).subscribe(user => {
  this.currentUser = user;  // ❌ Memory leak, hard to test
});`,
            goodCode: `// Return Observable, let component subscribe
getUser(): Observable<User> {
  return this.store.select(selectUser);
}`,
            category: 'anti-pattern'
        }
    ];
}
