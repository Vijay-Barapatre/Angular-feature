/**
 * ============================================================================
 * USE CASE 5: TESTING LIBRARIES
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-testing-libraries',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧪 Testing Libraries</h1>
                <p class="subtitle">Unit & Integration Testing</p>
            </header>

            <section class="run-section">
                <h2>▶️ Running Library Tests</h2>
                <pre class="code terminal"><code># Run tests for specific library
ng test my-ui-kit

# Run with coverage
ng test my-ui-kit --code-coverage

# Run once (CI/CD)
ng test my-ui-kit --watch=false --browsers=ChromeHeadless</code></pre>
            </section>

            <section class="component-test-section">
                <h2>🧩 Testing Components</h2>
                <pre class="code"><code>// button.component.spec.ts
import {{ '{' }} ComponentFixture, TestBed {{ '}' }} from '&#64;angular/core/testing';
import {{ '{' }} ButtonComponent {{ '}' }} from './button.component';

describe('ButtonComponent', () => {{ '{' }}
    let component: ButtonComponent;
    let fixture: ComponentFixture&lt;ButtonComponent&gt;;

    beforeEach(async () => {{ '{' }}
        await TestBed.configureTestingModule({{ '{' }}
            imports: [ButtonComponent]  // 🛡️ Standalone import
        {{ '}' }}).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    {{ '}' }});

    it('should create', () => {{ '{' }}
        expect(component).toBeTruthy();
    {{ '}' }});

    it('should have default variant', () => {{ '{' }}
        expect(component.variant).toBe('primary');
    {{ '}' }});

    it('should apply variant class', () => {{ '{' }}
        component.variant = 'secondary';
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('btn-secondary');
    {{ '}' }});

    it('should emit click event', () => {{ '{' }}
        spyOn(component.onClick, 'emit');
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(component.onClick.emit).toHaveBeenCalled();
    {{ '}' }});
{{ '}' }});</code></pre>
            </section>

            <section class="service-test-section">
                <h2>⚙️ Testing Services</h2>
                <pre class="code"><code>// notification.service.spec.ts
import {{ '{' }} TestBed {{ '}' }} from '&#64;angular/core/testing';
import {{ '{' }} NotificationService {{ '}' }} from './notification.service';

describe('NotificationService', () => {{ '{' }}
    let service: NotificationService;

    beforeEach(() => {{ '{' }}
        TestBed.configureTestingModule({{ '{' }}{{ '}' }});
        service = TestBed.inject(NotificationService);
    {{ '}' }});

    it('should be created', () => {{ '{' }}
        expect(service).toBeTruthy();
    {{ '}' }});

    it('should add notification', () => {{ '{' }}
        service.show('Test message', 'info');
        expect(service.notifications().length).toBe(1);
        expect(service.notifications()[0].message).toBe('Test message');
    {{ '}' }});

    it('should dismiss notification', () => {{ '{' }}
        service.show('Test', 'info');
        const id = service.notifications()[0].id;
        service.dismiss(id);
        expect(service.notifications().length).toBe(0);
    {{ '}' }});
{{ '}' }});</code></pre>
            </section>

            <section class="pipe-test-section">
                <h2>🔧 Testing Pipes</h2>
                <pre class="code"><code>// truncate.pipe.spec.ts
import {{ '{' }} TruncatePipe {{ '}' }} from './truncate.pipe';

describe('TruncatePipe', () => {{ '{' }}
    let pipe: TruncatePipe;

    beforeEach(() => {{ '{' }}
        pipe = new TruncatePipe();
    {{ '}' }});

    it('should not truncate short text', () => {{ '{' }}
        expect(pipe.transform('Hello', 10)).toBe('Hello');
    {{ '}' }});

    it('should truncate long text', () => {{ '{' }}
        const longText = 'This is a very long text';
        expect(pipe.transform(longText, 10)).toBe('This is a ...');
    {{ '}' }});

    it('should handle empty string', () => {{ '{' }}
        expect(pipe.transform('', 10)).toBe('');
    {{ '}' }});
{{ '}' }});</code></pre>
            </section>

            <section class="directive-test-section">
                <h2>⚡ Testing Directives</h2>
                <pre class="code"><code>// highlight.directive.spec.ts
import {{ '{' }} Component {{ '}' }} from '&#64;angular/core';
import {{ '{' }} ComponentFixture, TestBed {{ '}' }} from '&#64;angular/core/testing';
import {{ '{' }} HighlightDirective {{ '}' }} from './highlight.directive';

// Test host component
&#64;Component({{ '{' }}
    template: &#96;&lt;p [uiHighlight]="'#ff0000'"&gt;Test&lt;/p&gt;&#96;
{{ '}' }})
class TestHostComponent {{ '{' }}{{ '}' }}

describe('HighlightDirective', () => {{ '{' }}
    let fixture: ComponentFixture&lt;TestHostComponent&gt;;

    beforeEach(async () => {{ '{' }}
        await TestBed.configureTestingModule({{ '{' }}
            declarations: [TestHostComponent],
            imports: [HighlightDirective]
        {{ '}' }}).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    {{ '}' }});

    it('should apply background color', () => {{ '{' }}
        const p = fixture.nativeElement.querySelector('p');
        expect(p.style.backgroundColor).toBe('rgb(255, 0, 0)');
    {{ '}' }});
{{ '}' }});</code></pre>
            </section>

            <section class="coverage-section">
                <h2>📊 Code Coverage</h2>
                <pre class="code terminal"><code># Generate coverage report
ng test my-ui-kit --code-coverage

# Output: coverage/my-ui-kit/index.html</code></pre>
                <div class="coverage-tips">
                    <h4>Coverage Targets</h4>
                    <table>
                        <tr><td>Statements</td><td>&gt;80%</td></tr>
                        <tr><td>Branches</td><td>&gt;75%</td></tr>
                        <tr><td>Functions</td><td>&gt;80%</td></tr>
                        <tr><td>Lines</td><td>&gt;80%</td></tr>
                    </table>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; margin: 0.5rem 0; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        section { margin-bottom: 2rem; }

        .coverage-tips { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .coverage-tips h4 { margin: 0 0 0.5rem; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 0.5rem; border-bottom: 1px solid #e5e7eb; }
    `]
})
export class TestingLibrariesComponent { }
