# Angular Pipes Practice

Master Angular pipes through hands-on exercises.

## 📚 Overview

Pipes transform data in templates for display purposes.

### Built-in Pipes

| Pipe | Purpose | Example |
|------|---------|---------|
| `date` | Format dates | `{{ date \| date:'short' }}` |
| `currency` | Format currency | `{{ price \| currency }}` |
| `uppercase/lowercase` | Text case | `{{ name \| uppercase }}` |
| `async` | Handle observables | `{{ data$ \| async }}` |
| `json` | Debug objects | `{{ obj \| json }}` |

## 🎯 Exercises

### Basic (4 Exercises)
1. **Custom Pipe** - Create a truncate text pipe
2. **Pipe with Arguments** - Add configurable options
3. **Pure vs Impure Pipes** - Understand pipe execution
4. **Async Pipe** - Handle async data elegantly

### Complex (5 Scenarios)
1. **Search Filter Pipe** - Filter lists dynamically
2. **Sorting Pipe** - Sort arrays by property
3. **Time Ago Pipe** - Relative time display
4. **File Size Pipe** - Format bytes to KB/MB/GB
5. **Memoization Pipe** - Performance optimization
