import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-signals-interop',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>🚦 Reactive Forms + Signals</h1>
            <p class="description">
                Using <code>toSignal</code> to bridge RxJS form streams into the Signals world.
            </p>

            <form [formGroup]="form" class="form">
                <div class="form-group">
                    <label>Tweet / Message</label>
                    <textarea formControlName="message" rows="4"></textarea>
                    
                    <!-- Using Computed Signals for UI Logic -->
                    <div class="stats" [class.over-limit]="isOverLimit()">
                        <span>{{ charCount() }} / {{ MAX_CHARS }} chars</span>
                        <span>{{ remaining() }} remaining</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Theme Color (Real-time)</label>
                    <select formControlName="theme">
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                        <option value="blue">Blue Mode</option>
                    </select>
                </div>
            </form>

            <div class="preview-box" [ngClass]="currentTheme()">
                <h3>Live Preview</h3>
                <p>{{ messageDisplay() }}</p>
                <small>Updated via Signals</small>
            </div>

            <div class="logs">
                <h3>Console Logs (Effect)</h3>
                <div *ngFor="let log of logs">{{ log }}</div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .form { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .form-group { margin-bottom: 1.5rem; }
        textarea, select { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; }
        .stats { display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.9rem; color: #666; font-weight: bold; }
        .stats.over-limit { color: #dc2626; }
        
        .preview-box { padding: 2rem; border-radius: 12px; border: 2px dashed #ccc; transition: all 0.3s ease; }
        .preview-box.light { background: white; color: black; }
        .preview-box.dark { background: #1a1a2e; color: white; border-color: #4ade80; }
        .preview-box.blue { background: #e0f2fe; color: #0369a1; border-color: #0ea5e9; }

        .logs { background: #f8f9fa; padding: 1rem; margin-top: 2rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; }
    `]
})
export class SignalsInteropComponent {
    private fb = inject(FormBuilder);
    readonly MAX_CHARS = 140;
    logs: string[] = [];

    // 1. Create the Form
    form = this.fb.group({
        message: ['', Validators.required],
        theme: ['light', Validators.required]
    });

    /**
     * 2. CONVERT STREAMS TO SIGNALS
     * toSignal subscribes immediately and unsubscribes on destroy.
     * We convert specific control streams to granular signals.
     */
    messageSignal = toSignal(this.form.controls.message.valueChanges, { initialValue: '' });
    themeSignal = toSignal(this.form.controls.theme.valueChanges, { initialValue: 'light' });

    // 3. COMPUTED VALUES (Derived State)
    charCount = computed(() => (this.messageSignal() ?? '').length);
    remaining = computed(() => this.MAX_CHARS - this.charCount());
    isOverLimit = computed(() => this.remaining() < 0);

    // Derived Display Logic
    currentTheme = computed(() => this.themeSignal() ?? 'light');
    messageDisplay = computed(() => {
        const msg = this.messageSignal();
        return msg ? msg : '(Start typing to see preview...)';
    });

    constructor() {
        // 4. EFFECTS (Side Effects)
        effect(() => {
            // This runs whenever `isOverLimit` changes state
            if (this.isOverLimit()) {
                this.addLog(`⚠️ WARNING: User exceeded character limit! Count: ${this.charCount()}`);
            }
        });

        effect(() => {
            // Logs theme changes
            const theme = this.currentTheme();
            this.addLog(`🎨 Theme changed to: ${theme}`);
        });
    }

    addLog(msg: string) {
        this.logs.unshift(`${new Date().toLocaleTimeString()}: ${msg}`);
        if (this.logs.length > 5) this.logs.pop();
    }
}
