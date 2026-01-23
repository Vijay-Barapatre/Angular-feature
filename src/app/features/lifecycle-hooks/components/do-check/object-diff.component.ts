/**
 * OBJECT DIFF COMPONENT - Demonstrates ngDoCheck
 * 
 * This component implements custom change detection using ngDoCheck
 * to detect object mutations that Angular's default CD doesn't catch.
 * 
 * CRITICAL CONCEPTS:
 * 1. Angular CD only checks object REFERENCES by default
 * 2. Mutating an object (user.name = 'x') keeps the same reference
 * 3. ngDoCheck lets you implement custom comparison logic
 * 
 * PERFORMANCE:
 * - ngDoCheck runs on EVERY CD cycle (very frequently!)
 * - Keep your comparison logic lightweight
 * - Consider using KeyValueDiffers for efficiency
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    DoCheck,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-object-diff',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="diff-card">
            <!-- Object Display -->
            <div class="object-display">
                <h4>📋 Current Object State</h4>
                <pre class="object-json">{{ data | json }}</pre>
            </div>

            <!-- Stats -->
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">{{ doCheckCount }}</span>
                    <span class="stat-label">DoCheck calls</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{ changesDetected }}</span>
                    <span class="stat-label">Changes detected</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{ onChangesCount }}</span>
                    <span class="stat-label">OnChanges calls</span>
                </div>
            </div>

            <!-- Last Change Info -->
            <div class="change-info" *ngIf="lastChange">
                <h4>🔔 Last Detected Change</h4>
                <p>{{ lastChange }}</p>
            </div>
        </div>
    `,
    styles: [`
        .diff-card {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-xl);
            border: 2px solid rgba(59, 130, 246, 0.3);
        }

        .object-display {
            margin-bottom: var(--spacing-lg);
        }

        .object-display h4 {
            font-size: 1rem;
            margin-bottom: var(--spacing-md);
            color: var(--primary-light);
        }

        .object-json {
            background: var(--bg-card);
            border-radius: var(--radius-md);
            padding: var(--spacing-md);
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.875rem;
            color: var(--text-primary);
            overflow-x: auto;
            margin: 0;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
        }

        .stat-item {
            text-align: center;
            padding: var(--spacing-md);
            background: var(--bg-card);
            border-radius: var(--radius-md);
        }

        .stat-value {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-light);
        }

        .stat-label {
            font-size: 0.75rem;
            color: var(--text-muted);
        }

        .change-info {
            background: rgba(74, 222, 128, 0.1);
            border-radius: var(--radius-md);
            padding: var(--spacing-md);
            border-left: 4px solid #4ade80;
        }

        .change-info h4 {
            font-size: 0.875rem;
            margin-bottom: var(--spacing-sm);
            color: #4ade80;
        }

        .change-info p {
            margin: 0;
            font-size: 0.875rem;
            color: var(--text-secondary);
        }
    `]
})
export class ObjectDiffComponent implements DoCheck, OnChanges {
    /**
     * Input data object
     */
    @Input() data: any;

    /**
     * Emit DoCheck events
     */
    @Output() doCheckEvent = new EventEmitter<{
        time: string;
        event: string;
        detected: boolean;
    }>();

    /**
     * Count of ngDoCheck calls
     */
    doCheckCount = 0;

    /**
     * Count of actual changes detected
     */
    changesDetected = 0;

    /**
     * Count of ngOnChanges calls (for comparison)
     */
    onChangesCount = 0;

    /**
     * Last detected change description
     */
    lastChange = '';

    /**
     * 🛡️ CRITICAL: Store previous data for comparison
     * We stringify for deep comparison (simple approach)
     */
    private previousDataJson = '';

    /**
     * Helper to get time string
     */
    private getTimeString(): string {
        return new Date().toLocaleTimeString();
    }

    /**
     * 🔄 ngOnChanges - Only called on REFERENCE changes
     * This won't detect object mutations!
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.onChangesCount++;
        console.log('🔄 [ObjectDiff] ngOnChanges called - reference changed');
    }

    /**
     * 🔍 ngDoCheck - CUSTOM CHANGE DETECTION HOOK
     * 
     * Called during EVERY change detection cycle.
     * 
     * USE CASE:
     * - Detect changes Angular's default CD misses
     * - Object mutations (same reference, different values)
     * - Deep equality checks
     * 
     * ⚠️ PERFORMANCE WARNING:
     * - Called VERY frequently (every CD cycle)
     * - Keep comparison logic lightweight
     * - Use flags to avoid redundant work
     * - Consider immutable data patterns instead
     */
    ngDoCheck(): void {
        this.doCheckCount++;

        // Stringify current data for deep comparison
        // NOTE: This is a simple approach - for large objects, consider KeyValueDiffers
        const currentJson = JSON.stringify(this.data);

        if (currentJson !== this.previousDataJson) {
            // Change detected!
            this.changesDetected++;

            const changeDescription = this.describeChange(this.previousDataJson, currentJson);
            this.lastChange = changeDescription;

            console.log('🔔 [ObjectDiff] ngDoCheck - Change detected!');
            console.log('Previous:', this.previousDataJson);
            console.log('Current:', currentJson);

            this.doCheckEvent.emit({
                time: this.getTimeString(),
                event: `Change #${this.changesDetected}: ${changeDescription}`,
                detected: true
            });

            // Update previous value
            this.previousDataJson = currentJson;
        } else {
            // No change detected, but still log periodically
            if (this.doCheckCount % 10 === 0) {
                this.doCheckEvent.emit({
                    time: this.getTimeString(),
                    event: `DoCheck #${this.doCheckCount} - No change`,
                    detected: false
                });
            }
        }
    }

    /**
     * Describe what changed between two JSON strings
     */
    private describeChange(previous: string, current: string): string {
        if (!previous) {
            return 'Initial value set';
        }

        try {
            const prev = JSON.parse(previous);
            const curr = JSON.parse(current);

            // Find what changed
            const changes: string[] = [];
            for (const key in curr) {
                if (JSON.stringify(prev[key]) !== JSON.stringify(curr[key])) {
                    changes.push(`${key} changed`);
                }
            }

            return changes.join(', ') || 'Object structure changed';
        } catch {
            return 'Data changed';
        }
    }
}
