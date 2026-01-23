/**
 * ============================================================================
 * CUSTOM ATTRIBUTE DIRECTIVE
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Directives are the perfect home for @HostListener and @HostBinding!
 * Create reusable behaviors that can be applied to ANY element.
 */

import { Component, Directive, HostListener, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HIGHLIGHT DIRECTIVE
 * 
 * Usage: <div appHighlight [highlightColor]="'yellow'">...</div>
 * 
 * Highlights element on hover with configurable color.
 */
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input() highlightColor = '#fff176'; // Default yellow
    @Input() defaultColor = 'transparent';

    @HostBinding('style.backgroundColor')
    backgroundColor = this.defaultColor;

    @HostBinding('style.transition')
    transition = 'background-color 0.3s ease';

    @HostListener('mouseenter')
    onMouseEnter() {
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.backgroundColor = this.defaultColor;
    }
}

/**
 * TOOLTIP DIRECTIVE
 * 
 * Usage: <button appTooltip="Click me!">Button</button>
 * 
 * Shows tooltip on hover using data attribute and CSS.
 */
@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective {
    @Input('appTooltip') tooltipText = '';

    @HostBinding('attr.data-tooltip')
    get tooltip() { return this.tooltipText; }

    @HostBinding('class.has-tooltip')
    hasTooltip = true;

    @HostBinding('style.position')
    position = 'relative';

    @HostBinding('style.cursor')
    cursor = 'help';
}

/**
 * CLICK OUTSIDE DIRECTIVE
 * 
 * Detects clicks outside the element.
 */
@Directive({
    selector: '[appClickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
    @Input() clickOutsideEnabled = true;

    private isInside = false;

    @HostListener('click')
    onHostClick() {
        this.isInside = true;
    }

    @HostListener('document:click')
    onDocumentClick() {
        if (!this.isInside && this.clickOutsideEnabled) {
            console.log('Clicked outside!');
        }
        this.isInside = false;
    }
}

@Component({
    selector: 'app-custom-directive',
    standalone: true,
    imports: [CommonModule, HighlightDirective, TooltipDirective, ClickOutsideDirective],
    template: `
        <div class="container">
            <h1>🧩 Custom Attribute Directive</h1>
            <p class="description">
                Build reusable directives using &#64;HostListener and &#64;HostBinding.
            </p>

            <section class="demo-section">
                <h3>🌟 Highlight Directive</h3>
                <p>Hover over these items:</p>
                <div class="item-list">
                    <div class="item" appHighlight>Default Yellow</div>
                    <div class="item" appHighlight [highlightColor]="'#a7f3d0'">Green</div>
                    <div class="item" appHighlight [highlightColor]="'#fecdd3'">Pink</div>
                    <div class="item" appHighlight [highlightColor]="'#bfdbfe'">Blue</div>
                </div>
            </section>

            <section class="demo-section">
                <h3>💬 Tooltip Directive</h3>
                <p>Hover for tooltips:</p>
                <div class="button-group">
                    <button appTooltip="Save your changes">💾 Save</button>
                    <button appTooltip="Delete this item">🗑️ Delete</button>
                    <button appTooltip="Share with others">📤 Share</button>
                </div>
            </section>

            <section class="demo-section">
                <h3>🖱️ Click Outside Directive</h3>
                <p>Click inside the box, then outside (check console):</p>
                <div class="click-box" appClickOutside>
                    Click inside me, then click outside!
                </div>
            </section>

            <div class="code-ref">
                <h3>📝 Directive Code</h3>
                <pre>
&#64;Directive({{ '{' }}
    selector: '[appHighlight]',
    standalone: true
{{ '}' }})
export class HighlightDirective {{ '{' }}
    &#64;Input() highlightColor = '#fff176';

    &#64;HostBinding('style.backgroundColor')
    bgColor = 'transparent';

    &#64;HostListener('mouseenter')
    onEnter() {{ '{' }} this.bgColor = this.highlightColor; {{ '}' }}

    &#64;HostListener('mouseleave')
    onLeave() {{ '{' }} this.bgColor = 'transparent'; {{ '}' }}
{{ '}' }}
                </pre>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .item-list { display: flex; gap: 1rem; flex-wrap: wrap; }
        .item {
            padding: 1rem 1.5rem; border: 2px solid #e0e0e0;
            border-radius: 8px; cursor: pointer;
        }

        .button-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .button-group button {
            padding: 0.75rem 1.5rem; border: none;
            background: #667eea; color: white;
            border-radius: 8px; cursor: pointer;
            font-size: 1rem;
        }

        /* Tooltip CSS (works with directive) */
        .has-tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%; left: 50%;
            transform: translateX(-50%);
            background: #1a1a2e; color: white;
            padding: 0.5rem 1rem; border-radius: 6px;
            font-size: 0.85rem; white-space: nowrap;
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s;
        }
        .has-tooltip:hover::after { opacity: 1; }

        .click-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 2rem;
            border-radius: 12px; text-align: center;
        }

        .code-ref { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-ref h3 { color: white; margin-top: 0; }
        .code-ref pre { color: #4ade80; margin: 0; overflow-x: auto; font-size: 0.85rem; }
    `]
})
export class CustomDirectiveComponent { }
