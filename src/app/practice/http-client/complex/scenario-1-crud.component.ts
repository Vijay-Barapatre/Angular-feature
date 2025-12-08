/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: CRUD APPLICATION
 * ============================================================================
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

@Component({
    selector: 'app-scenario-1-crud',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: CRUD Todo Application</h2>
                <p>Build a complete Create, Read, Update, Delete application.</p>
            </div>

            <div class="app-container">
                <div class="add-form">
                    <input [(ngModel)]="newTodoTitle" placeholder="Add new todo..." (keyup.enter)="createTodo()">
                    <button (click)="createTodo()">Add</button>
                </div>

                @if (loading()) {
                    <div class="loading">Loading todos...</div>
                }

                <div class="todos-list">
                    @for (todo of todos(); track todo.id) {
                        <div class="todo-item" [class.completed]="todo.completed">
                            <input type="checkbox" 
                                [checked]="todo.completed" 
                                (change)="toggleTodo(todo)">
                            
                            @if (editingId() === todo.id) {
                                <input [(ngModel)]="editTitle" class="edit-input" (keyup.enter)="saveEdit(todo)">
                                <button class="save" (click)="saveEdit(todo)">💾</button>
                                <button class="cancel" (click)="cancelEdit()">❌</button>
                            } @else {
                                <span class="todo-title">{{ todo.title }}</span>
                                <button class="edit" (click)="startEdit(todo)">✏️</button>
                                <button class="delete" (click)="deleteTodo(todo.id)">🗑️</button>
                            }
                        </div>
                    }
                </div>

                <div class="stats">
                    <span>Total: {{ todos().length }}</span>
                    <span>Completed: {{ completedCount() }}</span>
                    <span>Pending: {{ todos().length - completedCount() }}</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 600px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; }
        .app-container { background: white; padding: 1.5rem; border-radius: 8px; }
        .add-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .add-form input { flex: 1; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .add-form button { padding: 0.75rem 1.5rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .loading { padding: 1rem; text-align: center; color: #6b7280; }
        .todo-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .todo-item.completed .todo-title { text-decoration: line-through; color: #9ca3af; }
        .todo-title { flex: 1; }
        .edit-input { flex: 1; padding: 0.5rem; border: 1px solid #06b6d4; border-radius: 4px; }
        .todo-item button { padding: 0.25rem 0.5rem; border: none; background: transparent; cursor: pointer; font-size: 1rem; }
        .todo-item button:hover { background: #e5e7eb; border-radius: 4px; }
        .stats { display: flex; justify-content: space-around; padding: 1rem; background: #1e1e2e; border-radius: 8px; color: white; margin-top: 1rem; font-size: 0.9rem; }
    `]
})
export class Scenario1CrudComponent {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

    todos = signal<Todo[]>([]);
    loading = signal(false);
    newTodoTitle = '';
    editingId = signal<number | null>(null);
    editTitle = '';

    constructor() {
        this.loadTodos();
    }

    loadTodos(): void {
        this.loading.set(true);
        this.http.get<Todo[]>(`${this.apiUrl}?_limit=10`).subscribe({
            next: (data) => {
                this.todos.set(data);
                this.loading.set(false);
            }
        });
    }

    createTodo(): void {
        if (!this.newTodoTitle.trim()) return;

        const newTodo = {
            userId: 1,
            title: this.newTodoTitle,
            completed: false
        };

        this.http.post<Todo>(this.apiUrl, newTodo).subscribe({
            next: (created) => {
                this.todos.update(t => [created, ...t]);
                this.newTodoTitle = '';
            }
        });
    }

    toggleTodo(todo: Todo): void {
        const updated = { ...todo, completed: !todo.completed };
        this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updated).subscribe({
            next: () => {
                this.todos.update(todos =>
                    todos.map(t => t.id === todo.id ? updated : t)
                );
            }
        });
    }

    startEdit(todo: Todo): void {
        this.editingId.set(todo.id);
        this.editTitle = todo.title;
    }

    saveEdit(todo: Todo): void {
        const updated = { ...todo, title: this.editTitle };
        this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updated).subscribe({
            next: () => {
                this.todos.update(todos =>
                    todos.map(t => t.id === todo.id ? updated : t)
                );
                this.editingId.set(null);
            }
        });
    }

    cancelEdit(): void {
        this.editingId.set(null);
    }

    deleteTodo(id: number): void {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe({
            next: () => {
                this.todos.update(todos => todos.filter(t => t.id !== id));
            }
        });
    }

    completedCount(): number {
        return this.todos().filter(t => t.completed).length;
    }
}
