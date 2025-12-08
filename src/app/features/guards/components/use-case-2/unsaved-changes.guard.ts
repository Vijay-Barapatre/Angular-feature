
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
    hasUnsavedChanges: () => boolean;
}

/**
 * FUNCTIONAL GUARD: unsavedChangesGuard
 * 
 * Checks if the component has unsaved data.
 * If yes, asks the user for confirmation.
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    // If no component or no method, allow navigation
    if (!component || !component.hasUnsavedChanges) {
        return true;
    }

    // Check condition
    if (component.hasUnsavedChanges()) {
        // In a real app, you might use a fancy modal.
        // Here we use the browser's native confirm dialog.
        return confirm('⚠️ You have unsaved changes!\n\nAre you sure you want to leave?');
    }

    return true;
};
