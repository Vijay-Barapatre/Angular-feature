/**
 * INPUT TRANSFORMS - PARENT COMPONENT
 * 
 * Demonstrates:
 * 1. Passing different data types that get transformed
 * 2. Testing validation logic
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase5ChildComponent } from './child.component';

@Component({
  selector: 'app-use-case-5-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, UseCase5ChildComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/input-output" class="back-link">← Back to Overview</a>
        <h1>Input Transforms</h1>
        <p>Angular 16+ feature to transform input values automatically.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Controls</h2>
            
            <div class="control-group">
              <label>Text (will become UPPERCASE):</label>
              <input type="text" #txtInput (input)="textVal = txtInput.value" value="hello">
            </div>

            <div class="control-group">
              <label>Count (String "123" -> Number 123):</label>
              <input type="number" #numInput (input)="numVal = numInput.value" value="42">
            </div>

            <div class="control-group">
              <label>
                <input type="checkbox" (change)="isDisabled = !isDisabled">
                Disabled (Boolean Attribute)
              </label>
            </div>

            <div class="control-group">
              <label>Priority (Validated 1-5):</label>
              <div class="btn-group">
                <button (click)="prio = -10">Set -10</button>
                <button (click)="prio = 3">Set 3</button>
                <button (click)="prio = 99">Set 99</button>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <!-- 
            Note: We are passing 'numVal' which comes from input as STRING,
            but child receives it as NUMBER due to transform!
          -->
          <app-use-case-5-child
            [label]="textVal"
            [count]="numVal"
            [disabled]="isDisabled"
            [priority]="prio">
          </app-use-case-5-child>
        </div>
      </div>
      
      <div class="explanation-section card">
        <h2>📚 The Magic of Transforms</h2>
        <p>
          Notice how we pass a <strong>string</strong> "42" from the input, but the child reports it as a <strong>number</strong>?
          That's <code>numberAttribute</code> transform at work!
        </p>
      </div>
    </div>
  `,
  styles: [`
    @import '../use-case-1/parent.component.css';
    
    .control-group {
      margin-bottom: var(--spacing-md);
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      color: var(--text-muted);
    }

    input[type="text"], input[type="number"] {
      width: 100%;
      padding: 8px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: white;
      border-radius: 4px;
    }

    .btn-group {
      display: flex;
      gap: 10px;
    }

    .btn-group button {
      flex: 1;
      padding: 5px;
      background: var(--primary-color);
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class UseCase5ParentComponent {
  textVal: string = 'hello';
  numVal: any = '42'; // Intentionally any to simulate string from input
  isDisabled: boolean = false;
  prio: number = 1;
}
