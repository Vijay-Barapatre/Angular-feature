import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from './truncate.pipe';

@Component({
    selector: 'app-custom-pipe',
    standalone: true,
    imports: [CommonModule, RouterLink, TruncatePipe, FormsModule],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>✨ Use Case 2: Custom Pipe</h1>
        <p class="header-description">Create your own pipes for reusable transformation logic.</p>
      </div>

      <div class="concept-card">
        <h2>The <code>TruncatePipe</code></h2>
        <p>We created a pipe that shortens long text and adds "..."</p>
        <pre><code>{{ 'Some long text' | truncate:10 }}</code></pre>
      </div>

      <div class="demo-box">
        <h3>Live Demo</h3>
        <div class="control-panel">
          <label>Enter text:</label>
          <input type="text" [(ngModel)]="text" class="input-field">
          
          <label>Limit:</label>
          <input type="number" [(ngModel)]="limit" class="input-field small">
        </div>

        <div class="result-display">
          <h4>Result:</h4>
          <p class="output">{{ text | truncate:limit }}</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .concept-card {
      background: var(--bg-secondary);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      border-left: 5px solid var(--accent-color);
    }
    
    .demo-box {
      background: var(--bg-card);
      padding: 25px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }
    
    .control-panel {
      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .input-field {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: var(--bg-secondary);
      color: var(--text-primary);
    }
    
    .input-field.small { width: 80px; }
    
    .result-display {
      background: var(--bg-secondary);
      padding: 15px;
      border-radius: 8px;
    }
    .output { font-size: 1.2rem; color: var(--success); font-weight: bold; }
  `]
})
export class CustomPipeComponent {
    text: string = 'This is a very long text that needs to be shortened because it takes too much space.';
    limit: number = 20;
}
