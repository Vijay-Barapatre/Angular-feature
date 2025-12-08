/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: ERROR HANDLING
 * ============================================================================
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';

@Component({
    selector: 'app-exercise-4-errors',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Error Handling</h2>
                <p>Handle HTTP errors gracefully with RxJS operators.</p>
                
                <h4>Error Handling Strategies:</h4>
                <ul>
                    <li>catchError - Handle errors gracefully</li>
                    <li>retry - Retry failed requests</li>
                    <li>HttpErrorResponse - Detailed error info</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🚨 Error Scenarios</h3>
                
                <div class="actions">
                    <button (click)="triggerNotFound()">404 Not Found</button>
                    <button (click)="triggerServerError()">500 Server Error</button>
                    <button (click)="triggerTimeout()">Timeout</button>
                    <button (click)="fetchWithRetry()">Fetch with Retry</button>
                </div>

                @if (loading()) {
                    <div class="loading">Loading...</div>
                }

                @if (error()) {
                    <div class="error-details">
                        <h4>❌ Error Occurred</h4>
                        <p><strong>Status:</strong> {{ error()?.status }}</p>
                        <p><strong>Message:</strong> {{ error()?.message }}</p>
                        <p><strong>URL:</strong> {{ error()?.url }}</p>
                    </div>
                }

                @if (data()) {
                    <div class="success">
                        <h4>✅ Success</h4>
                        <p>{{ data() }}</p>
                    </div>
                }

                <div class="tips">
                    <h4>💡 Best Practices</h4>
                    <ul>
                        <li>Always handle errors in subscribe</li>
                        <li>Use catchError for centralized handling</li>
                        <li>Show user-friendly messages</li>
                        <li>Log errors for debugging</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #ecfeff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .actions button { padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .loading { padding: 1rem; background: #fef3c7; border-radius: 8px; }
        .error-details { padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444; margin-bottom: 1rem; }
        .error-details h4 { margin: 0 0 0.5rem; color: #dc2626; }
        .error-details p { margin: 0.25rem 0; font-size: 0.9rem; }
        .success { padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 1rem; }
        .tips { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .tips h4 { margin: 0 0 0.5rem; }
        .tips ul { margin: 0; padding-left: 1.25rem; }
    `]
})
export class Exercise4ErrorsComponent {
    private http = inject(HttpClient);

    loading = signal(false);
    error = signal<{ status: number; message: string; url: string } | null>(null);
    data = signal<string | null>(null);

    triggerNotFound(): void {
        this.resetState();
        this.loading.set(true);

        this.http.get('https://jsonplaceholder.typicode.com/posts/999999')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.handleError(error);
                    return of(null);
                })
            )
            .subscribe(() => this.loading.set(false));
    }

    triggerServerError(): void {
        this.resetState();
        this.loading.set(true);

        this.http.get('https://httpstat.us/500')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.handleError(error);
                    return of(null);
                })
            )
            .subscribe(() => this.loading.set(false));
    }

    triggerTimeout(): void {
        this.resetState();
        this.loading.set(true);

        // Simulated - actual timeout would need rxjs timeout operator
        setTimeout(() => {
            this.error.set({
                status: 0,
                message: 'Request timed out',
                url: 'https://example.com/slow-endpoint'
            });
            this.loading.set(false);
        }, 1000);
    }

    fetchWithRetry(): void {
        this.resetState();
        this.loading.set(true);

        this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                retry(3), // Retry up to 3 times
                catchError((error: HttpErrorResponse) => {
                    this.handleError(error);
                    return of([]);
                })
            )
            .subscribe({
                next: (posts) => {
                    this.data.set(`Fetched ${posts.length} posts successfully!`);
                    this.loading.set(false);
                }
            });
    }

    private handleError(error: HttpErrorResponse): void {
        this.error.set({
            status: error.status,
            message: error.message || 'Unknown error',
            url: error.url || 'Unknown URL'
        });
    }

    private resetState(): void {
        this.error.set(null);
        this.data.set(null);
    }
}
