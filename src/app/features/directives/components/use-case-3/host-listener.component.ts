/**
 * ============================================================================
 * USE CASE 3: @HOSTLISTENER IN DIRECTIVES
 * ============================================================================
 * 
 * 💡 RESPONDING TO HOST ELEMENT EVENTS
 * @HostListener listens to events on the directive's host element.
 * No need to manually add event listeners!
 */

import { Component, Directive, ElementRef, Renderer2, HostListener, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// DIRECTIVE 1: Click Counter
// ============================================================================
@Directive({
    selector: '[appClickCounter]',
    standalone: true
})
export class ClickCounterDirective {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    private clickCount = 0;
    @Output() countChanged = new EventEmitter<number>();

    @HostListener('click')
    onClick(): void {
        this.clickCount++;
        this.countChanged.emit(this.clickCount);
        this.renderer.setAttribute(this.el.nativeElement, 'data-clicks', String(this.clickCount));
    }
}

// ============================================================================
// DIRECTIVE 2: Hover Effect
// ============================================================================
@Directive({
    selector: '[appHoverEffect]',
    standalone: true
})
export class HoverEffectDirective {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input() hoverBg = '#667eea';
    @Input() hoverColor = 'white';
    @Input() hoverScale = '1.05';

    private originalBg = '';
    private originalColor = '';

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.originalBg = this.el.nativeElement.style.backgroundColor;
        this.originalColor = this.el.nativeElement.style.color;

        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.hoverBg);
        this.renderer.setStyle(this.el.nativeElement, 'color', this.hoverColor);
        this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.hoverScale})`);
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease');
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.originalBg || 'transparent');
        this.renderer.setStyle(this.el.nativeElement, 'color', this.originalColor || 'inherit');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    }
}

// ============================================================================
// DIRECTIVE 3: Keyboard Handler
// ============================================================================
@Directive({
    selector: '[appKeyHandler]',
    standalone: true
})
export class KeyHandlerDirective {
    @Output() keyPressed = new EventEmitter<string>();

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        this.keyPressed.emit(event.key);
    }

    @HostListener('keydown.enter')
    onEnter(): void {
        console.log('Enter pressed!');
    }

    @HostListener('keydown.escape')
    onEscape(): void {
        console.log('Escape pressed!');
    }
}

// ============================================================================
// DIRECTIVE 4: Outside Click Detector
// ============================================================================
@Directive({
    selector: '[appClickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
    private el = inject(ElementRef);

    @Output() clickOutside = new EventEmitter<void>();

    @HostListener('document:click', ['$event.target'])
    onClick(target: HTMLElement): void {
        const clickedInside = this.el.nativeElement.contains(target);
        if (!clickedInside) {
            this.clickOutside.emit();
        }
    }
}

// ============================================================================
// DIRECTIVE 5: Scroll Tracker
// ============================================================================
@Directive({
    selector: '[appScrollTracker]',
    standalone: true
})
export class ScrollTrackerDirective {
    @Output() scrollPosition = new EventEmitter<{ x: number; y: number }>();
    @Output() scrollDirection = new EventEmitter<'up' | 'down'>();

    private lastScrollY = 0;

    @HostListener('window:scroll')
    onScroll(): void {
        const currentY = window.scrollY;

        this.scrollPosition.emit({ x: window.scrollX, y: currentY });

        if (currentY > this.lastScrollY) {
            this.scrollDirection.emit('down');
        } else if (currentY < this.lastScrollY) {
            this.scrollDirection.emit('up');
        }

        this.lastScrollY = currentY;
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-host-listener-directive',
    standalone: true,
    imports: [CommonModule, ClickCounterDirective, HoverEffectDirective, KeyHandlerDirective, ClickOutsideDirective, ScrollTrackerDirective],
    template: `
        <div class="container" appScrollTracker (scrollPosition)="onScrollPos($event)">
            <h1>👂 Use Case 3: &#64;HostListener in Directives</h1>
            <p class="description">
                Listen to host element events declaratively.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Click Counter -->
                <section class="demo-section">
                    <h3>🖱️ Click Counter</h3>
                    <button appClickCounter (countChanged)="onCountChange($event)" class="click-btn">
                        Click me! ({{ clickCount }} clicks)
                    </button>
                    <div class="code-block">
                        <pre>
