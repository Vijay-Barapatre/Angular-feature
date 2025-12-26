import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-utility-types',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🧰 Use Case 6: Utility Types</h2>
            <p class="subtitle">Built-in TypeScript helpers for common type transformations</p>
            
            <!-- Demo Grid -->
            <section class="demo-section">
                <h3>1️⃣ Partial&lt;T&gt; - Make All Properties Optional</h3>
                <pre><code>interface User &#123;
    id: number;
    name: string;
    email: string;
&#125;

// All properties become optional
type PartialUser = Partial&lt;User&gt;;
// &#123; id?: number; name?: string; email?: string; &#125;

// Perfect for update operations!
function updateUser(id: number, updates: Partial&lt;User&gt;) &#123;
    // Can pass &#123; name: 'New Name' &#125; without other fields
&#125;</code></pre>
            </section>

            <section class="demo-section">
                <h3>2️⃣ Required&lt;T&gt; - Make All Properties Required</h3>
                <pre><code>interface Config &#123;
    host?: string;
    port?: number;
&#125;

type RequiredConfig = Required&lt;Config&gt;;
// &#123; host: string; port: number; &#125; - no longer optional!</code></pre>
            </section>

            <section class="demo-section">
                <h3>3️⃣ Pick&lt;T, K&gt; - Select Specific Properties</h3>
                <pre><code>interface User &#123;
    id: number;
    name: string;
    email: string;
    password: string;
&#125;

// Only pick what you need
type UserPreview = Pick&lt;User, 'id' | 'name'&gt;;
// &#123; id: number; name: string; &#125;</code></pre>
            </section>

            <section class="demo-section">
                <h3>4️⃣ Omit&lt;T, K&gt; - Exclude Specific Properties</h3>
                <pre><code>// Remove sensitive fields
type SafeUser = Omit&lt;User, 'password'&gt;;
// &#123; id: number; name: string; email: string; &#125;

// Common for creating without ID
type CreateUserDto = Omit&lt;User, 'id'&gt;;</code></pre>
            </section>

            <section class="demo-section">
                <h3>5️⃣ Record&lt;K, V&gt; - Create Object Type</h3>
                <pre><code>// Create a typed dictionary
type UserRoles = Record&lt;string, 'admin' | 'user' | 'guest'&gt;;

const roles: UserRoles = &#123;
    'user1': 'admin',
    'user2': 'user'
&#125;;

// Status lookup
type StatusMap = Record&lt;Status, string&gt;;</code></pre>
            </section>

            <section class="demo-section">
                <h3>6️⃣ Readonly&lt;T&gt; - Immutable Properties</h3>
                <pre><code>interface Config &#123;
    apiUrl: string;
    timeout: number;
&#125;

const config: Readonly&lt;Config&gt; = &#123;
    apiUrl: 'https://api.example.com',
    timeout: 5000
&#125;;

config.apiUrl = 'new';  // ❌ Error: Cannot assign to readonly property</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Common Angular Patterns</h3>
                <pre><code>// Form updates
updateForm(patch: Partial&lt;FormModel&gt;) &#123; ... &#125;

// API DTOs
type CreateDto = Omit&lt;Entity, 'id' | 'createdAt'&gt;;
type UpdateDto = Partial&lt;Omit&lt;Entity, 'id'&gt;&gt;;

// Component inputs
&#64;Input() config?: Partial&lt;ChartConfig&gt;;

// NgRx EntityState
type UserState = EntityState&lt;User&gt; & &#123; loading: boolean &#125;;</code></pre>
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
export class UtilityTypesComponent { }
