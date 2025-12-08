/**
 * ============================================================================
 * 🟦 EXERCISE 4: INPUT DECORATOR
 * ============================================================================
 */

import { Component, Directive, ElementRef, Input, OnChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appSize]',
    standalone: true
})
export class SizeDirective implements OnChanges {
    @Input() appSize: 'sm' | 'md' | 'lg' | 'xl' = 'md';
    @Input() appSizeUnit = 'rem';

    private sizes = { sm: 0.875, md: 1, lg: 1.25, xl: 1.5 };

    constructor(private el: ElementRef) { }

    ngOnChanges(): void {
        const size = this.sizes[this.appSize] || 1;
        this.el.nativeElement.style.fontSize = `${size}${this.appSizeUnit}`;
        this.el.nativeElement.style.padding = `${size * 0.5}${this.appSizeUnit}`;
    }
}

@Component({
    selector: 'app-exercise-4-input',
    standalone: true,
    imports: [CommonModule, SizeDirective],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Input Decorator</h2>
                <p>Pass configuration data to directives using &#64;Input.</p>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="size-selector">
                    @for (size of sizes; track size) {
                        <button [class.active]="selectedSize() === size" (click)="selectedSize.set(size)">
                            {{ size | uppercase }}
                        </button>
                    }
                </div>

                <div class="demo-items">
                    <p [appSize]="selectedSize()" class="demo-item">
                        This text uses appSize="{{ selectedSize() }}"
                    </p>
                    <button [appSize]="selectedSize()" class="demo-button">
                        Button with appSize
                    </button>
                </div>

                <div class="all-sizes">
                    <h4>All Sizes Comparison:</h4>
                    @for (size of sizes; track size) {
                        <span [appSize]="size" class="size-example">{{ size }}</span>
                    }
                </div>

                <div class="code-preview">
                    <pre><code>&lt;p [appSize]="'lg'"&gt;Large text&lt;/p&gt;
&lt;button [appSize]="'sm'"&gt;Small button&lt;/button&gt;</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #f59e0b; }
        .instructions h2 { margin: 0 0 0.5rem; color: #f59e0b; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .size-selector { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .size-selector button { padding: 0.5rem 1rem; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; }
        .size-selector button.active { border-color: #f59e0b; background: #fffbeb; }
        .demo-items { margin-bottom: 1.5rem; }
        .demo-item { background: #f8fafc; border-radius: 8px; margin: 0 0 0.5rem; display: inline-block; }
        .demo-button { background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .all-sizes { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .all-sizes h4 { margin: 0 0 0.75rem; }
        .size-example { display: inline-block; background: white; border-radius: 4px; margin-right: 0.5rem; border: 1px solid #e5e7eb; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise4InputComponent {
    sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
    selectedSize = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
}
