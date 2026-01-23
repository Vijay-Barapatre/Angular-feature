/**
 * CHART COMPONENT - Demonstrates ngAfterViewInit & ngAfterViewChecked
 * 
 * This component shows a real-world example of:
 * - ngAfterViewInit: Initialize chart after canvas is available
 * - ngAfterViewChecked: Update chart when data changes
 * 
 * CRITICAL CONCEPTS:
 * 1. @ViewChild is NOT available until ngAfterViewInit
 * 2. ngAfterViewInit is called ONCE after view initialization
 * 3. ngAfterViewChecked is called on EVERY change detection
 * 
 * REAL-WORLD USE CASE:
 * - Integrating Chart.js, D3.js, or other DOM libraries
 * - Measuring elements after render
 * - Setting up canvas-based visualizations
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    AfterViewChecked,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="chart-card">
            <!-- Chart Header -->
            <div class="chart-header">
                <span class="status-badge">📊 Chart Active</span>
                <span class="render-count">Checks: {{ viewCheckCount }}</span>
            </div>

            <!-- Chart Canvas (will be initialized in ngAfterViewInit) -->
            <div class="chart-area">
                <canvas #chartCanvas class="chart-canvas"></canvas>
            </div>

            <!-- Chart Info -->
            <div class="chart-info">
                <div class="info-item">
                    <span class="info-label">Data Points:</span>
                    <span class="info-value">{{ data.length }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Max Value:</span>
                    <span class="info-value">{{ maxValue }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Canvas Ready:</span>
                    <span class="info-value" [class.ready]="canvasReady">
                        {{ canvasReady ? '✅ Yes' : '⏳ No' }}
                    </span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .chart-card {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-xl);
            border: 2px solid rgba(167, 139, 250, 0.3);
        }

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }

        .status-badge {
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-size: 0.875rem;
            font-weight: 600;
            background: rgba(167, 139, 250, 0.2);
            color: #a78bfa;
        }

        .render-count {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-family: 'Consolas', 'Monaco', monospace;
        }

        .chart-area {
            background: var(--bg-card);
            border-radius: var(--radius-md);
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
            min-height: 200px;
        }

        .chart-canvas {
            width: 100%;
            height: 180px;
            display: block;
        }

        .chart-info {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-md);
        }

        .info-item {
            text-align: center;
            padding: var(--spacing-sm);
            background: var(--bg-card);
            border-radius: var(--radius-sm);
        }

        .info-label {
            display: block;
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-bottom: var(--spacing-xs);
        }

        .info-value {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
        }

        .info-value.ready {
            color: #4ade80;
        }
    `]
})
export class ChartComponent implements OnChanges, AfterViewInit, AfterViewChecked {
    /**
     * Chart data array
     */
    @Input() data: number[] = [];

    /**
     * Emit lifecycle events to parent
     */
    @Output() viewLifecycleEvent = new EventEmitter<{
        time: string;
        event: string;
        type: 'init' | 'checked';
    }>();

    /**
     * 🛡️ CRITICAL: @ViewChild reference to canvas element
     * This is ONLY available after ngAfterViewInit!
     */
    @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    /**
     * Track if canvas is ready
     */
    canvasReady = false;

    /**
     * Count of view checks (to show how often it's called)
     */
    viewCheckCount = 0;

    /**
     * Flag to track if data changed and needs redraw
     */
    private needsRedraw = false;

    /**
     * Get max value from data
     */
    get maxValue(): number {
        return Math.max(...this.data, 0);
    }

    /**
     * Helper to get time string
     */
    private getTimeString(): string {
        return new Date().toLocaleTimeString();
    }

    /**
     * 🔄 ngOnChanges - Called when data changes
     * Set flag for redraw (actual redraw happens in ngAfterViewChecked)
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && !changes['data'].isFirstChange()) {
            console.log('📊 [Chart] ngOnChanges - Data changed, marking for redraw');
            this.needsRedraw = true;
        }
    }

    /**
     * 👁️ ngAfterViewInit - VIEW INITIALIZATION HOOK
     * 
     * Called ONCE after Angular initializes the component's view and child views.
     * 
     * THIS IS THE SAFE PLACE TO:
     * - Access @ViewChild elements (they're now defined!)
     * - Initialize third-party libraries that need DOM access
     * - Set up canvas contexts
     * - Measure element dimensions
     * 
     * WHY NOT IN ngOnInit?
     * - @ViewChild elements are NOT available in ngOnInit
     * - The view hasn't been rendered yet
     * - DOM elements don't exist yet
     */
    ngAfterViewInit(): void {
        console.log('👁️ [Chart] ngAfterViewInit - Canvas is now available!');
        console.log('Canvas element:', this.canvasRef?.nativeElement);

        // Mark canvas as ready
        this.canvasReady = true;

        // Emit event
        this.viewLifecycleEvent.emit({
            time: this.getTimeString(),
            event: '👁️ ngAfterViewInit - Canvas initialized, drawing chart',
            type: 'init'
        });

        // Initialize the chart (canvas is now available!)
        this.drawChart();
    }

    /**
     * 🔄 ngAfterViewChecked - VIEW CHECK HOOK
     * 
     * Called AFTER every change detection cycle that checks the view.
     * 
     * ⚠️ PERFORMANCE WARNING:
     * - This is called VERY frequently (every CD cycle)
     * - Keep logic minimal and fast
     * - Use flags to avoid redundant work
     * - NEVER modify component state here (causes infinite loop!)
     * 
     * USE CASE:
     * - React to view changes that Angular's CD doesn't cover
     * - Update charts/visualizations after data changes
     * - Synchronize with third-party libraries
     */
    ngAfterViewChecked(): void {
        this.viewCheckCount++;

        // Only redraw if data actually changed
        if (this.needsRedraw && this.canvasReady) {
            console.log('🔄 [Chart] ngAfterViewChecked - Redrawing chart');

            this.viewLifecycleEvent.emit({
                time: this.getTimeString(),
                event: `🔄 ngAfterViewChecked - Redraw #${this.viewCheckCount}`,
                type: 'checked'
            });

            this.drawChart();
            this.needsRedraw = false; // Reset flag to prevent infinite redraws
        }
    }

    /**
     * Draw the bar chart on canvas
     * This simulates a third-party chart library initialization
     */
    private drawChart(): void {
        if (!this.canvasRef) {
            console.warn('Canvas not available yet');
            return;
        }

        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Could not get canvas context');
            return;
        }

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate bar dimensions
        const padding = 20;
        const barWidth = (canvas.width - padding * 2) / this.data.length - 5;
        const maxHeight = canvas.height - padding * 2;
        const maxValue = Math.max(...this.data, 1);

        // Draw bars
        this.data.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxHeight;
            const x = padding + index * (barWidth + 5);
            const y = canvas.height - padding - barHeight;

            // Gradient fill
            const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#a78bfa');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Value label
            ctx.fillStyle = '#9ca3af';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(String(value), x + barWidth / 2, y - 5);
        });

        console.log('📊 [Chart] Chart drawn with', this.data.length, 'data points');
    }
}
