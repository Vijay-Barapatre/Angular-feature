import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Pure Pipe
@Pipe({
    name: 'pureFilter',
    standalone: true,
    pure: true // Default is true
})
export class PureFilterPipe implements PipeTransform {
    transform(items: string[], term: string): string[] {
        console.log('[PureFilterPipe] Calculating...');
        if (!term) return items;
        return items.filter(item => item.toLowerCase().includes(term.toLowerCase()));
    }
}

// Impure Pipe
@Pipe({
    name: 'impureFilter',
    standalone: true,
    pure: false // Recalculates on EVERY change detection cycle
})
export class ImpureFilterPipe implements PipeTransform {
    transform(items: string[], term: string): string[] {
        console.log('[ImpureFilterPipe] Calculating...');
        if (!term) return items;
        return items.filter(item => item.toLowerCase().includes(term.toLowerCase()));
    }
}

@Component({
    selector: 'app-pure-impure-pipes',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, PureFilterPipe, ImpureFilterPipe],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>⚡ Pure vs Impure Pipes</h1>
        <p class="header-description">Understanding the performance optimization of pipes.</p>
      </div>

      <div class="comparison-grid">
        <div class="card pure">
          <h2>Pure Pipe</h2>
          <p>Only runs when <strong>input reference</strong> changes.</p>
          <div class="list-container">
            <div *ngFor="let item of items | pureFilter:filterTerm" class="item">{{ item }}</div>
          </div>
          <p class="status">
            Mutating the array (push) <br>
            <strong>WON'T</strong> trigger update! ❌
          </p>
        </div>

        <div class="card impure">
          <h2>Impure Pipe</h2>
          <p>Runs on <strong>every change detection</strong> cycle.</p>
          <div class="list-container">
            <div *ngFor="let item of items | impureFilter:filterTerm" class="item">{{ item }}</div>
          </div>
          <p class="status">
            Mutating the array (push) <br>
            <strong>WILL</strong> trigger update! ✅
          </p>
        </div>
      </div>

      <div class="control-panel">
        <input type="text" [(ngModel)]="filterTerm" placeholder="Filter..." class="input-field">
        <input type="text" #newItem placeholder="New item" class="input-field">
        <button (click)="addItem(newItem.value); newItem.value=''" class="btn-add">
          Add Item (Mutation)
        </button>
        <button (click)="resetItems()" class="btn-reset">
          Reset Reference (New Array)
        </button>
      </div>
      
      <div class="console-hint">
        ℹ️ Check the browser console to see how many times each pipe runs!
      </div>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 900px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .card {
      background: var(--bg-secondary);
      padding: 20px;
      border-radius: 10px;
      border: 2px solid transparent;
    }
    .card.pure { border-color: var(--success); }
    .card.impure { border-color: var(--warning); }
    
    .list-container {
      background: var(--bg-card);
      height: 150px;
      overflow-y: auto;
      padding: 10px;
      border-radius: 6px;
      margin: 15px 0;
    }
    .item { padding: 5px; border-bottom: 1px solid var(--border-color); }
    
    .status { font-size: 0.9em; color: var(--text-secondary); line-height: 1.5; }
    
    .control-panel {
      background: var(--bg-secondary);
      padding: 20px;
      border-radius: 10px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .input-field { padding: 8px; border-radius: 4px; border: 1px solid var(--border-color); }
    
    .btn-add { background: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    .btn-reset { background: var(--accent-color); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    
    .console-hint { text-align: center; margin-top: 20px; color: var(--text-muted); font-style: italic; }
  `]
})
export class PureImpurePipesComponent {
    filterTerm = '';
    items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

    addItem(name: string) {
        if (!name) return;
        // Mutation: Pushing to existing array
        this.items.push(name);
    }

    resetItems() {
        // New Reference: Creating new array
        this.items = [...this.items];
    }
}
