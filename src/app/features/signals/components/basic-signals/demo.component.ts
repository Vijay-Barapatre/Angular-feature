/**
 * BASIC SIGNALS
 * 
 * Demonstrates the fundamentals of Angular Signals:
 * - signal() to create a reactive value
 * - set() to replace the value
 * - update() to modify based on previous value
 * - Reading signal value with ()
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-use-case-1-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>📡 Basic Signals</h1>
                <p>Create and update reactive values with signal(), set(), and update()</p>
            </header>

            <section class="demo-section">
                <h2>🧪 Interactive Demo: Counter</h2>
                
                <div class="demo-card">
                    <div class="counter-display">
                        <span class="counter-value">{{ count() }}</span>
                        <span class="counter-label">Current Count</span>
                    </div>

                    <div class="button-group">
                        <button (click)="decrement()" class="btn btn-secondary">
                            ➖ Decrement
                        </button>
                        <button (click)="reset()" class="btn btn-accent">
                            🔄 Reset
                        </button>
                        <button (click)="increment()" class="btn btn-primary">
                            ➕ Increment
                        </button>
                    </div>

                    <div class="custom-set">
                        <input 
                            type="number" 
                            [(ngModel)]="customValue" 
                            placeholder="Enter a value"
                            class="input-field"
                        />
                        <button (click)="setCustom()" class="btn btn-accent">
                            📌 Set Value
                        </button>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Key Code Patterns</h2>
                
                <div class="code-block">
                    <div class="code-header">Creating a Signal</div>
                    <pre><code>// Create a writable signal with initial value
count = signal(0);

// Read the value (call the signal like a function)
console.log(this.count());  // 0</code></pre>
                </div>

                <div class="code-block">
                    <div class="code-header">Updating Signals</div>
                    <pre><code>// set() - Replace the entire value
this.count.set(10);

// update() - Modify based on previous value
this.count.update(prev => prev + 1);

// In template, just call it
{{ '{{ count() }}' }}</code></pre>
                </div>
            </section>

            <section class="key-points">
                <h2>🎯 Key Points</h2>
                <ul>
                    <li><strong>signal(initialValue)</strong> - Creates a writable signal</li>
                    <li><strong>signal()</strong> - Read the current value (getter)</li>
                    <li><strong>signal.set(newValue)</strong> - Replace the value entirely</li>
                    <li><strong>signal.update(fn)</strong> - Update based on previous value</li>
                    <li>Signals trigger change detection only when value changes</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }

        .demo-header {
            margin-bottom: 2rem;
        }

        .back-link {
            color: var(--primary-light);
            text-decoration: none;
        }

        h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .demo-section, .code-section, .key-points {
            margin-bottom: 2rem;
        }

        h2 {
            color: var(--primary-light);
            margin-bottom: 1rem;
        }

        .demo-card {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 2rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .counter-display {
            text-align: center;
            margin-bottom: 2rem;
        }

        .counter-value {
            display: block;
            font-size: 4rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .counter-label {
            color: var(--text-secondary);
        }

        .button-group {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s;
        }

        .btn:hover {
            transform: scale(1.05);
        }

        .btn-primary {
            background: var(--primary-color);
            color: white;
        }

        .btn-secondary {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }

        .btn-accent {
            background: var(--accent-color);
            color: white;
        }

        .custom-set {
            display: flex;
            gap: 1rem;
            justify-content: center;
            padding-top: 1rem;
            border-top: 1px solid rgba(102, 126, 234, 0.1);
        }

        .input-field {
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid rgba(102, 126, 234, 0.3);
            background: var(--bg-secondary);
            color: var(--text-primary);
            width: 150px;
        }

        .code-block {
            background: #1e293b;
            border-radius: 8px;
            margin-bottom: 1rem;
            overflow: hidden;
        }

        .code-header {
            background: rgba(102, 126, 234, 0.2);
            padding: 0.5rem 1rem;
            color: var(--primary-light);
            font-weight: 600;
        }

        .code-block pre {
            padding: 1rem;
            margin: 0;
            overflow-x: auto;
        }

        .code-block code {
            color: #94a3b8;
            font-family: 'Fira Code', monospace;
        }

        .key-points ul {
            list-style: none;
            padding: 0;
        }

        .key-points li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: var(--text-secondary);
        }

        .key-points li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-color);
        }
    `]
})
export class UseCase1DemoComponent {
    // 🚦 Create a writable signal with initial value 0
    count = signal(0);

    customValue = 0;

    // set() replaces the value
    increment(): void {
        this.count.update(prev => prev + 1);
    }

    decrement(): void {
        this.count.update(prev => prev - 1);
    }

    reset(): void {
        this.count.set(0);
    }

    setCustom(): void {
        this.count.set(this.customValue);
    }
}
