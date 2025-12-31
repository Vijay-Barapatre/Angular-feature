import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-file-encryption',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto p-6 max-w-5xl">
      <h2 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        🔐 Use Case 4: File Encryption
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        Hash and encrypt files using Web Crypto API in a Web Worker. 
        Uses transferable objects for efficient ArrayBuffer transfer.
      </p>

      <!-- Controls -->
      <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <div class="flex flex-wrap gap-6 items-end mb-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Operation</label>
            <select [(ngModel)]="operation"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700">
              <option value="hash">Hash File</option>
              <option value="encrypt">Encrypt File</option>
            </select>
          </div>

          <div class="flex flex-col gap-2" *ngIf="operation === 'hash'">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Algorithm</label>
            <select [(ngModel)]="hashAlgorithm"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700">
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-512">SHA-512</option>
            </select>
          </div>

          <div class="flex flex-col gap-2" *ngIf="operation === 'encrypt'">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" [(ngModel)]="password" placeholder="Enter encryption password"
                   class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 w-48">
          </div>

          <div class="flex gap-3">
            <input type="file" (change)="onFileSelect($event)" #fileInput class="hidden">
            <button (click)="fileInput.click()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold disabled:opacity-50">
              📁 Select File
            </button>
            <button (click)="generateSampleData()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold disabled:opacity-50">
              📦 Generate Sample (10MB)
            </button>
          </div>
        </div>

        <div *ngIf="selectedFile" class="p-3 bg-white dark:bg-slate-700 rounded-lg flex items-center gap-4">
          <span class="text-2xl">📄</span>
          <div>
            <p class="font-semibold text-slate-800 dark:text-slate-200">{{ selectedFile.name }}</p>
            <p class="text-sm text-slate-500">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <button (click)="processFile()" [disabled]="isProcessing"
                  class="ml-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold disabled:opacity-50">
            {{ isProcessing ? '⏳ Processing...' : operation === 'hash' ? '🔍 Calculate Hash' : '🔐 Encrypt' }}
          </button>
        </div>
      </div>

      <!-- Progress Bar -->
      <div *ngIf="isProcessing" class="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mb-6">
        <div class="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all"
               [style.width.%]="progress"></div>
        </div>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {{ progress }}% - {{ statusMessage }}
        </p>
      </div>

      <!-- Results -->
      <div *ngIf="result" class="space-y-6">
        <!-- Hash Result -->
        <div *ngIf="result.hash" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">🔍 Hash Result</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-rose-600">{{ result.algorithm }}</p>
              <p class="text-sm text-slate-500">Algorithm</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-blue-600">{{ processingTime }}ms</p>
              <p class="text-sm text-slate-500">Time</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-purple-600">{{ result.hash.length * 4 }} bits</p>
              <p class="text-sm text-slate-500">Hash Length</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-green-600">✅</p>
              <p class="text-sm text-slate-500">UI Responsive</p>
            </div>
          </div>

          <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Hash Value:</p>
            <p class="font-mono text-sm break-all text-slate-800 dark:text-slate-200 select-all">
              {{ result.hash }}
            </p>
          </div>

          <button (click)="copyToClipboard(result.hash)" 
                  class="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">
            📋 Copy Hash
          </button>
        </div>

        <!-- Encryption Result -->
        <div *ngIf="result.encrypted" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">🔐 Encryption Result</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-rose-600">AES-GCM</p>
              <p class="text-sm text-slate-500">Algorithm</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-blue-600">{{ processingTime }}ms</p>
              <p class="text-sm text-slate-500">Time</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-purple-600">{{ formatFileSize(result.encryptedSize) }}</p>
              <p class="text-sm text-slate-500">Encrypted Size</p>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
              <p class="text-lg font-bold text-green-600">✅</p>
              <p class="text-sm text-slate-500">Secure</p>
            </div>
          </div>

          <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p class="text-green-800 dark:text-green-300">
              ✅ File encrypted successfully! In a real application, you would download the encrypted data.
            </p>
          </div>

          <button (click)="downloadEncrypted()" 
                  class="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm">
            ⬇️ Download Encrypted File
          </button>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mt-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">💻 Transferable Objects</h3>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm"><code>// Transfer ArrayBuffer ownership (zero-copy)
const buffer = await file.arrayBuffer();

// Transferable objects are moved, not copied
worker.postMessage(
  &#123; type: 'HASH', data: buffer &#125;,
  [buffer]  // Transfer list - buffer ownership moves to worker
);

// buffer is now unusable in main thread (neutered)
// This avoids expensive memory copy for large files!</code></pre>
      </div>
    </div>
  `
})
export class FileEncryptionComponent implements OnInit, OnDestroy {
    operation: 'hash' | 'encrypt' = 'hash';
    hashAlgorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256';
    password = '';
    selectedFile: File | null = null;
    fileData: ArrayBuffer | null = null;
    isProcessing = false;
    progress = 0;
    statusMessage = '';
    processingTime = 0;
    result: any = null;

    private worker: Worker | null = null;
    private encryptedData: ArrayBuffer | null = null;

    ngOnInit(): void {
        this.initializeWorker();
    }

    ngOnDestroy(): void {
        this.worker?.terminate();
    }

    private initializeWorker(): void {
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(
                new URL('./file-encryption.worker', import.meta.url)
            );

            this.worker.onmessage = (event) => {
                this.handleWorkerMessage(event.data);
            };

            this.worker.onerror = (error) => {
                console.error('Worker error:', error);
                this.isProcessing = false;
                this.statusMessage = 'Error processing file';
            };
        }
    }

    private handleWorkerMessage(message: any): void {
        switch (message.type) {
            case 'PROGRESS':
                this.progress = message.progress;
                this.statusMessage = message.stage || 'Processing...';
                break;
            case 'COMPLETE':
                this.isProcessing = false;
                this.progress = 100;
                this.processingTime = message.processingTime;
                this.result = message.result;

                if (message.result.encrypted) {
                    this.encryptedData = message.result.encrypted;
                    this.result.encryptedSize = message.result.encrypted.byteLength;
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
            this.selectedFile = input.files[0];
            this.result = null;
        }
    }

    generateSampleData(): void {
        // Generate 10MB of random data
        const size = 10 * 1024 * 1024;
        const data = new Uint8Array(size);
        crypto.getRandomValues(data);

        const blob = new Blob([data], { type: 'application/octet-stream' });
        this.selectedFile = new File([blob], 'sample-10mb.bin', { type: 'application/octet-stream' });
        this.result = null;
    }

    async processFile(): Promise<void> {
        if (!this.selectedFile || !this.worker || this.isProcessing) return;

        this.isProcessing = true;
        this.progress = 0;
        this.statusMessage = 'Reading file...';
        this.result = null;

        const buffer = await this.selectedFile.arrayBuffer();

        if (this.operation === 'hash') {
            this.worker.postMessage({
                type: 'HASH',
                data: buffer,
                algorithm: this.hashAlgorithm
            });
        } else {
            this.worker.postMessage({
                type: 'ENCRYPT',
                data: buffer,
                password: this.password || 'default-password'
            });
        }
    }

    copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text);
    }

    downloadEncrypted(): void {
        if (!this.encryptedData || !this.result?.iv) return;

        // Combine IV and encrypted data for download
        const combined = new Uint8Array(this.result.iv.length + this.encryptedData.byteLength);
        combined.set(this.result.iv, 0);
        combined.set(new Uint8Array(this.encryptedData), this.result.iv.length);

        const blob = new Blob([combined], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (this.selectedFile?.name || 'file') + '.encrypted';
        a.click();
        URL.revokeObjectURL(url);
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
