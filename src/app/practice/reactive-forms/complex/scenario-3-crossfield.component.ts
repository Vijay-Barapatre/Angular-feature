/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: CROSS-FIELD VALIDATION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-scenario-3-crossfield',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Cross-Field Validation</h2>
                <p>Validate fields that depend on each other.</p>
            </div>

            <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label>Start Date</label>
                    <input formControlName="startDate" type="date">
                </div>

                <div class="form-group">
                    <label>End Date</label>
                    <input formControlName="endDate" type="date">
                    @if (bookingForm.errors?.['dateRange']) {
                        <span class="error-msg">End date must be after start date</span>
                    }
                </div>

                <div class="form-group">
                    <label>Min Budget (\$)</label>
                    <input formControlName="minBudget" type="number">
                </div>

                <div class="form-group">
                    <label>Max Budget (\$)</label>
                    <input formControlName="maxBudget" type="number">
                    @if (bookingForm.errors?.['budgetRange']) {
                        <span class="error-msg">Max must be greater than min</span>
                    }
                </div>

                <button type="submit" [disabled]="bookingForm.invalid">
                    Book Now
                </button>
            </form>
        </div>
    `,
    styles: [`
        .scenario { max-width: 400px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #3b82f6; }
        form { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .error-msg { color: #ef4444; font-size: 0.8rem; }
        button { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; }
    `]
})
export class Scenario3CrossfieldComponent {
    bookingForm;

    constructor(private fb: FormBuilder) {
        this.bookingForm = this.fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            minBudget: [100, Validators.required],
            maxBudget: [500, Validators.required]
        }, {
            validators: [this.dateRangeValidator, this.budgetRangeValidator]
        });
    }

    dateRangeValidator(group: AbstractControl): ValidationErrors | null {
        const start = group.get('startDate')?.value;
        const end = group.get('endDate')?.value;
        if (!start || !end) return null;
        return new Date(end) > new Date(start) ? null : { dateRange: true };
    }

    budgetRangeValidator(group: AbstractControl): ValidationErrors | null {
        const min = group.get('minBudget')?.value;
        const max = group.get('maxBudget')?.value;
        if (min === null || max === null) return null;
        return max > min ? null : { budgetRange: true };
    }

    onSubmit(): void {
        console.log('Booking:', this.bookingForm.value);
        alert('Booking confirmed!');
    }
}
