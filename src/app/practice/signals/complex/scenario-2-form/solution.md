# 🟥 Scenario 2: Form State - Solution

```typescript
name = signal('');
email = signal('');

nameValid = computed(() => this.name().length >= 3);
emailValid = computed(() => this.email().includes('@'));
isFormValid = computed(() => this.nameValid() && this.emailValid());
```
