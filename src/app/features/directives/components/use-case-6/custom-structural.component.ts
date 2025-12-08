/**
 * ============================================================================
 * USE CASE 6: CUSTOM STRUCTURAL DIRECTIVES
 * ============================================================================
 * 
 * 💡 ADVANCED STRUCTURAL PATTERNS
 * - *appRepeat - Repeat content N times
 * - *appLet - Declare template variables
 * - Microsyntax parsing
 */

import { Component, Directive, Input, TemplateRef, ViewContainerRef, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================================================
// DIRECTIVE 1: *appRepeat - Repeat N times
// ============================================================================
@Directive({
    selector: '[appRepeat]',
    standalone: true
})
export class AppRepeatDirective implements OnChanges {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);

    @Input() appRepeat = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appRepeat']) {
            this.viewContainer.clear();

            for (let i = 0; i < this.appRepeat; i++) {
                this.viewContainer.createEmbeddedView(this.templateRef, {
                    $implicit: i + 1, // 1-indexed for display
                    index: i,         // 0-indexed
                    total: this.appRepeat
                });
            }
        }
    }
}

// ============================================================================
// DIRECTIVE 2: *appLet - Declare template variable
// ============================================================================
@Directive({
    selector: '[appLet]',
    standalone: true
})
export class AppLetDirective<T> {
    private templateRef = inject(TemplateRef<{ $implicit: T; appLet: T }>);
    private viewContainer = inject(ViewContainerRef);
    private viewRef: any = null;

    @Input()
    set appLet(value: T) {
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: value,
                appLet: value
            });
        } else {
            this.viewRef.context.$implicit = value;
            this.viewRef.context.appLet = value;
        }
    }

    static ngTemplateContextGuard<T>(
        dir: AppLetDirective<T>,
        ctx: unknown
    ): ctx is { $implicit: T; appLet: T } {
        return true;
    }
}

// ============================================================================
// DIRECTIVE 3: *appRange - Range generator
// ============================================================================
@Directive({
    selector: '[appRange]',
    standalone: true
})
export class AppRangeDirective implements OnChanges {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);

    @Input() appRangeFrom = 1;
    @Input() appRangeTo = 5;
    @Input() appRangeStep = 1;

    ngOnChanges(): void {
        this.viewContainer.clear();

        for (let i = this.appRangeFrom; i <= this.appRangeTo; i += this.appRangeStep) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: i,
                first: i === this.appRangeFrom,
                last: i === this.appRangeTo || i + this.appRangeStep > this.appRangeTo
            });
        }
    }
}

// ============================================================================
// DIRECTIVE 4: *appSwitch - Multi-case switch
// ============================================================================
@Directive({
    selector: '[appSwitchCase]',
    standalone: true
})
export class AppSwitchCaseDirective {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);

    @Input() appSwitchCase: any;
    currentValue: any;

    updateView(value: any): void {
        if (value === this.appSwitchCase) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-custom-structural',
    standalone: true,
    imports: [CommonModule, FormsModule, AppRepeatDirective, AppLetDirective, AppRangeDirective],
    template: `
        <div class="container">
            <h1>🔁 Use Case 6: Custom Structural Directives</h1>
            <p class="description">
                Advanced patterns for structural directives.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: *appRepeat -->
                <section class="demo-section">
                    <h3>🔢 *appRepeat - Repeat N Times</h3>
                    <div class="controls">
                        <label>Count: <input type="number" [(ngModel)]="repeatCount" min="0" max="10"></label>
                    </div>
                    <div class="repeat-container">
                        <div *appRepeat="repeatCount; let num; let i = index; let total = total" class="repeat-item">
                            Item {{ num }} of {{ total }}
                        </div>
                    </div>
                    <div class="code-block">
                        <pre>
&lt;div *appRepeat="5; let num"&gt;
    Item {{ '{' }}{{ '{' }} num {{ '}' }}{{ '}' }}
&lt;/div&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 2: *appLet -->
                <section class="demo-section">
                    <h3>📝 *appLet - Declare Variable</h3>
                    <p>Useful for async pipe or complex expressions:</p>
                    <div *appLet="user as u" class="let-demo">
                        <strong>Name:</strong> {{ u.name }}<br>
                        <strong>Email:</strong> {{ u.email }}<br>
                        <strong>Role:</strong> {{ u.role }}
                    </div>
                    <div class="code-block">
                        <pre>
&lt;div *appLet="complexExpression as value"&gt;
    {{ '{' }}{{ '{' }} value {{ '}' }}{{ '}' }}
&lt;/div&gt;

// With async pipe:
&lt;div *appLet="data$ | async as data"&gt;
    {{ '{' }}{{ '{' }} data.name {{ '}' }}{{ '}' }}
&lt;/div&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: *appRange -->
                <section class="demo-section">
                    <h3>📊 *appRange - Number Range</h3>
                    <div class="controls">
                        <label>From: <input type="number" [(ngModel)]="rangeFrom" size="3"></label>
                        <label>To: <input type="number" [(ngModel)]="rangeTo" size="3"></label>
                        <label>Step: <input type="number" [(ngModel)]="rangeStep" min="1" size="3"></label>
                    </div>
                    <div class="range-items">
                        <span *appRange="let n; from: rangeFrom; to: rangeTo; step: rangeStep" 
                              class="range-item">
                            {{ n }}
                        </span>
                    </div>
                    <div class="code-block">
                        <pre>
&lt;span *appRange="let n; from: 1; to: 10; step: 2"&gt;
    {{ '{' }}{{ '{' }} n {{ '}' }}{{ '}' }}
&lt;/span&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 4: Microsyntax -->
                <section class="demo-section">
                    <h3>📖 Understanding Microsyntax</h3>
                    <div class="microsyntax-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Microsyntax</th>
                                    <th>Becomes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>*appFor="let x of items"</code></td>
                                    <td><code>[appForOf]="items"</code></td>
                                </tr>
                                <tr>
                                    <td><code>let i = index</code></td>
                                    <td>Context variable</td>
                                </tr>
                                <tr>
                                    <td><code>; from: 1; to: 5</code></td>
                                    <td><code>[appRangeFrom]="1" [appRangeTo]="5"</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .controls { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .controls label { display: flex; align-items: center; gap: 0.5rem; }
        .controls input { width: 60px; padding: 0.25rem; border: 1px solid #ccc; border-radius: 4px; }

        .repeat-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
        .repeat-item { padding: 0.5rem 1rem; background: #667eea; color: white; border-radius: 6px; }

        .let-demo { background: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; }

        .range-items { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
        .range-item { padding: 0.5rem 1rem; background: #4ade80; color: white; border-radius: 6px; font-weight: bold; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .microsyntax-table table { width: 100%; border-collapse: collapse; }
        .microsyntax-table th, .microsyntax-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        .microsyntax-table th { background: white; }
        .microsyntax-table code { background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; }
    `]
})
export class CustomStructuralComponent {
    repeatCount = 5;
    user = { name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    rangeFrom = 1;
    rangeTo = 10;
    rangeStep = 1;
}
