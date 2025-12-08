# 🟥 Scenario 5: Tab Container - Solution

```typescript
@Component({
  selector: 'app-tab-panel',
  template: `<div [hidden]="!active"><ng-content></ng-content></div>`
})
export class TabPanelComponent {
  @Input() title = '';
  active = false;
}

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tab-headers">
      @for (tab of tabs; track $index) {
        <button [class.active]="tab.active" (click)="selectTab($index)">
          {{ tab.title }}
        </button>
      }
    </div>
    <ng-content></ng-content>
  `
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabPanelComponent) tabs!: QueryList<TabPanelComponent>;
  @Output() tabChange = new EventEmitter<number>();
  
  ngAfterContentInit(): void {
    if (this.tabs.length > 0) this.selectTab(0);
  }
  
  selectTab(index: number): void {
    this.tabs.forEach((tab, i) => tab.active = i === index);
    this.tabChange.emit(index);
  }
}

// Usage
<app-tabs (tabChange)="onTabChange($event)">
  <app-tab-panel title="Tab 1">Content 1</app-tab-panel>
  <app-tab-panel title="Tab 2">Content 2</app-tab-panel>
</app-tabs>
```
