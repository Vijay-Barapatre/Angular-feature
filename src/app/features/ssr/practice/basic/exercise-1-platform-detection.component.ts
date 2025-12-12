/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: PLATFORM DETECTION
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to detect whether code is running on the server or browser
 * and safely guard browser-only API calls.
 * 
 * 📝 DESCRIPTION:
 * You are building a component that needs to access browser APIs like
 * window.innerWidth, localStorage, and navigator. These don't exist on
 * the server and will crash your SSR app if accessed directly.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Component works on both server and browser without errors
 * 2. Browser APIs return actual values on client
 * 3. Server renders placeholder/fallback values
 * 4. Platform indicator shows correct environment
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Inject PLATFORM_ID correctly
 * - Use isPlatformBrowser() to guard browser code
 * - Implement getWindowWidth() safely
 * - Implement getLocalStorageItem() with fallback
 */

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-platform-detection',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <h2>🔍 Exercise 1: Platform Detection</h2>
            
            <div class="objective-card">
                <h3>📋 Objective</h3>
                <p>
                    Implement safe platform detection to access browser APIs
                    without crashing on the server.
                </p>
            </div>

            <div class="task-section">
                <h3>🎯 Tasks</h3>
                <div class="task" [class.completed]="task1Complete">
                    <span class="checkbox">{{ task1Complete ? '✅' : '⬜' }}</span>
                    <span>Task 1: Detect and display current platform</span>
                </div>
                <div class="task" [class.completed]="task2Complete">
                    <span class="checkbox">{{ task2Complete ? '✅' : '⬜' }}</span>
                    <span>Task 2: Safely get window width</span>
                </div>
                <div class="task" [class.completed]="task3Complete">
                    <span class="checkbox">{{ task3Complete ? '✅' : '⬜' }}</span>
                    <span>Task 3: Safely access localStorage</span>
                </div>
            </div>

            <div class="implementation-section">
                <h3>🔨 Your Implementation</h3>
                
                <div class="result-card">
                    <h4>Platform Detection</h4>
                    <p>Current Platform: <code>{{ getPlatform() }}</code></p>
                    <p>Is Browser: <code>{{ isBrowser }}</code></p>
                </div>

                <div class="result-card">
                    <h4>Window Width</h4>
                    <p>Width: <code>{{ getWindowWidth() }}</code></p>
                    <small>Should return actual width on browser, fallback on server</small>
                </div>

                <div class="result-card">
                    <h4>LocalStorage Access</h4>
                    <input 
                        type="text" 
                        [(ngModel)]="testValue"
                        placeholder="Enter a value to store">
                    <button (click)="saveToStorage()">Save</button>
                    <button (click)="loadFromStorage()">Load</button>
                    <p>Stored Value: <code>{{ storedValue }}</code></p>
                </div>
            </div>

            <div class="hints-section">
                <h3>💡 Hints</h3>
                <details>
                    <summary>Hint 1: Injecting PLATFORM_ID</summary>
                    <pre><code>private platformId = inject(PLATFORM_ID);</code></pre>
                </details>
                <details>
                    <summary>Hint 2: Using isPlatformBrowser</summary>
                    <pre><code>if (isPlatformBrowser(this.platformId)) {{ '{' }}
    // Safe to use window, document, etc.
{{ '}' }}</code></pre>
                </details>
                <details>
                    <summary>Hint 3: Providing fallback values</summary>
                    <pre><code>getWindowWidth(): string {{ '{' }}
    if (isPlatformBrowser(this.platformId)) {{ '{' }}
        return window.innerWidth + 'px';
    {{ '}' }}
    return 'N/A (Server)';
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
        .checkbox { font-size: 1.25rem; }
        
        .implementation-section { margin-bottom: 1.5rem; }
        .result-card { background: var(--bg-secondary, #f8fafc); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border-color, #e2e8f0); }
        .result-card h4 { margin: 0 0 0.5rem; color: var(--text-primary, #1f2937); }
        .result-card p { margin: 0.25rem 0; }
        .result-card code { background: #1e293b; color: #10b981; padding: 0.2rem 0.5rem; border-radius: 4px; }
        .result-card input { padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px; margin-right: 0.5rem; }
        .result-card button { padding: 0.5rem 1rem; background: #6366f1; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem; }
        .result-card small { display: block; margin-top: 0.5rem; color: var(--text-secondary, #64748b); }
        
        .hints-section { background: #fef3c7; padding: 1rem; border-radius: 8px; border: 1px solid #f59e0b; }
        .hints-section h3 { margin: 0 0 0.75rem; color: #92400e; }
        details { margin-bottom: 0.5rem; }
        summary { cursor: pointer; padding: 0.5rem; background: white; border-radius: 4px; }
        details pre { margin: 0.5rem 0 0; padding: 0.75rem; background: #1e293b; border-radius: 4px; overflow-x: auto; }
        details code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ExercisePlatformDetectionComponent implements OnInit {
    // TODO: Inject PLATFORM_ID here
    // private platformId = inject(PLATFORM_ID);

    isBrowser = false;
    testValue = '';
    storedValue = '';

    task1Complete = false;
    task2Complete = false;
    task3Complete = false;

    ngOnInit(): void {
        // TODO: Set isBrowser using isPlatformBrowser()
        // this.isBrowser = isPlatformBrowser(this.platformId);

        this.checkTasks();
    }

    /**
     * TODO: Implement this method
     * 
     * Return 'Browser' if running on browser, 'Server' if on server
     */
    getPlatform(): string {
        // TODO: Implement platform detection
        // HINT: Use isPlatformBrowser(this.platformId)

        return 'Not implemented'; // Replace this
    }

    /**
     * TODO: Implement this method
     * 
     * Return the window width (e.g., "1920px") if on browser
     * Return "N/A (Server)" if on server
     */
    getWindowWidth(): string {
        // TODO: Implement safe window.innerWidth access
        // HINT: Guard with isPlatformBrowser() check

        return 'Not implemented'; // Replace this
    }

    /**
     * TODO: Implement this method
     * 
     * Save testValue to localStorage if on browser
     * Log warning if on server
     */
    saveToStorage(): void {
        // TODO: Implement safe localStorage.setItem()
        // HINT: Guard with isPlatformBrowser() check

        console.log('saveToStorage not implemented');
    }

    /**
     * TODO: Implement this method
     * 
     * Load value from localStorage if on browser
     * Set storedValue to result or 'N/A' if on server
     */
    loadFromStorage(): void {
        // TODO: Implement safe localStorage.getItem()
        // HINT: Guard with isPlatformBrowser() check

        console.log('loadFromStorage not implemented');
    }

    private checkTasks(): void {
        this.task1Complete = this.getPlatform() !== 'Not implemented';
        this.task2Complete = this.getWindowWidth() !== 'Not implemented';
        // Task 3 is checked when storage operations work
    }
}
