/**
 * ============================================================================
 * REUSABLE TESTING UTILITIES DEMO
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-reusable-utils',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔧 Reusable Testing Utilities</h1>
                <p class="subtitle">DRY Testing with Helpers & Factories</p>
            </header>

            <section class="intro-section">
                <h2>Why Reusable Utilities?</h2>
                <div class="benefits">
                    <div class="benefit">
                        <span class="icon">📦</span>
                        <h4>DRY Code</h4>
                        <p>Write helpers once, use everywhere</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🎯</span>
                        <h4>Consistency</h4>
                        <p>Same patterns across all tests</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🚀</span>
                        <h4>Maintainability</h4>
                        <p>Update one place, fix everywhere</p>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Utility Categories</h2>
                
                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>🔍 DOM Helpers</h3>
                        <pre><code>// test-helpers.ts
export function getByTestId(fixture, id) {{ '{' }}
  return fixture.debugElement.query(
    By.css(\`[data-testid="\${{ '{' }}id{{ '}' }}"]\`)
  );
{{ '}' }}

// Usage in spec
const btn = getByTestId(fixture, 'submit-btn');</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🖱️ Event Helpers</h3>
                        <pre><code>export function click(fixture, selector) {{ '{' }}
  const el = queryEl(fixture, selector);
  el.triggerEventHandler('click', null);
  fixture.detectChanges();
{{ '}' }}

// Usage
click(fixture, '[data-testid="save"]');</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🏭 Data Factories</h3>
                        <pre><code>export function createMockUser(overrides = {{ '{' }}{{ '}' }}) {{ '{' }}
  return {{ '{' }}
    id: 1,
    name: 'Test User',
    email: 'test&#64;example.com',
    ...overrides
  {{ '}' }};
{{ '}' }}

// Usage
const admin = createMockUser({{ '{' }} role: 'admin' {{ '}' }});</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>💉 Mock Providers</h3>
                        <pre><code>export function provideRouterMock() {{ '{' }}
  return {{ '{' }}
    provide: Router,
    useValue: jasmine.createSpyObj('Router', ['navigate'])
  {{ '}' }};
{{ '}' }}

// Usage in TestBed
providers: [provideRouterMock()]</code></pre>
                    </div>
                </div>
            </section>

            <section class="file-structure">
                <h2>📁 Recommended Structure</h2>
                <pre class="tree"><code>src/app/
├── testing-utils/           # Shared utilities
│   ├── index.ts            # Barrel export
│   ├── test-helpers.ts     # DOM & event helpers
│   ├── mock-providers.ts   # Reusable mock providers
│   └── data-factories.ts   # Test data factories
└── features/
    └── my-feature/
        └── component.spec.ts  # Uses shared utilities</code></pre>
            </section>

            <section class="tips-section">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li><strong>Keep helpers pure</strong> - No side effects, just return values</li>
                    <li><strong>Use factory functions</strong> - Return new instances each call</li>
                    <li><strong>Type everything</strong> - Full TypeScript types for IDE support</li>
                    <li><strong>Document with JSDoc</strong> - Clear usage examples</li>
                    <li><strong>Barrel exports</strong> - Single import point</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }
        .subtitle { color: var(--text-secondary, #666); }

        .intro-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .benefits {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }
        .benefit {
            text-align: center;
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
        }
        .benefit .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .benefit h4 { margin: 0.5rem 0; color: var(--primary-color, #667eea); }
        .benefit p { margin: 0; color: var(--text-secondary, #666); font-size: 0.9rem; }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }
        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #10b981;
        }
        .concept-card h3 { margin-top: 0; }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.75rem;
        }

        .file-structure {
            margin: 2rem 0;
        }
        .tree {
            background: #1e1e2e;
            color: #89b4fa;
            padding: 1.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
        }

        .tips-section {
            background: linear-gradient(135deg, #10b98120, #14b8a620);
            padding: 2rem;
            border-radius: 12px;
        }
        .tips-section h2 { margin-top: 0; }
        .tips-section li { margin-bottom: 0.5rem; }
    `]
})
export class ReusableUtilsComponent { }
