import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-generics',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🧬 Use Case 2: Generics</h2>
            <p class="subtitle">Create reusable, type-safe components and functions</p>
            
            <!-- Demo 1: Basic Generics -->
            <section class="demo-section">
                <h3>1️⃣ Generic Functions</h3>
                <pre><code>// Without generics - loses type info
function first(arr: any[]): any &#123;
    return arr[0];
&#125;

// With generics - preserves type! ✅
function first&lt;T&gt;(arr: T[]): T &#123;
    return arr[0];
&#125;

const num = first([1, 2, 3]);      // TypeScript knows: number
const str = first(['a', 'b']);     // TypeScript knows: string</code></pre>
            </section>

            <!-- Demo 2: Generic Interfaces -->
            <section class="demo-section">
                <h3>2️⃣ Generic Interfaces (API Pattern)</h3>
                <pre><code>// Reusable API response wrapper
interface ApiResponse&lt;T&gt; &#123;
    data: T;
    status: number;
    timestamp: Date;
&#125;

// Usage with different types
type UserResponse = ApiResponse&lt;User&gt;;
type ProductResponse = ApiResponse&lt;Product[]&gt;;

// Function returning typed response
async function fetchData&lt;T&gt;(url: string): Promise&lt;ApiResponse&lt;T&gt;&gt; &#123;
    const res = await fetch(url);
    return res.json();
&#125;</code></pre>
            </section>

            <!-- Demo 3: Constraints -->
            <section class="demo-section">
                <h3>3️⃣ Generic Constraints</h3>
                <pre><code>// Constraint: T must have 'id' property
interface HasId &#123;
    id: number;
&#125;

function findById&lt;T extends HasId&gt;(items: T[], id: number): T | undefined &#123;
    return items.find(item => item.id === id);
&#125;

// Works with any type that has 'id'
findById(users, 1);      // ✅ User has id
findById(products, 5);   // ✅ Product has id
findById(['a', 'b'], 1); // ❌ Error: string doesn't have id</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Generics in Angular</h3>
                <pre><code>// Generic Service
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class CrudService&lt;T extends &#123; id: number &#125;&gt; &#123;
    getAll(): Observable&lt;T[]&gt; &#123; ... &#125;
    getById(id: number): Observable&lt;T&gt; &#123; ... &#125;
    create(item: Omit&lt;T, 'id'&gt;): Observable&lt;T&gt; &#123; ... &#125;
&#125;

// Usage
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService extends CrudService&lt;User&gt; &#123;&#125;

// Generic Component Input
&#64;Input() items!: T[];
&#64;Output() selected = new EventEmitter&lt;T&gt;();</code></pre>
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
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class GenericsComponent { }
