/**
 * ============================================================================
 * COMPONENTS & SERVICES IN LIBRARIES
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-components-services',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧩 Components & Services</h1>
                <p class="subtitle">Create Exportable Library Artifacts</p>
            </header>

            <section class="component-section">
                <h2>📦 Creating a Library Component</h2>
                <pre class="code terminal"><code># Generate component inside library
ng generate component button --project=my-ui-kit

# This creates:
# projects/my-ui-kit/src/lib/button/
#   ├── button.component.ts
#   ├── button.component.html
#   ├── button.component.css
#   └── button.component.spec.ts</code></pre>
            </section>

            <section class="standalone-section">
                <h2>✨ Standalone Component (Recommended)</h2>
                <pre class="code"><code>// projects/my-ui-kit/src/lib/button/button.component.ts
import {{ '{' }} Component, Input {{ '}' }} from '&#64;angular/core';
import {{ '{' }} CommonModule {{ '}' }} from '&#64;angular/common';

&#64;Component({{ '{' }}
    selector: 'ui-button',           // 🛡️ Use library prefix!
    standalone: true,
    imports: [CommonModule],
    template: &#96;
        &lt;button 
            [class]="'btn btn-' + variant"
            [disabled]="disabled"&gt;
            &lt;ng-content&gt;&lt;/ng-content&gt;
        &lt;/button&gt;
    &#96;,
    styles: [&#96;
        .btn {{ '{' }} padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; {{ '}' }}
        .btn-primary {{ '{' }} background: #667eea; color: white; {{ '}' }}
        .btn-secondary {{ '{' }} background: #e5e7eb; color: #374151; {{ '}' }}
    &#96;]
{{ '}' }})
export class ButtonComponent {{ '{' }}
    &#64;Input() variant: 'primary' | 'secondary' = 'primary';
    &#64;Input() disabled = false;
{{ '}' }}</code></pre>
            </section>

            <section class="service-section">
                <h2>⚙️ Creating a Library Service</h2>
                <pre class="code"><code>// projects/my-ui-kit/src/lib/notification.service.ts
import {{ '{' }} Injectable {{ '}' }} from '&#64;angular/core';

&#64;Injectable({{ '{' }}
    providedIn: 'root'  // 🛡️ Tree-shakable singleton
{{ '}' }})
export class NotificationService {{ '{' }}
    private notifications: string[] = [];

    show(message: string): void {{ '{' }}
        this.notifications.push(message);
        console.log('📢 Notification:', message);
    {{ '}' }}

    clear(): void {{ '{' }}
        this.notifications = [];
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="directive-section">
                <h2>⚡ Creating a Library Directive</h2>
                <pre class="code"><code>// projects/my-ui-kit/src/lib/highlight.directive.ts
import {{ '{' }} Directive, ElementRef, Input, OnInit {{ '}' }} from '&#64;angular/core';

&#64;Directive({{ '{' }}
    selector: '[uiHighlight]',  // 🛡️ Use library prefix!
    standalone: true
{{ '}' }})
export class HighlightDirective implements OnInit {{ '{' }}
    &#64;Input() uiHighlight = '#fef3c7';  // Default color

    constructor(private el: ElementRef) {{ '{' }}{{ '}' }}

    ngOnInit() {{ '{' }}
        this.el.nativeElement.style.backgroundColor = this.uiHighlight;
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="pipe-section">
                <h2>🔧 Creating a Library Pipe</h2>
                <pre class="code"><code>// projects/my-ui-kit/src/lib/truncate.pipe.ts
import {{ '{' }} Pipe, PipeTransform {{ '}' }} from '&#64;angular/core';

&#64;Pipe({{ '{' }}
    name: 'uiTruncate',  // 🛡️ Use library prefix!
    standalone: true
{{ '}' }})
export class TruncatePipe implements PipeTransform {{ '{' }}
    transform(value: string, limit = 50): string {{ '{' }}
        if (!value || value.length <= limit) return value;
        return value.substring(0, limit) + '...';
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="export-section">
                <h2>🔑 Exporting in public-api.ts</h2>
                <pre class="code"><code>// projects/my-ui-kit/src/public-api.ts

// 🛡️ CRITICAL: Export everything consumers need!

// Components
export * from './lib/button/button.component';
export * from './lib/card/card.component';
export * from './lib/modal/modal.component';

// Services
export * from './lib/notification.service';
export * from './lib/theme.service';

// Directives
export * from './lib/highlight.directive';
export * from './lib/tooltip.directive';

// Pipes
export * from './lib/truncate.pipe';
export * from './lib/format-currency.pipe';

// Models/Interfaces (for type exports)
export * from './lib/models/button.model';
export * from './lib/models/notification.model';</code></pre>
            </section>

            <section class="best-practices">
                <h2>✅ Best Practices</h2>
                <div class="practice-grid">
                    <div class="practice">
                        <span class="icon">🏷️</span>
                        <h4>Use Prefixes</h4>
                        <p><code>ui-button</code>, <code>[uiHighlight]</code>, <code>uiTruncate</code></p>
                    </div>
                    <div class="practice">
                        <span class="icon">🧱</span>
                        <h4>Standalone First</h4>
                        <p>Use <code>standalone: true</code> for easier consumption</p>
                    </div>
                    <div class="practice">
                        <span class="icon">🌲</span>
                        <h4>Tree-shakable Services</h4>
                        <p>Use <code>providedIn: 'root'</code></p>
                    </div>
                    <div class="practice">
                        <span class="icon">📝</span>
                        <h4>Export Types</h4>
                        <p>Export interfaces and types for consumers</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        section { margin-bottom: 2rem; }

        .practice-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .practice { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; }
        .practice .icon { font-size: 1.5rem; }
        .practice h4 { margin: 0.5rem 0 0.25rem; }
        .practice p { margin: 0; font-size: 0.85rem; color: var(--text-secondary); }
        .practice code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.75rem; }
    `]
})
export class ComponentsServicesComponent { }
