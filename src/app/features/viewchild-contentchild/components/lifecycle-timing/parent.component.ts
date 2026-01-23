/**
 * LIFECYCLE TIMING - PARENT COMPONENT
 * 
 * Demonstrates when @ViewChild and @ContentChild are available
 * 
 * LIFECYCLE ORDER:
 * ```mermaid
 * sequenceDiagram
 *     participant Constructor
 *     participant OnInit
 *     participant AfterContentInit
 *     participant AfterViewInit
 *     
 *     Constructor->>Constructor: @ViewChild = undefined
 *     Constructor->>Constructor: @ContentChild = undefined
 *     OnInit->>OnInit: @ViewChild = undefined
 *     OnInit->>OnInit: @ContentChild = undefined
 *     AfterContentInit->>AfterContentInit: @ContentChild = ✅ AVAILABLE
 *     AfterContentInit->>AfterContentInit: @ViewChild = undefined
 *     AfterViewInit->>AfterViewInit: @ContentChild = ✅ AVAILABLE
 *     AfterViewInit->>AfterViewInit: @ViewChild = ✅ AVAILABLE
 * ```
 */

import {
  Component,
  ViewChild,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  OnInit,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  template: `
    <div class="demo-box">
      <h3>Demo Component</h3>
      <div #viewElement>View Element</div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .demo-box {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      border: 2px solid var(--primary-color);
    }

    h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }
  `]
})
export class LifecycleDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild('viewElement') viewEl?: ElementRef;
  @ContentChild('contentElement') contentEl?: ElementRef;

  ngAfterContentInit(): void {
    console.log('[Child] AfterContentInit - ContentChild:', this.contentEl ? '✅' : '❌');
    console.log('[Child] AfterContentInit - ViewChild:', this.viewEl ? '✅' : '❌');
  }

  ngAfterViewInit(): void {
    console.log('[Child] AfterViewInit - ContentChild:', this.contentEl ? '✅' : '❌');
    console.log('[Child] AfterViewInit - ViewChild:', this.viewEl ? '✅' : '❌');
  }
}

@Component({
  selector: 'app-use-case-6-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, LifecycleDemoComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>Lifecycle Timing</h1>
        <p>Understand when queries are resolved and best practices.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>📅 Lifecycle Timeline</h2>
            <div class="timeline">
              <div class="timeline-item">
                <div class="marker constructor">1</div>
                <div class="content">
                  <h4>Constructor</h4>
                  <p>&#64;ViewChild: ❌ undefined</p>
                  <p>&#64;ContentChild: ❌ undefined</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="marker oninit">2</div>
                <div class="content">
                  <h4>ngOnInit</h4>
                  <p>&#64;ViewChild: ❌ undefined</p>
                  <p>&#64;ContentChild: ❌ undefined</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="marker aftercontent">3</div>
                <div class="content">
                  <h4>ngAfterContentInit</h4>
                  <p>&#64;ViewChild: ❌ undefined</p>
                  <p>&#64;ContentChild: ✅ AVAILABLE</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="marker afterview">4</div>
                <div class="content">
                  <h4>ngAfterViewInit</h4>
                  <p>&#64;ViewChild: ✅ AVAILABLE</p>
                  <p>&#64;ContentChild: ✅ AVAILABLE</p>
                </div>
              </div>
            </div>

            <div class="best-practices">
              <h3>✅ Best Practices</h3>
              <ul>
                <li>Use &#64;ViewChild in ngAfterViewInit or later</li>
                <li>Use &#64;ContentChild in ngAfterContentInit or later</li>
                <li>Never access queries in constructor or ngOnInit</li>
                <li>Use optional chaining (?) for safety</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card child-card">
            <h2>🧪 Live Demo</h2>
            <p class="sub-header">Check the console to see lifecycle logs!</p>
            
            <app-lifecycle-demo>
              <div #contentElement>Projected Content</div>
            </app-lifecycle-demo>

            <div class="code-example">
              <h3>💻 Safe Access Pattern</h3>
              <pre><code>// ❌ BAD - Will crash!
ngOnInit() &#123;
  this.child.doSomething();
&#125;

// ✅ GOOD  
ngAfterViewInit() &#123;
  this.child?.doSomething();
&#125;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../input-output/components/use-case-1/parent.component.css';

    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
    }

    .marker {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      flex-shrink: 0;
    }

    .marker.constructor {
      background: #6b7280;
    }

    .marker.oninit {
      background: #3b82f6;
    }

    .marker.aftercontent {
      background: #f59e0b;
    }

    .marker.afterview {
      background: #10b981;
    }

    .content h4 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-sm);
    }

    .content p {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin: 2px 0;
    }

    .best-practices {
      margin-top: var(--spacing-xl);
      padding: var(--spacing-lg);
      background: var(--bg-card);
      border-radius: var(--radius-md);
      border-left: 4px solid #10b981;
    }

    .best-practices h3 {
      color: #10b981;
      margin-bottom: var(--spacing-md);
    }

    .best-practices ul {
      list-style: none;
      padding: 0;
    }

    .best-practices li {
      padding: var(--spacing-xs) 0;
      color: var(--text-secondary);
    }

    .best-practices li::before {
      content: '✓ ';
      color: #10b981;
      font-weight: bold;
      margin-right: var(--spacing-xs);
    }

    .code-example {
      background: #1e293b;
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-top: var(--spacing-lg);
    }

    .code-example h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .code-example code {
      color: #94a3b8;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }
  `]
})
export class UseCase6ParentComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild(LifecycleDemoComponent) demoComponent?: LifecycleDemoComponent;

  constructor() {
    console.log('[Parent] Constructor - demoComponent:', this.demoComponent ? '✅' : '❌');
  }

  ngOnInit(): void {
    console.log('[Parent] OnInit - demoComponent:', this.demoComponent ? '✅' : '❌');
  }

  ngAfterContentInit(): void {
    console.log('[Parent] AfterContentInit - demoComponent:', this.demoComponent ? '✅' : '❌');
  }

  ngAfterViewInit(): void {
    console.log('[Parent] AfterViewInit - demoComponent:', this.demoComponent ? '✅' : '❌');
  }
}
