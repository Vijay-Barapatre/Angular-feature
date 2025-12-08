/**
 * ============================================================================
 * 🟦 EXERCISE 3: HOST BINDING
 * ============================================================================
 */

import { Component, Directive, HostBinding, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appTheme]',
    standalone: true
})
export class ThemeDirective {
    @Input() appTheme: 'light' | 'dark' = 'light';

    @HostBinding('class.theme-light')
    get isLight() { return this.appTheme === 'light'; }

    @HostBinding('class.theme-dark')
    get isDark() { return this.appTheme === 'dark'; }

    @HostBinding('style.backgroundColor')
    get bgColor() { return this.appTheme === 'dark' ? '#1e1e2e' : '#ffffff'; }

    @HostBinding('style.color')
    get textColor() { return this.appTheme === 'dark' ? '#ffffff' : '#1e1e2e'; }
}

@Component({
    selector: 'app-exercise-3-host-binding',
    standalone: true,
    imports: [CommonModule, ThemeDirective],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Host Binding</h2>
                <p>Use &#64;HostBinding to bind properties to the host element.</p>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="theme-toggle">
                    <button [class.active]="theme() === 'light'" (click)="theme.set('light')">☀️ Light</button>
                    <button [class.active]="theme() === 'dark'" (click)="theme.set('dark')">🌙 Dark</button>
                </div>

                <div [appTheme]="theme()" class="themed-box">
                    <h4>Themed Content</h4>
                    <p>This box changes based on the appTheme directive!</p>
                    <code>Current theme: {{ theme() }}</code>
                </div>

                <div class="code-preview">
                    <pre><code>&#64;HostBinding('style.backgroundColor')
get bgColor() {{ '{' }}
  return this.appTheme === 'dark' ? '#1e1e2e' : '#ffffff';
{{ '}' }}

&#64;HostBinding('class.theme-dark')
get isDark() {{ '{' }} return this.appTheme === 'dark'; {{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; }
        .instructions h2 { margin: 0 0 0.5rem; color: #f59e0b; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .theme-toggle { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .theme-toggle button { padding: 0.75rem 1.5rem; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; }
        .theme-toggle button.active { border-color: #f59e0b; background: #fffbeb; }
        .themed-box { padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; transition: all 0.3s; }
        .themed-box h4 { margin: 0 0 0.5rem; }
        .themed-box p { margin: 0 0 0.5rem; opacity: 0.8; }
        .themed-box code { font-size: 0.85rem; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise3HostBindingComponent {
    theme = signal<'light' | 'dark'>('light');
}
