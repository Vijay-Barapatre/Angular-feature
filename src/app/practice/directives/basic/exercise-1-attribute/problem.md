# Exercise 1: Attribute Directive

## 🎯 Objective

Create a custom attribute directive that highlights an element on hover.

## 📋 Scenario

You need a reusable highlight directive that:
- Changes background color on mouse enter
- Restores original color on mouse leave
- Accepts custom highlight color via input

## ✅ Requirements

- [ ] Create directive with `@Directive` decorator
- [ ] Use `@HostListener` for mouse events
- [ ] Use `@HostBinding` or `ElementRef` to change styles
- [ ] Accept highlight color via `@Input`
- [ ] Provide default highlight color

## 🔄 Expected Behavior

| Event | Result |
|-------|--------|
| Mouse enter | Background changes to highlight color |
| Mouse leave | Background reverts to original |
| Custom color input | Uses provided color |

## 💡 Hints

1. Use `@HostListener('mouseenter')` and `@HostListener('mouseleave')`
2. Store original background before changing
3. Use `ElementRef.nativeElement.style` for direct DOM access
4. Or use `@HostBinding('style.backgroundColor')` for reactive binding
