import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-json-keyvalue-pipe',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>🔧 Use Case 5: Utilities</h1>
        <p class="header-description">Debugging with JSON pipe and Iterating Objects with KeyValue pipe.</p>
      </div>

      <div class="demo-box">
        <h2>🛠️ JSON Pipe for Debugging</h2>
        <p>Quickly inspect object structure in your template.</p>
        <div class="code-preview">
          <pre>{{ user | json }}</pre>
        </div>
      </div>

      <div class="demo-box">
        <h2>🔑 KeyValue Pipe</h2>
        <p>Iterate over Objects or Maps (Angular normally only iterates Arrays).</p>
        
        <div class="dictionary-view">
          <div *ngFor="let item of config | keyvalue" class="row">
            <span class="key">{{ item.key }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
        
        <h3>With Custom Comparator</h3>
        <p>Sort by Key (Descending):</p>
        <div class="dictionary-view">
          <div *ngFor="let item of config | keyvalue: descOrder" class="row">
            <span class="key">{{ item.key }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
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
    
    .code-preview {
      background: var(--bg-card);
      padding: 15px;
      border-radius: 6px;
      color: var(--accent-color);
      overflow-x: auto;
    }
    
    .dictionary-view {
      background: var(--bg-card);
      border-radius: 8px;
      overflow: hidden;
      margin-top: 15px;
    }
    .row {
      display: flex;
      padding: 10px 15px;
      border-bottom: 1px solid var(--border-color);
    }
    .row:last-child { border-bottom: none; }
    .key { flex: 1; font-weight: bold; color: var(--text-primary); }
    .value { flex: 2; color: var(--text-secondary); font-family: monospace; }
  `]
})
export class JsonKeyValuePipeComponent {
    user = {
        id: 42,
        username: 'jdoe',
        roles: ['admin', 'editor'],
        metadata: {
            lastLogin: '2025-12-08',
            active: true
        }
    };

    config = {
        theme: 'dark',
        version: '1.0.5',
        apiEndpoint: 'https://api.myapp.com',
        timeout: 5000
    };

    // Comparator to sort keys in descending order
    descOrder = (a: any, b: any) => {
        if (a.key < b.key) return 1;
        return -1;
    }
}
