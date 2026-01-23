/**
 * ============================================================================
 * FORMARRAY (DYNAMIC FIELDS)
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Sometimes you don't know how many fields a form will have until runtime.
 * For example: a user can add multiple phone numbers, skills, or addresses.
 * FormArray lets you add or remove controls DYNAMICALLY!
 * 
 * CORE CONCEPT:
 * - FormGroup: Fixed set of controls (known at compile time).
 * - FormArray: Variable length ARRAY of controls (dynamic at runtime).
 * 
 * STRUCTURE:
 * userForm = new FormGroup({
 *     name: new FormControl(''),
 *     emails: new FormArray([          // Array of controls!
 *         new FormControl('primary@example.com'),
 *         new FormControl('backup@example.com')
 *     ])
 * });
 * 
 * VALUE:
 * {
 *     name: "John",
 *     emails: ["primary@example.com", "backup@example.com"]
 * }
 * 
 * COMMON USE CASES:
 * - Multiple phone numbers
 * - Dynamic list of skills/tags
 * - Order line items (product, quantity, price)
 * - Survey with dynamic questions
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-array',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>➕ FormArray (Dynamic Fields)</h1>
            <p class="description">
                Add and remove form fields dynamically at runtime. Perfect for lists of items.
            </p>

            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="form">
                <!-- Static Fields -->
                <div class="form-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" formControlName="name">
                </div>

                <!-- 
                    FORMARRAY: skills
                    ====================================================================
                    
                    formArrayName="skills" binds to the FormArray in our component.
                    Inside, we use *ngFor to iterate over the controls.
                    
                    🛡️ CRITICAL: Each control needs [formControlName]="i" where i is the INDEX!
                -->
                <div class="section">
                    <div class="section-header">
                        <h3>🎯 Skills</h3>
                        <button type="button" (click)="addSkill()" class="add-btn">
                            + Add Skill
                        </button>
                    </div>

                    <div formArrayName="skills" class="dynamic-list">
                        <!--
                            ITERATING OVER FORMARRAY
                            
                            skillsControls is a getter that returns FormArray.controls
                            We use trackBy for performance with dynamic lists
                        -->
                        @for (control of skillsControls; track i; let i = $index) {
                            <div class="dynamic-item">
                                <input 
                                    type="text" 
                                    [formControlName]="i"
                                    placeholder="Enter skill">
                                <button 
                                    type="button" 
                                    (click)="removeSkill(i)" 
                                    class="remove-btn"
                                    [disabled]="skillsControls.length <= 1">
                                    ✕
                                </button>
                            </div>
                        }
                    </div>
                </div>

                <!-- 
                    FORMARRAY OF FORMGROUPS: phoneNumbers
                    ====================================================================
                    
                    Each item in the array is a FormGroup (not a simple FormControl).
                    This is useful when each item has multiple fields (type + number).
                -->
                <div class="section">
                    <div class="section-header">
                        <h3>📱 Phone Numbers</h3>
                        <button type="button" (click)="addPhone()" class="add-btn">
                            + Add Phone
                        </button>
                    </div>

                    <div formArrayName="phoneNumbers" class="dynamic-list">
                        @for (phone of phonesControls; track i; let i = $index) {
                            <!--
                                NESTED FORMGROUP INSIDE FORMARRAY
                                
                                [formGroupName]="i" tells Angular this div maps to
                                the FormGroup at index i in the FormArray.
                            -->
                            <div [formGroupName]="i" class="dynamic-item phone-item">
                                <select formControlName="type" class="phone-type">
                                    <option value="mobile">Mobile</option>
                                    <option value="home">Home</option>
                                    <option value="work">Work</option>
                                </select>
                                <input 
                                    type="tel" 
                                    formControlName="number"
                                    placeholder="Enter phone number"
                                    class="phone-number">
                                <button 
                                    type="button" 
                                    (click)="removePhone(i)" 
                                    class="remove-btn"
                                    [disabled]="phonesControls.length <= 1">
                                    ✕
                                </button>
                            </div>
                        }
                    </div>
                </div>

                <button type="submit" class="submit-btn">Submit</button>
            </form>

            <!-- Form Value Display -->
            <div class="form-state">
                <h3>📊 Form Value</h3>
                <pre>{{ profileForm.value | json }}</pre>
            </div>

            <!-- Array Operations -->
            <div class="actions">
                <h3>⚡ Array Operations</h3>
                <button (click)="clearSkills()" class="action-btn">
                    Clear All Skills
                </button>
                <button (click)="populateSampleSkills()" class="action-btn">
                    Add Sample Skills
                </button>
                <button (click)="reversePhones()" class="action-btn">
                    Reverse Phones Order
                </button>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .form-group { margin-bottom: 1.5rem; }
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
            box-sizing: border-box;
        }

        .form-group input:focus { outline: none; border-color: #667eea; }

        .section {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            border: 2px dashed #667eea;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .section h3 { margin: 0; color: #667eea; }

        .add-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: transform 0.2s ease;
        }

        .add-btn:hover { transform: translateY(-2px); }

        .dynamic-list { display: flex; flex-direction: column; gap: 0.75rem; }

        .dynamic-item {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        .dynamic-item input {
            flex: 1;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
        }

        .dynamic-item input:focus { outline: none; border-color: #667eea; }

        .phone-item { display: grid; grid-template-columns: 120px 1fr auto; gap: 0.5rem; }

        .phone-type {
            padding: 0.75rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            background: white;
        }

        .phone-number { width: 100%; }

        .remove-btn {
            background: #fee2e2;
            color: #b91c1c;
            border: none;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s ease;
        }

        .remove-btn:hover:not(:disabled) { background: #fecaca; }
        .remove-btn:disabled { opacity: 0.5; cursor: not-allowed; }

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

        .submit-btn:hover { transform: translateY(-2px); }

        .form-state, .actions {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }

        .form-state h3, .actions h3 { margin-top: 0; color: #1a1a2e; }

        .form-state pre {
            background: #1a1a2e;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
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

        .action-btn:hover { background: #e0e0e0; }
    `]
})
export class FormArrayComponent implements OnInit {
    /**
     * FORM STRUCTURE WITH FORMARRAY
     * 
     * profileForm (FormGroup)
     * ├── name (FormControl)
     * ├── skills (FormArray)         <-- Array of FormControls
     * │   ├── [0] FormControl
     * │   ├── [1] FormControl
     * │   └── ... (dynamic)
     * └── phoneNumbers (FormArray)    <-- Array of FormGroups!
     *     ├── [0] FormGroup { type, number }
     *     ├── [1] FormGroup { type, number }
     *     └── ... (dynamic)
     */
    profileForm!: FormGroup;

    ngOnInit(): void {
        this.profileForm = new FormGroup({
            name: new FormControl(''),

            /**
             * FORMARRAY OF FORMCONTROLS
             * 
             * Each element is a simple FormControl (single value).
             * The array value will be: ["skill1", "skill2", ...]
             */
            skills: new FormArray([
                new FormControl('Angular'),  // Initial skills
                new FormControl('TypeScript')
            ]),

            /**
             * FORMARRAY OF FORMGROUPS
             * 
             * Each element is a FormGroup (complex object).
             * The array value will be: [{ type: "mobile", number: "123" }, ...]
             */
            phoneNumbers: new FormArray([
                this.createPhoneGroup()  // Helper method creates initial group
            ])
        });
    }

    /**
     * GETTER FOR SKILLS FORMARRAY
     * 
     * 🛡️ CRITICAL: You need a getter to access FormArray.controls for iteration!
     * profileForm.get('skills') returns AbstractControl, which doesn't have .controls
     * We cast it to FormArray to access the controls array.
     */
    get skillsControls(): FormControl[] {
        return (this.profileForm.get('skills') as FormArray).controls as FormControl[];
    }

    /**
     * GETTER FOR PHONES FORMARRAY
     */
    get phonesControls(): FormGroup[] {
        return (this.profileForm.get('phoneNumbers') as FormArray).controls as FormGroup[];
    }

    /**
     * HELPER: Create a new phone number FormGroup
     * 
     * This factory method ensures consistent structure for each phone entry.
     * Called when adding a new phone or initializing the form.
     */
    createPhoneGroup(): FormGroup {
        return new FormGroup({
            type: new FormControl('mobile'),
            number: new FormControl('')
        });
    }

    // ========================== ARRAY OPERATIONS ==========================

    /**
     * ADD SKILL
     * 
     * To add a control to a FormArray:
     * 1. Get the FormArray reference
     * 2. Call .push() with a new FormControl
     */
    addSkill(): void {
        const skillsArray = this.profileForm.get('skills') as FormArray;
        skillsArray.push(new FormControl(''));
        console.log('➕ Added new skill field');
    }

    /**
     * REMOVE SKILL
     * 
     * To remove a control from a FormArray:
     * 1. Get the FormArray reference
     * 2. Call .removeAt(index)
     */
    removeSkill(index: number): void {
        const skillsArray = this.profileForm.get('skills') as FormArray;
        skillsArray.removeAt(index);
        console.log(`➖ Removed skill at index ${index}`);
    }

    /**
     * ADD PHONE
     * 
     * Push a new FormGroup (not FormControl) for complex items.
     */
    addPhone(): void {
        const phonesArray = this.profileForm.get('phoneNumbers') as FormArray;
        phonesArray.push(this.createPhoneGroup());
        console.log('➕ Added new phone field');
    }

    /**
     * REMOVE PHONE
     */
    removePhone(index: number): void {
        const phonesArray = this.profileForm.get('phoneNumbers') as FormArray;
        phonesArray.removeAt(index);
        console.log(`➖ Removed phone at index ${index}`);
    }

    /**
     * CLEAR ALL SKILLS
     * 
     * .clear() removes ALL controls from the FormArray.
     * After clearing, we add one empty field back.
     */
    clearSkills(): void {
        const skillsArray = this.profileForm.get('skills') as FormArray;
        skillsArray.clear();
        skillsArray.push(new FormControl('')); // Keep at least one
        console.log('🧹 Cleared all skills');
    }

    /**
     * POPULATE SAMPLE SKILLS
     * 
     * Demonstrates programmatically adding multiple controls.
     */
    populateSampleSkills(): void {
        const skillsArray = this.profileForm.get('skills') as FormArray;
        skillsArray.clear();

        const sampleSkills = ['React', 'Vue', 'Svelte', 'Next.js'];
        sampleSkills.forEach(skill => {
            skillsArray.push(new FormControl(skill));
        });

        console.log('✅ Added sample skills');
    }

    /**
     * REVERSE PHONES ORDER
     * 
     * Demonstrates that you can manipulate the controls array directly.
     * Note: You need to work with the controls array, not the value.
     */
    reversePhones(): void {
        const phonesArray = this.profileForm.get('phoneNumbers') as FormArray;
        const reversedControls = [...phonesArray.controls].reverse();

        // Clear and re-add in reverse order
        phonesArray.clear();
        reversedControls.forEach(control => phonesArray.push(control));

        console.log('🔄 Reversed phone order');
    }

    onSubmit(): void {
        console.log('=== Form Submitted ===');
        console.log('Form Value:', this.profileForm.value);

        // Access array values
        const skills = this.profileForm.get('skills')?.value;
        console.log('Skills:', skills); // ["Angular", "TypeScript", ...]

        const phones = this.profileForm.get('phoneNumbers')?.value;
        console.log('Phones:', phones); // [{ type: "mobile", number: "123" }, ...]
    }
}
