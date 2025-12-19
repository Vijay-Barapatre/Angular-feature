# 🖥️ Use Case 3: Window/Document Events

> **Goal**: Handle global window-level events like scroll, resize, network status.

---

## 🔍 How It Works

Target window or document with prefix syntax:

| Event | Syntax |
|-------|--------|
| Scroll | `window:scroll` |
| Resize | `window:resize` |
| Online | `window:online` |
| Offline | `window:offline` |
| Tab visibility | `document:visibilitychange` |

---

## 🚀 Implementation

```typescript
@HostListener('window:scroll')
onScroll() {
    this.scrollY = window.scrollY;
}

@HostListener('window:resize')
onResize() {
    this.width = window.innerWidth;
}

@HostListener('document:visibilitychange')
onVisibility() {
    this.isVisible = !document.hidden;
}
```

---

## 🌍 Real World Uses

1. **Infinite scroll** - Load more on scroll
2. **Responsive layouts** - React to resize
3. **Auto-pause video** - On tab hidden
4. **Show "You're offline" banner**

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  WINDOW/DOCUMENT EVENTS: GLOBAL LISTENERS                   │
│                                                             │
│   WINDOW EVENTS:                                            │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @HostListener('window:scroll')                        │ │
│   │ @HostListener('window:resize')                        │ │
│   │ @HostListener('window:online')                        │ │
│   │ @HostListener('window:offline')                       │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   DOCUMENT EVENTS:                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @HostListener('document:visibilitychange')            │ │
│   │ @HostListener('document:click')  // Click outside     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   COMMON PATTERNS:                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ window:scroll  → Infinite scroll, sticky headers      │ │
│   │ window:resize  → Responsive layouts, breakpoints      │ │
│   │ window:online  → "You're back online!" banner         │ │
│   │ visibility     → Pause video when tab hidden          │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Use `window:` or `document:` prefix for global events. Great for scroll, resize, network status!

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Window Events))
    window:scroll
      Scroll position
      Infinite scroll
      Back to top
    window:resize
      Responsive
      Breakpoints
    Network
      online
      offline
    Visibility
      Tab hidden
      Pause media
```
