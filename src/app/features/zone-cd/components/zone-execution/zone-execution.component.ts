import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-zone-execution',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/zone-cd" class="back-link">← Back to Overview</a>
        <h1>🎯 Zone Execution</h1>
        <p class="header-description">Visualizing where your code runs: Inside or Outside Angular's Zone.</p>
      </div>

      <div class="demo-box">
        <h2>Execution Context</h2>
        <div class="status-grid">
          <div class="status-card" [class.active]="isInZone">
            <h3>Inside Angular Zone</h3>
            <p>Changes update UI automatically</p>
            <div class="indicator" [style.background]="isInZone ? '#4caf50' : '#ddd'"></div>
          </div>
          <div class="status-card" [class.active]="!isInZone">
            <h3>Outside Angular Zone</h3>
            <p>Changes <strong>DO NOT</strong> update UI</p>
            <div class="indicator" [style.background]="!isInZone ? '#f44336' : '#ddd'"></div>
          </div>
        </div>

        <div class="actions">
          <button (click)="runInside()" class="btn-primary">Run Task Inside Zone</button>
          <button (click)="runOutside()" class="btn-warning">Run Task Outside Zone</button>
        </div>
      </div>

      <div class="log-box">
        <h3>Logs:</h3>
        <div *ngFor="let log of logs" class="log-item">
          <span class="timestamp">{{ log.time }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
      </div>
      
      <div class="info-card">
        <p>
            <strong>Note:</strong> When running outside Angular, the "Logs" might not update instantly 
            because Change Detection is not triggered! Click "Run Task Inside Zone" to flush updates.
        </p>
      </div>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .demo-box {
      background: var(--bg-secondary);
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 1px solid var(--border-color);
    }
    
    .status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
    .status-card {
      background: var(--bg-card);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      border: 2px solid transparent;
      transition: all 0.3s;
    }
    .status-card.active { border-color: var(--primary-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    
    .indicator { width: 20px; height: 20px; border-radius: 50%; margin: 10px auto; transition: background 0.3s; }
    
    .actions { display: flex; gap: 15px; justify-content: center; }
    button { padding: 10px 20px; border-radius: 6px; cursor: pointer; border: none; font-weight: bold; color: white; }
    .btn-primary { background: var(--primary-color); }
    .btn-warning { background: var(--warning); }
    
    .log-box {
        background: #1e1e1e;
        color: #ddd;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        height: 200px;
        overflow-y: auto;
    }
    .log-item { border-bottom: 1px solid #333; padding: 5px 0; }
    .timestamp { color: #888; margin-right: 10px; }
    
    .info-card { 
        margin-top: 20px;
        background: #fff3cd; 
        color: #856404; 
        padding: 15px; 
        border-radius: 8px;
    }
  `]
})
export class ZoneExecutionComponent {
    isInZone = true;
    logs: { time: string, message: string }[] = [];

    constructor(private ngZone: NgZone) { }

    runInside() {
        this.isInZone = NgZone.isInAngularZone();
        this.addLog(`Running Inside Zone? ${this.isInZone}`);

        setTimeout(() => {
            this.addLog('Inside: Timeout Finished');
        }, 500);
    }

    runOutside() {
        this.ngZone.runOutsideAngular(() => {
            this.isInZone = NgZone.isInAngularZone();
            // Note: We are Pushing to array, but because we are outside zone, 
            // Angular won't know to check the view!
            this.addLog(`Running Inside Zone? ${this.isInZone}`);

            setTimeout(() => {
                this.addLog('Outside: Timeout Finished (You might not see this immediately!)');
            }, 500);
        });
    }

    addLog(message: string) {
        const time = new Date().toLocaleTimeString();
        this.logs.unshift({ time, message }); // Prepend to show latest first
        console.log(`[ZoneDemo] ${message}`);
    }
}
