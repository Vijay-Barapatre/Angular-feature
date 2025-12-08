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
                <!-- Use Case 1: Store Basics -->
                <div class="feature-card" routerLink="use-case-1">
                    <div class="card-icon">🏬</div>
                    <h3>Store Basics</h3>
                    <p>Actions, Reducers, Selectors, and Dispatching</p>
                    <div class="tags">
                        <span>Counter</span>
                        <span>State</span>
                    </div>
                </div>

                <!-- Use Case 2: Effects -->
                <div class="feature-card" routerLink="use-case-2">
                    <div class="card-icon">⚡</div>
                    <h3>Effects</h3>
                    <p>Side effects and API calls</p>
                    <div class="tags">
                        <span>API</span>
                        <span>Async</span>
                    </div>
                </div>

                <!-- Add more cards as we implement use cases -->
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
