/**
 * ============================================================================
 * USE CASE 2: NESTED FORMGROUPS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Real-world forms are rarely flat. User profiles have addresses, addresses have
 * city/state/zip, orders have billing AND shipping addresses. Nested FormGroups
 * let you model this hierarchy cleanly.
 * 
 * CORE CONCEPT:
 * A FormGroup can contain other FormGroups as children!
 * 
 * profileForm = new FormGroup({
 *     name: new FormControl(''),      // Simple control
 *     address: new FormGroup({        // Nested group!
 *         street: new FormControl(''),
 *         city: new FormControl(''),
 *         zip: new FormControl('')
 *     })
 * });
 * 
 * VALUE STRUCTURE:
 * {
 *     name: 'John',
 *     address: {
 *         street: '123 Main St',
 *         city: 'New York',
 *         zip: '10001'
 *     }
 * }
 * 
 * WHY NESTED GROUPS?
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  Problem (Flat Forms)            │  Solution (Nested Groups)            │
 * ├──────────────────────────────────────────────────────────────────────────┤
 * │  addressStreet, addressCity...   │  address.street, address.city        │
 * │  Hard to reset just address      │  form.get('address').reset()         │
 * │  Messy API payload               │  Clean nested JSON structure         │
 * │  Difficult reusability           │  Address group can be reused         │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-nested-groups',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>📦 Use Case 2: Nested FormGroups</h1>
            <p class="description">
                Organize complex forms with nested groups. Perfect for addresses, profiles, etc.
            </p>

            <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="form">
                <!-- 
                    TOP-LEVEL CONTROLS
                    These are direct children of userForm
                -->
                <div class="section">
                    <h3>👤 Basic Info</h3>
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" type="text" formControlName="firstName">
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" type="text" formControlName="lastName">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" formControlName="email">
                    </div>
                </div>

                <!-- 
                    NESTED FORMGROUP: address
                    🛡️ CRITICAL: Use formGroupName directive to access nested groups!
                    
                    formGroupName="address" tells Angular: "Inside this div, all
                    formControlName directives refer to controls INSIDE the 'address' group"
                -->
                <div formGroupName="address" class="section nested">
                    <h3>🏠 Address</h3>
                    <div class="form-group">
                        <label for="street">Street</label>
                        <input id="street" type="text" formControlName="street">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="city">City</label>
                            <input id="city" type="text" formControlName="city">
                        </div>
                        <div class="form-group">
                            <label for="state">State</label>
                            <input id="state" type="text" formControlName="state">
                        </div>
                        <div class="form-group">
                            <label for="zip">Zip Code</label>
                            <input id="zip" type="text" formControlName="zip">
                        </div>
                    </div>
                </div>

                <!-- 
                    ANOTHER NESTED GROUP: company (optional)
                    This demonstrates multiple nested groups in one form
                -->
                <div formGroupName="company" class="section nested">
                    <h3>🏢 Company Info (Optional)</h3>
                    <div class="form-group">
                        <label for="companyName">Company Name</label>
                        <input id="companyName" type="text" formControlName="name">
                    </div>
                    <div class="form-group">
                        <label for="department">Department</label>
                        <input id="department" type="text" formControlName="department">
                    </div>
                </div>

                <button type="submit" class="submit-btn">Submit</button>
            </form>

            <!-- Form Value Display -->
            <div class="form-state">
                <h3>📊 Form Value (Nested Structure)</h3>
                <pre>{{ userForm.value | json }}</pre>
            </div>

            <!-- Programmatic Actions -->
            <div class="actions">
                <h3>⚡ Programmatic Actions</h3>
                <button (click)="populateForm()" class="action-btn">
                    Load Sample Data
                </button>
                <button (click)="resetAddress()" class="action-btn">
                    Reset Address Only
                </button>
                <button (click)="patchCompany()" class="action-btn">
                    Patch Company
                </button>
                <button (click)="resetForm()" class="action-btn reset">
                    Reset All
                </button>
            </div>

            <!-- Accessing Nested Values -->
            <div class="access-demo">
                <h3>🔍 Accessing Nested Values</h3>
                <ul>
                    <li><strong>Full Name:</strong> {{ userForm.get('firstName')?.value }} {{ userForm.get('lastName')?.value }}</li>
                    <li><strong>City:</strong> {{ userForm.get('address.city')?.value || 'Not set' }}</li>
                    <li><strong>Company:</strong> {{ userForm.get('company.name')?.value || 'Not set' }}</li>
                </ul>
                <p class="hint">
                    💡 Use dot notation: <code>form.get('address.city')</code>
                </p>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }

        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .section {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }

        .section.nested {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            border: 2px dashed #667eea;
        }

        .section h3 {
            margin-top: 0;
            color: #667eea;
        }

        .form-group {
            margin-bottom: 1rem;
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
            box-sizing: border-box;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .form-row {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 1rem;
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

        .submit-btn:hover { transform: translateY(-2px); }

        .form-state, .actions, .access-demo {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }

        .form-state h3, .actions h3, .access-demo h3 {
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
        .action-btn.reset { background: #fee2e2; color: #b91c1c; }
        .action-btn.reset:hover { background: #fecaca; }

        .access-demo ul {
            list-style: none;
            padding: 0;
        }

        .access-demo li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .hint {
            background: #e0f2fe;
            padding: 0.75rem;
            border-radius: 6px;
            margin-top: 1rem;
            color: #0369a1;
        }

        .hint code {
            background: #0369a1;
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
        }
    `]
})
export class NestedGroupsComponent implements OnInit {
    /**
     * NESTED FORMGROUP STRUCTURE
     * 
     * The form has this hierarchy:
     * userForm (FormGroup)
     * ├── firstName (FormControl)
     * ├── lastName (FormControl)
     * ├── email (FormControl)
     * ├── address (FormGroup)    <-- Nested!
     * │   ├── street (FormControl)
     * │   ├── city (FormControl)
     * │   ├── state (FormControl)
     * │   └── zip (FormControl)
     * └── company (FormGroup)    <-- Nested!
     *     ├── name (FormControl)
     *     └── department (FormControl)
     */
    userForm!: FormGroup;

    ngOnInit(): void {
        /**
         * CREATING NESTED FORMGROUPS
         * 
         * Simply nest FormGroup instances inside other FormGroup instances.
         * The resulting value will mirror this hierarchy as a nested object.
         */
        this.userForm = new FormGroup({
            // Top-level controls
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),

            // 🛡️ NESTED GROUP: address
            // This creates a nested object in the form value
            address: new FormGroup({
                street: new FormControl(''),
                city: new FormControl(''),
                state: new FormControl(''),
                zip: new FormControl('')
            }),

            // 🛡️ NESTED GROUP: company
            // You can have multiple nested groups!
            company: new FormGroup({
                name: new FormControl(''),
                department: new FormControl('')
            })
        });
    }

    onSubmit(): void {
        console.log('=== Form Submitted ===');
        console.log('Full Form Value:', this.userForm.value);

        /**
         * ACCESSING NESTED GROUP VALUES
         * 
         * Option 1: Dot notation path
         * form.get('address.city')?.value
         * 
         * Option 2: Chain get calls
         * form.get('address')?.get('city')?.value
         * 
         * Option 3: Access the nested group's value directly
         * (form.get('address') as FormGroup).value // { street, city, state, zip }
         */
        const address = this.userForm.get('address')?.value;
        console.log('Address:', address);
    }

    /**
     * POPULATE ENTIRE FORM
     * 
     * setValue works with nested structures too!
     * The object structure must match the form structure exactly.
     */
    populateForm(): void {
        this.userForm.setValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            address: {
                street: '123 Angular Street',
                city: 'Framework City',
                state: 'TS',
                zip: '12345'
            },
            company: {
                name: 'Angular Inc.',
                department: 'Frontend Team'
            }
        });
        console.log('✅ Form populated with sample data');
    }

    /**
     * RESET ONLY A NESTED GROUP
     * 
     * One major benefit of nested groups: you can reset just ONE section!
     * Get the nested group and call reset() on it.
     */
    resetAddress(): void {
        const addressGroup = this.userForm.get('address');
        if (addressGroup) {
            addressGroup.reset();
            console.log('🔄 Address group reset (other fields unchanged)');
        }
    }

    /**
     * PATCH A NESTED GROUP
     * 
     * patchValue respects the nested structure.
     * You can patch just part of a nested group.
     */
    patchCompany(): void {
        this.userForm.patchValue({
            company: {
                name: 'Reactive Corp'
                // department is NOT required with patchValue!
            }
        });
        console.log('✅ Company name patched');
    }

    /**
     * RESET ENTIRE FORM
     */
    resetForm(): void {
        this.userForm.reset();
        console.log('🔄 Entire form reset');
    }
}
