/**
 * CONTROL FLOW FEATURE - Use Case 1: @if Conditional Rendering
 * 
 * Angular 17+ built-in control flow syntax
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-if-control-flow',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🎯 Use Case 1: Conditional Rendering</h2>
            <p class="subtitle">Angular 17+ built-in control flow for conditionals</p>
            
            <!-- Demo 1: Basic @if -->
            <section class="demo-section">
                <h3>1️⃣ Basic Conditional</h3>
                <div class="controls">
                    <button class="btn" (click)="toggleShow()">
                        {{ isVisible() ? 'Hide' : 'Show' }}
                    </button>
                </div>
                <div class="demo-area">
                    @if (isVisible()) {
                        <div class="box green">✅ Content is visible!</div>
                    }
                </div>
            </section>

            <!-- Demo 2: @if with @else -->
            <section class="demo-section">
                <h3>2️⃣ Conditional with else</h3>
                <div class="controls">
                    <button class="btn" (click)="toggleLoggedIn()">
                        {{ isLoggedIn() ? 'Logout' : 'Login' }}
                    </button>
                </div>
                <div class="demo-area">
                    @if (isLoggedIn()) {
                        <div class="box green">👋 Welcome back, User!</div>
                    } @else {
                        <div class="box orange">🔐 Please log in</div>
                    }
                </div>
            </section>

            <!-- Demo 3: @if with @else if -->
            <section class="demo-section">
                <h3>3️⃣ Multi-Condition (else if)</h3>
                <div class="controls">
                    <button class="btn" [class.active]="status() === 'loading'" 
                            (click)="status.set('loading')">Loading</button>
                    <button class="btn" [class.active]="status() === 'error'" 
                            (click)="status.set('error')">Error</button>
                    <button class="btn" [class.active]="status() === 'success'" 
                            (click)="status.set('success')">Success</button>
                </div>
                <div class="demo-area">
                    @if (status() === 'loading') {
                        <div class="box blue">⏳ Loading...</div>
                    } @else if (status() === 'error') {
                        <div class="box red">❌ Error occurred!</div>
                    } @else if (status() === 'success') {
                        <div class="box green">✅ Success!</div>
                    } @else {
                        <div class="box gray">🔄 Idle state</div>
                    }
                </div>
            </section>

            <!-- Demo 4: @if with variable declaration -->
            <section class="demo-section">
                <h3>4️⃣ Variable Declaration (as)</h3>
                <div class="controls">
                    <button class="btn" (click)="toggleUser()">Toggle User</button>
                </div>
                <div class="demo-area">
                    @if (user(); as u) {
                        <div class="box purple">
                            <strong>{{ u.name }}</strong> ({{ u.email }})
                        </div>
                    } @else {
                        <div class="box gray">No user data</div>
                    }
                </div>
            </section>

            <!-- Comparison Table -->
            <section class="comparison-section">
                <h3>📊 Old vs New Syntax</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Old (*ngIf)</th>
                            <th>New (&#64;if)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>*ngIf="condition"</code></td>
                            <td><code>&#64;if (condition) &#123;&#125;</code></td>
                        </tr>
                        <tr>
                            <td><code>*ngIf="cond; else elseBlock"</code></td>
                            <td><code>&#64;if + &#64;else</code></td>
                        </tr>
                        <tr>
                            <td><code>*ngIf="value as v"</code></td>
                            <td><code>&#64;if (value; as v) &#123;&#125;</code></td>
                        </tr>
                        <tr>
                            <td>Needs ng-template for else</td>
                            <td>Inline &#64;else block</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h2 { color: #22c55e; margin-bottom: 0.5rem; }
        .subtitle { color: #a0a0a0; margin-bottom: 2rem; }
        
        .demo-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }
        
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        
        .controls {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            color: white;
            transition: all 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        }
        
        .btn.active {
            background: linear-gradient(135deg, #a855f7, #6366f1);
        }
        
        .demo-area {
            margin-bottom: 1rem;
        }
        
        .box {
            padding: 1rem;
            border-radius: 8px;
            font-weight: 600;
            color: white;
        }
        
        .box.green { background: linear-gradient(135deg, #22c55e, #14b8a6); }
        .box.orange { background: linear-gradient(135deg, #f97316, #eab308); }
        .box.red { background: linear-gradient(135deg, #ef4444, #f43f5e); }
        .box.blue { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .box.purple { background: linear-gradient(135deg, #a855f7, #6366f1); }
        .box.gray { background: #4b5563; }
        
        pre {
            background: #0d0d0d;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 0;
        }
        
        code {
            color: #a6e3a1;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }
        
        .comparison-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #333;
        }
        
        th {
            background: #0d0d0d;
            color: #22c55e;
        }
        
        td code {
            background: #0d0d0d;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
        }
    `]
})
export class IfControlFlowComponent {
    isVisible = signal(true);
    isLoggedIn = signal(false);
    status = signal<'loading' | 'error' | 'success' | 'idle'>('idle');
    user = signal<{ name: string; email: string } | null>({ name: 'John Doe', email: 'john@example.com' });

    toggleShow(): void {
        this.isVisible.update(v => !v);
    }

    toggleLoggedIn(): void {
        this.isLoggedIn.update(v => !v);
    }

    toggleUser(): void {
        this.user.update(u => u ? null : { name: 'John Doe', email: 'john@example.com' });
    }
}
