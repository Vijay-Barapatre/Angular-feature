# 🟥 Scenario 2: Form Wizard

**Difficulty:** Advanced | **Time:** 45 minutes

---

## 📋 Problem Statement

Build a multi-step form wizard with navigation between steps. Each step is a separate component that passes data up to the parent.

---

## ✅ Requirements

- [ ] Step components emit their data on completion
- [ ] Parent tracks current step and all form data
- [ ] Navigation between steps (Next/Back)
- [ ] Final step shows summary of all data

---

## 💡 Key Pattern

```typescript
// Each step emits its data
@Output() stepComplete = new EventEmitter<StepData>();

// Parent collects all step data
formData = { step1: {}, step2: {}, step3: {} };
```
