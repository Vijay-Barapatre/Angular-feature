/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: THEME SWITCHER
 * ============================================================================
 */

import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

type Theme = 'light' | 'dark' | 'system';

@Component({
    selector: 'app-scenario-3-theme',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario" [class]="effectiveTheme()">
            <div class="instructions">
                <h2>🟥 Scenario 3: Theme Switcher</h2>
                <p>Global app state with signals and localStorage persistence.</p>
            </div>

            <div class="demo-area">
                <div class="theme-selector">
                    <h3>🎨 Select Theme</h3>
                    <div class="theme-buttons">
                        @for (t of themes; track t) {
                            <button 
                                [class.active]="theme() === t"
                                (click)="theme.set(t)">
                                {{ getThemeIcon(t) }} {{ t | titlecase }}
                            </button>
                        }
                    </div>
                </div>

                <div class="preview-card">
                    <h4>Preview Card</h4>
                    <p>This card changes based on the selected theme.</p>
                    <p class="theme-info">Current: {{ effectiveTheme() | titlecase }}</p>
                </div>

                <div class="color-palette">
                    <h4>Color Palette</h4>
                    <div class="colors">
                        <div class="color bg-primary">Primary</div>
                        <div class="color bg-secondary">Secondary</div>
                        <div class="color bg-accent">Accent</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; padding: 1rem; border-radius: 12px; transition: all 0.3s; }
        .scenario.light { background: #ffffff; color: #1e293b; }
        .scenario.dark { background: #1e293b; color: #f1f5f9; }
        
        .instructions { padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .light .instructions { background: #f0fdf4; border-left: 4px solid #8b5cf6; }
        .dark .instructions { background: #1e1e2e; border-left: 4px solid #8b5cf6; }
        
        .demo-area { display: grid; gap: 1rem; }
        
        .theme-selector { padding: 1.5rem; border-radius: 8px; }
        .light .theme-selector { background: #f8fafc; }
        .dark .theme-selector { background: #334155; }
        
        .theme-buttons { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .theme-buttons button { flex: 1; padding: 0.75rem; border: 2px solid transparent; border-radius: 8px; cursor: pointer; font-size: 0.9rem; }
        .light .theme-buttons button { background: white; color: #1e293b; }
        .dark .theme-buttons button { background: #1e293b; color: #f1f5f9; }
        .theme-buttons button.active { border-color: #8b5cf6; background: #8b5cf6; color: white; }
        
        .preview-card { padding: 1.5rem; border-radius: 8px; }
        .light .preview-card { background: #f8fafc; border: 1px solid #e5e7eb; }
        .dark .preview-card { background: #334155; border: 1px solid #475569; }
        
        .theme-info { font-weight: bold; color: #8b5cf6; }
        
        .color-palette { padding: 1.5rem; border-radius: 8px; }
        .light .color-palette { background: #f8fafc; }
        .dark .color-palette { background: #334155; }
        
        .colors { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .color { flex: 1; padding: 1rem; border-radius: 8px; text-align: center; color: white; font-weight: 500; }
        .bg-primary { background: #8b5cf6; }
        .bg-secondary { background: #10b981; }
        .bg-accent { background: #f59e0b; }
    `]
})
export class Scenario3ThemeComponent {
    themes: Theme[] = ['light', 'dark', 'system'];

    /**
     * TODO: Create signal for theme preference
     * Load from localStorage or default to 'system'
     */
    theme = signal<Theme>(
        (localStorage.getItem('theme') as Theme) || 'system'
    );

    /**
     * TODO: Create computed for effective theme
     * If 'system', detect from prefers-color-scheme
     */
    effectiveTheme = computed(() => {
        const t = this.theme();
        if (t === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return t;
    });

    constructor() {
        /**
         * TODO: Create effect to persist theme to localStorage
         */
        effect(() => {
            localStorage.setItem('theme', this.theme());
        });
    }

    getThemeIcon(theme: Theme): string {
        switch (theme) {
            case 'light': return '☀️';
            case 'dark': return '🌙';
            case 'system': return '💻';
        }
    }
}
