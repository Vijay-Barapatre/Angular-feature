import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DataStats {
    totalRows: number;
    totalColumns?: number;
    headers?: string[];
    numericStats?: Record<string, { min: number; max: number; avg: number; sum: number }>;
    categoryCounts?: Record<string, Record<string, number>>;
}

@Component({
    selector: 'app-data-processing',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto p-6 max-w-5xl">
      <h2 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        📊 Use Case 2: Data Processing
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        Parse and analyze large CSV/JSON files in a Web Worker. The UI stays responsive
        while processing thousands of rows in the background.
      </p>

      <!-- Input Options -->
      <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <div class="flex flex-wrap gap-6 items-end mb-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Data Format</label>
            <select [(ngModel)]="dataFormat"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700">
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div class="flex flex-col gap-2" *ngIf="dataFormat === 'csv'">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Delimiter</label>
            <select [(ngModel)]="delimiter"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700">
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
            </select>
          </div>

          <div class="flex gap-3">
            <input type="file" [accept]="dataFormat === 'csv' ? '.csv' : '.json'" 
                   (change)="onFileSelect($event)" #fileInput class="hidden">
            <button (click)="fileInput.click()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold disabled:opacity-50">
              📁 Upload File
            </button>
            <button (click)="loadSampleData()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold disabled:opacity-50">
              📦 Load Sample Data
            </button>
          </div>
        </div>

        <!-- Sample Data Preview -->
        <div *ngIf="!rawData" class="p-4 bg-white dark:bg-slate-700 rounded-lg">
          <p class="text-slate-500 dark:text-slate-400 text-sm">
            💡 Upload a CSV/JSON file or click "Load Sample Data" to test with 10,000 rows of sample data.
          </p>
        </div>
      </div>

      <!-- Processing Actions -->
      <div *ngIf="rawData" class="flex gap-3 mb-6">
        <button (click)="parseData()" [disabled]="isProcessing"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50">
          {{ isProcessing ? '⏳ Processing...' : '🔍 Parse Data' }}
        </button>
        <button (click)="analyzeData()" [disabled]="isProcessing || !parsedData"
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold disabled:opacity-50">
          📈 Analyze Data
        </button>
        <button (click)="clearData()"
                class="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold">
          🗑️ Clear
        </button>
      </div>

      <!-- Progress Bar -->
      <div *ngIf="isProcessing" class="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mb-6">
        <div class="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
               [style.width.%]="progress"></div>
        </div>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {{ progress }}% - {{ statusMessage }}
        </p>
      </div>

      <!-- Results -->
      <div *ngIf="parsedData" class="space-y-6">
        <!-- Stats Card -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">📊 Parsing Results</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold text-emerald-600">{{ dataStats?.totalRows | number }}</p>
              <p class="text-sm text-slate-500">Total Rows</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold text-blue-600">{{ dataStats?.totalColumns || 0 }}</p>
              <p class="text-sm text-slate-500">Columns</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold text-purple-600">{{ processingTime }}ms</p>
              <p class="text-sm text-slate-500">Processing Time</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-2xl font-bold text-green-600">✅</p>
              <p class="text-sm text-slate-500">UI Responsive</p>
            </div>
          </div>
        </div>

        <!-- Headers -->
        <div *ngIf="dataStats?.headers?.length" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-3">📋 Column Headers</h3>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let header of dataStats?.headers" 
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
              {{ header }}
            </span>
          </div>
        </div>

        <!-- Data Preview -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-3">👀 Data Preview (First 5 rows)</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-700">
                  <th *ngFor="let header of dataStats?.headers" class="px-4 py-2 text-left">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of previewRows" class="border-b border-slate-200 dark:border-slate-600">
                  <td *ngFor="let header of dataStats?.headers" class="px-4 py-2">{{ row[header] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Analysis Results -->
        <div *ngIf="analysisResult" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">📈 Data Analysis</h3>
          
          <div *ngIf="numericColumns.length" class="mb-6">
            <h4 class="font-medium text-slate-700 dark:text-slate-300 mb-3">Numeric Columns</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div *ngFor="let col of numericColumns" class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p class="font-semibold text-slate-800 dark:text-slate-200 mb-2">{{ col }}</p>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <p><span class="text-slate-500">Min:</span> {{ analysisResult.numericStats[col].min | number:'1.2-2' }}</p>
                  <p><span class="text-slate-500">Max:</span> {{ analysisResult.numericStats[col].max | number:'1.2-2' }}</p>
                  <p><span class="text-slate-500">Avg:</span> {{ analysisResult.numericStats[col].avg | number:'1.2-2' }}</p>
                  <p><span class="text-slate-500">Sum:</span> {{ analysisResult.numericStats[col].sum | number }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mt-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">💻 How It Works</h3>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm"><code>// Worker processes data in chunks
for (let i = startIndex; i &lt; totalLines; i++) &#123;
  const values = lines[i].split(delimiter);
  rows.push(parseRow(values));
  
  // Report progress every 1000 rows
  if (i % 1000 === 0) &#123;
    postMessage(&#123; type: 'PROGRESS', progress &#125;);
  &#125;
&#125;

// Main thread stays responsive
worker.onmessage = (e) =&gt; &#123;
  if (e.data.type === 'PROGRESS') &#123;
    this.progress = e.data.progress;
  &#125;
&#125;;</code></pre>
      </div>
    </div>
  `
})
export class DataProcessingComponent implements OnInit, OnDestroy {
    dataFormat: 'csv' | 'json' = 'csv';
    delimiter = ',';
    rawData: string | null = null;
    parsedData: any[] | null = null;
    dataStats: DataStats | null = null;
    analysisResult: any = null;
    isProcessing = false;
    progress = 0;
    statusMessage = '';
    processingTime = 0;

    private worker: Worker | null = null;

    ngOnInit(): void {
        this.initializeWorker();
    }

    ngOnDestroy(): void {
        this.worker?.terminate();
    }

    get previewRows(): any[] {
        return this.parsedData?.slice(0, 5) || [];
    }

    get numericColumns(): string[] {
        return this.analysisResult?.numericStats ? Object.keys(this.analysisResult.numericStats) : [];
    }

    private initializeWorker(): void {
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(
                new URL('./data-processing.worker', import.meta.url)
            );

            this.worker.onmessage = (event) => {
                this.handleWorkerMessage(event.data);
            };

            this.worker.onerror = (error) => {
                console.error('Worker error:', error);
                this.isProcessing = false;
                this.statusMessage = 'Error processing data';
            };
        }
    }

    private handleWorkerMessage(message: any): void {
        switch (message.type) {
            case 'PROGRESS':
                this.progress = message.progress;
                this.statusMessage = 'Processing...';
                break;
            case 'COMPLETE':
                this.isProcessing = false;
                this.progress = 100;
                this.processingTime = message.processingTime;

                if (message.result.rows) {
                    this.parsedData = message.result.rows;
                    this.dataStats = message.result.stats;
                } else if (message.result.numericStats) {
                    this.analysisResult = message.result;
                }
                break;
            case 'ERROR':
                this.isProcessing = false;
                this.statusMessage = `Error: ${message.error}`;
                break;
        }
    }

    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.rawData = e.target?.result as string;
            };
            reader.readAsText(input.files[0]);
        }
    }

    loadSampleData(): void {
        // Generate 10,000 rows of sample data
        const headers = ['id', 'name', 'age', 'salary', 'department'];
        const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];
        const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];

        let csv = headers.join(',') + '\n';
        for (let i = 1; i <= 10000; i++) {
            csv += [
                i,
                names[Math.floor(Math.random() * names.length)],
                Math.floor(Math.random() * 40) + 20,
                Math.floor(Math.random() * 100000) + 30000,
                departments[Math.floor(Math.random() * departments.length)]
            ].join(',') + '\n';
        }

        this.rawData = csv;
        this.dataFormat = 'csv';
    }

    parseData(): void {
        if (!this.rawData || !this.worker || this.isProcessing) return;

        this.isProcessing = true;
        this.progress = 0;
        this.statusMessage = 'Starting parsing...';
        this.parsedData = null;
        this.analysisResult = null;

        this.worker.postMessage({
            type: this.dataFormat === 'csv' ? 'PARSE_CSV' : 'PARSE_JSON',
            data: this.rawData,
            options: { delimiter: this.delimiter, hasHeader: true }
        });
    }

    analyzeData(): void {
        if (!this.parsedData || !this.worker || this.isProcessing) return;

        this.isProcessing = true;
        this.progress = 0;
        this.statusMessage = 'Analyzing data...';

        this.worker.postMessage({
            type: 'ANALYZE_DATA',
            data: JSON.stringify(this.parsedData)
        });
    }

    clearData(): void {
        this.rawData = null;
        this.parsedData = null;
        this.dataStats = null;
        this.analysisResult = null;
        this.progress = 0;
        this.processingTime = 0;
    }
}
