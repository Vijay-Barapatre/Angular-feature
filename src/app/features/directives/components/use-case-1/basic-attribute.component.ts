/**
 * ============================================================================
 * USE CASE 1: BASIC ATTRIBUTE DIRECTIVES
 * ============================================================================
 * 
 * 💡 WHAT IS AN ATTRIBUTE DIRECTIVE?
 * A directive that changes the appearance or behavior of an element.
 * Applied like an HTML attribute: <div appHighlight>
 * 
 * KEY CONCEPTS:
 * - @Directive decorator
 * - ElementRef - Reference to the host element
 * - Renderer2 - Safe way to modify DOM
 */

import { Component, Directive, ElementRef, Renderer2, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// DIRECTIVE 1: Simple Highlight
// ============================================================================
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        // 🛡️ CRITICAL: Use Renderer2 instead of direct DOM manipulation!
        // This ensures compatibility with server-side rendering and web workers.
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#fef3c7');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '0.25rem 0.5rem');
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
    }
}

// ============================================================================
// DIRECTIVE 2: Tooltip
// ============================================================================
@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private tooltipElement: HTMLElement | null = null;

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'help');

        this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
        this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
    }

    private show(): void {
        this.tooltipElement = this.renderer.createElement('span');
        const text = this.renderer.createText('This is a tooltip!');
        this.renderer.appendChild(this.tooltipElement, text);

        this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
        this.renderer.setStyle(this.tooltipElement, 'top', '-30px');
        this.renderer.setStyle(this.tooltipElement, 'left', '0');
        this.renderer.setStyle(this.tooltipElement, 'backgroundColor', '#1a1a2e');
        this.renderer.setStyle(this.tooltipElement, 'color', 'white');
        this.renderer.setStyle(this.tooltipElement, 'padding', '0.25rem 0.5rem');
        this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
        this.renderer.setStyle(this.tooltipElement, 'fontSize', '0.8rem');
        this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
        this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');

        this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    }

    private hide(): void {
        if (this.tooltipElement) {
            this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
            this.tooltipElement = null;
        }
    }
}

// ============================================================================
// DIRECTIVE 3: Text Transform
// ============================================================================
@Directive({
    selector: '[appUppercase]',
    standalone: true
})
export class UppercaseDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'textTransform', 'uppercase');
        this.renderer.setStyle(this.el.nativeElement, 'letterSpacing', '0.05em');
    }
}

// ============================================================================
// DIRECTIVE 4: Border Decorator
// ============================================================================
@Directive({
    selector: '[appBorder]',
    standalone: true
})
export class BorderDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #667eea');
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '8px');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '1rem');
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-basic-attribute',
    standalone: true,
    imports: [CommonModule, HighlightDirective, TooltipDirective, UppercaseDirective, BorderDirective],
    template: `
        <div class="container">
            <h1>🎨 Use Case 1: Basic Attribute Directives</h1>
            <p class="description">
                Simple directives that modify element appearance.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Highlight -->
                <section class="demo-section">
                    <h3>🌟 appHighlight Directive</h3>
                    <p>Apply a background highlight to text:</p>
                    <p>This is <span appHighlight>highlighted text</span> using a directive.</p>
                    <div class="code-block">
                        <pre>&lt;span appHighlight&gt;highlighted text&lt;/span&gt;</pre>
                    </div>
                </section>

                <!-- Demo 2: Tooltip -->
                <section class="demo-section">
                    <h3>💬 appTooltip Directive</h3>
                    <p>Hover over the element below:</p>
                    <p appTooltip class="tooltip-demo">Hover me for tooltip!</p>
                    <div class="code-block">
                        <pre>&lt;p appTooltip&gt;Hover me&lt;/p&gt;</pre>
                    </div>
                </section>

                <!-- Demo 3: Uppercase -->
                <section class="demo-section">
                    <h3>🔠 appUppercase Directive</h3>
                    <p>Transform text to uppercase:</p>
                    <p appUppercase>this text is uppercased by directive</p>
                    <div class="code-block">
                        <pre>&lt;p appUppercase&gt;text&lt;/p&gt;</pre>
                    </div>
                </section>

                <!-- Demo 4: Border -->
                <section class="demo-section">
                    <h3>📦 appBorder Directive</h3>
                    <p>Add decorative border:</p>
                    <div appBorder>
                        This content has a border applied by directive.
                    </div>
                    <div class="code-block">
                        <pre>&lt;div appBorder&gt;content&lt;/div&gt;</pre>
                    </div>
                </section>
            </div>

            <div class="key-concepts">
                <h3>🔑 Key Concepts</h3>
                <div class="concept-grid">
                    <div class="concept">
                        <h4>&#64;Directive</h4>
                        <p>Decorator that marks a class as a directive</p>
                    </div>
                    <div class="concept">
                        <h4>ElementRef</h4>
                        <p>Reference to the host DOM element</p>
                    </div>
                    <div class="concept">
                        <h4>Renderer2</h4>
                        <p>Safe, platform-agnostic DOM manipulation</p>
                    </div>
                    <div class="concept">
                        <h4>Selector</h4>
                        <p>[appName] - Applied as attribute</p>
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
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .tooltip-demo { display: inline-block; background: #667eea; color: white; padding: 0.5rem 1rem; border-radius: 6px; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.85rem; }

        .key-concepts { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .key-concepts h3 { margin-top: 0; }
        .concept-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .concept { background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center; }
        .concept h4 { margin: 0 0 0.5rem 0; color: #667eea; font-size: 0.9rem; }
        .concept p { margin: 0; color: #666; font-size: 0.8rem; }
    `]
})
export class BasicAttributeComponent { }
