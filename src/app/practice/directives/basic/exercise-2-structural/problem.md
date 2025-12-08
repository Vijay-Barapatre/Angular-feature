# Exercise 2: Structural Directive

## 🎯 Objective

Create a custom structural directive similar to `*ngIf`.

## 📋 Scenario

Build an `*appUnless` directive that shows content when the condition is FALSE (opposite of `*ngIf`).

## ✅ Requirements

- [ ] Create structural directive with `*appUnless`
- [ ] Use `TemplateRef` and `ViewContainerRef`
- [ ] Show template when condition is false
- [ ] Hide template when condition is true
- [ ] Handle condition changes reactively

## 💡 Hints

1. Inject `TemplateRef` and `ViewContainerRef`
2. Use `@Input()` with setter for reactive updates
3. `viewContainer.createEmbeddedView(template)` to show
4. `viewContainer.clear()` to hide
