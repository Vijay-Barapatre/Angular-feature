/**
 * ============================================================================
 * USE CASE 1: BASIC FORMCONTROL & FORMGROUP
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * This is the foundation of Reactive Forms. Instead of using ngModel in your
 * template, you create FormControl and FormGroup instances in your TypeScript
 * class and bind them to your template.
 * 
 * CORE CONCEPTS:
 * 
 * 1. FormControl - Tracks the value and validation state of a SINGLE input.
 *    Think of it as a wrapper around an input field.
 *    
 * 2. FormGroup - Tracks the value and validity of a GROUP of FormControls.
 *    Think of it as a wrapper around a <form> element.
 * 
 * WHY REACTIVE FORMS?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Problem with Template Forms     │  Solution with Reactive Forms       │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  Hard to test (need DOM)         │  Easy to test (pure TypeScript)     │
 * │  Implicit control creation       │  Explicit control creation          │
 * │  Async access to form values     │  Sync access to form values         │
 * │  Complex validation is messy     │  Clean validation in TypeScript     │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * DATA FLOW:
 * User Input -> FormControl.setValue() -> Component gets notified -> View updates
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 🛡️ CRITICAL: Import ReactiveFormsModule, NOT FormsModule!
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-basic-reactive',
    standalone: true,
    // 🛡️ CRITICAL: You MUST import ReactiveFormsModule to use formGroup, formControlName
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>🎯 Use Case 1: Basic FormControl & FormGroup</h1>
            <p class="description">
                The foundation of Reactive Forms. Create controls in TypeScript, bind in template.
            </p>

            <!-- 
                FORM BINDING:
                [formGroup]="profileForm" - Binds this <form> to our FormGroup instance
                (ngSubmit)="onSubmit()" - Handles form submission
            -->
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="form">
                
                <!-- 
                    FORMCONTROLNAME DIRECTIVE:
                    formControlName="firstName" - Binds this input to profileForm.get('firstName')
                    
                    🛡️ CRITICAL: The string 'firstName' MUST match the key in your FormGroup!
                -->
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        type="text" 
                        formControlName="firstName"
                        placeholder="Enter your first name">
                    
                    <!-- 
                        ACCESSING CONTROL STATE:
                        profileForm.get('firstName') returns the FormControl instance
                        .value - The current value
                        .valid / .invalid - Validation state
                        .dirty - Has user changed the value?
                        .touched - Has user focused and left the field?
                    -->
                    <small class="status">
                        Value: {{ profileForm.get('firstName')?.value || 'empty' }}
                    </small>
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        type="text" 
                        formControlName="lastName"
                        placeholder="Enter your last name">
                    <small class="status">
                        Value: {{ profileForm.get('lastName')?.value || 'empty' }}
                    </small>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        formControlName="email"
                        placeholder="Enter your email">
                    <small class="status">
                        Value: {{ profileForm.get('email')?.value || 'empty' }}
                    </small>
                </div>

                <button type="submit" class="submit-btn">Submit</button>
            </form>

            <!-- 
                FORM STATE DISPLAY:
                Reactive Forms give you access to the entire form state as an object.
            -->
            <div class="form-state">
                <h3>📊 Form State (Live)</h3>
                <pre>{{ profileForm.value | json }}</pre>
                
                <h3>📋 Form Status</h3>
                <ul>
                    <li><strong>Valid:</strong> {{ profileForm.valid }}</li>
                    <li><strong>Dirty:</strong> {{ profileForm.dirty }}</li>
                    <li><strong>Touched:</strong> {{ profileForm.touched }}</li>
                </ul>
            </div>

            <!-- 
                PROGRAMMATIC CONTROL:
                One of the biggest advantages of Reactive Forms is programmatic control.
            -->
            <div class="actions">
                <h3>⚡ Programmatic Actions</h3>
                <button (click)="setDefaultValues()" class="action-btn">
                    Set Default Values
                </button>
                <button (click)="patchFirstName()" class="action-btn">
                    Patch First Name Only
                </button>
                <button (click)="resetForm()" class="action-btn reset">
                    Reset Form
                </button>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }

        h1 {
            color: #1a1a2e;
            margin-bottom: 0.5rem;
        }

        .description {
            color: #666;
            margin-bottom: 2rem;
        }

        .form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .status {
            display: block;
            margin-top: 0.5rem;
            color: #888;
            font-size: 0.85rem;
        }

        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
        }

        .form-state {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }

        .form-state h3 {
            margin-top: 0;
            color: #1a1a2e;
        }

        .form-state pre {
            background: #1a1a2e;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
        }

        .form-state ul {
            list-style: none;
            padding: 0;
        }

        .form-state li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .actions {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }

        .actions h3 {
            margin-top: 0;
            color: #1a1a2e;
        }

        .action-btn {
            background: #f0f0f0;
            color: #333;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .action-btn:hover {
            background: #e0e0e0;
        }

        .action-btn.reset {
            background: #fee2e2;
            color: #b91c1c;
        }

        .action-btn.reset:hover {
            background: #fecaca;
        }
    `]
})
export class BasicReactiveComponent implements OnInit {
    /**
     * FORMGROUP DECLARATION
     * 
     * The FormGroup is declared as a class property.
     * We use the definite assignment assertion (!) because we initialize it in ngOnInit.
     * 
     * WHY FORMGROUP?
     * - It groups multiple FormControls together
     * - It tracks the aggregate value of all controls
     * - It tracks the aggregate validity (if ANY control is invalid, group is invalid)
     */
    profileForm!: FormGroup;

    /**
     * NGONINIT - FORM INITIALIZATION
     * 
     * We initialize the form in ngOnInit (or constructor).
     * This is where you define:
     * 1. The structure of your form (which controls exist)
     * 2. Initial values for each control
     * 3. Validators (covered in Use Case 4)
     */
    ngOnInit(): void {
        /**
         * FORMGROUP INITIALIZATION
         * 
         * new FormGroup({...}) creates a group of controls.
         * Each key becomes a control name that you reference in formControlName.
         * 
         * new FormControl(initialValue) creates a single control.
         * 
         * 🛡️ CRITICAL PATTERN:
         * The keys here ('firstName', 'lastName', 'email') MUST match
         * the formControlName values in your template!
         */
        this.profileForm = new FormGroup({
            // FormControl(initialValue, validators, asyncValidators)
            firstName: new FormControl(''),  // Initial value: empty string
            lastName: new FormControl(''),   // Initial value: empty string
            email: new FormControl('')       // Initial value: empty string
        });

        /**
         * ALTERNATIVE: FormBuilder (cleaner syntax)
         * 
         * You can inject FormBuilder and use:
         * this.profileForm = this.fb.group({
         *     firstName: [''],
         *     lastName: [''],
         *     email: ['']
         * });
         * 
         * FormBuilder is covered in later use cases.
         */
    }

    /**
     * FORM SUBMISSION HANDLER
     * 
     * When the form is submitted, you can access:
     * - this.profileForm.value: Object with all control values
     * - this.profileForm.valid: Boolean indicating if all validations pass
     * - Individual controls via this.profileForm.get('controlName')
     */
    onSubmit(): void {
        console.log('=== Form Submitted ===');
        console.log('Form Value:', this.profileForm.value);
        console.log('Form Valid:', this.profileForm.valid);

        // Access individual control values
        const firstName = this.profileForm.get('firstName')?.value;
        console.log('First Name:', firstName);

        // In a real app, you might:
        // this.userService.saveProfile(this.profileForm.value).subscribe(...)
    }

    /**
     * SETVALUE() - SET ALL CONTROL VALUES AT ONCE
     * 
     * 🛡️ CRITICAL: setValue REQUIRES you to provide ALL controls in the group!
     * If you miss one, Angular will throw an error.
     * 
     * Use this when you have a complete object (e.g., from an API response).
     */
    setDefaultValues(): void {
        this.profileForm.setValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
        });
        console.log('✅ Set all values using setValue()');
    }

    /**
     * PATCHVALUE() - SET SOME CONTROL VALUES
     * 
     * Unlike setValue, patchValue allows partial updates.
     * You can update just one or a few controls.
     * 
     * Use this when you only want to update specific fields.
     */
    patchFirstName(): void {
        this.profileForm.patchValue({
            firstName: 'Jane'
            // lastName and email are NOT required!
        });
        console.log('✅ Patched firstName using patchValue()');
    }

    /**
     * RESET() - RESET FORM TO INITIAL STATE
     * 
     * Resets all controls to their initial values.
     * Also resets the form state (dirty, touched, etc.).
     * 
     * You can optionally pass values to reset to specific values.
     */
    resetForm(): void {
        this.profileForm.reset();
        console.log('🔄 Form reset to initial state');

        // Alternative: Reset to specific values
        // this.profileForm.reset({ firstName: 'Guest', lastName: '', email: '' });
    }
}
