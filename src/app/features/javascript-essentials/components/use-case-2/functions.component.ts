import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Examples from './functions.examples';

@Component({
    selector: 'app-functions',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
      <h2>🔧 JavaScript Functions & Parameters - Live Examples</h2>

      <section class="example-section">
        <h3>1. Function Types</h3>
        <div class="example">
          <h4>Function Declaration</h4>
          <button (click)="testFunctionDeclaration()">Test Declaration</button>
          <pre>{{ declarationResult }}</pre>
        </div>

        <div class="example">
          <h4>Arrow Function</h4>
          <button (click)="testArrowFunction()">Test Arrow</button>
          <pre>{{ arrowResult }}</pre>
        </div>

        <div class="example">
          <h4>Generator Function</h4>
          <button (click)="testGenerator()">Test Generator</button>
          <pre>{{ generatorResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>2. Parameter Types</h3>
        <div class="example">
          <h4>Rest Parameters</h4>
          <button (click)="testRestParams()">Test Rest</button>
          <pre>{{ restResult }}</pre>
        </div>

        <div class="example">
          <h4>Destructured Parameters</h4>
          <button (click)="testDestructured()">Test Destructured</button>
          <pre>{{ destructuredResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>3. Higher-Order Functions</h3>
        <div class="example">
          <h4>Function Returning Function</h4>
          <button (click)="testHOF()">Test HOF</button>
          <pre>{{ hofResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>4. Closures</h3>
        <div class="example">
          <h4>Private Counter</h4>
          <button (click)="testClosure()">Increment Counter</button>
          <pre>{{ closureResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>5. Currying</h3>
        <div class="example">
          <h4>Curried Add Function</h4>
          <button (click)="testCurrying()">Test Curry</button>
          <pre>{{ curryResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>6. Function Composition</h3>
        <div class="example">
          <h4>Compose & Pipe</h4>
          <button (click)="testComposition()">Test Composition</button>
          <pre>{{ compositionResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>7. Memoization</h3>
        <div class="example">
          <h4>Memoized Fibonacci</h4>
          <button (click)="testMemoization()">Calculate Fib(40)</button>
          <pre>{{ memoizationResult }}</pre>
        </div>
      </section>

      <section class="example-section">
        <h3>8. Advanced Patterns</h3>
        <div class="example">
          <h4>Debounce</h4>
          <button (click)="testDebounce()">Trigger Debounce (300ms)</button>
          <pre>{{ debounceResult }}</pre>
        </div>

        <div class="example">
          <h4>Throttle</h4>
          <button (click)="testThrottle()">Trigger Throttle (1s)</button>
          <pre>{{ throttleResult }}</pre>
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
      margin-right: 1rem;
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
    }
  `]
})
export class FunctionsComponent {
    declarationResult = '';
    arrowResult = '';
    generatorResult = '';
    restResult = '';
    destructuredResult = '';
    hofResult = '';
    closureResult = '';
    curryResult = '';
    compositionResult = '';
    memoizationResult = '';
    debounceResult = '';
    throttleResult = '';

    private counter = Examples.createCounter();
    private debouncedFn = Examples.createDebounce((text: string) => {
        this.debounceResult = `Debounced: ${text} at ${new Date().toLocaleTimeString()}`;
    }, 300);

    private throttledFn = Examples.createThrottle(() => {
        this.throttleResult = `Throttled call at ${new Date().toLocaleTimeString()}`;
    }, 1000);

    testFunctionDeclaration() {
        this.declarationResult = Examples.greetDeclaration('Alice');
    }

    testArrowFunction() {
        this.arrowResult = JSON.stringify({
            double: Examples.double(5),
            add: Examples.add(3, 7),
            getRandom: Examples.getRandom()
        }, null, 2);
    }

    testGenerator() {
        const gen = Examples.numberGenerator();
        const results = [
            gen.next().value,
            gen.next().value,
            gen.next().value
        ];
        this.generatorResult = `Generator values: ${results.join(', ')}`;
    }

    testRestParams() {
        const sum1 = Examples.sum(1, 2, 3, 4, 5);
        const sum2 = Examples.sum(10);
        this.restResult = `sum(1,2,3,4,5) = ${sum1}\nsum(10) = ${sum2}`;
    }

    testDestructured() {
        const user = Examples.createUser({ name: 'Alice', age: 30 });
        const coords = Examples.getCoordinates([10, 20]);
        this.destructuredResult = JSON.stringify({ user, coords }, null, 2);
    }

    testHOF() {
        const double = Examples.multiplier(2);
        const triple = Examples.multiplier(3);
        this.hofResult = `double(5) = ${double(5)}\ntriple(5) = ${triple(5)}`;
    }

    testClosure() {
        this.counter.increment();
        this.closureResult = `Counter: ${this.counter.getCount()}`;
    }

    testCurrying() {
        const result1 = Examples.curriedAdd(5)(3);
        const add5 = Examples.curriedAdd(5);
        const result2 = add5(10);
        this.curryResult = `curriedAdd(5)(3) = ${result1}\nadd5(10) = ${result2}`;
    }

    testComposition() {
        const composed = Examples.doubleThenAdd(5);
        const piped = Examples.addThenDouble(5);
        this.compositionResult = `compose (double then add): ${composed}\npipe (add then double): ${piped}`;
    }

    testMemoization() {
        const start = performance.now();
        const result = Examples.memoizedFib(40);
        const time = (performance.now() - start).toFixed(2);
        this.memoizationResult = `fib(40) = ${result}\nTime: ${time}ms (cached!)`;
    }

    testDebounce() {
        this.debounceResult = 'Waiting 300ms...';
        this.debouncedFn('Search query');
    }

    testThrottle() {
        this.throttledFn();
    }
}
