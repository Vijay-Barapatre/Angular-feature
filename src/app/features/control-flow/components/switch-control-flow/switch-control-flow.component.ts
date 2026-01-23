/**
 * CONTROL FLOW FEATURE - @switch Multi-Condition
 * 
 * Angular 17+ built-in control flow for switch statements
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'warning';
type Role = 'admin' | 'editor' | 'viewer' | 'guest';

@Component({
    selector: 'app-switch-control-flow',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🔀 Switch Multi-Condition</h2>
            <p class="subtitle">Angular 17+ built-in control flow for switch statements</p>
            
            <!-- Demo 1: Status Display -->
            <section class="demo-section">
                <h3>1️⃣ Status Display</h3>
                <div class="controls">
                    <button class="btn" [class.active]="status() === 'idle'" 
                            (click)="status.set('idle')">Idle</button>
                    <button class="btn" [class.active]="status() === 'loading'" 
                            (click)="status.set('loading')">Loading</button>
                    <button class="btn" [class.active]="status() === 'success'" 
                            (click)="status.set('success')">Success</button>
                    <button class="btn" [class.active]="status() === 'error'" 
                            (click)="status.set('error')">Error</button>
                    <button class="btn" [class.active]="status() === 'warning'" 
                            (click)="status.set('warning')">Warning</button>
                </div>
                <div class="demo-area">
                    @switch (status()) {
                        @case ('idle') {
                            <div class="status-card gray">
                                ⏸️ <strong>Idle</strong>
                                <p>Waiting for action...</p>
                            </div>
                        }
                        @case ('loading') {
                            <div class="status-card blue">
                                ⏳ <strong>Loading</strong>
                                <p>Please wait...</p>
                            </div>
                        }
                        @case ('success') {
                            <div class="status-card green">
                                ✅ <strong>Success</strong>
                                <p>Operation completed!</p>
                            </div>
                        }
                        @case ('error') {
                            <div class="status-card red">
                                ❌ <strong>Error</strong>
                                <p>Something went wrong!</p>
                            </div>
                        }
                        @case ('warning') {
                            <div class="status-card orange">
                                ⚠️ <strong>Warning</strong>
                                <p>Proceed with caution!</p>
                            </div>
                        }
                        @default {
                            <div class="status-card gray">
                                ❓ <strong>Unknown</strong>
                                <p>Unhandled status</p>
                            </div>
                        }
                    }
                </div>
            </section>

            <!-- Demo 2: User Roles -->
            <section class="demo-section">
                <h3>2️⃣ Role-Based Content</h3>
                <div class="controls">
                    <button class="btn" [class.active]="role() === 'admin'" 
                            (click)="role.set('admin')">Admin</button>
                    <button class="btn" [class.active]="role() === 'editor'" 
                            (click)="role.set('editor')">Editor</button>
                    <button class="btn" [class.active]="role() === 'viewer'" 
                            (click)="role.set('viewer')">Viewer</button>
                    <button class="btn" [class.active]="role() === 'guest'" 
                            (click)="role.set('guest')">Guest</button>
                </div>
                <div class="demo-area">
                    @switch (role()) {
                        @case ('admin') {
                            <div class="role-panel admin">
                                <h4>👑 Admin Panel</h4>
                                <ul>
                                    <li>✅ Full access</li>
                                    <li>✅ User management</li>
                                    <li>✅ System settings</li>
                                    <li>✅ Analytics</li>
                                </ul>
                            </div>
                        }
                        @case ('editor') {
                            <div class="role-panel editor">
                                <h4>✏️ Editor Panel</h4>
                                <ul>
                                    <li>✅ Create content</li>
                                    <li>✅ Edit content</li>
                                    <li>❌ User management</li>
                                    <li>✅ Analytics</li>
                                </ul>
                            </div>
                        }
                        @case ('viewer') {
                            <div class="role-panel viewer">
                                <h4>👁️ Viewer Panel</h4>
                                <ul>
                                    <li>✅ View content</li>
                                    <li>❌ Edit content</li>
                                    <li>❌ User management</li>
                                    <li>✅ Analytics (read-only)</li>
                                </ul>
                            </div>
                        }
                        @default {
                            <div class="role-panel guest">
                                <h4>👤 Guest Access</h4>
                                <ul>
                                    <li>✅ View public content</li>
                                    <li>❌ Edit content</li>
                                    <li>❌ User management</li>
                                    <li>❌ Analytics</li>
                                </ul>
                            </div>
                        }
                    }
                </div>
            </section>

            <!-- Demo 3: Dynamic Value -->
            <section class="demo-section">
                <h3>3️⃣ Day of Week</h3>
                <div class="controls">
                    <button class="btn" (click)="changeDay()">🎲 Random Day</button>
                </div>
                <div class="demo-area">
                    @switch (dayOfWeek()) {
                        @case (0) { <div class="day-card sun">☀️ Sunday - Rest day!</div> }
                        @case (1) { <div class="day-card mon">📅 Monday - Start strong!</div> }
                        @case (2) { <div class="day-card tue">💪 Tuesday - Keep going!</div> }
                        @case (3) { <div class="day-card wed">🐫 Wednesday - Hump day!</div> }
                        @case (4) { <div class="day-card thu">🚀 Thursday - Almost there!</div> }
                        @case (5) { <div class="day-card fri">🎉 Friday - Weekend vibes!</div> }
                        @case (6) { <div class="day-card sat">🌴 Saturday - Enjoy!</div> }
                        @default { <div class="day-card">Unknown day</div> }
                    }
                </div>
            </section>

            <!-- Code Example -->
            <section class="code-section">
                <h3>📝 Syntax</h3>
                <pre><code>&#64;switch (expression)
  &#64;case (value1) &lt;content-for-value1 /&gt;
  &#64;case (value2) &lt;content-for-value2 /&gt;
  &#64;default &lt;fallback-content /&gt;</code></pre>
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
            background: #374151;
            color: white;
            transition: all 0.2s;
        }
        
        .btn.active {
            background: linear-gradient(135deg, #22c55e, #14b8a6);
        }
        
        .status-card {
            padding: 1.5rem;
            border-radius: 12px;
            color: white;
        }
        
        .status-card strong { font-size: 1.25rem; }
        .status-card p { margin: 0.5rem 0 0; opacity: 0.9; }
        
        .status-card.gray { background: #4b5563; }
        .status-card.blue { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .status-card.green { background: linear-gradient(135deg, #22c55e, #14b8a6); }
        .status-card.red { background: linear-gradient(135deg, #ef4444, #f43f5e); }
        .status-card.orange { background: linear-gradient(135deg, #f97316, #eab308); }
        
        .role-panel {
            padding: 1.5rem;
            border-radius: 12px;
            color: white;
        }
        
        .role-panel h4 { margin: 0 0 1rem; }
        .role-panel ul { margin: 0; padding-left: 0; list-style: none; }
        .role-panel li { padding: 0.3rem 0; }
        
        .role-panel.admin { background: linear-gradient(135deg, #a855f7, #6366f1); }
        .role-panel.editor { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .role-panel.viewer { background: linear-gradient(135deg, #22c55e, #14b8a6); }
        .role-panel.guest { background: #4b5563; }
        
        .day-card {
            padding: 1.5rem;
            border-radius: 12px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .day-card.sun { background: linear-gradient(135deg, #f97316, #eab308); }
        .day-card.mon { background: linear-gradient(135deg, #3b82f6, #6366f1); }
        .day-card.tue { background: linear-gradient(135deg, #22c55e, #14b8a6); }
        .day-card.wed { background: linear-gradient(135deg, #a855f7, #ec4899); }
        .day-card.thu { background: linear-gradient(135deg, #f43f5e, #ef4444); }
        .day-card.fri { background: linear-gradient(135deg, #22c55e, #eab308); }
        .day-card.sat { background: linear-gradient(135deg, #06b6d4, #3b82f6); }
        
        .code-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
        }
        
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
    `]
})
export class SwitchControlFlowComponent {
    status = signal<Status>('idle');
    role = signal<Role>('admin');
    dayOfWeek = signal(new Date().getDay());

    changeDay(): void {
        this.dayOfWeek.set(Math.floor(Math.random() * 7));
    }
}
