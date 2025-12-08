/**
 * USE CASE 3: providedIn Hierarchy
 * 
 * Demonstrates different providedIn options:
 * - 'root': App-wide singleton
 * - 'any': Unique instance per lazy-loaded module
 * - 'platform': Cross-application singleton (micro-frontends)
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-use-case-3-parent',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="use-case-container fade-in">
            <div class="page-header">
                <a routerLink="/services-di" class="back-link">← Back to Overview</a>
                <h1>🌳 Use Case 3: providedIn Hierarchy</h1>
                <p class="header-description">
                    Understand the different providedIn options and when to use each.
                </p>
            </div>

            <section class="options-section">
                <h2>📚 providedIn Options</h2>
                
                <div class="options-grid">
                    <div class="option-card root">
                        <div class="option-header">
                            <span class="icon">🌍</span>
                            <h3>providedIn: 'root'</h3>
                        </div>
                        <div class="option-body">
                            <p class="description">Application-wide singleton. Most common option.</p>
                            <div class="code-snippet">
                                <code>&#64;Injectable(&#123; providedIn: 'root' &#125;)</code>
                            </div>
                            <h4>When to use:</h4>
                            <ul>
                                <li>Global state management</li>
                                <li>Authentication services</li>
                                <li>HTTP interceptors</li>
                                <li>Configuration services</li>
                            </ul>
                            <div class="tree-shake-badge">✅ Tree-shakable</div>
                        </div>
                    </div>

                    <div class="option-card any">
                        <div class="option-header">
                            <span class="icon">📦</span>
                            <h3>providedIn: 'any'</h3>
                        </div>
                        <div class="option-body">
                            <p class="description">One instance per lazy-loaded module.</p>
                            <div class="code-snippet">
                                <code>&#64;Injectable(&#123; providedIn: 'any' &#125;)</code>
                            </div>
                            <h4>When to use:</h4>
                            <ul>
                                <li>Feature-specific services</li>
                                <li>Isolated module state</li>
                                <li>Services that shouldn't cross module boundaries</li>
                            </ul>
                            <div class="tree-shake-badge">✅ Tree-shakable</div>
                        </div>
                    </div>

                    <div class="option-card platform">
                        <div class="option-header">
                            <span class="icon">🔗</span>
                            <h3>providedIn: 'platform'</h3>
                        </div>
                        <div class="option-body">
                            <p class="description">Shared across multiple Angular applications.</p>
                            <div class="code-snippet">
                                <code>&#64;Injectable(&#123; providedIn: 'platform' &#125;)</code>
                            </div>
                            <h4>When to use:</h4>
                            <ul>
                                <li>Micro-frontends</li>
                                <li>Multiple apps on same page</li>
                                <li>Shared logging service</li>
                            </ul>
                            <div class="tree-shake-badge advanced">⚠️ Rarely needed</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="diagram-section">
                <h2>📊 Injector Hierarchy</h2>
                <div class="hierarchy-diagram">
                    <div class="level platform-level">
                        <div class="level-label">Platform Injector</div>
                        <div class="level-desc">providedIn: 'platform'</div>
                    </div>
                    <div class="arrow">▼</div>
                    <div class="level root-level">
                        <div class="level-label">Root Injector</div>
                        <div class="level-desc">providedIn: 'root'</div>
                    </div>
                    <div class="arrow">▼</div>
                    <div class="level module-level">
                        <div class="level-label">Module Injector</div>
                        <div class="level-desc">providedIn: 'any' (lazy modules)</div>
                    </div>
                    <div class="arrow">▼</div>
                    <div class="level component-level">
                        <div class="level-label">Component Injector</div>
                        <div class="level-desc">providers: [...] in component</div>
                    </div>
                </div>
            </section>

            <section class="tips-section">
                <h2>💡 Best Practices</h2>
                <div class="tip-box">
                    <p><strong>Default to 'root':</strong> Unless you have a specific reason, use providedIn: 'root'. It's the simplest and most common pattern.</p>
                </div>
                <div class="tip-box">
                    <p><strong>Lazy loading consideration:</strong> Use 'any' when you need isolated state per lazy-loaded feature module.</p>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .use-case-container { max-width: 1200px; margin: 0 auto; }
        .page-header { text-align: center; margin-bottom: var(--spacing-2xl); }
        .back-link { display: inline-block; color: var(--primary-light); text-decoration: none; margin-bottom: var(--spacing-md); }
        .back-link:hover { color: var(--accent-color); }
        .page-header h1 { font-size: 2.25rem; margin-bottom: var(--spacing-md); }
        .header-description { font-size: 1.125rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto; }
        section { margin-bottom: var(--spacing-2xl); }
        section h2 { font-size: 1.75rem; margin-bottom: var(--spacing-xl); border-left: 4px solid var(--primary-color); padding-left: var(--spacing-lg); }
        
        .options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-xl); }
        .option-card { background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; }
        .option-card.root { border: 2px solid var(--primary-color); }
        .option-card.any { border: 2px solid var(--warning); }
        .option-card.platform { border: 2px solid var(--accent-color); }
        .option-header { padding: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-md); }
        .option-card.root .option-header { background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); }
        .option-card.any .option-header { background: linear-gradient(135deg, var(--warning), #fbbf24); color: var(--bg-primary); }
        .option-card.platform .option-header { background: linear-gradient(135deg, var(--accent-color), #4ade80); color: var(--bg-primary); }
        .option-header .icon { font-size: 1.5rem; }
        .option-header h3 { margin: 0; font-size: 1.25rem; }
        .option-body { padding: var(--spacing-lg); }
        .description { color: var(--text-secondary); margin-bottom: var(--spacing-md); }
        .code-snippet { background: var(--bg-card); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-md); }
        .code-snippet code { font-family: monospace; font-size: 0.875rem; }
        .option-body h4 { font-size: 1rem; margin-bottom: var(--spacing-sm); color: var(--text-secondary); }
        .option-body ul { list-style: none; padding: 0; margin: 0 0 var(--spacing-md) 0; }
        .option-body li { padding: var(--spacing-xs) 0; padding-left: var(--spacing-md); position: relative; color: var(--text-muted); font-size: 0.875rem; }
        .option-body li::before { content: '→'; position: absolute; left: 0; }
        .tree-shake-badge { display: inline-block; padding: var(--spacing-xs) var(--spacing-sm); background: rgba(16, 185, 129, 0.2); color: var(--success); border-radius: var(--radius-sm); font-size: 0.75rem; }
        .tree-shake-badge.advanced { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
        
        .hierarchy-diagram { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-xl); background: var(--bg-secondary); border-radius: var(--radius-lg); }
        .level { padding: var(--spacing-lg) var(--spacing-xl); border-radius: var(--radius-md); text-align: center; min-width: 250px; }
        .platform-level { background: linear-gradient(135deg, var(--accent-color), #4ade80); color: var(--bg-primary); }
        .root-level { background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); }
        .module-level { background: linear-gradient(135deg, var(--warning), #fbbf24); color: var(--bg-primary); }
        .component-level { background: var(--bg-card); border: 2px solid var(--text-muted); }
        .level-label { font-size: 1.125rem; font-weight: 600; }
        .level-desc { font-size: 0.875rem; opacity: 0.8; }
        .arrow { font-size: 1.5rem; color: var(--text-muted); }
        
        .tip-box { background: var(--bg-secondary); border-left: 4px solid var(--accent-color); padding: var(--spacing-lg); border-radius: var(--radius-md); margin-bottom: var(--spacing-md); }
        .tip-box p { margin: 0; color: var(--text-secondary); }
    `]
})
export class UseCase3ParentComponent { }
