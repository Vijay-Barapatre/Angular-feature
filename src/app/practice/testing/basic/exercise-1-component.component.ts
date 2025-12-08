/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: COMPONENT TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exercise-1-component',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Component Testing</h2>
                <p>Learn to test Angular components with TestBed.</p>
            </div>

            <div class="demo">
                <div class="test-structure">
                    <h3>📁 Test File Structure</h3>
                    <div class="file-tree">
                        <div class="file">📄 counter.component.ts</div>
                        <div class="file test">📄 counter.component.spec.ts</div>
                    </div>
                </div>

                <div class="code-block">
                    <h4>Component to Test</h4>
                    <pre><code>&#64;Component({{ '{' }}
  selector: 'app-counter',
  template: \`
    &lt;h2&gt;{{ '{{' }} count {{ '}}' }}&lt;/h2&gt;
    &lt;button (click)="increment()"&gt;+&lt;/button&gt;
    &lt;button (click)="decrement()"&gt;-&lt;/button&gt;
  \`
{{ '}' }})
export class CounterComponent {{ '{' }}
  count = 0;
  increment() {{ '{' }} this.count++; {{ '}' }}
  decrement() {{ '{' }} this.count--; {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>Test File</h4>
                    <pre><code>describe('CounterComponent', () => {{ '{' }}
  let component: CounterComponent;
  let fixture: ComponentFixture&lt;CounterComponent&gt;;

  beforeEach(async () => {{ '{' }}
    await TestBed.configureTestingModule({{ '{' }}
      imports: [CounterComponent]
    {{ '}' }}).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  {{ '}' }});

  it('should create', () => {{ '{' }}
    expect(component).toBeTruthy();
  {{ '}' }});

  it('should increment count', () => {{ '{' }}
    component.increment();
    expect(component.count).toBe(1);
  {{ '}' }});

  it('should display count in template', () => {{ '{' }}
    component.count = 5;
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('5');
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🎮 Interactive Demo</h3>
                <div class="demo-component">
                    <h4>Counter: {{ count() }}</h4>
                    <button (click)="increment()">+</button>
                    <button (click)="decrement()">-</button>
                </div>

                <div class="test-results">
                    <h4>Test Results</h4>
                    @for (test of tests(); track test.name) {
                        <div class="test-item" [class.pass]="test.pass">
                            <span>{{ test.pass ? '✓' : '✗' }}</span>
                            {{ test.name }}
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #f0fdfa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #14b8a6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .test-structure { margin-bottom: 1.5rem; }
        .test-structure h3 { margin: 0 0 0.5rem; }
        .file-tree { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .file { padding: 0.25rem 0; font-family: monospace; }
        .file.test { color: #14b8a6; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .demo-component { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
        .demo-component h4 { margin: 0 0 0.75rem; }
        .demo-component button { padding: 0.5rem 1.5rem; margin: 0 0.25rem; background: #14b8a6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1.25rem; }
        .test-results { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .test-results h4 { color: white; margin: 0 0 0.5rem; }
        .test-item { padding: 0.5rem; color: #ef4444; display: flex; align-items: center; gap: 0.5rem; }
        .test-item.pass { color: #10b981; }
    `]
})
export class Exercise1ComponentTestingComponent {
    count = signal(0);

    tests = signal([
        { name: 'should create', pass: true },
        { name: 'should start at 0', pass: true },
        { name: 'should increment count', pass: true },
        { name: 'should decrement count', pass: true },
        { name: 'should display count in template', pass: true }
    ]);

    increment(): void {
        this.count.update(c => c + 1);
    }

    decrement(): void {
        this.count.update(c => c - 1);
    }
}
