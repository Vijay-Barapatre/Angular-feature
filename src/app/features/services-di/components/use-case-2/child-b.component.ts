/**
 * CHILD B COMPONENT - USE CASE 2: Uses Root Singleton
 * 
 * KEY DIFFERENCE:
 * This component has NO providers array!
 * 
 * RESULT:
 * - Angular looks up the injector hierarchy
 * - Finds the root-level CounterService
 * - Injects the SAME instance as Parent
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from './counter.service';

@Component({
    selector: 'app-use-case-2-child-b',
    standalone: true,
    imports: [CommonModule],
    // 🔑 NO providers array here! Uses root singleton
    template: `
        <div class="child-panel shared">
            <div class="panel-header">
                <span class="icon">🌍</span>
                <h3>Child B - Shares with Parent</h3>
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
                    Has <strong>NO</strong> providers array<br>
                    Shares root singleton with Parent!
                </p>
            </div>
        </div>
    `,
    styles: [`
        .child-panel {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            overflow: hidden;
            border: 2px solid var(--primary-color);
        }
        .panel-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            padding: var(--spacing-lg);
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
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
        .highlight { color: var(--primary-light); }
        .counter-display {
            margin-bottom: var(--spacing-lg);
        }
        .count {
            font-size: 4rem;
            font-weight: 700;
            color: var(--primary-light);
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
            border: 2px solid var(--primary-color);
            color: var(--primary-color);
        }
        .btn-primary {
            background: var(--primary-color);
            border: none;
        }
        .btn:hover { transform: scale(1.1); }
        .hint {
            font-size: 0.875rem;
            color: var(--text-muted);
            line-height: 1.6;
        }
    `]
})
export class UseCase2ChildBComponent {
    /**
     * This receives the ROOT singleton,
     * same as Parent component!
     */
    constructor(public counterService: CounterService) {
        console.log('[ChildB] Using ROOT singleton:', this.counterService.instanceId);
    }
}
