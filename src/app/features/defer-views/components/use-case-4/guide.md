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

## 🍿 Popcorn Prep Analogy (Easy to Remember!)

Think of prefetching like **making popcorn before the movie**:

| Prefetch | Movie Analogy | Memory Trick |
|----------|---------------|--------------| 
| **prefetch on idle** | 🍿 **Make popcorn during trailers**: Nobody needs it yet | **"Prepare early"** |
| **prefetch on hover** | 👆 **Hand near play button**: About to start! | **"Almost active"** |
| **prefetch on viewport** | 👀 **Movie poster in view**: Coming attraction! | **"In sight"** |
| **prefetch on immediate** | ⏱️ **Pre-made batch**: Always ready | **"Critical content"** |

### 📖 Story to Remember:

> 🍿 **Movie Night Prep**
>
> You're hosting movie night:
>
> **Preparation Strategy:**
> ```typescript
> // 🍿 Make popcorn during trailers (browser idle)
> @defer (prefetch on idle) { <comments /> }
> 
> // 👆 Start heating when someone hovers over play
> @defer (prefetch on hover) { <video-player /> }
> 
> // 👀 See the "Coming Soon" poster? Start prepping
> @defer (prefetch on viewport) { <next-episode /> }
> 
> // ⏱️ Always have snacks ready!
> @defer (prefetch on immediate) { <essential-ui /> }
> ```
>
> **Popcorn is ready BEFORE the movie starts! 🎬**

### 🎯 Quick Reference:
```
🍿 prefetch on idle      = During trailers (background)
👆 prefetch on hover     = Hand near button
👀 prefetch on viewport  = Poster in view
⏱️ prefetch on immediate = Always ready
```

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
