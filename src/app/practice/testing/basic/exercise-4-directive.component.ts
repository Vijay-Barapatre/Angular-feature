/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: DIRECTIVE TESTING
 * ============================================================================
 */

import { Component, Directive, ElementRef, HostListener, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input() appHighlight = '#ffff00';
    @Input() defaultColor = 'transparent';

    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.appHighlight);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(this.defaultColor);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

@Component({
    selector: 'app-exercise-4-directive',
    standalone: true,
    imports: [CommonModule, HighlightDirective],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Directive Testing</h2>
                <p>Test custom directives with host components.</p>
            </div>

            <div class="demo">
                <div class="code-block">
                    <h4>Directive to Test</h4>
                    <pre><code>&#64;Directive({{ '{' }} selector: '[appHighlight]' {{ '}' }})
export class HighlightDirective {{ '{' }}
  &#64;Input() appHighlight = '#ffff00';
  &#64;Input() defaultColor = 'transparent';

  &#64;HostListener('mouseenter') onMouseEnter() {{ '{' }}
    this.highlight(this.appHighlight);
  {{ '}' }}

  &#64;HostListener('mouseleave') onMouseLeave() {{ '{' }}
    this.highlight(this.defaultColor);
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>Directive Tests</h4>
                    <pre><code>// Create a test host component
&#64;Component({{ '{' }}
  template: \`&lt;p appHighlight="cyan"&gt;Test&lt;/p&gt;\`
{{ '}' }})
class TestHostComponent {{ '{' }}{{ '}' }}

describe('HighlightDirective', () => {{ '{' }}
  let fixture: ComponentFixture&lt;TestHostComponent&gt;;
  let p: HTMLElement;

  beforeEach(() => {{ '{' }}
    fixture = TestBed.configureTestingModule({{ '{' }}
      imports: [HighlightDirective],
      declarations: [TestHostComponent]
    {{ '}' }}).createComponent(TestHostComponent);
    
    p = fixture.nativeElement.querySelector('p');
    fixture.detectChanges();
  {{ '}' }});

  it('should highlight on mouseenter', () => {{ '{' }}
    p.dispatchEvent(new Event('mouseenter'));
    expect(p.style.backgroundColor).toBe('cyan');
  {{ '}' }});

  it('should remove highlight on mouseleave', () => {{ '{' }}
    p.dispatchEvent(new Event('mouseenter'));
    p.dispatchEvent(new Event('mouseleave'));
    expect(p.style.backgroundColor).toBe('transparent');
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🎮 Interactive Demo</h3>
                <div class="demo-items">
                    <p [appHighlight]="'#a7f3d0'" class="demo-text">
                        Hover me! (Green highlight)
                    </p>
                    <p [appHighlight]="'#fde68a'" class="demo-text">
                        Hover me! (Yellow highlight)
                    </p>
                    <p [appHighlight]="'#c4b5fd'" class="demo-text">
                        Hover me! (Purple highlight)
                    </p>
                    <p [appHighlight]="'#fda4af'" class="demo-text">
                        Hover me! (Pink highlight)
                    </p>
                </div>

                <div class="info-box">
                    <h4>💡 Key Points</h4>
                    <ul>
                        <li>Create a test host component for directives</li>
                        <li>Use dispatchEvent to simulate DOM events</li>
                        <li>Check element properties after events</li>
                        <li>Test with different input values</li>
                    </ul>
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
        .demo-items { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .demo-text { padding: 1rem; margin: 0; background: #f8fafc; border-radius: 8px; cursor: pointer; transition: background-color 0.3s; }
        .info-box { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .info-box h4 { margin: 0 0 0.5rem; }
        .info-box ul { margin: 0; padding-left: 1.25rem; }
    `]
})
export class Exercise4DirectiveTestingComponent { }
