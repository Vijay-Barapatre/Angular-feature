/**
 * INPUT SETTERS - CHILD COMPONENT
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: @Input() with Setters/Getters
 * -------------------------------------------------------------------------------
 * This component demonstrates how to use TypeScript setters and getters to allow
 * execution of logic WHENEVER an input property changes.
 * 
 * 🏗️ ARCHITECTURAL CONSIDERATIONS:
 * 1. **Interception**: Perfect for validating or sanitizing data *before* it gets assigned.
 * 2. **Derived State**: Ideal for updating other internal properties (like colors, icons)
 *    that depend on the input value.
 * 3. **Side Effects**: Can trigger actions like logging or analytics when a specific
 *    input changes, without using the broader `ngOnChanges` lifecycle hook.
 * 
 * 🚫 WHEN NOT TO USE:
 * - If you just need simple type conversion (string -> number), use Angular's `transform` feature (v16+).
 * - If you need to react to changes of MULTIPLE inputs together, use `ngOnChanges`.
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-use-case-7-child',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="badge-container" [style.borderColor]="statusColor">
      <div class="badge-header">
        <span class="icon">{{ statusIcon }}</span>
        <h3>Status Badge</h3>
      </div>
      
      <div class="badge-content">
        <p><strong>Raw Input:</strong> <code>{{ originalInput || 'undefined' }}</code></p>
        <p><strong>Processed (Getter):</strong> <span class="badge" [style.backgroundColor]="statusColor">{{ status }}</span></p>
        <p class="logs">
          <strong>Internal Log:</strong><br>
          <span *ngFor="let log of logs">{{ log }}<br></span>
        </p>
      </div>
    </div>
  `,
    styles: [`
    .badge-container {
      background: var(--bg-card);
      border-left: 5px solid; /* Color set dynamically */
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .badge-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .icon {
      font-size: 1.5rem;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 99px;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
    }

    .logs {
      margin-top: 15px;
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--text-muted);
      background: rgba(0,0,0,0.2);
      padding: 10px;
      border-radius: 4px;
    }
  `]
})
export class UseCase7ChildComponent {

    // Internal private property to hold the actual value
    private _status: string = 'pending';

    // Derived state properties
    public statusColor: string = '#ffd700'; // Default gold
    public statusIcon: string = '⏳';
    public originalInput: string = '';
    public logs: string[] = [];

    /**
     * 🔑 THE PATTERN: @Input Setter
     * Intercepts the assignment from the parent.
     */
    @Input()
    set status(value: string) {
        this.originalInput = value;
        this.addLog(`Input Received: "${value}"`);

        // 1. Sanitize / Normalize
        // Remove whitespace and convert to lowercase for consistent comparison
        const normalized = (value || '').trim().toLowerCase();

        // 2. Validate & Assign
        // Only allow specific states, otherwise fallback to 'unknown'
        const allowedStatuses = ['active', 'inactive', 'pending', 'error'];

        if (allowedStatuses.includes(normalized)) {
            this._status = normalized;
            this.addLog(`✅ Accepted status: "${normalized}"`);
        } else {
            this._status = 'unknown';
            this.addLog(`⚠️ Invalid status. Fallback to: "unknown"`);
        }

        // 3. Trigger Side Effects / Update Derived State
        this.updateVisuals(this._status);
    }

    /**
     * 🔑 THE PATTERN: Getter
     * Returns the private property when accessed.
     */
    get status(): string {
        return this._status;
    }

    // Helper to update derived UI state based on the status
    private updateVisuals(status: string) {
        switch (status) {
            case 'active':
                this.statusColor = '#4ade80'; // Green
                this.statusIcon = '✅';
                break;
            case 'inactive':
                this.statusColor = '#94a3b8'; // Grey
                this.statusIcon = '💤';
                break;
            case 'error':
                this.statusColor = '#f87171'; // Red
                this.statusIcon = '🚨';
                break;
            case 'pending':
                this.statusColor = '#facc15'; // Yellow
                this.statusIcon = '⏳';
                break;
            default: // unknown
                this.statusColor = '#c084fc'; // Purple
                this.statusIcon = '❓';
        }
    }

    private addLog(msg: string) {
        const time = new Date().toLocaleTimeString().split(' ')[0];
        this.logs.unshift(`[${time}] ${msg}`);
        if (this.logs.length > 3) this.logs.pop(); // Keep last 3
    }
}
