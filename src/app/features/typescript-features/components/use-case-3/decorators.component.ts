import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-decorators',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🎀 Use Case 3: Decorators</h2>
            <p class="subtitle">Understand how Angular's &#64;Component, &#64;Injectable, &#64;Input work</p>
            
            <!-- Demo 1: What are Decorators -->
            <section class="demo-section">
                <h3>1️⃣ What Are Decorators?</h3>
                <pre><code>// Decorators are functions that modify classes/properties
// Syntax: &#64;decoratorName or &#64;decoratorName()

&#64;Component(&#123;
    selector: 'app-hello',
    template: '&lt;h1&gt;Hello&lt;/h1&gt;'
&#125;)
export class HelloComponent &#123;&#125;

// The &#64;Component decorator adds metadata that Angular uses
// to understand how to instantiate and render this class</code></pre>
            </section>

            <!-- Demo 2: Angular Decorators -->
            <section class="demo-section">
                <h3>2️⃣ Common Angular Decorators</h3>
                <div class="decorator-grid">
                    <div class="decorator-card">
                        <h4>&#64;Component</h4>
                        <code>Defines a component with template, styles, selector</code>
                    </div>
                    <div class="decorator-card">
                        <h4>&#64;Injectable</h4>
                        <code>Marks a class as available for DI</code>
                    </div>
                    <div class="decorator-card">
                        <h4>&#64;Input()</h4>
                        <code>Binds property to parent component data</code>
                    </div>
                    <div class="decorator-card">
                        <h4>&#64;Output()</h4>
                        <code>Emits events to parent component</code>
                    </div>
                    <div class="decorator-card">
                        <h4>&#64;ViewChild</h4>
                        <code>Gets reference to child element/component</code>
                    </div>
                    <div class="decorator-card">
                        <h4>&#64;HostListener</h4>
                        <code>Listens to host element events</code>
                    </div>
                </div>
            </section>

            <!-- Demo 3: Custom Decorator -->
            <section class="demo-section">
                <h3>3️⃣ How Decorators Work (Under the Hood)</h3>
                <pre><code>// A decorator is just a function!
function Log(target: any, propertyKey: string) &#123;
    console.log(\`Property \$&#123;propertyKey&#125; accessed\`);
&#125;

class Example &#123;
    &#64;Log
    name: string = 'test';
&#125;

// Custom class decorator
function Sealed(constructor: Function) &#123;
    Object.seal(constructor);
    Object.seal(constructor.prototype);
&#125;

&#64;Sealed
class BankAccount &#123;
    balance = 0;
&#125;</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Decorators Power Angular</h3>
                <pre><code>// Without decorators, you'd have to do this manually:
const metadata = &#123;
    selector: 'app-user',
    template: '...',
    styles: ['...']
&#125;;
Component(metadata)(UserComponent);

// Decorators make it declarative:
&#64;Component(&#123;
    selector: 'app-user',
    template: '...',
    styles: ['...']
&#125;)
export class UserComponent &#123;&#125;</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h2 { color: #3178c6; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .demo-section { background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        pre { background: #0d1117; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0; }
        code { color: #a6e3a1; font-size: 0.85rem; }
        .decorator-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .decorator-card { background: #0d1117; padding: 1rem; border-radius: 8px; text-align: center; }
        .decorator-card h4 { color: #3178c6; margin: 0 0 0.5rem; }
        .decorator-card code { font-size: 0.75rem; color: #94a3b8; }
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class DecoratorsComponent { }
