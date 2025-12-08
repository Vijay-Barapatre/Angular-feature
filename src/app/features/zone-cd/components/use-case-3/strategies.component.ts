import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-child-default',
    standalone: true,
    template: `
    <div class="child-card default">
      <h4>Default Strategy</h4>
      <p>Data: {{ data.value }}</p>
      <div class="flash">{{ flash() }}</div>
    </div>
  `,
    styles: [`
    .child-card { padding: 15px; border-radius: 8px; margin-top: 10px; border: 2px solid #ccc; }
    .default { border-color: var(--warning); background: #fff3e0; }
  `]
})
export class ChildDefaultComponent {
    @Input() data: any;

    flash() {
        console.log('[ChildDefault] Checked');
        return '⚡ Checked';
    }
}

@Component({
    selector: 'app-child-onpush',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="child-card onpush">
      <h4>OnPush Strategy</h4>
      <p>Data: {{ data.value }}</p>
      <div class="flash">{{ flash() }}</div>
    </div>
  `,
    styles: [`
    .child-card { padding: 15px; border-radius: 8px; margin-top: 10px; border: 2px solid #ccc; }
    .onpush { border-color: var(--success); background: #e8f5e9; }
  `]
})
export class ChildOnPushComponent {
    @Input() data: any;

    flash() {
        console.log('[ChildOnPush] Checked');
        return '⚡ Checked';
    }
}

@Component({
    selector: 'app-strategies',
    standalone: true,
    imports: [CommonModule, RouterLink, ChildDefaultComponent, ChildOnPushComponent],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/zone-cd" class="back-link">← Back to Overview</a>
        <h1>⚡ Use Case 3: Strategies</h1>
        <p class="header-description">Comparing Default vs OnPush Change Detection.</p>
      </div>

      <div class="demo-box">
        <div class="actions">
          <button (click)="mutateData()" class="btn-warning">Mutate Data (Same Ref)</button>
          <button (click)="newData()" class="btn-primary">New Data (New Ref)</button>
          <button (click)="triggerEvent()" class="btn-neutral">Trigger Irrelevant Event</button>
        </div>

        <div class="comparison-grid">
            <app-child-default [data]="data"></app-child-default>
            <app-child-onpush [data]="data"></app-child-onpush>
        </div>
        
        <div class="explanations">
            <div class="exp">
                <strong>Default:</strong> Updates on Mutation, New Ref, AND Irrelevant Events. 
                Always checks.
            </div>
            <div class="exp">
                <strong>OnPush:</strong> Only updates on New Reference (Input change). 
                Ignores Mutation and Parent Events.
            </div>
        </div>
      </div>
      
      <p class="console-hint">ℹ️ Check Console logs to see exactly when each component is checked!</p>
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
    
    .actions { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    button { padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; color: white; font-weight: bold; }
    .btn-warning { background: var(--warning); }
    .btn-primary { background: var(--primary-color); }
    .btn-neutral { background: var(--text-secondary); }
    
    .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    
    .explanations { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.9rem; }
    .console-hint { text-align: center; color: var(--text-muted); font-style: italic; }
  `]
})
export class StrategiesComponent {
    data = { value: 1 };

    mutateData() {
        this.data.value++;
        // Default: Updates
        // OnPush: Does NOT update (Ref is same)
    }

    newData() {
        this.data = { value: this.data.value + 1 };
        // Both Update (Ref changed)
    }

    triggerEvent() {
        // Just an event to trigger CD in parent
        console.log('Parent Event Triggered');
    }
}
