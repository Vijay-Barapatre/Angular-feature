/**
 * USE CASE 3: EFFECTS
 * 
 * Demonstrates side effects with effect():
 * - Runs when dependent signals change
 * - Automatic cleanup on component destroy
 * - untracked() to exclude deps
 */

import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-use-case-3-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>⚡ Use Case 3: Effects</h1>
                <p>Run side effects when signal values change</p>
            </header>

            <section class="demo-section">
                <h2>📝 Interactive Demo: Auto-Save Document</h2>
                
                <div class="editor-container">
                    <div class="editor-panel">
                        <label>Document Title:</label>
                        <input 
                            type="text" 
                            [value]="title()" 
                            (input)="title.set($any($event.target).value)"
                            class="input-field"
                        />
                        
                        <label>Content:</label>
                        <textarea 
                            [value]="content()" 
                            (input)="content.set($any($event.target).value)"
                            rows="6"
                            class="textarea-field"
                        ></textarea>
                        
                        <p class="char-count">
                            {{ charCount() }} characters
                        </p>
                    </div>

                    <div class="status-panel">
                        <h3>📊 Effect Log</h3>
                        <div class="log-container">
                            @for (entry of saveLog(); track entry.id) {
                                <div class="log-entry">
                                    <span class="log-time">{{ entry.time }}</span>
                                    <span class="log-msg">{{ entry.message }}</span>
                                </div>
                            }
                        </div>
                        <p class="effect-note">
                            💡 The effect() automatically runs when title or content changes!
                        </p>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Key Code Patterns</h2>
                
                <div class="code-block">
                    <div class="code-header">Creating an Effect</div>
                    <pre><code>title = signal('Untitled');
content = signal('');

constructor() &#123;
    // Effect runs when ANY accessed signal changes
    effect(() => &#123;
        const t = this.title();
        const c = this.content();
        console.log('Auto-saving:', t);
        // Perform side effect (save to server, etc.)
    &#125;);
&#125;</code></pre>
                </div>

                <div class="code-block">
                    <div class="code-header">Cleanup in Effects</div>
                    <pre><code>effect((onCleanup) => &#123;
    const timer = setInterval(() => &#123;...&#125;, 1000);
    
    // Called before next execution or destroy
    onCleanup(() => clearInterval(timer));
&#125;);</code></pre>
                </div>
            </section>

            <section class="key-points">
                <h2>🎯 Key Points</h2>
                <ul>
                    <li><strong>effect(fn)</strong> - Runs when any accessed signal changes</li>
                    <li><strong>Auto-tracking</strong> - Dependencies detected from signal reads</li>
                    <li><strong>onCleanup</strong> - For resource cleanup between runs</li>
                    <li><strong>untracked()</strong> - Read a signal without tracking</li>
                    <li>Effects cannot contain signal writes (use allowSignalWrites if needed)</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }

        .demo-header { margin-bottom: 2rem; }

        .back-link {
            color: var(--primary-light);
            text-decoration: none;
        }

        h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        h2, h3 { color: var(--primary-light); }

        .editor-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .editor-panel, .status-panel {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        label {
            display: block;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
            margin-top: 1rem;
        }

        .input-field, .textarea-field {
            width: 100%;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid rgba(102, 126, 234, 0.3);
            background: var(--bg-secondary);
            color: var(--text-primary);
            font-family: inherit;
        }

        .textarea-field { resize: vertical; }

        .char-count {
            color: var(--text-secondary);
            font-size: 0.85rem;
        }

        .log-container {
            max-height: 200px;
            overflow-y: auto;
            background: var(--bg-secondary);
            border-radius: 8px;
            padding: 0.5rem;
        }

        .log-entry {
            padding: 0.5rem;
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
            font-size: 0.85rem;
        }

        .log-time {
            color: var(--accent-color);
            margin-right: 0.5rem;
        }

        .log-msg { color: var(--text-secondary); }

        .effect-note {
            margin-top: 1rem;
            padding: 0.75rem;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 8px;
            font-size: 0.85rem;
            color: var(--primary-light);
        }

        .code-section, .key-points { margin-top: 2rem; }

        .code-block {
            background: #1e293b;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .code-header {
            background: rgba(102, 126, 234, 0.2);
            padding: 0.5rem 1rem;
            color: var(--primary-light);
            font-weight: 600;
        }

        .code-block pre { padding: 1rem; margin: 0; overflow-x: auto; }
        .code-block code { color: #94a3b8; font-family: 'Fira Code', monospace; }

        .key-points ul { list-style: none; padding: 0; }
        .key-points li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: var(--text-secondary);
        }
        .key-points li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-color);
        }
    `]
})
export class UseCase3DemoComponent {
    title = signal('My Document');
    content = signal('Start typing here...');

    saveLog = signal<{ id: number; time: string; message: string }[]>([]);

    charCount = computed(() => this.content().length);

    private logId = 0;

    constructor() {
        // ⚡ Effect runs whenever title or content changes
        effect(() => {
            const t = this.title();
            const c = this.content();

            // Side effect: Log the "save" action
            const entry = {
                id: this.logId++,
                time: new Date().toLocaleTimeString(),
                message: `Saved "${t}" (${c.length} chars)`
            };

            // Note: Using update with allowSignalWrites would be needed
            // For demo, we'll push to the log
            this.saveLog.update(log => [...log.slice(-9), entry]);
        }, { allowSignalWrites: true });
    }
}