&#64;HostListener('click')
onClick() {{ '{' }}
    this.clickCount++;
{{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 2: Hover Effect -->
                <section class="demo-section">
                    <h3>✨ Hover Effect</h3>
                    <div class="hover-demos">
                        <div appHoverEffect class="hover-box">Default</div>
                        <div appHoverEffect hoverBg="#4ade80" class="hover-box">Green</div>
                        <div appHoverEffect hoverBg="#ef4444" hoverScale="1.1" class="hover-box">Red + Scale</div>
                    </div>
                    <div class="code-block">
                        <pre>
&#64;HostListener('mouseenter')
onMouseEnter() {{ '{' }} ... {{ '}' }}

&#64;HostListener('mouseleave')
onMouseLeave() {{ '{' }} ... {{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: Keyboard -->
                <section class="demo-section">
                    <h3>⌨️ Keyboard Handler</h3>
                    <input 
                        appKeyHandler 
                        (keyPressed)="onKeyPress($event)"
                        placeholder="Type here..."
                        class="key-input">
                    <div class="key-display">
                        Last key: <strong>{{ lastKey || 'None' }}</strong>
                    </div>
                    <div class="code-block">
                        <pre>
&#64;HostListener('keydown', ['$event'])
onKeyDown(event: KeyboardEvent) {{ '{' }}
    this.keyPressed.emit(event.key);
{{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 4: Click Outside -->
                <section class="demo-section">
                    <h3>👆 Click Outside</h3>
                    <div appClickOutside (clickOutside)="onClickOutside()" class="dropdown-demo" [class.open]="dropdownOpen">
                        <button (click)="dropdownOpen = true">Open Dropdown</button>
                        @if (dropdownOpen) {
                            <div class="dropdown-menu">
                                <div>Option 1</div>
                                <div>Option 2</div>
                                <div>Option 3</div>
                            </div>
                        }
                    </div>
                    <p class="hint">Click outside to close</p>
                </section>
            </div>

            <div class="event-types">
                <h3>📋 Common &#64;HostListener Events</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Example</th>
                            <th>Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>click</td><td>&#64;HostListener('click')</td><td>Click tracking</td></tr>
                        <tr><td>mouseenter/leave</td><td>&#64;HostListener('mouseenter')</td><td>Hover effects</td></tr>
                        <tr><td>keydown</td><td>&#64;HostListener('keydown.enter')</td><td>Keyboard shortcuts</td></tr>
                        <tr><td>document:click</td><td>&#64;HostListener('document:click')</td><td>Click outside</td></tr>
                        <tr><td>window:scroll</td><td>&#64;HostListener('window:scroll')</td><td>Scroll effects</td></tr>
                    </tbody>
                </table>
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

        .click-btn { padding: 1rem 2rem; font-size: 1.1rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; }

        .hover-demos { display: flex; gap: 1rem; margin: 1rem 0; }
        .hover-box { padding: 1rem 1.5rem; background: #e0e0e0; border-radius: 8px; cursor: pointer; text-align: center; }

        .key-input { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 1rem; }
        .key-display { margin-top: 1rem; padding: 0.5rem; background: white; border-radius: 6px; }

        .dropdown-demo { position: relative; display: inline-block; }
        .dropdown-demo button { padding: 0.75rem 1.5rem; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .dropdown-menu { position: absolute; top: 100%; left: 0; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-top: 0.5rem; min-width: 150px; z-index: 10; }
        .dropdown-menu div { padding: 0.75rem 1rem; cursor: pointer; }
        .dropdown-menu div:hover { background: #f8f9fa; }
        .hint { color: #888; font-size: 0.85rem; margin-top: 0.5rem; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .event-types { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .event-types h3 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; }
    `]
})
export class HostListenerDirectiveComponent {
    clickCount = 0;
    lastKey = '';
    dropdownOpen = false;
    scrollY = 0;

    onCountChange(count: number): void {
        this.clickCount = count;
    }

    onKeyPress(key: string): void {
        this.lastKey = key;
    }

    onClickOutside(): void {
        this.dropdownOpen = false;
    }

    onScrollPos(pos: { x: number; y: number }): void {
        this.scrollY = pos.y;
    }
}
