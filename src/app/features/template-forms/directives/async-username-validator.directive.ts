/**
 * ============================================================================
 * ASYNC USERNAME VALIDATOR DIRECTIVE
 * ============================================================================
 * 
 * For Template-Driven Forms, async validators must be implemented as
 * directives that implement the AsyncValidator interface.
 * 
 * KEY CONCEPT:
 * - Directive-based validators integrate with Angular's DI system
 * - They must be registered via NG_ASYNC_VALIDATORS provider
 * - The validate() method returns Observable<ValidationErrors | null>
 */

import { Directive, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

// Simulated "existing usernames" in the database
const EXISTING_USERNAMES = ['admin', 'user', 'test', 'angular', 'demo'];

@Directive({
    selector: '[appAsyncUsername]',
    standalone: true,
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: AsyncUsernameValidatorDirective,
            multi: true
        }
    ]
})
export class AsyncUsernameValidatorDirective implements AsyncValidator {
    /**
     * Optional input to customize the delay (for demo purposes)
     * Can be string or number since attribute binding passes strings
     */
    @Input('appAsyncUsername') debounceMs: string | number = 500;

    /**
     * The validate method - called by Angular's form system
     * 
     * @param control - The form control being validated
     * @returns Observable that emits null (valid) or error object (invalid)
     */
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        if (!control.value) {
            return of(null); // Empty is handled by 'required' validator
        }

        // Simulate API call with delay
        return this.checkUsername(control.value).pipe(
            map(isTaken => isTaken ? { usernameTaken: { value: control.value } } : null),
            catchError(() => of(null)) // On error, assume valid
        );
    }

    /**
     * Simulated API call to check username availability
     */
    private checkUsername(username: string): Observable<boolean> {
        const normalizedUsername = username.toLowerCase().trim();
        const isTaken = EXISTING_USERNAMES.includes(normalizedUsername);

        // Add artificial delay to simulate network latency
        return of(isTaken).pipe(delay(this.debounceMs ? +this.debounceMs : 500));
    }
}
