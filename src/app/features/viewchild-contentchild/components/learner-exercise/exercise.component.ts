/**
 * LEARNER EXERCISE - VIEWCHILD/CONTENTCHILD PRACTICE
 * 
 * Complete the TODOs to practice what you've learned!
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-learner-exercise',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="exercise-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>🚀 Practice Exercise</h1>
        <p>Test your ViewChild and ContentChild knowledge!</p>
      </div>

      <div class="card">
        <h2>📝 Your Task</h2>
        <div class="task-list">
          <div class="task-item">
            <span class="task-number">1</span>
            <div>
              <h3>Create a Counter Component</h3>
              <p>Build a simple counter with increment/decrement methods</p>
            </div>
          </div>

          <div class="task-item">
            <span class="task-number">2</span>
            <div>
              <h3>Add &#64;ViewChild</h3>
              <p>Access the counter from parent and control it</p>
            </div>
          </div>

          <div class="task-item">
            <span class="task-number">3</span>
            <div>
              <h3>Create a Card with Content Projection</h3>
              <p>Build a card that accepts projected content</p>
            </div>
          </div>

          <div class="task-item">
            <span class="task-number">4</span>
            <div>
              <h3>Use &#64;ContentChild</h3>
              <p>Access the projected content from the card component</p>
            </div>
          </div>
        </div>

        <div class="tips">
          <h3>💡 Tips</h3>
          <ul>
            <li>Remember to use AfterViewInit for &#64;ViewChild</li>
            <li>Remember to use AfterContentInit for &#64;ContentChild</li>
            <li>Use the ! operator for definite assignment</li>
            <li>Check the console for errors</li>
          </ul>
        </div>

        <div class="success-message">
          <h3>🎉 Completed?</h3>
          <p>Great job! You've mastered ViewChild and ContentChild!</p>
          <a routerLink="/viewchild-contentchild" class="btn btn-accent">Back to Overview</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      max-width: 900px;
      margin: 0 auto;
      padding: var(--spacing-xl);
    }

    .case-header {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }

    .back-link {
      display: inline-block;
      color: var(--primary-light);
      text-decoration: none;
      margin-bottom: var(--spacing-md);
    }

    .card {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .task-list {
      margin: var(--spacing-xl) 0;
    }

    .task-item {
      display: flex;
      gap: var(--spacing-lg);
      padding: var(--spacing-lg);
      background: var(--bg-card);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
    }

    .task-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    .task-item h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-xs);
    }

    .task-item p {
      color: var(--text-muted);
    }

    .tips {
      background: rgba(245, 158, 11, 0.1);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      border-left: 4px solid #f59e0b;
      margin: var(--spacing-xl) 0;
    }

    .tips h3 {
      color: #f59e0b;
      margin-bottom: var(--spacing-md);
    }

    .tips ul {
      list-style: none;
      padding: 0;
    }

    .tips li {
      padding: var(--spacing-xs) 0;
      color: var(--text-secondary);
    }

    .tips li::before {
      content: '💡 ';
      margin-right: var(--spacing-xs);
    }

    .success-message {
      text-align: center;
      padding: var(--spacing-xl);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
      border-radius: var(--radius-md);
      border: 2px dashed #10b981;
    }

    .success-message h3 {
      color: #10b981;
      margin-bottom: var(--spacing-sm);
    }

    .success-message p {
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
    }
  `]
})
export class LearnerExerciseComponent { }
