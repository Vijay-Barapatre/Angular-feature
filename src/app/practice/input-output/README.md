# 🔄 Input & Output Practice Exercises

Master parent-child component communication with @Input and @Output decorators.

## 🟦 Basic Exercises

### Exercise 1: Simple @Input Binding
**Objective**: Learn to pass data from parent to child using @Input.

**Tasks**:
- Add @Input() decorator to receive user data
- Display user properties in template
- Handle undefined/null values with fallbacks
- Implement getInitials() method

---

### Exercise 2: @Output with Custom Events
**Objective**: Learn to emit events from child to parent using @Output.

**Tasks**:
- Add @Output() with EventEmitter<number>
- Emit rating value on star click
- Handle the event in parent component
- Update parent state based on event

---

### Exercise 3: Two-Way Binding
**Objective**: Implement the [(x)]="value" two-way binding pattern.

**Tasks**:
- Add @Input() count property
- Add @Output() countChange EventEmitter
- Implement increment/decrement methods
- Emit changes to enable two-way binding

---

### Exercise 4: Input Transform
**Objective**: Use transform functions with @Input decorator.

**Tasks**:
- Transform title to uppercase
- Use numberAttribute for string-to-number conversion
- Use booleanAttribute for presence-based boolean
- Understand attribute vs property binding

---

## 🟥 Complex Scenarios

### Scenario 1: Shopping Cart
**Real-World Application**: E-commerce product listing with cart management.

**Components to build**:
- ProductCard: Displays product, emits add-to-cart event
- CartItem: Shows item with quantity controls
- Parent: Manages cart state and totals

---

### Scenario 2: Form Wizard
**Real-World Application**: Multi-step form with navigation.

**Components to build**:
- StepIndicator: Shows step status, allows navigation
- Form steps: Collect data with two-way binding
- Parent: Manages step navigation and data

---

### Scenario 3: Data Table
**Real-World Application**: Admin data table with CRUD.

**Features**:
- Sortable columns
- Row selection with checkboxes
- Action buttons per row
- Bulk actions

---

### Scenario 4: Modal Dialog
**Real-World Application**: Reusable modal component.

**Features**:
- @Input for isOpen, title
- @Output for closed, confirmed events
- Content projection with ng-content

---

### Scenario 5: Tab Component
**Real-World Application**: Dynamic tabbed interface.

**Features**:
- TabPanel component with content
- Tabs container with navigation
- Dynamic tab management

---

## 📝 How to Complete Exercises

1. **Read the Objective**: Understand what you need to implement
2. **Find the TODOs**: Look for `// TODO:` comments in the code
3. **Follow the Hints**: Each TODO has hints in comments above it
4. **Test Incrementally**: Complete one TODO, test, then move to next
5. **Reference the Guides**: Check the feature documentation for concepts

## ✅ Success Criteria

- [ ] All @Input decorators properly added
- [ ] All @Output EventEmitters working
- [ ] Events emitting correct data
- [ ] Parent receiving and handling events
- [ ] Two-way binding working where applicable
- [ ] No TypeScript errors
- [ ] UI updates correctly on interaction
