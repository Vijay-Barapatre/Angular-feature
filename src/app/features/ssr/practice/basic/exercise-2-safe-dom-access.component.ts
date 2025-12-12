/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: SAFE DOM ACCESS
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn to use Renderer2 and DOCUMENT token for cross-platform DOM
 * manipulation that works on both server and browser.
 * 
 * 📝 DESCRIPTION:
 * You are building a theme switcher component that needs to add/remove
 * CSS classes from the document body. Direct DOM manipulation won't work
 * on the server, so you must use Angular's abstraction layers.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Theme toggle works on browser
 * 2. Graceful degradation on server (no errors)
 * 3. Classes applied using Renderer2
 * 4. Body element accessed via DOCUMENT token
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Inject Renderer2 and DOCUMENT
 * - Use Renderer2.addClass/removeClass
 * - Safely access document.body
 */

import { Component, OnInit, PLATFORM_ID, inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-exercise-safe-dom-access',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise-container">
            <h2>🎨 Exercise 2: Safe DOM Access</h2>
            
            <div class="objective-card">
                <h3>📋 Objective</h3>
                <p>
                    Use Renderer2 and DOCUMENT token to safely manipulate the DOM
                    in a way that works on both server and browser.
                </p>
            </div>

            <div class="task-section">
                <h3>🎯 Tasks</h3>
                <div class="task" [class.completed]="task1Complete">
                    <span class="checkbox">{{ task1Complete ? '✅' : '⬜' }}</span>
                    <span>Task 1: Inject Renderer2 and DOCUMENT</span>
                </div>
                <div class="task" [class.completed]="task2Complete">
                    <span class="checkbox">{{ task2Complete ? '✅' : '⬜' }}</span>
                    <span>Task 2: Toggle body class using Renderer2</span>
                </div>
                <div class="task" [class.completed]="task3Complete">
                    <span class="checkbox">{{ task3Complete ? '✅' : '⬜' }}</span>
                    <span>Task 3: Set document title using Renderer2</span>
                </div>
            </div>

            <div class="implementation-section">
                <h3>🔨 Your Implementation</h3>
                
                <div class="result-card">
                    <h4>Theme Toggle</h4>
                    <p>Current Theme: <code>{{ currentTheme }}</code></p>
                    <button (click)="toggleTheme()" class="theme-btn">
                        {{ currentTheme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light' }}
                    </button>
                    <small>Check if body has 'dark-theme' or 'light-theme' class</small>
                </div>

                <div class="result-card">
                    <h4>Dynamic Title</h4>
                    <input 
                        type="text" 
                        [value]="pageTitle"
                        (input)="onTitleChange($event)"
                        placeholder="Enter page title">
                    <button (click)="updateTitle()">Update Title</button>
                    <small>Check browser tab title changes</small>
                </div>

                <div class="result-card">
                    <h4>Element Style</h4>
                    <div #targetElement class="target-box">Target Element</div>
                    <button (click)="toggleHighlight()">
                        {{ isHighlighted ? 'Remove Highlight' : 'Add Highlight' }}
                    </button>
                </div>
            </div>

            <div class="hints-section">
                <h3>💡 Hints</h3>
                <details>
                    <summary>Hint 1: Injecting dependencies</summary>
                    <pre><code>private renderer = inject(Renderer2);
private document = inject(DOCUMENT);
private platformId = inject(PLATFORM_ID);</code></pre>
                </details>
                <details>
                    <summary>Hint 2: Using Renderer2.addClass</summary>
                    <pre><code>this.renderer.addClass(this.document.body, 'dark-theme');
this.renderer.removeClass(this.document.body, 'light-theme');</code></pre>
                </details>
                <details>
                    <summary>Hint 3: Checking platform before DOM access</summary>
                    <pre><code>if (isPlatformBrowser(this.platformId)) {{ '{' }}
    // Safe to access this.document.body
    this.renderer.addClass(this.document.body, 'my-class');
{{ '}' }}</code></pre>
                </details>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
        h2 { color: var(--text-primary, #1f2937); border-bottom: 2px solid #6366f1; padding-bottom: 0.5rem; }
        
        .objective-card { background: #ede9fe; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .objective-card h3 { margin: 0 0 0.5rem; color: #6d28d9; }
        .objective-card p { margin: 0; color: #4c1d95; }
        
        .task-section { margin-bottom: 1.5rem; }
        .task-section h3 { margin-bottom: 0.75rem; }
        .task { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--bg-secondary, #f8fafc); border-radius: 4px; margin-bottom: 0.25rem; }
        .task.completed { background: #d1fae5; }
        
        .implementation-section { margin-bottom: 1.5rem; }
        .result-card { background: var(--bg-secondary, #f8fafc); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border-color, #e2e8f0); }
        .result-card h4 { margin: 0 0 0.5rem; }
        .result-card code { background: #1e293b; color: #10b981; padding: 0.2rem 0.5rem; border-radius: 4px; }
        .result-card input { padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px; margin-right: 0.5rem; }
        .result-card button { padding: 0.5rem 1rem; background: #6366f1; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem; }
        .result-card small { display: block; margin-top: 0.5rem; color: var(--text-secondary, #64748b); }
        
        .theme-btn { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        
        .target-box { padding: 2rem; text-align: center; border: 2px dashed #e2e8f0; border-radius: 8px; margin-bottom: 0.75rem; transition: all 0.3s; }
        .target-box.highlighted { background: #fef3c7; border-color: #f59e0b; font-weight: bold; }
        
        .hints-section { background: #fef3c7; padding: 1rem; border-radius: 8px; border: 1px solid #f59e0b; }
        .hints-section h3 { margin: 0 0 0.75rem; color: #92400e; }
        details { margin-bottom: 0.5rem; }
        summary { cursor: pointer; padding: 0.5rem; background: white; border-radius: 4px; }
        details pre { margin: 0.5rem 0 0; padding: 0.75rem; background: #1e293b; border-radius: 4px; overflow-x: auto; }
        details code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ExerciseSafeDomAccessComponent implements OnInit {
    // TODO: Inject these dependencies
    // private renderer = inject(Renderer2);
    // private document = inject(DOCUMENT);
    // private platformId = inject(PLATFORM_ID);

    currentTheme = 'light';
    pageTitle = 'SSR Practice';
    isHighlighted = false;

    task1Complete = false;
    task2Complete = false;
    task3Complete = false;

    ngOnInit(): void {
        // TODO: Check if injections are done
        this.checkTasks();
    }

    /**
     * TODO: Implement this method
     * 
     * Toggle between 'light-theme' and 'dark-theme' classes on document.body
     * using Renderer2.addClass and Renderer2.removeClass
     */
    toggleTheme(): void {
        // TODO: Implement theme toggle
        // 1. Check platform
        // 2. Remove current theme class
        // 3. Add new theme class
        // 4. Update currentTheme property

        console.log('toggleTheme not implemented');
    }

    onTitleChange(event: Event): void {
        this.pageTitle = (event.target as HTMLInputElement).value;
    }

    /**
     * TODO: Implement this method
     * 
     * Update the document title using this.document.title
     * Guard with platform check
     */
    updateTitle(): void {
        // TODO: Implement title update
        // HINT: this.document.title = this.pageTitle;

        console.log('updateTitle not implemented');
    }

    /**
     * TODO: Implement this method
     * 
     * Toggle 'highlighted' class on the target element using Renderer2
     */
    toggleHighlight(): void {
        // TODO: Implement using Renderer2
        // Note: You'll need @ViewChild to reference the element
        // Or use querySelector (with platform guard!)

        this.isHighlighted = !this.isHighlighted;
        console.log('toggleHighlight not fully implemented');
    }

    private checkTasks(): void {
        // Tasks would be validated based on actual implementation
        this.task1Complete = false; // Will be true when dependencies injected
        this.task2Complete = false;
        this.task3Complete = false;
    }
}
