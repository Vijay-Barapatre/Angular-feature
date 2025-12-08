/**
 * ============================================================================
 * USE CASE 5: STRUCTURAL DIRECTIVE BASICS
 * ============================================================================
 * 
 * 💡 WHAT ARE STRUCTURAL DIRECTIVES?
 * Directives that change the DOM structure by adding/removing elements.
 * Use the * prefix: *ngIf, *ngFor, *ngSwitch
 * 
 * KEY CONCEPTS:
 * - TemplateRef - Reference to the template
 * - ViewContainerRef - Container to insert/remove views
 * - EmbeddedViewRef - The instantiated template view
 */

import { Component, Directive, Input, TemplateRef, ViewContainerRef, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================================================
// DIRECTIVE 1: Custom *appIf (like *ngIf)
// ============================================================================
@Directive({
    selector: '[appIf]',
    standalone: true
})
export class AppIfDirective implements OnChanges {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);
    private hasView = false;

    @Input() appIf = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appIf']) {
            this.updateView();
        }
    }

    private updateView(): void {
        if (this.appIf && !this.hasView) {
            // Condition true: create the view
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!this.appIf && this.hasView) {
            // Condition false: remove the view
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}

// ============================================================================
// DIRECTIVE 2: Custom *appUnless (opposite of *ngIf)
// ============================================================================
@Directive({
    selector: '[appUnless]',
    standalone: true
})
export class AppUnlessDirective implements OnChanges {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);
    private hasView = false;

    @Input() appUnless = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appUnless']) {
            if (!this.appUnless && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            } else if (this.appUnless && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        }
    }
}

// ============================================================================
// DIRECTIVE 3: Custom *appFor (like *ngFor)
// ============================================================================
@Directive({
    selector: '[appFor]',
    standalone: true
})
export class AppForDirective implements OnChanges {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);

    @Input() appForOf: any[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appForOf']) {
            // Clear existing views
            this.viewContainer.clear();

            // Create view for each item
            this.appForOf?.forEach((item, index) => {
                this.viewContainer.createEmbeddedView(this.templateRef, {
                    $implicit: item,    // The item itself (let item)
                    index: index,       // Current index
                    first: index === 0,
                    last: index === this.appForOf.length - 1,
                    even: index % 2 === 0,
                    odd: index % 2 !== 0
                });
            });
        }
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-structural-basics',
    standalone: true,
    imports: [CommonModule, FormsModule, AppIfDirective, AppUnlessDirective, AppForDirective],
    template: `
        <div class="container">
            <h1>🔧 Use Case 5: Structural Directive Basics</h1>
            <p class="description">
                Understand how structural directives work internally.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: *appIf -->
                <section class="demo-section">
                    <h3>🔀 *appIf - Custom ngIf</h3>
                    <label class="switch">
                        <input type="checkbox" [(ngModel)]="showIf">
                        <span>Show content: {{ showIf }}</span>
                    </label>
                    <div *appIf="showIf" class="demo-box">
                        ✅ I appear when condition is TRUE!
                    </div>
                    <div class="code-block">
                        <pre>
&lt;div *appIf="condition"&gt;
    Shown when true
&lt;/div&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 2: *appUnless -->
                <section class="demo-section">
                    <h3>🔄 *appUnless - Opposite of ngIf</h3>
                    <label class="switch">
                        <input type="checkbox" [(ngModel)]="hideUnless">
                        <span>Hide content: {{ hideUnless }}</span>
                    </label>
                    <div *appUnless="hideUnless" class="demo-box warning">
                        ⚠️ I appear when condition is FALSE!
                    </div>
                    <div class="code-block">
                        <pre>
&lt;div *appUnless="isHidden"&gt;
    Shown when FALSE
&lt;/div&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: *appFor -->
                <section class="demo-section full-width">
                    <h3>🔁 *appFor - Custom ngFor</h3>
                    <div class="item-list">
                        <div *appFor="let item of items; let i = index; let isFirst = first; let isLast = last; let isEven = even" 
                             class="list-item"
                             [class.first]="isFirst"
                             [class.last]="isLast"
                             [class.even]="isEven">
                            {{ i + 1 }}. {{ item }} 
                            @if (isFirst) { <span class="badge">First</span> }
                            @if (isLast) { <span class="badge">Last</span> }
                        </div>
                    </div>
                    <div class="code-block">
                        <pre>
&lt;div *appFor="let item of items; let i = index"&gt;
    {{ '{' }}{{ '{' }} i {{ '}' }}{{ '}' }}. {{ '{' }}{{ '{' }} item {{ '}' }}{{ '}' }}
&lt;/div&gt;
                        </pre>
                    </div>
                </section>
            </div>

            <div class="how-it-works">
                <h3>🔍 How Structural Directives Work</h3>
                <div class="flow">
                    <div class="step">
                        <div class="step-num">1</div>
                        <div class="step-content">
                            <h4>*appIf Syntax Sugar</h4>
                            <pre>&lt;div *appIf="show"&gt;...&lt;/div&gt;</pre>
                        </div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <div class="step-num">2</div>
                        <div class="step-content">
                            <h4>Desugared Form</h4>
                            <pre>
&lt;ng-template [appIf]="show"&gt;
    &lt;div&gt;...&lt;/div&gt;
&lt;/ng-template&gt;
                            </pre>
                        </div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <div class="step-num">3</div>
                        <div class="step-content">
                            <h4>Directive Creates View</h4>
                            <pre>viewContainer.createEmbeddedView(templateRef)</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section.full-width { grid-column: 1 / -1; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .switch { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; cursor: pointer; }
        .switch input { width: 20px; height: 20px; }

        .demo-box { padding: 1rem; background: #dcfce7; border-radius: 8px; text-align: center; margin: 1rem 0; }
        .demo-box.warning { background: #fef3c7; }

        .item-list { margin: 1rem 0; }
        .list-item { padding: 0.75rem 1rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .list-item.first { border-left: 4px solid #4ade80; }
        .list-item.last { border-left: 4px solid #ef4444; }
        .list-item.even { background: #f0f0f0; }
        .badge { background: #667eea; color: white; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .how-it-works { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .how-it-works h3 { margin-top: 0; }
        .flow { display: flex; align-items: center; gap: 1rem; overflow-x: auto; padding: 1rem 0; }
        .step { background: #f8f9fa; padding: 1rem; border-radius: 8px; min-width: 250px; }
        .step-num { background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 0.5rem; }
        .step-content h4 { margin: 0 0 0.5rem 0; color: #1a1a2e; font-size: 0.9rem; }
        .step-content pre { background: #1a1a2e; color: #4ade80; padding: 0.5rem; border-radius: 4px; font-size: 0.75rem; margin: 0; }
        .arrow { font-size: 1.5rem; color: #667eea; }
    `]
})
export class StructuralBasicsComponent {
    showIf = true;
    hideUnless = false;
    items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
}
