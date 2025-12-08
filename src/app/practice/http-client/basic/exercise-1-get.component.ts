/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: GET REQUESTS
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to make GET requests using HttpClient.
 * 
 * 📝 CONCEPTS:
 * - Injecting HttpClient
 * - Observable-based API
 * - Subscribing to responses
 * - Type-safe responses with generics
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
}

@Component({
    selector: 'app-exercise-1-get',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: GET Requests</h2>
                <p>Learn to fetch data from APIs using HttpClient GET method.</p>
                
                <h4>Key Concepts:</h4>
                <ul>
                    <li>Inject HttpClient using inject()</li>
                    <li>Call http.get&lt;Type&gt;(url)</li>
                    <li>Subscribe to handle response</li>
                </ul>
            </div>

            <div class="demo">
                <h3>📡 Fetch Data Examples</h3>
                
                <div class="actions">
                    <button (click)="fetchPosts()" [disabled]="loading()">
                        {{ loading() ? 'Loading...' : 'Fetch Posts' }}
                    </button>
                    <button (click)="fetchUsers()" [disabled]="loading()">
                        Fetch Users
                    </button>
                    <button (click)="fetchSinglePost()" [disabled]="loading()">
                        Fetch Post #1
                    </button>
                </div>

                @if (error()) {
                    <div class="error-box">❌ {{ error() }}</div>
                }

                @if (posts().length > 0) {
                    <div class="results">
                        <h4>Posts ({{ posts().length }} items)</h4>
                        @for (post of posts().slice(0, 5); track post.id) {
                            <div class="item">
                                <strong>{{ post.title }}</strong>
                                <p>{{ post.body | slice:0:100 }}...</p>
                            </div>
                        }
                    </div>
                }

                @if (users().length > 0) {
                    <div class="results">
                        <h4>Users ({{ users().length }} items)</h4>
                        @for (user of users(); track user.id) {
                            <div class="item">
                                <strong>{{ user.name }}</strong>
                                <span>{{ user.email }}</span>
                            </div>
                        }
                    </div>
                }

                @if (singlePost()) {
                    <div class="results single">
                        <h4>Single Post</h4>
                        <div class="item">
                            <strong>{{ singlePost()?.title }}</strong>
                            <p>{{ singlePost()?.body }}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #ecfeff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #06b6d4; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .actions button { padding: 0.75rem 1.25rem; border: none; border-radius: 6px; background: #06b6d4; color: white; cursor: pointer; }
        .actions button:disabled { opacity: 0.5; }
        .error-box { padding: 1rem; background: #fef2f2; color: #dc2626; border-radius: 8px; margin-bottom: 1rem; }
        .results { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-top: 1rem; }
        .results h4 { margin: 0 0 0.75rem; }
        .item { padding: 0.75rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; border-left: 3px solid #06b6d4; }
        .item strong { display: block; margin-bottom: 0.25rem; }
        .item p { margin: 0; font-size: 0.9rem; color: #6b7280; }
        .item span { font-size: 0.85rem; color: #6b7280; }
    `]
})
export class Exercise1GetComponent {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com';

    loading = signal(false);
    error = signal('');
    posts = signal<Post[]>([]);
    users = signal<User[]>([]);
    singlePost = signal<Post | null>(null);

    /**
     * TODO: Fetch all posts
     * 
     * HINT:
     * this.http.get<Post[]>(`${this.apiUrl}/posts`).subscribe({
     *     next: (data) => this.posts.set(data),
     *     error: (err) => this.error.set(err.message)
     * });
     */
    fetchPosts(): void {
        this.clearResults();
        this.loading.set(true);

        this.http.get<Post[]>(`${this.apiUrl}/posts`).subscribe({
            next: (data) => {
                this.posts.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.loading.set(false);
            }
        });
    }

    /**
     * TODO: Fetch all users
     */
    fetchUsers(): void {
        this.clearResults();
        this.loading.set(true);

        this.http.get<User[]>(`${this.apiUrl}/users`).subscribe({
            next: (data) => {
                this.users.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.loading.set(false);
            }
        });
    }

    /**
     * TODO: Fetch single post by ID
     */
    fetchSinglePost(): void {
        this.clearResults();
        this.loading.set(true);

        this.http.get<Post>(`${this.apiUrl}/posts/1`).subscribe({
            next: (data) => {
                this.singlePost.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.loading.set(false);
            }
        });
    }

    private clearResults(): void {
        this.posts.set([]);
        this.users.set([]);
        this.singlePost.set(null);
        this.error.set('');
    }
}
