import { Component, ElementRef, NgZone, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-run-outside',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/zone-cd" class="back-link">← Back to Overview</a>
        <h1>🚀 Use Case 2: runOutsideAngular</h1>
        <p class="header-description">Optimizing high-frequency events (mouse moves, scrolls) to prevent lag.</p>
      </div>

      <div class="demo-box">
        <h2>Mouse Tracker performance</h2>
        
        <div class="toggle-section">
            <label>
                <input type="checkbox" (change)="toggleOptimization($event)" [checked]="isOptimized">
                Enable Optimization (Run Outside Angular)
            </label>
        </div>

        <div class="tracking-area" #box>
            Move mouse here rapidly!
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Event Count</h3>
                <p class="value">{{ eventCount }}</p>
            </div>
            <div class="stat-card" [class.danger]="!isOptimized && cdCount > 50">
                <h3>Change Detections</h3>
                <p class="value">{{ cdCount }}</p>
                <small *ngIf="!isOptimized">Rising fast! 🐢</small>
                <small *ngIf="isOptimized">Stable 🚀</small>
            </div>
        </div>
      </div>
      
      <div class="flash-indicator">{{ getFlash() }}</div>
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
    
    .tracking-area {
        height: 200px;
        background: var(--bg-card);
        border: 2px dashed var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin: 20px 0;
        cursor: crosshair;
        font-weight: bold;
        color: var(--text-muted);
    }
    .tracking-area:hover { border-color: var(--primary-color); background: rgba(var(--primary-rgb), 0.05); }
    
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .stat-card {
        background: var(--bg-card);
        padding: 15px;
        border-radius: 8px;
        text-align: center;
    }
    .stat-card.danger { border: 2px solid var(--warning); color: var(--warning); }
    .value { font-size: 2rem; font-weight: bold; margin: 10px 0; }
    
    .toggle-section { font-size: 1.1rem; margin-bottom: 10px; }
    .flash-indicator { display: none; } /* Just for triggering CD function call */
  `]
})
export class RunOutsideComponent implements AfterViewInit, OnDestroy {
    @ViewChild('box') box!: ElementRef;

    eventCount = 0;
    cdCount = 0;
    isOptimized = false;

    private cleanupFn: (() => void) | null = null;

    constructor(private ngZone: NgZone) { }

    ngAfterViewInit() {
        this.setupListener();
    }

    ngOnDestroy() {
        if (this.cleanupFn) this.cleanupFn();
    }

    toggleOptimization(e: Event) {
        this.isOptimized = (e.target as HTMLInputElement).checked;
        this.eventCount = 0;
        this.cdCount = 0;
        this.setupListener();
    }

    setupListener() {
        if (this.cleanupFn) this.cleanupFn();

        const el = this.box.nativeElement;

        if (this.isOptimized) {
            // OPTIMIZED: Run outside Angular Zone
            this.ngZone.runOutsideAngular(() => {
                const handler = (e: MouseEvent) => {
                    this.eventCount++;
                    // Manually update DOM for counter if needed, or update local var
                    // Angular WON'T detect this change automatically

                    // If we want to update ONE specific thing (like coordinate), we can do it manually
                    // But here we rely on the fact that the view WONT update eventCount
                    // until something else triggers CD, demonstrating the detach.

                    // To make the demo meaningful, let's manually update the text content 
                    // of a specific element if we really wanted to show live "Event Count" 
                    // without CD. But simply NOT updating is also a good demo.

                    // Let's force a check every 10 events just to show it's alive, 
                    // OR just let it lag.
                    if (this.eventCount % 10 === 0) {
                        this.ngZone.run(() => {
                            // Re-enter zone briefly to update UI
                        });
                    }
                };

                el.addEventListener('mousemove', handler);
                this.cleanupFn = () => el.removeEventListener('mousemove', handler);
            });
        } else {
            // UN-OPTIMIZED: Standard Angular Event Binding (simulated manually inside zone)
            // Note: Using (mousemove) in template is implicitly inside zone. 
            // We do it manually here to be symmetric with the optimized branch.
            const handler = (e: MouseEvent) => {
                this.eventCount++;
                // This runs inside Angular zone, so CD triggers automatically
            };
            el.addEventListener('mousemove', handler);
            this.cleanupFn = () => el.removeEventListener('mousemove', handler);
        }
    }

    // This function is called from template to visualize Change Detection cycles
    getFlash() {
        this.cdCount++;
        return '';
    }
}
