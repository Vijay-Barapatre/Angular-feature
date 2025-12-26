import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-typescript-overview',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="overview-container">
            <header class="header-section">
                <a routerLink="/features" class="back-link">← Back to Features</a>
                <h1>🔷 TypeScript Features</h1>
                <p class="subtitle">Master TypeScript's type system for robust Angular development</p>
                
                <div class="feature-badges">
                    <span class="badge">Type Safety</span>
                    <span class="badge">Generics</span>
                    <span class="badge">Decorators</span>
                </div>
            </header>

            <div class="cards-grid">
                <!-- Use Case 1: Interfaces & Types -->
                <div class="feature-card" routerLink="use-case-1">
                    <div class="card-icon">📋</div>
                    <h3>Interfaces & Types</h3>
                    <p>Define shapes for objects, API responses, and component props</p>
                    <div class="tags">
                        <span>interface</span>
                        <span>type</span>
                        <span>extends</span>
                    </div>
                </div>

                <!-- Use Case 2: Generics -->
                <div class="feature-card" routerLink="use-case-2">
                    <div class="card-icon">🧬</div>
                    <h3>Generics</h3>
                    <p>Create reusable components and services with type parameters</p>
                    <div class="tags">
                        <span>&lt;T&gt;</span>
                        <span>Constraints</span>
                        <span>Inference</span>
                    </div>
                </div>

                <!-- Use Case 3: Decorators -->
                <div class="feature-card" routerLink="use-case-3">
                    <div class="card-icon">🎀</div>
                    <h3>Decorators</h3>
                    <p>Understand &#64;Component, &#64;Injectable, &#64;Input and custom decorators</p>
                    <div class="tags">
                        <span>&#64;Component</span>
                        <span>&#64;Injectable</span>
                        <span>Metadata</span>
                    </div>
                </div>

                <!-- Use Case 4: Union & Intersection -->
                <div class="feature-card" routerLink="use-case-4">
                    <div class="card-icon">🔀</div>
                    <h3>Union & Intersection</h3>
                    <p>Combine types with | and & for flexible type definitions</p>
                    <div class="tags">
                        <span>Union |</span>
                        <span>Intersection &</span>
                        <span>Literal</span>
                    </div>
                </div>

                <!-- Use Case 5: Type Guards -->
                <div class="feature-card" routerLink="use-case-5">
                    <div class="card-icon">🛡️</div>
                    <h3>Type Guards</h3>
                    <p>Narrow types at runtime with typeof, instanceof, and custom guards</p>
                    <div class="tags">
                        <span>typeof</span>
                        <span>instanceof</span>
                        <span>is</span>
                    </div>
                </div>

                <!-- Use Case 6: Utility Types -->
                <div class="feature-card" routerLink="use-case-6">
                    <div class="card-icon">🧰</div>
                    <h3>Utility Types</h3>
                    <p>Partial, Required, Pick, Omit, Record and more</p>
                    <div class="tags">
                        <span>Partial</span>
                        <span>Pick</span>
                        <span>Omit</span>
                    </div>
                </div>
            </div>

            <main class="content-area">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styles: [`
        .overview-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header-section { text-align: center; margin-bottom: 3rem; }
        .back-link { color: #3178c6; text-decoration: none; }
        h1 { font-size: 3rem; margin: 0.5rem 0; background: linear-gradient(135deg, #3178c6, #235a97); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .subtitle { font-size: 1.2rem; color: #94a3b8; margin-bottom: 1.5rem; }
        .feature-badges { display: flex; justify-content: center; gap: 1rem; }
        .badge { background: rgba(49, 120, 198, 0.1); color: #3178c6; padding: 0.5rem 1rem; border-radius: 20px; font-family: monospace; }
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
        .feature-card { background: #1e293b; padding: 2rem; border-radius: 16px; border: 1px solid rgba(148, 163, 184, 0.1); cursor: pointer; transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-5px); border-color: #3178c6; box-shadow: 0 10px 30px rgba(49, 120, 198, 0.1); }
        .card-icon { font-size: 3rem; margin-bottom: 1rem; }
        h3 { color: #f8fafc; margin-bottom: 0.5rem; font-size: 1.5rem; }
        p { color: #94a3b8; margin-bottom: 1.5rem; }
        .tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .tags span { background: rgba(49, 120, 198, 0.1); color: #3178c6; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; }
        .content-area { background: #1e293b; border-radius: 12px; min-height: 100px; }
    `]
})
export class TypeScriptOverviewComponent { }
