import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-async-subject-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>4. AsyncSubject (The Finalist)</h2>
      <p class="description">
        Emits only the LAST value and only upon completion. <br>
        <strong>Key Characteristic:</strong> Subscribers wait until <code>complete()</code> is called.
      </p>

      <div class="controls">
        <button [disabled]="completed" (click)="emitValue()">📢 Emit Next Value ({{ counter }})</button>
        <button [disabled]="completed" (click)="complete()">✅ Complete</button>
        <button [disabled]="subA" (click)="subscribeA()">👤 Subscribe A</button>
        <button [disabled]="subB" (click)="subscribeB()">👤 Subscribe B</button>
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
    .description { background: #ffebee; padding: 10px; border-radius: 4px; border-left: 4px solid #f44336; }
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
export class AsyncSubjectDemoComponent implements OnDestroy {
  private subject = new AsyncSubject<number>();
  counter = 1;
  completed = false;

  subA: Subscription | null = null;
  subB: Subscription | null = null;

  logs: { time: string, message: string, type: 'type-emit' | 'type-sub' | 'type-val' }[] = [];

  emitValue() {
    const val = this.counter++;
    this.addLog(`📢 AsyncSubject emits: ${val} (Not sent to subscribers yet)`, 'type-emit');
    this.subject.next(val);
  }

  complete() {
    this.addLog('✅ AsyncSubject completed!', 'type-emit');
    this.completed = true;
    this.subject.complete();
  }

  subscribeA() {
    this.addLog('👤 Subscriber A joins', 'type-sub');
    this.subA = this.subject.subscribe(val => {
      this.addLog(`👤 A received: ${val}`, 'type-val');
    });
  }

  subscribeB() {
    this.addLog('👤 Subscriber B joins', 'type-sub');
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
