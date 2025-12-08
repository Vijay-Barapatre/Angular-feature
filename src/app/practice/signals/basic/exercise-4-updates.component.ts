/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: SIGNAL UPDATES
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

@Component({
    selector: 'app-exercise-4-updates',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Signal Updates</h2>
                <p>Learn different ways to update signals: set(), update(), mutate().</p>
                
                <h4>Update Methods:</h4>
                <ul>
                    <li><code>set(value)</code> - Replace entire value</li>
                    <li><code>update(fn)</code> - Update based on previous value</li>
                </ul>
            </div>

            <div class="demo">
                <h3>📝 Todo List</h3>
                
                <div class="add-todo">
                    <input #newTodo placeholder="Add new todo..." (keyup.enter)="addTodo(newTodo.value); newTodo.value = ''">
                    <button (click)="addTodo(newTodo.value); newTodo.value = ''">Add</button>
                </div>

                <div class="todos">
                    @for (todo of todos(); track todo.id) {
                        <div class="todo-item" [class.completed]="todo.completed">
                            <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo.id)">
                            <span>{{ todo.text }}</span>
                            <button class="delete" (click)="deleteTodo(todo.id)">×</button>
                        </div>
                    }
                </div>

                <div class="stats">
                    <span>{{ completedCount() }}/{{ todos().length }} completed</span>
                    <button (click)="clearCompleted()">Clear Completed</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        code { background: #1e1e2e; color: #a6e3a1; padding: 0.125rem 0.25rem; border-radius: 2px; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .add-todo { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .add-todo input { flex: 1; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .add-todo button { padding: 0.75rem 1.5rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .todo-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .todo-item.completed span { text-decoration: line-through; color: #9ca3af; }
        .todo-item span { flex: 1; }
        .todo-item .delete { background: none; border: none; font-size: 1.25rem; color: #ef4444; cursor: pointer; }
        .stats { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #e5e7eb; }
        .stats button { padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; }
    `]
})
export class Exercise4UpdatesComponent {
    private nextId = 1;

    todos = signal<Todo[]>([
        { id: this.nextId++, text: 'Learn signals', completed: true },
        { id: this.nextId++, text: 'Practice computed', completed: false },
        { id: this.nextId++, text: 'Master effects', completed: false }
    ]);

    completedCount = () => this.todos().filter(t => t.completed).length;

    /**
     * TODO: Add a new todo using update()
     * 
     * HINT: this.todos.update(todos => [...todos, newTodo]);
     */
    addTodo(text: string): void {
        if (!text.trim()) return;

        const newTodo: Todo = {
            id: this.nextId++,
            text: text.trim(),
            completed: false
        };

        // TODO: Implement using update()
        this.todos.update(todos => [...todos, newTodo]);
    }

    /**
     * TODO: Toggle todo completion using update()
     * 
     * HINT: this.todos.update(todos => 
     *     todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
     * );
     */
    toggleTodo(id: number): void {
        // TODO: Implement
        this.todos.update(todos =>
            todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
    }

    /**
     * TODO: Delete todo using update()
     */
    deleteTodo(id: number): void {
        // TODO: Implement
        this.todos.update(todos => todos.filter(t => t.id !== id));
    }

    /**
     * TODO: Clear completed todos using update()
     */
    clearCompleted(): void {
        // TODO: Implement
        this.todos.update(todos => todos.filter(t => !t.completed));
    }
}
