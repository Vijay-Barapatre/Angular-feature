# 💉 Use Case 4: Providers & DI

> **💡 Lightbulb Moment**: `providedIn: 'root'` = singleton + tree-shakable!

---

## Best Practice

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {}
```

---

## forRoot/forChild Pattern

- `forRoot()` in AppModule - provides services
- `forChild()` in feature modules - no services
