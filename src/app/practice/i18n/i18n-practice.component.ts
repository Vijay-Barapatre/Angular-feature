/**
 * I18N PRACTICE - COMPLETE SECTION
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-i18n-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🌍 i18n Practice</h1>
                <p class="subtitle">Internationalization and localization</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Setup i18n</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Mark for Translation</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Extract Messages</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Date/Number Pipes</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Runtime Switching</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Lazy Loading</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: ngx-translate</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Plural Forms</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: RTL Support</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`.practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; } .practice-header { margin-bottom: 1.5rem; } .back-link { color: #059669; text-decoration: none; } h1 { margin: 0.5rem 0 0.25rem; color: #059669; } .subtitle { margin: 0; color: var(--text-secondary); } .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; } .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; } .nav-section h3 { margin: 0 0 0.75rem; } .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; } .nav-section a:hover { background: rgba(5, 150, 105, 0.1); } .nav-section a.active { background: #059669; color: white; } .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }`]
})
export class I18nPracticeComponent { }

// Basic Exercises
@Component({ selector: 'app-i18n-exercise-1', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 1: Setup i18n</h2><p>Configure Angular i18n in your project.</p></div><div class="demo"><pre>ng add &#64;angular/localize</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #059669; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class I18nExercise1Component { }

@Component({ selector: 'app-i18n-exercise-2', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 2: Mark for Translation</h2><p>Use i18n attribute on elements.</p></div><div class="demo"><pre>&lt;h1 i18n="site header|Main heading"&gt;Welcome&lt;/h1&gt;</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #059669; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class I18nExercise2Component { }

@Component({ selector: 'app-i18n-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: Extract Messages</h2><p>Generate translation files.</p></div><div class="demo"><pre>ng extract-i18n --output-path src/locale</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #059669; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class I18nExercise3Component { }

@Component({ selector: 'app-i18n-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: Date/Number Pipes</h2><p>Locale-aware formatting pipes.</p></div><div class="demo"><p>DatePipe, CurrencyPipe, DecimalPipe respect locale.</p></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #059669; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class I18nExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-i18n-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Runtime Language Switch</h2><p>Change language without page reload.</p></div><div class="content"><p>Use ngx-translate for runtime switching.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class I18nScenario1Component { }

@Component({ selector: 'app-i18n-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Lazy Loading</h2><p>Lazy load translation files.</p></div><div class="content"><p>Load only needed translations.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class I18nScenario2Component { }

@Component({ selector: 'app-i18n-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: ngx-translate</h2><p>Alternative to built-in i18n.</p></div><div class="content"><p>npm install &#64;ngx-translate/core</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class I18nScenario3Component { }

@Component({ selector: 'app-i18n-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Plural Forms</h2><p>Handle pluralization rules.</p></div><div class="content"><p>ICU message format for plurals.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class I18nScenario4Component { }

@Component({ selector: 'app-i18n-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: RTL Support</h2><p>Right-to-left language support.</p></div><div class="content"><p>CSS logical properties, dir attribute.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class I18nScenario5Component { }

export const I18N_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: I18nPracticeComponent, children: [
            { path: 'basic/exercise-1', component: I18nExercise1Component },
            { path: 'basic/exercise-2', component: I18nExercise2Component },
            { path: 'basic/exercise-3', component: I18nExercise3Component },
            { path: 'basic/exercise-4', component: I18nExercise4Component },
            { path: 'complex/scenario-1', component: I18nScenario1Component },
            { path: 'complex/scenario-2', component: I18nScenario2Component },
            { path: 'complex/scenario-3', component: I18nScenario3Component },
            { path: 'complex/scenario-4', component: I18nScenario4Component },
            { path: 'complex/scenario-5', component: I18nScenario5Component },
        ]
    }
];
