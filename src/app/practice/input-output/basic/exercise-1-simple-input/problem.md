# 🟦 Exercise 1: Simple Input Binding

**Difficulty:** Beginner | **Time:** 15-20 minutes

---

## 📋 Problem Statement

You need to create a reusable `UserCardComponent` that displays user information. The component should receive user data from its parent component using Angular's `@Input()` decorator.

### Why This Matters
Input properties are the primary way to pass data from parent to child components in Angular. Understanding this pattern is fundamental to building reusable, modular components.

---

## 🎯 Scenario

You're building a user directory application. The main page needs to display multiple user cards, each showing a user's name, email, and role. Instead of duplicating HTML, you'll create a reusable card component.

---

## ✅ Requirements

- [ ] Create a `UserCardComponent` with the following inputs:
  - `name: string` - User's display name
  - `email: string` - User's email address  
  - `role: string` - User's role (optional, defaults to 'User')
- [ ] Display the inputs in a styled card layout
- [ ] Handle missing/undefined values gracefully
- [ ] Use the component from a parent to display 3 different users

---

## 📤 Expected Output

When complete, you should see:
1. Three user cards displayed on the page
2. Each card shows the user's name, email, and role
3. Cards should be visually distinct and styled

```
┌─────────────────────┐  ┌─────────────────────┐
│  👤 John Doe        │  │  👤 Jane Smith      │
│  john@example.com   │  │  jane@example.com   │
│  Role: Admin        │  │  Role: Developer    │
└─────────────────────┘  └─────────────────────┘
```

---

## 💡 Hints

1. Use the `@Input()` decorator from `@angular/core`
2. You can provide default values: `@Input() role = 'User';`
3. Access input values directly in the template: `{{ name }}`
4. Make sure to import the child component in the parent

---

## 📚 Resources

- [Angular Input Properties](https://angular.dev/guide/components/inputs)
- [Component Interaction](https://angular.dev/guide/components/inputs)
