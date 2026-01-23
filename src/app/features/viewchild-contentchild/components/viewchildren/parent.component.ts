/**
 * @VIEWCHILDREN - PARENT COMPONENT
 * 
 * Demonstrates using @ViewChildren to access multiple child components
 * and work with the QueryList API.
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: Query Multiple Components
 * -------------------------------------------------------------------------------
 * @ViewChildren returns a QueryList that:
 * 1. Contains references to all matching children
 * 2. Updates automatically when children are added/removed
 * 3. Provides observable changes stream
 * 4. Offers array-like iteration methods
 * 
 * 🏗️ KEY CONCEPTS:
 * 1. **QueryList<T>**: Special collection that updates with view changes
 * 2. **toArray()**: Convert to standard array
 * 3. **changes**: Observable that emits when children change
 * 4. **first, last**: Quick access to boundary elements
 * 
 * DATA FLOW DIAGRAM:
 * ```mermaid
 * graph TD
 *     Parent["@ViewChildren(TabComponent)"] --> QueryList["QueryList&lt;TabComponent&gt;"]
 *     QueryList --> Tab1["Tab 1"]
 *     QueryList --> Tab2["Tab 2"]
 *     QueryList --> Tab3["Tab 3"]
 *     QueryList --> TabN["Tab N"]
 *     QueryList -.->|changes| Observable["Observable&lt;QueryList&gt;"]
 * ```
 */

import { Component, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-use-case-3-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, TabComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>&#64;ViewChildren</h1>
        <p>Query and manage multiple child components with QueryList.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            <p class="sub-header">Control multiple tabs using &#64;ViewChildren!</p>

            <div class="control-section">
              <h3>Tab Controls</h3>
              <div class="actions">
                <button (click)="activateTab(0)" class="btn btn-primary">
                  Activate First Tab
                </button>
                <button (click)="activateTab(tabCount - 1)" class="btn btn-primary">
                  Activate Last Tab
                </button>
                <button (click)="activateAll()" class="btn btn-accent">
                  Activate All Tabs
                </button>
                <button (click)="deactivateAll()" class="btn btn-secondary">
                  Deactivate All Tabs
                </button>
                <button (click)="addTab()" class="btn btn-primary">
                  Add Tab
                </button>
                <button (click)="removeTab()" class="btn btn-primary">
                  Remove Tab
                </button>
              </div>
            </div>

            <div class="info-section">
              <h3>QueryList Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Total Tabs:</label>
                  <code>{{ tabCount }}</code>
                </div>
                <div class="info-item">
                  <label>First Tab Label:</label>
                  <code>{{ tabs.first.label }}</code>
                </div>
                <div class="info-item">
                  <label>Last Tab Label:</label>
                  <code>{{ tabs.last.label }}</code>
                </div>
              </div>
            </div>

            <div class="code-example">
              <h3>💻 Code Example</h3>
              <pre><code>// Template:
&lt;app-tab *ngFor="let tab of tabData"&gt;&lt;/app-tab&gt;

// TypeScript:
&#64;ViewChildren(TabComponent)
tabs!: QueryList&lt;TabComponent&gt;;

// Usage:
this.tabs.forEach(tab => tab.activate());
const array = this.tabs.toArray();</code></pre>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card child-card">
            <h2>📑 Tab List</h2>
            <div class="tabs-container">
              <app-tab 
                *ngFor="let tab of tabData; let i = index" 
                [label]="tab.label"
                [badge]="tab.badge">
              </app-tab>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation-section card">
        <h2>📚 Understanding QueryList</h2>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>1️⃣ QueryList vs Array</h4>
            <p>QueryList auto-updates when children change</p>
            <p class="detail">Use .toArray() to convert to standard array</p>
          </div>

          <div class="explanation-item">
            <h4>2️⃣ Iteration Methods</h4>
            <code>tabs.forEach(tab => ...)</code>
            <p class="detail">Supports forEach, map, filter, reduce</p>
          </div>

          <div class="explanation-item">
            <h4>3️⃣ Changes Observable</h4>
            <code>tabs.changes.subscribe(...)</code>
            <p class="detail">React to dynamic child additions/removals</p>
          </div>

          <div class="explanation-item">
            <h4>4️⃣ Quick Access</h4>
            <p>first, last, length properties</p>
            <p class="detail">Get boundary elements without iteration</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../input-output/components/basic-input-output/parent.component.css';

    .tabs-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .control-section, .info-section {
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    }

    .info-section h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .info-grid {
      display: grid;
      gap: var(--spacing-sm);
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm);
      background: var(--bg-card);
      border-radius: var(--radius-sm);
    }

    .code-example {
      background: #1e293b;
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
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
export class UseCase3ParentComponent implements AfterViewInit {
  /**
   * @ViewChildren DECORATOR
   * 
   * Queries for ALL children of the specified type.
   * Returns a QueryList<T> that updates automatically.
   */
  @ViewChildren(TabComponent)
  tabs!: QueryList<TabComponent>;

  // To Draw multiple tab on parent component
  tabData = [
    { label: 'Home', badge: '3' },
    { label: 'Profile', badge: '1' },
    { label: 'Settings' },
    { label: 'Messages', badge: '12' },
    { label: 'Notifications', badge: '5' },
    { label: 'Notifications', badge: '7' }
  ];

  /**
   * Tracked tab count property
   * Using a property instead of a getter that reads QueryList directly
   * prevents the ExpressionChangedAfterItHasBeenCheckedError
   */
  tabCount = 0;

  constructor(private cdr: ChangeDetectorRef) { }



  ngAfterViewInit(): void {
    console.log('✅ ViewChildren initialized');
    console.log('Tab count:', this.tabs.length);
    console.log('Tabs array:', this.tabs.toArray());

    // 🛡️ CRITICAL: Update tabCount and trigger change detection
    this.updateTabCount();

    // Subscribe to changes - update count when tabs are added/removed
    this.tabs.changes.subscribe(tabs => {
      console.log('Tabs changed! New count:', tabs.length);
      this.updateTabCount();
    });
  }

  /**
   * 🛡️ CRITICAL: Helper method to update tab count safely
   * Uses detectChanges() to ensure Angular knows about the change
   */
  private updateTabCount(): void {
    this.tabCount = this.tabs.length;
    this.cdr.detectChanges();  // Tell Angular to run change detection
  }

  activateTab(index: number): void {
    const tabsArray = this.tabs.toArray();
    // Deactivate all first
    tabsArray.forEach(tab => tab.deactivate());
    // Activate the selected one
    if (tabsArray[index]) {
      tabsArray[index].activate();
    }
  }

  activateAll(): void {
    this.tabs.forEach(tab => tab.activate());
  }

  deactivateAll(): void {
    this.tabs.forEach(tab => tab.deactivate());
  }
  addTab(): void {
    this.tabData.push({ label: 'New Tab', badge: '89' });
  }

  removeTab(): void {
    this.tabData.pop();
  }
}
