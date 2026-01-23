/**
 * SIGNAL INPUTS
 * 
 * Demonstrates Angular 17+ signal-based inputs:
 * - input() for optional inputs
 * - input.required() for required inputs
 * - Transform options
 */

import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Child component demonstrating signal inputs
@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="user-card" [style.border-color]="borderColor()">
            <div class="avatar">{{ initials() }}</div>
            <div class="user-info">
                <h4>{{ name() }}</h4>
                <span class="role" [class]="role()">{{ role() }}</span>
            </div>
            @if (showActions()) {
                <div class="actions">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            }
        </div>
    `,
    styles: [`
        .user-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-card);
            border-radius: 12px;
            border: 2px solid;
            margin-bottom: 1rem;
        }
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .user-info h4 { margin: 0; color: var(--text-primary); }
        .role {
            font-size: 0.85rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
        }
        .role.admin { background: #ef4444; color: white; }
        .role.user { background: #3b82f6; color: white; }
        .role.guest { background: #6b7280; color: white; }
        .actions { margin-left: auto; display: flex; gap: 0.5rem; }
        .actions button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }
    `]
})
export class UserCardComponent {
    // 📥 Required input - must be provided
    name = input.required<string>();

    // 📥 Optional input with default
    role = input<'admin' | 'user' | 'guest'>('user');

    // 📥 Optional with transform
    showActions = input(false, {
        transform: (value: boolean | string) =>
            typeof value === 'string' ? value === 'true' : value
    });

    // 🧮 Computed from input signals
    initials = computed(() =>
        this.name()
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
    );

    borderColor = computed(() => {
        switch (this.role()) {
            case 'admin': return '#ef4444';
            case 'user': return '#3b82f6';
            default: return '#6b7280';
        }
    });
}

@Component({
    selector: 'app-use-case-4-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, UserCardComponent],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>📥 Signal Inputs</h1>
                <p>Use input() and input.required() for reactive component inputs</p>
            </header>

            <section class="demo-section">
                <h2>👤 Interactive Demo: User Cards</h2>
                
                <div class="cards-container">
                    <app-user-card 
                        name="John Admin" 
                        role="admin" 
                        [showActions]="true" 
                    />
                    <app-user-card 
                        name="Jane User" 
                        role="user" 
                    />
                    <app-user-card 
                        name="Guest Visitor" 
                        role="guest"
                        showActions="false"
                    />
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Key Code Patterns</h2>
                
                <div class="code-block">
                    <div class="code-header">Signal Inputs</div>
                    <pre><code>// Required input - error if not provided
name = input.required&lt;string&gt;();

// Optional with default value
role = input&lt;'admin' | 'user'&gt;('user');

// With transform function
count = input(0, &#123;
    transform: (v: string | number) => 
        typeof v === 'string' ? parseInt(v) : v
&#125;);

// Reading (it's a signal!)
initials = computed(() => 
    this.name().split(' ').map(n => n[0]).join('')
);</code></pre>
                </div>
            </section>

            <section class="key-points">
                <h2>🎯 Key Points</h2>
                <ul>
                    <li><strong>input()</strong> - Optional signal input with default</li>
                    <li><strong>input.required()</strong> - Required signal input</li>
                    <li><strong>transform</strong> - Convert input values on the fly</li>
                    <li>Signal inputs are read-only (use model() for two-way)</li>
                    <li>Works seamlessly with computed() and effect()</li>
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
        h2 { color: var(--primary-light); margin-bottom: 1rem; }
        .cards-container {
            background: var(--bg-secondary);
            padding: 1.5rem;
            border-radius: 12px;
        }
        .code-section, .key-points { margin-top: 2rem; }
        .code-block {
            background: #1e293b;
            border-radius: 8px;
            overflow: hidden;
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
export class UseCase4DemoComponent { }
