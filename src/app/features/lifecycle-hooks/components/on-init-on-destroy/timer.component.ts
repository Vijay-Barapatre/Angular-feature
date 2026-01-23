/**
 * TIMER COMPONENT - Demonstrates ngOnInit & ngOnDestroy
 * 
 * This component shows a real-world example of:
 * - ngOnInit: Starting a timer/subscription
 * - ngOnDestroy: Cleaning up to prevent memory leaks
 * 
 * CRITICAL CONCEPTS:
 * 1. ngOnInit is called ONCE after component initialization
 * 2. ngOnDestroy is called ONCE just before destruction
 * 3. Always clean up subscriptions/timers in ngOnDestroy
 * 
 * MEMORY LEAK PREVENTION:
 * - Store timer/subscription references
 * - Clear them in ngOnDestroy
 * - Use takeUntil pattern for observables (advanced)
 */

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="timer-card">
            <div class="timer-header">
                <span class="status-badge running">🟢 Running</span>
                <span class="instance-id">Instance #{{ instanceId }}</span>
            </div>
            
            <div class="timer-display">
                <span class="timer-value">{{ seconds }}</span>
                <span class="timer-label">seconds</span>
            </div>
            
            <div class="timer-info">
                <p>⏱️ Timer started in <code>ngOnInit()</code></p>
                <p>🧹 Will cleanup in <code>ngOnDestroy()</code></p>
            </div>
        </div>
    `,
    styles: [`
        .timer-card {
            background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(59, 130, 246, 0.1));
            border-radius: var(--radius-lg);
            padding: var(--spacing-xl);
            border: 2px solid rgba(74, 222, 128, 0.3);
            text-align: center;
            min-width: 280px;
        }

        .timer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }

        .status-badge {
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            font-weight: 600;
            background: rgba(74, 222, 128, 0.2);
            color: #4ade80;
        }

        .instance-id {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-family: 'Consolas', 'Monaco', monospace;
        }

        .timer-display {
            margin-bottom: var(--spacing-lg);
        }

        .timer-value {
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(135deg, #4ade80, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .timer-label {
            display: block;
            color: var(--text-muted);
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .timer-info {
            background: var(--bg-card);
            border-radius: var(--radius-md);
            padding: var(--spacing-md);
        }

        .timer-info p {
            margin: var(--spacing-xs) 0;
            font-size: 0.875rem;
            color: var(--text-secondary);
        }

        .timer-info code {
            background: rgba(102, 126, 234, 0.2);
            padding: 2px 6px;
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
        }
    `]
})
export class TimerComponent implements OnInit, OnDestroy {
    /**
     * 🛡️ CRITICAL: Store the timer reference for cleanup
     * This is essential to prevent memory leaks!
     */
    private timerId: ReturnType<typeof setInterval> | null = null;

    /**
     * Current seconds elapsed since component created
     */
    seconds = 0;

    /**
     * Unique instance ID to demonstrate multiple instances
     */
    instanceId = Math.floor(Math.random() * 1000);

    /**
     * Output event to notify parent of lifecycle events
     */
    @Output() lifecycleEvent = new EventEmitter<{
        time: string;
        event: string;
        type: 'init' | 'destroy' | 'tick';
    }>();

    /**
     * Helper to get current time string
     */
    private getTimeString(): string {
        return new Date().toLocaleTimeString();
    }

    /**
     * 🚀 ngOnInit - INITIALIZATION HOOK
     * 
     * Called once after Angular first displays the data-bound properties.
     * This is the perfect place to:
     * - Start timers/intervals
     * - Subscribe to observables
     * - Fetch initial data
     * - Initialize third-party libraries
     * 
     * WHY NOT IN CONSTRUCTOR?
     * - Constructor is for simple initialization
     * - @Input values aren't set yet in constructor
     * - Keep constructor lean for better testability
     */
    ngOnInit(): void {
        console.log(`🚀 [Timer #${this.instanceId}] ngOnInit called - Starting timer`);

        // Emit init event
        this.lifecycleEvent.emit({
            time: this.getTimeString(),
            event: `🚀 ngOnInit - Timer #${this.instanceId} started`,
            type: 'init'
        });

        // Start the timer
        this.startTimer();
    }

    /**
     * 💀 ngOnDestroy - CLEANUP HOOK
     * 
     * Called just before Angular destroys the component.
     * This is the CRITICAL place to:
     * - Unsubscribe from observables
     * - Clear timers/intervals
     * - Remove event listeners
     * - Close WebSocket connections
     * - Release any resources
     * 
     * MEMORY LEAK WARNING:
     * If you don't clean up here, the timer will continue running
     * even after the component is removed from the DOM!
     */
    ngOnDestroy(): void {
        console.log(`💀 [Timer #${this.instanceId}] ngOnDestroy called - Cleaning up`);

        // Emit destroy event
        this.lifecycleEvent.emit({
            time: this.getTimeString(),
            event: `💀 ngOnDestroy - Timer #${this.instanceId} cleaned up (was at ${this.seconds}s)`,
            type: 'destroy'
        });

        // 🛡️ CRITICAL: Clear the timer to prevent memory leak!
        this.stopTimer();
    }

    /**
     * Start the interval timer
     */
    private startTimer(): void {
        this.timerId = setInterval(() => {
            this.seconds++;

            // Emit tick event every 5 seconds for demo purposes
            if (this.seconds % 5 === 0) {
                this.lifecycleEvent.emit({
                    time: this.getTimeString(),
                    event: `⏱️ Timer tick - ${this.seconds} seconds elapsed`,
                    type: 'tick'
                });
            }
        }, 1000);
    }

    /**
     * Stop and clear the timer
     * 🛡️ CRITICAL: This prevents memory leaks!
     */
    private stopTimer(): void {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
            console.log(`🧹 [Timer #${this.instanceId}] Timer cleared - No memory leak!`);
        }
    }
}
