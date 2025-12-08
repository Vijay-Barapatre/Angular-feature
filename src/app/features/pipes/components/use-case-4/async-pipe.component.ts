import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, timer, map, scan, take } from 'rxjs';

@Component({
    selector: 'app-async-pipe',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>⏳ Use Case 4: Async Pipe</h1>
        <p class="header-description">Automatically subscribe and unsubscribe from Observables and Promises.</p>
      </div>

      <div class="demo-box">
        <h2>Observable Stream</h2>
        <div class="display-area">
          <div class="value-display">
            <span class="label">Current Count:</span>
            <span class="value">{{ count$ | async }}</span>
          </div>
          <p class="subtitle">Updates every second automatically!</p>
        </div>
        <div class="code-snippet">
          <code>{{ '{{' }} count$ | async {{ '}}' }}</code>
        </div>
      </div>

      <div class="demo-box">
        <h2>Promise Resolution</h2>
        <div class="display-area">
          <div class="value-display">
            <span class="label">Status:</span>
            <span class="value" [class.loading]="!(data$ | async)">
              {{ (data$ | async) || 'Loading...' }}
            </span>
          </div>
        </div>
        <button (click)="refreshPromise()" class="btn-refresh">Refresh Promise</button>
      </div>

      <div class="info-card">
        <h3>Why use <code>async</code> pipe?</h3>
        <ul>
          <li>✅ Automatic subscription</li>
          <li>✅ Automatic <strong>unsubscription</strong> (prevents memory leaks)</li>
          <li>✅ Triggers change detection when new values arrive</li>
          <li>✅ Makes code cleaner (no manual .subscribe())</li>
        </ul>
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
    
    .value-display { font-size: 2rem; margin: 20px 0; }
    .label { color: var(--text-secondary); font-size: 1rem; vertical-align: middle; margin-right: 10px; }
    .value { font-weight: bold; color: var(--accent-color); vertical-align: middle; }
    .subtitle { color: var(--text-muted); }
    
    .code-snippet { background: var(--bg-card); display: inline-block; padding: 4px 12px; border-radius: 15px; margin-top: 10px; }
    .code-snippet code { font-family: monospace; color: var(--primary-light); }
    
    .btn-refresh {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
    }
    .btn-refresh:hover { transform: translateY(-2px); }
    
    .info-card {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      padding: 25px;
      border-radius: 12px;
      border: 1px solid var(--primary-light);
    }
    .info-card ul { list-style: none; padding: 0; }
    .info-card li { margin: 10px 0; font-size: 1.1em; }
  `]
})
export class AsyncPipeComponent {
    // Observable that emits every second
    count$: Observable<number> = timer(0, 1000).pipe(
        map(v => v + 1),
        take(100)
    );

    data$: Promise<string> | null = null;

    constructor() {
        this.refreshPromise();
    }

    refreshPromise() {
        this.data$ = new Promise(resolve => {
            setTimeout(() => resolve('Data Loaded Successfully! 🚀'), 2000);
        });
    }
}
