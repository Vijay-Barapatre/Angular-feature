/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 6: REACTIVE FORMS + SIGNALS INTEROP
 * ============================================================================
 * 
 * LEARNING GOAL:
 * Bridge Reactive Forms with Angular Signals using toSignal(), computed(),
 * and effect() for derived state and side effects.
 */

import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-exercise-6-signals-interop',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 6: Forms + Signals Interop</h2>
                <p>Connect Reactive Forms streams to Angular Signals.</p>
                <ul>
                    <li>✅ toSignal() - Observable → Signal</li>
                    <li>✅ computed() - Derived state</li>
                    <li>✅ effect() - Side effects</li>
                </ul>
            </div>

            <div class="demo">
                <h3>Tweet Composer (Character Limit)</h3>
                <form [formGroup]="tweetForm">
                    <div class="form-group">
                        <label>Your Tweet</label>
                        <textarea 
                            formControlName="content" 
                            rows="4" 
                            placeholder="What's happening?"></textarea>
                        
                        <div class="char-counter" [class.over-limit]="isOverLimit()">
                            <span>{{ charCount() }} / {{ MAX_CHARS }}</span>
                            <span [class.warning]="isNearLimit()">
                                {{ remaining() }} characters remaining
                            </span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Visibility</label>
                        <select formControlName="visibility">
                            <option value="public">🌍 Public</option>
                            <option value="followers">👥 Followers Only</option>
                            <option value="private">🔒 Private</option>
                        </select>
                    </div>

                    <button type="submit" [disabled]="isOverLimit() || tweetForm.invalid">
                        Post Tweet
                    </button>
                </form>
            </div>

            <div class="signal-display">
                <h4>📡 Live Signal Values</h4>
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
                        <span class="label">isOverLimit()</span>
                        <span class="value">{{ isOverLimit() }}</span>
                    </div>
                    <div class="signal-item">
                        <span class="label">visibility()</span>
                        <span class="value">{{ visibility() }}</span>
                    </div>
                </div>
            </div>

            <div class="effect-log">
                <h4>⚡ Effect Log (Side Effects)</h4>
                <div class="log-entries">
                    @for (log of effectLogs; track $index) {
                        <div class="log-entry">{{ log }}</div>
                    }
                    @empty {
                        <div class="empty">Type to trigger effects...</div>
                    }
                </div>
            </div>

            <div class="challenge">
                <h4>🎯 Challenge Tasks:</h4>
                <ol>
                    <li>Add a "hashtags" computed signal that extracts all #hashtags from the content</li>
                    <li>Create an effect that saves the draft to localStorage every 2 seconds</li>
                    <li>Add a statusSignal from tweetForm.statusChanges</li>
                </ol>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #3b82f6; }
        .instructions ul { margin: 0.5rem 0 0; padding-left: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }
        .demo h3 { margin-top: 0; color: #1f2937; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group textarea, .form-group select { 
            width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; 
            border-radius: 6px; box-sizing: border-box; font-family: inherit; 
        }
        .char-counter { display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.85rem; color: #6b7280; }
        .char-counter.over-limit { color: #ef4444; font-weight: bold; }
        .char-counter .warning { color: #f59e0b; }
        button { 
            width: 100%; padding: 0.75rem; background: #1da1f2; color: white; 
            border: none; border-radius: 6px; cursor: pointer; font-weight: 600; 
        }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .signal-display { background: #1f2937; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .signal-display h4 { margin: 0 0 0.75rem; color: #9ca3af; }
        .signal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
        .signal-item { display: flex; justify-content: space-between; background: #374151; padding: 0.5rem 0.75rem; border-radius: 4px; }
        .signal-item .label { color: #9ca3af; font-size: 0.8rem; }
        .signal-item .value { color: #4ade80; font-family: monospace; }
        .signal-item .value.negative { color: #ef4444; }
        
        .effect-log { background: #fef3c7; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .effect-log h4 { margin: 0 0 0.5rem; color: #b45309; }
        .log-entries { max-height: 120px; overflow-y: auto; }
        .log-entry { font-size: 0.8rem; padding: 0.25rem 0; border-bottom: 1px solid #fcd34d; font-family: monospace; }
        .empty { color: #92400e; font-style: italic; }
        
        .challenge { background: #f0fdf4; padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; }
        .challenge h4 { margin: 0 0 0.5rem; color: #166534; }
        .challenge ol { margin: 0; padding-left: 1.5rem; }
    `]
})
export class Exercise6SignalsInteropComponent {
    private fb = inject(FormBuilder);
    readonly MAX_CHARS = 280;
    effectLogs: string[] = [];

    // Step 1: Create the form
    tweetForm = this.fb.group({
        content: ['', [Validators.required, Validators.maxLength(this.MAX_CHARS)]],
        visibility: ['public']
    });

    /**
     * TODO 1: Convert valueChanges to Signal
     * 
     * toSignal() subscribes to the observable and creates a signal.
     * IMPORTANT: Provide initialValue because valueChanges doesn't emit current value!
     */
    contentSignal = toSignal(
        this.tweetForm.controls.content.valueChanges,
        { initialValue: '' }
    );

    visibilitySignal = toSignal(
        this.tweetForm.controls.visibility.valueChanges,
        { initialValue: 'public' }
    );

    /**
     * TODO 2: Create computed signals for derived state
     * 
     * computed() creates read-only signals that auto-update when dependencies change.
     * No RxJS operators needed - just plain JavaScript!
     */
    charCount = computed(() => (this.contentSignal() ?? '').length);
    remaining = computed(() => this.MAX_CHARS - this.charCount());
    isOverLimit = computed(() => this.remaining() < 0);
    isNearLimit = computed(() => this.remaining() < 20 && this.remaining() >= 0);
    visibility = computed(() => this.visibilitySignal() ?? 'public');

    constructor() {
        /**
         * TODO 3: Create effects for side effects
         * 
         * effect() runs whenever its signal dependencies change.
         * Use for logging, analytics, localStorage, etc.
         */
        effect(() => {
            const count = this.charCount();
            if (count > 0 && count % 50 === 0) {
                this.addLog(`📊 Milestone: ${count} characters typed`);
            }
        });

        effect(() => {
            if (this.isOverLimit()) {
                this.addLog(`⚠️ WARNING: Over character limit! (${this.charCount()}/${this.MAX_CHARS})`);
            }
        });

        effect(() => {
            const vis = this.visibility();
            this.addLog(`👁️ Visibility changed to: ${vis}`);
        });
    }

    private addLog(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.effectLogs.unshift(`${timestamp} - ${message}`);
        if (this.effectLogs.length > 10) {
            this.effectLogs.pop();
        }
    }
}
