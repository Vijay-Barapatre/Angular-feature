/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: FORM WIZARD
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * Build a multi-step form wizard with navigation and data persistence.
 * 
 * 📝 PROBLEM STATEMENT:
 * - WizardStep receives step data and emits when complete
 * - Parent manages current step and collected data
 * - Navigation between steps
 * 
 * ✅ EXPECTED RESULT:
 * - Multi-step form navigation
 * - Data persists between steps
 * - Validation before proceeding
 * - Summary at the end
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// INTERFACES
// ========================================

interface WizardStepData {
    title: string;
    stepNumber: number;
    isActive: boolean;
    isCompleted: boolean;
}

interface FormData {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
    };
    address: {
        street: string;
        city: string;
        zipCode: string;
    };
    preferences: {
        newsletter: boolean;
        notifications: boolean;
    };
}

// ========================================
// WIZARD STEP INDICATOR COMPONENT
// ========================================

@Component({
    selector: 'app-step-indicator',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="step-indicator" 
             [class.active]="step?.isActive"
             [class.completed]="step?.isCompleted"
             (click)="onStepClick()">
            <span class="step-number">
                {{ step?.isCompleted ? '✓' : step?.stepNumber }}
            </span>
            <span class="step-title">{{ step?.title }}</span>
        </div>
    `,
    styles: [`
        .step-indicator { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .step-indicator:hover { background: rgba(16, 185, 129, 0.1); }
        .step-indicator.active { background: #10b981; color: white; }
        .step-indicator.completed { color: #10b981; }
        .step-number { width: 28px; height: 28px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: bold; }
        .step-indicator.active .step-number { background: white; color: #10b981; }
        .step-indicator.completed .step-number { background: #10b981; color: white; }
    `]
})
export class StepIndicatorComponent {
    /**
     * TODO: Add @Input for step data
     */
    // TODO: @Input() step: WizardStepData | undefined;
    step: WizardStepData | undefined;

    /**
     * TODO: Add @Output for step click
     */
    // TODO: @Output() stepClick = new EventEmitter<number>();

    onStepClick(): void {
        /*
         * TODO: Implement feature logic here
         * 
         * if (this.step?.isCompleted) {
         *     this.stepClick.emit(this.step.stepNumber);
         * }
         */
    }
}

// ========================================
// FORM STEP COMPONENTS
// ========================================

@Component({
    selector: 'app-personal-info-step',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="step-content">
            <h3>Personal Information</h3>
            <div class="form-group">
                <label>First Name</label>
                <input [(ngModel)]="data.firstName" placeholder="Enter first name">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input [(ngModel)]="data.lastName" placeholder="Enter last name">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input [(ngModel)]="data.email" type="email" placeholder="Enter email">
            </div>
        </div>
    `,
    styles: [`
        .step-content { padding: 1.5rem; }
        h3 { margin: 0 0 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
    `]
})
export class PersonalInfoStepComponent {
    /**
     * TODO: Add @Input for form data
     */
    // TODO: @Input() data: FormData['personalInfo'] = { firstName: '', lastName: '', email: '' };
    data = { firstName: '', lastName: '', email: '' };

    /**
     * TODO: Add @Output for data changes
     */
    // TODO: @Output() dataChange = new EventEmitter<FormData['personalInfo']>();
}

// ========================================
// MAIN WIZARD COMPONENT
// ========================================

@Component({
    selector: 'app-scenario-2-form-wizard',
    standalone: true,
    imports: [CommonModule, FormsModule, StepIndicatorComponent, PersonalInfoStepComponent],
    template: `
        <div class="form-wizard">
            <div class="instructions">
                <h2>🟥 Scenario 2: Form Wizard</h2>
                <p>Build a multi-step form with navigation and data persistence.</p>
                
                <h4>TODO Tasks:</h4>
                <ul>
                    <li>StepIndicator: &#64;Input step, &#64;Output stepClick</li>
                    <li>PersonalInfoStep: &#64;Input data, &#64;Output dataChange</li>
                    <li>Implement step navigation logic</li>
                </ul>
            </div>

            <div class="wizard-container">
                <div class="step-nav">
                    <!-- TODO: Add [step] input and (stepClick) output -->
                    <app-step-indicator 
                        *ngFor="let step of steps"
                    ></app-step-indicator>
                </div>

                <div class="wizard-body">
                    <!-- Step 1: Personal Info -->
                    <div *ngIf="currentStep === 1">
                        <!-- TODO: Add [(data)]="formData.personalInfo" -->
                        <app-personal-info-step></app-personal-info-step>
                    </div>

                    <!-- Step 2: Address (simplified for exercise) -->
                    <div *ngIf="currentStep === 2" class="step-content">
                        <h3>Address</h3>
                        <div class="form-group">
                            <label>Street</label>
                            <input [(ngModel)]="formData.address.street">
                        </div>
                        <div class="form-group">
                            <label>City</label>
                            <input [(ngModel)]="formData.address.city">
                        </div>
                    </div>

                    <!-- Step 3: Summary -->
                    <div *ngIf="currentStep === 3" class="step-content">
                        <h3>Summary</h3>
                        <pre>{{ formData | json }}</pre>
                    </div>
                </div>

                <div class="wizard-footer">
                    <button *ngIf="currentStep > 1" (click)="previousStep()">
                        ← Previous
                    </button>
                    <button *ngIf="currentStep < 3" (click)="nextStep()" class="primary">
                        Next →
                    </button>
                    <button *ngIf="currentStep === 3" (click)="submit()" class="primary">
                        Submit ✓
                    </button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .form-wizard { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .wizard-container { background: white; border-radius: 8px; overflow: hidden; }
        .step-nav { display: flex; gap: 0.5rem; padding: 1rem; background: #f8fafc; border-bottom: 1px solid #e5e7eb; }
        .step-content { padding: 1.5rem; }
        .step-content h3 { margin: 0 0 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .wizard-footer { display: flex; justify-content: space-between; padding: 1rem; border-top: 1px solid #e5e7eb; }
        button { padding: 0.75rem 1.5rem; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; }
        button.primary { background: #10b981; color: white; border: none; }
    `]
})
export class Scenario2FormWizardComponent {
    currentStep = 1;

    steps: WizardStepData[] = [
        { title: 'Personal Info', stepNumber: 1, isActive: true, isCompleted: false },
        { title: 'Address', stepNumber: 2, isActive: false, isCompleted: false },
        { title: 'Summary', stepNumber: 3, isActive: false, isCompleted: false }
    ];

    formData: FormData = {
        personalInfo: { firstName: '', lastName: '', email: '' },
        address: { street: '', city: '', zipCode: '' },
        preferences: { newsletter: false, notifications: false }
    };

    /**
     * TODO: Implement step navigation
     */
    goToStep(stepNumber: number): void {
        this.currentStep = stepNumber;
        this.updateSteps();
    }

    nextStep(): void {
        if (this.currentStep < 3) {
            this.steps[this.currentStep - 1].isCompleted = true;
            this.currentStep++;
            this.updateSteps();
        }
    }

    previousStep(): void {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateSteps();
        }
    }

    updateSteps(): void {
        this.steps.forEach((step, i) => {
            step.isActive = i + 1 === this.currentStep;
        });
    }

    submit(): void {
        console.log('Form submitted:', this.formData);
        alert('Form submitted! Check console for data.');
    }
}
