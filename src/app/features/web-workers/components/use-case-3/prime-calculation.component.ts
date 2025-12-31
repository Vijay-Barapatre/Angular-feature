import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-prime-calculation',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto p-6 max-w-5xl">
      <h2 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        🔢 Use Case 3: Prime Calculation
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        Generate prime numbers using CPU-intensive algorithms. Compare UI responsiveness
        between main thread (blocks UI) and Web Worker (smooth UI).
      </p>

      <!-- Controls -->
      <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <div class="flex flex-wrap gap-6 items-end">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Operation</label>
            <select [(ngModel)]="operation"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700">
              <option value="find">Find Primes up to N</option>
              <option value="check">Check if Prime</option>
              <option value="factorize">Prime Factorization</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">
              {{ operation === 'find' ? 'Limit' : 'Number' }}
            </label>
            <input type="number" [(ngModel)]="inputNumber" 
                   [max]="operation === 'find' ? 1000000 : 999999999999"
                   class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 w-40">
          </div>

          <div class="flex gap-3">
            <button (click)="runInWorker()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold disabled:opacity-50">
              {{ isProcessing ? '⏳ Processing...' : '🔧 Run in Worker' }}
            </button>
            <button (click)="runInMainThread()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-50">
              ⚠️ Run in Main Thread
            </button>
          </div>
        </div>

        <div class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
          <p class="text-sm text-amber-800 dark:text-amber-300">
            <strong>⚠️ Warning:</strong> Running in main thread with large numbers will freeze the UI!
            Try clicking buttons or scrolling during main thread execution to see the difference.
          </p>
        </div>
      </div>

      <!-- UI Responsiveness Test -->
      <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">🎯 UI Responsiveness Test</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Click the counter button during processing to test if the UI is responsive:
        </p>
        <div class="flex items-center gap-4">
          <button (click)="incrementCounter()"
                  class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xl transition-transform active:scale-95">
            Click Me! 👆
          </button>
          <div class="text-3xl font-bold text-blue-600">{{ counter }}</div>
          <div [class]="uiStatus === 'responsive' ? 'text-green-600' : 'text-red-600'" class="font-semibold">
            {{ uiStatus === 'responsive' ? '✅ UI Responsive' : '❌ UI Blocked' }}
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div *ngIf="isProcessing" class="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mb-6">
        <div class="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all"
               [style.width.%]="progress"></div>
        </div>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {{ progress }}% - Found {{ currentCount | number }} primes so far...
        </p>
      </div>

      <!-- Results -->
      <div *ngIf="result" class="space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">📊 Results</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold text-orange-600">{{ result.count | number }}</p>
              <p class="text-sm text-slate-500">Primes Found</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold text-blue-600">{{ processingTime }}ms</p>
              <p class="text-sm text-slate-500">Processing Time</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold" [class]="executionMode === 'worker' ? 'text-green-600' : 'text-red-600'">
                {{ executionMode === 'worker' ? 'Worker' : 'Main' }}
              </p>
              <p class="text-sm text-slate-500">Execution Mode</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold" [class]="executionMode === 'worker' ? 'text-green-600' : 'text-red-600'">
                {{ executionMode === 'worker' ? '✅' : '❌' }}
              </p>
              <p class="text-sm text-slate-500">UI Smooth</p>
            </div>
          </div>

          <!-- Prime List Preview -->
          <div *ngIf="result.primes?.length">
            <h4 class="font-medium text-slate-700 dark:text-slate-300 mb-2">First 50 primes:</h4>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let prime of result.primes.slice(0, 50)"
                    class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-sm">
                {{ prime }}
              </span>
              <span *ngIf="result.primes.length > 50" class="px-2 py-1 text-slate-500">
                ...and {{ result.primes.length - 50 | number }} more
              </span>
            </div>
          </div>

          <!-- Factorization Result -->
          <div *ngIf="result.factors">
            <h4 class="font-medium text-slate-700 dark:text-slate-300 mb-2">Prime Factors of {{ result.number | number }}:</h4>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let factor of result.factors"
                    class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full font-mono">
                {{ factor }}
              </span>
            </div>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {{ result.number }} = {{ result.factors.join(' × ') }}
            </p>
          </div>

          <!-- Prime Check Result -->
          <div *ngIf="result.isPrime !== undefined">
            <div class="flex items-center gap-3">
              <span class="text-4xl">{{ result.isPrime ? '✅' : '❌' }}</span>
              <span class="text-xl font-semibold">
                {{ result.number | number }} is {{ result.isPrime ? '' : 'NOT ' }}a prime number
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mt-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">💻 Main Thread vs Worker</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="text-red-600 font-medium mb-2">❌ Main Thread (Blocks UI)</h4>
            <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm"><code>// Runs synchronously - blocks UI
