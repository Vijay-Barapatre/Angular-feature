import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-arrow-functions',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>➡️ Use Case 4: Arrow Functions</h2>
            <p class="subtitle">Concise function syntax with lexical 'this' binding</p>
            
            <!-- Demo 1: Syntax Comparison -->
            <section class="demo-section">
                <h3>1️⃣ Syntax Comparison</h3>
                <div class="comparison">
                    <div class="old-syntax">
                        <h4>Traditional Function</h4>
                        <pre><code>function add(a, b) &#123;
    return a + b;
&#125;

const greet = function(name) &#123;
    return 'Hello ' + name;
&#125;;</code></pre>
                    </div>
                    <div class="new-syntax">
                        <h4>Arrow Function ✅</h4>
                        <pre><code>const add = (a, b) => a + b;

const greet = name => \`Hello \$&#123;name&#125;\`;

const complex = (x) => &#123;
    const result = x * 2;
    return result;
&#125;;</code></pre>
                    </div>
                </div>
            </section>

            <!-- Demo 2: Lexical 'this' -->
            <section class="demo-section">
                <h3>2️⃣ Lexical 'this' (Critical Difference!)</h3>
                <div class="demo-area">
                    <pre><code>class Counter &#123;
    count = 0;
    
    // ❌ Traditional function loses 'this'
    incrementBad() &#123;
        setTimeout(function() &#123;
            this.count++;  // ERROR: 'this' is undefined
        &#125;, 1000);
    &#125;
    
    // ✅ Arrow function preserves 'this'
    incrementGood() &#123;
        setTimeout(() => &#123;
            this.count++;  // Works! 'this' refers to Counter
        &#125;, 1000);
    &#125;
&#125;</code></pre>
                    <div class="result">
                        <p>Count: <strong>{{ count() }}</strong></p>
                        <button class="btn" (click)="incrementWithArrow()">Increment (Arrow)</button>
                    </div>
                </div>
            </section>

            <!-- Demo 3: Common Patterns -->
            <section class="demo-section">
                <h3>3️⃣ Common Patterns in Angular</h3>
                <pre><code>// Array methods
users.filter(u => u.active);
items.map(i => i.price * i.quantity);

// RxJS operators
this.http.get('/users').pipe(
    map(response => response.data),
    filter(users => users.length > 0),
    catchError(err => of([]))
);

// Event handlers
&#64;HostListener('click', ['$event'])
onClick = (event: Event) => &#123;
    // 'this' works correctly here
&#125;;</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Best Practices in Angular</h3>
                <pre><code>// ✅ Use arrow for callbacks
this.service.getData().subscribe(data => this.data = data);

// ✅ Use arrow for array operations
this.items = this.items.filter(item => item.id !== id);

// ⚠️ Component methods - regular functions fine
export class MyComponent &#123;
    // Both work for component methods
    handleClick() &#123; ... &#125;
    handleKeyDown = (e: KeyboardEvent) => &#123; ... &#125;;
&#125;</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h2 { color: #f7df1e; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .demo-section { background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .old-syntax, .new-syntax { background: #0d1117; padding: 1rem; border-radius: 8px; }
        .old-syntax { border-left: 3px solid #ef4444; }
        .new-syntax { border-left: 3px solid #22c55e; }
        h4 { color: #f8fafc; margin: 0 0 0.75rem; }
        pre { background: transparent; margin: 0; padding: 0; overflow-x: auto; }
        code { color: #a6e3a1; font-size: 0.85rem; }
        .result { background: #0d1117; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .result p { color: #e2e8f0; margin: 0 0 0.5rem; }
        .result strong { color: #22c55e; font-size: 1.5rem; }
        .btn { background: #f7df1e; color: #000; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class ArrowFunctionsComponent {
    count = signal(0);

    incrementWithArrow() {
        // Arrow function preserves 'this'
        setTimeout(() => {
            this.count.update(c => c + 1);
        }, 100);
    }
}
