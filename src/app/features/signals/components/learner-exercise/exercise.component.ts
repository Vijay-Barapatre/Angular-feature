/**
 * LEARNER EXERCISE: Build a Todo App with Signals
 * 
 * Practice what you've learned by completing this exercise!
 * Look for TODO comments with hints.
 */

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

@Component({
    selector: 'app-learner-exercise',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="exercise-container">
            <header class="exercise-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>🎯 Learner Exercise: Todo App</h1>
                <p>Practice Signals by building a reactive todo list!</p>
            </header>

            <section class="instructions">
                <h2>📝 Instructions</h2>
                <ol>
                    <li>Create a signal to hold the todos array</li>
                    <li>Create a computed signal for completed/incomplete counts</li>
                    <li>Implement add, toggle, and delete functionality</li>
                    <li>Add a filter (all/active/completed)</li>
                </ol>
            </section>

            <section class="exercise-area">
                <div class="todo-app">
                    <h2>📋 My Todo List</h2>
                    
                    <div class="add-todo">
                        <input 
                            type="text" 
                            [(ngModel)]="newTodoText" 
                            placeholder="What needs to be done?"
                            (keyup.enter)="addTodo()"
                        />
                        <button (click)="addTodo()">Add</button>
                    </div>

                    <div class="stats">
                        <span>Total: {{ totalCount() }}</span>
                        <span>Completed: {{ completedCount() }}</span>
                        <span>Remaining: {{ remainingCount() }}</span>
                    </div>

                    <div class="filter-buttons">
                        <button 
                            [class.active]="filter() === 'all'"
                            (click)="filter.set('all')"
                        >All</button>
                        <button 
                            [class.active]="filter() === 'active'"
                            (click)="filter.set('active')"
                        >Active</button>
                        <button 
                            [class.active]="filter() === 'completed'"
                            (click)="filter.set('completed')"
                        >Completed</button>
                    </div>

                    <ul class="todo-list">
                        @for (todo of filteredTodos(); track todo.id) {
                            <li [class.completed]="todo.completed">
                                <input 
                                    type="checkbox" 
                                    [checked]="todo.completed"
                                    (change)="toggleTodo(todo.id)"
                                />
                                <span>{{ todo.text }}</span>
                                <button (click)="deleteTodo(todo.id)">🗑️</button>
                            </li>
                        }
                    </ul>

                    @if (completedCount() > 0) {
                        <button class="clear-btn" (click)="clearCompleted()">
                            Clear Completed
                        </button>
                    }
                </div>
            </section>

            <section class="hints">
                <h2>💡 Hints</h2>
                <details>
                    <summary>Hint 1: Creating the todos signal</summary>
                    <code>todos = signal&lt;Todo[]&gt;([]);</code>
                </details>
                <details>
                    <summary>Hint 2: Computed counts</summary>
                    <code>completedCount = computed(() => this.todos().filter(t => t.completed).length);</code>
                </details>
                <details>
                    <summary>Hint 3: Adding a todo</summary>
                    <code>this.todos.update(t => [...t, newTodo]);</code>
                </details>
            </section>
        </div>
    `,
    styles: [`
        .exercise-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        .exercise-header { margin-bottom: 2rem; }
        .back-link { color: var(--primary-light); text-decoration: none; }
        h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h2 { color: var(--primary-light); }
        .instructions {
            background: var(--bg-card);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .instructions ol { padding-left: 1.5rem; color: var(--text-secondary); }
        .instructions li { margin: 0.5rem 0; }
        .todo-app {
            background: var(--bg-card);
            padding: 2rem;
            border-radius: 12px;
            border: 2px solid rgba(102, 126, 234, 0.3);
        }
        .add-todo {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .add-todo input {
            flex: 1;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid rgba(102, 126, 234, 0.3);
            background: var(--bg-secondary);
            color: var(--text-primary);
        }
        .add-todo button {
            padding: 0.75rem 1.5rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        .stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 1rem;
            color: var(--text-secondary);
        }
        .filter-buttons {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .filter-buttons button {
            padding: 0.5rem 1rem;
            border: 1px solid rgba(102, 126, 234, 0.3);
            background: transparent;
            color: var(--text-secondary);
            border-radius: 6px;
            cursor: pointer;
        }
        .filter-buttons button.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        .todo-list {
            list-style: none;
            padding: 0;
        }
        .todo-list li {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        }
        .todo-list li.completed span {
            text-decoration: line-through;
            color: var(--text-secondary);
        }
        .todo-list li button {
            margin-left: auto;
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.5;
        }
        .todo-list li:hover button { opacity: 1; }
        .clear-btn {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        .hints {
            margin-top: 2rem;
            padding: 1.5rem;
            background: var(--bg-card);
            border-radius: 12px;
        }
        .hints details {
            margin: 0.5rem 0;
            padding: 0.5rem;
            background: var(--bg-secondary);
            border-radius: 6px;
        }
        .hints code {
            display: block;
            margin-top: 0.5rem;
            padding: 0.5rem;
            background: #1e293b;
            border-radius: 4px;
            color: #94a3b8;
        }
    `]
})
export class LearnerExerciseComponent {
    // 🚦 Signals for state management
    todos = signal<Todo[]>([
        { id: 1, text: 'Learn Angular Signals', completed: true },
        { id: 2, text: 'Build a todo app', completed: false },
        { id: 3, text: 'Practice computed signals', completed: false }
    ]);

    filter = signal<'all' | 'active' | 'completed'>('all');
    newTodoText = '';
    private nextId = 4;

    // 🧮 Computed signals for derived state
    totalCount = computed(() => this.todos().length);
    completedCount = computed(() => this.todos().filter(t => t.completed).length);
    remainingCount = computed(() => this.todos().filter(t => !t.completed).length);

    filteredTodos = computed(() => {
        const todos = this.todos();
        const f = this.filter();
        switch (f) {
            case 'active': return todos.filter(t => !t.completed);
            case 'completed': return todos.filter(t => t.completed);
            default: return todos;
        }
    });

    addTodo(): void {
        if (this.newTodoText.trim()) {
            this.todos.update(todos => [
                ...todos,
                { id: this.nextId++, text: this.newTodoText, completed: false }
            ]);
            this.newTodoText = '';
        }
    }

    toggleTodo(id: number): void {
        this.todos.update(todos =>
            todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
    }

    deleteTodo(id: number): void {
        this.todos.update(todos => todos.filter(t => t.id !== id));
    }

    clearCompleted(): void {
        this.todos.update(todos => todos.filter(t => !t.completed));
    }
}
