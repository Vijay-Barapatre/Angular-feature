import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pipes-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="overview-container fade-in">
      <div class="header-section">
        <h1>Transforming Data with Pipes</h1>
        <p class="subtitle">Master Angular's powerful data transformation tool</p>
      </div>

      <div class="intro-card">
        <h2>What are Pipes?</h2>
        <p>
          Pipes are simple functions to use in template expressions to accept an input value 
          and return a transformed value. They are useful because you can use them throughout 
          your application, while only declaring each pipe once.
        </p>
        <div class="code-preview">
          <code>{{ 'Hello' | uppercase }}</code>
          <span class="arrow">→</span>
          <span class="result">HELLO</span>
        </div>
      </div>

      <div class="features-grid">
        <a routerLink="built-in-pipes" class="feature-card">
          <div class="icon">🛠️</div>
          <h3>Built-in Pipes</h3>
          <p>Date, Currency, Percent, and Text transformation</p>
        </a>

        <a routerLink="custom-pipe" class="feature-card">
          <div class="icon">✨</div>
          <h3>Custom Pipes</h3>
          <p>Create your own reusable transformation logic</p>
        </a>

        <a routerLink="pure-impure-pipes" class="feature-card">
          <div class="icon">⚡</div>
          <h3>Pure vs Impure</h3>
          <p>Understand performance and change detection</p>
        </a>

        <a routerLink="async-pipe" class="feature-card">
          <div class="icon">⏳</div>
          <h3>Async Pipe</h3>
          <p>Handle Observables and Promises automatically</p>
        </a>
        
        <a routerLink="json-keyvalue-pipe" class="feature-card">
          <div class="icon">🔧</div>
          <h3>Debugging & Utils</h3>
          <p>JSON pipe and KeyValue pipe deep dive</p>
        </a>

        <a routerLink="chaining-pipes" class="feature-card">
          <div class="icon">🔗</div>
          <h3>Chaining</h3>
          <p>Combine multiple pipes for complex results</p>
        </a>
      </div>

      <div class="exercise-promo">
        <div class="content">
          <h3>🎓 Ready for a challenge?</h3>
          <p>Build a Filtering Pipe to search through a product list!</p>
          <a routerLink="exercise" class="btn-exercise">Start Exercise</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overview-container { max-width: 1000px; margin: 0 auto; padding: 20px; }
    .header-section { text-align: center; margin-bottom: 40px; }
    h1 { font-size: 2.5rem; margin-bottom: 10px; color: var(--primary-color); }
    .subtitle { font-size: 1.2rem; color: var(--text-secondary); }
    
    .intro-card {
      background: var(--bg-secondary);
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 40px;
      border-left: 5px solid var(--accent-color);
    }
    .code-preview {
      background: var(--bg-card);
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      font-family: monospace;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .arrow { color: var(--text-muted); }
    .result { color: var(--success); font-weight: bold; }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .feature-card {
      background: var(--bg-secondary);
      padding: 25px;
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid var(--border-color);
    }
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      border-color: var(--primary-color);
    }
    .icon { font-size: 2rem; margin-bottom: 15px; }
    .feature-card h3 { margin: 0 0 10px 0; color: var(--primary-light); }
    .feature-card p { margin: 0; color: var(--text-secondary); font-size: 0.9rem; }

    .exercise-promo {
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      border-radius: 12px;
      padding: 40px;
      text-align: center;
      color: white;
    }
    .btn-exercise {
      display: inline-block;
      background: white;
      color: var(--primary-color);
      padding: 12px 24px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
      transition: transform 0.2s;
    }
    .btn-exercise:hover { transform: scale(1.05); }
  `]
})
export class OverviewComponent { }
