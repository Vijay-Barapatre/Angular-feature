# Exercise 1: Custom Pipe

## 🎯 Objective

Create a custom pipe that truncates text to a specified length.

## 📋 Scenario

Build a `truncate` pipe that:
- Cuts text at a specified length
- Adds ellipsis (...) at the end
- Handles edge cases gracefully

## ✅ Requirements

- [ ] Create pipe with `@Pipe` decorator
- [ ] Accept text as input
- [ ] Accept length parameter (default: 50)
- [ ] Add custom suffix (default: '...')
- [ ] Handle null/undefined values

## 💡 Hints

1. Use `@Pipe({ name: 'truncate' })`
2. Implement `PipeTransform` interface
3. Check text length before truncating
4. Use slice() for cutting text
