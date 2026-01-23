# ⏰ static Option

> **💡 Lightbulb Moment**: static: true resolves the query BEFORE change detection - useful when element is always present!


## 📋 Table of Contents
- [🔗 How the static Option Works: Deep Dive](#how-the-static-option-works-deep-dive)
  - [Query Resolution Timing](#query-resolution-timing)
  - [When to Use Each](#when-to-use-each)
  - [Visual: Element Availability Timeline](#visual-element-availability-timeline)
- [1. 🔍 What is the static Option?](#1--what-is-the-static-option)
- [2. 🚀 When to Use](#2--when-to-use)
- [3. ❓ Interview Questions](#3--interview-questions)
  - [Basic Questions](#basic-questions)
    - [Q1: Why would you use static: true?](#q1-why-would-you-use-static-true)
    - [Q2: What happens with static: true on *ngIf element?](#q2-what-happens-with-static-true-on-ngif-element)
  - [Scenario-Based Questions](#scenario-based-questions)
    - [Scenario: Initialize Chart in OnInit](#scenario-initialize-chart-in-oninit)
- [🧠 Mind Map](#mind-map)

---
---

## 🔗 How the static Option Works: Deep Dive

> [!IMPORTANT]
> The `static` option controls **WHEN** the query is resolved. `static: true` = early (ngOnInit), `static: false` (default) = late (ngAfterViewInit).

### Query Resolution Timing

```mermaid
sequenceDiagram
    participant C as Constructor
    participant I as ngOnInit
    participant CD as Change Detection
    participant V as ngAfterViewInit
    
    Note over C,V: static: true resolution
    C->>I: Query resolved ✅
    Note over I: Available here!
    I->>CD: Normal flow continues
    CD->>V: View initialized
    
    Note over C,V: static: false (default) resolution
    C->>I: Query = undefined ❌
    I->>CD: Still waiting...
    CD->>V: Query resolved ✅
    Note over V: Available here!
```

### When to Use Each

| Condition | Use `static:` |
|-----------|---------------|
| Element is **always present** | `true` |
| Need query in **ngOnInit** | `true` |
| Element is **inside *ngIf** | `false` (default) |
| Element is **inside *ngFor** | `false` (default) |
| Can wait for **ngAfterViewInit** | `false` (default) |

### Visual: Element Availability Timeline

```
Component Lifecycle:

constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterViewInit
                              ↑                                              ↑
                              │                                              │
                      static: true ✅                               static: false ✅
                      (resolved here)                               (resolved here)
```

> [!TIP]
> **Memory Trick**: `static: true` = **early bird** 🐦 (gets the worm in ngOnInit), `static: false` = **fashionably late** 🕐 (arrives at ngAfterViewInit)!

---

## 1. 🔍 What is the static Option?

Controls WHEN the query is resolved.

```typescript
// Static - resolved in ngOnInit (before CD)
@ViewChild('input', { static: true }) inputEarly!: ElementRef;

// Dynamic (default) - resolved in ngAfterViewInit
@ViewChild('input', { static: false }) inputLater!: ElementRef;
```

---

## 2. 🚀 When to Use

| static: true | static: false (default) |
|--------------|-------------------------|
| Element always exists | Element may be conditional |
| Need in ngOnInit | Can wait for ngAfterViewInit |
| No *ngIf on element | Has *ngIf or other structural |

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: Why would you use static: true?
**Answer:** When you need the element in `ngOnInit` and the element is always present (not in *ngIf).

#### Q2: What happens with static: true on *ngIf element?
**Answer:** The query will be undefined if *ngIf is false, because static resolution happens before *ngIf evaluates.

---

### Scenario-Based Questions

#### Scenario: Initialize Chart in OnInit
**Question:** You need canvas reference in ngOnInit (canvas always exists).

**Answer:**
```typescript
<canvas #chart></canvas>

@ViewChild('chart', { static: true }) canvas!: ElementRef;

ngOnInit() {
    // Works! Canvas is resolved early
    this.initChart(this.canvas.nativeElement);
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((static Option))
    true
      Before CD
      ngOnInit access
      Always present elements
    false Default
      After CD
      ngAfterViewInit
      Conditional elements
```
