import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
    id: string;
    type: 'FIBONACCI' | 'FACTORIAL' | 'PRIME_CHECK' | 'RANDOM_WORK';
    data: number;
    status: 'pending' | 'running' | 'completed' | 'error';
    result?: any;
    processingTime?: number;
    workerId?: number;
}

interface WorkerInfo {
    id: number;
    worker: Worker;
    status: 'idle' | 'busy';
    tasksCompleted: number;
}

@Component({
    selector: 'app-worker-pool',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto p-6 max-w-5xl">
      <h2 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        🏊 Use Case 5: Worker Pool Pattern
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        Manage multiple workers for parallel task execution. Tasks are distributed 
        across the pool, maximizing CPU utilization while keeping the UI responsive.
      </p>

      <!-- Pool Configuration -->
      <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">⚙️ Pool Configuration</h3>
        <div class="flex flex-wrap gap-6 items-end">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">
              Workers: {{ workerCount }} ({{ hardwareConcurrency }} cores available)
            </label>
            <input type="range" [(ngModel)]="workerCount" min="1" [max]="maxWorkers" 
                   (change)="resizePool()"
                   class="w-40">
          </div>

          <div class="flex gap-3">
            <button (click)="initializePool()" [disabled]="poolInitialized"
                    class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold disabled:opacity-50">
              🏗️ Initialize Pool
            </button>
            <button (click)="terminatePool()" [disabled]="!poolInitialized"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-50">
              🛑 Terminate Pool
            </button>
          </div>
        </div>
      </div>

      <!-- Worker Status -->
      <div *ngIf="poolInitialized" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">👷 Worker Status</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div *ngFor="let worker of workers" 
               class="p-4 rounded-lg border-2 text-center transition-all"
               [class]="worker.status === 'busy' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-green-500 bg-green-50 dark:bg-green-900/20'">
            <p class="text-2xl mb-1">{{ worker.status === 'busy' ? '⚙️' : '✅' }}</p>
            <p class="font-semibold text-slate-800 dark:text-slate-200">Worker {{ worker.id + 1 }}</p>
            <p class="text-xs text-slate-500">{{ worker.status | uppercase }}</p>
            <p class="text-xs text-slate-400 mt-1">{{ worker.tasksCompleted }} tasks</p>
          </div>
        </div>
      </div>

      <!-- Task Generation -->
      <div *ngIf="poolInitialized" class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">📋 Generate Tasks</h3>
        <div class="flex flex-wrap gap-6 items-end">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Task Type</label>
            <select [(ngModel)]="taskType"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700">
              <option value="FIBONACCI">Fibonacci</option>
              <option value="FACTORIAL">Factorial</option>
              <option value="PRIME_CHECK">Prime Check</option>
              <option value="RANDOM_WORK">Random Work</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Number of Tasks</label>
            <input type="number" [(ngModel)]="taskCount" min="1" max="100" 
                   class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 w-24">
          </div>

          <div class="flex gap-3">
            <button (click)="generateTasks()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold disabled:opacity-50">
              ➕ Add Tasks
            </button>
            <button (click)="processTasks()" [disabled]="pendingTasks.length === 0 || isProcessing"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50">
              ▶️ Process All ({{ pendingTasks.length }})
            </button>
            <button (click)="clearTasks()"
                    class="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold">
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <div *ngIf="isProcessing" class="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mb-6">
        <div class="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all"
               [style.width.%]="(completedTasks.length / allTasks.length) * 100"></div>
        </div>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {{ completedTasks.length }} / {{ allTasks.length }} tasks completed
        </p>
      </div>

      <!-- Statistics -->
      <div *ngIf="completedTasks.length > 0" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">📊 Statistics</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
            <p class="text-2xl font-bold text-sky-600">{{ completedTasks.length }}</p>
            <p class="text-sm text-slate-500">Tasks Completed</p>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
            <p class="text-2xl font-bold text-purple-600">{{ totalTime }}ms</p>
            <p class="text-sm text-slate-500">Total Time</p>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
            <p class="text-2xl font-bold text-green-600">{{ avgTime }}ms</p>
            <p class="text-sm text-slate-500">Avg per Task</p>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
            <p class="text-2xl font-bold text-orange-600">{{ workers.length }}</p>
            <p class="text-sm text-slate-500">Workers Used</p>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
            <p class="text-2xl font-bold text-blue-600">{{ tasksPerSecond }}/s</p>
            <p class="text-sm text-slate-500">Throughput</p>
          </div>
        </div>
      </div>

      <!-- Task Results -->
      <div *ngIf="allTasks.length > 0" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">📋 Task Queue</h3>
        <div class="max-h-64 overflow-y-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-100 dark:bg-slate-700 sticky top-0">
              <tr>
                <th class="px-3 py-2 text-left">ID</th>
                <th class="px-3 py-2 text-left">Type</th>
                <th class="px-3 py-2 text-left">Input</th>
                <th class="px-3 py-2 text-left">Status</th>
                <th class="px-3 py-2 text-left">Worker</th>
                <th class="px-3 py-2 text-left">Result</th>
                <th class="px-3 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let task of allTasks" class="border-b border-slate-100 dark:border-slate-700">
                <td class="px-3 py-2 font-mono text-xs">{{ task.id.slice(-6) }}</td>
                <td class="px-3 py-2">{{ task.type }}</td>
                <td class="px-3 py-2">{{ task.data }}</td>
                <td class="px-3 py-2">
                  <span class="px-2 py-1 rounded text-xs font-semibold"
                        [class]="getStatusClass(task.status)">
                    {{ task.status | uppercase }}
                  </span>
                </td>
                <td class="px-3 py-2">{{ task.workerId !== undefined ? 'W' + (task.workerId + 1) : '-' }}</td>
                <td class="px-3 py-2 font-mono">{{ task.result ?? '-' }}</td>
                <td class="px-3 py-2">{{ task.processingTime ? task.processingTime + 'ms' : '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Code Example -->
      <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">💻 Worker Pool Pattern</h3>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm"><code>class WorkerPool &#123;
  private workers: Worker[] = [];
  private taskQueue: Task[] = [];
  private available: Worker[] = [];

  constructor(size: number = navigator.hardwareConcurrency) &#123;
    for (let i = 0; i &lt; size; i++) &#123;
      const worker = new Worker('./pool-worker.js');
      worker.onmessage = (e) =&gt; this.handleComplete(worker, e);
      this.workers.push(worker);
      this.available.push(worker);
    &#125;
  &#125;

  execute(task: Task): Promise&lt;Result&gt; &#123;
    return new Promise((resolve) =&gt; &#123;
      this.taskQueue.push(&#123; task, resolve &#125;);
      this.processNext();
    &#125;);
  &#125;

  private processNext() &#123;
    if (this.available.length &amp;&amp; this.taskQueue.length) &#123;
      const worker = this.available.pop()!;
      const &#123; task, resolve &#125; = this.taskQueue.shift()!;
      worker.postMessage(task);
    &#125;
  &#125;
&#125;</code></pre>
      </div>
    </div>
  `
})
export class WorkerPoolComponent implements OnInit, OnDestroy {
    hardwareConcurrency = navigator.hardwareConcurrency || 4;
    maxWorkers = Math.min(this.hardwareConcurrency * 2, 8);
    workerCount = Math.min(4, this.hardwareConcurrency);

    workers: WorkerInfo[] = [];
    poolInitialized = false;

    taskType: Task['type'] = 'FIBONACCI';
    taskCount = 20;

    allTasks: Task[] = [];
    isProcessing = false;

    private taskResolvers: Map<string, (value: any) => void> = new Map();
    private startTime = 0;
    private endTime = 0;

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.terminatePool();
    }

    get pendingTasks(): Task[] {
        return this.allTasks.filter(t => t.status === 'pending');
    }

    get completedTasks(): Task[] {
        return this.allTasks.filter(t => t.status === 'completed');
    }

    get totalTime(): number {
        if (this.endTime && this.startTime) {
            return this.endTime - this.startTime;
        }
        return 0;
    }

    get avgTime(): number {
        if (this.completedTasks.length === 0) return 0;
        const total = this.completedTasks.reduce((sum, t) => sum + (t.processingTime || 0), 0);
        return Math.round(total / this.completedTasks.length);
    }

    get tasksPerSecond(): string {
        if (this.totalTime === 0) return '0';
        return (this.completedTasks.length / (this.totalTime / 1000)).toFixed(1);
    }

    initializePool(): void {
        if (this.poolInitialized) return;

        this.workers = [];
        for (let i = 0; i < this.workerCount; i++) {
            const worker = new Worker(
                new URL('./worker-pool.worker', import.meta.url)
            );

            worker.onmessage = (event) => this.handleWorkerMessage(i, event.data);
            worker.onerror = (error) => console.error(`Worker ${i} error:`, error);

            this.workers.push({
                id: i,
                worker,
                status: 'idle',
                tasksCompleted: 0
            });
        }

        this.poolInitialized = true;
    }

    resizePool(): void {
        if (!this.poolInitialized) return;
        this.terminatePool();
        this.initializePool();
    }

    terminatePool(): void {
        this.workers.forEach(w => w.worker.terminate());
        this.workers = [];
        this.poolInitialized = false;
        this.isProcessing = false;
    }

    private handleWorkerMessage(workerId: number, message: any): void {
        const workerInfo = this.workers[workerId];
        if (!workerInfo) return;

        if (message.type === 'COMPLETE') {
            const task = this.allTasks.find(t => t.id === message.taskId);
            if (task) {
                task.status = 'completed';
                task.result = message.result;
                task.processingTime = message.processingTime;
                task.workerId = workerId;
            }

            workerInfo.tasksCompleted++;
            workerInfo.status = 'idle';

            // Process next pending task
            this.assignNextTask(workerInfo);

            // Check if all done
            if (this.pendingTasks.length === 0 && this.workers.every(w => w.status === 'idle')) {
                this.endTime = performance.now();
                this.isProcessing = false;
            }
        }
    }

    generateTasks(): void {
        for (let i = 0; i < this.taskCount; i++) {
            const task: Task = {
                id: crypto.randomUUID(),
                type: this.taskType,
                data: this.generateTaskData(this.taskType),
                status: 'pending'
            };
            this.allTasks.push(task);
        }
    }

    private generateTaskData(type: Task['type']): number {
        switch (type) {
            case 'FIBONACCI': return Math.floor(Math.random() * 50) + 10;
            case 'FACTORIAL': return Math.floor(Math.random() * 20) + 5;
            case 'PRIME_CHECK': return Math.floor(Math.random() * 1000000) + 1000;
            case 'RANDOM_WORK': return Math.floor(Math.random() * 100000) + 10000;
        }
    }

    processTasks(): void {
        if (this.pendingTasks.length === 0) return;

        this.isProcessing = true;
        this.startTime = performance.now();
        this.endTime = 0;

        // Assign tasks to idle workers
        this.workers.forEach(workerInfo => {
            if (workerInfo.status === 'idle') {
                this.assignNextTask(workerInfo);
            }
        });
    }

    private assignNextTask(workerInfo: WorkerInfo): void {
        const nextTask = this.pendingTasks[0];
        if (!nextTask) return;

        nextTask.status = 'running';
        workerInfo.status = 'busy';

        workerInfo.worker.postMessage({
            id: nextTask.id,
            type: nextTask.type,
            data: nextTask.data
        });
    }

    clearTasks(): void {
        this.allTasks = [];
        this.startTime = 0;
        this.endTime = 0;
    }

    getStatusClass(status: Task['status']): string {
        switch (status) {
            case 'pending': return 'bg-slate-200 text-slate-700';
            case 'running': return 'bg-orange-200 text-orange-700';
            case 'completed': return 'bg-green-200 text-green-700';
            case 'error': return 'bg-red-200 text-red-700';
        }
    }
}
