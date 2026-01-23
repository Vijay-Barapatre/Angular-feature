/**
 * MULTIPLE I/O - PARENT COMPONENT
 * 
 * Demonstrates:
 * 1. Handling multiple outputs from a single component
 * 2. Updating state based on complex events
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase6ChildComponent, UserData } from './child.component';

@Component({
  selector: 'app-use-case-6-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, UseCase6ChildComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/input-output" class="back-link">← Back to Overview</a>
        <h1>Multiple Inputs & Outputs</h1>
        <p>Managing complex component APIs with multiple data points.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 User Profile (Parent)</h2>
            
            <div class="profile-display">
              <div class="row">
                <span class="label">Username:</span>
                <span class="value">{{ user.username }}</span>
              </div>
              <div class="row">
                <span class="label">Bio:</span>
                <span class="value">{{ user.bio || '(No bio)' }}</span>
              </div>
              <div class="row">
                <span class="label">Notifications:</span>
                <span class="value" [class.on]="user.notifications">
                  {{ user.notifications ? 'ON' : 'OFF' }}
                </span>
              </div>
            </div>

            <div class="log-section">
              <h3>Activity Log</h3>
              <div class="logs">
                <div *ngFor="let log of logs" class="log-entry">
                  {{ log }}
                </div>
                <div *ngIf="logs.length === 0" class="empty-log">No activity yet</div>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <app-use-case-6-child
            [username]="user.username"
            [bio]="user.bio"
            [notifications]="user.notifications"
            (save)="onSave($event)"
            (cancel)="onCancel()"
            (fieldChange)="onFieldChange($event)">
          </app-use-case-6-child>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../use-case-1/parent.component.css';

    .profile-display {
      background: rgba(255,255,255,0.05);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-lg);
    }

    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .label { color: var(--text-muted); }
    .value { font-weight: bold; }
    .value.on { color: var(--success); }

    .logs {
      max-height: 200px;
      overflow-y: auto;
      background: #1e293b;
      padding: 10px;
      border-radius: 4px;
    }

    .log-entry {
      font-family: monospace;
      font-size: 0.85rem;
      margin-bottom: 4px;
      color: #94a3b8;
    }
  `]
})
export class UseCase6ParentComponent {
  user: UserData = {
    username: 'angular_fan',
    bio: 'I love building web apps!',
    notifications: true
  };

  logs: string[] = [];

  onSave(newData: UserData) {
    this.user = newData;
    this.addLog('✅ Saved changes');
  }

  onCancel() {
    this.addLog('❌ Cancelled editing');
  }

  onFieldChange(fieldName: string) {
    this.addLog(`📝 User is typing in: ${fieldName}`);
  }

  private addLog(msg: string) {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift(`[${time}] ${msg}`);
    if (this.logs.length > 10) this.logs.pop();
  }
}
