/**
 * ============================================================================
 * 🟦 EXERCISE 1: ATTRIBUTE DIRECTIVE
 * ============================================================================
 */

import { Component, Directive, ElementRef, HostListener, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO: Complete this directive
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input() appHighlight = 'yellow';
    private originalColor = '';

    constructor(private el: ElementRef) { }

    // TODO: Add @HostListener for 'mouseenter'
    // Hint: Store original color, then apply highlight color

    // TODO: Add @HostListener for 'mouseleave'
    // Hint: Restore original color
}

@Component({
    selector: 'app-exercise-1-attribute',
    standalone: true,
    imports: [CommonModule, HighlightDirective],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Attribute Directive</h2>
                <p>Create a highlight directive that changes background on hover.</p>
                
                <div class="task-list">
                    <h4>📋 Tasks:</h4>
                    <ul>
                        <li>Add <code>&#64;HostListener('mouseenter')</code></li>
                        <li>Add <code>&#64;HostListener('mouseleave')</code></li>
                        <li>Store and restore original background color</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="demo-items">
                    <p appHighlight class="demo-item">
                        Hover me! (Default yellow)
                    </p>
                    <p [appHighlight]="'lightblue'" class="demo-item">
                        Hover me! (Light blue)
                    </p>
                    <p [appHighlight]="'#ff9999'" class="demo-item">
                        Hover me! (Pink)
                    </p>
                    <p [appHighlight]="selectedColor()" class="demo-item">
                        Hover me! (Custom: {{ selectedColor() }})
                    </p>
                </div>

                <div class="color-picker">
                    <h4>Choose Custom Color:</h4>
                    <div class="color-options">
                        @for (color of colors; track color) {
                            <button 
                                [style.backgroundColor]="color"
                                [class.selected]="selectedColor() === color"
                                (click)="selectedColor.set(color)">
                            </button>
                        }
                    </div>
                </div>

                <div class="code-preview">
                    <h4>Directive Code</h4>
                    <pre><code>&#64;Directive({{ '{' }} selector: '[appHighlight]' {{ '}' }})
export class HighlightDirective {{ '{' }}
  &#64;Input() appHighlight = 'yellow';
  
  &#64;HostListener('mouseenter')
  onEnter() {{ '{' }}
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  {{ '}' }}
  
  &#64;HostListener('mouseleave')
  onLeave() {{ '{' }}
    this.el.nativeElement.style.backgroundColor = '';
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; }
        .instructions h2 { margin: 0 0 0.5rem; color: #f59e0b; }
        .task-list { background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .demo-items { display: grid; gap: 0.5rem; margin-bottom: 1.5rem; }
        .demo-item { padding: 1rem; background: #f8fafc; border-radius: 8px; margin: 0; cursor: pointer; transition: background 0.2s; }
        .color-picker { margin-bottom: 1.5rem; }
        .color-picker h4 { margin: 0 0 0.5rem; }
        .color-options { display: flex; gap: 0.5rem; }
        .color-options button { width: 40px; height: 40px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; }
        .color-options button.selected { border-color: #1e1e2e; border-width: 3px; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; overflow-x: auto; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise1AttributeComponent {
    colors = ['#ffeb3b', '#4fc3f7', '#ff9999', '#a5d6a7', '#ce93d8'];
    selectedColor = signal('#ffeb3b');
}
