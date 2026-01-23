/**
 * CHILD A COMPONENT - Component-Scoped Service
 * 
 * KEY DIFFERENCE:
 * This component has its OWN providers array!
 * 
 * providers: [CounterService]
 * 
 * This tells Angular: "Create a NEW instance of CounterService
 * specifically for this component and its children."
 * 
 * RESULT: 
 * - This component gets a DIFFERENT CounterService instance
 * - The counter is isolated from the rest of the app
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from './counter.service';

@Component({
    selector: 'app-use-case-2-child-a',
    standalone: true,
    imports: [CommonModule],
    /**
     * 🔑 KEY LINE: Component-level providers
     * 
     * This creates a NEW CounterService instance for this component.
     * It shadows the root singleton!
     */
    providers: [CounterService],
    template: `
        <div class="child-panel isolated">
            <div class="panel-header">
                <span class="icon">🔒</span>
                <h3>Child A - Own Instance</h3>
            </div>
            <div class="panel-body">
                <div class="instance-info">
                    <span class="label">Instance ID:</span>
                    <span class="value highlight">{{ counterService.instanceId }}</span>
                </div>
                <div class="counter-display">
                    <span class="count">{{ counterService.count }}</span>
                </div>
                <div class="button-group">
                    <button (click)="counterService.decrement()" class="btn btn-outline">-</button>
                    <button (click)="counterService.increment()" class="btn btn-primary">+</button>
                </div>
                <p class="hint">
                    Has <code>providers: [CounterService]</code><br>
                    Creates a NEW isolated instance!
                </p>
            </div>
        </div>
    `,
    styles: [`
        .child-panel {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            overflow: hidden;
            border: 2px solid var(--warning);
        }
        .panel-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            padding: var(--spacing-lg);
            background: linear-gradient(135deg, var(--warning), #fbbf24);
            color: var(--bg-primary);
        }
        .icon { font-size: 1.5rem; }
        .panel-header h3 { margin: 0; font-size: 1.25rem; }
        .panel-body { padding: var(--spacing-lg); text-align: center; }
        .instance-info {
            display: flex;
            justify-content: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
            padding: var(--spacing-md);
            background: var(--bg-card);
            border-radius: var(--radius-md);
        }
        .label { color: var(--text-secondary); }
        .value { font-family: monospace; font-weight: bold; }
        .highlight { color: var(--warning); }
        .counter-display {
            margin-bottom: var(--spacing-lg);
        }
        .count {
            font-size: 4rem;
            font-weight: 700;
            color: var(--warning);
        }
        .button-group {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;
            margin-bottom: var(--spacing-lg);
        }
        .btn {
            padding: var(--spacing-md) var(--spacing-xl);
            font-size: 1.5rem;
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        .btn-outline {
            background: transparent;
            border: 2px solid var(--warning);
            color: var(--warning);
        }
        .btn-primary {
            background: var(--warning);
            border: none;
            color: var(--bg-primary);
        }
        .btn:hover { transform: scale(1.1); }
        .hint {
            font-size: 0.875rem;
            color: var(--text-muted);
            line-height: 1.6;
        }
        code {
            background: var(--bg-card);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            color: var(--warning);
        }
    `]
})
export class UseCase2ChildAComponent {
    /**
     * This receives the COMPONENT-SCOPED instance,
     * not the root singleton!
     */
    constructor(public counterService: CounterService) {
        console.log('[ChildA] Using OWN instance:', this.counterService.instanceId);
    }
}
