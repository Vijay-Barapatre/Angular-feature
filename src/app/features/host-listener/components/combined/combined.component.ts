/**
 * ============================================================================
 * COMBINED @HostListener + @HostBinding
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * The real power comes from COMBINING both decorators:
 * - Listen to events with @HostListener
 * - React by changing bindings with @HostBinding
 */

import { Component, HostListener, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-combined',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>🔗 Combined Pattern</h1>
            <p class="description">
                Interactive component: events trigger style/class changes.
            </p>

            <div class="demo-area">
                <h3>👆 Click, hover, or press keys on this component</h3>
                <p>Current state: <strong>{{ currentState }}</strong></p>
                <p>Scale: {{ scale }}x</p>
            </div>

            <div class="instructions">
                <h3>🎯 Try These:</h3>
                <ul>
                    <li>🖱️ <strong>Hover</strong> - Changes border and shadow</li>
                    <li>👆 <strong>Click</strong> - Toggles active state</li>
                    <li>⌨️ <strong>Space/Enter</strong> (when focused) - Activates</li>
                    <li>🔍 <strong>Scroll</strong> - Changes scale based on scroll position</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            padding: 2rem;
            border: 3px solid #667eea;
            border-radius: 16px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none;
        }
        :host:focus { box-shadow: 0 0 0 4px rgba(102,126,234,0.3); }

        .container { max-width: 600px; margin: 0 auto; text-align: center; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-area {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 2rem; border-radius: 12px;
            margin-bottom: 2rem;
        }

        .instructions { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; text-align: left; }
        .instructions h3 { margin-top: 0; }
        .instructions li { margin-bottom: 0.5rem; }
    `]
})
export class CombinedComponent {
    currentState = 'idle';

    // ======================== HOST BINDINGS ========================

    @HostBinding('class.hovered')
    isHovered = false;

    @HostBinding('class.active')
    isActive = false;

    @HostBinding('style.transform')
    get transform() {
        return `scale(${this.scale})`;
    }

    @HostBinding('style.borderColor')
    get borderColorStyle() {
        if (this.isActive) return '#4ade80';
        if (this.isHovered) return '#f5576c';
        return '#667eea';
    }

    @HostBinding('style.boxShadow')
    get boxShadow() {
        if (this.isActive) return '0 8px 30px rgba(74,222,128,0.4)';
        if (this.isHovered) return '0 8px 30px rgba(245,87,108,0.3)';
        return '0 2px 10px rgba(0,0,0,0.1)';
    }

    @HostBinding('attr.tabindex')
    tabindex = 0; // Make focusable

    scale = 1;

    // ======================== HOST LISTENERS ========================

    @HostListener('mouseenter')
    onMouseEnter() {
        this.isHovered = true;
        this.currentState = 'hovered';
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.isHovered = false;
        if (!this.isActive) this.currentState = 'idle';
    }

    @HostListener('click')
    onClick() {
        this.isActive = !this.isActive;
        this.currentState = this.isActive ? 'active' : 'idle';
    }

    @HostListener('keydown.space', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    onKeyActivate(event: KeyboardEvent) {
        event.preventDefault();
        this.onClick();
    }

    @HostListener('window:scroll')
    onScroll() {
        // Scale based on scroll (subtle effect)
        const scrollPercent = Math.min(window.scrollY / 500, 1);
        this.scale = 1 - (scrollPercent * 0.1); // Max 10% shrink
    }
}
