/**
 * ============================================================================
 * @HostBinding BASICS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * @HostBinding binds a CLASS PROPERTY to a HOST ELEMENT property.
 * When the property changes, the host element updates automatically!
 * 
 * WHAT CAN YOU BIND?
 * - 'class.className'   → Add/remove CSS class
 * - 'style.property'    → Set inline style
 * - 'attr.attribute'    → Set HTML attribute
 * - 'property'          → Set DOM property (like 'disabled')
 */

import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-host-binding',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <h1>🎨 &#64;HostBinding Basics</h1>
            <p class="description">
                Dynamically control host element classes, styles, and attributes.
            </p>

            <div class="controls">
                <h3>🎛️ Controls</h3>
                
                <div class="control-group">
                    <label>Theme:</label>
                    <button (click)="toggleDarkMode()" [class.active]="isDarkMode">
                        {{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}
                    </button>
                </div>

                <div class="control-group">
                    <label>Border Color:</label>
                    <input type="color" [(ngModel)]="borderColor">
                </div>

                <div class="control-group">
                    <label>Font Size:</label>
                    <input type="range" min="12" max="24" [(ngModel)]="fontSize">
                    <span>{{ fontSize }}px</span>
                </div>

                <div class="control-group">
                    <label>Disabled:</label>
                    <button (click)="toggleDisabled()">
                        {{ isDisabled ? '🔒 Disabled' : '🔓 Enabled' }}
                    </button>
                </div>
            </div>

            <div class="current-state">
                <h3>📊 Current Bindings</h3>
                <ul>
                    <li><code>class.dark-mode</code>: {{ isDarkMode }}</li>
                    <li><code>style.borderColor</code>: {{ borderColor }}</li>
                    <li><code>style.fontSize.px</code>: {{ fontSize }}</li>
                    <li><code>attr.aria-disabled</code>: {{ isDisabled }}</li>
                </ul>
            </div>

            <div class="code-ref">
                <pre>
// Class binding
&#64;HostBinding('class.dark-mode')
isDarkMode = false;

// Style binding
&#64;HostBinding('style.borderColor')
borderColor = '#667eea';

// Style with unit
&#64;HostBinding('style.fontSize.px')
fontSize = 16;

// Attribute binding
&#64;HostBinding('attr.aria-disabled')
get ariaDisabled() {{ '{' }} return this.isDisabled; {{ '}' }}
                </pre>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            padding: 2rem;
            border: 3px solid #667eea;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        :host.dark-mode {
            background: #1a1a2e;
            color: #f0f0f0;
        }

        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: inherit; margin-bottom: 0.5rem; }
        .description { color: #888; margin-bottom: 2rem; }

        .controls { background: rgba(102,126,234,0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .controls h3 { margin-top: 0; }
        .control-group { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .control-group label { min-width: 120px; font-weight: 600; }
        .control-group button {
            padding: 0.5rem 1rem; border: 2px solid #667eea;
            background: white; border-radius: 6px; cursor: pointer;
        }
        .control-group button.active { background: #667eea; color: white; }
        .control-group input[type="color"] { width: 50px; height: 35px; border: none; cursor: pointer; }
        .control-group input[type="range"] { flex: 1; max-width: 200px; }

        .current-state { background: rgba(0,0,0,0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .current-state h3 { margin-top: 0; }
        .current-state code { background: #667eea; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; }

        .code-ref { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-ref pre { color: #4ade80; margin: 0; overflow-x: auto; font-size: 0.85rem; }
    `]
})
export class HostBindingComponent {
    /**
     * CLASS BINDING
     * When isDarkMode is true, the host element gets class="dark-mode"
     */
    @HostBinding('class.dark-mode')
    isDarkMode = false;

    /**
     * STYLE BINDING - Direct property
     */
    @HostBinding('style.borderColor')
    borderColor = '#667eea';

    /**
     * STYLE BINDING - With unit
     * The .px suffix automatically appends 'px' to the value.
     */
    @HostBinding('style.fontSize.px')
    fontSize = 16;

    /**
     * ATTRIBUTE BINDING
     * Must use getter if derived from another property.
     */
    isDisabled = false;

    @HostBinding('attr.aria-disabled')
    get ariaDisabled() {
        return this.isDisabled ? 'true' : null; // null removes attribute
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }
}
