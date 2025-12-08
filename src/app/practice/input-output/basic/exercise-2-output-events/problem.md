# 🟦 Exercise 2: Output Events

**Difficulty:** Beginner | **Time:** 20-25 minutes

---

## 📋 Problem Statement

Create a `RatingComponent` that allows users to select a star rating (1-5). When the user clicks a star, the component should emit the selected rating to its parent component using `@Output()` and `EventEmitter`.

### Why This Matters
Output events enable child-to-parent communication. This pattern is essential for creating interactive, reusable components that notify parents of user actions.

---

## 🎯 Scenario

You're building a product review system. Users need to rate products by clicking stars. The rating component should be reusable across different product pages, and the parent needs to know when a rating is selected.

---

## ✅ Requirements

- [ ] Create a `RatingComponent` that displays 5 clickable stars
- [ ] Highlight stars based on current selection (1-3 stars = filled)
- [ ] Emit the selected rating when a star is clicked
- [ ] Parent component should:
  - Display the received rating
  - Show a message like "You rated: 4 stars"

---

## 📤 Expected Output

```
Stars:  ★ ★ ★ ★ ☆  (4 filled stars)

Parent displays: "You rated: 4 stars!"
```

When user clicks 3rd star:
```
Stars:  ★ ★ ★ ☆ ☆  (3 filled stars)

Parent displays: "You rated: 3 stars!"
```

---

## 💡 Hints

1. Use `@Output()` with `EventEmitter<number>`
2. Define: `@Output() ratingChange = new EventEmitter<number>();`
3. Emit with: `this.ratingChange.emit(selectedValue);`
4. Parent listens with: `(ratingChange)="onRatingChanged($event)"`

---

## 📚 Resources

- [Angular Output Properties](https://angular.dev/guide/components/outputs)
- [EventEmitter API](https://angular.dev/api/core/EventEmitter)
