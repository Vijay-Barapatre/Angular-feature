# 🟥 Scenario 4: Modal Dialog

**Difficulty:** Intermediate | **Time:** 30 minutes

## 📋 Problem Statement

Create a reusable modal component with open/close state controlled by parent, and events for confirmation/cancellation.

## ✅ Requirements

- [ ] `@Input() isOpen` - Controls visibility
- [ ] `@Input() title` - Modal title
- [ ] `@Output() close` - When backdrop/X clicked
- [ ] `@Output() confirm` - When confirm button clicked
- [ ] Content projection for modal body
