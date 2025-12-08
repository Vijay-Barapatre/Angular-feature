/**
 * USE CASE 5: @CONTENTCHILDREN - PARENT COMPONENT
 * 
 * Demonstrates accessing multiple projected children
 */

import { Component, ContentChildren, QueryList, AfterContentInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'app-menu-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-container">
      <div class="menu-header">
        <h3>{{ title }}</h3>
        <span class="count">{{ menuItems.length }} items</span>
      </div>
      <div class="menu-body">
        <ng-content select="app-menu-item"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .menu-container {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      border: 2px solid var(--primary-color);
      padding: var(--spacing-lg);
    }

    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid rgba(102, 126, 234, 0.2);
    }

    .menu-header h3 {
      color: var(--primary-light);
      margin: 0;
    }

    .count {
      background: var(--accent-color);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.875rem;
    }

    .menu-body {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  `]
})
export class MenuContainerComponent implements AfterContentInit {
  title: string = 'Menu';

  @ContentChildren(MenuItemComponent)
  menuItems!: QueryList<MenuItemComponent>;

  ngAfterContentInit(): void {
    console.log('✅ Content children initialized');
    console.log('Menu items count:', this.menuItems.length);
  }

  highlightAll(): void {
    this.menuItems.forEach(item => item.highlight());
  }

  unhighlightAll(): void {
    this.menuItems.forEach(item => item.unhighlight());
  }
}

@Component({
  selector: 'app-use-case-5-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuContainerComponent, MenuItemComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>Use Case 5: &#64;ContentChildren</h1>
        <p>Access and manage multiple projected children.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            <p class="sub-header">Projects multiple menu items</p>

            <div class="actions">
              <button (click)="highlightAll()" class="btn btn-primary">
                Highlight All Items
              </button>
              <button (click)="unhighlightAll()" class="btn btn-secondary">
                Unhighlight All
              </button>
            </div>

            <div class="code-example">
              <h3>💻 &#64;ContentChildren</h3>
              <pre><code>&#64;ContentChildren(MenuItemComponent)
menuItems!: QueryList&lt;MenuItemComponent&gt;;

this.menuItems.forEach(item => ...);</code></pre>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card child-card">
            <h2>📦 Menu with Projected Items</h2>
            
            <app-menu-container #menu>
              <app-menu-item label="Home" icon="🏠"></app-menu-item>
              <app-menu-item label="Profile" icon="👤"></app-menu-item>
              <app-menu-item label="Settings" icon="⚙️"></app-menu-item>
              <app-menu-item label="Logout" icon="🚪"></app-menu-item>
            </app-menu-container>
          </div>
        </div>
      </div>

      <div class="explanation-section card">
        <h2>📚 &#64;ContentChildren Use Cases</h2>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>Multiple Projection</h4>
            <p>Access all projected children of a type</p>
          </div>
          <div class="explanation-item">
            <h4>QueryList API</h4>
            <p>Same as &#64;ViewChildren - forEach, map, etc.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../input-output/components/use-case-1/parent.component.css';

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
export class UseCase5ParentComponent {
  @ViewChild('menu')
  menu?: MenuContainerComponent;

  highlightAll(): void {
    this.menu?.highlightAll();
  }

  unhighlightAll(): void {
    this.menu?.unhighlightAll();
  }
}
