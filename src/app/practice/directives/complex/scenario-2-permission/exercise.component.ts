/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: PERMISSION DIRECTIVE
 * ============================================================================
 */

import { Component, Directive, Input, TemplateRef, ViewContainerRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appHasPermission]',
    standalone: true
})
export class HasPermissionDirective {
    private hasView = false;
    private userPermissions: string[] = [];

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input() set appHasPermission(permission: string) {
        this.updateView(this.userPermissions.includes(permission));
    }

    @Input() set appHasPermissionUser(permissions: string[]) {
        this.userPermissions = permissions;
    }

    private updateView(hasPermission: boolean): void {
        if (hasPermission && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!hasPermission && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}

@Component({
    selector: 'app-scenario-2-permission',
    standalone: true,
    imports: [CommonModule, HasPermissionDirective],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Permission Directive</h2>
                <p>Show/hide elements based on user permissions.</p>
            </div>

            <div class="content">
                <div class="permission-toggles">
                    <h4>User Permissions:</h4>
                    @for (perm of allPermissions; track perm) {
                        <label>
                            <input type="checkbox" 
                                [checked]="userPermissions().includes(perm)"
                                (change)="togglePermission(perm)">
                            {{ perm }}
                        </label>
                    }
                </div>

                <div class="demo-buttons">
                    <button *appHasPermission="'create'; user: userPermissions()" class="btn-create">
                        ➕ Create
                    </button>
                    <button *appHasPermission="'edit'; user: userPermissions()" class="btn-edit">
                        ✏️ Edit
                    </button>
                    <button *appHasPermission="'delete'; user: userPermissions()" class="btn-delete">
                        🗑️ Delete
                    </button>
                    <button *appHasPermission="'admin'; user: userPermissions()" class="btn-admin">
                        👑 Admin
                    </button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .permission-toggles { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .permission-toggles h4 { margin: 0 0 0.5rem; }
        .permission-toggles label { display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 1rem; cursor: pointer; }
        .demo-buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .demo-buttons button { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; color: white; }
        .btn-create { background: #10b981; }
        .btn-edit { background: #3b82f6; }
        .btn-delete { background: #ef4444; }
        .btn-admin { background: #f59e0b; }
    `]
})
export class Scenario2PermissionComponent {
    allPermissions = ['create', 'edit', 'delete', 'admin'];
    userPermissions = signal<string[]>(['create', 'edit']);

    togglePermission(perm: string): void {
        this.userPermissions.update(perms =>
            perms.includes(perm) ? perms.filter(p => p !== perm) : [...perms, perm]
        );
    }
}
