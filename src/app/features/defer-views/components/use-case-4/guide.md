# 🚀 Use Case 4: Prefetching

> **💡 Lightbulb Moment**: Prefetch = download early, show later. Instant perceived performance!

---

## How Prefetching Works

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#667eea'}}}%%
sequenceDiagram
    participant U as User
    participant P as Prefetch
    participant T as Trigger
    participant R as Render
    
    U->>P: Hovers (prefetch starts)
    P-->>P: Downloads in background
    Note over P: Code ready ✓
    U->>T: Clicks (trigger fires)
    T->>R: Instant render!
```

---

## Prefetch Options

| Prefetch | Use When |
|----------|----------|
| `prefetch on idle` | Likely to be needed |
| `prefetch on hover` | Interactive elements |
| `prefetch on viewport` | Scrollable content |
| `prefetch on immediate` | Critical path code |

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Prefetch))
    on idle
      Background download
      Likely content
    on hover
      Interactive
      Buttons/Links
    on viewport
      Scroll based
      Images
    on immediate
      Critical
      Always needed
```
