import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-zone-exercise',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/zone-cd" class="back-link">← Back to Overview</a>
        <h1>✏️ Exercise: Optimize the Laggy Timer</h1>
        <p class="header-description">This stopwatch is running <code>requestAnimationFrame</code> and triggering change detection too often!</p>
      </div>

      <div class="exercise-card">
        <h2>⏱️ Heavy Stopwatch</h2>
        <div class="display">
            {{ time.toFixed(1) }} ms
        </div>
        
        <div class="controls">
            <button (click)="start()" class="btn-start" [disabled]="isRunning">Start</button>
            <button (click)="stop()" class="btn-stop" [disabled]="!isRunning">Stop</button>
        </div>

        <div class="stats">
            Change Detections triggered: <strong>{{ cdCount }}</strong>
        </div>
      </div>
      
      <div class="flash-indicator">{{ check() }}</div>

      <div class="hint-box">
        <h3>💡 Your Mission</h3>
        <p>The "Change Detections" counter is going crazy. This will kill battery and performance.</p>
        <ol>
            <li>Inject <code>NgZone</code>.</li>
            <li>Wrap the <code>requestAnimationFrame</code> loop in <code>runOutsideAngular</code>.</li>
            <li>Only re-enter the zone (or manually detect changes) when you specifically want to update the UI (maybe less often?).</li>
            <li>Use <code>OnPush</code> ChangeDetectionStrategy.</li>
        </ol>
      </div>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .exercise-card {
      background: var(--bg-secondary);
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      text-align: center;
    }
    
    .display { font-size: 3rem; font-family: monospace; color: var(--accent-color); font-weight: bold; margin: 20px 0; }
    
    .controls button { padding: 10px 25px; margin: 0 10px; border: none; border-radius: 25px; cursor: pointer; color: white; font-size: 1.1rem; }
    .btn-start { background: var(--success); }
    .btn-stop { background: var(--warning); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .stats { margin-top: 30px; color: var(--text-secondary); }
    
    .hint-box { background: #fff3cd; color: #856404; padding: 20px; border-radius: 8px; }
    .flash-indicator { display: none; }
  `]
})
export class LearnerExerciseComponent implements OnInit {
    time = 0;
    isRunning = false;
    cdCount = 0;
    private animationId: number | null = null;
    private startTime = 0;

    start() {
        this.isRunning = true;
        this.startTime = performance.now();
        this.tick();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    tick() {
        if (!this.isRunning) return;

        // PROBLEM: This runs inside Angular Zone by default
        // Triggers CD 60 times per second!
        this.time = performance.now() - this.startTime;

        this.animationId = requestAnimationFrame(() => this.tick());
    }

    check() {
        this.cdCount++;
        return '';
    }

    ngOnInit() { }
}
