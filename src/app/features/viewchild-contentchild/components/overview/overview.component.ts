/**
 * VIEWCHILD AND CONTENTCHILD - OVERVIEW COMPONENT
 * 
 * This is the landing page for the ViewChild/ContentChild feature module.
 * It provides an introduction to component querying and content projection concepts.
 * 
 * KEY CONCEPTS COVERED:
 * 1. @ViewChild - Access child components in the view template
 * 2. @ViewChildren - Access multiple child components
 * 3. @ContentChild - Access projected content
 * 4. @ContentChildren - Access multiple projected children
 * 5. Lifecycle timing - When queries are resolved
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface UseCase {
  id: number;
  title: string;
  path: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  concepts: string[];
}

@Component({
  selector: 'app-viewchild-contentchild-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="overview-container">
      <header class="feature-header">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h1>📍 ViewChild & ContentChild</h1>
        <p class="tagline">Master component queries and content projection in Angular</p>
      </header>

      <!-- Concept Introduction -->
      <section class="intro-section card">
        <h2>🎯 What You'll Learn</h2>
        <div class="intro-grid">
          <div class="intro-item">
            <div class="intro-icon">👁️</div>
            <h3>&#64;ViewChild</h3>
            <p>Access child components and DOM elements declared in your component's template.</p>
          </div>
          <div class="intro-item">
            <div class="intro-icon">👁️‍🗨️</div>
            <h3>&#64;ViewChildren</h3>
            <p>Query multiple children at once and respond to dynamic changes.</p>
          </div>
          <div class="intro-item">
            <div class="intro-icon">📦</div>
            <h3>&#64;ContentChild</h3>
            <p>Access content projected into your component via ng-content.</p>
          </div>
          <div class="intro-item">
            <div class="intro-icon">📦📦</div>
            <h3>&#64;ContentChildren</h3>
            <p>Query multiple projected children and manage complex content.</p>
          </div>
        </div>
      </section>

      <!-- Visual Diagram -->
      <section class="diagram-section card">
        <h2>🔍 View vs Content: The Key Difference</h2>
        <p class="diagram-intro">Understanding the distinction between View and Content is crucial:</p>
        
        <div class="comparison-grid">
          <div class="comparison-item">
            <h3>View Children (&#64;ViewChild)</h3>
            <div class="code-example">
              <code>
                &lt;div&gt;<br>
                &nbsp;&nbsp;&lt;child-component&gt;&lt;/child-component&gt;<br>
                &nbsp;&nbsp;&lt;div #myDiv&gt;&lt;/div&gt;<br>
                &lt;/div&gt;
              </code>
            </div>
            <p>Elements defined in <strong>your own template</strong></p>
            <ul>
              <li>Available in <code>AfterViewInit</code></li>
              <li>Use &#64;ViewChild or &#64;ViewChildren</li>
            </ul>
          </div>

          <div class="comparison-item">
            <h3>Content Children (&#64;ContentChild)</h3>
            <div class="code-example">
              <code>
                &lt;my-card&gt;<br>
                &nbsp;&nbsp;&lt;header-component&gt;&lt;/header-component&gt;<br>
                &lt;/my-card&gt;
              </code>
            </div>
            <p>Elements <strong>projected from parent</strong> via ng-content</p>
            <ul>
              <li>Available in <code>AfterContentInit</code></li>
              <li>Use &#64;ContentChild or &#64;ContentChildren</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Use Cases Grid -->
      <section class="use-cases-section">
        <h2>📚 Learning Path</h2>
        <p class="section-intro">Follow these use cases in order to build your understanding:</p>
        
        <div class="use-cases-grid">
          <div *ngFor="let useCase of useCases" class="use-case-card" [class.beginner]="useCase.difficulty === 'Beginner'"
               [class.intermediate]="useCase.difficulty === 'Intermediate'" [class.advanced]="useCase.difficulty === 'Advanced'">
            <div class="card-header">
              <span class="use-case-number">{{ useCase.id }}</span>
              <span class="difficulty-badge">{{ useCase.difficulty }}</span>
            </div>
            <h3>{{ useCase.title }}</h3>
            <p class="description">{{ useCase.description }}</p>
            <div class="concepts">
              <span *ngFor="let concept of useCase.concepts" class="concept-tag">{{ concept }}</span>
            </div>
            <a [routerLink]="useCase.path" class="btn btn-primary">Start Learning →</a>
          </div>
        </div>
      </section>

      <!-- Exercise CTA -->
      <section class="exercise-cta card">
        <h2>🚀 Ready to Practice?</h2>
        <p>Test your knowledge with hands-on exercises!</p>
        <a routerLink="exercise" class="btn btn-accent">Start Exercise</a>
      </section>
    </div>
  `,
  styles: [`
    .overview-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--spacing-xl);
    }

    .feature-header {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }

    .back-link {
      display: inline-block;
      color: var(--primary-light);
      text-decoration: none;
      margin-bottom: var(--spacing-md);
      transition: color var(--transition-fast);
    }

    .back-link:hover {
      color: var(--accent-color);
    }

    .feature-header h1 {
      font-size: 3rem;
      margin-bottom: var(--spacing-sm);
      background: linear-gradient(135deg, var(--primary-light), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .tagline {
      font-size: 1.25rem;
      color: var(--text-secondary);
    }

    .card {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      margin-bottom: var(--spacing-2xl);
      border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .intro-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
      margin-top: var(--spacing-lg);
    }

    .intro-item {
      text-align: center;
      padding: var(--spacing-lg);
      background: var(--bg-card);
      border-radius: var(--radius-md);
      transition: transform var(--transition-normal);
    }

    .intro-item:hover {
      transform: translateY(-5px);
    }

    .intro-icon {
      font-size: 3rem;
      margin-bottom: var(--spacing-md);
    }

    .intro-item h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-sm);
    }

    .intro-item p {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .diagram-section h2 {
      margin-bottom: var(--spacing-md);
    }

    .diagram-intro {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-xl);
    }

    .comparison-item {
      background: var(--bg-primary);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      border: 2px solid var(--primary-color);
    }

    .comparison-item h3 {
      color: var(--accent-color);
      margin-bottom: var(--spacing-md);
    }

    .code-example {
      background: #1e293b;
      padding: var(--spacing-md);
      border-radius: var(--radius-sm);
      margin-bottom: var(--spacing-md);
      overflow-x: auto;
    }

    .code-example code {
      color: #94a3b8;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .comparison-item ul {
      list-style: none;
      padding: 0;
    }

    .comparison-item li {
      padding: var(--spacing-xs) 0;
      color: var(--text-muted);
    }

    .comparison-item code {
      background: rgba(102, 126, 234, 0.1);
      padding: 2px 6px;
      border-radius: 3px;
      color: var(--primary-light);
    }

    .section-intro {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
    }

    .use-cases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--spacing-lg);
    }

    .use-case-card {
      background: var(--bg-card);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      border-left: 4px solid var(--primary-color);
      transition: transform var(--transition-normal);
    }

    .use-case-card:hover {
      transform: translateY(-5px);
    }

    .use-case-card.beginner {
      border-left-color: #10b981;
    }

    .use-case-card.intermediate {
      border-left-color: #f59e0b;
    }

    .use-case-card.advanced {
      border-left-color: #ef4444;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
    }

    .use-case-number {
      background: var(--primary-color);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .difficulty-badge {
      font-size: 0.75rem;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(102, 126, 234, 0.1);
      color: var(--text-muted);
    }

    .use-case-card.beginner .difficulty-badge {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    .use-case-card.intermediate .difficulty-badge {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }

    .use-case-card.advanced .difficulty-badge {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .use-case-card h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-sm);
    }

    .description {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
      font-size: 0.9rem;
    }

    .concepts {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-md);
    }

    .concept-tag {
      font-size: 0.75rem;
      padding: 4px 8px;
      background: rgba(102, 126, 234, 0.1);
      color: var(--primary-light);
      border-radius: 4px;
    }

    .exercise-cta {
      text-align: center;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      border: 2px dashed var(--accent-color);
    }

    .exercise-cta h2 {
      margin-bottom: var(--spacing-sm);
    }

    .exercise-cta p {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-lg);
    }

    .btn-accent {
      background: var(--accent-color);
      color: white;
      padding: 12px 24px;
      border-radius: var(--radius-md);
      text-decoration: none;
      display: inline-block;
      transition: transform var(--transition-fast);
    }

    .btn-accent:hover {
      transform: scale(1.05);
    }
  `]
})
export class OverviewComponent {
  useCases: UseCase[] = [
    {
      id: 1,
      title: 'Basic @ViewChild',
      path: 'basic-viewchild',
      description: 'Access child component instances and call methods directly from the parent.',
      difficulty: 'Beginner',
      concepts: ['@ViewChild', 'AfterViewInit', 'Component Reference']
    },
    {
      id: 2,
      title: '@ViewChild with Template Refs',
      path: 'template-references',
      description: 'Use template reference variables to access and manipulate DOM elements.',
      difficulty: 'Beginner',
      concepts: ['Template Refs', 'ElementRef', 'DOM Access']
    },
    {
      id: 3,
      title: '@ViewChildren',
      path: 'viewchildren',
      description: 'Query multiple child components and work with QueryList API.',
      difficulty: 'Intermediate',
      concepts: ['@ViewChildren', 'QueryList', 'Dynamic Children']
    },
    {
      id: 4,
      title: 'Basic @ContentChild',
      path: 'basic-contentchild',
      description: 'Learn content projection and access projected components.',
      difficulty: 'Intermediate',
      concepts: ['@ContentChild', 'ng-content', 'AfterContentInit']
    },
    {
      id: 5,
      title: '@ContentChildren',
      path: 'contentchildren',
      description: 'Master complex content projection with multiple children.',
      difficulty: 'Advanced',
      concepts: ['@ContentChildren', 'Multi-slot Projection', 'QueryList']
    },
    {
      id: 6,
      title: 'Lifecycle Timing',
      path: 'lifecycle-timing',
      description: 'Understand when queries are resolved and common timing pitfalls.',
      difficulty: 'Advanced',
      concepts: ['Lifecycle Hooks', 'Timing', 'Best Practices']
    }
  ];
}
