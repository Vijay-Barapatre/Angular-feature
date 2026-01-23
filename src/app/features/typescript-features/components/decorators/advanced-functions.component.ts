import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Examples from './advanced-functions.examples';

@Component({
    selector: 'app-advanced-functions',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
      <h2>🎯 TypeScript Advanced Function Types - Live Examples</h2>

      <section class="example-section">
        <h3>1. Generic Functions</h3>
        <div class="example">
          <h4>Generic Identity & Array Operations</h4>
          <button (click)="testGenerics()">Test Generics</button>
          <pre>{{ genericsResult }}</pre>
        </div>

        <div class="example">
          <h4>Generic with Constraints</h4>
          <button (click)="testConstraints()">Test Constraints</button>
          <pre>{{ constraintsResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>2. Function Overloads</h3>
        <div class="example">
          <h4>Format Function (multiple types)</h4>
          <button (click)="testOverloads()">Test Overloads</button>
          <pre>{{ overloadsResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>3. Type Guards</h3>
        <div class="example">
          <h4>Type Predicates</h4>
          <button (click)="testTypeGuards()">Test Type Guards</button>
          <pre>{{ typeGuardsResult }}</pre>
        </div>

        <div class="example">
          <h4>Assertion Functions</h4>
          <button (click)="testAssertions()">Test Assertions</button>
          <pre>{{ assertionsResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>4. Advanced Patterns</h3>
        <div class="example">
          <h4>Type-Safe Higher-Order Functions</h4>
          <button (click)="testHOF()">Test HOF</button>
          <pre>{{ hofResult }}</pre>
        </div>

        <div class="example">
          <h4>Conditional Return Types</h4>
          <button (click)="testConditional()">Test Conditional</button>
          <pre>{{ conditionalResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>5. Real-World Examples</h3>
        <div class="example">
          <h4>Type-Safe Event Emitter</h4>
          <button (click)="testEventEmitter()">Test Event Emitter</button>
          <pre>{{ eventEmitterResult }}</pre>
        </div>

        <div class="example">
          <h4>Builder Pattern</h4>
          <button (click)="testBuilder()">Test Builder</button>
          <pre>{{ builderResult }}</pre>
        </div>
      </section>
    </div>
  `,
    styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      color: #667eea;
      margin-bottom: 2rem;
    }

    .example-section {
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 8px;
    }

    h3 {
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .example {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: white;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
    }

    h4 {
      color: #4b5563;
      margin-bottom: 0.75rem;
    }

    button {
      padding: 0.5rem 1rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }

    button:hover {
      background: #5a67d8;
    }

    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin-top: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  `]
})
export class AdvancedFunctionsComponent {
    genericsResult = '';
    constraintsResult = '';
    overloadsResult = '';
    typeGuardsResult = '';
    assertionsResult = '';
    hofResult = '';
    conditionalResult = '';
    eventEmitterResult = '';
    builderResult = '';

    testGenerics() {
        const str = Examples.identity('hello');
        const num = Examples.identity(42);
        const first = Examples.first([1, 2, 3]);
        const pair = Examples.pair('age', 30);

        this.genericsResult = JSON.stringify({
            'identity<string>': str,
            'identity<number>': num,
            'first<number>': first,
            'pair<string, number>': pair
        }, null, 2);
    }

    testConstraints() {
        const obj = { name: 'Alice', age: 30, city: 'NYC' };
        const name = Examples.getProperty(obj, 'name');
        const merged = Examples.merge({ a: 1 }, { b: 2 });

        this.constraintsResult = JSON.stringify({
            'getProperty(obj, "name")': name,
            'merge({a:1}, {b:2})': merged
        }, null, 2);
    }

    testOverloads() {
        const str = Examples.format('hello');
        const num = Examples.format(42.567);
        const bool = Examples.format(true);

        this.overloadsResult = `format('hello') = ${str}\n` +
            `format(42.567) = ${num}\n` +
            `format(true) = ${bool}`;
    }

    testTypeGuards() {
        const value1: string | number = 'test';
        const value2: string | number = 42;

        const result1 = Examples.processValue(value1);
        const result2 = Examples.processValue(value2);

        this.typeGuardsResult = `processValue('test') = ${result1}\n` +
            `processValue(42) = ${result2}`;
    }

    testAssertions() {
        try {
            const value: unknown = 'valid string';
            Examples.assertIsString(value);
            this.assertionsResult = `✅ Assertion passed: value is string`;
        } catch (error: any) {
            this.assertionsResult = `❌ ${error.message}`;
        }
    }

    testHOF() {
        const numbers = [1, 2, 3, 4];
        const doubled = Examples.map(numbers, n => n * 2);
        const filtered = Examples.filter<number, number>(
            numbers,
            (n): n is number => n % 2 === 0
        );

        this.hofResult = JSON.stringify({
            original: numbers,
            doubled,
            evenOnly: filtered
        }, null, 2);
    }

    testConditional() {
        const single = Examples.getValue(42, false);
        const array = Examples.getValue(42, true);

        this.conditionalResult = JSON.stringify({
            'getValue(42, false)': single,
            'getValue(42, true)': array,
            types: {
                single: typeof single,
                array: Array.isArray(array) ? 'array' : typeof array
            }
        }, null, 2);
    }

    testEventEmitter() {
        const emitter = new Examples.TypedEventEmitter<{
            'test': { message: string; count: number }
        }>();

        const messages: string[] = [];

        emitter.on('test', (data) => {
            messages.push(`Event: ${data.message}, Count: ${data.count}`);
        });

        emitter.emit('test', { message: 'Hello', count: 1 });
        emitter.emit('test', { message: 'World', count: 2 });

        this.eventEmitterResult = messages.join('\n');
    }

    testBuilder() {
        const query = new Examples.QueryBuilder<{
            id: number;
            name: string;
            email: string
        }>()
            .where('id', 1)
            .where('name', 'Alice')
            .select('id', 'name');

        this.builderResult = JSON.stringify(query, null, 2);
    }
}
