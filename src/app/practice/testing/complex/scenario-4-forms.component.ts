/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: FORM TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-scenario-4-forms',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Form Testing</h2>
                <p>Test reactive forms, validation, and submission.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>Form Testing</h4>
                    <pre><code>describe('LoginComponent', () => {{ '{' }}
  let component: LoginComponent;
  let fixture: ComponentFixture&lt;LoginComponent&gt;;

  beforeEach(() => {{ '{' }}
    TestBed.configureTestingModule({{ '{' }}
      imports: [LoginComponent, ReactiveFormsModule]
    {{ '}' }});
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  {{ '}' }});

  it('should create form with controls', () => {{ '{' }}
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  {{ '}' }});

  it('should require email', () => {{ '{' }}
    const email = component.form.get('email');
    email?.setValue('');
    expect(email?.valid).toBeFalse();
    expect(email?.errors?.['required']).toBeTrue();
  {{ '}' }});

  it('should validate email format', () => {{ '{' }}
    const email = component.form.get('email');
    email?.setValue('invalid');
    expect(email?.errors?.['email']).toBeTrue();
    
    email?.setValue('valid{{ '@' }}email.com');
    expect(email?.valid).toBeTrue();
  {{ '}' }});

  it('should submit when valid', () => {{ '{' }}
    spyOn(component, 'onSubmit');
    
    component.form.setValue({{ '{' }}
      email: 'test{{ '@' }}test.com',
      password: 'password123'
    {{ '}' }});
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(component.onSubmit).toHaveBeenCalled();
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🎮 Form Demo</h3>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="demo-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input formControlName="email" type="email">
                        @if (loginForm.get('email')?.touched && loginForm.get('email')?.invalid) {
                            <span class="error">
                                {{ getEmailError() }}
                            </span>
                        }
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input formControlName="password" type="password">
                        @if (loginForm.get('password')?.touched && loginForm.get('password')?.invalid) {
                            <span class="error">Password must be at least 6 characters</span>
                        }
                    </div>

                    <button type="submit" [disabled]="loginForm.invalid">Login</button>
                </form>

                <div class="form-state">
                    <h4>Form State (for testing)</h4>
                    <div class="state-grid">
                        <span>Valid: {{ loginForm.valid }}</span>
                        <span>Touched: {{ loginForm.touched }}</span>
                        <span>Dirty: {{ loginForm.dirty }}</span>
                    </div>
                    <pre>{{ loginForm.value | json }}</pre>
                </div>

                @if (submitted()) {
                    <div class="submit-result">
                        ✅ Form submitted successfully!
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .demo-form { padding: 1.5rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .form-group input.ng-invalid.ng-touched { border-color: #ef4444; }
        .error { color: #ef4444; font-size: 0.85rem; }
        .demo-form button { width: 100%; padding: 0.75rem; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .demo-form button:disabled { opacity: 0.5; }
        .form-state { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; }
        .form-state h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .state-grid { display: flex; gap: 1rem; margin-bottom: 0.5rem; color: #94a3b8; font-size: 0.85rem; }
        .form-state pre { margin: 0; color: #a6e3a1; font-size: 0.85rem; }
        .submit-result { padding: 1rem; background: #f0fdf4; border-radius: 8px; color: #10b981; font-weight: bold; }
    `]
})
export class Scenario4FormsComponent {
    loginForm;
    submitted = signal(false);

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    getEmailError(): string {
        const email = this.loginForm.get('email');
        if (email?.hasError('required')) return 'Email is required';
        if (email?.hasError('email')) return 'Invalid email format';
        return '';
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.submitted.set(true);
            console.log('Form submitted:', this.loginForm.value);
        }
    }
}
