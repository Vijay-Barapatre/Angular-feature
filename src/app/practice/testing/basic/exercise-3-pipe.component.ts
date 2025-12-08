/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: PIPE TESTING
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number = 20): string {
        if (!value) return '';
        if (value.length <= limit) return value;
        return value.substring(0, limit) + '...';
    }
}

@Component({
    selector: 'app-exercise-3-pipe',
    standalone: true,
    imports: [CommonModule, FormsModule, TruncatePipe],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Pipe Testing</h2>
                <p>Test custom pipes with various inputs.</p>
            </div>

            <div class="demo">
                <div class="code-block">
                    <h4>Pipe to Test</h4>
                    <pre><code>&#64;Pipe({{ '{' }} name: 'truncate' {{ '}' }})
export class TruncatePipe implements PipeTransform {{ '{' }}
  transform(value: string, limit = 20): string {{ '{' }}
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>Pipe Tests</h4>
                    <pre><code>describe('TruncatePipe', () => {{ '{' }}
  let pipe: TruncatePipe;

  beforeEach(() => {{ '{' }}
    pipe = new TruncatePipe();
  {{ '}' }});

  it('should return empty string for null', () => {{ '{' }}
    expect(pipe.transform(null as any)).toBe('');
  {{ '}' }});

  it('should not truncate short strings', () => {{ '{' }}
    expect(pipe.transform('Hello', 10)).toBe('Hello');
  {{ '}' }});

  it('should truncate long strings', () => {{ '{' }}
    const result = pipe.transform('Hello World', 5);
    expect(result).toBe('Hello...');
  {{ '}' }});

  it('should use default limit of 20', () => {{ '{' }}
    const long = 'This is a very long string';
    const result = pipe.transform(long);
    expect(result.length).toBe(23); // 20 + '...'
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🎮 Interactive Demo</h3>
                <div class="pipe-demo">
                    <div class="input-section">
                        <label>Input Text:</label>
                        <textarea [(ngModel)]="inputText" rows="3"></textarea>
                    </div>
                    <div class="input-section">
                        <label>Limit: {{ limit }}</label>
                        <input type="range" [(ngModel)]="limit" min="5" max="50">
                    </div>
                    <div class="output-section">
                        <label>Output:</label>
                        <div class="output">{{ inputText | truncate:limit }}</div>
                    </div>
                </div>

                <div class="test-cases">
                    <h4>Test Cases</h4>
                    @for (test of testCases(); track test.input) {
                        <div class="test-case">
                            <span class="input">"{{ test.input }}"</span>
                            <span class="arrow">→</span>
                            <span class="output">"{{ test.output }}"</span>
                            <span class="status">{{ test.pass ? '✅' : '❌' }}</span>
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
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .pipe-demo { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .input-section { margin-bottom: 1rem; }
        .input-section label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .input-section textarea { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .input-section input[type="range"] { width: 100%; }
        .output-section label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .output { padding: 0.75rem; background: white; border: 1px solid #14b8a6; border-radius: 4px; font-family: monospace; }
        .test-cases { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .test-cases h4 { color: white; margin: 0 0 0.75rem; }
        .test-case { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; margin-bottom: 0.25rem; }
        .test-case .input { color: #94a3b8; font-family: monospace; font-size: 0.85rem; }
        .test-case .arrow { color: #6b7280; }
        .test-case .output { color: #a6e3a1; font-family: monospace; font-size: 0.85rem; }
        .test-case .status { margin-left: auto; }
    `]
})
export class Exercise3PipeTestingComponent {
    inputText = 'This is a sample text that might need truncation';
    limit = 20;

    testCases = signal([
        { input: '', output: '', pass: true },
        { input: 'Hello', output: 'Hello', pass: true },
        { input: 'Hello World', output: 'Hello...', pass: true },
        { input: 'Angular Testing', output: 'Angular Testing', pass: true }
    ]);
}
