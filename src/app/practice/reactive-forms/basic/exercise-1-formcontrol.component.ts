/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: FORMCONTROL BASICS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
    selector: 'app-exercise-1-formcontrol',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: FormControl Basics</h2>
                <p>Learn to create and use FormControl for individual inputs.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Create a FormControl for username</li>
                    <li>Bind it to input with [formControl]</li>
                    <li>Display value reactively</li>
                    <li>Use setValue() and reset()</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 FormControl Demo</h3>
                
                <div class="form-group">
                    <label>Username:</label>
                    <input [formControl]="username" placeholder="Enter username">
                </div>

                <div class="info-panel">
                    <p><strong>Value:</strong> {{ username.value || '(empty)' }}</p>
                    <p><strong>Valid:</strong> {{ username.valid ? '✅' : '❌' }}</p>
                    <p><strong>Dirty:</strong> {{ username.dirty ? 'Yes' : 'No' }}</p>
                    <p><strong>Touched:</strong> {{ username.touched ? 'Yes' : 'No' }}</p>
                </div>

                <div class="actions">
                    <button (click)="username.setValue('admin')">Set to 'admin'</button>
                    <button (click)="username.reset()">Reset</button>
                    <button (click)="username.disable()">Disable</button>
                    <button (click)="username.enable()">Enable</button>
                </div>

                <hr>

                <h4>Email with Value Changes</h4>
                <div class="form-group">
                    <label>Email:</label>
                    <input [formControl]="email" placeholder="Enter email">
                </div>
                
                <div class="log-panel">
                    <h5>Value Changes Log:</h5>
                    @for (log of emailLog; track $index) {
                        <div class="log-entry">{{ log }}</div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #3b82f6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; }
        .info-panel { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .info-panel p { margin: 0.25rem 0; }
        .actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .actions button { padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #3b82f6; color: white; cursor: pointer; }
        hr { margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb; }
        .log-panel { padding: 1rem; background: #1e1e2e; border-radius: 8px; color: #a6e3a1; max-height: 150px; overflow-y: auto; }
        .log-panel h5 { margin: 0 0 0.5rem; color: white; }
        .log-entry { font-family: monospace; font-size: 0.85rem; padding: 0.25rem 0; }
    `]
})
export class Exercise1FormControlComponent {
    /**
     * TODO: Create FormControl for username
     * 
     * HINT: username = new FormControl('');
     */
    username = new FormControl('');

    /**
     * TODO: Create FormControl for email and subscribe to valueChanges
     */
    email = new FormControl('');
    emailLog: string[] = [];

    constructor() {
        /**
         * TODO: Subscribe to email.valueChanges observable
         * 
         * HINT:
         * this.email.valueChanges.subscribe(value => {
         *     this.emailLog.unshift(`Value: ${value}`);
         * });
         */
        this.email.valueChanges.subscribe(value => {
            const timestamp = new Date().toLocaleTimeString();
            this.emailLog.unshift(`[${timestamp}] ${value}`);
            if (this.emailLog.length > 10) this.emailLog.pop();
        });
    }
}
