import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-built-in-pipes',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>🛠️ Built-in Pipes</h1>
        <p class="header-description">Angular provides many built-in pipes for common data transformations.</p>
      </div>

      <div class="demo-box">
        <h2>📅 Date Pipe</h2>
        <div class="example">
          <p>Original: <code>{{ today }}</code></p>
          <p>Short: <code>{{ today | date:'short' }}</code></p>
          <p>Full: <code>{{ today | date:'fullDate' }}</code></p>
          <p>Custom: <code>{{ today | date:'dd/MM/yyyy' }}</code></p>
        </div>
      </div>

      <div class="demo-box">
        <h2>🔤 Text Transformation</h2>
        <div class="example">
          <p>Original: <code>{{ message }}</code></p>
          <p>Uppercase: <code>{{ message | uppercase }}</code></p>
          <p>Lowercase: <code>{{ message | lowercase }}</code></p>
          <p>Titlecase: <code>{{ message | titlecase }}</code></p>
        </div>
      </div>

      <div class="demo-box">
        <h2>💰 Currency & Percent</h2>
        <div class="example">
          <p>Price: <code>{{ price | currency }}</code></p>
          <p>Price (EUR): <code>{{ price | currency:'EUR' }}</code></p>
          <p>Percentage: <code>{{ progress | percent }}</code></p>
          <p>Percentage (Fixed): <code>{{ progress | percent:'1.0-1' }}</code></p>
        </div>
      </div>
      
      <div class="demo-box">
        <h2>📦 JSON Pipe</h2>
        <p>Useful for debugging objects:</p>
        <pre class="json-debug">{{ complexObject | json }}</pre>
      </div>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .demo-box {
      background: var(--bg-secondary);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      border: 1px solid var(--border-color);
    }
    .demo-box h2 { margin-top: 0; color: var(--primary-light); border-bottom: 1px solid var(--border-color); padding-bottom: 10px; }
    
    .example p { margin: 10px 0; font-family: monospace; font-size: 1.1em; }
    code { background: var(--bg-card); padding: 4px 8px; border-radius: 4px; color: var(--accent-color); }
    
    .json-debug {
        background: var(--bg-card);
        padding: 15px;
        border-radius: 6px;
        color: var(--warning);
        font-family: monospace;
    }
  `]
})
export class BuiltInPipesComponent {
    today = new Date();
    message = 'hello angular world';
    price = 1234.56;
    progress = 0.45;
    complexObject = {
        id: 101,
        name: 'Product A',
        features: ['fast', 'reliable', 'secure']
    };
}
