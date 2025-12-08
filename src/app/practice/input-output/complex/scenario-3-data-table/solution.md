# 🟥 Scenario 3: Data Table - Solution

```typescript
@Component({
  selector: 'app-data-table',
  template: `
    <table>
      <thead>
        <tr>
          @for (col of columns; track col.key) {
            <th (click)="onSort(col.key)">
              {{ col.label }} {{ sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '' }}
            </th>
          }
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (row of data; track row.id) {
          <tr (click)="onRowSelect(row)" [class.selected]="selectedRow === row">
            @for (col of columns; track col.key) {
              <td>{{ row[col.key] }}</td>
            }
            <td>
              <button (click)="onAction('edit', row, $event)">Edit</button>
              <button (click)="onAction('delete', row, $event)">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  
  @Output() sort = new EventEmitter<{key: string, direction: string}>();
  @Output() rowSelect = new EventEmitter<any>();
  @Output() action = new EventEmitter<{type: string, row: any}>();
  
  sortKey = '';
  sortDir = 'asc';
  selectedRow: any = null;
  
  onSort(key: string): void {
    this.sortDir = this.sortKey === key && this.sortDir === 'asc' ? 'desc' : 'asc';
    this.sortKey = key;
    this.sort.emit({ key, direction: this.sortDir });
  }
  
  onRowSelect(row: any): void {
    this.selectedRow = row;
    this.rowSelect.emit(row);
  }
  
  onAction(type: string, row: any, event: Event): void {
    event.stopPropagation();
    this.action.emit({ type, row });
  }
}
```