for (let i = 2; i &lt;= limit; i++) &#123;
  if (isPrime(i)) primes.push(i);
&#125;
// UI frozen during execution!</code></pre>
          </div>
          <div>
            <h4 class="text-green-600 font-medium mb-2">✅ Web Worker (UI Responsive)</h4>
            <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm"><code>// Runs in background thread
worker.postMessage(&#123; limit &#125;);
worker.onmessage = (e) =&gt; &#123;
  this.primes = e.data.result;
&#125;;
// UI stays responsive!</code></pre>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PrimeCalculationComponent implements OnInit, OnDestroy {
    operation: 'find' | 'check' | 'factorize' = 'find';
    inputNumber = 100000;
    isProcessing = false;
    progress = 0;
    currentCount = 0;
    processingTime = 0;
    result: any = null;
    executionMode: 'worker' | 'main' = 'worker';
    counter = 0;
    uiStatus: 'responsive' | 'blocked' = 'responsive';

    private worker: Worker | null = null;
    private uiTestInterval: any;

    ngOnInit(): void {
        this.initializeWorker();
    }

    ngOnDestroy(): void {
        this.worker?.terminate();
        if (this.uiTestInterval) clearInterval(this.uiTestInterval);
    }

    private initializeWorker(): void {
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(
                new URL('./prime-calculation.worker', import.meta.url)
            );

            this.worker.onmessage = (event) => {
                this.handleWorkerMessage(event.data);
            };

            this.worker.onerror = (error) => {
                console.error('Worker error:', error);
                this.isProcessing = false;
            };
        }
    }

    private handleWorkerMessage(message: any): void {
        switch (message.type) {
            case 'PROGRESS':
                this.progress = message.progress;
                this.currentCount = message.currentCount || 0;
                break;
            case 'COMPLETE':
                this.isProcessing = false;
                this.progress = 100;
                this.processingTime = message.processingTime;
                this.result = message.result;
                break;
            case 'ERROR':
                this.isProcessing = false;
                console.error('Worker error:', message.error);
                break;
        }
    }

    incrementCounter(): void {
        this.counter++;
    }

    runInWorker(): void {
        if (!this.worker || this.isProcessing) return;

        this.startProcessing('worker');

        this.worker.postMessage({
            type: this.operation === 'find' ? 'FIND_PRIMES' :
                this.operation === 'check' ? 'IS_PRIME' : 'FACTORIZE',
            limit: this.inputNumber,
            number: this.inputNumber
        });
    }

    runInMainThread(): void {
        if (this.isProcessing) return;

        this.startProcessing('main');
        this.uiStatus = 'blocked';

        // Use setTimeout to allow UI to update before blocking
        setTimeout(() => {
            const startTime = performance.now();

            if (this.operation === 'find') {
                const primes = this.findPrimesSync(this.inputNumber);
                this.result = { primes, count: primes.length };
            } else if (this.operation === 'check') {
                this.result = {
                    isPrime: this.isPrimeSync(this.inputNumber),
                    number: this.inputNumber
                };
            } else {
                this.result = this.factorizeSync(this.inputNumber);
            }

            this.processingTime = Math.round(performance.now() - startTime);
            this.isProcessing = false;
            this.progress = 100;
            this.uiStatus = 'responsive';
        }, 50);
    }

    private startProcessing(mode: 'worker' | 'main'): void {
        this.isProcessing = true;
        this.progress = 0;
        this.currentCount = 0;
        this.result = null;
        this.executionMode = mode;
        this.uiStatus = 'responsive';
    }

    // Synchronous implementations for main thread demo
    private findPrimesSync(limit: number): number[] {
        const primes: number[] = [];
        for (let num = 2; num <= limit; num++) {
            if (this.isPrimeSync(num)) {
                primes.push(num);
            }
        }
        return primes;
    }

    private isPrimeSync(num: number): boolean {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        const sqrt = Math.sqrt(num);
        for (let i = 3; i <= sqrt; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    private factorizeSync(num: number): { number: number; factors: number[] } {
        const factors: number[] = [];
        let n = num;
        while (n % 2 === 0) { factors.push(2); n = n / 2; }
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) { factors.push(i); n = n / i; }
        }
        if (n > 1) factors.push(n);
        return { number: num, factors };
    }
}
