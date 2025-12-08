# Angular Lifecycle Hooks Practice

Master Angular component lifecycle hooks through hands-on exercises.

## 📚 Overview

Lifecycle hooks are methods called by Angular during the lifecycle of a component or directive.

### Key Hooks

| Hook | Purpose | When Called |
|------|---------|-------------|
| `ngOnInit` | Initialize component | After first ngOnChanges |
| `ngOnChanges` | React to input changes | When input properties change |
| `ngOnDestroy` | Cleanup | Before component is destroyed |
| `ngAfterViewInit` | Access view children | After view is initialized |
| `ngAfterContentInit` | Access content children | After content is projected |

## 🎯 Exercises

### Basic (4 Exercises)
1. **OnInit/OnDestroy** - Component initialization and cleanup
2. **OnChanges** - Responding to input changes
3. **AfterViewInit** - Accessing view children
4. **AfterContentInit** - Working with projected content

### Complex (5 Scenarios)
1. **Timer with Cleanup** - Proper subscription management
2. **Lazy Loading Detection** - Change detection timing
3. **Dynamic Form** - Multiple lifecycle interactions
4. **Animation Hooks** - Lifecycle with animations  
5. **Performance Monitoring** - Lifecycle profiling
