/**
 * ============================================================================
 * SIGNALS INTEGRATION IN TEMPLATE-DRIVEN FORMS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Even Template-Driven Forms can benefit from Angular Signals! The key is to
 * bridge the NgForm observables to signals using toSignal() after the view
 * initializes.
 * 
 * APPROACH:
 * 1. Get NgForm via @ViewChild
 * 2. Convert valueChanges/statusChanges to signals in AfterViewInit
 * 3. Use computed() for derived state
 * 4. Use effect() for side effects
 */

import { Component, ViewChild, AfterViewInit, computed, signal, effect, Injector, inject, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith, map } from 'rxjs';

@Component({
    selector: 'app-signals-integration',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
        <div class="form-container">
            <h1>🚦 Signals Integration</h1>
            <p class="desc">
                Bridge Template-Driven Forms with Angular Signals for reactive UI.
            </p>

            <form #messageForm="ngForm">
                <div class="form-group">
                    <label>Your Message</label>
                    <textarea 
                        name="content"
                        [(ngModel)]="model.content"
                        rows="4"
                        placeholder="Type your message..."
                        maxlength="280"
                    ></textarea>
                    
                    <!-- Character counter using signals -->
                    <div class="char-counter" [class.warning]="isNearLimit()" [class.over]="isOverLimit()">
                        <span>{{ charCount() }} / {{ MAX_CHARS }}</span>
                        <span>{{ remaining() }} remaining</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Priority</label>
                    <select name="priority" [(ngModel)]="model.priority">
                        <option value="low">🟢 Low</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="high">🔴 High</option>
                    </select>
                </div>

                <button type="submit" [disabled]="!canSubmit()">
                    Send Message
                </button>
            </form>

            <!-- Signal Values Display -->
            <div class="signal-display">
                <h3>📡 Live Signal Values</h3>
                <div class="signal-grid">
                    <div class="signal-item">
                        <span class="label">charCount()</span>
                        <span class="value">{{ charCount() }}</span>
                    </div>
                    <div class="signal-item">
                        <span class="label">remaining()</span>
                        <span class="value" [class.negative]="remaining() < 0">{{ remaining() }}</span>
                    </div>
                    <div class="signal-item">
                        <span class="label">priority()</span>
                        <span class="value">{{ priority() }}</span>
                    </div>
                    <div class="signal-item">
                        <span class="label">formStatus()</span>
                        <span class="value">{{ formStatus() }}</span>
                    </div>
                    <div class="signal-item">
                        <span class="label">canSubmit()</span>
                        <span class="value" [class.active]="canSubmit()">{{ canSubmit() }}</span>
                    </div>
                </div>
            </div>

            <!-- Effect Logs -->
            <div class="effect-log">
                <h3>⚡ Effect Log</h3>
                <div class="log-entries">
                    @for (log of effectLogs; track $index) {
                        <div class="log-entry">{{ log }}</div>
                    }
                </div>
            </div>

            <div class="info-box">
                <h4>💡 Implementation Notes</h4>
                <ul>
                    <li>Use <code>runInInjectionContext()</code> since we're in AfterViewInit</li>
                    <li><code>toSignal()</code> automatically unsubscribes on destroy</li>
                    <li><code>computed()</code> for derived values (charCount, remaining)</li>
                    <li><code>effect()</code> for side effects (logging, analytics)</li>
                </ul>
            </div>

            <a routerLink="/template-forms" class="back-link">← Back to Overview</a>
        </div>
    `,
    styles: [`
        .form-container {
            max-width: 650px;
            margin: 30px auto;
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }

        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: 500; }

        textarea, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            font-family: inherit;
            box-sizing: border-box;
        }

        .char-counter {
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: #6b7280;
        }
        .char-counter.warning { color: #f59e0b; font-weight: bold; }
        .char-counter.over { color: #ef4444; font-weight: bold; }

        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        }
        button:disabled { opacity: 0.5; cursor: not-allowed; }

        .signal-display {
            background: #1e293b;
            padding: 1rem;
            border-radius: 8px;
            margin: 1.5rem 0;
        }
        .signal-display h3 { margin: 0 0 0.75rem; color: #94a3b8; }
        .signal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
        .signal-item {
            display: flex;
            justify-content: space-between;
            background: #334155;
            padding: 0.5rem 0.75rem;
            border-radius: 4px;
        }
        .signal-item .label { color: #94a3b8; font-size: 0.8rem; }
        .signal-item .value { color: #4ade80; font-family: monospace; }
        .signal-item .value.negative { color: #ef4444; }
        .signal-item .value.active { color: #22c55e; }

        .effect-log {
            background: #fef3c7;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .effect-log h3 { margin: 0 0 0.5rem; color: #b45309; }
        .log-entries { max-height: 100px; overflow-y: auto; }
        .log-entry {
            font-size: 0.8rem;
            padding: 0.25rem 0;
            border-bottom: 1px solid #fcd34d;
            font-family: monospace;
        }

        .info-box {
            background: #f0fdf4;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #22c55e;
        }
        .info-box h4 { margin: 0 0 0.5rem; color: #166534; }
        .info-box ul { margin: 0; padding-left: 1.5rem; }
        code { background: #dcfce7; padding: 0.1rem 0.3rem; border-radius: 3px; }

        .back-link {
            display: block;
            margin-top: 20px;
            text-align: center;
            color: var(--primary-color);
            text-decoration: none;
        }
    `]
})
export class SignalsIntegrationComponent implements AfterViewInit {
    private injector = inject(Injector);

    @ViewChild('messageForm') messageForm!: NgForm;

    readonly MAX_CHARS = 280;
    effectLogs: string[] = [];

    model = {
        content: '',
        priority: 'medium'
    };

    /**
     * These signals will be initialized in AfterViewInit.
     * We start with basic signals and update them once the form is available.
     */
    contentSignal = signal('');
    prioritySignal = signal('medium');
    formStatusSignal = signal('INVALID');

    // Computed signals for derived state
    charCount = computed(() => this.contentSignal().length);
    remaining = computed(() => this.MAX_CHARS - this.charCount());
    isNearLimit = computed(() => this.remaining() < 30 && this.remaining() >= 0);
    isOverLimit = computed(() => this.remaining() < 0);
    priority = computed(() => this.prioritySignal());
    formStatus = computed(() => this.formStatusSignal());
    canSubmit = computed(() =>
        this.formStatus() === 'VALID' &&
        this.charCount() > 0 &&
        !this.isOverLimit()
    );

    constructor() {
        // Set up effects in constructor (injection context)
        effect(() => {
            const count = this.charCount();
            if (count > 0 && count % 50 === 0) {
                this.addLog(`📊 Milestone: ${count} characters`);
            }
        });

        effect(() => {
            if (this.isOverLimit()) {
                this.addLog(`⚠️ Over limit: ${this.charCount()}/${this.MAX_CHARS}`);
            }
        });

        effect(() => {
            const p = this.priority();
            this.addLog(`🎯 Priority changed to: ${p}`);
        });
    }

    ngAfterViewInit(): void {
        // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => this.initializeSignals());
    }

    private initializeSignals(): void {
        // Get observables from the form
        const contentChanges$ = this.messageForm.valueChanges!.pipe(
            startWith(this.messageForm.value),
            map(v => v?.content ?? '')
        );

        const priorityChanges$ = this.messageForm.valueChanges!.pipe(
            startWith(this.messageForm.value),
            map(v => v?.priority ?? 'medium')
        );

        const statusChanges$ = this.messageForm.statusChanges!.pipe(
            startWith(this.messageForm.status)
        );

        // Convert to signals using runInInjectionContext
        runInInjectionContext(this.injector, () => {
            const contentSig = toSignal(contentChanges$, { initialValue: '' });
            const prioritySig = toSignal(priorityChanges$, { initialValue: 'medium' });
            const statusSig = toSignal(statusChanges$, { initialValue: 'INVALID' });

            // Update our component signals
            effect(() => {
                this.contentSignal.set(contentSig() ?? '');
                this.prioritySignal.set(prioritySig() ?? 'medium');
                this.formStatusSignal.set(statusSig() ?? 'INVALID');
            }, { allowSignalWrites: true });
        });
    }

    private addLog(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.effectLogs.unshift(`${timestamp}: ${message}`);
        if (this.effectLogs.length > 8) {
            this.effectLogs.pop();
        }
    }
}
