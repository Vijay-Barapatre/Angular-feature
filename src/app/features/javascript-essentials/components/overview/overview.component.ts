import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-javascript-overview',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="overview-container">
            <header class="header-section">
                <a routerLink="/features" class="back-link">← Back to Features</a>
                <h1>🟨 JavaScript Essentials</h1>
                <p class="subtitle">Master the JavaScript fundamentals that power Angular development</p>
                
                <div class="feature-badges">
                    <span class="badge">ES6+</span>
                    <span class="badge">Modern JS</span>
                    <span class="badge">Angular Ready</span>
                </div>
            </header>

            <div class="cards-grid">
                <!-- Variables & Data Types -->
                <div class="feature-card" routerLink="variables-datatypes">
                    <div class="card-icon">📦</div>
                    <h3>Variables & Data Types</h3>
                    <p>var, let, const, primitives, objects, and type coercion</p>
                    <div class="tags">
                        <span>let/const</span>
                        <span>Primitives</span>
                        <span>Hoisting</span>
                    </div>
                </div>

                <!-- Spread/Rest -->
                <div class="feature-card" routerLink="spread-rest">
                    <div class="card-icon">✨</div>
                    <h3>Spread & Rest Operators</h3>
                    <p>Spread for arrays/objects, rest parameters for functions</p>
                    <div class="tags">
                        <span>...</span>
                        <span>Immutability</span>
                        <span>NgRx</span>
                    </div>
                </div>

                <!-- Destructuring -->
                <div class="feature-card" routerLink="destructuring">
                    <div class="card-icon">📤</div>
                    <h3>Destructuring</h3>
                    <p>Extract values from objects and arrays efficiently</p>
                    <div class="tags">
                        <span>Objects</span>
                        <span>Arrays</span>
                        <span>Params</span>
                    </div>
                </div>

                <!-- Arrow Functions -->
                <div class="feature-card" routerLink="arrow-functions">
                    <div class="card-icon">➡️</div>
                    <h3>Arrow Functions</h3>
                    <p>Concise syntax, lexical this, and callback patterns</p>
                    <div class="tags">
                        <span>=></span>
                        <span>this</span>
                        <span>Callbacks</span>
                    </div>
                </div>

                <!-- Async/Await -->
                <div class="feature-card" routerLink="async-await">
                    <div class="card-icon">⏳</div>
                    <h3>Async/Await & Promises</h3>
                    <p>Asynchronous JavaScript patterns for HTTP and more</p>
                    <div class="tags">
                        <span>Promise</span>
                        <span>async</span>
                        <span>await</span>
                    </div>
                </div>

                <!-- Array Methods -->
                <div class="feature-card" routerLink="array-methods">
                    <div class="card-icon">🔄</div>
                    <h3>Array Methods</h3>
                    <p>map, filter, reduce, find, and functional patterns</p>
                    <div class="tags">
                        <span>map</span>
                        <span>filter</span>
                        <span>reduce</span>
                    </div>
                </div>
            </div>

            <main class="content-area">
                <router-outlet></router-outlet>
            </main>
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
        .back-link {
            color: #f7df1e;
            text-decoration: none;
        }
        h1 {
            font-size: 3rem;
            margin: 0.5rem 0;
            background: linear-gradient(135deg, #f7df1e, #f0db4f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
            background: rgba(247, 223, 30, 0.1);
            color: #f7df1e;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-family: monospace;
        }
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
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
            border-color: #f7df1e;
            box-shadow: 0 10px 30px rgba(247, 223, 30, 0.1);
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
            background: rgba(247, 223, 30, 0.1);
            color: #f7df1e;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }
        .content-area {
            background: #1e293b;
            border-radius: 12px;
            min-height: 100px;
        }
    `]
})
export class JavaScriptOverviewComponent { }
