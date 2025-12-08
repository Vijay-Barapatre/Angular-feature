/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: GENERIC FORM DIRTY CHECK
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-scenario-4-form-dirty',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Generic Form Dirty Check</h2>
                <p>Create a reusable guard that works with any form component.</p>
            </div>

            <div class="content">
                <div class="interface-box">
                    <h4>🔧 FormComponent Interface</h4>
                    <pre><code>interface FormComponent {{ '{' }}
  isDirty(): boolean;
  formName: string;
{{ '}' }}</code></pre>
                </div>

                <div class="tabs">
                    @for (tab of tabs; track tab.id; let i = $index) {
                        <button 
                            [class.active]="activeTab() === i"
                            (click)="switchTab(i)">
                            {{ tab.icon }} {{ tab.name }}
                            @if (tab.dirty) {
                                <span class="dirty-dot"></span>
                            }
                        </button>
                    }
                </div>

                <div class="form-area">
                    @if (activeTab() === 0) {
                        <div class="form-content">
                            <h4>Profile Form</h4>
                            <input [(ngModel)]="profileData.name" (input)="markDirty(0)" placeholder="Name">
                            <input [(ngModel)]="profileData.email" (input)="markDirty(0)" placeholder="Email">
                        </div>
                    }
                    @if (activeTab() === 1) {
                        <div class="form-content">
                            <h4>Settings Form</h4>
                            <label><input type="checkbox" [(ngModel)]="settingsData.notifications" (change)="markDirty(1)"> Notifications</label>
                            <label><input type="checkbox" [(ngModel)]="settingsData.darkMode" (change)="markDirty(1)"> Dark Mode</label>
                        </div>
                    }
                    @if (activeTab() === 2) {
                        <div class="form-content">
                            <h4>Payment Form</h4>
                            <input [(ngModel)]="paymentData.card" (input)="markDirty(2)" placeholder="Card Number">
                        </div>
                    }
                </div>

                <button (click)="saveCurrentForm()" class="btn-save">
                    💾 Save {{ tabs[activeTab()].name }}
                </button>

                @if (switchAttempt() !== null) {
                    <div class="confirm-dialog">
                        <div class="dialog-content">
                            <h4>⚠️ Unsaved Changes</h4>
                            <p>{{ tabs[activeTab()].name }} has unsaved changes.</p>
                            <div class="dialog-actions">
                                <button (click)="confirmSwitch()" class="btn-discard">Discard</button>
                                <button (click)="cancelSwitch()" class="btn-stay">Keep Editing</button>
                            </div>
                        </div>
                    </div>
                }

                <div class="code-preview">
                    <h4>Generic Guard</h4>
                    <pre><code>export const formDirtyGuard: CanDeactivateFn&lt;FormComponent&gt; =
  (component) => {{ '{' }}
    if (!component.isDirty()) {{ '{' }}
      return true;
    {{ '}' }}
    
    return inject(DialogService).confirm({{ '{' }}
      title: 'Unsaved Changes',
      message: \`\${{ '{' }}component.formName{{ '}' }} has unsaved changes.\`
    {{ '}' }});
  {{ '}' }};</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .interface-box { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .interface-box h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .interface-box pre { margin: 0; }
        .interface-box code { color: #a6e3a1; font-size: 0.85rem; }
        .tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .tabs button { padding: 0.75rem 1.5rem; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 8px 8px 0 0; cursor: pointer; position: relative; }
        .tabs button.active { background: white; border-bottom-color: white; }
        .dirty-dot { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; }
        .form-area { padding: 1.5rem; border: 2px solid #e5e7eb; border-radius: 0 8px 8px 8px; margin-bottom: 1rem; }
        .form-content h4 { margin: 0 0 1rem; }
        .form-content input[type="text"], .form-content input:not([type]) { display: block; width: 100%; padding: 0.75rem; margin-bottom: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .form-content label { display: block; padding: 0.5rem 0; cursor: pointer; }
        .btn-save { width: 100%; padding: 0.75rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 1rem; }
        .confirm-dialog { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .dialog-content { background: white; padding: 2rem; border-radius: 12px; max-width: 400px; text-align: center; }
        .dialog-content h4 { margin: 0 0 0.5rem; }
        .dialog-content p { margin: 0 0 1.5rem; color: #6b7280; }
        .dialog-actions { display: flex; gap: 0.5rem; }
        .btn-discard { flex: 1; padding: 0.75rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .btn-stay { flex: 1; padding: 0.75rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario4FormDirtyComponent {
    tabs = [
        { id: 0, name: 'Profile', icon: '👤', dirty: false },
        { id: 1, name: 'Settings', icon: '⚙️', dirty: false },
        { id: 2, name: 'Payment', icon: '💳', dirty: false }
    ];

    activeTab = signal(0);
    switchAttempt = signal<number | null>(null);

    profileData = { name: '', email: '' };
    settingsData = { notifications: true, darkMode: false };
    paymentData = { card: '' };

    markDirty(tabIndex: number): void {
        this.tabs[tabIndex].dirty = true;
    }

    switchTab(index: number): void {
        if (this.tabs[this.activeTab()].dirty) {
            this.switchAttempt.set(index);
        } else {
            this.activeTab.set(index);
        }
    }

    confirmSwitch(): void {
        const targetTab = this.switchAttempt();
        this.tabs[this.activeTab()].dirty = false;
        this.switchAttempt.set(null);
        if (targetTab !== null) {
            this.activeTab.set(targetTab);
        }
    }

    cancelSwitch(): void {
        this.switchAttempt.set(null);
    }

    saveCurrentForm(): void {
        this.tabs[this.activeTab()].dirty = false;
    }
}
