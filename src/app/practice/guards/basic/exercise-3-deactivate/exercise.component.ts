/**
 * ============================================================================
 * 🟦 EXERCISE 3: UNSAVED CHANGES GUARD (CanDeactivate)
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-3-deactivate',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Unsaved Changes Guard</h2>
                <p>Implement a guard that prevents leaving with unsaved changes.</p>
                
                <div class="task-list">
                    <h4>📋 Tasks:</h4>
                    <ul>
                        <li>Track form changes with <code>isDirty</code> state</li>
                        <li>Implement <code>canDeactivate()</code> method</li>
                        <li>Show confirmation when navigating with unsaved changes</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Form with Unsaved Changes Protection</h3>
                
                <div class="form-container">
                    <div class="form-header">
                        <h4>Edit Profile</h4>
                        <span class="status" [class.dirty]="isDirty()">
                            {{ isDirty() ? '⚠️ Unsaved Changes' : '✅ Saved' }}
                        </span>
                    </div>
                    
                    <div class="form-body">
                        <div class="form-group">
                            <label>Name</label>
                            <input 
                                [(ngModel)]="formData.name" 
                                (input)="markDirty()"
                                placeholder="Enter name">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input 
                                [(ngModel)]="formData.email" 
                                (input)="markDirty()"
                                placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label>Bio</label>
                            <textarea 
                                [(ngModel)]="formData.bio" 
                                (input)="markDirty()"
                                rows="3"
                                placeholder="Tell us about yourself"></textarea>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button (click)="save()" class="btn-save">💾 Save Changes</button>
                        <button (click)="reset()" class="btn-reset">🔄 Reset</button>
                    </div>
                </div>

                <div class="navigation-demo">
                    <h4>Try to Navigate Away:</h4>
                    <div class="nav-links">
                        <button (click)="tryNavigate('/home')">🏠 Home</button>
                        <button (click)="tryNavigate('/dashboard')">📊 Dashboard</button>
                        <button (click)="tryNavigate('/settings')">⚙️ Settings</button>
                    </div>
                </div>

                @if (navigationAttempt()) {
                    <div class="confirm-dialog">
                        <div class="dialog-content">
                            <h4>⚠️ Unsaved Changes</h4>
                            <p>You have unsaved changes. Do you want to discard them?</p>
                            <div class="dialog-actions">
                                <button (click)="confirmNavigation()" class="btn-discard">
                                    Discard & Leave
                                </button>
                                <button (click)="cancelNavigation()" class="btn-stay">
                                    Keep Editing
                                </button>
                            </div>
                        </div>
                    </div>
                }

                @if (navigationResult()) {
                    <div class="nav-result" [class.success]="navigationResult()?.allowed">
                        {{ navigationResult()?.message }}
                    </div>
                }

                <div class="code-preview">
                    <h4>Guard Implementation</h4>
                    <pre><code>export const unsavedChangesGuard: CanDeactivateFn&lt;CanDeactivate&gt; =
  (component) => {{ '{' }}
    if (component.canDeactivate()) {{ '{' }}
      return true;
    {{ '}' }}
    
    return window.confirm('Discard unsaved changes?');
  {{ '}' }};</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .task-list { background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .form-container { border: 2px solid #e5e7eb; border-radius: 12px; margin-bottom: 1.5rem; overflow: hidden; }
        .form-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8fafc; border-bottom: 1px solid #e5e7eb; }
        .form-header h4 { margin: 0; }
        .status { padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; background: #dcfce7; color: #16a34a; }
        .status.dirty { background: #fef3c7; color: #b45309; }
        .form-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .form-actions { padding: 1rem; background: #f8fafc; border-top: 1px solid #e5e7eb; display: flex; gap: 0.5rem; }
        .btn-save { flex: 1; padding: 0.75rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .btn-reset { padding: 0.75rem 1.5rem; background: #e5e7eb; border: none; border-radius: 6px; cursor: pointer; }
        .navigation-demo { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .navigation-demo h4 { margin: 0 0 0.75rem; }
        .nav-links { display: flex; gap: 0.5rem; }
        .nav-links button { padding: 0.5rem 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; }
        .confirm-dialog { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .dialog-content { background: white; padding: 2rem; border-radius: 12px; max-width: 400px; text-align: center; }
        .dialog-content h4 { margin: 0 0 0.5rem; }
        .dialog-content p { margin: 0 0 1.5rem; color: #6b7280; }
        .dialog-actions { display: flex; gap: 0.5rem; }
        .btn-discard { flex: 1; padding: 0.75rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .btn-stay { flex: 1; padding: 0.75rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .nav-result { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background: #fee2e2; color: #dc2626; }
        .nav-result.success { background: #dcfce7; color: #16a34a; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise3DeactivateComponent {
    formData = {
        name: '',
        email: '',
        bio: ''
    };

    private originalData = { ...this.formData };
    isDirty = signal(false);
    navigationAttempt = signal<string | null>(null);
    navigationResult = signal<{ allowed: boolean; message: string } | null>(null);

    markDirty(): void {
        this.isDirty.set(true);
    }

    save(): void {
        this.originalData = { ...this.formData };
        this.isDirty.set(false);
        this.navigationResult.set({ allowed: true, message: '✅ Changes saved!' });
    }

    reset(): void {
        this.formData = { ...this.originalData };
        this.isDirty.set(false);
    }

    // TODO: Implement canDeactivate
    canDeactivate(): boolean {
        // Return true if no unsaved changes
        // Return false if there are unsaved changes
        return !this.isDirty();
    }

    tryNavigate(path: string): void {
        this.navigationResult.set(null);

        if (this.canDeactivate()) {
            this.navigationResult.set({
                allowed: true,
                message: `✅ Navigating to ${path} - No unsaved changes`
            });
        } else {
            this.navigationAttempt.set(path);
        }
    }

    confirmNavigation(): void {
        const path = this.navigationAttempt();
        this.navigationAttempt.set(null);
        this.isDirty.set(false);
        this.navigationResult.set({
            allowed: true,
            message: `✅ Navigating to ${path} - Changes discarded`
        });
    }

    cancelNavigation(): void {
        this.navigationAttempt.set(null);
        this.navigationResult.set({
            allowed: false,
            message: '❌ Navigation cancelled - Keeping changes'
        });
    }
}
