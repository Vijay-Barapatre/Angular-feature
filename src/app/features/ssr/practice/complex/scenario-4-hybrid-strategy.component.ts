/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: HYBRID SSR/SSG STRATEGY
 * ============================================================================
 * 
 * Implement a hybrid approach where some routes are prerendered (SSG)
 * and others use dynamic SSR.
 */

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface RouteStrategy {
    path: string;
    type: 'ssg' | 'ssr' | 'csr';
    reason: string;
    cacheTime?: string;
}

@Component({
    selector: 'app-scenario-hybrid-strategy',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario-container">
            <h2>🔀 Scenario 4: Hybrid SSR/SSG Strategy</h2>
            
            <div class="scenario-card">
                <h3>📋 Scenario</h3>
                <p>Design a hybrid architecture combining SSR, SSG, and CSR for different routes based on content type.</p>
            </div>

            <div class="strategy-section">
                <h3>📊 Route Strategy Matrix</h3>
                <table class="strategy-table">
                    <thead>
                        <tr>
                            <th>Route</th>
                            <th>Strategy</th>
                            <th>Reason</th>
                            <th>Cache</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let route of routes" [class]="route.type">
                            <td><code>{{ route.path }}</code></td>
                            <td><span class="badge" [class]="route.type">{{ route.type.toUpperCase() }}</span></td>
                            <td>{{ route.reason }}</td>
                            <td>{{ route.cacheTime || 'N/A' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="config-section">
                <h3>⚙️ Configuration Example</h3>
                <div class="code-block">
                    <pre><code>{{ configCode }}</code></pre>
                </div>
            </div>

            <div class="decision-flow">
                <h3>🔀 Decision Flow</h3>
                <div class="flow-chart">
                    <div class="flow-node start">New Route?</div>
                    <div class="flow-branch">
                        <div class="flow-path">
                            <span class="label">Static content?</span>
                            <div class="flow-node ssg">SSG - Prerender</div>
                        </div>
                        <div class="flow-path">
                            <span class="label">Personalized?</span>
                            <div class="flow-node ssr">SSR - Dynamic</div>
                        </div>
                        <div class="flow-path">
                            <span class="label">Auth required?</span>
                            <div class="flow-node csr">CSR - Client only</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="practice-task">
                <h3>🎯 Your Task</h3>
                <p>Implement route configuration for these page types:</p>
                <ul>
                    <li><strong>Marketing pages</strong> - What strategy and why?</li>
                    <li><strong>User dashboard</strong> - What strategy and why?</li>
                    <li><strong>Product catalog</strong> - What strategy and why?</li>
                    <li><strong>Search results</strong> - What strategy and why?</li>
                </ul>
            </div>

            <div class="solution">
                <details>
                    <summary>💡 Solution</summary>
                    <pre><code>{{ solutionCode }}</code></pre>
                </details>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 900px; margin: 0 auto; padding: 1.5rem; }
        h2 { border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        h3 { margin-top: 1.5rem; }
        
        .scenario-card { background: #fee2e2; padding: 1rem; border-radius: 8px; border-left: 4px solid #ef4444; }
        .scenario-card h3 { margin: 0 0 0.5rem; color: #b91c1c; }
        .scenario-card p { margin: 0; color: #991b1b; }
        
        .strategy-table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
        .strategy-table th, .strategy-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .strategy-table th { background: #f8fafc; font-weight: 600; }
        .strategy-table tr.ssg { background: #ecfdf5; }
        .strategy-table tr.ssr { background: #dbeafe; }
        .strategy-table tr.csr { background: #fef3c7; }
        
        .badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
        .badge.ssg { background: #10b981; color: white; }
        .badge.ssr { background: #3b82f6; color: white; }
        .badge.csr { background: #f59e0b; color: white; }
        
        .code-block { background: #1e293b; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        .code-block code { color: #e879f9; font-size: 0.85rem; white-space: pre; }
        
        .flow-chart { padding: 1.5rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .flow-node { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 8px; margin: 0.5rem; }
        .flow-node.start { background: #ede9fe; color: #6d28d9; }
        .flow-node.ssg { background: #d1fae5; color: #047857; }
        .flow-node.ssr { background: #dbeafe; color: #1e40af; }
        .flow-node.csr { background: #fef3c7; color: #92400e; }
        .flow-branch { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
        .flow-path { display: flex; flex-direction: column; align-items: center; }
        .flow-path .label { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; }
        
        .practice-task { background: #ede9fe; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; }
        .practice-task h3 { margin: 0 0 0.75rem; color: #6d28d9; }
        .practice-task ul { padding-left: 1.5rem; }
        
        .solution { background: #f0fdf4; padding: 1rem; border-radius: 8px; border: 1px solid #10b981; margin-top: 1.5rem; }
        .solution summary { cursor: pointer; padding: 0.5rem; color: #047857; font-weight: 500; }
        .solution pre { background: #1e293b; padding: 1rem; border-radius: 6px; margin-top: 0.5rem; overflow-x: auto; }
        .solution code { color: #86efac; font-size: 0.8rem; }
    `]
})
export class ScenarioHybridStrategyComponent implements OnInit {
    private platformId = inject(PLATFORM_ID);

    routes: RouteStrategy[] = [
        { path: '/', type: 'ssg', reason: 'Static homepage, rarely changes', cacheTime: '1 day' },
        { path: '/about', type: 'ssg', reason: 'Static content', cacheTime: '1 week' },
        { path: '/pricing', type: 'ssg', reason: 'Infrequent updates', cacheTime: '1 day' },
        { path: '/blog/:slug', type: 'ssg', reason: 'Static articles', cacheTime: '1 hour' },
        { path: '/products', type: 'ssr', reason: 'Catalog with filters', cacheTime: '5 min' },
        { path: '/search', type: 'ssr', reason: 'Dynamic query results', cacheTime: 'none' },
        { path: '/dashboard', type: 'csr', reason: 'Personalized, auth required' },
        { path: '/settings', type: 'csr', reason: 'User-specific data' }
    ];

    configCode = `// angular.json prerender config
{
  "prerender": {
    "routes": [
      "/",
      "/about", 
      "/pricing",
      "/blog/getting-started",
      "/blog/best-practices"
    ]
  }
}

// Express server for SSR routes
app.get('/products', ssrHandler);
app.get('/search', ssrHandler);

// CSR routes - serve index.html
app.get('/dashboard/*', (req, res) => {
  res.sendFile('index.html');
});`;

    solutionCode = `// Route Strategy Decisions:

// 1. Marketing pages → SSG
//    - Static content, SEO critical
//    - Rebuild on content changes
//    - Cache at CDN edge

// 2. User dashboard → CSR
//    - Personalized data
//    - Requires authentication
//    - No SEO benefit needed

// 3. Product catalog → SSR
//    - Dynamic filters/sorting
//    - SEO important for products
//    - Cache with short TTL

// 4. Search results → SSR
//    - Dynamic query params
//    - SEO for popular searches
//    - No caching (real-time)`;

    ngOnInit(): void {
        console.log('Platform:', isPlatformBrowser(this.platformId) ? 'Browser' : 'Server');
    }
}
