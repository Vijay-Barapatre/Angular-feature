import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-variables-datatypes',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>📦 Variables & Data Types</h2>
            <p class="subtitle">Understanding var, let, const, primitives, and objects in JavaScript</p>
            
            <!-- Demo 1: Variable Declarations -->
            <section class="demo-section">
                <h3>1️⃣ Variable Declarations: var vs let vs const</h3>
                <div class="demo-area">
                    <div class="comparison-grid">
                        <div class="comparison-card var">
                            <h4>var (Legacy)</h4>
                            <code>var name = "John";</code>
                            <ul>
                                <li>❌ Function-scoped</li>
                                <li>❌ Can be redeclared</li>
                                <li>❌ Hoisted (undefined)</li>
                            </ul>
                        </div>
                        <div class="comparison-card let">
                            <h4>let (Modern)</h4>
                            <code>let age = 25;</code>
                            <ul>
                                <li>✅ Block-scoped</li>
                                <li>✅ Cannot redeclare</li>
                                <li>✅ Can reassign</li>
                            </ul>
                        </div>
                        <div class="comparison-card const">
                            <h4>const (Preferred)</h4>
                            <code>const PI = 3.14;</code>
                            <ul>
                                <li>✅ Block-scoped</li>
                                <li>✅ Cannot redeclare</li>
                                <li>✅ Cannot reassign</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Demo 2: Primitive Data Types -->
            <section class="demo-section">
                <h3>2️⃣ Primitive Data Types (7 Types)</h3>
                <div class="demo-area">
                    <div class="type-grid">
                        <div class="type-card" *ngFor="let type of primitiveTypes">
                            <span class="type-icon">{{ type.icon }}</span>
                            <strong>{{ type.name }}</strong>
                            <code>{{ type.example }}</code>
                            <span class="type-info">{{ type.info }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Demo 3: Reference Types -->
            <section class="demo-section">
                <h3>3️⃣ Reference Types (Objects)</h3>
                <div class="demo-area">
                    <div class="type-grid">
                        <div class="type-card ref" *ngFor="let type of referenceTypes">
                            <span class="type-icon">{{ type.icon }}</span>
                            <strong>{{ type.name }}</strong>
                            <code>{{ type.example }}</code>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Demo 4: Type Coercion -->
            <section class="demo-section">
                <h3>4️⃣ Type Coercion (== vs ===)</h3>
                <div class="demo-area">
                    <div class="coercion-demo">
                        <div class="coercion-example bad">
                            <h4>== (Loose Equality) ❌</h4>
                            <code>"5" == 5  // true</code>
                            <code>0 == false  // true</code>
                            <code>null == undefined  // true</code>
                        </div>
                        <div class="coercion-example good">
                            <h4>=== (Strict Equality) ✅</h4>
                            <code>"5" === 5  // false</code>
                            <code>0 === false  // false</code>
                            <code>null === undefined  // false</code>
                        </div>
                    </div>
                    <p class="tip">💡 Always use === in Angular for predictable comparisons!</p>
                </div>
            </section>

            <!-- Demo 5: typeof Operator -->
            <section class="demo-section">
                <h3>5️⃣ typeof Operator</h3>
                <div class="demo-area">
                    <div class="typeof-grid">
                        <div class="typeof-item" *ngFor="let item of typeofExamples">
                            <code>typeof {{ item.value }}</code>
                            <span class="result">→ "{{ item.result }}"</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Usage in Angular</h3>
                <div class="angular-examples">
                    <div class="example">
                        <h4>Component Properties</h4>
                        <pre><code>export class MyComponent &#123;
  // Use const for unchanging values (as readonly)
  readonly API_URL = 'https://api.example.com';
  
  // Use let behavior with signals
  count = signal(0);
  
  // Regular properties
  userName: string = 'John';
  isActive: boolean = true;
&#125;</code></pre>
                    </div>
                    <div class="example">
                        <h4>Template Type Checking</h4>
                        <pre><code>&lt;!-- Angular checks types at compile time --&gt;
&lt;div *ngIf="user"&gt;
  &lt;!-- TypeScript ensures 'name' exists --&gt;
  user.name displayed here
&lt;/div&gt;</code></pre>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }
        h2 { color: #f7df1e; margin-bottom: 0.5rem; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        
        .demo-section {
            background: #1e293b;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        .comparison-card {
            padding: 1rem;
            border-radius: 8px;
            background: #0d1117;
        }
        .comparison-card.var { border-left: 4px solid #ef4444; }
        .comparison-card.let { border-left: 4px solid #3b82f6; }
        .comparison-card.const { border-left: 4px solid #22c55e; }
        .comparison-card h4 { margin: 0 0 0.5rem; color: #f8fafc; }
        .comparison-card code {
            display: block;
            background: #1e293b;
            padding: 0.5rem;
            border-radius: 4px;
            color: #a6e3a1;
            margin-bottom: 0.75rem;
        }
        .comparison-card ul { margin: 0; padding-left: 1rem; }
        .comparison-card li { color: #94a3b8; font-size: 0.85rem; padding: 0.2rem 0; }
        
        .type-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
        }
        .type-card {
            background: #0d1117;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #333;
        }
        .type-card.ref { border-color: #a855f7; }
        .type-icon { display: block; font-size: 1.5rem; margin-bottom: 0.5rem; }
        .type-card strong { display: block; color: #f8fafc; margin-bottom: 0.25rem; }
        .type-card code { 
            display: block; 
            color: #a6e3a1; 
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
        }
        .type-info { font-size: 0.75rem; color: #64748b; }
        
        .coercion-demo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .coercion-example {
            padding: 1rem;
            border-radius: 8px;
        }
        .coercion-example.bad { background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; }
        .coercion-example.good { background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; }
        .coercion-example h4 { margin: 0 0 0.75rem; color: #f8fafc; }
        .coercion-example code { display: block; color: #a6e3a1; padding: 0.25rem 0; }
        
        .tip {
            background: rgba(247, 223, 30, 0.1);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            color: #f7df1e;
            margin-top: 1rem;
        }
        
        .typeof-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
        }
        .typeof-item {
            background: #0d1117;
            padding: 0.75rem;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .typeof-item code { color: #a6e3a1; }
        .typeof-item .result { color: #f7df1e; }
        
        .angular-section {
            background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1));
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(221, 0, 49, 0.3);
        }
        .angular-section h3 { color: #dd0031; }
        .angular-examples {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .example h4 { color: #f8fafc; margin: 0 0 0.5rem; }
        .example pre {
            background: #0d1117;
            padding: 1rem;
            border-radius: 8px;
            margin: 0;
            overflow-x: auto;
        }
        .example code { color: #a6e3a1; font-size: 0.85rem; }
        
        @media (max-width: 768px) {
            .comparison-grid, .coercion-demo, .angular-examples {
                grid-template-columns: 1fr;
            }
        }
    `]
})
export class VariablesDataTypesComponent {
    primitiveTypes = [
        { icon: '📝', name: 'string', example: '"Hello"', info: 'Text data' },
        { icon: '🔢', name: 'number', example: '42, 3.14', info: 'All numbers' },
        { icon: '✅', name: 'boolean', example: 'true/false', info: 'Logic' },
        { icon: '❓', name: 'undefined', example: 'undefined', info: 'Not assigned' },
        { icon: '🚫', name: 'null', example: 'null', info: 'Intentionally empty' },
        { icon: '🆔', name: 'symbol', example: 'Symbol()', info: 'Unique identifier' },
        { icon: '🔢', name: 'bigint', example: '9007199254740991n', info: 'Large integers' }
    ];

    referenceTypes = [
        { icon: '📦', name: 'Object', example: '{ key: value }' },
        { icon: '📋', name: 'Array', example: '[1, 2, 3]' },
        { icon: '⚡', name: 'Function', example: '() => {}' },
        { icon: '📅', name: 'Date', example: 'new Date()' },
        { icon: '🔍', name: 'RegExp', example: '/pattern/' },
        { icon: '🗺️', name: 'Map/Set', example: 'new Map()' }
    ];

    typeofExamples = [
        { value: '"hello"', result: 'string' },
        { value: '42', result: 'number' },
        { value: 'true', result: 'boolean' },
        { value: 'undefined', result: 'undefined' },
        { value: 'null', result: 'object' },
        { value: '[]', result: 'object' },
        { value: '{}', result: 'object' },
        { value: '() => {}', result: 'function' }
    ];
}
