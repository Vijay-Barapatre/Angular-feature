import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ngrx-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="overview-container">
            <header class="header-section">
                <h1>🦁 NgRx State Management</h1>
                <p class="subtitle">Master reactive state management with Redux pattern in Angular</p>
                
                <div class="feature-badges">
                    <span class="badge">&#64;ngrx/store</span>
                    <span class="badge">&#64;ngrx/effects</span>
                    <span class="badge">&#64;ngrx/entity</span>
                </div>
            </header>

            <div class="cards-grid">
                <!-- Store Basics -->
                <div class="feature-card" routerLink="store-basics">
                    <div class="card-icon">🏬</div>
                    <h3>Store Basics</h3>
                    <p>Actions, Reducers, Selectors, and Dispatching</p>
                    <div class="tags">
                        <span>Counter</span>
                        <span>State</span>
                    </div>
                </div>

                <!-- Effects -->
                <div class="feature-card" routerLink="effects-demo">
                    <div class="card-icon">⚡</div>
                    <h3>Effects</h3>
                    <p>Side effects and API calls</p>
                    <div class="tags">
                        <span>API</span>
                        <span>Async</span>
                    </div>
                </div>

                <!-- Entity Adapter -->
                <div class="feature-card" routerLink="entity-adapter">
                    <div class="card-icon">📦</div>
                    <h3>Entity Adapter</h3>
                    <p>Efficient collection management with normalization</p>
                    <div class="tags">
                        <span>Collections</span>
                        <span>CRUD</span>
                    </div>
                </div>

                <!-- Selectors Deep Dive -->
                <div class="feature-card" routerLink="selectors-demo">
                    <div class="card-icon">🔍</div>
                    <h3>Selectors Deep Dive</h3>
                    <p>Memoization, composition, and performance</p>
                    <div class="tags">
                        <span>Memoization</span>
                        <span>Derived State</span>
                    </div>
                </div>

                <!-- DevTools -->
                <div class="feature-card" routerLink="devtools-demo">
                    <div class="card-icon">🛠️</div>
                    <h3>DevTools Integration</h3>
                    <p>Time-travel debugging and state inspection</p>
                    <div class="tags">
                        <span>Debugging</span>
                        <span>Time Travel</span>
                    </div>
                </div>

                <!-- Best Practices -->
                <div class="feature-card" routerLink="best-practices">
                    <div class="card-icon">📋</div>
                    <h3>Best Practices</h3>
                    <p>Patterns, anti-patterns, and production tips</p>
                    <div class="tags">
                        <span>Patterns</span>
                        <span>Architecture</span>
                    </div>
                </div>

                <!--Router Store -->
                <div class="feature-card" routerLink="router-store-demo">
                    <div class="card-icon">🔗</div>
                    <h3>Router Store</h3>
                    <p>Sync Angular Router with NgRx Store state</p>
                    <div class="tags">
                        <span>Navigation</span>
                        <span>Route State</span>
                    </div>
                </div>

                <!-- Component Store -->
                <div class="feature-card" routerLink="component-store-demo">
                    <div class="card-icon">🎯</div>
                    <h3>Component Store</h3>
                    <p>Local reactive state management for components</p>
                    <div class="tags">
                        <span>Local State</span>
                        <span>Reactive</span>
                    </div>
                </div>

                <!-- Advanced Patterns -->
                <div class="feature-card" routerLink="advanced-patterns">
                    <div class="card-icon">⚡</div>
                    <h3>Advanced Patterns</h3>
                    <p>Meta-reducers, runtime checks, and production setup</p>
                    <div class="tags">
                        <span>Meta-reducers</span>
                        <span>Production</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .overview-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .header-section {
            text-align: center;
            margin-bottom: 3rem;
        }
        h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ba2bd2, #7f2bda);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle {
            font-size: 1.2rem;
            color: #94a3b8;
            margin-bottom: 1.5rem;
        }
        .feature-badges {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        .badge {
            background: rgba(186, 43, 210, 0.1);
            color: #d8b4fe;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-family: monospace;
        }
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .feature-card {
            background: #1e293b;
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #ba2bd2;
            box-shadow: 0 10px 30px rgba(186, 43, 210, 0.1);
        }
        .feature-card.disabled {
            opacity: 0.5;
            cursor: default;
            pointer-events: none;
        }
        .card-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        h3 {
            color: #f8fafc;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        p {
            color: #94a3b8;
            margin-bottom: 1.5rem;
        }
        .tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .tags span {
            background: rgba(186, 43, 210, 0.1);
            color: #d8b4fe;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }
    `]
})
export class NgRxOverviewComponent { }
