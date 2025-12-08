/**
 * ============================================================================
 * USE CASE 5: REAL-WORLD PATTERNS
 * ============================================================================
 */

import { Component, ContentChildren, QueryList, AfterContentInit, Input, ContentChild, TemplateRef, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';

// Tab Directive to mark tabs
@Directive({
    selector: 'app-tab',
    standalone: true
})
export class TabDirective {
    @Input() title = '';
    @ContentChild(TemplateRef) template!: TemplateRef<any>;
}

// Tab Container Component
@Component({
    selector: 'app-tab-container',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="tabs">
            <div class="tab-headers">
                @for (tab of tabsList; track tab.title) {
                    <button 
                        class="tab-header"
                        [class.active]="activeIndex === $index"
                        (click)="activeIndex = $index">
                        {{ tab.title }}
                    </button>
                }
            </div>
            <div class="tab-content">
                @if (activeTab && activeTab.template) {
                    <ng-container [ngTemplateOutlet]="activeTab.template">
                    </ng-container>
                }
            </div>
        </div>
    `,
    styles: [`
        .tabs { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .tab-headers { display: flex; background: #f8f9fa; border-bottom: 1px solid #e5e7eb; }
        .tab-header { flex: 1; padding: 0.75rem 1rem; border: none; background: transparent; cursor: pointer; font-weight: 500; }
        .tab-header:hover { background: #e5e7eb; }
        .tab-header.active { background: white; color: #8b5cf6; border-bottom: 2px solid #8b5cf6; }
        .tab-content { padding: 1.5rem; background: white; }
    `]
})
export class TabContainerComponent implements AfterContentInit {
    @ContentChildren(TabDirective) tabs!: QueryList<TabDirective>;
    activeIndex = 0;
    tabsList: TabDirective[] = [];

    ngAfterContentInit() {
        this.tabsList = this.tabs.toArray();
        this.tabs.changes.subscribe(() => {
            this.tabsList = this.tabs.toArray();
        });
    }

    get activeTab(): TabDirective | undefined {
        return this.tabsList[this.activeIndex];
    }
}

// Modal Component
@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isOpen) {
            <div class="modal-overlay" (click)="close()">
                <div class="modal-content" (click)="$event.stopPropagation()">
                    <div class="modal-header">
                        <ng-content select="[modal-header]"></ng-content>
                        <button class="close-btn" (click)="close()">×</button>
                    </div>
                    <div class="modal-body">
                        <ng-content select="[modal-body]"></ng-content>
                    </div>
                    <div class="modal-footer">
                        <ng-content select="[modal-footer]"></ng-content>
                    </div>
                </div>
            </div>
        }
    `,
    styles: [`
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; border-radius: 12px; width: 90%; max-width: 500px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
        .modal-header { padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
        .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666; }
        .modal-body { padding: 1.5rem; }
        .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; display: flex; gap: 0.5rem; justify-content: flex-end; }
    `]
})
export class ModalComponent {
    @Input() isOpen = false;
    close() { this.isOpen = false; }
}

@Component({
    selector: 'app-real-world-patterns',
    standalone: true,
    imports: [CommonModule, TabContainerComponent, TabDirective, ModalComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🏗️ Real-World Patterns</h1>
                <p class="subtitle">Card, Modal & Tabs Components</p>
            </header>

            <section class="pattern-section">
                <h2>📑 Tab Component</h2>
                <app-tab-container>
                    <app-tab title="Overview">
                        <ng-template>
                            <h3>Welcome to Overview</h3>
                            <p>This is the overview tab content. Content projection makes tabs beautiful!</p>
                        </ng-template>
                    </app-tab>
                    <app-tab title="Features">
                        <ng-template>
                            <h3>Amazing Features</h3>
                            <ul>
                                <li>Feature 1: Content Projection</li>
                                <li>Feature 2: Multi-slot Support</li>
                                <li>Feature 3: Template Outlets</li>
                            </ul>
                        </ng-template>
                    </app-tab>
                    <app-tab title="Settings">
                        <ng-template>
                            <h3>Settings Panel</h3>
                            <p>Configure your preferences here.</p>
                            <button>Save Settings</button>
                        </ng-template>
                    </app-tab>
                </app-tab-container>
            </section>

            <section class="pattern-section">
                <h2>🪟 Modal Component</h2>
                <button class="open-modal-btn" (click)="modalOpen = true">
                    Open Modal
                </button>

                <app-modal [isOpen]="modalOpen">
                    <h3 modal-header>🎉 Welcome Modal</h3>
                    <div modal-body>
                        <p>This modal uses content projection for header, body, and footer!</p>
                        <p>All content is fully customizable by the parent component.</p>
                    </div>
                    <div modal-footer>
                        <button (click)="modalOpen = false" class="btn-secondary">Cancel</button>
                        <button (click)="modalOpen = false" class="btn-primary">Confirm</button>
                    </div>
                </app-modal>
            </section>

            <section class="code-section">
                <h2>💻 Tab Component Pattern</h2>
                <pre class="code"><code>// TabDirective
&#64;Directive({{ '{' }} selector: 'app-tab' {{ '}' }})
export class TabDirective {{ '{' }}
    &#64;Input() title = '';
    &#64;ContentChild(TemplateRef) template!: TemplateRef&lt;any&gt;;
{{ '}' }}

// TabContainerComponent
&#64;Component({{ '{' }}...{{ '}' }})
export class TabContainerComponent {{ '{' }}
    &#64;ContentChildren(TabDirective) tabs!: QueryList&lt;TabDirective&gt;;
    activeIndex = 0;
{{ '}' }}

// Usage
&lt;app-tab-container&gt;
    &lt;app-tab title="Tab 1"&gt;
        &lt;ng-template&gt;Content 1&lt;/ng-template&gt;
    &lt;/app-tab&gt;
    &lt;app-tab title="Tab 2"&gt;
        &lt;ng-template&gt;Content 2&lt;/ng-template&gt;
    &lt;/app-tab&gt;
&lt;/app-tab-container&gt;</code></pre>
            </section>

            <section class="key-points">
                <h2>💡 Patterns Summary</h2>
                <table>
                    <tr><th>Pattern</th><th>Technique</th><th>Use Case</th></tr>
                    <tr><td>Tabs</td><td>&#64;ContentChildren + ng-template</td><td>Tab interfaces</td></tr>
                    <tr><td>Modal</td><td>Multi-slot projection</td><td>Dialog windows</td></tr>
                    <tr><td>Card</td><td>select attribute</td><td>Content layouts</td></tr>
                    <tr><td>Accordion</td><td>Conditional projection</td><td>Expandable sections</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section, .pattern-section { margin-bottom: 2rem; }

        .open-modal-btn { padding: 0.75rem 1.5rem; background: #8b5cf6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }

        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; }
        .btn-primary { padding: 0.5rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class RealWorldPatternsComponent {
    modalOpen = false;
}
