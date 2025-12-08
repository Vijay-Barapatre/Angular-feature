# 🚀 Use Case 5: Runtime Performance

> **💡 Lightbulb Moment**: Template methods run on EVERY CD. Pure pipes run only when input changes!

---

## Pure Pipes vs Methods

| Aspect | Method | Pure Pipe |
|--------|--------|-----------|
| Runs | Every CD | Input change only |
| Performance | Poor | Excellent |

---

## Virtual Scroll

```html
<cdk-virtual-scroll-viewport itemSize="50">
    <div *cdkVirtualFor="let item of items">
        {{ item.name }}
    </div>
</cdk-virtual-scroll-viewport>
```

10,000 items → Only ~20 DOM nodes!
