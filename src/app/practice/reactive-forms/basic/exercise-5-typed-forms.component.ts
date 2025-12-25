/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 5: STRONGLY TYPED FORMS
 * ============================================================================
 * 
 * LEARNING GOAL:
 * Understand Angular 14+ Typed Forms with FormGroup<T>, NonNullableFormBuilder,
 * and FormRecord<T>.
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';

// TODO 1: Define an interface for the form structure
interface ProfileForm {
    username: FormControl<string>;       // Non-nullable string
    email: FormControl<string | null>;   // Nullable string
    age: FormControl<number | null>;     // Nullable number
}

@Component({
    selector: 'app-exercise-5-typed-forms',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 5: Strongly Typed Forms</h2>
                <p>Practice type-safe form handling with Angular 14+ features.</p>
                <ul>
                    <li>✅ FormGroup&lt;T&gt; with interface</li>
                    <li>✅ NonNullableFormBuilder</li>
                    <li>✅ FormRecord for dynamic keys</li>
                </ul>
            </div>

            <div class="demo">
                <h3>Part 1: Typed FormGroup</h3>
                <form [formGroup]="profileForm">
                    <div class="form-group">
                        <label>Username (non-nullable)</label>
                        <input formControlName="username" placeholder="Always a string">
                        <small>Type: {{ getType('username') }}</small>
                    </div>

                    <div class="form-group">
                        <label>Email (nullable)</label>
                        <input formControlName="email" placeholder="Can be null on reset">
                        <small>Value: {{ profileForm.controls.email.value | json }}</small>
                    </div>

                    <div class="form-group">
                        <label>Age (nullable number)</label>
                        <input formControlName="age" type="number" placeholder="Optional age">
                    </div>

                    <div class="actions">
                        <button type="button" (click)="resetProfile()">Reset Form</button>
                        <button type="button" (click)="testTypeSafety()">Test Type Safety</button>
                    </div>
                </form>

                <div class="output">
                    <h4>Form Value:</h4>
                    <pre>{{ profileForm.value | json }}</pre>
                </div>
            </div>

            <hr>

            <div class="demo">
                <h3>Part 2: FormRecord (Dynamic Keys)</h3>
                <p>Add/remove skills dynamically. All values are booleans.</p>
                
                <form [formGroup]="skillsRecord">
                    <div class="skills-grid">
                        @for (skill of skillKeys; track skill) {
                            <label class="skill-item">
                                <input type="checkbox" [formControlName]="skill">
                                {{ skill | titlecase }}
                                <button type="button" (click)="removeSkill(skill)" class="remove">×</button>
                            </label>
                        }
                    </div>
                </form>

                <div class="add-skill">
                    <input #newSkill placeholder="New skill name">
                    <button (click)="addSkill(newSkill.value); newSkill.value=''">+ Add Skill</button>
                </div>

                <div class="output">
                    <h4>Skills Record Value:</h4>
                    <pre>{{ skillsRecord.value | json }}</pre>
                </div>
            </div>

            <div class="challenge">
                <h4>🎯 Challenge Tasks:</h4>
                <ol>
                    <li>Add a "bio" field to ProfileForm that is optional (bio?: FormControl&lt;string&gt;)</li>
                    <li>Try to call profileForm.controls.username.setValue(123) - what error do you get?</li>
                    <li>Create a nested typed FormGroup for address (city, zip)</li>
                </ol>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #3b82f6; }
        .instructions ul { margin: 0.5rem 0 0; padding-left: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }
        .demo h3 { margin-top: 0; color: #1f2937; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; box-sizing: border-box; }
        .form-group small { color: #6b7280; font-size: 0.8rem; }
        .actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .actions button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; background: #e5e7eb; }
        .actions button:hover { background: #d1d5db; }
        .output { background: #1f2937; padding: 1rem; border-radius: 6px; margin-top: 1rem; }
        .output h4 { margin: 0 0 0.5rem; color: #9ca3af; font-size: 0.9rem; }
        .output pre { margin: 0; color: #4ade80; font-size: 0.85rem; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .skill-item { display: flex; align-items: center; gap: 0.5rem; background: #f3f4f6; padding: 0.5rem 0.75rem; border-radius: 6px; cursor: pointer; }
        .skill-item .remove { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.2rem; margin-left: 0.25rem; }
        .add-skill { display: flex; gap: 0.5rem; }
        .add-skill input { flex: 1; padding: 0.5rem; border: 2px solid #e5e7eb; border-radius: 6px; }
        .add-skill button { padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        hr { margin: 2rem 0; border: none; border-top: 2px dashed #e5e7eb; }
        .challenge { background: #fef3c7; padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b; }
        .challenge h4 { margin: 0 0 0.5rem; color: #b45309; }
        .challenge ol { margin: 0; padding-left: 1.5rem; }
    `]
})
export class Exercise5TypedFormsComponent {
    private fb = inject(NonNullableFormBuilder);

    /**
     * TODO 2: Create a typed FormGroup
     * Using the ProfileForm interface, the compiler enforces correct types.
     */
    profileForm = new FormGroup<ProfileForm>({
        username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl<string | null>(null),
        age: new FormControl<number | null>(null)
    });

    /**
     * TODO 3: Create a FormRecord for dynamic boolean flags
     * FormRecord allows adding/removing keys at runtime.
     */
    skillsRecord = new FormRecord<FormControl<boolean>>({
        angular: new FormControl(true, { nonNullable: true }),
        typescript: new FormControl(true, { nonNullable: true }),
        rxjs: new FormControl(false, { nonNullable: true })
    });

    get skillKeys(): string[] {
        return Object.keys(this.skillsRecord.controls);
    }

    addSkill(name: string): void {
        if (!name || this.skillsRecord.contains(name.toLowerCase())) return;
        this.skillsRecord.addControl(name.toLowerCase(), new FormControl(true, { nonNullable: true }));
    }

    removeSkill(name: string): void {
        this.skillsRecord.removeControl(name);
    }

    resetProfile(): void {
        this.profileForm.reset();
        // After reset:
        // - username → '' (nonNullable initial value)
        // - email → null (nullable)
        // - age → null (nullable)
        console.log('After reset:', this.profileForm.value);
    }

    testTypeSafety(): void {
        // Uncomment these to see TypeScript errors:
        // this.profileForm.controls.username.setValue(123); // ❌ Type error!
        // this.profileForm.patchValue({ invalidField: 'x' }); // ❌ Type error!

        // This works:
        this.profileForm.controls.username.setValue('TypedUser');
        console.log('✅ Type-safe setValue worked!');
    }

    getType(controlName: keyof ProfileForm): string {
        const value = this.profileForm.controls[controlName].value;
        return value === null ? 'null' : typeof value;
    }
}
