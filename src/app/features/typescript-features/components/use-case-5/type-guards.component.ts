import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-type-guards',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🛡️ Use Case 5: Type Guards</h2>
            <p class="subtitle">Narrow types at runtime for safer code</p>
            
            <!-- Demo 1: typeof Guard -->
            <section class="demo-section">
                <h3>1️⃣ typeof Type Guard</h3>
                <pre><code>function padLeft(value: string | number, padding: string | number) &#123;
    // TypeScript narrows type inside if block
    if (typeof padding === 'number') &#123;
        return ' '.repeat(padding) + value;  // padding is number here
    &#125;
    return padding + value;  // padding is string here
&#125;</code></pre>
            </section>

            <!-- Demo 2: instanceof Guard -->
            <section class="demo-section">
                <h3>2️⃣ instanceof Type Guard</h3>
                <pre><code>class Dog &#123;
    bark() &#123; console.log('Woof!'); &#125;
&#125;

class Cat &#123;
    meow() &#123; console.log('Meow!'); &#125;
&#125;

function speak(animal: Dog | Cat) &#123;
    if (animal instanceof Dog) &#123;
        animal.bark();  // TypeScript knows it's Dog
    &#125; else &#123;
        animal.meow();  // TypeScript knows it's Cat
    &#125;
&#125;</code></pre>
            </section>

            <!-- Demo 3: Custom Type Guard -->
            <section class="demo-section">
                <h3>3️⃣ Custom Type Guard (is keyword)</h3>
                <pre><code>interface Fish &#123;
    swim: () => void;
&#125;

interface Bird &#123;
    fly: () => void;
&#125;

// Custom type guard function
function isFish(pet: Fish | Bird): pet is Fish &#123;
    return (pet as Fish).swim !== undefined;
&#125;

function move(pet: Fish | Bird) &#123;
    if (isFish(pet)) &#123;
        pet.swim();  // TypeScript knows it's Fish!
    &#125; else &#123;
        pet.fly();   // TypeScript knows it's Bird!
    &#125;
&#125;</code></pre>
            </section>

            <!-- Demo 4: in Operator -->
            <section class="demo-section">
                <h3>4️⃣ "in" Operator Guard</h3>
                <pre><code>type Admin = &#123; name: string; privileges: string[] &#125;;
type User = &#123; name: string; email: string &#125;;

function printUser(person: Admin | User) &#123;
    console.log(person.name);  // Safe - both have name
    
    if ('privileges' in person) &#123;
        console.log(person.privileges);  // Admin
    &#125;
    if ('email' in person) &#123;
        console.log(person.email);  // User
    &#125;
&#125;</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ In Angular</h3>
                <pre><code>// Check HttpErrorResponse
if (error instanceof HttpErrorResponse) &#123;
    // Handle HTTP error specifically
&#125;

// Custom guard for API responses
function isSuccessResponse(res: ApiResponse): res is SuccessResponse &#123;
    return res.status === 'success';
&#125;</code></pre>
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
export class TypeGuardsComponent { }
