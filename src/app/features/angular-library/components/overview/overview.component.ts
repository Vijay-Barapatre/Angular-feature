/**
 * ============================================================================
 * ANGULAR LIBRARY OVERVIEW COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-angular-library-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>📚 Angular Libraries</h1>
                <p class="subtitle">Create Reusable, Shareable Code Packages</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>What is an Angular Library?</h2>
                    <p>
                        An Angular library is a <strong>reusable code package</strong> that can be 
                        shared across multiple Angular applications. Unlike a regular application, 
                        libraries cannot run on their own - they are imported and used by other apps.
                    </p>
                </div>
            </section>

            <section class="workflow-section">
                <h2>📦 Library Development Workflow</h2>
                <div class="workflow">
                    <div class="step">
                        <span class="num">1</span>
                        <span class="icon">🛠️</span>
                        <h4>Generate</h4>
                        <code>ng generate library</code>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">2</span>
                        <span class="icon">💻</span>
                        <h4>Develop</h4>
                        <code>Components, Services</code>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">3</span>
                        <span class="icon">🔨</span>
                        <h4>Build</h4>
                        <code>ng build my-lib</code>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">4</span>
                        <span class="icon">🚀</span>
                        <h4>Publish</h4>
                        <code>npm publish</code>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">5</span>
                        <span class="icon">📥</span>
                        <h4>Consume</h4>
                        <code>npm install</code>
                    </div>
                </div>
            </section>

            <section class="usecases-section">
                <h2>📖 Use Cases</h2>
                <div class="usecase-grid">
                    <a routerLink="library-basics" class="usecase-card">
                        <span class="num">1</span>
                        <h3>Library Basics</h3>
                        <p>Generate, structure, and configure Angular libraries</p>
                        <span class="tag">ng generate library</span>
                    </a>
                    <a routerLink="components-services" class="usecase-card">
                        <span class="num">2</span>
                        <h3>Components & Services</h3>
                        <p>Create exportable components, directives, pipes, and services</p>
                        <span class="tag">public-api.ts</span>
                    </a>
                    <a routerLink="building-publishing" class="usecase-card">
                        <span class="num">3</span>
                        <h3>Building & Publishing</h3>
                        <p>Build for production and publish to npm registry</p>
                        <span class="tag">npm publish</span>
                    </a>
                    <a routerLink="consuming-libraries" class="usecase-card">
                        <span class="num">4</span>
                        <h3>Consuming Libraries</h3>
                        <p>Install and use libraries in your applications</p>
                        <span class="tag">npm install</span>
                    </a>
                    <a routerLink="testing-libraries" class="usecase-card">
                        <span class="num">5</span>
                        <h3>Testing Libraries</h3>
                        <p>Unit testing and integration testing strategies</p>
                        <span class="tag">ng test my-lib</span>
                    </a>
                    <a routerLink="versioning-updates" class="usecase-card">
                        <span class="num">6</span>
                        <h3>Versioning & Updates</h3>
                        <p>Semantic versioning, breaking changes, and migrations</p>
                        <span class="tag">semver</span>
                    </a>
                </div>
            </section>

            <section class="benefits-section">
                <h2>✨ Why Create Libraries?</h2>
                <div class="benefit-grid">
                    <div class="benefit">
                        <span class="icon">🔄</span>
                        <h4>Reusability</h4>
                        <p>Share code across multiple projects</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">📦</span>
                        <h4>Encapsulation</h4>
                        <p>Clean API boundaries</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">👥</span>
                        <h4>Team Collaboration</h4>
                        <p>Independent development</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🏢</span>
                        <h4>Enterprise Scale</h4>
                        <p>Monorepo architecture</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-secondary); font-size: 1.1rem; }

        .intro-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; }
        .intro-card h2 { margin-top: 0; }

        section { margin-bottom: 2.5rem; }

        .workflow { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
        .workflow .step { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; text-align: center; min-width: 100px; position: relative; }
        .workflow .step .num { position: absolute; top: -10px; left: -10px; width: 24px; height: 24px; background: var(--primary-color, #667eea); color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .workflow .step .icon { font-size: 1.5rem; display: block; margin-bottom: 0.5rem; }
        .workflow .step h4 { margin: 0 0 0.25rem; font-size: 0.9rem; }
        .workflow .step code { font-size: 0.7rem; color: var(--text-secondary); }
        .workflow .arrow { font-size: 1.5rem; color: var(--primary-color); }

        .usecase-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .usecase-card { display: block; background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; position: relative; border: 2px solid transparent; }
        .usecase-card:hover { border-color: var(--primary-color); transform: translateY(-2px); }
        .usecase-card .num { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: var(--primary-color); color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .usecase-card h3 { margin: 0 0 0.5rem; color: var(--primary-color); }
        .usecase-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .usecase-card .tag { background: rgba(102, 126, 234, 0.1); color: var(--primary-color); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-family: monospace; }

        .benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .benefit { background: var(--bg-secondary); padding: 1.25rem; border-radius: 10px; text-align: center; }
        .benefit .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .benefit h4 { margin: 0 0 0.25rem; font-size: 0.9rem; }
        .benefit p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }

        @media (max-width: 768px) {
            .usecase-grid, .benefit-grid { grid-template-columns: 1fr 1fr; }
            .workflow { flex-direction: column; }
            .workflow .arrow { transform: rotate(90deg); }
        }
    `]
})
export class AngularLibraryOverviewComponent { }
