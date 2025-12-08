/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: COMPONENT INTEGRATION TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-2-integration',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Component Integration</h2>
                <p>Test parent-child component interactions.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>Parent-Child Setup</h4>
                    <pre><code>// child.component.ts
&#64;Component({{ '{' }}
  selector: 'app-child',
  template: \`
    &lt;button (click)="notify.emit(count)"&gt;
      Clicked {{ '{{' }} count {{ '}}' }} times
    &lt;/button&gt;
  \`
{{ '}' }})
export class ChildComponent {{ '{' }}
  &#64;Input() count = 0;
  &#64;Output() notify = new EventEmitter&lt;number&gt;();
{{ '}' }}

// parent.component.ts
&#64;Component({{ '{' }}
  template: \`
    &lt;app-child 
      [count]="clickCount"
      (notify)="onNotify($event)"&gt;
    &lt;/app-child&gt;
  \`
{{ '}' }})
export class ParentComponent {{ '{' }}
  clickCount = 0;
  onNotify(count: number) {{ '{' }} this.clickCount = count + 1; {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>Integration Test</h4>
                    <pre><code>describe('Parent-Child Integration', () => {{ '{' }}
  let fixture: ComponentFixture&lt;ParentComponent&gt;;
  let parent: ParentComponent;

  beforeEach(() => {{ '{' }}
    TestBed.configureTestingModule({{ '{' }}
      imports: [ParentComponent, ChildComponent]
    {{ '}' }});
    fixture = TestBed.createComponent(ParentComponent);
    parent = fixture.componentInstance;
    fixture.detectChanges();
  {{ '}' }});

  it('should pass count to child', () => {{ '{' }}
    const childEl = fixture.debugElement.query(By.directive(ChildComponent));
    const child = childEl.componentInstance;
    expect(child.count).toBe(0);
  {{ '}' }});

  it('should receive events from child', () => {{ '{' }}
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(parent.clickCount).toBe(1);
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🎮 Interactive Demo</h3>
                <div class="demo-area">
                    <div class="parent-box">
                        <h4>Parent Component</h4>
                        <p>Click Count: {{ clickCount() }}</p>
                    </div>
                    <div class="arrow">⬇️ [count]</div>
                    <div class="child-box">
                        <h4>Child Component</h4>
                        <button (click)="handleClick()">
                            Clicked {{ clickCount() }} times
                        </button>
                    </div>
                    <div class="arrow">⬆️ (notify)</div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #14b8a6; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .demo-area { padding: 1.5rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .parent-box, .child-box { padding: 1rem; border-radius: 8px; margin: 0.5rem auto; max-width: 250px; }
        .parent-box { background: #14b8a6; color: white; }
        .parent-box h4, .child-box h4 { margin: 0 0 0.5rem; }
        .child-box { background: #f59e0b; color: white; }
        .child-box button { padding: 0.75rem 1.5rem; background: white; color: #f59e0b; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .arrow { font-size: 1.25rem; padding: 0.5rem; color: #6b7280; }
    `]
})
export class Scenario2IntegrationComponent {
    clickCount = signal(0);

    handleClick(): void {
        this.clickCount.update(c => c + 1);
    }
}
