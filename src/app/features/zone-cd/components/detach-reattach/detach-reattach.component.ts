import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-detach-reattach',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/zone-cd" class="back-link">← Back to Overview</a>
        <h1>🧊 Detach & Reattach</h1>
        <p class="header-description">Completely disabling CD for a component subtree.</p>
      </div>

      <div class="control-panel">
        <button (click)="detach()" class="btn-freeze" [disabled]="isDetached">🧊 Freeze (Detach)</button>
        <button (click)="reattach()" class="btn-thaw" [disabled]="!isDetached">🔥 Thaw (Reattach)</button>
        <span class="status" [class.frozen]="isDetached">
            Status: {{ isDetached ? 'DETACHED' : 'ATTACHED' }}
        </span>
      </div>

      <div class="demo-box" [class.frozen-border]="isDetached">
        <h2>Live Random Number Generator</h2>
        <div class="grid">
            <div *ngFor="let num of numbers" class="num-box">
                {{ num }}
            </div>
        </div>
      </div>
      
      <p class="hint">
        When Detached, the numbers below KEEP changing in memory (check console), 
        but the UI stops updating completely.
      </p>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .control-panel {
        background: var(--bg-secondary);
        padding: 15px;
        border-radius: 8px;
        display: flex;
        gap: 15px;
        align-items: center;
        margin-bottom: 20px;
    }
    
    button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; color: white; font-weight: bold; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-freeze { background: #2196f3; }
    .btn-thaw { background: #ff9800; }
    
    .status { font-weight: bold; margin-left: auto; }
    .status.frozen { color: #2196f3; }
    
    .demo-box {
        border: 2px solid var(--success);
        padding: 20px;
        border-radius: 12px;
        transition: border-color 0.3s;
    }
    .demo-box.frozen-border { border-color: #2196f3; opacity: 0.7; }
    
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        gap: 10px;
    }
    .num-box {
        background: var(--bg-card);
        padding: 10px;
        text-align: center;
        border-radius: 4px;
        font-family: monospace;
    }
    
    .hint { margin-top: 20px; color: var(--text-secondary); text-align: center; }
  `]
})
export class DetachReattachComponent {
    numbers: number[] = [];
    isDetached = false;

    constructor(private cdr: ChangeDetectorRef) {
        // Generate initial numbers
        this.numbers = Array(20).fill(0).map(() => Math.floor(Math.random() * 100));

        // Update numbers periodically
        setInterval(() => {
            this.numbers = this.numbers.map(() => Math.floor(Math.random() * 100));
            // console.log('Data updated');
        }, 1000);
    }

    detach() {
        this.cdr.detach();
        this.isDetached = true;
    }

    reattach() {
        this.cdr.reattach();
        this.isDetached = false;
        // Optional: force check immediately upon reattach so user sees current state
        this.cdr.detectChanges();
    }
}
