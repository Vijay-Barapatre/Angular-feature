/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: NESTED FORMS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-scenario-5-nested',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Nested Forms</h2>
                <p>Organize complex forms with nested FormGroups.</p>
            </div>

            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="section" formGroupName="personal">
                    <h3>👤 Personal Info</h3>
                    <input formControlName="firstName" placeholder="First name">
                    <input formControlName="lastName" placeholder="Last name">
                </div>

                <div class="section" formGroupName="address">
                    <h3>📍 Address</h3>
                    <input formControlName="street" placeholder="Street">
                    <div class="row">
                        <input formControlName="city" placeholder="City">
                        <input formControlName="zip" placeholder="ZIP">
                    </div>
                </div>

                <div class="section" formGroupName="contact">
                    <h3>📞 Contact</h3>
                    <input formControlName="email" placeholder="Email">
                    <input formControlName="phone" placeholder="Phone">
                </div>

                <button type="submit" [disabled]="profileForm.invalid">Save Profile</button>
            </form>

            <div class="preview">
                <h4>Form Structure</h4>
                <pre>{{ profileForm.value | json }}</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .instructions { grid-column: 1 / -1; background: #fef2f2; padding: 1rem; border-radius: 8px; border-left: 4px solid #3b82f6; }
        form { background: white; padding: 1.5rem; border-radius: 8px; }
        .section { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb; }
        .section h3 { margin: 0 0 0.75rem; font-size: 1rem; }
        input { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 0.5rem; }
        .row { display: grid; grid-template-columns: 2fr 1fr; gap: 0.5rem; }
        button { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; }
        .preview { background: #1e1e2e; padding: 1rem; border-radius: 8px; color: #a6e3a1; height: fit-content; }
        .preview h4 { color: white; margin: 0 0 0.5rem; }
        .preview pre { font-size: 0.75rem; margin: 0; }
    `]
})
export class Scenario5NestedComponent {
    profileForm;

    constructor(private fb: FormBuilder) {
        this.profileForm = this.fb.group({
            personal: this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required]
            }),
            address: this.fb.group({
                street: [''],
                city: [''],
                zip: ['']
            }),
            contact: this.fb.group({
                email: ['', [Validators.required, Validators.email]],
                phone: ['']
            })
        });
    }

    onSubmit(): void {
        console.log('Profile:', this.profileForm.value);
        alert('Profile saved!');
    }
}
