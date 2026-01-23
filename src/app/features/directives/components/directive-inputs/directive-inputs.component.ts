/**
 * ============================================================================
 * DIRECTIVE WITH @INPUT
 * ============================================================================
 * 
 * 💡 MAKING DIRECTIVES CONFIGURABLE
 * Use @Input to pass data from template to directive.
 * This makes directives reusable with different configurations.
 */

import { Component, Directive, ElementRef, Renderer2, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================================================
// DIRECTIVE 1: Dynamic Background Color
// ============================================================================
@Directive({
    selector: '[appBgColor]',
    standalone: true
})
export class BgColorDirective implements OnChanges {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input() appBgColor = '#667eea'; // Default purple

    /**
     * ngOnChanges
     * 
     * Executed every time an @Input() property changes.
     * 
     * @param changes - The SimpleChanges object containing current and previous values.
     *                Structure: { propertyName: SimpleChange { previousValue, currentValue, firstChange } }
     * 
     * 💡 WHY ngOnChanges INSTEAD OF ngOnInit?
     * ---------------------------------------
     * - ngOnInit: Runs ONCE (good for static initialization).
     * - ngOnChanges: Runs EVERY TIME an @Input() value changes.
     * 
     * Since 'appBgColor' can change dynamically (when user selects a color),
     * we MUST use ngOnChanges to update the DOM whenever the input value updates.
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appBgColor']) {
            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBgColor);

            // 🎨 Fix font color based on background
            // Rule: If background is NOT black, use black text.
            const isBlack = this.appBgColor?.toLowerCase() === 'black' || this.appBgColor === '#000000';
            const textColor = isBlack ? 'white' : 'black';

            this.renderer.setStyle(this.el.nativeElement, 'color', textColor);
            this.renderer.setStyle(this.el.nativeElement, 'padding', '0.5rem 1rem');
            this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '6px');
            this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
        }
    }
}

// ============================================================================
// DIRECTIVE 2: Dynamic Style Object
// ============================================================================
@Directive({
    selector: '[appDynamicStyle]',
    standalone: true
})
export class DynamicStyleDirective implements OnChanges {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input() appDynamicStyle: { [key: string]: string } = {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appDynamicStyle']) {
            Object.entries(this.appDynamicStyle).forEach(([property, value]) => {
                this.renderer.setStyle(this.el.nativeElement, property, value);
            });
        }
    }
}

// ============================================================================
// DIRECTIVE 3: Configurable Highlight
// ============================================================================
@Directive({
    selector: '[appConfigHighlight]',
    standalone: true
})
export class ConfigHighlightDirective implements OnChanges {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input() highlightColor = '#fef3c7';
    @Input() highlightPadding = '0.25rem 0.5rem';
    @Input() highlightRadius = '4px';

    ngOnChanges(changes: SimpleChanges): void {
        // ------------------------------------------------------------------
        // 🚀 PERFORMANCE OPTIMIZATION #1: SELECTIVE EXECUTION (The "If" Check)
        // ------------------------------------------------------------------
        // Instead of running ALL logic regardless of what changed, 
        // we use "if" statements to check WHICH specific input was updated.
        // If only 'highlightPadding' changes, we SKIP the color and radius logic entirely.

        // 1️⃣ Handle Color Changes
        if (changes['highlightColor']) {
            const change = changes['highlightColor'];

            // --------------------------------------------------------------
            // 🚀 PERFORMANCE OPTIMIZATION #2: AVOIDING REDUNDANT WORK
            // --------------------------------------------------------------
            // Compare previous vs current value. If the "meaning" hasn't changed
            // (e.g., 'RED' vs 'red'), skip the expensive DOM update.

            const prev = change.previousValue;   // e.g. 'RED'
            const curr = change.currentValue;    // e.g. 'red'

            // Avoid DOM update if values are effectively same (ignoring case)
            if (!change.firstChange && prev?.toLowerCase() === curr?.toLowerCase()) {
                console.log('Skipping DOM update: Color value is effectively same');
                return;
            }

            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor);
        }

        // 2️⃣ Handle Padding Changes
        if (changes['highlightPadding']) {
            // Only runs if padding actually changed
            this.renderer.setStyle(this.el.nativeElement, 'padding', this.highlightPadding);
        }

        // 3️⃣ Handle Radius Changes
        if (changes['highlightRadius']) {
            // Only runs if radius actually changed
            this.renderer.setStyle(this.el.nativeElement, 'borderRadius', this.highlightRadius);
        }
    }
}

// ============================================================================
// DIRECTIVE 4: Configurable Tooltip
// ============================================================================
@Directive({
    selector: '[appConfigTooltip]',
    standalone: true
})
export class ConfigTooltipDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private tooltipElement: HTMLElement | null = null;

    @Input() appConfigTooltip = 'Tooltip text'; // The tooltip text
    @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
    @Input() tooltipBg = '#1a1a2e';

    // 🕒 LIFECYCLE HOOK: ngOnInit
    // WHY HERE?
    // 1. Inputs Ready: 'tooltipPosition' and 'tooltipBg' are available.
    // 2. Setup Event Listeners: We bind mouseenter/mouseleave events.
    //    These don't require the DOM to be "painted", just the element reference.
    //
    // WHY NOT ngAfterViewInit?
    // - We're not accessing ViewChild or measuring pixel dimensions.
    // - Event binding works fine in ngOnInit.
    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'help');

        this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
        this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
    }

    private show(): void {
        this.tooltipElement = this.renderer.createElement('span');
        const text = this.renderer.createText(this.appConfigTooltip);
        this.renderer.appendChild(this.tooltipElement, text);

        this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
        this.renderer.setStyle(this.tooltipElement, 'backgroundColor', this.tooltipBg);

        // 🎨 Fix font color based on background
        const isBlack = this.tooltipBg?.toLowerCase() === 'black' || this.tooltipBg === '#000000';
        this.renderer.setStyle(this.tooltipElement, 'color', isBlack ? 'white' : 'black');

        this.renderer.setStyle(this.tooltipElement, 'padding', '0.25rem 0.5rem');
        this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
        this.renderer.setStyle(this.tooltipElement, 'fontSize', '0.8rem');
        this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
        this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');

        // Position based on input
        switch (this.tooltipPosition) {
            case 'top':
                this.renderer.setStyle(this.tooltipElement, 'top', '-30px');
                this.renderer.setStyle(this.tooltipElement, 'left', '0');
                break;
            case 'bottom':
                this.renderer.setStyle(this.tooltipElement, 'bottom', '-30px');
                this.renderer.setStyle(this.tooltipElement, 'left', '0');
                break;
            case 'left':
                this.renderer.setStyle(this.tooltipElement, 'top', '0');
                this.renderer.setStyle(this.tooltipElement, 'right', '100%');
                this.renderer.setStyle(this.tooltipElement, 'marginRight', '8px');
                break;
            case 'right':
                this.renderer.setStyle(this.tooltipElement, 'top', '0');
                this.renderer.setStyle(this.tooltipElement, 'left', '100%');
                this.renderer.setStyle(this.tooltipElement, 'marginLeft', '8px');
                break;
        }

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
// DIRECTIVE 5: Setter Pattern (Access Control)
// ============================================================================
@Directive({
    selector: '[appAccessControl]',
    standalone: true
})
export class AccessControlDirective {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    // 🚀 PATTERN: INPUT SETTER (The "Interceptor" Pattern)
    // ----------------------------------------------------
    // Instead of using ngOnChanges(), we can use a TypeScript setter.
    //
    // 🔍 HOW IT WORKS:
    // 1. Angular sees the @Input decorator.
    // 2. When the value changes in the template, Angular calls this function.
    // 3. We can run logic IMMEDIATELY without waiting for a lifecycle hook.
    //
    // 🆚 VS ngOnChanges:
    // - Setter: Best for independent inputs (logic depends only on THIS value).
    // - ngOnChanges: Best for interdependent inputs (logic depends on A and B).
    //
    // 💡 BENEFIT:
    // Cleaner code! We don't need to implement OnChanges interface or look 
    // through the SimpleChanges object.
    @Input() set appAccessControl(role: string) {
        if (role === 'ADMIN') {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#dcfce7'); // Green
            this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
            this.renderer.setStyle(this.el.nativeElement, 'padding', '1rem');
            this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '8px');
            this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
            this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #86efac');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-directive-inputs',
    standalone: true,
    imports: [CommonModule, FormsModule, BgColorDirective, DynamicStyleDirective, ConfigHighlightDirective, ConfigTooltipDirective, AccessControlDirective],
    template: `
        <div class="container">
            <h1>🎛️ Directive with &#64;Input</h1>
            <p class="description">
                Pass data to directives for dynamic, configurable behavior.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Dynamic Color -->
                <section class="demo-section">
                    <h3>🎨 appBgColor - Dynamic Color</h3>
                    <div class="color-picker">
                        <label>Choose color:</label>
                        <select [(ngModel)]="selectedColor">
                            <option value="#667eea">Purple</option>
                            <option value="#4ade80">Green</option>
                            <option value="#ef4444">Red</option>
                            <option value="#fbbf24">Yellow</option>
                        </select>
                    </div>
                    <p [appBgColor]="selectedColor">Colored by directive!</p>
                    <div class="code-block">
                        <pre>&lt;p [appBgColor]="selectedColor"&gt;Text&lt;/p&gt;</pre>
                    </div>
                </section>

                <!-- Demo 2: Style Object -->
                <section class="demo-section">
                    <h3>🎯 appDynamicStyle - Style Object</h3>
                    <div [appDynamicStyle]="customStyles" class="styled-box">
                        Multiple styles from object!
                    </div>
                    <div class="code-block">
                        <pre>
customStyles = {{ '{' }}
    backgroundColor: '#667eea',
    color: 'white',
    padding: '1rem',
    borderRadius: '8px'
{{ '}' }};

&lt;div [appDynamicStyle]="customStyles"&gt;...&lt;/div&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: Multiple Inputs -->
                <section class="demo-section">
                    <h3>⚙️ appConfigHighlight - Multiple Inputs</h3>
                    <div class="controls">
                        <label>Color: <input type="color" [(ngModel)]="hlColor"></label>
                        <label>Padding: <input type="text" [(ngModel)]="hlPadding" size="10"></label>
                    </div>
                    <p appConfigHighlight [highlightColor]="hlColor" [highlightPadding]="hlPadding">
                        Configurable highlight!
                    </p>
                    <div class="code-block">
                        <pre>
&lt;p appConfigHighlight
   [highlightColor]="'#fef3c7'"
   [highlightPadding]="'0.5rem 1rem'"&gt;
&lt;/p&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 4: Tooltip with Position -->
                <section class="demo-section">
                    <h3>💬 appConfigTooltip - Positioned Tooltip</h3>
                    <div class="tooltip-demos">
                        <span [appConfigTooltip]="'I am on top!'" tooltipPosition="top" class="tooltip-target">Top</span>
                        <span [appConfigTooltip]="'I am on bottom!'" tooltipPosition="bottom" class="tooltip-target">Bottom</span>
                        <span [appConfigTooltip]="'Left side'" tooltipPosition="left" class="tooltip-target">Left</span>
                        <span [appConfigTooltip]="'Right side'" tooltipPosition="right" class="tooltip-target">Right</span>
                    </div>
                    <div class="code-block">
                        <pre>
&lt;span [appConfigTooltip]="'Message'"
      tooltipPosition="top"&gt;
&lt;/span&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 5: Setter Pattern -->
                <section class="demo-section">
                    <h3>⚡ appAccessControl - Setter Pattern</h3>
                    <div class="controls">
                        <label>Current Role:</label>
                        <select [(ngModel)]="userRole">
                            <option value="GUEST">Guest</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    
                    <div *appAccessControl="userRole">
                        ✅ Secret Admin Panel (Visible only to ADMIN)
                    </div>
                    
                    <p class="hint" *ngIf="userRole !== 'ADMIN'">
                        (Switch to 'Admin' to see the secret element)
                    </p>

                    <div class="code-block">
                        <pre>
&lt;div *appAccessControl="userRole"&gt;
   Secret Content
&lt;/div&gt;

// Directive uses setter:
&#64;Input() set appAccessControl(role) {{ '{' }} ... {{ '}' }}
                        </pre>
                    </div>
                </section>
            </div>

            <div class="input-patterns">
                <h3>📝 &#64;Input Patterns</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Pattern</th>
                            <th>Usage</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Same name as selector</td>
                            <td><code>[appColor]="value"</code></td>
                            <td>Most common for single input</td>
                        </tr>
                        <tr>
                            <td>Separate input name</td>
                            <td><code>appDirective [color]="value"</code></td>
                            <td>When directive has multiple inputs</td>
                        </tr>
                        <tr>
                            <td>Object input</td>
                            <td><code>[appStyle]="styleObj"</code></td>
                            <td>Pass complex configuration</td>
                        </tr>
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

        .color-picker { margin-bottom: 1rem; }
        .color-picker select { padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; }

        .controls { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .controls label { display: flex; align-items: center; gap: 0.5rem; }
        .controls input[type="text"] { padding: 0.25rem; border: 1px solid #ccc; border-radius: 4px; }

        .styled-box { margin: 1rem 0; }

        .tooltip-demos { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0; }
        .tooltip-target { background: #667eea; color: white; padding: 0.5rem 1rem; border-radius: 6px; cursor: help; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; overflow-x: auto; }

        .input-patterns { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .input-patterns h3 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; }
        code { background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; }
    `]
})
export class DirectiveInputsComponent {
    selectedColor = '#667eea';
    customStyles = {
        backgroundColor: '#667eea',
        color: 'black',  // Updated to black since bg is not black
        padding: '1rem',
        borderRadius: '8px',
        display: 'inline-block'
    };
    hlColor = '#fef3c7';
    hlPadding = '0.5rem 1rem';
    userRole = 'GUEST';
}
