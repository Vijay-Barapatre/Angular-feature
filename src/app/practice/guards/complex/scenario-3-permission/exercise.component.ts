/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: PERMISSION-BASED ACCESS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type Permission = 'create' | 'read' | 'update' | 'delete';

@Component({
    selector: 'app-scenario-3-permission',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Permission-Based Access</h2>
                <p>Fine-grained CRUD permissions for different resources.</p>
            </div>

            <div class="content">
                <div class="permission-manager">
                    <h4>User Permissions:</h4>
                    <div class="permission-grid">
                        @for (perm of allPermissions; track perm) {
                            <label class="perm-toggle">
                                <input 
                                    type="checkbox" 
                                    [checked]="hasPermission(perm)"
                                    (change)="togglePermission(perm)">
                                {{ perm | titlecase }}
                            </label>
                        }
                    </div>
                </div>

                <div class="actions-demo">
                    <h4>Try Actions:</h4>
                    <div class="action-grid">
                        @for (action of actions; track action.name) {
                            <div class="action-card">
                                <span class="action-icon">{{ action.icon }}</span>
                                <span class="action-name">{{ action.name }}</span>
                                <span class="required-perm">Requires: {{ action.permission }}</span>
                                <button 
                                    [class.allowed]="hasPermission(action.permission)"
                                    [class.denied]="!hasPermission(action.permission)"
                                    (click)="tryAction(action)">
                                    {{ hasPermission(action.permission) ? 'Execute' : 'Blocked' }}
                                </button>
                            </div>
                        }
                    </div>
                </div>

                @if (actionResult()) {
                    <div class="result" [class.success]="actionResult()?.allowed">
                        {{ actionResult()?.message }}
                    </div>
                }

                <div class="code-preview">
                    <h4>Permission Guard</h4>
                    <pre><code>export const permissionGuard: CanActivateFn = (route) => {{ '{' }}
  const permService = inject(PermissionService);
  const required = route.data['permission'] as Permission;
  
  if (permService.hasPermission(required)) {{ '{' }}
    return true;
  {{ '}' }}
  
  return inject(Router).createUrlTree(['/forbidden']);
{{ '}' }};

// Routes
{{ '{' }} path: 'products/new', data: {{ '{' }} permission: 'create' {{ '}' }} {{ '}' }}
{{ '{' }} path: 'products/:id', data: {{ '{' }} permission: 'read' {{ '}' }} {{ '}' }}
{{ '{' }} path: 'products/:id/edit', data: {{ '{' }} permission: 'update' {{ '}' }} {{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .permission-manager { margin-bottom: 1.5rem; }
        .permission-manager h4 { margin: 0 0 0.75rem; }
        .permission-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
        .perm-toggle { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: #f8fafc; border-radius: 6px; cursor: pointer; }
        .actions-demo { margin-bottom: 1.5rem; }
        .actions-demo h4 { margin: 0 0 0.75rem; }
        .action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .action-card { display: flex; flex-direction: column; gap: 0.25rem; padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .action-icon { font-size: 1.5rem; }
        .action-name { font-weight: 500; }
        .required-perm { font-size: 0.8rem; color: #6b7280; }
        .action-card button { margin-top: 0.5rem; padding: 0.5rem; border: none; border-radius: 6px; cursor: pointer; }
        .action-card button.allowed { background: #10b981; color: white; }
        .action-card button.denied { background: #ef4444; color: white; }
        .result { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background: #fef2f2; }
        .result.success { background: #f0fdf4; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario3PermissionComponent {
    allPermissions: Permission[] = ['create', 'read', 'update', 'delete'];
    userPermissions = signal<Permission[]>(['read']);
    actionResult = signal<{ allowed: boolean; message: string } | null>(null);

    actions = [
        { name: 'View Products', icon: '👁️', permission: 'read' as Permission, path: '/products' },
        { name: 'Add Product', icon: '➕', permission: 'create' as Permission, path: '/products/new' },
        { name: 'Edit Product', icon: '✏️', permission: 'update' as Permission, path: '/products/1/edit' },
        { name: 'Delete Product', icon: '🗑️', permission: 'delete' as Permission, path: '/products/1/delete' }
    ];

    hasPermission(perm: Permission): boolean {
        return this.userPermissions().includes(perm);
    }

    togglePermission(perm: Permission): void {
        this.userPermissions.update(perms =>
            perms.includes(perm)
                ? perms.filter(p => p !== perm)
                : [...perms, perm]
        );
    }

    tryAction(action: { name: string; permission: Permission; path: string }): void {
        if (this.hasPermission(action.permission)) {
            this.actionResult.set({
                allowed: true,
                message: `✅ Permission '${action.permission}' granted. Navigating to ${action.path}`
            });
        } else {
            this.actionResult.set({
                allowed: false,
                message: `🚫 Missing '${action.permission}' permission. Redirecting to /forbidden`
            });
        }
    }
}
