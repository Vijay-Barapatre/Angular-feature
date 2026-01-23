/**
 * TWO-WAY BINDING - PARENT COMPONENT
 * 
 * Demonstrates the two-way binding pattern in Angular:
 * - Combining @Input() and @Output() with the "Change" suffix
 * - Using [()] "banana-in-a-box" syntax
 * - Real-world example: Counter and text input
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase2ChildComponent } from './child.component';

@Component({
  selector: 'app-use-case-2-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, UseCase2ChildComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/input-output" class="back-link">← Back to Overview</a>
        <h1>Two-Way Binding</h1>
        <p>Learn how to implement custom two-way binding using [()] syntax</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            
            <div class="state-section">
              <h3>Synced Values:</h3>
              <div class="state-item">
                <label>Counter:</label>
                <code>{{ counter }}</code>
              </div>
              <div class="state-item">
                <label>User Input:</label>
                <code>{{ userInput }}</code>
              </div>
            </div>

            <div class="actions">
              <button (click)="counter = counter + 5" class="btn btn-primary">
                Parent: +5 to Counter
              </button>
              <button (click)="userInput = 'Hello from Parent!'" class="btn btn-primary">
                Parent: Set Input Text
              </button>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card child-card">
            <h2>👶 Child Component (Two-Way Bound)</h2>
            <!--
              TWO-WAY BINDING SYNTAX: [(propertyName)]
              Combines:
              - [propertyName]="value" (Input)
              - (propertyNameChange)="value=$event" (Output)
            -->
            <app-use-case-2-child
              [(counter)]="counter"
              [(userInput)]="userInput">
            </app-use-case-2-child>
          </div>
        </div>
      </div>

      <div class="explanation-section card">
        <h2>📚 Two-Way Binding Pattern</h2>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>1️⃣ The Pattern</h4>
            <p>For property X:</p>
            <code>&#64;Input() X: type;</code>
            <code>&#64;Output() XChange = new EventEmitter&lt;type&gt;();</code>
          </div>
          <div class="explanation-item">
            <h4>2️⃣ The Syntax</h4>
            <p>Parent uses:</p>
            <code>[(X)]="parentValue"</code>
            <p>Which expands to:</p>
            <code>[X]="parentValue" (XChange)="parentValue=$event"</code>
          </div>
          <div class="explanation-item">
            <h4>3️⃣ The Benefit</h4>
            <p>Changes in parent OR child automatically sync both ways!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`@import './parent.component.css';`]
})
export class UseCase2ParentComponent {
  counter: number = 0;
  userInput: string = 'Type something...';
}
