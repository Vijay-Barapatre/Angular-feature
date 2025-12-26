import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-union-intersection',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🔀 Use Case 4: Union & Intersection Types</h2>
            <p class="subtitle">Combine types flexibly with | (or) and &amp; (and)</p>
            
            <!-- Demo 1: Union Types -->
            <section class="demo-section">
                <h3>1️⃣ Union Types (|) - "Either/Or"</h3>
                <pre><code>// Variable can be one type OR another
type ID = string | number;
let userId: ID = 123;     // ✅
userId = 'abc-123';       // ✅

// Literal union types - exact values allowed
type Status = 'pending' | 'active' | 'inactive';
type Direction = 'up' | 'down' | 'left' | 'right';

// Function accepting multiple types
function printId(id: string | number) &#123;
    console.log('ID:', id);
&#125;</code></pre>
            </section>

            <!-- Demo 2: Intersection Types -->
            <section class="demo-section">
                <h3>2️⃣ Intersection Types (&amp;) - "Both/And"</h3>
                <pre><code>// Combine multiple types into one
interface Person &#123;
    name: string;
    age: number;
&#125;

interface Employee &#123;
    employeeId: string;
    department: string;
&#125;

// Has ALL properties from both
type TeamMember = Person & Employee;

const member: TeamMember = &#123;
    name: 'John',
    age: 30,
    employeeId: 'EMP001',
    department: 'Engineering'
&#125;;</code></pre>
            </section>

            <!-- Demo 3: Discriminated Unions -->
            <section class="demo-section">
                <h3>3️⃣ Discriminated Unions (Pattern)</h3>
                <pre><code>// Common pattern for handling different states
type LoadingState = &#123;
    status: 'loading';
&#125;;

type SuccessState = &#123;
    status: 'success';
    data: User[];
&#125;;

type ErrorState = &#123;
    status: 'error';
    message: string;
&#125;;

type State = LoadingState | SuccessState | ErrorState;

function render(state: State) &#123;
    switch (state.status) &#123;
        case 'loading': return 'Loading...';
        case 'success': return state.data;    // TypeScript knows data exists!
        case 'error': return state.message;   // TypeScript knows message exists!
    &#125;
&#125;</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Usage in Angular</h3>
                <pre><code>// Component status property
status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

// NgRx Action patterns
type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFailure;

// Combining interfaces for components
type ButtonProps = BaseButtonProps & IconProps & StyleProps;</code></pre>
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
export class UnionIntersectionComponent { }
