
import { Directive, Input } from '@angular/core';
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator
} from '@angular/forms';

@Directive({
    selector: '[appPasswordMatch]',
    standalone: true,
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordMatchDirective,
        multi: true
    }]
})
export class PasswordMatchDirective implements Validator {
    // The name of the field to match against (e.g., 'password')
    @Input('appPasswordMatch') matchControlName: string = '';

    validate(control: AbstractControl): ValidationErrors | null {
        // 1. Get the parent form group to find the other control
        const parent = control.parent;
        if (!parent || !this.matchControlName) return null;

        // 2. Get the other control
        const otherControl = parent.get(this.matchControlName);
        if (!otherControl) return null;

        // 3. Compare values
        const value = control.value;
        const otherValue = otherControl.value;

        if (value !== otherValue && value && otherValue) {
            return { passwordMismatch: true };
        }

        return null;
    }
}
