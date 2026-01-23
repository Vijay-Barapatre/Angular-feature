# 📋 Module Basics

> **💡 Lightbulb Moment**: declarations = what I own, imports = what I need, exports = what I share!


## 📋 Table of Contents
- [@NgModule Properties](#ngmodule-properties)
- [Key Rule](#key-rule)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
---

## @NgModule Properties

| Property | Purpose |
|----------|---------|
| declarations | Components, directives, pipes owned by module |
| imports | Other modules we need |
| exports | What we share with importers |
| providers | Services (use providedIn instead) |
| bootstrap | Root component (AppModule only) |

---

## Key Rule

⚠️ Each component can only be declared in ONE module!

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  NGMODULE PROPERTIES                                        │
│                                                             │
│   @NgModule({                                               │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ declarations: [                                       │ │
│   │   MyComponent,    // What I OWN (components, pipes)   │ │
│   │   MyDirective                                         │ │
│   │ ],                                                    │ │
│   │                                                       │ │
│   │ imports: [                                            │ │
│   │   CommonModule,   // What I NEED from others          │ │
│   │   FormsModule                                         │ │
│   │ ],                                                    │ │
│   │                                                       │ │
│   │ exports: [                                            │ │
│   │   MyComponent     // What I SHARE with importers      │ │
│   │ ],                                                    │ │
│   │                                                       │ │
│   │ providers: [                                          │ │
│   │   MyService       // ⚠️ Prefer providedIn: 'root'     │ │
│   │ ],                                                    │ │
│   │                                                       │ │
│   │ bootstrap: [AppComponent]  // Only for AppModule!     │ │
│   └───────────────────────────────────────────────────────┘ │
│   })                                                        │
│                                                             │
│   ⚠️ RULE: Each component declared in ONLY ONE module!     │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: declarations = what I own, imports = what I need, exports = what I share. Each component belongs to exactly ONE module!

