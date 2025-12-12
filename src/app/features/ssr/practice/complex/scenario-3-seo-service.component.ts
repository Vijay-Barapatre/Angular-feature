/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: DYNAMIC SEO SERVICE
 * ============================================================================
 * 
 * Build a reusable SEO service that manages meta tags, Open Graph,
 * and structured data from a configuration object.
 */

import { Component, OnInit, OnDestroy, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
    title: string;
    description: string;
    og?: { title?: string; description?: string; image?: string; type?: string; };
}

@Injectable({ providedIn: 'root' })
class SeoService {
    updateSeo(config: SeoConfig): void {
        console.log('TODO: Implement updateSeo', config);
    }
    clearSeo(): void {
        console.log('TODO: Implement clearSeo');
    }
}

@Component({
    selector: 'app-scenario-seo-service',
    standalone: true,
    imports: [CommonModule],
    providers: [SeoService],
    template: `
        <div class="scenario-container">
            <h2>🔍 Scenario 3: Dynamic SEO Service</h2>
            
            <div class="scenario-card">
                <h3>📋 Scenario</h3>
                <p>Build a comprehensive SEO service that handles all metadata and social sharing tags.</p>
            </div>

            <div class="requirements">
                <h3>✅ Requirements</h3>
                <ul>
                    <li>Create updateSeo(config) method</li>
                    <li>Handle title, description, keywords</li>
                    <li>Generate Open Graph tags</li>
                    <li>Inject JSON-LD structured data</li>
                </ul>
            </div>

            <div class="demo">
                <div class="page-buttons">
                    <button *ngFor="let p of pages" (click)="selectPage(p.type)" [class.active]="selected === p.type">
                        {{ p.label }}
                    </button>
                </div>

                <div class="config-preview">
                    <h4>Current Config</h4>
                    <pre>{{ currentConfig | json }}</pre>
                </div>

                <div class="actions">
                    <button (click)="applySeo()">Apply SEO</button>
                    <button (click)="checkTags()">Verify Tags</button>
                </div>

                <div class="results" *ngIf="results.length">
                    <div *ngFor="let r of results" [class.pass]="r.ok">
                        {{ r.ok ? '✅' : '❌' }} {{ r.tag }}
                    </div>
                </div>
            </div>

            <div class="solution">
                <details>
                    <summary>💡 Solution Approach</summary>
                    <pre><code>updateSeo(config: SeoConfig): void {{ '{' }}
    this.title.setTitle(config.title);
    this.meta.updateTag({{ '{' }} name: 'description', content: config.description {{ '}' }});
    if (config.og) {{ '{' }}
        this.meta.updateTag({{ '{' }} property: 'og:title', content: config.og.title {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
                </details>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
        h2 { border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        .scenario-card { background: #fee2e2; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #ef4444; }
        .scenario-card h3 { margin: 0 0 0.5rem; color: #b91c1c; }
        .requirements ul { padding-left: 1.5rem; }
        .page-buttons { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .page-buttons button { padding: 0.5rem 1rem; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; background: #f8fafc; }
        .page-buttons button.active { background: #6366f1; color: white; border-color: #6366f1; }
        .config-preview { background: #1e293b; padding: 1rem; border-radius: 8px; color: #86efac; margin-bottom: 1rem; }
        .config-preview h4 { color: #94a3b8; margin: 0 0 0.5rem; }
        .config-preview pre { margin: 0; font-size: 0.8rem; }
        .actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .actions button { padding: 0.75rem 1.5rem; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .results { background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .results div { padding: 0.25rem 0; }
        .results .pass { color: #10b981; }
        .solution { background: #f0fdf4; padding: 1rem; border-radius: 8px; border: 1px solid #10b981; }
        .solution summary { cursor: pointer; padding: 0.5rem; color: #047857; }
        .solution pre { background: #1e293b; padding: 1rem; border-radius: 6px; margin-top: 0.5rem; }
        .solution code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ScenarioSeoServiceComponent implements OnInit, OnDestroy {
    private seoService = inject(SeoService);
    private meta = inject(Meta);
    private title = inject(Title);

    pages = [
        { type: 'article', label: '📝 Article' },
        { type: 'product', label: '🛍️ Product' }
    ];

    selected = 'article';
    currentConfig: SeoConfig | null = null;
    results: Array<{ tag: string; ok: boolean }> = [];

    ngOnInit(): void { this.selectPage('article'); }
    ngOnDestroy(): void { this.seoService.clearSeo(); }

    selectPage(type: string): void {
        this.selected = type;
        this.currentConfig = type === 'article'
            ? { title: 'Angular SSR Guide | Blog', description: 'Complete SSR guide', og: { title: 'Angular SSR', type: 'article' } }
            : { title: 'Widget Pro | Store', description: 'Premium widget', og: { title: 'Widget Pro', type: 'product' } };
        this.results = [];
    }

    applySeo(): void {
        if (this.currentConfig) this.seoService.updateSeo(this.currentConfig);
    }

    checkTags(): void {
        this.results = [
            { tag: '<title>', ok: this.title.getTitle() === this.currentConfig?.title },
            { tag: '<meta name="description">', ok: !!this.meta.getTag('name="description"') },
            { tag: '<meta property="og:title">', ok: !!this.meta.getTag('property="og:title"') }
        ];
    }
}
