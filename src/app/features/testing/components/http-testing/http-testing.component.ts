/**
 * ============================================================================
 * HTTP TESTING DEMO COMPONENT
 * ============================================================================
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Post } from './api.service';

@Component({
    selector: 'app-http-testing',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🌐 HTTP Testing</h1>
                <p class="subtitle">HttpClientTestingModule & HttpTestingController</p>
            </header>

            <section class="demo-section">
                <h2>Posts from API</h2>
                
                <button class="btn" (click)="loadPosts()" [disabled]="loading()">
                    {{ loading() ? 'Loading...' : 'Fetch Posts' }}
                </button>

                @if (error()) {
                    <div class="error">{{ error() }}</div>
                }

                <div class="posts-grid">
                    @for (post of posts(); track post.id) {
                        <div class="post-card">
                            <h4>{{ post.title }}</h4>
                            <p>{{ post.body | slice:0:100 }}...</p>
                        </div>
                    }
                </div>
            </section>

            <section class="code-section">
                <h2>📝 HTTP Testing Patterns</h2>
                
                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>🔧 Setup</h3>
                        <pre><code>imports: [HttpClientTestingModule]

httpMock = TestBed.inject(HttpTestingController);</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>📡 expectOne</h3>
                        <pre><code>const req = httpMock.expectOne('/api/posts');
expect(req.request.method).toBe('GET');
req.flush(mockData);</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>❌ Error Testing</h3>
                        <pre><code>req.flush('Not Found', {{ '{' }}
  status: 404,
  statusText: 'Not Found'
{{ '}' }});</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>✅ Verify</h3>
                        <pre><code>afterEach(() => {{ '{' }}
  httpMock.verify();  // No pending requests
{{ '}' }});</code></pre>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            background: var(--primary-color, #667eea);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 1rem;
        }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .error { color: #ef4444; margin: 1rem 0; }

        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .post-card {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .post-card h4 { margin: 0 0 0.5rem 0; color: var(--primary-color, #667eea); }
        .post-card p { margin: 0; color: var(--text-secondary, #666); font-size: 0.85rem; }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
        }
        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #06b6d4;
        }
        .concept-card h3 { margin-top: 0; }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.8rem;
        }
    `]
})
export class HttpTestingComponent {
    private api = inject(ApiService);

    posts = signal<Post[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    loadPosts(): void {
        this.loading.set(true);
        this.error.set(null);

        this.api.getPosts().subscribe({
            next: (posts) => {
                this.posts.set(posts.slice(0, 6)); // Limit for demo
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.loading.set(false);
            }
        });
    }
}
