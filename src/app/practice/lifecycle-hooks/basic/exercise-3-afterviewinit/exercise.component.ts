/**
 * ============================================================================
 * 🟦 EXERCISE 3: AFTERVIEWINIT
 * ============================================================================
 */

import { Component, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exercise-3-afterviewinit',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: AfterViewInit</h2>
                <p>Access child elements after the view is fully initialized.</p>
                <ul>
                    <li><code>&#64;ViewChild</code> to get element reference</li>
                    <li><code>ngAfterViewInit</code> to safely access view children</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="canvas-container">
                    <canvas #myCanvas width="400" height="200"></canvas>
                </div>

                <div class="canvas-info">
                    <p><strong>Canvas Dimensions:</strong> {{ canvasWidth() }} x {{ canvasHeight() }}</p>
                    <p><strong>Context Available:</strong> {{ contextAvailable() ? '✅ Yes' : '❌ No' }}</p>
                </div>

                <div class="controls">
                    <button (click)="drawCircle()">Draw Circle</button>
                    <button (click)="drawRect()">Draw Rectangle</button>
                    <button (click)="clearCanvas()">Clear</button>
                </div>

                <div class="warning-box">
                    <h4>⚠️ Common Mistake</h4>
                    <p>Trying to access ViewChild in ngOnInit will return undefined!</p>
                    <p>Always use ngAfterViewInit for view queries.</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #06b6d4; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .canvas-container { background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
        canvas { border: 2px solid #06b6d4; border-radius: 4px; background: white; }
        .canvas-info { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .canvas-info p { margin: 0.25rem 0; }
        .controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .controls button { padding: 0.75rem 1.5rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .warning-box { padding: 1rem; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; }
        .warning-box h4 { margin: 0 0 0.5rem; color: #f59e0b; }
        .warning-box p { margin: 0.25rem 0; font-size: 0.9rem; }
    `]
})
export class Exercise3AfterViewInitComponent implements AfterViewInit {
    @ViewChild('myCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    canvasWidth = signal(0);
    canvasHeight = signal(0);
    contextAvailable = signal(false);

    private ctx?: CanvasRenderingContext2D | null;

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit: Canvas is now available');

        const canvas = this.canvasRef.nativeElement;
        this.canvasWidth.set(canvas.width);
        this.canvasHeight.set(canvas.height);

        this.ctx = canvas.getContext('2d');
        this.contextAvailable.set(!!this.ctx);

        this.drawWelcome();
    }

    private drawWelcome(): void {
        if (!this.ctx) return;
        this.ctx.fillStyle = '#06b6d4';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Canvas ready!', 200, 100);
    }

    drawCircle(): void {
        if (!this.ctx) return;
        const x = Math.random() * 350 + 25;
        const y = Math.random() * 150 + 25;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.ctx.fill();
    }

    drawRect(): void {
        if (!this.ctx) return;
        const x = Math.random() * 350;
        const y = Math.random() * 150;
        this.ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.ctx.fillRect(x, y, 50, 40);
    }

    clearCanvas(): void {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, 400, 200);
        this.drawWelcome();
    }
}
