# 📋 Use Case 4: @ContentChildren

> **💡 Lightbulb Moment**: @ContentChildren queries ALL projected content matching a selector - with a reactive QueryList!

---

## 1. 🔍 What is @ContentChildren?

Queries all matching projected content from ng-content.

```typescript
// Parent usage:
<app-menu>
    <app-menu-item>Home</app-menu-item>
    <app-menu-item>About</app-menu-item>
    <app-menu-item>Contact</app-menu-item>
</app-menu>

// Menu component:
@Component({
    template: `<ng-content></ng-content>`
})
export class MenuComponent implements AfterContentInit {
    @ContentChildren(MenuItemComponent) items!: QueryList<MenuItemComponent>;
    
    ngAfterContentInit() {
        console.log('Menu items:', this.items.length);  // 3
    }
}
```

---

## 2. 🚀 Common Patterns

### Collect Items
```typescript
@ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

ngAfterContentInit() {
    this.tabs.first?.activate();
}
```

### React to Changes
```typescript
ngAfterContentInit() {
    this.items.changes.subscribe(() => {
        this.recalculateLayout();
    });
}
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: descendants option - what does it do?
**Answer:** By default, ContentChildren only queries direct children. With `descendants: true`, it queries nested content too:
```typescript
@ContentChildren(ItemComponent, { descendants: true })
```

---

### Scenario-Based Questions

#### Scenario: Accordion
**Question:** Build accordion that finds all panels.

**Answer:**
```typescript
@ContentChildren(AccordionPanelComponent) panels!: QueryList<AccordionPanelComponent>;

expandFirst() {
    this.panels.first?.expand();
}

collapseAll() {
    this.panels.forEach(p => p.collapse());
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((@ContentChildren))
    Returns
      QueryList
      All projected matches
    Options
      descendants
      read
    Use Cases
      Tabs
      Accordions
      Menus
```
