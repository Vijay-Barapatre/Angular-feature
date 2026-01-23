/**
 * MULTIPLE I/O - CHILD COMPONENT
 * 
 * Demonstrates:
 * 1. Managing multiple Inputs and Outputs
 * 2. Form-like behavior without Forms module (for learning)
 * 3. Emitting different events for different actions
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserData {
  username: string;
  bio: string;
  notifications: boolean;
}

@Component({
  selector: 'app-use-case-6-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="editor-card">
      <h3>👶 Profile Editor</h3>
      
      <div class="form-group">
        <label>Username</label>
        <input 
          [value]="username" 
          (input)="updateUsername($event)"
          placeholder="Enter username">
      </div>

      <div class="form-group">
        <label>Bio</label>
        <textarea 
          [value]="bio"
          (input)="updateBio($event)"
          rows="3"
          placeholder="Tell us about yourself"></textarea>
      </div>

      <div class="form-group checkbox">
        <label>
          <input 
            type="checkbox" 
            [checked]="notifications"
            (change)="toggleNotifications()">
          Enable Notifications
        </label>
      </div>

      <div class="actions">
        <button (click)="onCancel()" class="btn-cancel">Cancel</button>
        <button (click)="onSave()" class="btn-save">Save Changes</button>
      </div>
    </div>
  `,
  styles: [`
    .editor-card {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .form-group {
      margin-bottom: var(--spacing-md);
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    input[type="text"], textarea {
      width: 100%;
      padding: 8px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: white;
      border-radius: 4px;
    }

    .checkbox {
      display: flex;
      align-items: center;
    }

    .checkbox input {
      margin-right: 10px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--border-color);
    }

    button {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-cancel {
      background: transparent;
      color: var(--text-muted);
      border: 1px solid var(--border-color);
    }

    .btn-save {
      background: var(--primary-color);
      color: white;
    }
  `]
})
export class UseCase6ChildComponent {
  // Multiple Inputs
  @Input() username: string = '';
  @Input() bio: string = '';
  @Input() notifications: boolean = false;

  // Multiple Outputs
  @Output() save = new EventEmitter<UserData>();
  @Output() cancel = new EventEmitter<void>();
  @Output() fieldChange = new EventEmitter<string>(); // Logs which field changed

  // Internal state tracking for form inputs
  // In a real app, we'd use Reactive Forms, but here we use manual binding
  // to demonstrate the Input/Output flow explicitly.

  tempUsername: string = '';
  tempBio: string = '';
  tempNotif: boolean = false;

  /**
   * Why ngOnChanges?
   * 
   * 1. Multi-Input Synchronization:
   *    We have 3 separate Inputs (username, bio, notifications).
   *    If we used setters for each, we'd have to repeat the sync logic 3 times
   *    or call a shared method 3 times. ngOnChanges runs ONCE per cycle
   *    even if all 3 inputs update simultaneously.
   * 
   * 2. Initialization vs Updates:
   *    It handles both the first initialization and subsequent updates
   *    from the parent in a centralized place.
   * 
   * 3. Avoids "Setter Soup":
   *    With many inputs, having a setter for each just to copy to a temp
   *    variable can be verbose and hard to read.
   * 
   * NOTE: It WOULD work without ngOnChanges, but you would need 3 separate setters
   * that each call a sync method. ngOnChanges is cleaner for >2 inputs.
   * 
   * WARNING: If you use NEITHER (just ngOnInit), your component will NOT update
   * when the parent data changes later (e.g. after an API call).
   */
  ngOnChanges() {
    // Sync inputs to temp state when they change from parent
    this.tempUsername = this.username;
    this.tempBio = this.bio;
    this.tempNotif = this.notifications;
  }

  updateUsername(e: Event) {
    this.tempUsername = (e.target as HTMLInputElement).value;
    this.fieldChange.emit('username');
  }

  updateBio(e: Event) {
    this.tempBio = (e.target as HTMLTextAreaElement).value;
    this.fieldChange.emit('bio');
  }

  toggleNotifications() {
    this.tempNotif = !this.tempNotif;
    this.fieldChange.emit('notifications');
  }

  onSave() {
    this.save.emit({
      username: this.tempUsername,
      bio: this.tempBio,
      notifications: this.tempNotif
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
