/**
 * NGRX PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-ngrx-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔴 NgRx Practice</h1>
                <p class="subtitle">State management with Redux pattern</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Store Setup</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Actions</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Reducers</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Selectors</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Effects</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Entity Adapter</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Feature State</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Router Store</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: DevTools</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #ba2bd2; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #ba2bd2; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(186, 43, 210, 0.1); }
        .nav-section a.active { background: #ba2bd2; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class NgRxPracticeComponent { }

// Exercises
@Component({
    selector: 'app-ngrx-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Store Setup</h2>
                <p>Configure NgRx store in a standalone Angular app.</p>
            </div>
            <div class="demo">
                <pre>// app.config.ts
provideStore(&#123;&#125;),
provideEffects([]),
provideStoreDevtools(&#123;
  maxAge: 25,
  logOnly: !isDevMode()
&#125;)</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.5; overflow-x: auto; }
    `]
})
export class NgRxExercise1Component { }

@Component({
    selector: 'app-ngrx-exercise-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Actions</h2>
                <p>Define type-safe actions with createAction.</p>
            </div>
            <div class="demo">
                <pre>export const loadItems = createAction('[Items] Load');
export const loadItemsSuccess = createAction(
  '[Items] Load Success',
  props&lt;&#123; items: Item[] &#125;&gt;()
);</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.5; overflow-x: auto; }
    `]
})
export class NgRxExercise2Component { }

@Component({
    selector: 'app-ngrx-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Reducers</h2>
                <p>Create pure reducer functions with createReducer.</p>
            </div>
            <div class="demo">
                <pre>export const itemsReducer = createReducer(
  initialState,
  on(loadItems, state =&gt; (&#123; ...state, loading: true &#125;)),
  on(loadItemsSuccess, (state, &#123; items &#125;) =&gt; (&#123;
    ...state, items, loading: false
  &#125;))
);</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.5; overflow-x: auto; }
    `]
})
export class NgRxExercise3Component { }

@Component({
    selector: 'app-ngrx-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Selectors</h2>
                <p>Create memoized selectors with createSelector.</p>
            </div>
            <div class="demo">
                <pre>export const selectItemsState = createFeatureSelector&lt;ItemsState&gt;('items');
export const selectAllItems = createSelector(
  selectItemsState,
  state =&gt; state.items
);</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.5; overflow-x: auto; }
    `]
})
export class NgRxExercise4Component { }

// Complex Scenarios
@Component({
    selector: 'app-ngrx-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Effects</h2>
                <p>Handle side effects with createEffect.</p>
            </div>
            <div class="content">
                <pre>loadItems$ = createEffect(() =&gt;
  this.actions$.pipe(
    ofType(loadItems),
    switchMap(() =&gt; this.api.getItems().pipe(
      map(items =&gt; loadItemsSuccess(&#123; items &#125;)),
      catchError(error =&gt; of(loadItemsFailure(&#123; error &#125;)))
    ))
  )
);</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .content p { color: #374151 !important; margin: 0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.5; overflow-x: auto; }
    `]
})
export class NgRxScenario1Component { }

@Component({
    selector: 'app-ngrx-scenario-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Entity Adapter</h2>
                <p>Manage normalized entity collections.</p>
            </div>
            <div class="content">
                <p>Use createEntityAdapter for CRUD operations.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .content p { color: #374151 !important; margin: 0; }
    `]
})
export class NgRxScenario2Component { }

@Component({
    selector: 'app-ngrx-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Feature State</h2>
                <p>Lazy-load feature state modules.</p>
            </div>
            <div class="content">
                <p>Use provideState for feature modules.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .content p { color: #374151 !important; margin: 0; }
    `]
})
export class NgRxScenario3Component { }

@Component({
    selector: 'app-ngrx-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Router Store</h2>
                <p>Sync router state with store.</p>
            </div>
            <div class="content">
                <p>Access route params from selectors.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .content p { color: #374151 !important; margin: 0; }
    `]
})
export class NgRxScenario4Component { }

@Component({
    selector: 'app-ngrx-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: DevTools</h2>
                <p>Debug with Redux DevTools.</p>
            </div>
            <div class="content">
                <p>Time travel debugging, action replay, state export.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .content p { color: #374151 !important; margin: 0; }
    `]
})
export class NgRxScenario5Component { }

export const NGRX_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: NgRxPracticeComponent, children: [
            { path: 'basic/exercise-1', component: NgRxExercise1Component },
            { path: 'basic/exercise-2', component: NgRxExercise2Component },
            { path: 'basic/exercise-3', component: NgRxExercise3Component },
            { path: 'basic/exercise-4', component: NgRxExercise4Component },
            { path: 'complex/scenario-1', component: NgRxScenario1Component },
            { path: 'complex/scenario-2', component: NgRxScenario2Component },
            { path: 'complex/scenario-3', component: NgRxScenario3Component },
            { path: 'complex/scenario-4', component: NgRxScenario4Component },
            { path: 'complex/scenario-5', component: NgRxScenario5Component },
        ]
    }
];
