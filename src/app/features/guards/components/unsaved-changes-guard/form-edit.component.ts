
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CanComponentDeactivate } from './unsaved-changes.guard';

@Component({
    selector: 'app-form-edit',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
    <div class="form-container" [class.dirty]="isDirty">
      <h1>💾 Form Editor (CanDeactivate)</h1>
      <p>Try typing below and then navigating away (e.g., click Back).</p>

      <div class="editor">
        <label>Importance Notes:</label>
        <textarea 
          [(ngModel)]="notes" 
          (ngModelChange)="onNotesChange()"
          rows="5"
          placeholder="Type something here to trigger dirty state...">
        </textarea>
      </div>

      <div class="status-bar">
        <span>Status: </span>
        <strong [class.unsaved]="isDirty" [class.saved]="!isDirty">
          {{ isDirty ? '⚠️ Unsaved Changes' : '✅ Saved' }}
        </strong>
      </div>

      <div class="actions">
        <button (click)="save()" [disabled]="!isDirty">Save Changes</button>
        <a routerLink="/guards" class="link">Try Navigating Away (Back)</a>
      </div>
    </div>
  `,
    styles: [`
    .form-container {
      padding: 30px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      max-width: 600px;
      transition: border-color 0.3s;
    }

    .form-container.dirty {
      border-color: #f59e0b; /* Amber */
      background: #fffbeb;
    }

    textarea {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .status-bar {
      margin: 15px 0;
      font-size: 1.1rem;
    }

    .unsaved { color: #d97706; }
    .saved { color: #16a34a; }

    button {
      padding: 8px 16px;
      background: #16a34a;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: #cbd5e1;
      cursor: not-allowed;
    }

    .link {
      margin-left: 15px;
      color: #2563eb;
    }
  `]
})
export class FormEditComponent implements CanComponentDeactivate {
    notes: string = '';
    isDirty: boolean = false;

    onNotesChange() {
        this.isDirty = true;
    }

    save() {
        this.isDirty = false;
        // Simulate save logic including delay
        setTimeout(() => alert('Saved successfully!'), 100);
    }

    // Implementation of the interface for the Guard
    hasUnsavedChanges(): boolean {
        return this.isDirty;
    }
}
