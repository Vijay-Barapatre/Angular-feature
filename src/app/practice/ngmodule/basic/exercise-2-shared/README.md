# Exercise 2: Shared Module

## 🎯 Objective

Create a reusable SharedModule for common components.

## ✅ Requirements

- [ ] Create SharedModule
- [ ] Declare common components
- [ ] Re-export CommonModule, FormsModule
- [ ] No providers in SharedModule

## 💻 Solution

```typescript
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ButtonComponent,
    CardComponent,
    SpinnerComponent,
    HighlightDirective,
    TruncatePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    SpinnerComponent,
    HighlightDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
```
