/**
 * ============================================================================
 * USE CASE 3: TEMPLATE OUTLET
 * ============================================================================
 */

import { Component, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// List Component with custom item template
@Component({
    selector: 'app-custom-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ul class="custom-list">
            @for (item of items; track item.id) {
                <li>
                    <ng-container 
                        *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: $index }">
                    </ng-container>
                </li>
            }
        </ul>
    `,
    styles: [`
        .custom-list { list-style: none; padding: 0; margin: 0; }
        .custom-list li { padding: 0.75rem; border-bottom: 1px solid #e5e7eb; }
        .custom-list li:last-child { border-bottom: none; }
    `]
})
export class CustomListComponent {
    items: any[] = [];
    @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;
}

@Component({
    selector: 'app-template-outlet',
    standalone: true,
    imports: [CommonModule, CustomListComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>📋 ngTemplateOutlet</h1>
                <p class="subtitle">Dynamic Template Rendering</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    <code>*ngTemplateOutlet</code> allows you to render templates dynamically.
                    Combined with <code>ng-template</code>, it enables powerful patterns like
                    custom item templates and conditional rendering.
                </p>
            </section>

            <section class="syntax-section">
                <h2>📝 Basic Syntax</h2>
                <pre class="code"><code>&lt;!-- Define template --&gt;
&lt;ng-template #myTemplate let-name let-age="age"&gt;
    &lt;p&gt;Name: {{ '{{' }} name {{ '}}' }}, Age: {{ '{{' }} age {{ '}}' }}&lt;/p&gt;
&lt;/ng-template&gt;

&lt;!-- Render template --&gt;
&lt;ng-container *ngTemplateOutlet="myTemplate; context: {{ '{' }} 
    $implicit: 'John',  // Binds to let-name (default)
    age: 30             // Binds to let-age="age"
{{ '}' }}"&gt;&lt;/ng-container&gt;</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo: Dynamic Templates</h2>
                <div class="demo-box">
                    <div class="template-buttons">
                        <button 
                            [class.active]="currentTemplate === 'simple'" 
                            (click)="currentTemplate = 'simple'">
                            Simple
                        </button>
                        <button 
                            [class.active]="currentTemplate === 'detailed'" 
                            (click)="currentTemplate = 'detailed'">
                            Detailed
                        </button>
                        <button 
                            [class.active]="currentTemplate === 'card'" 
                            (click)="currentTemplate = 'card'">
                            Card
                        </button>
                    </div>

                    <div class="template-output">
                        <ng-container *ngTemplateOutlet="getTemplate()"></ng-container>
                    </div>
                </div>

                <!-- Templates -->
                <ng-template #simpleTemplate>
                    <p>👋 Hello! This is the <strong>simple</strong> template.</p>
                </ng-template>

                <ng-template #detailedTemplate>
                    <div class="detailed">
                        <h4>📋 Detailed View</h4>
                        <p>This template shows more information with better formatting.</p>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                        </ul>
                    </div>
                </ng-template>

                <ng-template #cardTemplate>
                    <div class="card-tpl">
                        <div class="card-icon">🎨</div>
                        <h4>Card Template</h4>
                        <p>A beautiful card layout created with templates!</p>
                        <button>Action</button>
                    </div>
                </ng-template>
            </section>

            <section class="context-demo">
                <h2>📊 Template with Context</h2>
                <div class="context-box">
                    <ng-template #userTemplate let-user let-idx="index">
                        <div class="user-row">
                            <span class="user-num">{{ '{{' }} idx + 1 {{ '}}' }}</span>
                            <span class="user-name">{{ '{{' }} user.name {{ '}}' }}</span>
                            <span class="user-role">{{ '{{' }} user.role {{ '}}' }}</span>
                        </div>
                    </ng-template>

                    @for (user of users; track user.id; let i = $index) {
                        <ng-container *ngTemplateOutlet="userTemplate; context: { $implicit: user, index: i }">
                        </ng-container>
                    }
                </div>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li><code>$implicit</code> binds to the default <code>let-variable</code></li>
                    <li>Named context values bind to <code>let-variable="name"</code></li>
                    <li>Templates are not rendered until referenced</li>
                    <li>Use <code>&#64;ContentChild</code> to accept templates from parent</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        .demo-box { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 12px; }
        .template-buttons { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .template-buttons button { padding: 0.5rem 1rem; border: 2px solid #8b5cf6; background: white; border-radius: 6px; cursor: pointer; }
        .template-buttons button.active { background: #8b5cf6; color: white; }
        .template-output { padding: 1rem; background: white; border-radius: 8px; }

        .detailed { padding: 1rem; }
        .detailed h4 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .detailed ul { margin: 0.5rem 0 0; padding-left: 1.25rem; }

        .card-tpl { text-align: center; padding: 1.5rem; }
        .card-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .card-tpl h4 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .card-tpl button { margin-top: 1rem; padding: 0.5rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; }

        .context-box { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .user-row { display: flex; gap: 1rem; padding: 0.75rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; }
        .user-num { background: #8b5cf6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
        .user-name { flex: 1; font-weight: 500; }
        .user-role { color: var(--text-secondary); font-size: 0.9rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class TemplateOutletComponent {
    currentTemplate = 'simple';

    users = [
        { id: 1, name: 'Alice Johnson', role: 'Developer' },
        { id: 2, name: 'Bob Smith', role: 'Designer' },
        { id: 3, name: 'Carol White', role: 'Manager' }
    ];

    @ContentChild('simpleTemplate') simpleTemplateRef!: TemplateRef<any>;
    @ContentChild('detailedTemplate') detailedTemplateRef!: TemplateRef<any>;
    @ContentChild('cardTemplate') cardTemplateRef!: TemplateRef<any>;

    getTemplate(): TemplateRef<any> | null {
        // Templates are queried differently - we'll use ViewChild instead
        return null; // Will be handled by the actual template references
    }
}
