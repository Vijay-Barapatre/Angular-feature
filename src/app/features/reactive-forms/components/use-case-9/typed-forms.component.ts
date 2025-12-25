import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, FormRecord, Validators, NonNullableFormBuilder } from '@angular/forms';

// 1. Define the Interface for the Form Model
interface UserProfile {
    // FormControl<string | null> is the default because .reset() makes it null
    username: FormControl<string | null>;

    // NonNullable FormControl prevents nulls (reset goes to default value)
    email: FormControl<string>;

    // Optional field (control itself might be missing, or value is null)
    age?: FormControl<number | null>;

    // Nested Group
    address: FormGroup<{
        city: FormControl<string | null>;
        zip: FormControl<string | null>;
    }>;
}

@Component({
    selector: 'app-typed-forms',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>🛡️ Use Case 9: Strongly Typed Forms</h1>
            <p class="description">
                Angular 14+ introduces strict type checking. 
                No more <code>any</code>! Compiler catches standard errors.
            </p>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
                
                <!-- Explicitly Typed Group -->
                <div class="form-group">
                    <label>Username (Nullable)</label>
                    <input type="text" formControlName="username" placeholder="Can include nulls">
                    <small>Value: {{ form.controls.username.value | json }} (Type: string | null)</small>
                </div>

                <div class="form-group">
                    <label>Email (Non-Nullable)</label>
                    <input type="email" formControlName="email" placeholder="Never null">
                    <small>Value: {{ form.controls.email.value | json }} (Type: string)</small>
                </div>

                <!-- Nested Group -->
                <div formGroupName="address" class="nested-group">
                    <h3>Address</h3>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" formControlName="city">
                    </div>
                </div>

                <div class="actions">
                    <button type="button" (click)="resetForm()" class="action-btn reset">
                        Reset Types
                    </button>
                    <button type="submit" class="submit-btn">Submit</button>
                </div>
            </form>

            <div class="form-state">
                <h3>🚫 Type Safety Check</h3>
                <p>Try uncommenting the invalid code in <code>typed-forms.component.ts</code> to see compile errors!</p>
                <button (click)="testTypeSafety()" class="action-btn">
                    Run Type Checks (Console)
                </button>
            </div>

            <hr>

            <!-- FORM RECORD DEMO -->
            <div class="form-record-section">
                <h2>📂 FormRecord (Dynamic Map)</h2>
                <p>Use <code>FormRecord</code> when controls are dynamic but have the SAME type.</p>
                
                <form [formGroup]="skillsForm">
                    <div class="skills-grid">
                        <div *ngFor="let skill of skillKeys" class="skill-item">
                            <label>
                                <input type="checkbox" [formControlName]="skill">
                                {{ skill | titlecase }}
                            </label>
                            <button type="button" (click)="removeSkill(skill)" class="remove-btn">x</button>
                        </div>
                    </div>
                    
                    <div class="add-skill">
                        <input #newSkill placeholder="New Skill">
                        <button type="button" (click)="addSkill(newSkill.value); newSkill.value=''">
                            + Add Skill
                        </button>
                    </div>
                </form>
                <div class="form-state">
                    <pre>{{ skillsForm.value | json }}</pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .form { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; }
        .nested-group { margin-left: 1rem; border-left: 3px solid #667eea; padding-left: 1rem; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
        .skill-item { background: #f0f0f0; padding: 0.5rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; }
        .remove-btn { background: none; border: none; color: red; cursor: pointer; font-weight: bold; }
        .add-skill { display: flex; gap: 0.5rem; }
        .action-btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; background: #f0f0f0; margin-right: 0.5rem; }
        .action-btn.reset { background: #fee2e2; color: #b91c1c; }
        .submit-btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 2rem; border: none; border-radius: 8px; cursor: pointer; }
        .form-state { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-top: 1rem; }
        pre { background: #1a1a2e; color: #4ade80; padding: 1rem; border-radius: 8px; }
    `]
})
export class TypedFormsComponent {
    // Inject NonNullableFormBuilder for "never null" types
    private fb = inject(NonNullableFormBuilder);

    /**
     * 1. TYPED FORMGROUP
     * We pass the Interface <UserProfile> to FormGroup.
     * Compiler ensures:
     * - 'email' MUST be a FormControl<string>
     * - 'age' is optional in the group
     */
    form = new FormGroup<UserProfile>({
        username: new FormControl('', { nonNullable: false }), // Can be null on reset
        email: new FormControl('', { nonNullable: true }),     // Reset -> '' (not null)
        address: new FormGroup({
            city: new FormControl('New York'),
            zip: new FormControl('10001')
        })
    });

    /**
     * 2. FORMRECORD
     * Standard FormGroup requires knowing keys in advance.
     * FormRecord<T> allows dynamic keys, but ALL values must be type T.
     */
    skillsForm = new FormRecord<FormControl<boolean>>({
        angular: new FormControl(true, { nonNullable: true }),
        react: new FormControl(false, { nonNullable: true })
    });

    get skillKeys() {
        return Object.keys(this.skillsForm.controls);
    }

    addSkill(name: string) {
        if (!name) return;
        // FormRecord allows adding generic keys!
        this.skillsForm.addControl(name.toLowerCase(), new FormControl(true, { nonNullable: true }));
    }

    removeSkill(name: string) {
        this.skillsForm.removeControl(name);
    }

    resetForm() {
        // RESET BEHAVIOR:
        // username -> null (because it's nullable)
        // email -> '' (because it's NonNullable)
        this.form.reset();

        console.log('Username after reset:', this.form.controls.username.value); // null
        console.log('Email after reset:', this.form.controls.email.value);       // ""
    }

    onSubmit() {
        console.log(this.form.getRawValue());
    }

    testTypeSafety() {
        // 🛡️ UNCOMMENT THESE TO SEE COMPILER ERRORS!

        // Error: Type 'number' is not assignable to type 'string'
        // this.form.controls.username.setValue(12345); 

        // Error: 'missingprop' does not exist in type 'UserProfile'
        // this.form.patchValue({ missingprop: 'test' });

        // Error: Type 'null' is not assignable to type 'string' (Non-Nullable)
        // this.form.controls.email.setValue(null);

        console.log('✅ Compiler checks passed! (Uncomment code to see errors)');
    }
}
