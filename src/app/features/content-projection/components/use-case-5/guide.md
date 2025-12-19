# 📤 Use Case 5: Template as Input

> **💡 Lightbulb Moment**: Pass templates as @Input() for ultimate flexibility in component customization!

---

## 1. 🔍 Template Input Pattern

Child component receives template from parent and renders it.

```typescript
// Child component
@Component({
    template: `
        @for (item of items; track item.id) {
            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }">
            </ng-container>
        }
    `
})
export class ListComponent {
    @Input() items: any[] = [];
    @Input() itemTemplate!: TemplateRef<any>;
}

// Parent usage
<app-list [items]="users" [itemTemplate]="userTpl">
</app-list>

<ng-template #userTpl let-user>
    <div class="user-card">{{ user.name }}</div>
</ng-template>
```

---

## 2. 🚀 Benefits

- Parent controls rendering
- Child handles logic/iteration
- Maximum flexibility

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  TEMPLATE AS INPUT: PARENT → CHILD TEMPLATE PASSING         │
│                                                             │
│   PARENT COMPONENT:                                         │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ <!-- Define how each item should look -->             │ │
│   │ <ng-template #userTpl let-user>                       │ │
│   │   <div class="user-card">                             │ │
│   │     <h3>{{ user.name }}</h3>                          │ │
│   │     <p>{{ user.email }}</p>                           │ │
│   │   </div>                                              │ │
│   │ </ng-template>                                        │ │
│   │                                                       │ │
│   │ <!-- Pass template to child component -->             │ │
│   │ <app-list [items]="users" [itemTemplate]="userTpl">   │ │
│   │ </app-list>                                           │ │
│   └───────────────────────────────────────────────────────┘ │
│                        │                                    │
│                        │ Template passed as @Input          │
│                        ▼                                    │
│   CHILD COMPONENT (app-list):                               │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @Input() items: User[] = [];                          │ │
│   │ @Input() itemTemplate!: TemplateRef<any>;             │ │
│   │                                                       │ │
│   │ Template:                                             │ │
│   │ @for (item of items; track item.id) {                 │ │
│   │   <ng-container *ngTemplateOutlet="itemTemplate;      │ │
│   │                  context: { $implicit: item }">       │ │
│   │   </ng-container>                                     │ │
│   │ }                                                     │ │
│   │                                                       │ │
│   │ Child iterates, Parent controls appearance!           │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Template as @Input = separation of concerns. Child handles logic (iteration), Parent controls presentation (template)!

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: Why use template inputs vs ng-content?
**Answer:**
| Template Input | ng-content |
|----------------|------------|
| Dynamic (can change) | Static |
| Child controls where/when | Parent provides all |
| Good for lists/tables | Good for layout |

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Template Input))
    Pattern
      Parent defines template
      Child receives via Input
      Child renders with outlet
    Benefits
      Flexibility
      Reusability
      Separation
```
