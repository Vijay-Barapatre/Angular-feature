/**
 * ============================================================================
 * 🟦 EXERCISE 4: AFTERCONTENTINIT
 * ============================================================================
 */

import { Component, AfterContentInit, ContentChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-content-wrapper',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="wrapper">
            <h4>Content Wrapper Component</h4>
            <div class="projected-content">
                <ng-content></ng-content>
            </div>
            <div class="content-info">
                <p>Projected content detected: {{ hasContent() ? '✅ Yes' : '❌ No' }}</p>
                <p>Content text: "{{ contentText() }}"</p>
            </div>
        </div>
    `,
    styles: [`
        .wrapper { padding: 1rem; background: #ecfeff; border: 2px solid #06b6d4; border-radius: 8px; }
        h4 { margin: 0 0 0.75rem; color: #06b6d4; }
        .projected-content { padding: 1rem; background: white; border-radius: 6px; margin-bottom: 1rem; min-height: 60px; }
        .content-info { padding: 0.75rem; background: #cffafe; border-radius: 6px; font-size: 0.9rem; }
        .content-info p { margin: 0.25rem 0; }
    `]
})
export class ContentWrapperComponent implements AfterContentInit {
    @ContentChild('projectedContent') contentRef?: ElementRef;

    hasContent = signal(false);
    contentText = signal('');

    ngAfterContentInit(): void {
        console.log('ngAfterContentInit: Projected content is now available');

        if (this.contentRef) {
            this.hasContent.set(true);
            this.contentText.set(this.contentRef.nativeElement.textContent);
        }
    }
}

@Component({
    selector: 'app-exercise-4-aftercontentinit',
    standalone: true,
    imports: [CommonModule, ContentWrapperComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: AfterContentInit</h2>
                <p>Access projected content (ng-content) after initialization.</p>
                <ul>
                    <li><code>&#64;ContentChild</code> to query projected content</li>
                    <li><code>ngAfterContentInit</code> to safely access content children</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="content-examples">
                    <h4>Example 1: With Content</h4>
                    <app-content-wrapper>
                        <p #projectedContent>Hello! I am projected content!</p>
                    </app-content-wrapper>

                    <h4>Example 2: Different Content</h4>
                    <app-content-wrapper>
                        <div #projectedContent>
                            <strong>Rich Content:</strong> With formatting and more text.
                        </div>
                    </app-content-wrapper>
                </div>

                <div class="comparison">
                    <h4>ViewChild vs ContentChild</h4>
                    <table>
                        <tr>
                            <th>ViewChild</th>
                            <th>ContentChild</th>
                        </tr>
                        <tr>
                            <td>Queries component's own template</td>
                            <td>Queries projected content</td>
                        </tr>
                        <tr>
                            <td>Available in ngAfterViewInit</td>
                            <td>Available in ngAfterContentInit</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #06b6d4; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .content-examples h4 { margin: 1rem 0 0.5rem; }
        .content-examples h4:first-child { margin-top: 0; }
        .comparison { margin-top: 1.5rem; }
        .comparison h4 { margin: 0 0 0.75rem; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb; }
        th { background: #f8fafc; }
    `]
})
export class Exercise4AfterContentInitComponent { }
