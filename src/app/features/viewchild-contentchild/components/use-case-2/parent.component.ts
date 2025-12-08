/**
 * USE CASE 2: @VIEWCHILD WITH TEMPLATE REFERENCES - PARENT COMPONENT
 * 
 * This component demonstrates using @ViewChild with template reference variables
 * to access DOM elements directly.
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: DOM Element Access
 * -------------------------------------------------------------------------------
 * You can use @ViewChild to access:
 * 1. Native DOM elements via template refs (#varName)
 * 2. ElementRef wrapper for type safety
 * 3. Direct DOM manipulation capabilities
 * 
 * 🏗️ KEY CONCEPTS:
 * 1. **Template Reference Variable**: #inputRef in template
 * 2. **ElementRef<T>**: Type-safe wrapper around native element
 * 3. **nativeElement**: Access to actual DOM element
 * 
 * ⚡ COMMON USE CASES:
 * - Focus management
 * - Scrolling to elements
 * - Measuring element dimensions
 * - Direct DOM manipulation (use sparingly!)
 * 
 * ⚠️ BEST PRACTICES:
 * - Avoid excessive DOM manipulation (use Angular's data binding instead)
 * - Use Renderer2 for platform-safe DOM access
 * - Always check for null/undefined
 * 
 * DATA FLOW DIAGRAM:
 * ```mermaid
 * graph TD
 *     Template["Template: &lt;input #inputRef&gt;"] -->|Template Ref| ViewChild["@ViewChild('inputRef')"]
 *     ViewChild --> ElementRef["ElementRef&lt;HTMLInputElement&gt;"]
 *     ElementRef --> NativeElement["nativeElement.focus()"]
 * ```
 */

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-use-case-2-parent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>Use Case 2: &#64;ViewChild with Template References</h1>
        <p>Access and manipulate DOM elements using template reference variables.</p>
      </div>

      <div class="content-grid">
        <!-- LEFT: Parent Controls -->
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            <p class="sub-header">Control DOM elements using &#64;ViewChild!</p>

            <div class="control-section">
              <h3>Input Element Controls</h3>
              <div class="actions">
                <button (click)="focusInput()" class="btn btn-primary">
                  🎯 Focus Input
                </button>
                <button (click)="selectText()" class="btn btn-primary">
                  ✅ Select All Text
                </button>
                <button (click)="clearInput()" class="btn btn-primary">
                  🗑️ Clear Input
                </button>
                <button (click)="getInputInfo()" class="btn btn-accent">
                  📊 Get Input Info
                </button>
              </div>
            </div>

            <div class="control-section">
              <h3>Scroll Controls</h3>
              <div class="actions">
                <button (click)="scrollToBottom()" class="btn btn-primary">
                  ⬇️ Scroll to Bottom
                </button>
                <button (click)="scrollToTop()" class="btn btn-primary">
                  ⬆️ Scroll to Top
                </button>
              </div>
            </div>

            <div class="info-display" *ngIf="elementInfo">
              <h3>Element Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Value:</label>
                  <code>{{ elementInfo.value }}</code>
                </div>
                <div class="info-item">
                  <label>Width:</label>
                  <code>{{ elementInfo.width }}px</code>
                </div>
                <div class="info-item">
                  <label>Height:</label>
                  <code>{{ elementInfo.height }}px</code>
                </div>
                <div class="info-item">
                  <label>Is Focused:</label>
                  <code>{{ elementInfo.isFocused }}</code>
                </div>
              </div>
            </div>

            <div class="code-example">
              <h3>💻 Code Example</h3>
              <pre><code>// Template:
&lt;input #inputRef type="text"&gt;

// TypeScript:
&#64;ViewChild('inputRef')
inputElement!: ElementRef&lt;HTMLInputElement&gt;;

