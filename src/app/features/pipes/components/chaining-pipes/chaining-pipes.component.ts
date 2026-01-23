import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-chaining-pipes',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>🔗 Chaining Pipes</h1>
        <p class="header-description">Combine multiple pipes to perform complex transformations.</p>
      </div>

      <div class="demo-box">
        <h2>Date + Uppercase</h2>
        <div class="example">
          <p>Original: <code>{{ today }}</code></p>
          <p>Chained: <code>{{ today | date:'fullDate' | uppercase }}</code></p>
        </div>
      </div>

      <div class="demo-box">
        <h2>Slice + Uppercase</h2>
        <div class="example">
          <p>Original: <code>{{ list }}</code></p>
          <p>Slice(0,3): <code>{{ list | slice:0:3 }}</code></p>
          <p>Slice + JSON: <code>{{ list | slice:0:3 | json }}</code></p>
        </div>
      </div>
      
      <div class="info-card">
        <h3>💡 How it works</h3>
        <p>
            Pipe operators <code>|</code> are executed from <strong>left to right</strong>.
            The output of the first pipe becomes the input of the second.
        </p>
        <div class="visual-chain">
            <span>Input</span> 
            <span class="arrow">→</span>
            <span class="pipe">Pipe 1</span>
            <span class="arrow">→</span>
            <span class="pipe">Pipe 2</span>
            <span class="arrow">→</span>
            <span>Output</span>
        </div>
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
    .example p { margin: 10px 0; font-size: 1.1em; }
    code { background: var(--bg-card); padding: 4px 8px; border-radius: 4px; color: var(--accent-color); font-family: monospace; }
    
    .info-card {
      background: var(--bg-card);
      padding: 25px;
      border-radius: 12px;
      text-align: center;
    }
    .visual-chain {
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }
    .pipe {
        background: var(--primary-color);
        color: white;
        padding: 5px 15px;
        border-radius: 15px;
    }
    .arrow { color: var(--text-muted); }
  `]
})
export class ChainingPipesComponent {
    today = new Date();
    list = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
}
