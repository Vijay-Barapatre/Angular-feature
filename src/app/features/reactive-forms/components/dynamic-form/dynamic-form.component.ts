/**
 * ============================================================================
 * DYNAMIC FORM GENERATION
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * What if you don't know your form structure at compile time? Admin panels,
 * survey builders, and CMS systems often need forms generated from JSON config!
 * 
 * KEY CONCEPT:
 * Build FormGroup/FormControl instances programmatically from data.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface FieldConfig {
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
    options?: string[];
    required?: boolean;
    placeholder?: string;
}

@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>⚡ Dynamic Form Generation</h1>
            <p class="description">Generate forms from JSON configuration at runtime.</p>

            <div class="config-section">
                <h3>📋 Form Configuration (JSON)</h3>
                <pre>{{ formConfig | json }}</pre>
            </div>

            @if (dynamicForm) {
                <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()" class="form">
                    @for (field of formConfig; track field.name) {
                        <div class="form-group">
                            <label [for]="field.name">
                                {{ field.label }}
                                @if (field.required) { <span class="required">*</span> }
                            </label>
                            
                            @switch (field.type) {
                                @case ('text') {
                                    <input 
                                        [id]="field.name"
                                        type="text" 
                                        [formControlName]="field.name"
                                        [placeholder]="field.placeholder || ''">
                                }
                                @case ('email') {
                                    <input 
                                        [id]="field.name"
                                        type="email" 
                                        [formControlName]="field.name"
                                        [placeholder]="field.placeholder || ''">
                                }
                                @case ('number') {
                                    <input 
                                        [id]="field.name"
                                        type="number" 
                                        [formControlName]="field.name"
                                        [placeholder]="field.placeholder || ''">
                                }
                                @case ('select') {
                                    <select [id]="field.name" [formControlName]="field.name">
                                        <option value="">Select...</option>
                                        @for (opt of field.options; track opt) {
                                            <option [value]="opt">{{ opt }}</option>
                                        }
                                    </select>
                                }
                                @case ('checkbox') {
                                    <label class="checkbox-label">
                                        <input type="checkbox" [formControlName]="field.name">
                                        {{ field.placeholder }}
                                    </label>
                                }
                            }
                        </div>
                    }
                    <button type="submit" class="submit-btn" [disabled]="dynamicForm.invalid">
                        Submit
                    </button>
                </form>
            }

            <div class="form-state">
                <h3>📊 Form Value</h3>
                <pre>{{ dynamicForm?.value | json }}</pre>
            </div>

            <div class="actions">
                <h3>⚡ Change Configuration</h3>
                <button (click)="loadContactForm()" class="action-btn">Contact Form</button>
                <button (click)="loadSurveyForm()" class="action-btn">Survey Form</button>
                <button (click)="loadRegistrationForm()" class="action-btn">Registration Form</button>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .config-section {
            background: #1a1a2e;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        .config-section h3 { color: #fff; margin-top: 0; }
        .config-section pre { color: #4ade80; margin: 0; font-size: 0.8rem; max-height: 200px; overflow: auto; }

        .form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333; }
        .required { color: #ef4444; }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="number"],
        .form-group select {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        .checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-weight: normal; cursor: pointer; }

        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
        }
        .submit-btn:disabled { opacity: 0.5; }

        .form-state, .actions { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        .form-state h3, .actions h3 { margin-top: 0; color: #1a1a2e; }
        .form-state pre { background: #1a1a2e; color: #4ade80; padding: 1rem; border-radius: 8px; }

        .action-btn {
            background: #f0f0f0;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            margin-right: 0.5rem;
            cursor: pointer;
        }
        .action-btn:hover { background: #e0e0e0; }
    `]
})
export class DynamicFormComponent implements OnInit {
    formConfig: FieldConfig[] = [];
    dynamicForm!: FormGroup;

    ngOnInit(): void {
        this.loadContactForm();
    }

    /**
     * BUILD FORM FROM CONFIG
     * 
     * Iterates over config array and creates FormControl for each field.
     * Applies validators based on config properties.
     */
    private buildForm(): void {
        const controls: { [key: string]: FormControl } = {};

        this.formConfig.forEach(field => {
            const validators = [];
            if (field.required) {
                validators.push(Validators.required);
            }
            if (field.type === 'email') {
                validators.push(Validators.email);
            }

            const initialValue = field.type === 'checkbox' ? false : '';
            controls[field.name] = new FormControl(initialValue, validators);
        });

        this.dynamicForm = new FormGroup(controls);
    }

    loadContactForm(): void {
        this.formConfig = [
            { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
            { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
            { name: 'subject', label: 'Subject', type: 'select', required: true, options: ['General', 'Support', 'Sales'] },
            { name: 'message', label: 'Message', type: 'text', required: true, placeholder: 'Your message...' }
        ];
        this.buildForm();
    }

    loadSurveyForm(): void {
        this.formConfig = [
            { name: 'satisfaction', label: 'Satisfaction Level', type: 'select', required: true, options: ['Very Happy', 'Happy', 'Neutral', 'Unhappy'] },
            { name: 'recommend', label: 'Would Recommend', type: 'checkbox', placeholder: 'Yes, I would recommend' },
            { name: 'feedback', label: 'Additional Feedback', type: 'text', placeholder: 'Any comments...' }
        ];
        this.buildForm();
    }

    loadRegistrationForm(): void {
        this.formConfig = [
            { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Choose username' },
            { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' },
            { name: 'age', label: 'Age', type: 'number', required: true, placeholder: '18+' },
            { name: 'plan', label: 'Plan', type: 'select', required: true, options: ['Free', 'Pro', 'Enterprise'] },
            { name: 'terms', label: 'Terms', type: 'checkbox', required: true, placeholder: 'I accept the terms' }
        ];
        this.buildForm();
    }

    onSubmit(): void {
        console.log('Form Value:', this.dynamicForm.value);
    }
}
