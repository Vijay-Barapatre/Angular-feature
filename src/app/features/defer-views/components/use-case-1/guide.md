# 📦 Use Case 1: Basic @defer

> **💡 Lightbulb Moment**: `@defer` automatically code-splits your template. Heavy components load separately!

---

## 1. 🔍 How It Works

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#667eea'}}}%%
sequenceDiagram
    participant B as Browser
    participant M as Main Bundle
    participant D as Defer Chunk
    
    B->>M: Load main bundle
    M->>B: Render page (placeholder)
    Note over B: Browser goes idle
    B->>D: Fetch defer chunk
    D->>B: Component code
    B->>B: Render deferred content
```

---

## 2. 🚀 Basic Syntax

```typescript
@defer {
    <heavy-component />
}
```

That's it! Angular automatically:
- Creates a separate JS chunk
- Loads when browser is idle
- Renders once loaded

---

## 3. ⚡ Performance Impact

| Without @defer | With @defer |
|----------------|-------------|
| All code in main bundle | Separate chunks |
| Slower initial load | Faster initial load |
| Everything parsed upfront | Lazy parsed |

---

## 🧠 Mind Map

```mermaid
mindmap
  root((@defer))
    Benefits
      Code splitting
      Faster load
      Lazy parsing
    Default Behavior
      Loads on idle
      No config needed
    Use For
      Heavy components
      Below fold content
      Optional features
```
