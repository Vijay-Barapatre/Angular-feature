import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-destructuring',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>📤 Destructuring</h2>
            <p class="subtitle">Extract values from objects and arrays into distinct variables</p>
            
            <!-- Demo 1: Object Destructuring -->
            <section class="demo-section">
                <h3>1️⃣ Object Destructuring</h3>
                <div class="demo-area">
                    <pre><code>const user = &#123; name: 'John', age: 30, email: 'john&#64;test.com' &#125;;

// Basic destructuring
const &#123; name, age &#125; = user;

// With alias
const &#123; name: userName &#125; = user;

// Default values
const &#123; role = 'user' &#125; = user;

// Nested destructuring
const &#123; address: &#123; city &#125; &#125; = userData;</code></pre>
                    <div class="result">
                        <p>name: <strong>{{ demoUser.name }}</strong></p>
                        <p>age: <strong>{{ demoUser.age }}</strong></p>
                    </div>
                </div>
            </section>

            <!-- Demo 2: Array Destructuring -->
            <section class="demo-section">
                <h3>2️⃣ Array Destructuring</h3>
                <div class="demo-area">
                    <pre><code>const colors = ['red', 'green', 'blue'];

// Basic
const [first, second] = colors;

// Skip elements
const [, , third] = colors;

// Rest pattern
const [head, ...tail] = colors;

// Swap variables
[a, b] = [b, a];</code></pre>
                    <div class="result">
                        <p>First color: <strong>{{ colors[0] }}</strong></p>
                        <p>Remaining: <strong>{{ colors.slice(1) | json }}</strong></p>
                    </div>
                </div>
            </section>

            <!-- Demo 3: Function Parameters -->
            <section class="demo-section">
                <h3>3️⃣ Destructuring in Function Parameters</h3>
                <div class="demo-area">
                    <pre><code>// Instead of this:
function greet(user) &#123;
    return 'Hello ' + user.name;
&#125;

// Do this:
function greet(&#123; name, age &#125;: User) &#123;
    return \`Hello \$&#123;name&#125;, you are \$&#123;age&#125;\`;
&#125;

// Angular component input
&#64;Input() set user(&#123; name, email &#125;: User) &#123;
    this.displayName = name;
    this.userEmail = email;
&#125;</code></pre>
                </div>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Usage in Angular</h3>
                <pre><code>// NgRx reducer with destructuring
on(updateUser, (state, &#123; userId, changes &#125;) => &#123;
    return &#123; ...state, [userId]: changes &#125;;
&#125;);

// HTTP response destructuring
this.http.get('/api/data').subscribe((&#123; users, total &#125;) => &#123;
    this.users = users;
    this.totalCount = total;
&#125;);

// Route params
this.route.params.subscribe((&#123; id &#125;) => &#123;
    this.loadUser(id);
&#125;);</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h2 { color: #f7df1e; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .demo-section { background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        pre { background: #0d1117; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0; }
        code { color: #a6e3a1; font-size: 0.9rem; }
        .result { background: #0d1117; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .result p { color: #e2e8f0; margin: 0.5rem 0; }
        .result strong { color: #22c55e; }
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class DestructuringComponent {
    demoUser = { name: 'John', age: 30, email: 'john@test.com' };
    colors = ['red', 'green', 'blue'];
}
