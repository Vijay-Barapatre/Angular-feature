/**
 * ============================================================================
 * 🟦 EXERCISE 1: CUSTOM PIPE
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
    transform(value: string | null, length = 50, suffix = '...'): string {
        if (!value) return '';
        if (value.length <= length) return value;
        return value.slice(0, length).trim() + suffix;
    }
}

@Component({
    selector: 'app-exercise-1-custom',
    standalone: true,
    imports: [CommonModule, FormsModule, TruncatePipe],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Custom Pipe</h2>
                <p>Create a reusable pipe to truncate text with ellipsis.</p>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="controls">
                    <label>Max Length: {{ maxLength() }}</label>
                    <input type="range" min="10" max="100" [value]="maxLength()" 
                        (input)="maxLength.set(+$any($event.target).value)">
                </div>

                <div class="text-area">
                    <h4>Original Text:</h4>
                    <p class="original">{{ sampleText }}</p>
                </div>

                <div class="text-area">
                    <h4>Truncated ({{ maxLength() }} chars):</h4>
                    <p class="truncated">{{ sampleText | truncate:maxLength() }}</p>
                </div>

                <div class="examples">
                    <h4>More Examples:</h4>
                    <code>{{ 'Hello World' | truncate:5 }}</code>
                    <code>{{ 'Short' | truncate:20 }}</code>
                    <code>{{ '' | truncate }}</code>
                </div>

                <div class="code-preview">
                    <pre><code>&#64;Pipe({{ '{' }} name: 'truncate', standalone: true {{ '}' }})
export class TruncatePipe implements PipeTransform {{ '{' }}
  transform(value: string, length = 50, suffix = '...'): string {{ '{' }}
    if (!value || value.length &lt;= length) return value;
    return value.slice(0, length).trim() + suffix;
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #10b981; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .controls { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .controls label { display: block; margin-bottom: 0.5rem; }
        .controls input { width: 100%; }
        .text-area { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .text-area h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .text-area p { margin: 0; }
        .original { word-break: break-all; }
        .truncated { color: #10b981; font-weight: 500; }
        .examples { margin-bottom: 1rem; }
        .examples h4 { margin: 0 0 0.5rem; }
        .examples code { display: block; padding: 0.5rem; background: #f8fafc; border-radius: 4px; margin-bottom: 0.25rem; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise1CustomComponent {
    sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    maxLength = signal(50);
}
