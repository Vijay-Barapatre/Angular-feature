/**
 * USER CARD COMPONENT - Demonstrates ngOnChanges
 * 
 * This component receives multiple @Input properties and demonstrates
 * how ngOnChanges detects and reports changes.
 * 
 * CRITICAL CONCEPTS:
 * 1. ngOnChanges is called BEFORE ngOnInit on initial binding
 * 2. ngOnChanges is called on EVERY input property change
 * 3. SimpleChanges contains all changed properties in one call
 * 4. Object mutations are NOT detected (only reference changes)
 * 
 * SIMPLECHANGES INTERFACE:
 * - previousValue: The value before the change
 * - currentValue: The new value
 * - firstChange: Boolean indicating if this is the first change
 * - isFirstChange(): Method to check if first change
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * User interface
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    lastLogin: Date;
}

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="user-card" [class]="theme">
            <!-- User Avatar -->
            <div class="avatar" [class]="'role-' + user.role">
                {{ user.name.charAt(0).toUpperCase() }}
            </div>

            <!-- User Info -->
            <div class="user-info">
                <h3 class="user-name">{{ user.name }}</h3>
                <p class="user-email">{{ user.email }}</p>
                <span class="role-badge" *ngIf="showBadge" [class]="'badge-' + user.role">
                    {{ user.role | uppercase }}
                </span>
            </div>

            <!-- Change Counter -->
            <div class="change-counter">
                <span class="counter-value">{{ changeCount }}</span>
                <span class="counter-label">changes detected</span>
            </div>
        </div>
    `,
    styles: [`
        .user-card {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            padding: var(--spacing-xl);
            border-radius: var(--radius-lg);
            transition: all var(--transition-normal);
        }

        .user-card.dark {
            background: linear-gradient(135deg, #1e293b, #334155);
            border: 1px solid rgba(102, 126, 234, 0.3);
        }

        .user-card.light {
            background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
            border: 1px solid rgba(0, 0, 0, 0.1);
            color: #1e293b;
        }

        .avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            flex-shrink: 0;
        }

        .avatar.role-admin {
            background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .avatar.role-user {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .avatar.role-guest {
            background: linear-gradient(135deg, #6b7280, #4b5563);
        }

        .user-info {
            flex: 1;
        }

        .user-name {
            margin: 0 0 var(--spacing-xs) 0;
            font-size: 1.25rem;
        }

        .light .user-name {
            color: #1e293b;
        }

        .user-email {
            margin: 0 0 var(--spacing-sm) 0;
            font-size: 0.875rem;
            opacity: 0.8;
        }

        .light .user-email {
            color: #64748b;
        }

        .role-badge {
            display: inline-block;
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-admin {
            background: rgba(245, 158, 11, 0.2);
            color: #f59e0b;
        }

        .badge-user {
            background: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
        }

        .badge-guest {
            background: rgba(107, 114, 128, 0.2);
            color: #9ca3af;
        }

        .change-counter {
            text-align: center;
            padding: var(--spacing-md);
            background: rgba(102, 126, 234, 0.2);
            border-radius: var(--radius-md);
        }

        .counter-value {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: var(--primary-light);
        }

        .counter-label {
            font-size: 0.75rem;
            color: var(--text-muted);
        }
    `]
})
export class UserCardComponent implements OnChanges, OnInit {
    /**
     * User object - demonstrates object reference changes
     */
    @Input() user!: User;

    /**
     * Theme setting - demonstrates primitive changes
     */
    @Input() theme: 'light' | 'dark' = 'dark';

    /**
     * Show badge - demonstrates boolean changes
     */
    @Input() showBadge = true;

    /**
     * Emit change events to parent for logging
     */
    @Output() changesDetected = new EventEmitter<{ time: string; changes: string }>();

    /**
     * Counter for total changes detected
     */
    changeCount = 0;

    /**
     * Helper to get current time string
     */
    private getTimeString(): string {
        return new Date().toLocaleTimeString();
    }

    /**
     * 🚀 ngOnInit - Called once after first ngOnChanges
     * 
     * Note: ngOnChanges is called BEFORE ngOnInit!
     */
    ngOnInit(): void {
        console.log('🚀 [UserCard] ngOnInit called - Initial setup complete');
    }

    /**
     * 🔄 ngOnChanges - CHANGE DETECTION HOOK
     * 
     * Called in these scenarios:
     * 1. BEFORE ngOnInit - with initial input values
     * 2. Whenever an @Input property changes (new reference)
     * 
     * RECEIVES: SimpleChanges object containing all changed properties
     * 
     * IMPORTANT:
     * - Object mutations (e.g., user.name = 'New') are NOT detected
     * - Only reference changes (e.g., user = {...user, name: 'New'}) are detected
     * - All changed inputs are bundled in a single call
     * 
     * @param changes - Object containing all changed input properties
     */
    ngOnChanges(changes: SimpleChanges): void {
        console.log('🔄 [UserCard] ngOnChanges called');
        console.log('Changes:', changes);

        this.changeCount++;
        const changedProps: string[] = [];

        // Iterate through all changed properties
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                const change = changes[propName];

                /**
                 * 🛡️ CRITICAL: SimpleChange properties
                 * - previousValue: Value before the change
                 * - currentValue: Value after the change
                 * - firstChange: Boolean (true if initial binding)
                 * - isFirstChange(): Method that returns firstChange
                 */

                if (change.isFirstChange()) {
                    // First time this input is set
                    changedProps.push(`${propName}: [FIRST] → ${this.formatValue(change.currentValue)}`);
                    console.log(`  📌 ${propName}: Initial value set to`, change.currentValue);
                } else {
                    // Subsequent change
                    changedProps.push(
                        `${propName}: ${this.formatValue(change.previousValue)} → ${this.formatValue(change.currentValue)}`
                    );
                    console.log(`  🔄 ${propName}:`, change.previousValue, '→', change.currentValue);
                }
            }
        }

        // Emit the change log to parent
        this.changesDetected.emit({
            time: this.getTimeString(),
            changes: changedProps.join(' | ')
        });
    }

    /**
     * Format a value for display in the log
     */
    private formatValue(value: any): string {
        if (value === null || value === undefined) {
            return 'null';
        }
        if (typeof value === 'object') {
            // For objects, just show a summary
            if (value.name) {
                return `{name: "${value.name}"}`;
            }
            return JSON.stringify(value).substring(0, 30) + '...';
        }
        return String(value);
    }
}
