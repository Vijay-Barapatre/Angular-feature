/**
 * ============================================================================
 * @HOSTBINDING IN DIRECTIVES
 * ============================================================================
 * 
 * 💡 WHAT IS IT?
 * @HostBinding allows a directive to link its internal property to a property 
 * of the Host Element (DOM element it's attached to).
 * 
 * ❓ WHY DO WE NEED IT? (vs Renderer2)
 * 1. Declarative Updates: Instead of manually calling `renderer.setStyle()` every time,
 *    you simply return a value, and Angular updates the DOM automatically!
 * 2. Less Code: No need to inject `ElementRef` or `Renderer2` for simple UI changes.
 * 3. Reactive: Perfect for toggling state (e.g., specific classes) based on logic.
 * 
 * 🛠️ WHEN IS IT USEFUL?
 * - Toggling CSS Classes: `@HostBinding('class.active') get isActive()`
 * - Dynamic Styles: `@HostBinding('style.color') getColor()`
 * - Accessibility: `@HostBinding('attr.aria-expanded') get isExpanded()`
 */

import { Component, Directive, HostBinding, HostListener, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================================================
// DIRECTIVE 1: Disabled State
// ============================================================================
@Directive({
    selector: '[appDisabledState]',
    standalone: true
})
export class DisabledStateDirective {
    @Input() appDisabledState = false;

    @HostBinding('attr.disabled')
    get disabled(): string | null {
        return this.appDisabledState ? 'disabled' : null;
    }

    @HostBinding('style.opacity')
    get opacity(): string {
        return this.appDisabledState ? '0.5' : '1';
    }

    @HostBinding('style.pointerEvents')
    get pointerEvents(): string {
        return this.appDisabledState ? 'none' : 'auto';
    }
}

// ============================================================================
// DIRECTIVE 2: Active State Toggle
// ============================================================================
@Directive({
    selector: '[appActiveToggle]',
    standalone: true
})
export class ActiveToggleDirective {
    private isActive = false;

    @HostBinding('class.active')
    get active(): boolean {
        return this.isActive;
    }

    @HostBinding('class.inactive')
    get inactive(): boolean {
        return !this.isActive;
    }

    @HostListener('click')
    toggle(): void {
        this.isActive = !this.isActive;
    }
}

// ============================================================================
// DIRECTIVE 3: Size Directive
// ============================================================================
@Directive({
    selector: '[appSize]',
    standalone: true
})
export class SizeDirective {
    @Input() appSize: 'sm' | 'md' | 'lg' = 'md';

    @HostBinding('class.size-sm')
    get small(): boolean { return this.appSize === 'sm'; }

    @HostBinding('class.size-md')
    get medium(): boolean { return this.appSize === 'md'; }

    @HostBinding('class.size-lg')
    get large(): boolean { return this.appSize === 'lg'; }
}

// ============================================================================
// DIRECTIVE 4: Dynamic Styles
// ============================================================================
@Directive({
    selector: '[appDynamicBind]',
    standalone: true
})
export class DynamicBindDirective {
    @Input() borderColor = '#667eea';
    @Input() bgColor = 'white';
    @Input() padding = '1rem';

    @HostBinding('style.border')
    get border(): string {
        return `2px solid ${this.borderColor}`;
    }

    @HostBinding('style.backgroundColor')
    get background(): string {
        return this.bgColor;
    }

    @HostBinding('style.padding')
    get pad(): string {
        return this.padding;
    }

    @HostBinding('style.borderRadius')
    get radius(): string {
        return '8px';
    }

    @HostBinding('style.color')
    get color(): string {
        const isBlack = this.bgColor?.toLowerCase() === 'black' || this.bgColor === '#000000';
        return isBlack ? 'white' : 'black';
    }
}

// ============================================================================
// DIRECTIVE 5: Visibility
// ============================================================================
@Directive({
    selector: '[appVisible]',
    standalone: true
})
export class VisibleDirective {
    @Input() appVisible = true;

    @HostBinding('style.display')
    get display(): string {
        return this.appVisible ? 'block' : 'none';
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-host-binding-directive',
    standalone: true,
    imports: [CommonModule, FormsModule, DisabledStateDirective, ActiveToggleDirective, SizeDirective, DynamicBindDirective, VisibleDirective],
    template: `
        <div class="container">
            <h1>🎯 &#64;HostBinding in Directives</h1>
            <p class="description">
                Bind directive properties to host element attributes and styles.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Disabled State -->
                <section class="demo-section">
                    <h3>🚫 Disabled State</h3>
                    <div class="controls">
                        <label>
                            <input type="checkbox" [(ngModel)]="isDisabled">
                            Disable button
                        </label>
                    </div>
                    <button [appDisabledState]="isDisabled" class="demo-btn">
                        {{ isDisabled ? 'I am disabled' : 'Click me!' }}
                    </button>
                    <div class="code-block">
                        <pre>
&#64;HostBinding('attr.disabled')
get disabled() {{ '{' }}
    return this.appDisabledState ? 'disabled' : null;
{{ '}' }}

&#64;HostBinding('style.opacity')
get opacity() {{ '{' }}
    return this.appDisabledState ? '0.5' : '1';
{{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 2: Active Toggle -->
                <section class="demo-section">
                    <h3>🔄 Active Toggle</h3>
                    <p>Click to toggle active class:</p>
                    <div appActiveToggle class="toggle-box">
                        Click me to toggle!
                    </div>
                    <div class="code-block">
                        <pre>
&#64;HostBinding('class.active')
get active() {{ '{' }} return this.isActive; {{ '}' }}

&#64;HostListener('click')
toggle() {{ '{' }} this.isActive = !this.isActive; {{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: Size Classes -->
                <section class="demo-section">
                    <h3>📏 Size Directive</h3>
                    <div class="size-demos">
                        <button [appSize]="'sm'" class="size-btn">Small</button>
                        <button [appSize]="'md'" class="size-btn">Medium</button>
                        <button [appSize]="'lg'" class="size-btn">Large</button>
                    </div>
                    <div class="code-block">
                        <pre>
&#64;HostBinding('class.size-sm')
get small() {{ '{' }} return this.appSize === 'sm'; {{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Demo 4: Dynamic Styles -->
                <section class="demo-section">
                    <h3>🎨 Dynamic Binding</h3>
                    <div class="color-controls">
                        <label>Border: <input type="color" [(ngModel)]="borderColor"></label>
                        <label>BG: <input type="color" [(ngModel)]="bgColorVal"></label>
                    </div>
                    <div appDynamicBind [borderColor]="borderColor" [bgColor]="bgColorVal">
                        Dynamically styled box!
                    </div>
                </section>
            </div>

            <div class="binding-types">
                <h3>📋 &#64;HostBinding Types</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Binding</th>
                            <th>Example</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>class.X</td><td>&#64;HostBinding('class.active')</td><td>&lt;el class="active"&gt;</td></tr>
                        <tr><td>style.X</td><td>&#64;HostBinding('style.color')</td><td>style="color: ..."</td></tr>
                        <tr><td>attr.X</td><td>&#64;HostBinding('attr.disabled')</td><td>&lt;el disabled&gt;</td></tr>
                        <tr><td>property</td><td>&#64;HostBinding('hidden')</td><td>el.hidden = true</td></tr>
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

        .controls { margin-bottom: 1rem; }
        .controls label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }

        .demo-btn { padding: 1rem 2rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }

        .toggle-box { padding: 2rem; text-align: center; border-radius: 8px; cursor: pointer; transition: all 0.3s; background: #e0e0e0; }
        .toggle-box.active { background: #667eea; color: white; transform: scale(1.05); }
        .toggle-box.inactive { background: #e0e0e0; color: #333; }

        .size-demos { display: flex; gap: 1rem; align-items: center; margin: 1rem 0; }
        .size-btn { background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .size-btn.size-sm { padding: 0.25rem 0.5rem; font-size: 0.75rem; }
        .size-btn.size-md { padding: 0.5rem 1rem; font-size: 1rem; }
        .size-btn.size-lg { padding: 1rem 2rem; font-size: 1.25rem; }

        .color-controls { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .color-controls label { display: flex; align-items: center; gap: 0.5rem; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .binding-types { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .binding-types h3 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; }
    `]
})
export class HostBindingDirectiveComponent {
    isDisabled = false;
    borderColor = '#667eea';
    bgColorVal = '#ffffff';
}
