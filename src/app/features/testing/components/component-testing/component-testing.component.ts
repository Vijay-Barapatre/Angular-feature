/**
 * ============================================================================
 * COMPONENT TESTING BASICS
 * ============================================================================
 * 
 * Demonstrates fundamental Angular component testing patterns:
 * - TestBed.configureTestingModule() setup
 * - ComponentFixture creation
 * - DOM querying with debugElement
 * - Event testing with triggerEventHandler
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-component-testing',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧩 Component Testing Basics</h1>
                <p class="subtitle">TestBed, Fixtures & DOM Queries</p>
            </header>

            <section class="demo-section">
                <h2>Interactive Counter Demo</h2>
                <p>This component is designed to be testable. Try the buttons!</p>
                
                <div class="counter-demo">
                    <button 
                        class="btn btn-decrement" 
                        (click)="decrement()"
                        [disabled]="count <= 0"
                        data-testid="decrement-btn">
                        −
                    </button>
                    <span class="count" data-testid="count-display">{{ count }}</span>
                    <button 
                        class="btn btn-increment" 
                        (click)="increment()"
                        data-testid="increment-btn">
                        +
                    </button>
                </div>

                <div class="message" [class.visible]="message" data-testid="message">
                    {{ message }}
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Key Testing Concepts</h2>
                
                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>🔧 TestBed Setup</h3>
                        <pre><code>TestBed.configureTestingModule({{ '{' }}
  imports: [ComponentUnderTest]
{{ '}' }});</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🎯 Fixture Creation</h3>
                        <pre><code>fixture = TestBed.createComponent(MyComponent);
component = fixture.componentInstance;
fixture.detectChanges();</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🔍 DOM Queries</h3>
                        <pre><code>// By CSS selector
const el = fixture.debugElement.query(By.css('.count'));
expect(el.nativeElement.textContent).toBe('0');

// By data-testid (recommended)
const btn = fixture.debugElement.query(
  By.css('[data-testid="increment-btn"]')
);</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🖱️ Event Testing</h3>
                        <pre><code>const btn = fixture.debugElement.query(By.css('button'));
btn.triggerEventHandler('click', null);
fixture.detectChanges();
expect(component.count).toBe(1);</code></pre>
                    </div>
                </div>
            </section>

            <section class="tips-section">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li><strong>Use data-testid</strong> - More stable than CSS classes</li>
                    <li><strong>Call detectChanges()</strong> - After state changes</li>
                    <li><strong>Test behavior, not implementation</strong> - Focus on what user sees</li>
                    <li><strong>Keep tests isolated</strong> - Each test should be independent</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-secondary, #666); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 2rem;
        }

        .counter-demo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
        }

        .btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-increment { background: #10b981; color: white; }
        .btn-decrement { background: #ef4444; color: white; }
        .btn:hover:not(:disabled) { transform: scale(1.1); }

        .count {
            font-size: 3rem;
            font-weight: bold;
            min-width: 100px;
            color: var(--text-primary, #1a1a2e);
        }

        .message {
            height: 24px;
            color: #10b981;
            font-weight: 500;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .message.visible { opacity: 1; }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }

        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid var(--primary-color, #667eea);
        }
        .concept-card h3 { margin-top: 0; color: var(--text-primary, #1a1a2e); }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.85rem;
        }

        .tips-section {
            background: linear-gradient(135deg, #667eea20, #764ba220);
            padding: 2rem;
            border-radius: 12px;
            margin-top: 2rem;
        }
        .tips-section h2 { margin-top: 0; }
        .tips-section li { margin-bottom: 0.5rem; }
    `]
})
export class ComponentTestingComponent {
    /**
     * Current counter value
     * Can be set via @Input for testing different initial states
     */
    @Input() count = 0;

    /**
     * Emitted whenever the count changes
     * Allows parent components to react to changes
     */
    @Output() countChange = new EventEmitter<number>();

    /**
     * Feedback message shown after actions
     */
    message = '';

    /**
     * Increment the counter and emit the new value
     */
    increment(): void {
        this.count++;
        this.countChange.emit(this.count);
        this.showMessage('Incremented!');
    }

    /**
     * Decrement the counter (minimum 0) and emit the new value
     */
    decrement(): void {
        if (this.count > 0) {
            this.count--;
            this.countChange.emit(this.count);
            this.showMessage('Decremented!');
        }
    }

    /**
     * Display a temporary message
     */
    private showMessage(msg: string): void {
        this.message = msg;
        setTimeout(() => this.message = '', 1500);
    }
}
