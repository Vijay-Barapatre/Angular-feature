/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: TAB COMPONENT
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * Build a tabs component with dynamic content and lazy loading.
 */

import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
    id: string;
    label: string;
    content: string;
}

@Component({
    selector: 'app-tab-panel',
    standalone: true,
    template: `
        <div class="tab-panel" [hidden]="!isActive">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`.tab-panel { padding: 1.5rem; }`]
})
export class TabPanelComponent {
    // TODO: @Input() id = '';
    // TODO: @Input() label = '';
    id = '';
    label = '';
    isActive = false;
}

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="tabs">
            <div class="tab-header">
                <button 
                    *ngFor="let tab of tabs"
                    [class.active]="tab.id === activeTabId"
                    (click)="selectTab(tab.id)">
                    {{ tab.label }}
                </button>
            </div>
            <div class="tab-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .tab-header { display: flex; border-bottom: 2px solid #e5e7eb; }
        button { padding: 0.75rem 1.5rem; background: none; border: none; cursor: pointer; position: relative; }
        button.active { color: #10b981; }
        button.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: #10b981; }
        .tab-content { background: #f8fafc; border-radius: 0 0 8px 8px; }
    `]
})
export class TabsComponent {
    // TODO: @Output() tabChange = new EventEmitter<string>();

    tabs: Tab[] = [];
    activeTabId = '';

    selectTab(id: string): void {
        this.activeTabId = id;
        // TODO: this.tabChange.emit(id);
    }
}

@Component({
    selector: 'app-scenario-5-tabs',
    standalone: true,
    imports: [CommonModule, TabsComponent, TabPanelComponent],
    template: `
        <div class="tabs-scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Tab Component</h2>
                <p>Build a dynamic tabs component using &#64;Input/&#64;Output.</p>
            </div>

            <div class="demo">
                <app-tabs>
                    <app-tab-panel id="overview" label="Overview">
                        <h3>Overview Content</h3>
                        <p>This is the overview tab content.</p>
                    </app-tab-panel>
                    <app-tab-panel id="features" label="Features">
                        <h3>Features Content</h3>
                        <p>This is the features tab content.</p>
                    </app-tab-panel>
                    <app-tab-panel id="settings" label="Settings">
                        <h3>Settings Content</h3>
                        <p>This is the settings tab content.</p>
                    </app-tab-panel>
                </app-tabs>
            </div>
        </div>
    `,
    styles: [`
        .tabs-scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .demo { background: white; border-radius: 8px; overflow: hidden; }
    `]
})
export class Scenario5TabsComponent {
    onTabChange(tabId: string): void {
        console.log('Active tab:', tabId);
    }
}
