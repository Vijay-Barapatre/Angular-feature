import { Component, OnInit, OnDestroy } from '@angular/core';
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
  imageData?: ImageData;
}

@Component({
  selector: 'app-heavy-computation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>🖼️ Heavy Computation - Image Processing</h2>
      <p class="description">
        Process images with various filters using Web Workers to prevent UI blocking.
        Try different filters and see how the UI remains responsive during processing.
      </p>

      <div class="controls">
        <div class="filter-selector">
          <label for="filter">Filter Type:</label>
          <select id="filter" [(ngModel)]="selectedFilter.type" (change)="onFilterChange()">
            <option value="grayscale">Grayscale</option>
            <option value="blur">Blur</option>
            <option value="brightness">Brightness</option>
            <option value="contrast">Contrast</option>
            <option value="sepia">Sepia</option>
          </select>
        </div>

        <div class="intensity-control" *ngIf="showIntensity">
          <label for="intensity">Intensity: {{ selectedFilter.intensity }}%</label>
          <input 
            id="intensity" 
            type="range" 
            min="0" 
            max="100" 
            [(ngModel)]="selectedFilter.intensity"
            (input)="onIntensityChange()"
          >
        </div>

        <div class="file-input">
          <input 
            type="file" 
            accept="image/*" 
            (change)="onFileSelect($event)"
            #fileInput
          >
          <button (click)="fileInput.click()" [disabled]="isProcessing">
            📁 Choose Image
          </button>
        </div>

        <div class="action-buttons">
          <button 
            (click)="processImage()" 
            [disabled]="!selectedFile || isProcessing"
            class="process-btn"
          >
            {{ isProcessing ? '⏳ Processing...' : '🎨 Apply Filter' }}
          </button>
          <button 
            (click)="resetImage()" 
            [disabled]="!originalImage"
            class="reset-btn"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div class="progress-section" *ngIf="isProcessing">
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="progress"></div>
        </div>
        <span class="progress-text">{{ progress }}% - {{ statusMessage }}</span>
      </div>

      <div class="image-comparison" *ngIf="originalImage || processedImage">
        <div class="image-container">
          <h3>Original Image</h3>
          <canvas #originalCanvas></canvas>
          <div class="image-info" *ngIf="originalImage">
            <p>Size: {{ formatFileSize(originalImage.size) }}</p>
            <p>Dimensions: {{ originalDimensions.width }} × {{ originalDimensions.height }}</p>
          </div>
        </div>

        <div class="arrow-container">
          <span class="arrow">→</span>
        </div>

        <div class="image-container">
          <h3>Processed Image</h3>
          <canvas #processedCanvas></canvas>
          <div class="image-info" *ngIf="processingResult">
            <p>Processing Time: {{ processingResult.processingTime }}ms</p>
            <p>Filter: {{ processingResult.filter.type }}</p>
            <p *ngIf="processingResult.filter.intensity">
              Intensity: {{ processingResult.filter.intensity }}%
            </p>
          </div>
        </div>
      </div>

      <div class="performance-metrics" *ngIf="processingResult">
        <h3>📊 Performance Metrics</h3>
        <div class="metrics-grid">
          <div class="metric">
            <span class="label">UI Responsiveness:</span>
            <span class="value">✅ Maintained</span>
          </div>
          <div class="metric">
            <span class="label">Processing Mode:</span>
            <span class="value">Web Worker</span>
          </div>
          <div class="metric">
            <span class="label">Memory Usage:</span>
            <span class="value">Optimized</span>
          </div>
        </div>
      </div>

      <div class="code-example">
        <h3>💻 Code Example</h3>
        <pre><code>// Web Worker Message Handling
self.onmessage = (event) => {
  const { imageData, filter } = event.data;
  
  // Process image in chunks for progress
  const chunkSize = Math.floor(imageData.data.length / 100);
  let processed = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  );
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Apply filter to each pixel
    processed.data = applyFilter(processed.data, i, filter);
    
    // Report progress
    if (i % chunkSize === 0) {
      self.postMessage({
        type: 'PROGRESS',
        progress: Math.floor((i / imageData.data.length) * 100)
      });
    }
  }
  
  self.postMessage({
    type: 'COMPLETE',
    result: processed
  });
};</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 2rem;
    }

    .description {
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .controls {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
    }

    .filter-selector, .intensity-control, .file-input {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .filter-selector label, .intensity-control label {
      font-weight: 600;
      color: #495057;
    }

    select, input[type="range"] {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    input[type="range"] {
      width: 150px;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      margin-left: auto;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .process-btn {
      background: #007bff;
      color: white;
    }

    .process-btn:hover:not(:disabled) {
      background: #0056b3;
    }

    .reset-btn {
      background: #6c757d;
      color: white;
    }

    .reset-btn:hover:not(:disabled) {
      background: #545b62;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .progress-section {
      background: #e9ecef;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .progress-bar {
      width: 100%;
      height: 20px;
      background: #dee2e6;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #007bff, #0056b3);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-weight: 600;
      color: #495057;
    }

    .image-comparison {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 20px;
      align-items: start;
      margin-bottom: 30px;
    }

    .image-container {
      text-align: center;
    }

    .image-container h3 {
      color: #2c3e50;
      margin-bottom: 15px;
    }

    canvas {
      max-width: 100%;
      height: auto;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .image-info {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
    }

    .arrow-container {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: #007bff;
    }

    .performance-metrics {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
    }

    .performance-metrics h3 {
      color: #155724;
      margin-bottom: 15px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .metric {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background: white;
      border-radius: 5px;
    }

    .label {
      font-weight: 600;
      color: #495057;
    }

    .value {
      color: #28a745;
      font-weight: 600;
    }

    .code-example {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
    }

    .code-example h3 {
      color: #2c3e50;
      margin-bottom: 15px;
    }

    pre {
      background: #2d3748;
      color: #e2e8f0;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .action-buttons {
        margin-left: 0;
        justify-content: center;
      }

      .image-comparison {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .arrow-container {
        display: none;
      }
    }
  `]
})
export class HeavyComputationComponent implements OnInit, OnDestroy {
  selectedFilter: ImageFilter = { type: 'grayscale', intensity: 50 };
  selectedFile: File | null = null;
  originalImage: HTMLImageElement | null = null;
  processedImage: ImageData | null = null;
  isProcessing = false;
  progress = 0;
  statusMessage = '';
  processingResult: ProcessingResult | null = null;
  originalDimensions = { width: 0, height: 0 };

  private worker: Worker | null = null;

  constructor() {}

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
        new URL('./image-processing.worker.ts', import.meta.url),
        { type: 'module' }
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
        this.statusMessage = `Processing image...`;
        break;
      case 'COMPLETE':
        this.processedImage = message.result;
        this.processingResult = {
          originalSize: this.originalImage?.size || 0,
          processedSize: this.calculateProcessedSize(message.result),
          processingTime: message.processingTime || 0,
          filter: this.selectedFilter,
          imageData: message.result
        };
        this.isProcessing = false;
        this.progress = 100;
        this.statusMessage = 'Processing complete!';
        this.renderProcessedImage();
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

  onIntensityChange(): void {
    // Auto-reprocess if image is loaded
    if (this.originalImage && !this.isProcessing) {
      this.processImage();
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
        this.originalDimensions = {
          width: img.width,
          height: img.height
        };
        this.renderOriginalImage();
        this.resetProcessedImage();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  private renderOriginalImage(): void {
    const canvas = document.querySelector('#originalCanvas') as HTMLCanvasElement;
    if (!canvas || !this.originalImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.originalImage.width;
    canvas.height = this.originalImage.height;
    ctx.drawImage(this.originalImage, 0, 0);
  }

  private renderProcessedImage(): void {
    const canvas = document.querySelector('#processedCanvas') as HTMLCanvasElement;
    if (!canvas || !this.processedImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.processedImage.width;
    canvas.height = this.processedImage.height;
    ctx.putImageData(this.processedImage, 0, 0);
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
    this.processedImage = null;
    this.processingResult = null;
    this.selectedFile = null;
    this.progress = 0;
    this.statusMessage = '';
    
    // Clear canvases
    const originalCanvas = document.querySelector('#originalCanvas') as HTMLCanvasElement;
    const processedCanvas = document.querySelector('#processedCanvas') as HTMLCanvasElement;
    
    if (originalCanvas) {
      const ctx = originalCanvas.getContext('2d');
      ctx?.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
    }
    
    if (processedCanvas) {
      const ctx = processedCanvas.getContext('2d');
      ctx?.clearRect(0, 0, processedCanvas.width, processedCanvas.height);
    }
  }

  private resetProcessedImage(): void {
    this.processedImage = null;
    this.processingResult = null;
    this.progress = 0;
    this.statusMessage = '';
    
    const processedCanvas = document.querySelector('#processedCanvas') as HTMLCanvasElement;
    if (processedCanvas) {
      const ctx = processedCanvas.getContext('2d');
      ctx?.clearRect(0, 0, processedCanvas.width, processedCanvas.height);
    }
  }

  private calculateProcessedSize(imageData: ImageData): number {
    return imageData.data.length;
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
