/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: TOOLTIP DIRECTIVE
 * ============================================================================
 */

import { Component, Directive, ElementRef, HostListener, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective {
    @Input() appTooltip = '';
    @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

    private tooltipElement: HTMLElement | null = null;

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.show();
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.hide();
    }

    private show(): void {
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.textContent = this.appTooltip;
        this.tooltipElement.className = `tooltip tooltip-${this.tooltipPosition}`;
        document.body.appendChild(this.tooltipElement);
        this.setPosition();
    }

    private hide(): void {
        this.tooltipElement?.remove();
        this.tooltipElement = null;
    }

    private setPosition(): void {
        if (!this.tooltipElement) return;
        const hostRect = this.el.nativeElement.getBoundingClientRect();
        const tipRect = this.tooltipElement.getBoundingClientRect();

        let top = 0, left = 0;
        switch (this.tooltipPosition) {
            case 'top':
                top = hostRect.top - tipRect.height - 8;
                left = hostRect.left + (hostRect.width - tipRect.width) / 2;
                break;
            case 'bottom':
                top = hostRect.bottom + 8;
                left = hostRect.left + (hostRect.width - tipRect.width) / 2;
                break;
        }
        this.tooltipElement.style.top = `${top}px`;
        this.tooltipElement.style.left = `${left}px`;
    }
}

@Component({
    selector: 'app-scenario-1-tooltip',
    standalone: true,
    imports: [CommonModule, TooltipDirective],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Tooltip Directive</h2>
                <p>Create a dynamic positioning tooltip directive.</p>
            </div>

            <div class="content">
                <div class="demo-area">
                    <button [appTooltip]="'This is a helpful tip!'" tooltipPosition="top">
                        Hover for Tooltip (Top)
                    </button>
                    <button [appTooltip]="'Bottom tooltip message'" tooltipPosition="bottom">
                        Hover for Tooltip (Bottom)
                    </button>
                </div>

                <div class="code-preview">
                    <pre><code>&lt;button [appTooltip]="'Helpful tip!'" tooltipPosition="top"&gt;
  Hover me
&lt;/button&gt;</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .demo-area { display: flex; gap: 1rem; padding: 3rem; justify-content: center; margin-bottom: 1rem; }
        .demo-area button { padding: 1rem 2rem; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
        :host ::ng-deep .tooltip { position: fixed; padding: 0.5rem 1rem; background: #1e1e2e; color: white; border-radius: 4px; font-size: 0.85rem; z-index: 1000; }
    `]
})
export class Scenario1TooltipComponent { }
