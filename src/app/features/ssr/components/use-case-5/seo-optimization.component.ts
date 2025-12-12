/**
 * ============================================================================
 * USE CASE 5: SEO OPTIMIZATION COMPONENT
 * ============================================================================
 * 
 * Demonstrates SEO best practices in Angular SSR applications including
 * meta tags, Open Graph, structured data, and dynamic titles.
 * 
 * KEY CONCEPTS:
 * 1. Title and Meta services
 * 2. Open Graph tags for social sharing
 * 3. Structured data (JSON-LD) for rich snippets
 * 4. Canonical URLs and SEO-friendly routing
 */

import { Component, OnInit, OnDestroy, inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

// Mock product data for demonstration
interface Product {
    name: string;
    description: string;
    price: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    slug: string;
    brand: string;
}

@Component({
    selector: 'app-seo-optimization',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="seo-container">
            <header class="header">
                <h1>🔍 SEO Optimization</h1>
                <p class="subtitle">
                    Implement SEO best practices for search engine visibility and social sharing
                </p>
            </header>

            <!-- Why SSR for SEO -->
            <section class="demo-section">
                <h2>📊 Why SSR is Essential for SEO</h2>
                <div class="comparison-cards">
                    <div class="comparison-card csr">
                        <div class="card-header">
                            <span class="icon">🌐</span>
                            <h3>Without SSR (CSR)</h3>
                        </div>
                        <div class="card-body">
                            <div class="flow-item">
                                <span class="step">1</span>
                                <span>Crawler visits page</span>
                            </div>
                            <div class="flow-item">
                                <span class="step">2</span>
                                <span>Gets empty <code>&lt;app-root&gt;</code></span>
                            </div>
                            <div class="flow-item">
                                <span class="step">3</span>
                                <span>May wait for JavaScript</span>
                            </div>
                            <div class="flow-item">
                                <span class="step">4</span>
                                <span>Often times out</span>
                            </div>
                            <div class="result bad">❌ Poor or no indexing</div>
                        </div>
                    </div>

                    <div class="comparison-card ssr">
                        <div class="card-header">
                            <span class="icon">🖥️</span>
                            <h3>With SSR</h3>
                        </div>
                        <div class="card-body">
                            <div class="flow-item">
                                <span class="step">1</span>
                                <span>Crawler visits page</span>
                            </div>
                            <div class="flow-item">
                                <span class="step">2</span>
                                <span>Gets full HTML content</span>
                            </div>
                            <div class="flow-item">
                                <span class="step">3</span>
                                <span>Indexes immediately</span>
                            </div>
                            <div class="result good">✅ Complete indexing</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Live Demo -->
            <section class="demo-section">
                <h2>🧪 Live SEO Demo</h2>
                <div class="live-demo">
                    <div class="demo-product">
                        <div class="product-image">📦</div>
                        <div class="product-info">
                            <h3>{{ demoProduct.name }}</h3>
                            <p class="brand">by {{ demoProduct.brand }}</p>
                            <p class="description">{{ demoProduct.description }}</p>
                            <div class="product-meta">
                                <span class="price">\${{ demoProduct.price }}</span>
                                <span class="rating">⭐ {{ demoProduct.rating }} ({{ demoProduct.reviewCount }} reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div class="seo-actions">
                        <button class="action-btn" (click)="applyAllSeoTags()" 
                                [class.active]="seoApplied">
                            {{ seoApplied ? '✓ SEO Applied' : '🚀 Apply All SEO Tags' }}
                        </button>
                        <button class="action-btn secondary" (click)="resetSeo()">
                            🔄 Reset
                        </button>
                    </div>

                    <div class="applied-tags" *ngIf="appliedTags.length > 0">
                        <h4>Applied Tags:</h4>
                        <div class="tag-list">
                            <div class="tag-item" *ngFor="let tag of appliedTags">
                                <span class="tag-type">{{ tag.type }}</span>
                                <span class="tag-name">{{ tag.name }}</span>
                                <code class="tag-value">{{ tag.value }}</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Meta Tags Section -->
            <section class="demo-section">
                <h2>📝 Meta Tags</h2>
                <div class="code-demo">
                    <div class="code-explanation">
                        <h4>Title & Description</h4>
                        <p>
                            Angular provides <code>Title</code> and <code>Meta</code> services
                            to dynamically update page metadata.
                        </p>
                    </div>
                    <div class="code-block">
                        <div class="code-header">TypeScript</div>
                        <pre><code>{{ metaTagsCode }}</code></pre>
                    </div>
                    <div class="html-preview">
                        <h4>Resulting HTML</h4>
                        <pre><code>{{ metaTagsHtml }}</code></pre>
                    </div>
                </div>
            </section>

            <!-- Open Graph Section -->
            <section class="demo-section">
                <h2>📱 Open Graph Tags</h2>
                <div class="og-demo">
                    <div class="og-explanation">
                        <p>
                            Open Graph tags control how your pages appear when shared on 
                            Facebook, LinkedIn, Twitter, and other social platforms.
                        </p>
                    </div>
                    
                    <div class="social-preview">
                        <h4>Social Media Preview</h4>
                        <div class="preview-card">
                            <div class="preview-image">
                                <span>🖼️</span>
                                <span class="dimensions">1200 × 630</span>
                            </div>
                            <div class="preview-content">
                                <span class="preview-url">example.com</span>
                                <h5>{{ demoProduct.name }} | Acme Store</h5>
                                <p>{{ demoProduct.description.substring(0, 100) }}...</p>
                            </div>
                        </div>
                    </div>

                    <div class="code-block">
                        <div class="code-header">Open Graph Implementation</div>
                        <pre><code>{{ ogCode }}</code></pre>
                    </div>
                </div>
            </section>

            <!-- Structured Data Section -->
            <section class="demo-section">
                <h2>📋 Structured Data (JSON-LD)</h2>
                <div class="structured-demo">
                    <div class="structured-explanation">
                        <p>
                            Structured data helps search engines understand your content 
                            and display rich snippets in search results.
                        </p>
                        <div class="rich-snippet-preview">
                            <h4>Rich Snippet Preview</h4>
                            <div class="snippet">
                                <div class="snippet-title">{{ demoProduct.name }} - Acme Store</div>
                                <div class="snippet-url">example.com › products › amazing-widget</div>
                                <div class="snippet-rating">
                                    <span class="stars">★★★★☆</span>
                                    <span class="rating-text">Rating: {{ demoProduct.rating }}/5</span>
                                    <span class="reviews">{{ demoProduct.reviewCount }} reviews</span>
                                </div>
                                <div class="snippet-price">\${{ demoProduct.price }} - In stock</div>
                                <div class="snippet-desc">{{ demoProduct.description.substring(0, 100) }}...</div>
                            </div>
                        </div>
                    </div>

                    <div class="code-block">
                        <div class="code-header">JSON-LD Schema</div>
                        <pre><code>{{ structuredDataCode }}</code></pre>
                    </div>
                </div>
            </section>

            <!-- SEO Service Pattern -->
            <section class="demo-section">
                <h2>🔧 Reusable SEO Service</h2>
                <div class="service-demo">
                    <div class="service-explanation">
                        <p>
                            Create a centralized SEO service for consistent implementation
                            across your application.
                        </p>
                    </div>
                    <div class="code-block large">
                        <div class="code-header">seo.service.ts</div>
                        <pre><code>{{ seoServiceCode }}</code></pre>
                    </div>
                </div>
            </section>

            <!-- SEO Checklist -->
            <section class="demo-section">
                <h2>✅ SEO Checklist</h2>
                <div class="checklist-grid">
                    <div class="checklist-item" *ngFor="let item of seoChecklist">
                        <div class="check-icon" (click)="item.checked = !item.checked"
                             [class.checked]="item.checked">
                            {{ item.checked ? '✓' : '' }}
                        </div>
                        <div class="check-content">
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Common Schema Types -->
            <section class="demo-section">
                <h2>📊 Common Schema Types</h2>
                <div class="schema-grid">
                    <div class="schema-card" *ngFor="let schema of schemaTypes">
                        <span class="schema-icon">{{ schema.icon }}</span>
                        <h4>{{ schema.type }}</h4>
                        <p>{{ schema.useCase }}</p>
                    </div>
                </div>
            </section>

            <!-- Key Takeaways -->
            <section class="takeaways-section">
                <h2>🎯 Key Takeaways</h2>
                <div class="takeaways-grid">
                    <div class="takeaway-card" *ngFor="let takeaway of takeaways">
                        <span class="takeaway-icon">{{ takeaway.icon }}</span>
                        <p>{{ takeaway.text }}</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .seo-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .header h1 {
            font-size: 2rem;
            color: var(--text-primary, #1f2937);
            margin: 0 0 0.5rem;
        }

        .subtitle {
            color: var(--text-secondary, #64748b);
            font-size: 1.1rem;
            margin: 0;
        }

        .demo-section {
            margin-bottom: 2.5rem;
        }

        h2 {
            font-size: 1.3rem;
            color: var(--text-primary, #1f2937);
            margin-bottom: 1rem;
        }

        /* Comparison Cards */
        .comparison-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .comparison-card {
            padding: 1.5rem;
            border-radius: 12px;
        }

        .comparison-card.csr {
            background: #fef2f2;
            border: 2px solid #fca5a5;
        }

        .comparison-card.ssr {
            background: #ecfdf5;
            border: 2px solid #6ee7b7;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .card-header .icon {
            font-size: 1.5rem;
        }

        .card-header h3 {
            margin: 0;
            font-size: 1rem;
        }

        .flow-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
        }

        .flow-item .step {
            width: 24px;
            height: 24px;
            background: rgba(0,0,0,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
        }

        .result {
            margin-top: 1rem;
            padding: 0.75rem;
            border-radius: 6px;
            font-weight: 600;
            text-align: center;
        }

        .result.bad {
            background: rgba(239, 68, 68, 0.1);
            color: #b91c1c;
        }

        .result.good {
            background: rgba(16, 185, 129, 0.1);
            color: #047857;
        }

        /* Live Demo */
        .live-demo {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .demo-product {
            display: flex;
            gap: 1.5rem;
            padding: 1.5rem;
            background: white;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .product-image {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #ede9fe, #ddd6fe);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
        }

        .product-info h3 {
            margin: 0 0 0.25rem;
        }

        .product-info .brand {
            margin: 0 0 0.5rem;
            color: var(--text-secondary, #64748b);
            font-size: 0.9rem;
        }

        .product-info .description {
            margin: 0 0 0.75rem;
            font-size: 0.9rem;
        }

        .product-meta {
            display: flex;
            gap: 1rem;
        }

        .price {
            font-size: 1.25rem;
            font-weight: bold;
            color: #10b981;
        }

        .rating {
            color: var(--text-secondary, #64748b);
        }

        .seo-actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .action-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .action-btn:not(.secondary) {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
        }

        .action-btn.active {
            background: linear-gradient(135deg, #10b981, #059669);
        }

        .action-btn.secondary {
            background: transparent;
            border: 2px solid var(--border-color, #e2e8f0);
            color: var(--text-secondary, #64748b);
        }

        .applied-tags h4 {
            margin: 0 0 0.75rem;
        }

        .tag-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .tag-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0.75rem;
            background: white;
            border-radius: 6px;
            font-size: 0.85rem;
        }

        .tag-type {
            padding: 0.2rem 0.5rem;
            background: #ede9fe;
            color: #6d28d9;
            border-radius: 4px;
            font-weight: 500;
            font-size: 0.75rem;
        }

        .tag-name {
            font-weight: 500;
            min-width: 120px;
        }

        .tag-value {
            flex: 1;
            padding: 0.2rem 0.5rem;
            background: #f1f5f9;
            border-radius: 4px;
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Code Demo */
        .code-demo {
            display: grid;
            gap: 1rem;
        }

        .code-explanation h4 {
            margin: 0 0 0.5rem;
        }

        .code-explanation p {
            margin: 0;
            color: var(--text-secondary, #64748b);
        }

        .code-block {
            background: #0f172a;
            border-radius: 8px;
            overflow: hidden;
        }

        .code-block.large {
            max-height: 400px;
            overflow-y: auto;
        }

        .code-header {
            padding: 0.5rem 1rem;
            background: #1e293b;
            color: #94a3b8;
            font-size: 0.8rem;
        }

        .code-block pre {
            margin: 0;
            padding: 1rem;
            overflow-x: auto;
        }

        .code-block code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
            white-space: pre-wrap;
        }

        .html-preview {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
            padding: 1rem;
        }

        .html-preview h4 {
            margin: 0 0 0.5rem;
        }

        .html-preview pre {
            margin: 0;
            background: #1e293b;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
        }

        .html-preview code {
            color: #86efac;
            font-size: 0.8rem;
        }

        /* Social Preview */
        .social-preview {
            margin-bottom: 1rem;
        }

        .social-preview h4 {
            margin: 0 0 0.75rem;
        }

        .preview-card {
            max-width: 500px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }

        .preview-image {
            height: 200px;
            background: linear-gradient(135deg, #ede9fe, #ddd6fe);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .preview-image span:first-child {
            font-size: 3rem;
        }

        .dimensions {
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
        }

        .preview-content {
            padding: 1rem;
        }

        .preview-url {
            color: #10b981;
            font-size: 0.75rem;
            text-transform: uppercase;
        }

        .preview-content h5 {
            margin: 0.25rem 0;
            font-size: 1rem;
        }

        .preview-content p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        /* Rich Snippet Preview */
        .rich-snippet-preview {
            margin-top: 1rem;
        }

        .rich-snippet-preview h4 {
            margin: 0 0 0.75rem;
        }

        .snippet {
            max-width: 600px;
            padding: 1rem;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

        .snippet-title {
            color: #1a0dab;
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }

        .snippet-url {
            color: #006621;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
        }

        .snippet-rating {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.25rem;
            font-size: 0.85rem;
        }

        .stars {
            color: #fbbc05;
        }

        .snippet-price {
            color: #1f2937;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }

        .snippet-desc {
            color: #545454;
            font-size: 0.85rem;
        }

        /* Checklist */
        .checklist-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .checklist-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
        }

        .check-icon {
            width: 28px;
            height: 28px;
            border: 2px solid var(--border-color, #e2e8f0);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.2s;
        }

        .check-icon.checked {
            background: #10b981;
            border-color: #10b981;
            color: white;
        }

        .check-content h4 {
            margin: 0 0 0.25rem;
            font-size: 0.95rem;
        }

        .check-content p {
            margin: 0;
            font-size: 0.8rem;
            color: var(--text-secondary, #64748b);
        }

        /* Schema Grid */
        .schema-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
        }

        .schema-card {
            padding: 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
            text-align: center;
        }

        .schema-icon {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .schema-card h4 {
            margin: 0 0 0.25rem;
            font-size: 0.9rem;
        }

        .schema-card p {
            margin: 0;
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
        }

        /* Takeaways */
        .takeaways-section {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: 2rem;
            border-radius: 16px;
            color: white;
        }

        .takeaways-section h2 {
            color: white;
            margin-bottom: 1.5rem;
        }

        .takeaways-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .takeaway-card {
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            text-align: center;
        }

        .takeaway-icon {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .takeaway-card p {
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .comparison-cards, .checklist-grid {
                grid-template-columns: 1fr;
            }
            .schema-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `]
})
export class SeoOptimizationComponent implements OnInit, OnDestroy {
    private meta = inject(Meta);
    private title = inject(Title);
    private document = inject(DOCUMENT);
    private renderer = inject(Renderer2);

    seoApplied = false;
    appliedTags: Array<{ type: string; name: string; value: string }> = [];

    demoProduct: Product = {
        name: 'Amazing Widget Pro',
        description: 'The most advanced widget for professionals. Features include automatic sync, cloud backup, and real-time collaboration. Perfect for teams of any size.',
        price: 299.99,
        rating: 4.8,
        reviewCount: 1247,
        imageUrl: 'https://example.com/images/widget-pro.jpg',
        slug: 'amazing-widget-pro',
        brand: 'Acme Corp'
    };

    seoChecklist = [
        { title: 'Unique Page Title', description: '50-60 characters with primary keyword', checked: false },
        { title: 'Meta Description', description: '150-160 characters with call to action', checked: false },
        { title: 'Open Graph Tags', description: 'og:title, og:description, og:image (1200x630)', checked: false },
        { title: 'Structured Data', description: 'Valid JSON-LD matching page content', checked: false },
        { title: 'Canonical URL', description: 'Prevent duplicate content issues', checked: false },
        { title: 'Mobile Friendly', description: 'Responsive design, proper viewport', checked: false }
    ];

    schemaTypes = [
        { icon: '📦', type: 'Product', useCase: 'E-commerce pages' },
        { icon: '📝', type: 'Article', useCase: 'Blog posts' },
        { icon: '🏢', type: 'Organization', useCase: 'Company info' },
        { icon: '🗂️', type: 'BreadcrumbList', useCase: 'Navigation' },
        { icon: '❓', type: 'FAQPage', useCase: 'FAQ sections' },
        { icon: '📅', type: 'Event', useCase: 'Event listings' },
        { icon: '📚', type: 'HowTo', useCase: 'Tutorials' },
        { icon: '⭐', type: 'Review', useCase: 'Product reviews' }
    ];

    takeaways = [
        { icon: '📝', text: 'Use Title and Meta services for dynamic metadata' },
        { icon: '📱', text: 'Open Graph tags control social media previews' },
        { icon: '📋', text: 'JSON-LD structured data enables rich snippets' },
        { icon: '🔗', text: 'Canonical URLs prevent duplicate content issues' },
        { icon: '🔧', text: 'Create a reusable SEO service for consistency' }
    ];

    metaTagsCode = `import { Meta, Title } from '@angular/platform-browser';

@Component({...})
export class ProductPage {
    private meta = inject(Meta);
    private title = inject(Title);
    
    ngOnInit() {
        // Set page title
        this.title.setTitle('Amazing Widget | Acme Store');
        
        // Set meta description
        this.meta.updateTag({ 
            name: 'description', 
            content: 'Buy Amazing Widget at the best price...'
        });
        
        // Set robots directive
        this.meta.updateTag({ 
            name: 'robots', 
            content: 'index, follow' 
        });
    }
}`;

    metaTagsHtml = `<head>
    <title>Amazing Widget | Acme Store</title>
    <meta name="description" content="Buy Amazing Widget...">
    <meta name="robots" content="index, follow">
</head>`;

    ogCode = `// Set Open Graph tags
this.meta.updateTag({ property: 'og:title', content: product.name });
this.meta.updateTag({ property: 'og:description', content: product.description });
this.meta.updateTag({ property: 'og:image', content: product.imageUrl });
this.meta.updateTag({ property: 'og:url', content: \`https://example.com/products/\${product.slug}\` });
this.meta.updateTag({ property: 'og:type', content: 'product' });

// Twitter Card
this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
this.meta.updateTag({ name: 'twitter:title', content: product.name });`;

    structuredDataCode = `const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Amazing Widget Pro",
    "description": "The most advanced widget...",
    "image": "https://example.com/images/widget.jpg",
    "brand": {
        "@type": "Brand",
        "name": "Acme Corp"
    },
    "offers": {
        "@type": "Offer",
        "price": "299.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247"
    }
};`;

    seoServiceCode = `@Injectable({ providedIn: 'root' })
export class SeoService {
    private meta = inject(Meta);
    private title = inject(Title);
    
    updateSeo(config: SeoConfig) {
        if (config.title) {
            this.title.setTitle(config.title);
        }
        
        if (config.description) {
            this.meta.updateTag({ 
                name: 'description', 
                content: config.description 
            });
        }
        
        if (config.ogTitle) {
            this.meta.updateTag({ 
                property: 'og:title', 
                content: config.ogTitle 
            });
        }
        
        // ... more tags
    }
}`;

    ngOnInit(): void {
        // Set initial title for demo
        this.title.setTitle('SEO Optimization - Angular SSR Features');
    }

    ngOnDestroy(): void {
        // Clean up added meta tags
        this.resetSeo();
    }

    applyAllSeoTags(): void {
        const p = this.demoProduct;

        // Title
        this.title.setTitle(`${p.name} | ${p.brand} - Best Prices`);
        this.appliedTags.push({ type: 'title', name: 'title', value: `${p.name} | ${p.brand} - Best Prices` });

        // Meta description
        this.meta.updateTag({ name: 'description', content: p.description });
        this.appliedTags.push({ type: 'meta', name: 'description', value: p.description });

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: p.name });
        this.appliedTags.push({ type: 'og', name: 'og:title', value: p.name });

        this.meta.updateTag({ property: 'og:description', content: p.description });
        this.appliedTags.push({ type: 'og', name: 'og:description', value: p.description });

        this.meta.updateTag({ property: 'og:image', content: p.imageUrl });
        this.appliedTags.push({ type: 'og', name: 'og:image', value: p.imageUrl });

        this.meta.updateTag({ property: 'og:type', content: 'product' });
        this.appliedTags.push({ type: 'og', name: 'og:type', value: 'product' });

        // Twitter
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.appliedTags.push({ type: 'twitter', name: 'twitter:card', value: 'summary_large_image' });

        // Add structured data
        this.addStructuredData();
        this.appliedTags.push({ type: 'json-ld', name: 'Product Schema', value: 'Added to <head>' });

        this.seoApplied = true;
    }

    resetSeo(): void {
        this.title.setTitle('SEO Optimization - Angular SSR Features');
        this.meta.removeTag('name="description"');
        this.meta.removeTag('property="og:title"');
        this.meta.removeTag('property="og:description"');
        this.meta.removeTag('property="og:image"');
        this.meta.removeTag('property="og:type"');
        this.meta.removeTag('name="twitter:card"');

        // Remove structured data script
        const scripts = this.document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(s => s.remove());

        this.appliedTags = [];
        this.seoApplied = false;
    }

    private addStructuredData(): void {
        const p = this.demoProduct;
        const script = this.renderer.createElement('script');
        script.type = 'application/ld+json';

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.name,
            description: p.description,
            image: p.imageUrl,
            brand: {
                '@type': 'Brand',
                name: p.brand
            },
            offers: {
                '@type': 'Offer',
                price: p.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: p.rating,
                reviewCount: p.reviewCount
            }
        };

        script.text = JSON.stringify(structuredData);
        this.renderer.appendChild(this.document.head, script);
    }
}
