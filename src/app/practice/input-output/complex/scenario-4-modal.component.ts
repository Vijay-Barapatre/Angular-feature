/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: MODAL DIALOG
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * Build a reusable modal component with configurable content.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="modal-backdrop" *ngIf="isOpen" (click)="onBackdropClick()">
            <div class="modal-content" (click)="$event.stopPropagation()">
                <div class="modal-header">
                    <h3>{{ title }}</h3>
                    <button class="close-btn" (click)="close()">×</button>
                </div>
                <div class="modal-body">
                    <ng-content></ng-content>
                </div>
                <div class="modal-footer">
                    <button (click)="close()">Cancel</button>
                    <button class="primary" (click)="confirm()">Confirm</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; border-radius: 12px; min-width: 400px; max-width: 90%; max-height: 90vh; overflow: hidden; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e5e7eb; }
        .modal-header h3 { margin: 0; }
        .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
        .modal-body { padding: 1.5rem; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1rem; border-top: 1px solid #e5e7eb; }
        button { padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; }
        button.primary { background: #10b981; color: white; border: none; }
    `]
})
export class ModalComponent {
    // TODO: @Input() isOpen = false;
    // TODO: @Input() title = 'Modal';
    // TODO: @Output() closed = new EventEmitter<void>();
    // TODO: @Output() confirmed = new EventEmitter<void>();

    isOpen = false;
    title = 'Modal';

    close(): void {
        // TODO: this.closed.emit();
    }

    confirm(): void {
        // TODO: this.confirmed.emit();
    }

    onBackdropClick(): void {
        this.close();
    }
}

@Component({
    selector: 'app-scenario-4-modal',
    standalone: true,
    imports: [CommonModule, ModalComponent],
    template: `
        <div class="modal-scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Modal Dialog</h2>
                <p>Build a reusable modal with &#64;Input/&#64;Output props.</p>
            </div>

            <div class="demo">
                <button (click)="showModal = true" class="open-btn">
                    Open Modal
                </button>

                <!-- TODO: Wire up [isOpen], [title], (closed), (confirmed) -->
                <app-modal>
                    <p>This is the modal content!</p>
                    <p>You can put any HTML here using ng-content.</p>
                </app-modal>
            </div>
        </div>
    `,
    styles: [`
        .modal-scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .demo { padding: 2rem; text-align: center; }
        .open-btn { padding: 1rem 2rem; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
    `]
})
export class Scenario4ModalComponent {
    showModal = false;

    onClose(): void {
        this.showModal = false;
    }

    onConfirm(): void {
        console.log('Confirmed!');
        this.showModal = false;
    }
}
