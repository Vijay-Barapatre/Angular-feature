/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: SEO META TAGS
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn to dynamically update page title and meta tags for SEO using
 * Angular's Title and Meta services.
 * 
 * 📝 DESCRIPTION:
 * You are building a product detail page that needs proper SEO.
 * Each product should have unique title, description, and Open Graph tags.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Page title updates dynamically
 * 2. Meta description is set correctly
 * 3. Open Graph tags appear in page source
 * 4. Tags are cleaned up on component destroy
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Inject Title and Meta services
 * - Set page title
 * - Add/update meta tags
 * - Set Open Graph tags
 */

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

interface Product {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

@Component({
    selector: 'app-exercise-seo-meta-tags',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <h2>🔍 Exercise 4: SEO Meta Tags</h2>
            
            <div class="objective-card">
                <h3>📋 Objective</h3>
                <p>
                    Use Angular's Title and Meta services to dynamically set
                    SEO-friendly page metadata.
                </p>
            </div>

            <div class="task-section">
                <h3>🎯 Tasks</h3>
                <div class="task" [class.completed]="task1Complete">
                    <span class="checkbox">{{ task1Complete ? '✅' : '⬜' }}</span>
                    <span>Task 1: Set page title dynamically</span>
                </div>
                <div class="task" [class.completed]="task2Complete">
                    <span class="checkbox">{{ task2Complete ? '✅' : '⬜' }}</span>
                    <span>Task 2: Add meta description</span>
                </div>
                <div class="task" [class.completed]="task3Complete">
                    <span class="checkbox">{{ task3Complete ? '✅' : '⬜' }}</span>
                    <span>Task 3: Add Open Graph tags</span>
                </div>
            </div>

            <div class="implementation-section">
                <h3>🔨 Your Implementation</h3>
                
                <div class="product-selector">
                    <h4>Select a Product:</h4>
                    <div class="product-buttons">
                        <button 
                            *ngFor="let p of products; let i = index"
                            (click)="selectProduct(i)"
                            [class.active]="selectedIndex === i">
                            {{ p.name }}
                        </button>
                    </div>
                </div>
                
                <div class="product-preview" *ngIf="selectedProduct">
                    <div class="product-card">
                        <div class="product-image">🖼️</div>
                        <div class="product-info">
                            <h3>{{ selectedProduct.name }}</h3>
                            <p>{{ selectedProduct.description }}</p>
                            <span class="price">\${{ selectedProduct.price }}</span>
                        </div>
                    </div>
                </div>

                <div class="meta-preview">
                    <h4>📋 Expected Meta Tags</h4>
                    <div class="meta-code">
                        <code>&lt;title&gt;{{ expectedTitle }}&lt;/title&gt;</code>
                        <code>&lt;meta name="description" content="{{ expectedDescription }}"&gt;</code>
                        <code>&lt;meta property="og:title" content="{{ selectedProduct?.name }}"&gt;</code>
                        <code>&lt;meta property="og:image" content="{{ selectedProduct?.imageUrl }}"&gt;</code>
                    </div>
                    <p class="hint">
                        💡 Use browser DevTools → Elements → &lt;head&gt; to verify your implementation
                    </p>
                </div>
            </div>

            <div class="hints-section">
                <h3>💡 Hints</h3>
                <details>
                    <summary>Hint 1: Injecting services</summary>
                    <pre><code>private title = inject(Title);
private meta = inject(Meta);</code></pre>
                </details>
                <details>
                    <summary>Hint 2: Setting title</summary>
                    <pre><code>this.title.setTitle('Product Name | My Store');</code></pre>
                </details>
                <details>
                    <summary>Hint 3: Adding meta tags</summary>
                    <pre><code>this.meta.updateTag({{ '{' }} 
    name: 'description', 
    content: 'Product description here' 
{{ '}' }});

this.meta.updateTag({{ '{' }} 
    property: 'og:title', 
    content: 'Product Name' 
{{ '}' }});</code></pre>
                </details>
                <details>
                    <summary>Hint 4: Cleanup on destroy</summary>
                    <pre><code>ngOnDestroy() {{ '{' }}
    this.meta.removeTag('name="description"');
    this.meta.removeTag('property="og:title"');
{{ '}' }}</code></pre>
                </details>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
        h2 { color: var(--text-primary, #1f2937); border-bottom: 2px solid #6366f1; padding-bottom: 0.5rem; }
        
        .objective-card { background: #ede9fe; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .objective-card h3 { margin: 0 0 0.5rem; color: #6d28d9; }
        .objective-card p { margin: 0; color: #4c1d95; }
        
        .task-section { margin-bottom: 1.5rem; }
        .task { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--bg-secondary, #f8fafc); border-radius: 4px; margin-bottom: 0.25rem; }
        .task.completed { background: #d1fae5; }
        
        .product-selector h4 { margin: 0 0 0.75rem; }
        .product-buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .product-buttons button { padding: 0.5rem 1rem; background: var(--bg-secondary, #f8fafc); border: 2px solid var(--border-color, #e2e8f0); border-radius: 6px; cursor: pointer; }
        .product-buttons button.active { background: #6366f1; color: white; border-color: #6366f1; }
        
        .product-card { display: flex; gap: 1rem; padding: 1rem; background: white; border-radius: 8px; border: 1px solid var(--border-color, #e2e8f0); margin-bottom: 1rem; }
        .product-image { width: 80px; height: 80px; background: #ede9fe; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
        .product-info h3 { margin: 0 0 0.25rem; }
        .product-info p { margin: 0 0 0.5rem; color: var(--text-secondary, #64748b); font-size: 0.9rem; }
        .price { font-size: 1.25rem; font-weight: bold; color: #10b981; }
        
        .meta-preview { background: #0f172a; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
        .meta-preview h4 { color: #94a3b8; margin: 0 0 0.75rem; }
        .meta-code { display: flex; flex-direction: column; gap: 0.5rem; }
        .meta-code code { display: block; color: #86efac; font-size: 0.8rem; padding: 0.5rem; background: #1e293b; border-radius: 4px; }
        .meta-preview .hint { margin: 0.75rem 0 0; font-size: 0.85rem; color: #94a3b8; }
        
        .hints-section { background: #fef3c7; padding: 1rem; border-radius: 8px; border: 1px solid #f59e0b; }
        .hints-section h3 { margin: 0 0 0.75rem; color: #92400e; }
        details { margin-bottom: 0.5rem; }
        summary { cursor: pointer; padding: 0.5rem; background: white; border-radius: 4px; }
        details pre { margin: 0.5rem 0 0; padding: 0.75rem; background: #1e293b; border-radius: 4px; overflow-x: auto; }
        details code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ExerciseSeoMetaTagsComponent implements OnInit, OnDestroy {
    // TODO: Inject Title and Meta services
    // private title = inject(Title);
    // private meta = inject(Meta);

    products: Product[] = [
        {
            name: 'Super Widget Pro',
            description: 'The ultimate widget for professionals. Features advanced capabilities and premium build quality.',
            price: 299.99,
            imageUrl: 'https://example.com/widget-pro.jpg'
        },
        {
            name: 'Budget Widget',
            description: 'Great value widget for everyday use. Perfect for beginners and casual users.',
            price: 49.99,
            imageUrl: 'https://example.com/budget-widget.jpg'
        },
        {
            name: 'Enterprise Widget',
            description: 'Industrial-grade widget with enterprise support and custom integrations.',
            price: 999.99,
            imageUrl: 'https://example.com/enterprise-widget.jpg'
        }
    ];

    selectedIndex = 0;
    selectedProduct: Product | null = null;

    task1Complete = false;
    task2Complete = false;
    task3Complete = false;

    get expectedTitle(): string {
        return this.selectedProduct
            ? `${this.selectedProduct.name} | My Store`
            : 'My Store';
    }

    get expectedDescription(): string {
        return this.selectedProduct?.description || '';
    }

    ngOnInit(): void {
        this.selectProduct(0);
    }

    ngOnDestroy(): void {
        // TODO: Clean up meta tags
        // this.meta.removeTag('name="description"');
        // this.meta.removeTag('property="og:title"');
        // this.meta.removeTag('property="og:description"');
        // this.meta.removeTag('property="og:image"');
    }

    selectProduct(index: number): void {
        this.selectedIndex = index;
        this.selectedProduct = this.products[index];
        this.updateSeoTags();
    }

    /**
     * TODO: Implement this method
     * 
     * Update page title and meta tags based on selected product:
     * 1. Set page title: "Product Name | My Store"
     * 2. Set meta description
     * 3. Set Open Graph tags (og:title, og:description, og:image)
     */
    updateSeoTags(): void {
        if (!this.selectedProduct) return;

        // TODO: Set page title
        // this.title.setTitle(`${this.selectedProduct.name} | My Store`);

        // TODO: Set meta description
        // this.meta.updateTag({ name: 'description', content: this.selectedProduct.description });

        // TODO: Set Open Graph tags
        // this.meta.updateTag({ property: 'og:title', content: this.selectedProduct.name });
        // this.meta.updateTag({ property: 'og:description', content: this.selectedProduct.description });
        // this.meta.updateTag({ property: 'og:image', content: this.selectedProduct.imageUrl });

        console.log('updateSeoTags not implemented');
    }
}
