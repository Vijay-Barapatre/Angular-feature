/**
 * ============================================================================
 * USE CASE 2: CRUD OPERATIONS (ENHANCED)
 * ============================================================================
 * 
 * 💡 REAL-WORLD SCENARIOS:
 * 1. Optimistic Updates (update UI immediately, rollback on error)
 * 2. Bulk Operations (select multiple, batch delete)
 * 3. Inline Editing (edit in place without modal)
 * 4. Pagination with CRUD
 * 5. Search + Filter + CRUD
 */

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, User } from '../../services/api.service';
import { catchError, tap, finalize, switchMap, of, Subject, debounceTime, distinctUntilChanged, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <h1>✏️ Use Case 2: Advanced CRUD Operations</h1>
            <p class="description">
                Real-world patterns: optimistic updates, bulk operations, inline editing.
            </p>

            <!-- Toolbar -->
            <div class="toolbar">
                <div class="search-box">
                    <input 
                        type="text" 
                        [(ngModel)]="searchTerm" 
                        (ngModelChange)="onSearch($event)"
                        placeholder="🔍 Search users...">
                </div>
                <div class="actions">
                    <button (click)="toggleSelectAll()" class="btn secondary">
                        {{ allSelected ? '☐ Deselect All' : '☑ Select All' }}
                    </button>
                    @if (selectedIds.size > 0) {
                        <button (click)="bulkDelete()" class="btn danger">
                            🗑️ Delete Selected ({{ selectedIds.size }})
                        </button>
                    }
                    <button (click)="openCreateForm()" class="btn primary">
                        ➕ Add User
                    </button>
                </div>
            </div>

            <!-- Create Form (Collapsible) -->
            @if (showCreateForm) {
                <div class="form-section">
                    <h3>Create New User</h3>
                    <div class="form-grid">
                        <input [(ngModel)]="newUser.name" placeholder="Name" required>
                        <input [(ngModel)]="newUser.email" placeholder="Email" required>
                        <input [(ngModel)]="newUser.age" type="number" placeholder="Age">
                        <select [(ngModel)]="newUser.isActive">
                            <option [ngValue]="true">Active</option>
                            <option [ngValue]="false">Inactive</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button (click)="createUser()" class="btn primary" [disabled]="creating">
                            {{ creating ? 'Creating...' : 'Create' }}
                        </button>
                        <button (click)="showCreateForm = false" class="btn secondary">Cancel</button>
                    </div>
                </div>
            }

            <!-- Users Table with Inline Edit -->
            <div class="table-container">
                @if (loading) {
                    <div class="loading-overlay">
                        <div class="spinner"></div>
                        <span>Loading users...</span>
                    </div>
                }
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="checkbox-col">
                                <input type="checkbox" [checked]="allSelected" (change)="toggleSelectAll()">
                            </th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (user of filteredUsers; track user.id) {
                            <tr [class.selected]="selectedIds.has(user.id)" [class.editing]="editingId === user.id">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        [checked]="selectedIds.has(user.id)"
                                        (change)="toggleSelect(user.id)">
                                </td>
                                <td><span class="avatar">{{ user.avatar }}</span></td>
                                
                                @if (editingId === user.id) {
                                    <!-- Inline Edit Mode -->
                                    <td><input [(ngModel)]="editingUser!.name" class="inline-input"></td>
                                    <td><input [(ngModel)]="editingUser!.email" class="inline-input"></td>
                                    <td><input [(ngModel)]="editingUser!.age" type="number" class="inline-input small"></td>
                                    <td>
                                        <select [(ngModel)]="editingUser!.isActive" class="inline-select">
                                            <option [ngValue]="true">Active</option>
                                            <option [ngValue]="false">Inactive</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button (click)="saveEdit()" class="icon-btn save" title="Save">💾</button>
                                        <button (click)="cancelEdit()" class="icon-btn cancel" title="Cancel">❌</button>
                                    </td>
                                } @else {
                                    <!-- Display Mode -->
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.age }}</td>
                                    <td>
                                        <span class="status-badge" [class.active]="user.isActive">
                                            {{ user.isActive ? '🟢 Active' : '🔴 Inactive' }}
                                        </span>
                                    </td>
                                    <td>
                                        <button (click)="startEdit(user)" class="icon-btn edit" title="Edit">✏️</button>
                                        <button (click)="deleteUser(user)" class="icon-btn delete" title="Delete">🗑️</button>
                                    </td>
                                }
                            </tr>
                        } @empty {
                            <tr>
                                <td colspan="7" class="empty-row">
                                    {{ searchTerm ? 'No users match your search' : 'No users found' }}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <!-- Operation Log (for learning) -->
            <div class="operation-log">
                <h4>📋 Operations Log</h4>
                <div class="log-entries">
                    @for (log of operationLog; track $index) {
                        <div class="log-entry" [class]="log.type">
                            <span class="time">{{ log.time }}</span>
                            <span class="message">{{ log.message }}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 1.5rem; }

        .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .search-box input { padding: 0.75rem 1rem; border: 2px solid #e0e0e0; border-radius: 8px; width: 300px; }
        .actions { display: flex; gap: 0.5rem; }

        .btn { padding: 0.75rem 1.25rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; }
        .btn.primary { background: #667eea; color: white; }
        .btn.secondary { background: #e0e0e0; color: #333; }
        .btn.danger { background: #ef4444; color: white; }
        .btn:disabled { opacity: 0.6; }

        .form-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        .form-section h3 { margin-top: 0; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
        .form-grid input, .form-grid select { padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 6px; }
        .form-actions { display: flex; gap: 0.5rem; }

        .table-container { position: relative; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .loading-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.9); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; }
        .spinner { width: 30px; height: 30px; border: 3px solid #667eea; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        .data-table th { background: #f8f9fa; font-weight: 600; }
        .data-table tr:hover { background: #f8f9fa; }
        .data-table tr.selected { background: #e0e7ff; }
        .data-table tr.editing { background: #fef3c7; }
        .checkbox-col { width: 40px; }

        .avatar { font-size: 1.5rem; }
        .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; }
        .status-badge.active { background: #dcfce7; color: #166534; }

        .inline-input, .inline-select { padding: 0.5rem; border: 2px solid #667eea; border-radius: 4px; }
        .inline-input.small { width: 60px; }

        .icon-btn { padding: 0.5rem; border: none; background: transparent; cursor: pointer; font-size: 1rem; }
        .icon-btn:hover { transform: scale(1.1); }

        .empty-row { text-align: center; color: #888; font-style: italic; }

        .operation-log { margin-top: 2rem; background: #1a1a2e; padding: 1rem; border-radius: 12px; }
        .operation-log h4 { color: white; margin-top: 0; }
        .log-entries { max-height: 150px; overflow-y: auto; }
        .log-entry { display: flex; gap: 1rem; padding: 0.25rem 0; font-family: monospace; font-size: 0.85rem; }
        .log-entry .time { color: #888; }
        .log-entry .message { color: #4ade80; }
        .log-entry.error .message { color: #ef4444; }
        .log-entry.warning .message { color: #fbbf24; }
    `]
})
export class CrudComponent implements OnInit {
    private apiService = inject(ApiService);

    users: User[] = [];
    filteredUsers: User[] = [];
    loading = false;
    creating = false;

    // Search
    searchTerm = '';
    private searchSubject = new Subject<string>();

    // Selection
    selectedIds = new Set<number>();
    get allSelected(): boolean {
        return this.filteredUsers.length > 0 && this.selectedIds.size === this.filteredUsers.length;
    }

    // Create form
    showCreateForm = false;
    newUser = { name: '', email: '', age: 25, isActive: true };

    // Inline edit
    editingId: number | null = null;
    editingUser: User | null = null;

    // Operation log
    operationLog: { time: string; message: string; type: 'info' | 'success' | 'error' | 'warning' }[] = [];

    ngOnInit(): void {
        this.loadUsers();
        this.setupSearch();
    }

    private log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
        this.operationLog.unshift({
            time: new Date().toLocaleTimeString(),
            message,
            type
        });
        if (this.operationLog.length > 20) this.operationLog.pop();
    }

    loadUsers(): void {
        this.loading = true;
        this.log('Fetching users...', 'info');

        this.apiService.getUsers().pipe(
            finalize(() => this.loading = false)
        ).subscribe({
            next: (users) => {
                this.users = users;
                this.applyFilter();
                this.log(`Loaded ${users.length} users`, 'success');
            },
            error: (err) => this.log(`Failed: ${err.message}`, 'error')
        });
    }

    // Search
    setupSearch(): void {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(() => this.applyFilter());
    }

    onSearch(term: string): void {
        this.searchSubject.next(term);
    }

    applyFilter(): void {
        if (!this.searchTerm.trim()) {
            this.filteredUsers = [...this.users];
        } else {
            const term = this.searchTerm.toLowerCase();
            this.filteredUsers = this.users.filter(u =>
                u.name.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term)
            );
        }
    }

    // Selection
    toggleSelect(id: number): void {
        if (this.selectedIds.has(id)) {
            this.selectedIds.delete(id);
        } else {
            this.selectedIds.add(id);
        }
    }

    toggleSelectAll(): void {
        if (this.allSelected) {
            this.selectedIds.clear();
        } else {
            this.filteredUsers.forEach(u => this.selectedIds.add(u.id));
        }
    }

    // Create
    openCreateForm(): void {
        this.showCreateForm = true;
        this.newUser = { name: '', email: '', age: 25, isActive: true };
    }

    createUser(): void {
        if (!this.newUser.name || !this.newUser.email) return;

        this.creating = true;
        this.log(`Creating user: ${this.newUser.name}`, 'info');

        this.apiService.createUser({
            ...this.newUser,
            avatar: '👤',
            roles: ['user'],
            favoriteColors: []
        }).pipe(
            finalize(() => this.creating = false)
        ).subscribe({
            next: (user) => {
                this.users.unshift(user);
                this.applyFilter();
                this.showCreateForm = false;
                this.log(`Created: ${user.name} (ID: ${user.id})`, 'success');
            },
            error: (err) => this.log(`Create failed: ${err.message}`, 'error')
        });
    }

    // Inline Edit
    startEdit(user: User): void {
        this.editingId = user.id;
        this.editingUser = { ...user }; // Clone to avoid mutation
        this.log(`Editing user: ${user.name}`, 'info');
    }

    cancelEdit(): void {
        this.editingId = null;
        this.editingUser = null;
        this.log('Edit cancelled', 'warning');
    }

    saveEdit(): void {
        if (!this.editingUser) return;

        this.log(`Saving: ${this.editingUser.name}`, 'info');

        // OPTIMISTIC UPDATE: Update UI immediately
        const index = this.users.findIndex(u => u.id === this.editingId);
        const originalUser = { ...this.users[index] };
        this.users[index] = { ...this.editingUser };
        this.applyFilter();

        // Then sync with server
        this.apiService.updateUser(this.editingUser.id, this.editingUser).subscribe({
            next: () => {
                this.log(`Updated: ${this.editingUser!.name}`, 'success');
                this.editingId = null;
                this.editingUser = null;
            },
            error: (err) => {
                // ROLLBACK on error
                this.users[index] = originalUser;
                this.applyFilter();
                this.log(`Update failed, rolled back: ${err.message}`, 'error');
            }
        });
    }

    // Delete
    deleteUser(user: User): void {
        if (!confirm(`Delete ${user.name}?`)) return;

        this.log(`Deleting: ${user.name}`, 'info');

        // OPTIMISTIC DELETE
        const index = this.users.findIndex(u => u.id === user.id);
        const backup = this.users[index];
        this.users.splice(index, 1);
        this.applyFilter();
        this.selectedIds.delete(user.id);

        this.apiService.deleteUser(user.id).subscribe({
            next: () => this.log(`Deleted: ${user.name}`, 'success'),
            error: (err) => {
                // ROLLBACK
                this.users.splice(index, 0, backup);
                this.applyFilter();
                this.log(`Delete failed, restored: ${err.message}`, 'error');
            }
        });
    }

    // Bulk Delete
    bulkDelete(): void {
        const count = this.selectedIds.size;
        if (!confirm(`Delete ${count} users?`)) return;

        this.log(`Bulk deleting ${count} users...`, 'warning');

        // In real app, you'd have a batch delete endpoint
        // For demo, we delete one by one with optimistic updates
        const idsToDelete = [...this.selectedIds];
        idsToDelete.forEach(id => {
            const index = this.users.findIndex(u => u.id === id);
            if (index > -1) this.users.splice(index, 1);
        });
        this.selectedIds.clear();
        this.applyFilter();
        this.log(`Bulk deleted ${count} users`, 'success');
    }
}
