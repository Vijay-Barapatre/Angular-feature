# 🟦 Directives - Missing Exercises

## Exercise 3: HostBinding
```typescript
@Directive({ selector: '[appSize]' })
export class SizeDirective {
  @Input() appSize: 'small' | 'medium' | 'large' = 'medium';
  
  @HostBinding('style.fontSize')
  get fontSize(): string {
    const sizes = { small: '12px', medium: '16px', large: '24px' };
    return sizes[this.appSize];
  }
  
  @HostBinding('class.highlight')
  isHighlighted = false;
}
```

## Exercise 4: Input Decorator with Directives
```typescript
@Directive({ selector: '[appTooltip]' })
export class TooltipDirective {
  @Input('appTooltip') text = '';
  @Input() position: 'top' | 'bottom' = 'top';
  
  @HostListener('mouseenter')
  show(): void {
    // Create and position tooltip element
  }
}

// Usage
<button [appTooltip]="'Click me'" position="bottom">Hover</button>
```

## Complex Scenario 2: Permission Directive
```typescript
@Directive({ selector: '[appPermission]' })
export class PermissionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
  
  @Input() set appPermission(permission: string) {
    if (this.authService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

// Usage
<button *appPermission="'admin:delete'">Delete</button>
```
