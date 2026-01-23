import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-interfaces-types',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>📋 Interfaces & Types</h2>
            <p class="subtitle">5 Different Ways to Define Types in TypeScript</p>
            
            <!-- Way 1: Basic Interface -->
            <section class="demo-section">
                <h3>1️⃣ Basic Interface (Most Common)</h3>
                <pre><code>// Define shape of an object
interface User &#123;
    id: number;
    name: string;
    email: string;
&#125;

// Usage
const user: User = &#123;
    id: 1,
    name: 'John',
    email: 'john&#64;example.com'
&#125;;</code></pre>
            </section>

            <!-- Way 2: Interface with Optional & Readonly -->
            <section class="demo-section">
                <h3>2️⃣ Interface with Modifiers</h3>
                <pre><code>interface Product &#123;
    readonly id: string;      // Cannot be changed after creation
    name: string;
    price: number;
    description?: string;     // Optional property
    tags?: string[];          // Optional array
&#125;

const product: Product = &#123;
    id: 'prod-001',           // Set once, cannot modify
    name: 'Widget',
    price: 29.99
    // description and tags are optional
&#125;;</code></pre>
            </section>

            <!-- Way 3: Extending Interfaces -->
            <section class="demo-section">
                <h3>3️⃣ Extending Interfaces (Inheritance)</h3>
                <pre><code>// Base interface
interface Person &#123;
    name: string;
    age: number;
&#125;

// Extended interface
interface Employee extends Person &#123;
    employeeId: string;
    department: string;
    salary: number;
&#125;

// Extending multiple interfaces
interface Manager extends Employee &#123;
    teamSize: number;
    directReports: Employee[];
&#125;

const manager: Manager = &#123;
    name: 'Alice',
    age: 35,
    employeeId: 'EMP001',
    department: 'Engineering',
    salary: 120000,
    teamSize: 8,
    directReports: []
&#125;;</code></pre>
            </section>

            <!-- Way 4: Type Alias -->
            <section class="demo-section">
                <h3>4️⃣ Type Alias (Alternative to Interface)</h3>
                <pre><code>// Type alias for object
type UserType = &#123;
    id: number;
    name: string;
&#125;;

// Type alias for union
type Status = 'pending' | 'active' | 'inactive';
type ID = string | number;

// Type alias for function signature
type ClickHandler = (event: MouseEvent) => void;
type AsyncDataFetcher = () => Promise&lt;User[]&gt;;

// Intersection type (combine types)
type AdminUser = User & &#123; permissions: string[] &#125;;</code></pre>
            </section>

            <!-- Way 5: Interface for Functions & Classes -->
            <section class="demo-section">
                <h3>5️⃣ Interface for Functions & Class Contracts</h3>
                <pre><code>// Function interface
interface SearchFunction &#123;
    (query: string, limit?: number): Promise&lt;Result[]&gt;;
&#125;

// Class contract
interface Repository&lt;T&gt; &#123;
    findAll(): Promise&lt;T[]&gt;;
    findById(id: string): Promise&lt;T | null&gt;;
    create(item: Omit&lt;T, 'id'&gt;): Promise&lt;T&gt;;
    update(id: string, item: Partial&lt;T&gt;): Promise&lt;T&gt;;
    delete(id: string): Promise&lt;boolean&gt;;
&#125;

// Implementation
class UserRepository implements Repository&lt;User&gt; &#123;
    async findAll() &#123; return []; &#125;
    async findById(id: string) &#123; return null; &#125;
    // ... other methods
&#125;</code></pre>
            </section>

            <!-- Angular Examples -->
            <section class="angular-section">
                <h3>🅰️ Real Angular Examples</h3>
                <pre><code>// API Response interface
interface ApiResponse&lt;T&gt; &#123;
    data: T;
    status: number;
    message: string;
    pagination?: &#123;
        page: number;
        total: number;
    &#125;;
&#125;

// Component Input interface
interface CardConfig &#123;
    title: string;
    subtitle?: string;
    icon?: string;
    theme?: 'light' | 'dark';
&#125;

// Service usage
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
    getUsers(): Observable&lt;ApiResponse&lt;User[]&gt;&gt; &#123;
        return this.http.get&lt;ApiResponse&lt;User[]&gt;&gt;('/api/users');
    &#125;
&#125;

// Component usage
&#64;Component(&#123;...&#125;)
export class CardComponent &#123;
    &#64;Input() config!: CardConfig;
&#125;</code></pre>
            </section>

            <!-- Interactive Demo -->
            <section class="demo-section">
                <h3>🧪 Live Example</h3>
                <div class="live-demo">
                    <div class="user-card" *ngFor="let user of users">
                        <strong>{{ user.name }}</strong>
                        <span>{{ user.email }}</span>
                        <span class="role">{{ user.role }}</span>
                    </div>
                </div>
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
        .live-demo { display: flex; gap: 1rem; flex-wrap: wrap; }
        .user-card { background: #0d1117; padding: 1rem; border-radius: 8px; display: flex; flex-direction: column; gap: 0.25rem; border: 1px solid #3178c6; }
        .user-card strong { color: #3178c6; }
        .user-card span { color: #94a3b8; font-size: 0.85rem; }
        .user-card .role { color: #22c55e; text-transform: uppercase; font-size: 0.75rem; }
    `]
})
export class InterfacesTypesComponent {
    // Demonstrating interface usage
    users: { name: string; email: string; role: string }[] = [
        { name: 'Alice', email: 'alice@example.com', role: 'admin' },
        { name: 'Bob', email: 'bob@example.com', role: 'user' },
        { name: 'Charlie', email: 'charlie@example.com', role: 'user' }
    ];
}
