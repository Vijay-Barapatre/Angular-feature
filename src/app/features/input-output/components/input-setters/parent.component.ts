/**
 * INPUT SETTERS - PARENT COMPONENT
 * 
 * Demonstrates:
 * - How parents can blindly pass data, while the Child is responsible
 *   for validating and sanitizing it via the Setter pattern.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase7ChildComponent } from './child.component';

@Component({
    selector: 'app-use-case-7-parent',
    standalone: true,
    imports: [CommonModule, RouterLink, UseCase7ChildComponent],
    template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/input-output" class="back-link">← Back to Overview</a>
        <h1>Input Setters</h1>
        <p>Using TypeScript setters to validate and sanitize inputs.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Controls</h2>
            <p>Send various values to the child. Notice how the child handles messy input!</p>
            
            <div class="control-group">
              <label>Preset Tests:</label>
              <div class="btn-grid">
                <!-- Happy Paths -->
                <button class="btn btn-success" (click)="currentStatus = 'active'">Active</button>
                <button class="btn btn-secondary" (click)="currentStatus = 'inactive'">Inactive</button>
                <button class="btn btn-warning" (click)="currentStatus = 'pending'">Pending</button>
                <button class="btn btn-danger" (click)="currentStatus = 'error'">Error</button>
                
                <!-- Messy Input Paths -->
                <button class="btn btn-outline" (click)="currentStatus = '  ACTIVE  '">"  ACTIVE  " (Spaces/Caps)</button>
                <button class="btn btn-outline" (click)="currentStatus = 'Pending'">"Pending" (Mixed Caps)</button>
                
                <!-- Invalid Path -->
                <button class="btn btn-outline" (click)="currentStatus = 'banned'">"Banned" (Invalid)</button>
                <button class="btn btn-outline" (click)="currentStatus = 'random123'">Random String</button>
              </div>
            </div>

            <div class="control-group">
              <label>Manual Input:</label>
              <div class="input-wrapper">
                <input type="text" 
                       [value]="currentStatus" 
                       (input)="updateStatus($event)"
                       placeholder="Type a status...">
              </div>
            </div>
            
            <div class="debug-info">
              <small>Parent sent: "{{ currentStatus }}"</small>
            </div>
          </div>
        </div>

        <div class="column">
          <app-use-case-7-child [status]="currentStatus"></app-use-case-7-child>
        </div>
      </div>
      
      <div class="explanation-section card">
        <h2>📚 Why use Setters?</h2>
        <p>
          Instead of the Parent having to clean the data (trim, lowercase, validate),
          the <strong>Child</strong> owns that logic in its Setter. This makes the Child component
          more robust and reusable because it protects itself from bad data.
        </p>
      </div>
    </div>
  `,
    styles: [`
    @import '../use-case-1/parent.component.css';

    .btn-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }

    .btn {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-success { background: #4ade80; color: #000; }
    .btn-secondary { background: #94a3b8; color: #fff; }
    .btn-warning { background: #facc15; color: #000; }
    .btn-danger { background: #f87171; color: #fff; }
    .btn-outline { 
      background: transparent; 
      border: 1px solid var(--border-color); 
      color: var(--text-primary);
    }
    .btn-outline:hover { background: rgba(255,255,255,0.1); }

    .input-wrapper input {
      width: 100%;
      padding: 10px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: white;
      border-radius: 4px;
    }

    .debug-info {
      margin-top: 10px;
      color: var(--text-muted);
      text-align: right;
    }
  `]
})
export class UseCase7ParentComponent {
    currentStatus: string = 'pending';

    updateStatus(event: Event) {
        this.currentStatus = (event.target as HTMLInputElement).value;
    }
}
