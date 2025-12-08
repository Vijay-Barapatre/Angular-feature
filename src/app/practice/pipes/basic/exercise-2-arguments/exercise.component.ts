/**
 * ============================================================================
 * 🟦 EXERCISE 2: PIPE ARGUMENTS
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'highlight', standalone: true })
export class HighlightPipe implements PipeTransform {
    transform(text: string, search: string, cssClass = 'highlight'): string {
        if (!search || !text) return text;
        const regex = new RegExp(`(${search})`, 'gi');
        return text.replace(regex, `<span class="${cssClass}">$1</span>`);
    }
}

@Component({
    selector: 'app-exercise-2-arguments',
    standalone: true,
    imports: [CommonModule, HighlightPipe],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Pipe Arguments</h2>
                <p>Create pipes that accept multiple configuration parameters.</p>
            </div>

            <div class="demo">
                <h3>🎮 Highlight Pipe Demo</h3>
                
                <div class="controls">
                    <input type="text" [value]="searchTerm()" 
                        (input)="searchTerm.set($any($event.target).value)"
                        placeholder="Enter search term...">
                </div>

                <div class="result" [innerHTML]="sampleText | highlight:searchTerm():'highlight'">
                </div>

                <div class="code-preview">
                    <pre><code>{{ "{{ text | highlight:'search':'css-class' }}" }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #10b981; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .controls { margin-bottom: 1rem; }
        .controls input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; }
        .result { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; line-height: 1.8; }
        :host ::ng-deep .highlight { background: #fef08a; padding: 0.1rem 0.25rem; border-radius: 2px; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise2ArgumentsComponent {
    sampleText = 'Angular is a platform for building mobile and desktop web applications. Angular provides a collection of well-integrated libraries that cover a wide variety of features.';
    searchTerm = signal('Angular');
}
