/**
 * MODEL SIGNALS (Two-Way Binding)
 * 
 * Demonstrates model() for two-way binding:
 * - Writable signal that syncs with parent
 * - Replaces [(ngModel)]-like patterns
 * - Works with component outputs automatically
 */

import { Component, model, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Child component with model() input
@Component({
    selector: 'app-rating',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="rating-container">
            @for (star of stars; track star) {
                <span 
                    class="star" 
                    [class.filled]="star <= value()"
                    (click)="value.set(star)"
                >
                    ★
                </span>
            }
            <span class="rating-text">{{ value() }} / 5</span>
        </div>
    `,
    styles: [`
        .rating-container {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        .star {
            font-size: 2rem;
            cursor: pointer;
            color: #4b5563;
            transition: color 0.2s;
        }
        .star:hover { color: #fbbf24; }
        .star.filled { color: #f59e0b; }
        .rating-text {
            margin-left: 1rem;
            color: var(--text-secondary);
        }
    `]
})
export class RatingComponent {
    // 🔄 model() creates a two-way bindable signal
    value = model(0);

    stars = [1, 2, 3, 4, 5];
}

// Toggle switch with model
@Component({
    selector: 'app-toggle',
    standalone: true,
    imports: [CommonModule],
    template: `
        <label class="toggle">
            <input 
                type="checkbox" 
                [checked]="checked()" 
                (change)="checked.set(!checked())"
            />
            <span class="slider"></span>
            <span class="label">{{ checked() ? 'ON' : 'OFF' }}</span>
        </label>
    `,
    styles: [`
        .toggle {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
        }
        .toggle input { display: none; }
        .slider {
            width: 50px;
            height: 26px;
            background: #4b5563;
            border-radius: 13px;
            position: relative;
            transition: background 0.3s;
        }
        .slider::before {
            content: '';
            position: absolute;
            width: 22px;
            height: 22px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: transform 0.3s;
        }
        .toggle input:checked + .slider { background: var(--primary-color); }
        .toggle input:checked + .slider::before { transform: translateX(24px); }
        .label { color: var(--text-primary); font-weight: 600; }
    `]
})
export class ToggleComponent {
    checked = model(false);
}

@Component({
    selector: 'app-use-case-5-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, RatingComponent, ToggleComponent],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>🔄 Model Signals</h1>
                <p>Two-way binding with model() for parent-child sync</p>
            </header>

            <section class="demo-section">
                <h2>⭐ Interactive Demo: Form Controls</h2>
                
                <div class="demo-grid">
                    <div class="demo-card">
                        <h3>Rating Component</h3>
                        <app-rating [(value)]="rating" />
                        <p class="parent-value">
                            Parent sees: <strong>{{ rating() }}</strong>
                        </p>
                        <button (click)="rating.set(3)" class="btn">
                            Set to 3 from Parent
                        </button>
                    </div>

                    <div class="demo-card">
                        <h3>Toggle Component</h3>
                        <app-toggle [(checked)]="isEnabled" />
                        <p class="parent-value">
                            Parent sees: <strong>{{ isEnabled() }}</strong>
                        </p>
                        <button (click)="isEnabled.set(!isEnabled())" class="btn">
                            Toggle from Parent
                        </button>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Key Code Patterns</h2>
                
                <div class="code-block">
                    <div class="code-header">Child Component with model()</div>
                    <pre><code>&#64;Component(&#123;...&#125;)
export class RatingComponent &#123;
    // Creates a writable two-way signal
    value = model(0);
    
    // Can read and write like any signal
    increment() &#123; this.value.update(v => v + 1); &#125;
&#125;</code></pre>
                </div>

                <div class="code-block">
                    <div class="code-header">Parent Usage (Two-Way Binding)</div>
                    <pre><code>&lt;!-- Two-way binding with [()] --&gt;
&lt;app-rating [(value)]="myRating" /&gt;

// Parent component
myRating = signal(3);</code></pre>
                </div>
            </section>

            <section class="key-points">
                <h2>🎯 Key Points</h2>
                <ul>
                    <li><strong>model()</strong> - Creates a two-way bindable signal</li>
                    <li><strong>[(value)]</strong> - Banana-in-a-box syntax for two-way</li>
                    <li>Child can read AND write the value</li>
                    <li>Changes propagate to parent automatically</li>
                    <li>model.required() for required two-way inputs</li>
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
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: var(--primary-light); text-decoration: none; }
        h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h2, h3 { color: var(--primary-light); }
        .demo-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .demo-card {
            background: var(--bg-card);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }
        .parent-value {
            margin-top: 1rem;
            padding: 0.75rem;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 8px;
        }
        .btn {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        .code-section, .key-points { margin-top: 2rem; }
        .code-block {
            background: #1e293b;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 1rem;
        }
        .code-header {
            background: rgba(102, 126, 234, 0.2);
            padding: 0.5rem 1rem;
            color: var(--primary-light);
            font-weight: 600;
        }
        .code-block pre { padding: 1rem; margin: 0; }
        .code-block code { color: #94a3b8; font-family: 'Fira Code', monospace; }
        .key-points ul { list-style: none; padding: 0; }
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
export class UseCase5DemoComponent {
    // Parent signals that sync with child models
    rating = signal(4);
    isEnabled = signal(true);
}
