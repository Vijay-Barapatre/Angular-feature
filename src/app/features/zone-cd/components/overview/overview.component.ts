import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-zone-cd-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="overview-container fade-in">
      <div class="header-section">
        <h1>Zone.js & Change Detection</h1>
        <p class="subtitle">Mastering the Engine of Angular</p>
      </div>

      <div class="intro-card">
        <h2>What triggers Angular?</h2>
        <p>
          Angular relies on a library called <strong>Zone.js</strong> to intercept asynchronous events 
          (like clicks, timers, HTTP). When these finish, Zone.js tells Angular: 
          <em>"Something happened, you should check for changes!"</em>
        </p>
      </div>

      <div class="features-grid">
        <a routerLink="use-case-1" class="feature-card">
          <div class="icon">🎯</div>
          <h3>Execution Context</h3>
          <p>Visualize code running Inside vs Outside the NgZone.</p>
        </a>

        <a routerLink="use-case-2" class="feature-card">
          <div class="icon">🚀</div>
          <h3>Performance</h3>
          <p>Using <code>runOutsideAngular</code> for heavyweight tasks.</p>
        </a>

        <a routerLink="use-case-3" class="feature-card">
          <div class="icon">⚡</div>
          <h3>Strategies</h3>
          <p>Deep dive into <code>Default</code> vs <code>OnPush</code> strategy.</p>
        </a>

        <a routerLink="use-case-4" class="feature-card">
          <div class="icon">🔧</div>
          <h3>Manual Control</h3>
          <p>Using <code>detectChanges</code> and <code>markForCheck</code> manually.</p>
        </a>
        
        <a routerLink="use-case-5" class="feature-card">
          <div class="icon">🧊</div>
          <h3>Detach / Reattach</h3>
          <p>Completely freezing parts of the UI for performance.</p>
        </a>
      </div>

      <div class="exercise-promo">
        <div class="content">
          <h3>🎓 Ready for a challenge?</h3>
          <p>Fix a "Laggy Timer" that is killing the app's performance!</p>
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
