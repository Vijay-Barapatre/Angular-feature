import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>1. Subject (The Speaker)</h2>
      <p class="description">
        Acts like a standard event emitter. <br>
        <strong>Key Characteristic:</strong> Late subscribers MISS past values. It does NOT hold a current value.
      </p>

      <div class="controls">
        <button (click)="emitValue()">📢 Emit Next Value ({{ counter }})</button>
        <button [disabled]="subA" (click)="subscribeA()">👤 Subscribe A (Early)</button>
        <button [disabled]="subB" (click)="subscribeB()">👤 Subscribe B (Late)</button>
      </div>

      <div class="logs">
        <h3>Activity Log:</h3>
        <div *ngFor="let log of logs" class="log-item" [ngClass]="log.type">
          <span class="time">{{ log.time }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 600px; }
    .description { background: #eef; padding: 10px; border-radius: 4px; border-left: 4px solid #3f51b5; }
    .controls { display: flex; gap: 10px; margin: 20px 0; }
    button { padding: 8px 16px; cursor: pointer; }
    .logs { background: #f5f5f5; padding: 15px; border-radius: 8px; height: 300px; overflow-y: auto; }
    .log-item { padding: 4px 8px; border-bottom: 1px solid #ddd; font-family: monospace; }
    .type-emit { color: #2196f3; font-weight: bold; }
    .type-sub { color: #4caf50; font-style: italic; }
    .type-val { color: #333; }
    .time { color: #888; margin-right: 10px; font-size: 0.8em; }
  `]
})
export class SubjectDemoComponent implements OnDestroy {
  private subject = new Subject<number>();
  public counter = 1;

  subA: Subscription | null = null;
  subB: Subscription | null = null;

  logs: { time: string, message: string, type: 'type-emit' | 'type-sub' | 'type-val' }[] = [];

  emitValue() {
    const val = this.counter++;
    this.addLog(`📢 Subject emits: ${val}`, 'type-emit');
    this.subject.next(val);
  }

  subscribeA() {
    this.addLog('👤 Subscriber A joins', 'type-sub');
    this.subA = this.subject.subscribe(val => {
      this.addLog(`👤 A received: ${val}`, 'type-val');
    });
  }

  subscribeB() {
    this.addLog('👤 Subscriber B joins (Late)', 'type-sub');
    this.subB = this.subject.subscribe(val => {
      this.addLog(`👤 B received: ${val}`, 'type-val');
    });
  }

  addLog(message: string, type: 'type-emit' | 'type-sub' | 'type-val') {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift({ time, message, type });
  }

  ngOnDestroy() {
    this.subA?.unsubscribe();
    this.subB?.unsubscribe();
  }
}
