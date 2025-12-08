/**
 * LEARNER EXERCISE COMPONENT
 * 
 * Hands-on practice template for lifecycle hooks.
 * Complete the TODOs to practice implementing lifecycle hooks.
 */

import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-learner-exercise',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="exercise-container fade-in">
            <div class="page-header">
                <a routerLink="/lifecycle-hooks" class="back-link">← Back to Lifecycle Hooks</a>
                <h1>✏️ Learner Exercise</h1>
                <p class="header-description">
                    Practice implementing lifecycle hooks. Open this file in your editor
                    and complete the TODO comments.
                </p>
            </div>

            <div class="exercise-content">
                <!-- Instructions -->
                <div class="instructions-card">
                    <h2>📝 Your Task</h2>
                    <ol class="task-list">
                        <li>
                            <strong>Implement ngOnInit:</strong>
                            Initialize the <code>startTime</code> property with the current date
                        </li>
                        <li>
                            <strong>Implement ngOnChanges:</strong>
                            Log changes to the console and update <code>changeHistory</code>
                        </li>
                        <li>
                            <strong>Implement ngOnDestroy:</strong>
                            Clear the interval if running and log cleanup message
                        </li>
                        <li>
                            <strong>Start a timer:</strong>
                            Create an interval that increments <code>counter</code> every second
                        </li>
                    </ol>
                </div>

                <!-- Your Component Output -->
                <div class="output-card">
                    <h2>🖥️ Component Output</h2>
                    <div class="output-display">
                        <div class="output-item">
                            <span class="label">Name:</span>
                            <span class="value">{{ name }}</span>
                        </div>
                        <div class="output-item">
                            <span class="label">Start Time:</span>
                            <span class="value">{{ startTime || 'Not set - implement ngOnInit!' }}</span>
                        </div>
                        <div class="output-item">
                            <span class="label">Counter:</span>
                            <span class="value">{{ counter }}</span>
                        </div>
                        <div class="output-item">
                            <span class="label">Change History:</span>
                            <span class="value">{{ changeHistory.length }} changes</span>
                        </div>
                    </div>
                </div>

                <!-- Hints -->
                <div class="hints-card">
                    <h2>💡 Hints</h2>
                    <details>
                        <summary>Hint 1: ngOnInit</summary>
                        <code>this.startTime = new Date().toLocaleTimeString();</code>
                    </details>
                    <details>
                        <summary>Hint 2: Starting a timer</summary>
                        <code>this.timerId = setInterval(() => this.counter++, 1000);</code>
                    </details>
                    <details>
                        <summary>Hint 3: ngOnDestroy cleanup</summary>
                        <code>if (this.timerId) clearInterval(this.timerId);</code>
                    </details>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .page-header {
            text-align: center;
            margin-bottom: var(--spacing-2xl);
        }

        .back-link {
            display: inline-block;
            color: var(--primary-light);
            text-decoration: none;
            margin-bottom: var(--spacing-md);
        }

        .page-header h1 {
            font-size: 2rem;
            margin-bottom: var(--spacing-md);
        }

        .header-description {
            color: var(--text-secondary);
        }

        .exercise-content {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xl);
        }

        .instructions-card,
        .output-card,
        .hints-card {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-xl);
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        h2 {
            font-size: 1.25rem;
            margin-bottom: var(--spacing-lg);
            color: var(--primary-light);
        }

        .task-list {
            padding-left: var(--spacing-lg);
        }

        .task-list li {
            margin-bottom: var(--spacing-md);
            color: var(--text-secondary);
        }

        .task-list code {
            background: var(--bg-card);
            padding: 2px 6px;
            border-radius: var(--radius-sm);
        }

        .output-display {
            display: grid;
            gap: var(--spacing-md);
        }

        .output-item {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-sm);
            background: var(--bg-card);
            border-radius: var(--radius-sm);
        }

        .label {
            color: var(--text-muted);
        }

        .value {
            color: var(--primary-light);
            font-family: 'Consolas', 'Monaco', monospace;
        }

        details {
            margin-bottom: var(--spacing-md);
            padding: var(--spacing-md);
            background: var(--bg-card);
            border-radius: var(--radius-sm);
        }

        summary {
            cursor: pointer;
            color: var(--text-secondary);
            font-weight: 500;
        }

        details code {
            display: block;
            margin-top: var(--spacing-md);
            padding: var(--spacing-md);
            background: var(--bg-primary);
            border-radius: var(--radius-sm);
            font-size: 0.875rem;
        }
    `]
})
export class LearnerExerciseComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * Input property for demonstration
     */
    @Input() name = 'Learner';

    /**
     * TODO: Set this in ngOnInit
     */
    startTime: string | null = null;

    /**
     * TODO: Increment this with a timer
     */
    counter = 0;

    /**
     * TODO: Track changes here in ngOnChanges
     */
    changeHistory: string[] = [];

    /**
     * TODO: Store timer reference for cleanup
     */
    private timerId: ReturnType<typeof setInterval> | null = null;

    /**
     * TODO 1: Implement ngOnInit
     * - Set startTime to current time
     * - Start a timer that increments counter every second
     */
    ngOnInit(): void {
        // YOUR CODE HERE
        // Hint: this.startTime = new Date().toLocaleTimeString();
        // Hint: this.timerId = setInterval(() => this.counter++, 1000);
    }

    /**
     * TODO 2: Implement ngOnChanges
     * - Log the changes to console
     * - Add change description to changeHistory array
     */
    ngOnChanges(changes: SimpleChanges): void {
        // YOUR CODE HERE
        // Hint: console.log('Changes:', changes);
        // Hint: this.changeHistory.push('Name changed');
    }

    /**
     * TODO 3: Implement ngOnDestroy
     * - Clear the timer to prevent memory leaks
     * - Log cleanup message
     */
    ngOnDestroy(): void {
        // YOUR CODE HERE
        // Hint: if (this.timerId) clearInterval(this.timerId);
        // Hint: console.log('Component destroyed, timer cleared');
    }
}
