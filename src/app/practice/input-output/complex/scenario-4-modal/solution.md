# 🟥 Scenario 4: Modal Dialog - Solution

```typescript
@Component({
  selector: 'app-modal',
  template: `
    @if (isOpen) {
      <div class="backdrop" (click)="onClose()">
        <div class="modal" (click)="$event.stopPropagation()">
          <header>
            <h2>{{ title }}</h2>
            <button (click)="onClose()">×</button>
          </header>
          <main><ng-content></ng-content></main>
          <footer>
            <button (click)="onClose()">Cancel</button>
            <button (click)="onConfirm()">Confirm</button>
          </footer>
        </div>
      </div>
    }
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  
  onClose(): void { this.close.emit(); }
  onConfirm(): void { this.confirm.emit(); }
}

// Usage
<app-modal [isOpen]="showModal" [title]="'Confirm Delete'" 
  (close)="showModal = false" (confirm)="deleteItem()">
  <p>Are you sure you want to delete this item?</p>
</app-modal>
```
