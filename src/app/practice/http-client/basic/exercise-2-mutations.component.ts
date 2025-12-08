/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: POST/PUT/DELETE REQUESTS
 * ============================================================================
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Post {
    id?: number;
    userId: number;
    title: string;
    body: string;
}

@Component({
    selector: 'app-exercise-2-mutations',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: POST/PUT/DELETE</h2>
                <p>Learn to create, update, and delete data.</p>
            </div>

            <div class="demo">
                <h3>📝 Create Post (POST)</h3>
                <div class="form-group">
                    <input [(ngModel)]="newPost.title" placeholder="Post title">
                    <textarea [(ngModel)]="newPost.body" placeholder="Post body"></textarea>
                    <button (click)="createPost()">Create Post</button>
                </div>

                <hr>

                <h3>✏️ Update Post (PUT)</h3>
                <div class="form-group">
                    <input [(ngModel)]="updateData.id" type="number" placeholder="Post ID">
                    <input [(ngModel)]="updateData.title" placeholder="New title">
                    <button (click)="updatePost()">Update Post</button>
                </div>

                <hr>

                <h3>🗑️ Delete Post (DELETE)</h3>
                <div class="form-group row">
                    <input [(ngModel)]="deleteId" type="number" placeholder="Post ID to delete">
                    <button class="danger" (click)="deletePost()">Delete</button>
                </div>

                @if (result()) {
                    <div class="result-box">
                        <h4>Result:</h4>
                        <pre>{{ result() | json }}</pre>
                    </div>
                }

                @if (message()) {
                    <div class="message-box" [class.success]="!message().includes('Error')">
                        {{ message() }}
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #ecfeff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .form-group.row { flex-direction: row; }
        .form-group input, .form-group textarea { padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .form-group textarea { min-height: 80px; }
        .form-group button { padding: 0.75rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .form-group button.danger { background: #ef4444; }
        hr { margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb; }
        .result-box { padding: 1rem; background: #f0fdf4; border-radius: 8px; margin-top: 1rem; }
        .result-box pre { margin: 0; font-size: 0.85rem; overflow-x: auto; }
        .message-box { padding: 1rem; border-radius: 8px; margin-top: 1rem; background: #fef2f2; color: #dc2626; }
        .message-box.success { background: #f0fdf4; color: #16a34a; }
    `]
})
export class Exercise2MutationsComponent {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    newPost: Post = { userId: 1, title: '', body: '' };
    updateData = { id: 1, title: '' };
    deleteId = 1;

    result = signal<any>(null);
    message = signal('');

    /**
     * TODO: Create new post using POST
     */
    createPost(): void {
        this.http.post<Post>(this.apiUrl, this.newPost).subscribe({
            next: (response) => {
                this.result.set(response);
                this.message.set('✅ Post created successfully!');
            },
            error: (err) => this.message.set('Error: ' + err.message)
        });
    }

    /**
     * TODO: Update post using PUT
     */
    updatePost(): void {
        const url = `${this.apiUrl}/${this.updateData.id}`;
        const body = { title: this.updateData.title };

        this.http.put<Post>(url, body).subscribe({
            next: (response) => {
                this.result.set(response);
                this.message.set('✅ Post updated successfully!');
            },
            error: (err) => this.message.set('Error: ' + err.message)
        });
    }

    /**
     * TODO: Delete post using DELETE
     */
    deletePost(): void {
        const url = `${this.apiUrl}/${this.deleteId}`;

        this.http.delete(url).subscribe({
            next: () => {
                this.result.set({ deleted: true, id: this.deleteId });
                this.message.set('✅ Post deleted successfully!');
            },
            error: (err) => this.message.set('Error: ' + err.message)
        });
    }
}
