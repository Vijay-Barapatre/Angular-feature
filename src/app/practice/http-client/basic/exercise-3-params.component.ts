/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: QUERY PARAMETERS & HEADERS
 * ============================================================================
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-3-params',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Query Parameters & Headers</h2>
                <p>Learn to pass query params and custom headers.</p>
            </div>

            <div class="demo">
                <h3>🔍 Search with Params</h3>
                
                <div class="filters">
                    <div class="filter-group">
                        <label>User ID:</label>
                        <input type="number" [(ngModel)]="userId" min="1" max="10">
                    </div>
                    <div class="filter-group">
                        <label>Limit:</label>
                        <select [(ngModel)]="limit">
                            <option [value]="5">5</option>
                            <option [value]="10">10</option>
                            <option [value]="20">20</option>
                        </select>
                    </div>
                    <button (click)="fetchWithParams()">Search</button>
                </div>

                <div class="code-preview">
                    <h4>Generated URL:</h4>
                    <code>{{ generatedUrl() }}</code>
                </div>

                @if (posts().length > 0) {
                    <div class="results">
                        <h4>Results ({{ posts().length }} posts)</h4>
                        @for (post of posts(); track post.id) {
                            <div class="item">{{ post.title }}</div>
                        }
                    </div>
                }

                <hr>

                <h3>📋 Custom Headers</h3>
                <div class="headers-demo">
                    <p>Common headers to set:</p>
                    <ul>
                        <li><code>Authorization: Bearer token</code></li>
                        <li><code>Content-Type: application/json</code></li>
                        <li><code>X-Custom-Header: value</code></li>
                    </ul>
                    <button (click)="fetchWithHeaders()">Fetch with Headers</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #ecfeff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .filters { display: flex; gap: 1rem; align-items: flex-end; margin-bottom: 1rem; }
        .filter-group { display: flex; flex-direction: column; gap: 0.25rem; }
        .filter-group input, .filter-group select { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .filters button { padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 4px; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; }
        .code-preview h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; word-break: break-all; }
        .results { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .item { padding: 0.5rem; background: white; border-radius: 4px; margin-bottom: 0.25rem; font-size: 0.9rem; }
        hr { margin: 1.5rem 0; }
        .headers-demo ul { margin: 0.5rem 0 1rem; }
        .headers-demo code { background: #f3f4f6; padding: 0.125rem 0.25rem; border-radius: 2px; font-size: 0.85rem; }
    `]
})
export class Exercise3ParamsComponent {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    userId = 1;
    limit = 5;
    posts = signal<any[]>([]);
    generatedUrl = signal('');

    /**
     * TODO: Fetch with query parameters using HttpParams
     */
    fetchWithParams(): void {
        const params = new HttpParams()
            .set('userId', this.userId.toString())
            .set('_limit', this.limit.toString());

        this.generatedUrl.set(`${this.apiUrl}?${params.toString()}`);

        this.http.get<any[]>(this.apiUrl, { params }).subscribe({
            next: (data) => this.posts.set(data),
            error: (err) => console.error(err)
        });
    }

    /**
     * TODO: Fetch with custom headers
     */
    fetchWithHeaders(): void {
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer fake-token-123')
            .set('X-Custom-Header', 'my-value');

        this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
            next: (data) => {
                this.posts.set(data.slice(0, 5));
                console.log('Request sent with custom headers');
            }
        });
    }
}
