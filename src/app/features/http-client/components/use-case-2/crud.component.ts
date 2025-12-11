/**
 * ============================================================================
 * USE CASE 2: CRUD OPERATIONS (ENHANCED)
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * Complete Create, Read, Update, Delete operations using Angular HttpClient.
 * Shows real-world patterns beyond basic CRUD.
 * 
 * 💡 KEY CONCEPTS COVERED:
 * 
 * 1. HTTP METHODS:
 *    - GET: Read/fetch data (idempotent - same result every time)
 *    - POST: Create new resource (not idempotent - creates new each time)
 *    - PUT: Update entire resource (idempotent - same result if repeated)
 *    - PATCH: Update partial resource (for partial updates)
 *    - DELETE: Remove resource (idempotent)
 * 
 * 2. OPTIMISTIC UPDATES:
 *    - Update UI immediately before server confirms
 *    - Rollback if server request fails
 *    - Better UX (no waiting for spinner)
 *    
 * 3. BULK OPERATIONS:
 *    - Select multiple items
 *    - Batch delete/update
 *    - Confirm before destructive actions
 * 
 * 4. INLINE EDITING:
 *    - Edit data in-place (no modal)
 *    - Cancel to revert changes
 *    - Save sends to server
 * 
 * 5. SEARCH WITH DEBOUNCE:
 *    - Filter as you type
 *    - debounceTime prevents excessive filtering
 *    - Client-side filter (could be server-side for large datasets)
 * 
 * ⚠️ IMPORTANT PATTERNS:
 * 
 * OPTIMISTIC UPDATE PATTERN:
 * 1. Store original data (for rollback)
 * 2. Update UI immediately
 * 3. Send request to server
 * 4. On error: Rollback to original
 * 5. On success: Optional - sync with server response
 * 
 * PESSIMISTIC UPDATE PATTERN (simpler, safer):
 * 1. Send request to server
 * 2. Wait for response
 * 3. Update UI with server response
 * 
 * 🔗 HTTP STATUS CODES TO KNOW:
 * - 200 OK: Success (usually GET, PUT)
 * - 201 Created: Resource created (POST)
 * - 204 No Content: Success but no body (DELETE)
 * - 400 Bad Request: Invalid data sent
 * - 401 Unauthorized: Need to login
 * - 403 Forbidden: Not allowed
 * - 404 Not Found: Resource doesn't exist
 * - 500 Server Error: Backend issue
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

    // 🕒 LIFECYCLE HOOK: ngOnInit
    // WHY HERE?
    // 1. Component is fully initialized: All injected services (ApiService) are ready.
    // 2. Safe to make HTTP requests: The component is about to be displayed.
    // 3. Setup subscriptions: RxJS search Subject needs to be configured before user interaction.
    //
    // WHY NOT CONSTRUCTOR?
    // - Constructor should be simple and fast (only for basic initialization).
    // - HTTP calls in constructor can cause issues with testing and SSR.
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

    /**
     * 🔍 APPLY SEARCH FILTER
     * 
     * Filters the users array based on search term.
     * Uses spread operator to create copies.
     */
    applyFilter(): void {
        if (!this.searchTerm.trim()) {
            // =====================================================================
            // SPREAD OPERATOR EXPLAINED: [...this.users]
            // =====================================================================
            // 
            // [...this.users] creates a SHALLOW COPY of the array.
            // 
            // The three dots (...) is called the "spread operator".
            // It "spreads" all elements of an array into a new array.
            // 
            // WHY USE IT?
            // -----------
            // If we did: this.filteredUsers = this.users;
            // Both variables point to the SAME array in memory.
            // Modifying one would affect the other!
            // 
            // With spread: this.filteredUsers = [...this.users];
            // We create a NEW array with the same elements.
            // Now they are independent arrays.
            // 
            // VISUAL EXAMPLE:
            // ---------------
            // const original = [1, 2, 3];
            // 
            // ❌ const copy = original;         // Same reference!
            //    copy.push(4);
            //    console.log(original); // [1, 2, 3, 4] - MODIFIED!
            // 
            // ✅ const copy = [...original];    // New array!
            //    copy.push(4);
            //    console.log(original); // [1, 2, 3] - Unchanged!
            // 
            // OTHER USES:
            // -----------
            // Combine arrays: [...arr1, ...arr2]
            // Add element:    [...arr, newItem]
            // Copy object:    { ...obj }
            // 
            // ⚠️ WARNING: This is a SHALLOW copy!
            // For nested objects, inner objects are still shared.
            // Use structuredClone() for deep copies.
            // =====================================================================
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

    /**
     * 📝 OPEN CREATE FORM
     * 
     * Shows the create form and initializes with default values.
     */
    openCreateForm(): void {
        this.showCreateForm = true;
        this.newUser = { name: '', email: '', age: 25, isActive: true };
    }

    // =========================================================================
    // CREATE - POST REQUEST
    // =========================================================================
    /**
     * ➕ CREATE NEW USER
     * 
     * HTTP Method: POST
     * Endpoint: /api/users
     * Body: New user data (JSON)
     * Response: Created user with server-generated ID
     * 
     * FLOW:
     * 1. Validate input (guard clause)
     * 2. Set creating flag (disable button)
     * 3. Send POST request with user data
     * 4. On success: Add to local array, close form
     * 5. On error: Show error message
     * 
     * POST vs PUT:
     * - POST: Create NEW resource, server assigns ID
     * - PUT: Update EXISTING resource at specific ID
     */
    createUser(): void {
        // Guard clause: Validate required fields
        if (!this.newUser.name || !this.newUser.email) return;

        this.creating = true;
        this.log(`Creating user: ${this.newUser.name}`, 'info');

        // POST request with new user data
        this.apiService.createUser({
            ...this.newUser,
            avatar: '👤',
            roles: ['user'],
            favoriteColors: []
        }).pipe(
            finalize(() => this.creating = false)  // Always reset flag
        ).subscribe({
            next: (user) => {
                // Add to start of array (newest first)
                this.users.unshift(user);
                this.applyFilter();
                this.showCreateForm = false;
                this.log(`Created: ${user.name} (ID: ${user.id})`, 'success');
            },
            error: (err) => this.log(`Create failed: ${err.message}`, 'error')
        });
    }

    // =========================================================================
    // READ / INLINE EDIT START
    // =========================================================================
    /**
     * ✏️ START INLINE EDITING
     * 
     * Instead of opening a modal, we edit the row in-place.
     * 
     * IMPORTANT: Clone the user object!
     * If we don't clone, changes would mutate the original immediately,
     * making "Cancel" impossible and breaking optimistic update rollback.
     * 
     * { ...user } creates a shallow copy (good enough for flat objects)
     * For nested objects, use structuredClone() or lodash deepClone
     */
    startEdit(user: User): void {
        this.editingId = user.id;
        this.editingUser = { ...user }; // Clone to avoid direct mutation
        this.log(`Editing user: ${user.name}`, 'info');
    }

    /**
     * ❌ CANCEL EDITING
     * 
     * Simply clear the editing state.
     * Because we cloned, the original data is untouched.
     */
    cancelEdit(): void {
        this.editingId = null;
        this.editingUser = null;
        this.log('Edit cancelled', 'warning');
    }

    // =========================================================================
    // UPDATE - PUT REQUEST WITH OPTIMISTIC UPDATE
    // =========================================================================
    /**
     * 💾 SAVE EDIT - OPTIMISTIC UPDATE PATTERN
     * 
     * HTTP Method: PUT (full update) or PATCH (partial update)
     * Endpoint: /api/users/{id}
     * Body: Updated user data
     * 
     * 🚀 OPTIMISTIC UPDATE EXPLAINED:
     * 
     * Instead of: Request → Wait → Update UI (slow, poor UX)
     * We do:      Update UI → Request → Rollback if fails (fast, great UX)
     * 
     * STEPS:
     * 1. Save original data (for rollback)
     * 2. Update UI immediately (user sees instant feedback)
     * 3. Send request to server
     * 4. If SUCCESS: We're already updated, just clear editing state
     * 5. If ERROR: Rollback to original data, show error
     * 
     * WHY USE THIS:
     * - Faster perceived performance
     * - Apps feel snappier
     * - Users don't wait for spinner
     * 
     * WHEN NOT TO USE:
     * - Critical data (financial transactions)
     * - When server validation is complex
     * - When rollback would confuse users
     */
    saveEdit(): void {
        if (!this.editingUser) return;

        this.log(`Saving: ${this.editingUser.name}`, 'info');

        // STEP 1: Store original for rollback
        const index = this.users.findIndex(u => u.id === this.editingId);
        const originalUser = { ...this.users[index] };

        // STEP 2: Update UI immediately (OPTIMISTIC!)
        this.users[index] = { ...this.editingUser };
        this.applyFilter();

        // STEP 3: Sync with server
        this.apiService.updateUser(this.editingUser.id, this.editingUser).subscribe({
            next: () => {
                // STEP 4a: Success - just cleanup
                this.log(`Updated: ${this.editingUser!.name}`, 'success');
                this.editingId = null;
                this.editingUser = null;
            },
            error: (err) => {
                // STEP 4b: Error - ROLLBACK!
                this.users[index] = originalUser;
                this.applyFilter();
                this.log(`Update failed, rolled back: ${err.message}`, 'error');
            }
        });
    }

    // =========================================================================
    // DELETE - DELETE REQUEST WITH OPTIMISTIC UPDATE
    // =========================================================================
    /**
     * 🗑️ DELETE USER - OPTIMISTIC DELETE PATTERN
     * 
     * HTTP Method: DELETE
     * Endpoint: /api/users/{id}
     * Response: Usually 204 No Content (empty body)
     * 
     * Same optimistic pattern as update:
     * 1. Confirm with user (destructive action!)
     * 2. Save backup (for rollback)
     * 3. Remove from UI immediately
     * 4. Send DELETE request
     * 5. If error: Restore from backup
     * 
     * ⚠️ ALWAYS CONFIRM DESTRUCTIVE ACTIONS!
     * Users can't undo server-side deletes.
     */
    deleteUser(user: User): void {
        // ALWAYS confirm destructive actions
        if (!confirm(`Delete ${user.name}?`)) return;

        this.log(`Deleting: ${user.name}`, 'info');

        // STEP 1: Save backup for rollback
        const index = this.users.findIndex(u => u.id === user.id);
        const backup = this.users[index];

        // STEP 2: Remove from UI immediately (OPTIMISTIC!)
        this.users.splice(index, 1);
        this.applyFilter();
        this.selectedIds.delete(user.id);

        // STEP 3: Send DELETE request to server
        this.apiService.deleteUser(user.id).subscribe({
            next: () => this.log(`Deleted: ${user.name}`, 'success'),
            error: (err) => {
                // STEP 4: Error - ROLLBACK!
                // Insert back at original position
                this.users.splice(index, 0, backup);
                this.applyFilter();
                this.log(`Delete failed, restored: ${err.message}`, 'error');
            }
        });
    }

    // =========================================================================
    // BULK DELETE - BATCH OPERATIONS
    // =========================================================================
    /**
     * 🗑️ BULK DELETE - BATCH OPERATION
     * 
     * Deletes multiple selected items at once.
     * 
     * REAL-WORLD CONSIDERATIONS:
     * 
     * 1. BACKEND BATCH ENDPOINT (preferred):
     *    DELETE /api/users/batch
     *    Body: { ids: [1, 2, 3] }
     *    - Single request, atomic operation
     *    - All succeed or all fail
     * 
     * 2. PARALLEL INDIVIDUAL REQUESTS:
     *    Promise.all([delete(1), delete(2), delete(3)])
     *    - Multiple requests at once
     *    - Partial success possible
     *    - More complex error handling
     * 
     * 3. SEQUENTIAL REQUESTS (what we do here for demo):
     *    - Simple but slow
     *    - OK for small batches
     * 
     * This demo uses optimistic update on client,
     * but in production you'd want server-side batch.
     */
    bulkDelete(): void {
        const count = this.selectedIds.size;

        // ALWAYS confirm bulk destructive actions
        if (!confirm(`Delete ${count} users?`)) return;

        this.log(`Bulk deleting ${count} users...`, 'warning');

        // For demo: Optimistic delete without server calls
        // In real app: Use batch endpoint or Promise.all
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
