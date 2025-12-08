/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: DATA TABLE
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * Build a data table with sorting, selection, and actions.
 * 
 * ✅ EXPECTED RESULT:
 * - Display data in table format
 * - Column sorting
 * - Row selection with checkboxes
 * - Action buttons per row
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
}

@Component({
    selector: 'app-scenario-3-data-table',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="data-table-scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Data Table</h2>
                <p>Build a data table with sorting, selection, and row actions.</p>
                
                <h4>TODO Tasks:</h4>
                <ul>
                    <li>Create TableHeader component with sort functionality</li>
                    <li>Create TableRow component with selection and actions</li>
                    <li>Implement select all / deselect all</li>
                </ul>
            </div>

            <div class="table-container">
                <div class="table-actions">
                    <span>{{ selectedIds.length }} selected</span>
                    <button *ngIf="selectedIds.length > 0" (click)="deleteSelected()">
                        Delete Selected
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" 
                                       [checked]="allSelected"
                                       (change)="toggleSelectAll()">
                            </th>
                            <th (click)="sort('name')">
                                Name {{ sortColumn === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '' }}
                            </th>
                            <th (click)="sort('email')">Email</th>
                            <th (click)="sort('role')">Role</th>
                            <th (click)="sort('status')">Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let user of sortedUsers" [class.selected]="isSelected(user.id)">
                            <td>
                                <input type="checkbox" 
                                       [checked]="isSelected(user.id)"
                                       (change)="toggleSelect(user.id)">
                            </td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>
                                <span class="status-badge" [class]="user.status">
                                    {{ user.status }}
                                </span>
                            </td>
                            <td>
                                <button (click)="edit(user)">✏️</button>
                                <button (click)="delete(user.id)">🗑️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: [`
        .data-table-scenario { max-width: 900px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .table-container { background: white; border-radius: 8px; overflow: hidden; }
        .table-actions { padding: 1rem; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f8fafc; cursor: pointer; user-select: none; }
        th:hover { background: #e5e7eb; }
        tr.selected { background: #f0fdf4; }
        .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
        .status-badge.active { background: #dcfce7; color: #16a34a; }
        .status-badge.inactive { background: #fee2e2; color: #dc2626; }
        button { padding: 0.25rem 0.5rem; background: none; border: none; cursor: pointer; }
    `]
})
export class Scenario3DataTableComponent {
    users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active' },
    ];

    selectedIds: number[] = [];
    sortColumn = 'name';
    sortDir: 'asc' | 'desc' = 'asc';

    get allSelected(): boolean {
        return this.selectedIds.length === this.users.length;
    }

    get sortedUsers(): User[] {
        return [...this.users].sort((a, b) => {
            const aVal = a[this.sortColumn as keyof User];
            const bVal = b[this.sortColumn as keyof User];
            const dir = this.sortDir === 'asc' ? 1 : -1;
            return aVal < bVal ? -dir : dir;
        });
    }

    isSelected(id: number): boolean {
        return this.selectedIds.includes(id);
    }

    toggleSelect(id: number): void {
        if (this.isSelected(id)) {
            this.selectedIds = this.selectedIds.filter(i => i !== id);
        } else {
            this.selectedIds.push(id);
        }
    }

    toggleSelectAll(): void {
        if (this.allSelected) {
            this.selectedIds = [];
        } else {
            this.selectedIds = this.users.map(u => u.id);
        }
    }

    sort(column: string): void {
        if (this.sortColumn === column) {
            this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDir = 'asc';
        }
    }

    edit(user: User): void {
        console.log('Edit user:', user);
    }

    delete(id: number): void {
        this.users = this.users.filter(u => u.id !== id);
    }

    deleteSelected(): void {
        this.users = this.users.filter(u => !this.selectedIds.includes(u.id));
        this.selectedIds = [];
    }
}
