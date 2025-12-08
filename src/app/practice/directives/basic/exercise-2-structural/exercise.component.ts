/**
 * ============================================================================
 * 🟦 EXERCISE 2: STRUCTURAL DIRECTIVE
 * ============================================================================
 */

import { Component, Directive, Input, TemplateRef, ViewContainerRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appUnless]',
    standalone: true
})
export class UnlessDirective {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input() set appUnless(condition: boolean) {
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}

@Component({
    selector: 'app-exercise-2-structural',
    standalone: true,
    imports: [CommonModule, UnlessDirective],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Structural Directive</h2>
                <p>Create a custom *appUnless directive (opposite of *ngIf).</p>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="toggle-section">
                    <label>
                        <input type="checkbox" [checked]="condition()" (change)="condition.set(!condition())">
                        Condition is: {{ condition() ? 'TRUE' : 'FALSE' }}
                    </label>
                </div>

                <div class="comparison">
                    <div class="compare-box">
                        <h4>*ngIf (shows when TRUE)</h4>
                        <div class="content-area">
                            @if (condition()) {
                                <div class="visible">✅ Visible</div>
                            }
                        </div>
                    </div>
                    <div class="compare-box">
                        <h4>*appUnless (shows when FALSE)</h4>
                        <div class="content-area">
                            <div *appUnless="condition()" class="visible">✅ Visible</div>
                        </div>
                    </div>
                </div>

                <div class="code-preview">
                    <pre><code>&lt;div *appUnless="isLoading"&gt;
  Shows when NOT loading
&lt;/div&gt;</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; }
        .instructions h2 { margin: 0 0 0.5rem; color: #f59e0b; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .toggle-section { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .toggle-section label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: 500; }
        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .compare-box { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .compare-box h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .content-area { min-height: 60px; display: flex; align-items: center; justify-content: center; background: #e5e7eb; border-radius: 6px; }
        .visible { padding: 0.75rem 1.5rem; background: #dcfce7; color: #16a34a; border-radius: 6px; font-weight: 500; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise2StructuralComponent {
    condition = signal(true);
}
