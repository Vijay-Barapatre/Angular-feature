/**
 * ============================================================================
 * DIRECTIVE COMPOSITION
 * ============================================================================
 * 
 * 💡 COMBINING DIRECTIVES FOR REUSABILITY
 * Angular 15+ introduced hostDirectives for composing directives.
 */

import { Component, Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// BASE DIRECTIVE 1: Hoverable
// ============================================================================
@Directive({
    selector: '[appHoverable]',
    standalone: true
})
export class HoverableDirective {
    @HostBinding('class.hovered') isHovered = false;

    @HostListener('mouseenter')
    onEnter(): void { this.isHovered = true; }

    @HostListener('mouseleave')
    onLeave(): void { this.isHovered = false; }
}

// ============================================================================
// BASE DIRECTIVE 2: Focusable
// ============================================================================
@Directive({
    selector: '[appFocusable]',
    standalone: true
})
export class FocusableDirective {
    private el = inject(ElementRef);
    @HostBinding('class.focused') isFocused = false;

    @HostListener('focus')
    onFocus(): void { this.isFocused = true; }

    @HostListener('blur')
    onBlur(): void { this.isFocused = false; }
}

// ============================================================================
// BASE DIRECTIVE 3: Ripple Effect
// ============================================================================
@Directive({
    selector: '[appRipple]',
    standalone: true
})
export class RippleDirective {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        const ripple = this.renderer.createElement('span');
        const rect = this.el.nativeElement.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.renderer.setStyle(ripple, 'position', 'absolute');
        this.renderer.setStyle(ripple, 'left', `${x}px`);
        this.renderer.setStyle(ripple, 'top', `${y}px`);
        this.renderer.setStyle(ripple, 'width', '10px');
        this.renderer.setStyle(ripple, 'height', '10px');
        this.renderer.setStyle(ripple, 'background', 'rgba(255,255,255,0.5)');
        this.renderer.setStyle(ripple, 'borderRadius', '50%');
        this.renderer.setStyle(ripple, 'transform', 'translate(-50%, -50%) scale(0)');
        this.renderer.setStyle(ripple, 'animation', 'ripple 0.6s linear');
        this.renderer.setStyle(ripple, 'pointerEvents', 'none');

        this.renderer.appendChild(this.el.nativeElement, ripple);
        setTimeout(() => this.renderer.removeChild(this.el.nativeElement, ripple), 600);
    }
}

// ============================================================================
// COMPOSED DIRECTIVE: Interactive Button (uses hostDirectives)
// ============================================================================
@Directive({
    selector: '[appInteractiveButton]',
    standalone: true,
    hostDirectives: [
        HoverableDirective,
        FocusableDirective,
        RippleDirective
    ]
})
export class InteractiveButtonDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    }
}

// ============================================================================
// COMPOSED DIRECTIVE: Card with all behaviors
// ============================================================================
@Directive({
    selector: '[appInteractiveCard]',
    standalone: true,
    hostDirectives: [HoverableDirective]
})
export class InteractiveCardDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.2s, box-shadow 0.2s');
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-directive-composition',
    standalone: true,
    imports: [CommonModule, HoverableDirective, FocusableDirective, RippleDirective, InteractiveButtonDirective, InteractiveCardDirective],
    template: `
        <div class="container">
            <h1>🧩 Directive Composition</h1>
            <p class="description">
                Combine multiple directives for reusable behavior patterns.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Individual Directives -->
                <section class="demo-section">
                    <h3>📦 Individual Directives</h3>
                    <p>Apply multiple directives separately:</p>
                    <button appHoverable appFocusable appRipple class="multi-directive-btn">
                        Has 3 directives applied
                    </button>
                    <div class="code-block">
                        <pre>
&lt;button appHoverable
        appFocusable
        appRipple&gt;
    Button
&lt;/button&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 2: Composed Directive -->
                <section class="demo-section">
                    <h3>🔗 Composed Directive (hostDirectives)</h3>
                    <p>One directive that includes all behaviors:</p>
                    <button appInteractiveButton class="composed-btn">
                        Single composed directive!
                    </button>
                    <div class="code-block">
                        <pre>
&#64;Directive({{ '{' }}
    selector: '[appInteractiveButton]',
    hostDirectives: [
        HoverableDirective,
        FocusableDirective,
        RippleDirective
    ]
{{ '}' }})
export class InteractiveButtonDirective {{ '{' }}{{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: Interactive Cards -->
                <section class="demo-section full-width">
                    <h3>🃏 Interactive Cards</h3>
                    <div class="cards-grid">
                        @for (card of cards; track card.id) {
                            <div appInteractiveCard class="card">
                                <span class="card-icon">{{ card.icon }}</span>
                                <h4>{{ card.title }}</h4>
                                <p>{{ card.desc }}</p>
                            </div>
                        }
                    </div>
                </section>
            </div>

            <div class="benefits">
                <h3>✅ Benefits of Directive Composition</h3>
                <ul>
                    <li><strong>DRY</strong> - Don't repeat directive combinations</li>
                    <li><strong>Encapsulation</strong> - Hide implementation details</li>
                    <li><strong>Testable</strong> - Test individual behaviors</li>
                    <li><strong>Flexible</strong> - Expose inputs/outputs as needed</li>
                </ul>
            </div>
        </div>

        <style>
            &#64;keyframes ripple {{ '{' }}
                to {{ '{' }}
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                {{ '}' }}
            {{ '}' }}
        </style>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section.full-width { grid-column: 1 / -1; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .multi-directive-btn, .composed-btn {
            padding: 1rem 2rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .multi-directive-btn:hover, .composed-btn:hover,
        .multi-directive-btn.hovered, .composed-btn.hovered {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .multi-directive-btn:focus, .composed-btn:focus,
        .multi-directive-btn.focused, .composed-btn.focused {
            outline: 3px solid #4ade80;
            outline-offset: 2px;
        }

        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .card.hovered {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .card-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .card h4 { margin: 0; color: #1a1a2e; }
        .card p { margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .benefits { background: #f0fdf4; padding: 1.5rem; border-radius: 12px; border: 2px solid #4ade80; }
        .benefits h3 { margin-top: 0; color: #166534; }
        .benefits ul { margin: 0; padding-left: 1.5rem; }
        .benefits li { margin-bottom: 0.5rem; }
    `]
})
export class DirectiveCompositionComponent {
    cards = [
        { id: 1, icon: '🚀', title: 'Fast', desc: 'Blazing speed' },
        { id: 2, icon: '🔒', title: 'Secure', desc: 'Built-in security' },
        { id: 3, icon: '📱', title: 'Responsive', desc: 'Works everywhere' },
        { id: 4, icon: '⚡', title: 'Modern', desc: 'Latest features' }
    ];
}
