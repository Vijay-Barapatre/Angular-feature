import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manual-detection',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush, // 🛡️ CRITICAL: We take control
  template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/zone-cd" class="back-link">← Back to Overview</a>
        <h1>🔧 Use Case 4: Manual Control</h1>
        <p class="header-description">Using <code>detectChanges</code> and <code>markForCheck</code> with OnPush.</p>
      </div>

      <div class="demo-box">
        <h2>Live Data Stream</h2>
        
        <div class="display-value">
            Count: {{ count }}
        </div>
        
        <div class="controls">
            <p>The counter below increases every second in the background.</p>
            <p>Since we are <strong>OnPush</strong> and not using Async Pipe, UI doesn't update despite data changing.</p>
            
            <button (click)="manualCheck()" class="btn-primary">Call detectChanges()</button>
        </div>
      </div>
      
      <div class="flash-indicator">
        Last Checked: {{ lastChecked | date:'mediumTime' }}
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
      text-align: center;
    }
    
    .display-value { font-size: 3rem; font-weight: bold; color: var(--accent-color); margin: 20px 0; }
    
    .controls { margin-top: 20px; color: var(--text-secondary); }
    
    button { 
        margin-top: 15px; 
        padding: 10px 20px; 
        background: var(--primary-color); 
        color: white; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer;
        font-size: 1rem;
    }
    
    .flash-indicator { text-align: center; color: var(--text-muted); font-family: monospace; }
  `]
})
export class ManualDetectionComponent implements OnInit {
  count = 0;
  lastChecked = new Date();

  constructor(private cdr: ChangeDetectorRef) { }

  // 🕒 LIFECYCLE HOOK: ngOnInit
  // WHY HERE?
  // 1. Component Ready: The component is initialized and about to be displayed.
  // 2. Start Background Process: We start a setInterval to simulate a live data stream.
  //    This is a common pattern for timers, WebSocket connections, or polling.
  //
  // ⚠️ IMPORTANT for OnPush:
  // The counter updates every second, but the UI won't update automatically
  // because we're using OnPush strategy. We must call detectChanges() manually.
  //
  // 🛡️ CLEANUP NOTE: In a real app, you MUST clear the interval in ngOnDestroy!
  ngOnInit() {
    setInterval(() => {
      this.count++;
      console.log(`[ManualDetection] Count increments to ${this.count}, but UI won't update automatically.`);
    }, 1000);
  }

  manualCheck() {
    this.lastChecked = new Date();
    // 🛡️ CRITICAL: Manually running CD for this component and children
    this.cdr.detectChanges();
  }
}
