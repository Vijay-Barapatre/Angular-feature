# 🎨 Error Boundaries

> **💡 Lightbulb Moment**: Isolate errors to prevent entire app crashes - show fallback UI instead!


## 📋 Table of Contents
- [1. 🔍 Error Boundary Pattern](#1--error-boundary-pattern)
- [2. 🚀 Usage](#2--usage)
- [3. ❓ Interview Questions](#3--interview-questions)
  - [Basic Questions](#basic-questions)
    - [Q1: What is an error boundary?](#q1-what-is-an-error-boundary)
    - [Q2: Angular vs React error boundaries?](#q2-angular-vs-react-error-boundaries)
  - [Scenario-Based Questions](#scenario-based-questions)
    - [Scenario: Widget Dashboard](#scenario-widget-dashboard)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)
- [🧠 Mind Map](#mind-map)

---
---

## 1. 🔍 Error Boundary Pattern

```typescript
@Component({
    selector: 'app-error-boundary',
    template: `
        @if (hasError) {
            <div class="error-fallback">
                <h3>Something went wrong</h3>
                <button (click)="retry()">Try Again</button>
            </div>
        } @else {
            <ng-content></ng-content>
        }
    `
})
export class ErrorBoundaryComponent implements ErrorHandler {
    hasError = false;
    
    handleError(error: any) {
        this.hasError = true;
        console.error('Caught by boundary:', error);
    }
    
    retry() {
        this.hasError = false;
    }
}
```

---

## 2. 🚀 Usage

```html
<app-error-boundary>
    <app-risky-component></app-risky-component>
</app-error-boundary>
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: What is an error boundary?
**Answer:** A pattern that catches errors in child components and displays fallback UI instead of crashing the whole app.

#### Q2: Angular vs React error boundaries?
**Answer:** React has built-in error boundaries. Angular requires custom implementation using ErrorHandler or try-catch patterns.

---

### Scenario-Based Questions

#### Scenario: Widget Dashboard
**Question:** Dashboard has 5 widgets. One failing shouldn't break others.

**Answer:**
```html
@for (widget of widgets; track widget.id) {
    <app-error-boundary>
        <app-widget [config]="widget"></app-widget>
    </app-error-boundary>
}
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  ERROR BOUNDARIES: ISOLATE FAILURES                         │
│                                                             │
│   PATTERN:                                                  │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @Component({ selector: 'app-error-boundary' })        │ │
│   │ export class ErrorBoundaryComponent {                 │ │
│   │   hasError = false;                                   │ │
│   │                                                       │ │
│   │   template: `                                         │ │
│   │     @if (hasError) {                                  │ │
│   │       <div>Something went wrong</div>                 │ │
│   │       <button (click)="retry()">Try Again</button>    │ │
│   │     } @else {                                         │ │
│   │       <ng-content></ng-content>                       │ │
│   │     }                                                 │ │
│   │   `                                                   │ │
│   │ }                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   USAGE:                                                    │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ <!-- Each widget isolated, one failure won't crash all -->│
│   │ @for (widget of widgets; track widget.id) {           │ │
│   │   <app-error-boundary>                                │ │
│   │     <app-widget [config]="widget"></app-widget>       │ │
│   │   </app-error-boundary>                               │ │
│   │ }                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Wrap risky components in error boundaries. One failure won't crash the whole app. Show fallback UI + retry button!

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Error Boundaries))
    Purpose
      Isolate failures
      Show fallback
      Enable recovery
    Implementation
      Custom component
      ErrorHandler
      Try-catch
    Use Cases
      Widgets
      Third-party
      Risky features
```
