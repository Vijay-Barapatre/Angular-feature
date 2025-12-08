/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: CLICK OUTSIDE
 * ============================================================================
 */

import { Component, Directive, ElementRef, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appClickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
    @Output() appClickOutside = new EventEmitter<void>();

    constructor(private el: ElementRef) { }

    @HostListener('document:click', ['$event.target'])
    onClick(target: HTMLElement): void {
        if (!this.el.nativeElement.contains(target)) {
            this.appClickOutside.emit();
        }
    }
}

@Component({
    selector: 'app-scenario-4-click-outside',
    standalone: true,
    imports: [CommonModule, ClickOutsideDirective],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Click Outside</h2>
                <p>Detect clicks outside an element (for dropdowns, modals).</p>
            </div>

            <div class="content">
                <button (click)="toggleDropdown()">
                    {{ dropdownOpen() ? 'Close' : 'Open' }} Dropdown
                </button>

                @if (dropdownOpen()) {
                    <div class="dropdown" (appClickOutside)="closeDropdown()">
                        <div class="dropdown-header">Dropdown Menu</div>
                        <div class="dropdown-item">Option 1</div>
                        <div class="dropdown-item">Option 2</div>
                        <div class="dropdown-item">Option 3</div>
                        <div class="dropdown-footer">Click outside to close</div>
                    </div>
                }

                <div class="click-log">
                    <h4>Click Log:</h4>
                    @for (log of clickLog(); track $index) {
                        <div class="log-entry">{{ log }}</div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .content > button { padding: 0.75rem 1.5rem; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .dropdown { margin-top: 0.5rem; width: 200px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .dropdown-header { padding: 0.75rem; font-weight: 600; border-bottom: 1px solid #e5e7eb; }
        .dropdown-item { padding: 0.75rem; cursor: pointer; }
        .dropdown-item:hover { background: #f8fafc; }
        .dropdown-footer { padding: 0.5rem 0.75rem; font-size: 0.8rem; color: #6b7280; border-top: 1px solid #e5e7eb; }
        .click-log { margin-top: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; max-height: 150px; overflow-y: auto; }
        .click-log h4 { margin: 0 0 0.5rem; }
        .log-entry { padding: 0.25rem 0; font-size: 0.85rem; color: #6b7280; }
    `]
})
export class Scenario4ClickOutsideComponent {
    dropdownOpen = signal(false);
    clickLog = signal<string[]>([]);

    toggleDropdown(): void {
        this.dropdownOpen.update(v => !v);
        this.addLog(this.dropdownOpen() ? 'Dropdown opened' : 'Dropdown closed (button)');
    }

    closeDropdown(): void {
        if (this.dropdownOpen()) {
            this.dropdownOpen.set(false);
            this.addLog('Dropdown closed (click outside)');
        }
    }

    private addLog(message: string): void {
        this.clickLog.update(logs => [
            `${new Date().toLocaleTimeString()}: ${message}`,
            ...logs.slice(0, 9)
        ]);
    }
}
