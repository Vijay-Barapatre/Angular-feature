/**
 * ============================================================================
 * STANDALONE DIRECTIVES & PIPES
 * ============================================================================
 */

import { Component, Directive, Pipe, PipeTransform, ElementRef, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Standalone Directive Example
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input() appHighlight = 'yellow';

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = this.appHighlight;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = '';
    }
}

// Standalone Pipe Example
@Pipe({
    name: 'reverse',
    standalone: true
})
export class ReversePipe implements PipeTransform {
    transform(value: string): string {
        return value.split('').reverse().join('');
    }
}

@Component({
    selector: 'app-standalone-directives',
    standalone: true,
    imports: [CommonModule, HighlightDirective, ReversePipe],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Standalone Directives & Pipes</h1>
                <p class="subtitle">Reusable utilities without NgModules</p>
            </header>

            <section class="demo-section">
                <h2>Live Demo</h2>
                <div class="demo-grid">
                    <div class="demo-card">
                        <h3>Standalone Directive</h3>
                        <p [appHighlight]="'#e0e7ff'" class="highlight-demo">
                            Hover over me! (Using appHighlight directive)
                        </p>
                    </div>
                    <div class="demo-card">
                        <h3>Standalone Pipe</h3>
                        <p class="pipe-demo">
                            "Hello World" → "{{ 'Hello World' | reverse }}"
                        </p>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Standalone Directive</h2>
                <pre class="code"><code>&#64;Directive({{ '{' }}
  selector: '[appHighlight]',
  standalone: true  // ← Standalone!
{{ '}' }})
export class HighlightDirective {{ '{' }}
  &#64;Input() appHighlight = 'yellow';
  // ...
{{ '}' }}</code></pre>
            </section>

            <section class="code-section">
                <h2>📝 Standalone Pipe</h2>
                <pre class="code"><code>&#64;Pipe({{ '{' }}
  name: 'reverse',
  standalone: true  // ← Standalone!
{{ '}' }})
export class ReversePipe implements PipeTransform {{ '{' }}
  transform(value: string): string {{ '{' }}
    return value.split('').reverse().join('');
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="usage-section">
                <h2>🔗 Usage in Components</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
  standalone: true,
  imports: [
    HighlightDirective,  // Import directive directly
    ReversePipe          // Import pipe directly
  ],
  template: \`
    &lt;p [appHighlight]="'yellow'"&gt;Highlighted!&lt;/p&gt;
    &lt;p&gt;{{ '{{ value | reverse }}' }}&lt;/p&gt;
  \`
{{ '}' }})</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-section { margin-bottom: 2rem; }
        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .demo-card { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; }
        .demo-card h3 { margin-top: 0; font-size: 1rem; }
        .highlight-demo { padding: 1rem; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .pipe-demo { background: #e0e7ff; padding: 1rem; border-radius: 8px; font-family: monospace; }

        .code {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
            font-size: 0.85rem;
        }
        .code-section { margin-bottom: 1.5rem; }
    `]
})
export class StandaloneDirectivesComponent { }
