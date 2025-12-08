/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: SERVICE TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exercise-2-service',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Service Testing</h2>
                <p>Test services with dependency injection and mocks.</p>
            </div>

            <div class="demo">
                <div class="code-block">
                    <h4>Service to Test</h4>
                    <pre><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class CalculatorService {{ '{' }}
  add(a: number, b: number): number {{ '{' }}
    return a + b;
  {{ '}' }}
  
  multiply(a: number, b: number): number {{ '{' }}
    return a * b;
  {{ '}' }}
  
  divide(a: number, b: number): number {{ '{' }}
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>Service Test</h4>
                    <pre><code>describe('CalculatorService', () => {{ '{' }}
  let service: CalculatorService;

  beforeEach(() => {{ '{' }}
    TestBed.configureTestingModule({{ '{' }}{{ '}' }});
    service = TestBed.inject(CalculatorService);
  {{ '}' }});

  it('should be created', () => {{ '{' }}
    expect(service).toBeTruthy();
  {{ '}' }});

  it('should add two numbers', () => {{ '{' }}
    expect(service.add(2, 3)).toBe(5);
  {{ '}' }});

  it('should multiply two numbers', () => {{ '{' }}
    expect(service.multiply(3, 4)).toBe(12);
  {{ '}' }});

  it('should throw on division by zero', () => {{ '{' }}
    expect(() => service.divide(10, 0))
      .toThrowError('Division by zero');
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>

                <h3>🧮 Calculator Demo</h3>
                <div class="calculator">
                    <div class="calc-row">
                        <input type="number" [(value)]="num1" placeholder="A">
                        <select [(value)]="operation">
                            <option value="add">+</option>
                            <option value="multiply">×</option>
                            <option value="divide">÷</option>
                        </select>
                        <input type="number" [(value)]="num2" placeholder="B">
                        <button (click)="calculate()">=</button>
                        <span class="result">{{ result() }}</span>
                    </div>
                </div>

                <div class="mocking-section">
                    <h4>🎭 Mocking Dependencies</h4>
                    <pre><code>// Service with dependency
export class UserService {{ '{' }}
  constructor(private http: HttpClient) {{ '{' }}{{ '}' }}
{{ '}' }}

// Mock the dependency
beforeEach(() => {{ '{' }}
  const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
  httpSpy.get.and.returnValue(of(mockUsers));
  
  TestBed.configureTestingModule({{ '{' }}
    providers: [
      {{ '{' }} provide: HttpClient, useValue: httpSpy {{ '}' }}
    ]
  {{ '}' }});
{{ '}' }});</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #f0fdfa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #14b8a6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .calculator { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .calc-row { display: flex; align-items: center; gap: 0.5rem; }
        .calc-row input { width: 80px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; text-align: center; }
        .calc-row select { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .calc-row button { padding: 0.5rem 1rem; background: #14b8a6; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .result { font-size: 1.5rem; font-weight: bold; color: #14b8a6; min-width: 60px; }
        .mocking-section { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .mocking-section h4 { color: white; margin: 0 0 0.5rem; }
        .mocking-section pre { margin: 0; }
        .mocking-section code { color: #a6e3a1; font-size: 0.8rem; }
    `]
})
export class Exercise2ServiceTestingComponent {
    num1 = 10;
    num2 = 5;
    operation = 'add';
    result = signal<string>('');

    calculate(): void {
        let res: number;
        switch (this.operation) {
            case 'add':
                res = this.num1 + this.num2;
                break;
            case 'multiply':
                res = this.num1 * this.num2;
                break;
            case 'divide':
                if (this.num2 === 0) {
                    this.result.set('Error!');
                    return;
                }
                res = this.num1 / this.num2;
                break;
            default:
                res = 0;
        }
        this.result.set(res.toString());
    }
}
