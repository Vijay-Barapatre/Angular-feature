/**
 * LEARNER EXERCISE COMPONENT
 * 
 * This component provides a hands-on practice template for learners
 * to implement their own service and injection patterns.
 * 
 * TODO items guide the learner through the exercise.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartComponent } from './cart.component';

@Component({
    selector: 'app-services-di-exercise',
    standalone: true,
    imports: [CommonModule, RouterLink, CartComponent],
    template: `
        <div class="exercise-container fade-in">
            <div class="page-header">
                <a routerLink="/services-di" class="back-link">← Back to Overview</a>
                <h1>✏️ Learner Exercise: Build Your Own Service</h1>
                <p class="header-description">
                    Practice what you've learned by creating a shopping cart service!
                </p>
            </div>

            <section class="challenge-section">
                <h2>🎯 Your Challenge</h2>
                <div class="challenge-card">
                    <h3>Build a Shopping Cart Service</h3>
                    <p>Create a service that manages a shopping cart with the following features:</p>
                    <ul>
                        <li>Add items to cart</li>
                        <li>Remove items from cart</li>
                        <li>Calculate total price</li>
                        <li>Get item count</li>
                    </ul>
                </div>
            </section>

            <section class="steps-section">
                <h2>📋 Steps to Complete</h2>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Create the Service</h4>
                        <p>Create a file: <code>cart.service.ts</code></p>
                        <pre><code>// TODO: Implement CartService
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class CartService &#123;
  private items: CartItem[] = [];
  
  addItem(item: CartItem): void &#123;
    // TODO: Add item to cart
  &#125;
  
  removeItem(id: number): void &#123;
    // TODO: Remove item by id
  &#125;
  
  getTotal(): number &#123;
    // TODO: Calculate total price
    return 0;
  &#125;
  
  getItemCount(): number &#123;
    // TODO: Return number of items
    return 0;
  &#125;
&#125;</code></pre>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Define the CartItem Interface</h4>
                        <pre><code>interface CartItem &#123;
  id: number;
  name: string;
  price: number;
  quantity: number;
&#125;</code></pre>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Inject and Use the Service</h4>
                        <pre><code>export class CartComponent &#123;
  constructor(private cartService: CartService) &#123;&#125;
  
  addToCart() &#123;
    this.cartService.addItem(&#123;
      id: 1,
      name: 'Angular Book',
      price: 29.99,
      quantity: 1
    &#125;);
  &#125;
&#125;</code></pre>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Bonus Challenges</h4>
                        <ul>
                            <li>Add an <code>InjectionToken</code> for tax rate configuration</li>
                            <li>Create a component-scoped version for comparing carts</li>
                            <li>Use <code>&#64;Optional()</code> for a discount service</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="hints-section">
                <h2>💡 Hints</h2>
                <div class="hint-cards">
                    <div class="hint-card">
                        <span class="icon">🔍</span>
                        <p>Remember: <code>providedIn: 'root'</code> makes it a singleton</p>
                    </div>
                    <div class="hint-card">
                        <span class="icon">🧮</span>
                        <p>Use <code>reduce()</code> for calculating totals</p>
                    </div>
                    <div class="hint-card">
                        <span class="icon">🗑️</span>
                        <p>Use <code>filter()</code> for removing items</p>
                    </div>
                </div>
            </section>

             <!-- Solution Demo -->
             <section class="solution-section">
                <h2>🚀 Solution Demo</h2>
                <app-cart-solution></app-cart-solution>
            </section>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 900px; margin: 0 auto; }
        .page-header { text-align: center; margin-bottom: var(--spacing-2xl); }
        .back-link { display: inline-block; color: var(--primary-light); text-decoration: none; margin-bottom: var(--spacing-md); }
        .back-link:hover { color: var(--accent-color); }
        .page-header h1 { font-size: 2rem; margin-bottom: var(--spacing-md); }
        .header-description { font-size: 1.125rem; color: var(--text-secondary); }
        
        section { margin-bottom: var(--spacing-2xl); }
        section h2 { font-size: 1.75rem; margin-bottom: var(--spacing-xl); border-left: 4px solid var(--accent-color); padding-left: var(--spacing-lg); }
        
        .challenge-card { background: linear-gradient(135deg, rgba(126, 234, 102, 0.1), rgba(102, 126, 234, 0.1)); border: 2px solid var(--accent-color); border-radius: var(--radius-lg); padding: var(--spacing-xl); }
        .challenge-card h3 { margin-bottom: var(--spacing-md); }
        .challenge-card ul { list-style: none; padding: 0; }
        .challenge-card li { padding: var(--spacing-sm) 0; padding-left: var(--spacing-lg); position: relative; color: var(--text-secondary); }
        .challenge-card li::before { content: '✓'; position: absolute; left: 0; color: var(--accent-color); }
        
        .step { display: flex; gap: var(--spacing-lg); margin-bottom: var(--spacing-xl); }
        .step-number { width: 48px; height: 48px; background: var(--accent-color); color: var(--bg-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 700; flex-shrink: 0; }
        .step-content { flex: 1; background: var(--bg-secondary); padding: var(--spacing-lg); border-radius: var(--radius-lg); }
        .step-content h4 { margin: 0 0 var(--spacing-md) 0; }
        .step-content p { color: var(--text-secondary); margin-bottom: var(--spacing-md); }
        .step-content pre { background: var(--bg-card); padding: var(--spacing-md); border-radius: var(--radius-md); overflow-x: auto; margin: 0; }
        .step-content code { font-family: monospace; font-size: 0.875rem; line-height: 1.6; }
        .step-content ul { list-style: none; padding: 0; margin: 0; }
        .step-content li { padding: var(--spacing-xs) 0; color: var(--text-secondary); }
        
        .hint-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); }
        .hint-card { background: var(--bg-secondary); padding: var(--spacing-lg); border-radius: var(--radius-md); text-align: center; border: 1px solid rgba(126, 234, 102, 0.3); }
        .hint-card .icon { font-size: 2rem; display: block; margin-bottom: var(--spacing-md); }
        .hint-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }
        .hint-card code { background: var(--bg-card); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; }
    `]
})
export class LearnerExerciseComponent { }