// Usage:
this.inputElement.nativeElement.focus();</code></pre>
            </div>
          </div>
        </div>

        <!-- RIGHT: Interactive Elements -->
        <div class="column">
          <div class="card child-card">
            <h2>🎨 Interactive Elements</h2>
            
            <!-- Input with template reference -->
            <div class="demo-section">
              <h3>Text Input</h3>
              <input 
                #inputRef
                type="text" 
                placeholder="Type something here..."
                class="demo-input"
                (focus)="onInputFocus()"
                (blur)="onInputBlur()">
              <p class="hint">Template ref: #inputRef</p>
            </div>

            <!-- Scrollable content with template reference -->
            <div class="demo-section">
              <h3>Scrollable Content</h3>
              <div #scrollContainer class="scroll-container">
                <p *ngFor="let item of scrollItems">{{ item }}</p>
              </div>
              <p class="hint">Template ref: #scrollContainer</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Explanation Section -->
      <div class="explanation-section card">
        <h2>📚 Understanding Template References</h2>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>1️⃣ Template Reference Variable</h4>
            <code>&lt;input #myInput&gt;</code>
            <p class="detail">The # creates a reference to the element in the template</p>
          </div>

          <div class="explanation-item">
            <h4>2️⃣ Accessing in TypeScript</h4>
            <code>&#64;ViewChild('myInput') input!: ElementRef;</code>
            <p class="detail">Use the string name to query the template reference</p>
          </div>

          <div class="explanation-item">
            <h4>3️⃣ ElementRef Wrapper</h4>
            <p>Angular wraps DOM elements in ElementRef for safety</p>
            <p class="detail">Access the real element via .nativeElement</p>
          </div>

          <div class="explanation-item">
            <h4>4️⃣ Type Safety</h4>
            <code>ElementRef&lt;HTMLInputElement&gt;</code>
            <p class="detail">Specify the element type for better autocompletion</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../input-output/components/use-case-1/parent.component.css';

    .demo-section {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-lg);
    }

    .demo-section h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .demo-input {
      width: 100%;
      padding: var(--spacing-md);
      background: var(--bg-primary);
      border: 2px solid var(--primary-color);
      color: var(--text-primary);
      border-radius: var(--radius-md);
      font-size: 1rem;
    }

    .demo-input:focus {
      outline: none;
      border-color: var(--accent-color);
      box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
    }

    .scroll-container {
      height: 200px;
      overflow-y: auto;
      background: var(--bg-primary);
      border: 2px solid var(--primary-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
    }

    .scroll-container p {
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);
      color: var(--text-secondary);
    }

    .hint {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: var(--spacing-sm);
      font-style: italic;
    }

    .info-display {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-top: var(--spacing-lg);
    }

    .info-display h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .info-grid {
      display: grid;
      gap: var(--spacing-sm);
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm);
      background: var(--bg-primary);
      border-radius: var(--radius-sm);
    }

    .info-item label {
      color: var(--text-secondary);
      font-weight: 600;
    }

    .info-item code {
      color: var(--accent-color);
    }

    .code-example {
      background: #1e293b;
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-top: var(--spacing-lg);
    }

    .code-example h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .code-example pre {
      margin: 0;
      overflow-x: auto;
    }

    .code-example code {
      color: #94a3b8;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .control-section {
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    }

    .control-section:last-of-type {
      border-bottom: none;
    }
  `]
})
export class UseCase2ParentComponent implements AfterViewInit {
  /**
   * @ViewChild WITH TEMPLATE REFERENCE
   * 
   * Query for an element with the template reference variable 'inputRef'
   * ElementRef<HTMLInputElement> provides type safety
   */
  @ViewChild('inputRef')
  inputElement!: ElementRef<HTMLInputElement>;

  /**
   * @ViewChild FOR SCROLLABLE CONTAINER
   * 
   * Query for the scrollable container element
   */
  @ViewChild('scrollContainer')
  scrollElement!: ElementRef<HTMLDivElement>;

  // Sample data for scrollable content
  scrollItems: string[] = Array.from({ length: 20 }, (_, i) =>
    `Scroll Item ${i + 1} - Lorem ipsum dolor sit amet`
  );

  // Element information to display
  elementInfo: any = null;

  ngAfterViewInit(): void {
    console.log('✅ Input element accessed:', this.inputElement);
    console.log('✅ Scroll element accessed:', this.scrollElement);
  }

  /**
   * Focus the input element
   */
  focusInput(): void {
    this.inputElement.nativeElement.focus();
    console.log('Input focused');
  }

  /**
   * Select all text in the input
   */
  selectText(): void {
    this.inputElement.nativeElement.select();
    console.log('Text selected');
  }

  /**
   * Clear the input value
   */
  clearInput(): void {
    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.focus();
    console.log('Input cleared');
  }

  /**
   * Get information about the input element
   */
  getInputInfo(): void {
    const el = this.inputElement.nativeElement;
    const rect = el.getBoundingClientRect();

    this.elementInfo = {
      value: el.value || '(empty)',
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      isFocused: document.activeElement === el
    };

    console.log('Input info:', this.elementInfo);
  }

  /**
   * Scroll to bottom of container
   */
  scrollToBottom(): void {
    const el = this.scrollElement.nativeElement;
    el.scrollTop = el.scrollHeight;
    console.log('Scrolled to bottom');
  }

  /**
   * Scroll to top of container
   */
  scrollToTop(): void {
    this.scrollElement.nativeElement.scrollTop = 0;
    console.log('Scrolled to top');
  }

  // Event handlers for visual feedback
  onInputFocus(): void {
    console.log('Input focused by user');
  }

  onInputBlur(): void {
    console.log('Input blurred');
  }
}
