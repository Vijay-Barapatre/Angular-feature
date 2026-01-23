/**
 * TAB CONTAINER COMPONENT - Demonstrates Content Projection Lifecycle
 * 
 * This component uses <ng-content> to project tab items and demonstrates:
 * - ngAfterContentInit: Access projected content after initialization
 * - ngAfterContentChecked: Detect changes in projected content
 * 
 * CRITICAL CONCEPTS:
 * 1. Content = elements placed between component's opening/closing tags
 * 2. @ContentChildren queries projected elements
 * 3. ngAfterContentInit runs BEFORE ngAfterViewInit
 * 4. QueryList.changes observable for dynamic content
 */

import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    AfterContentChecked,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from './tab-item.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tab-container',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="tab-container">
            <!-- Tab Headers -->
            <div class="tab-headers">
                <button *ngFor="let tab of tabs; let i = index"
                        class="tab-header"
                        [class.active]="selectedIndex === i"
                        (click)="selectTab(i)">
                    <span class="tab-icon">{{ tab.icon }}</span>
                    <span class="tab-title">{{ tab.title }}</span>
                </button>
            </div>

            <!-- Tab Content (projected via ng-content) -->
            <div class="tab-content">
                <ng-content></ng-content>
            </div>

            <!-- Debug Info -->
            <div class="debug-info">
                <span>📦 Projected tabs: {{ tabs.length || 0 }}</span>
                <span>🔍 Content checks: {{ contentCheckCount }}</span>
            </div>
        </div>
    `,
    styles: [`
        .tab-container {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            border: 2px solid rgba(245, 158, 11, 0.3);
            overflow: hidden;
        }

        .tab-headers {
            display: flex;
            background: var(--bg-card);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab-header {
            flex: 1;
            padding: var(--spacing-md) var(--spacing-lg);
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all var(--transition-fast);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-sm);
        }

        .tab-header:hover {
            background: rgba(245, 158, 11, 0.1);
            color: var(--text-primary);
        }

        .tab-header.active {
            background: rgba(245, 158, 11, 0.2);
            color: #f59e0b;
            border-bottom: 2px solid #f59e0b;
        }

        .tab-icon {
            font-size: 1.25rem;
        }

        .tab-title {
            font-weight: 600;
        }

        .tab-content {
            padding: var(--spacing-xl);
            min-height: 120px;
        }

        .debug-info {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-sm) var(--spacing-lg);
            background: var(--bg-card);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.75rem;
            color: var(--text-muted);
            font-family: 'Consolas', 'Monaco', monospace;
        }
    `]
})
export class TabContainerComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
    /**
     * 🛡️ CRITICAL: @ContentChildren queries PROJECTED content
     * These are elements placed between <app-tab-container></app-tab-container>
     * NOT elements in this component's template
     */
    @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;

    /**
     * Emit content lifecycle events
     */
    @Output() contentLifecycleEvent = new EventEmitter<{
        time: string;
        event: string;
        type: 'init' | 'checked';
    }>();

    /**
     * Currently selected tab index
     */
    selectedIndex = 0;

    /**
     * Count of content checks
     */
    contentCheckCount = 0;

    /**
     * Previous tab count for change detection
     */
    private previousTabCount = 0;

    /**
     * Subscription for QueryList changes
     */
    private tabsChangeSub?: Subscription;

    /**
     * Helper to get time string
     */
    private getTimeString(): string {
        return new Date().toLocaleTimeString();
    }

    /**
     * Select a tab
     */
    selectTab(index: number): void {
        this.selectedIndex = index;
        this.tabs.forEach((tab, i) => {
            tab.isActive = i === index;
        });
    }

    /**
     * 📦 ngAfterContentInit - CONTENT INITIALIZATION HOOK
     * 
     * Called ONCE after Angular projects content into the component.
     * 
     * THIS IS THE SAFE PLACE TO:
     * - Access @ContentChild/@ContentChildren (they're now defined!)
     * - Initialize logic based on projected content
     * - Subscribe to QueryList.changes for dynamic content
     * 
     * EXECUTION ORDER:
     * ngAfterContentInit runs BEFORE ngAfterViewInit!
     */
    ngAfterContentInit(): void {
        console.log('📦 [TabContainer] ngAfterContentInit - Content is ready');
        console.log('Projected tabs:', this.tabs.length);

        // Store initial count
        this.previousTabCount = this.tabs.length;

        // Emit event
        this.contentLifecycleEvent.emit({
            time: this.getTimeString(),
            event: `📦 ngAfterContentInit - Found ${this.tabs.length} projected tabs`,
            type: 'init'
        });

        // Select first tab
        if (this.tabs.length > 0) {
            this.selectTab(0);
        }

        /**
         * 🛡️ BEST PRACTICE: Subscribe to QueryList.changes
         * This observable emits when items are added/removed
         * More efficient than checking in ngAfterContentChecked
         */
        this.tabsChangeSub = this.tabs.changes.subscribe(() => {
            console.log('📦 [TabContainer] Tabs QueryList changed!', this.tabs.length);

            this.contentLifecycleEvent.emit({
                time: this.getTimeString(),
                event: `📦 QueryList.changes - Now ${this.tabs.length} tabs`,
                type: 'checked'
            });

            // Re-select if needed
            if (this.selectedIndex >= this.tabs.length) {
                this.selectTab(Math.max(0, this.tabs.length - 1));
            } else {
                this.selectTab(this.selectedIndex);
            }
        });
    }

    /**
     * 🔄 ngAfterContentChecked - CONTENT CHECK HOOK
     * 
     * Called AFTER every check of the component's content.
     * 
     * ⚠️ PERFORMANCE WARNING:
     * - Runs very frequently (every CD cycle)
     * - Use QueryList.changes instead when possible
     * - Keep logic minimal
     * - Don't modify state or you'll get infinite loops!
     */
    ngAfterContentChecked(): void {
        this.contentCheckCount++;

        // Only log significant changes to avoid spam
        if (this.tabs && this.tabs.length !== this.previousTabCount) {
            console.log('🔄 [TabContainer] ngAfterContentChecked - Tab count changed');

            this.contentLifecycleEvent.emit({
                time: this.getTimeString(),
                event: `🔄 ngAfterContentChecked - ${this.previousTabCount} → ${this.tabs.length} tabs`,
                type: 'checked'
            });

            this.previousTabCount = this.tabs.length;
        }
    }

    /**
     * 💀 ngOnDestroy - Cleanup
     */
    ngOnDestroy(): void {
        if (this.tabsChangeSub) {
            this.tabsChangeSub.unsubscribe();
        }
    }
}
