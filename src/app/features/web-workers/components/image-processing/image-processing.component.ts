import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ImageFilter {
    type: 'grayscale' | 'blur' | 'brightness' | 'contrast' | 'sepia';
    intensity?: number;
}

export interface ProcessingResult {
    originalSize: number;
    processedSize: number;
    processingTime: number;
    filter: ImageFilter;
}

@Component({
    selector: 'app-image-processing',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto p-6 max-w-5xl">
      <h2 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        🖼️ Image Processing
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        Apply heavy image filters using Web Workers to prevent UI blocking.
        Try different filters and see how the UI remains responsive during processing.
      </p>

      <!-- Controls -->
      <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <div class="flex flex-wrap gap-6 items-end">
          <div class="flex flex-col gap-2">
            <label for="filter" class="font-semibold text-slate-700 dark:text-slate-300">Filter Type</label>
            <select id="filter" [(ngModel)]="selectedFilter.type" (change)="onFilterChange()"
                    class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200">
              <option value="grayscale">Grayscale</option>
              <option value="blur">Blur</option>
              <option value="brightness">Brightness</option>
              <option value="contrast">Contrast</option>
              <option value="sepia">Sepia</option>
            </select>
          </div>

          <div class="flex flex-col gap-2" *ngIf="showIntensity">
            <label for="intensity" class="font-semibold text-slate-700 dark:text-slate-300">
              Intensity: {{ selectedFilter.intensity }}%
            </label>
            <input id="intensity" type="range" min="0" max="100" 
                   [(ngModel)]="selectedFilter.intensity"
                   class="w-40">
          </div>

          <div class="flex gap-3">
            <input type="file" accept="image/*" (change)="onFileSelect($event)" 
                   #fileInput class="hidden">
            <button (click)="fileInput.click()" [disabled]="isProcessing"
                    class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50">
              📁 Choose Image
            </button>
            <button (click)="processImage()" [disabled]="!originalImage || isProcessing"
                    class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50">
              {{ isProcessing ? '⏳ Processing...' : '🎨 Apply Filter' }}
            </button>
            <button (click)="resetImage()" [disabled]="!originalImage"
                    class="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50">
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div *ngIf="isProcessing" class="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mb-6">
        <div class="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
               [style.width.%]="progress"></div>
        </div>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {{ progress }}% - {{ statusMessage }}
        </p>
      </div>

      <!-- Image Comparison -->
      <div *ngIf="originalImage" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="text-center">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-3">Original Image</h3>
          <canvas #originalCanvas class="max-w-full h-auto border-2 border-slate-200 dark:border-slate-600 rounded-lg shadow-lg"></canvas>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Size: {{ formatFileSize(selectedFile?.size || 0) }} | 
            {{ originalDimensions.width }} × {{ originalDimensions.height }}
          </p>
        </div>

        <div class="text-center">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-3">Processed Image</h3>
          <canvas #processedCanvas class="max-w-full h-auto border-2 border-slate-200 dark:border-slate-600 rounded-lg shadow-lg"></canvas>
          <div *ngIf="processingResult" class="text-sm text-slate-500 dark:text-slate-400 mt-2">
            <p>Processing Time: <span class="font-semibold text-green-600">{{ processingResult.processingTime }}ms</span></p>
            <p>Filter: {{ processingResult.filter.type }}
              <span *ngIf="processingResult.filter.intensity">({{ processingResult.filter.intensity }}%)</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div *ngIf="processingResult" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
        <h3 class="font-semibold text-green-800 dark:text-green-300 mb-4">📊 Performance Metrics</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
            <p class="text-sm text-slate-500 dark:text-slate-400">UI Responsiveness</p>
            <p class="font-bold text-green-600">✅ Maintained</p>
          </div>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
            <p class="text-sm text-slate-500 dark:text-slate-400">Processing Mode</p>
            <p class="font-bold text-purple-600">Web Worker</p>
          </div>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
            <p class="text-sm text-slate-500 dark:text-slate-400">Thread</p>
            <p class="font-bold text-blue-600">Background</p>
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">💻 How It Works</h3>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm"><code>// Create worker with Angular's bundler-friendly syntax
this.worker = new Worker(
  new URL('./image-processing.worker', import.meta.url)
);

// Send image data to worker
this.worker.postMessage(&#123;
  type: 'PROCESS_IMAGE',
  imageData: imageData,
  filter: &#123; type: 'grayscale' &#125;
&#125;);

// Handle results from worker
this.worker.onmessage = (event) =&gt; &#123;
  if (event.data.type === 'COMPLETE') &#123;
    this.renderProcessedImage(event.data.result);
  &#125;
&#125;;</code></pre>
      </div>
    </div>
  `
})
export class ImageProcessingComponent implements OnInit, OnDestroy {
    @ViewChild('originalCanvas') originalCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('processedCanvas') processedCanvas!: ElementRef<HTMLCanvasElement>;

    selectedFilter: ImageFilter = { type: 'grayscale', intensity: 50 };
    selectedFile: File | null = null;
    originalImage: HTMLImageElement | null = null;
    isProcessing = false;
    progress = 0;
    statusMessage = '';
    processingResult: ProcessingResult | null = null;
    originalDimensions = { width: 0, height: 0 };

    private worker: Worker | null = null;

    ngOnInit(): void {
        this.initializeWorker();
    }

    ngOnDestroy(): void {
        this.terminateWorker();
    }

    get showIntensity(): boolean {
        return ['blur', 'brightness', 'contrast', 'sepia'].includes(this.selectedFilter.type);
    }

    private initializeWorker(): void {
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(
                new URL('./image-processing.worker', import.meta.url)
            );

            this.worker.onmessage = (event) => {
                this.handleWorkerMessage(event.data);
            };

            this.worker.onerror = (error) => {
                console.error('Worker error:', error);
                this.isProcessing = false;
                this.statusMessage = 'Error occurred during processing';
            };
        } else {
            console.error('Web Workers are not supported in this environment');
        }
    }

    private handleWorkerMessage(message: any): void {
        switch (message.type) {
            case 'PROGRESS':
                this.progress = message.progress;
                this.statusMessage = 'Processing image...';
                break;
            case 'COMPLETE':
                this.isProcessing = false;
                this.progress = 100;
                this.statusMessage = 'Processing complete!';
                this.processingResult = {
                    originalSize: this.selectedFile?.size || 0,
                    processedSize: message.result.data.length,
                    processingTime: message.processingTime || 0,
                    filter: { ...this.selectedFilter }
                };
                this.renderProcessedImage(message.result);
                break;
            case 'ERROR':
                this.isProcessing = false;
                this.statusMessage = `Error: ${message.error}`;
                break;
        }
    }

    onFilterChange(): void {
        if (!this.showIntensity) {
            this.selectedFilter.intensity = undefined;
        } else {
            this.selectedFilter.intensity = this.selectedFilter.intensity || 50;
        }
    }

    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
            this.loadImage();
        }
    }

    private loadImage(): void {
        if (!this.selectedFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.originalDimensions = { width: img.width, height: img.height };
                setTimeout(() => this.renderOriginalImage(), 0);
                this.processingResult = null;
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
    }

    private renderOriginalImage(): void {
        if (!this.originalCanvas || !this.originalImage) return;

        const canvas = this.originalCanvas.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = this.originalImage.width;
        canvas.height = this.originalImage.height;
        ctx.drawImage(this.originalImage, 0, 0);
    }

    private renderProcessedImage(imageData: ImageData): void {
        if (!this.processedCanvas) return;

        const canvas = this.processedCanvas.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
    }

    processImage(): void {
        if (!this.originalImage || !this.worker || this.isProcessing) return;

        this.isProcessing = true;
        this.progress = 0;
        this.statusMessage = 'Starting image processing...';

        const canvas = document.createElement('canvas');
        canvas.width = this.originalImage.width;
        canvas.height = this.originalImage.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            this.isProcessing = false;
            this.statusMessage = 'Failed to get canvas context';
            return;
        }

        ctx.drawImage(this.originalImage, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        this.worker.postMessage({
            type: 'PROCESS_IMAGE',
            imageData: imageData,
            filter: this.selectedFilter
        });
    }

    resetImage(): void {
        this.originalImage = null;
        this.selectedFile = null;
        this.processingResult = null;
        this.progress = 0;
        this.statusMessage = '';
    }

    private terminateWorker(): void {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
