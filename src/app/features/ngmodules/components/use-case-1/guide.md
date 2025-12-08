# 📋 Use Case 1: Module Basics

> **💡 Lightbulb Moment**: declarations = what I own, imports = what I need, exports = what I share!

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
