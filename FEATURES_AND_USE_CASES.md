# 🚀 Angular Features & Use Cases

> A comprehensive reference guide for all Angular features in this project with icons for easy navigation and understanding.

---

## 📋 Table of Contents

1. [Core Framework Features](#core-framework-features)
2. [Component Architecture](#component-architecture)
3. [Forms & Data Entry](#forms--data-entry)
4. [Navigation & Routing](#navigation--routing)
5. [State Management](#state-management)
6. [HTTP & Data Fetching](#http--data-fetching)
7. [Performance & Optimization](#performance--optimization)
8. [Security](#security)
9. [Testing](#testing)
10. [Advanced Patterns](#advanced-patterns)

---

## 🏗️ Core Framework Features

### 📦 NgModules
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: Feature Modules | Organize code into cohesive feature areas |
| 🔗 | **Use Case 2**: Shared Modules | Share common components, directives, pipes |
| 📚 | **Use Case 3**: Core Module | Singleton services (one-time setup) |
| 🚀 | **Use Case 4**: Lazy Loading | Load modules on demand for performance |
| 📋 | **Use Case 5**: Module Providers | Control DI scope with module-level providers |

---

### 🎨 Standalone APIs
| Icon | Use Case | Description |
|------|----------|-------------|
| ⚡ | **Use Case 1**: Standalone Components | Create components without NgModules |
| 🔧 | **Use Case 2**: bootstrapApplication | Bootstrap app without AppModule |
| 📦 | **Use Case 3**: importProvidersFrom | Convert modules to providers |
| 🛡️ | **Use Case 4**: Standalone with Routing | Configure routes without RouterModule |
| 🔄 | **Use Case 5**: Migration Strategy | Migrate from modules to standalone |

---

### 💉 Services & Dependency Injection
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: Basic Service | Create and inject services |
| 🌳 | **Use Case 2**: providedIn Root | Singleton services (app-wide) |
| 📦 | **Use Case 3**: providedIn Feature | Scoped to feature module |
| 🏭 | **Use Case 4**: Factory Providers | Create instances with factories |
| 🎭 | **Use Case 5**: useClass/useValue | Token replacement strategies |
| 🔍 | **Use Case 6**: Resolution Modifiers | @Optional, @Self, @SkipSelf, @Host |

---

### 🔄 Lifecycle Hooks
| Icon | Use Case | Description |
|------|----------|-------------|
| 🚀 | **Use Case 1**: ngOnInit | Initialization after constructor |
| 🔄 | **Use Case 2**: ngOnChanges | Respond to @Input changes |
| 🎯 | **Use Case 3**: ngAfterViewInit | Access DOM after view renders |
| 📦 | **Use Case 4**: ngAfterContentInit | Access projected content |
| 🧹 | **Use Case 5**: ngOnDestroy | Cleanup (unsubscribe, timers) |
| 🔍 | **Use Case 6**: ngDoCheck | Custom change detection |

---

## 🧩 Component Architecture

### 📡 Signals
| Icon | Use Case | Description |
|------|----------|-------------|
| 📻 | **Use Case 1**: Basic Signals | Create reactive state with signal() |
| 🔗 | **Use Case 2**: Computed Signals | Derived values from other signals |
| 👁️ | **Use Case 3**: Effect | Side effects when signals change |
| 🔄 | **Use Case 4**: Signal Inputs | Replace @Input with signal-based inputs |
| 📤 | **Use Case 5**: Model Inputs | Two-way binding with model() |
| 🔀 | **Use Case 6**: toSignal/toObservable | RxJS interop |

---

### 📥📤 Input/Output
| Icon | Use Case | Description |
|------|----------|-------------|
| ⬇️ | **Use Case 1**: Basic @Input | Pass data parent → child |
| ⬆️ | **Use Case 2**: Basic @Output | Emit events child → parent |
| 🔄 | **Use Case 3**: Two-Way Binding | [(value)] banana-in-a-box |
| 🎯 | **Use Case 4**: Input Transforms | Transform input values |
| ✅ | **Use Case 5**: Required Inputs | Mark inputs as mandatory |
| 📊 | **Use Case 6**: Input with ngOnChanges | Track input changes |

---

### 🔎 ViewChild/ContentChild
| Icon | Use Case | Description |
|------|----------|-------------|
| 👁️ | **Use Case 1**: Basic ViewChild | Query single child element |
| 📋 | **Use Case 2**: ViewChildren | Query multiple child elements |
| 📦 | **Use Case 3**: ContentChild | Query projected content |
| 📚 | **Use Case 4**: ContentChildren | Query multiple projected elements |
| 🧩 | **Use Case 5**: Static Option | Access in ngOnInit |

---

### 📦 Content Projection
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: Single-Slot | Basic ng-content |
| 🎨 | **Use Case 2**: Multi-Slot | Named ng-content with select |
| 🔄 | **Use Case 3**: Conditional Projection | ngProjectAs |
| 📋 | **Use Case 4**: ng-template ProjectAs | Template projection |
| 🎭 | **Use Case 5**: Default Content | Fallback content |

---

### 🔧 Directives
| Icon | Use Case | Description |
|------|----------|-------------|
| ✨ | **Use Case 1**: Basic Attribute Directive | Apply styles/behavior |
| 🎨 | **Use Case 2**: Directive with @Input | Configurable directives |
| 📤 | **Use Case 3**: @Output in Directives | Emit events from directives |
| 🖱️ | **Use Case 4**: @HostListener | Handle DOM events |
| 🎯 | **Use Case 5**: @HostBinding | Bind to host element properties |
| 🔀 | **Use Case 6**: Structural Directives | *ngIf-like custom directives |
| 🔧 | **Use Case 7**: exportAs | Expose directive instance |
| 🎭 | **Use Case 8**: Directive Composition API | Compose multiple directives |

---

### 🔧 Host Listener/Binding
| Icon | Use Case | Description |
|------|----------|-------------|
| 🖱️ | **Use Case 1**: Click Events | Handle click on host |
| ⌨️ | **Use Case 2**: Keyboard Events | Capture key events |
| 🎨 | **Use Case 3**: HostBinding class | Toggle CSS classes |
| 📐 | **Use Case 4**: HostBinding style | Dynamic inline styles |
| 🔧 | **Use Case 5**: HostBinding attribute | Set ARIA/data attributes |

---

### ⚡ Dynamic Components
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: ViewContainerRef | Basic dynamic creation |
| 📡 | **Use Case 2**: Input/Output Binding | Pass data to dynamic components |
| 📦 | **Use Case 3**: ngComponentOutlet | Declarative dynamic rendering |
| 🏭 | **Use Case 4**: ComponentFactoryResolver | Legacy dynamic approach |
| ⚡ | **Use Case 5**: Lazy Loading Components | On-demand component loading |

---

### ⏳ Defer Views (Angular 17+)
| Icon | Use Case | Description |
|------|----------|-------------|
| ⏰ | **Use Case 1**: Basic @defer | Lazy load template blocks |
| 👁️ | **Use Case 2**: on viewport | Load when visible in viewport |
| 🖱️ | **Use Case 3**: on interaction | Load on user interaction |
| ⏲️ | **Use Case 4**: on timer | Load after time delay |
| 🔄 | **Use Case 5**: @loading & @placeholder | Show during load states |
| ❌ | **Use Case 6**: @error | Handle loading errors |

---

## 📝 Forms & Data Entry

### 📋 Template Forms
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: Basic ngModel | Two-way binding with forms |
| ✅ | **Use Case 2**: Template Validation | Required, minlength, pattern |
| ❌ | **Use Case 3**: Error Messages | Display validation errors |
| 🔢 | **Use Case 4**: ngModelGroup | Group related fields |
| 🔄 | **Use Case 5**: Async Validators | Server-side validation |

---

### ⚡ Reactive Forms
| Icon | Use Case | Description |
|------|----------|-------------|
| 📐 | **Use Case 1**: FormControl/FormGroup | Basic reactive setup |
| ✅ | **Use Case 2**: Built-in Validators | Validators.required, email, etc. |
| 🔧 | **Use Case 3**: Custom Validators | Create reusable validators |
| 🔄 | **Use Case 4**: Async Validators | HTTP-based validation |
| 🎭 | **Use Case 5**: Cross-Field Validation | Compare password fields |
| 📦 | **Use Case 6**: FormArray | Dynamic fields list |
| 🏗️ | **Use Case 7**: FormBuilder | Cleaner form creation syntax |
| 🎨 | **Use Case 8**: updateOn | blur/submit strategies |
| 📡 | **Use Case 9**: valueChanges | Observe form changes |
| 🔗 | **Use Case 10**: Status Changes | Track validation status |

---

### 🔀 Pipes
| Icon | Use Case | Description |
|------|----------|-------------|
| 📅 | **Use Case 1**: Date Pipe | Format dates |
| 💰 | **Use Case 2**: Currency Pipe | Format currency values |
| 🔢 | **Use Case 3**: Number/Decimal Pipe | Format numbers |
| 🔤 | **Use Case 4**: Uppercase/Lowercase | Transform text case |
| 📚 | **Use Case 5**: Slice Pipe | Extract array portions |
| 🔍 | **Use Case 6**: Async Pipe | Subscribe to Observables |
| 🔧 | **Use Case 7**: Custom Pipes | Create reusable pipes |
| ⚡ | **Use Case 8**: Pure vs Impure Pipes | Performance considerations |

---

## 🧭 Navigation & Routing

### 🛤️ Routing
| Icon | Use Case | Description |
|------|----------|-------------|
| 🔗 | **Use Case 1**: Basic Navigation | routerLink vs href |
| 📍 | **Use Case 2**: Route Parameters | /user/:id dynamic segments |
| ❓ | **Use Case 3**: Query Parameters | ?search=term |
| 👶 | **Use Case 4**: Child Routes | Nested routing |
| 🚀 | **Use Case 5**: Lazy Loading Routes | loadChildren/loadComponent |

---

### 🛡️ Guards
| Icon | Use Case | Description |
|------|----------|-------------|
| 🔐 | **Use Case 1**: canActivate | Protect route access |
| 🚪 | **Use Case 2**: canDeactivate | Prevent leaving (unsaved changes) |
| 👶 | **Use Case 3**: canActivateChild | Protect child routes |
| 📦 | **Use Case 4**: canLoad | Prevent lazy module loading |
| 🔄 | **Use Case 5**: canMatch | Conditional route matching |
| 📡 | **Use Case 6**: Resolve | Pre-fetch data |
| 🔧 | **Use Case 7**: Functional Guards | inject()-based guards |
| 🎯 | **Use Case 8**: Combining Guards | Multiple guards on route |

---

## 📊 State Management

### 🏪 NgRx
| Icon | Use Case | Description |
|------|----------|-------------|
| 📦 | **Use Case 1**: Store Setup | StoreModule configuration |
| 🎯 | **Use Case 2**: Actions | Define action types |
| 🔄 | **Use Case 3**: Reducers | Pure state transformations |
| 🔍 | **Use Case 4**: Selectors | Query state efficiently |
| ⚡ | **Use Case 5**: Effects | Handle side effects |
| 🧩 | **Use Case 6**: Entity Adapter | Manage collections |

---

### 🔄 RxJS Subjects
| Icon | Use Case | Description |
|------|----------|-------------|
| 📡 | **Use Case 1**: BehaviorSubject | State with initial value |
| 🎭 | **Use Case 2**: Subject | Simple multicast |
| 🔄 | **Use Case 3**: ReplaySubject | Cache and replay values |
| ⚡ | **Use Case 4**: AsyncSubject | Only last value on complete |

---

### 🔗 RxJS-Signal Interop
| Icon | Use Case | Description |
|------|----------|-------------|
| 📡➡️📻 | **Use Case 1**: toSignal | Convert Observable to Signal |
| 📻➡️📡 | **Use Case 2**: toObservable | Convert Signal to Observable |
| 🔄 | **Use Case 3**: Effect with RxJS | Combine signals and observables |
| 🎯 | **Use Case 4**: Computed with Async | Derive from async sources |
| ⚡ | **Use Case 5**: Migration Patterns | Gradual RxJS→Signals migration |

---

## 🌐 HTTP & Data Fetching

### 📡 HTTP Client
| Icon | Use Case | Description |
|------|----------|-------------|
| 📥 | **Use Case 1**: GET Requests | Fetch data |
| 📤 | **Use Case 2**: POST Requests | Create resources |
| ✏️ | **Use Case 3**: PUT/PATCH | Update resources |
| 🗑️ | **Use Case 4**: DELETE | Remove resources |
| ⚡ | **Use Case 5**: Promise-based | Convert to Promise |
| 📋 | **Use Case 6**: Headers | Custom headers |
| 📊 | **Use Case 7**: Params | Query parameters |
| 🔄 | **Use Case 8**: Interceptors | Modify requests/responses |
| ❌ | **Use Case 9**: Error Handling | Handle HTTP errors |
| ⏰ | **Use Case 10**: Retry/Timeout | Resilience patterns |

---

### 💾 Caching Strategies
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: In-Memory Cache | Simple service cache |
| ⏰ | **Use Case 2**: Time-Based Expiry | Cache with TTL |
| 📦 | **Use Case 3**: LocalStorage Cache | Persistent caching |
| 🔄 | **Use Case 4**: shareReplay | RxJS-based caching |
| ⚡ | **Use Case 5**: Stale-While-Revalidate | Show cache, fetch fresh |

---

### ❌ Error Handling
| Icon | Use Case | Description |
|------|----------|-------------|
| 🌐 | **Use Case 1**: Global Error Handler | ErrorHandler service |
| 📡 | **Use Case 2**: HTTP Error Interceptor | Centralized HTTP errors |
| 🔄 | **Use Case 3**: Retry Strategies | Auto-retry on failure |
| 💬 | **Use Case 4**: User Notifications | Toast/snackbar errors |
| 🛡️ | **Use Case 5**: Graceful Degradation | Fallback content |

---

## ⚡ Performance & Optimization

### 🚀 Performance
| Icon | Use Case | Description |
|------|----------|-------------|
| 📊 | **Use Case 1**: OnPush Strategy | Reduce change detection |
| 🔍 | **Use Case 2**: trackBy | Optimize *ngFor |
| 📦 | **Use Case 3**: Lazy Loading | On-demand modules |
| 🖼️ | **Use Case 4**: Virtual Scrolling | Handle large lists |
| ⚡ | **Use Case 5**: Preloading Strategies | Background module loading |
| 🔧 | **Use Case 6**: Pure Pipes | Memoized transformations |

---

### 🔄 Zone & Change Detection
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: Zone.js Basics | How CD works |
| 🚫 | **Use Case 2**: NgZone.runOutsideAngular | Skip CD for events |
| 🔧 | **Use Case 3**: ChangeDetectorRef | Manual CD control |
| ⚡ | **Use Case 4**: Zoneless (Experimental) | provideZonelessChangeDetection |
| 📊 | **Use Case 5**: OnPush + Signals | Optimal CD strategy |

---

### 👷 Service Worker/PWA
| Icon | Use Case | Description |
|------|----------|-------------|
| 📦 | **Use Case 1**: Setup | @angular/service-worker |
| 💾 | **Use Case 2**: App Shell Caching | Cache static assets |
| 🌐 | **Use Case 3**: Data Caching | Runtime API caching |
| 🔄 | **Use Case 4**: Update Notifications | Prompt for updates |
| 📴 | **Use Case 5**: Offline Support | Work without network |

---

### 🖥️ SSR (Server-Side Rendering)
| Icon | Use Case | Description |
|------|----------|-------------|
| ⚡ | **Use Case 1**: Basic SSR Setup | @angular/ssr |
| 📄 | **Use Case 2**: Static Prerendering | Pre-generate pages |
| 🔄 | **Use Case 3**: Hydration | Client-side takeover |
| 🌐 | **Use Case 4**: API Calls in SSR | TransferState |
| 📊 | **Use Case 5**: SEO Optimization | Meta tags |

---

## 🔐 Security

### 🛡️ Security
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎭 | **Use Case 1**: XSS Protection | DomSanitizer |
| 🔗 | **Use Case 2**: Safe URLs | bypassSecurityTrustUrl |
| 📝 | **Use Case 3**: Safe HTML | bypassSecurityTrustHtml |
| 🔐 | **Use Case 4**: Auth Security | JWT/token handling |
| 🛡️ | **Use Case 5**: CSRF Protection | HttpXsrfTokenExtractor |

---

### 🔑 MSAL Authentication
| Icon | Use Case | Description |
|------|----------|-------------|
| 🔧 | **Use Case 1**: MSAL Setup | Configure MSAL provider |
| 🚀 | **Use Case 2**: Login/Logout | Redirect/popup flows |
| 🎫 | **Use Case 3**: Access Tokens | Acquire tokens silently |
| 🛡️ | **Use Case 4**: Guard Integration | Protect routes with MSAL |
| 📡 | **Use Case 5**: Interceptor | Auto-attach tokens |

---

## 🧪 Testing

### 🧪 Testing
| Icon | Use Case | Description |
|------|----------|-------------|
| 🎯 | **Use Case 1**: Unit Tests | Component testing |
| 📦 | **Use Case 2**: TestBed | Test module setup |
| 🎭 | **Use Case 3**: Mocking Services | Spy and stub |
| 🖱️ | **Use Case 4**: User Interaction | Click, type simulation |
| ⏰ | **Use Case 5**: Async Testing | fakeAsync, waitForAsync |
| 📡 | **Use Case 6**: HTTP Testing | HttpTestingController |
| 🛤️ | **Use Case 7**: Router Testing | RouterTestingModule |
| 📊 | **Use Case 8**: Coverage | Code coverage metrics |

---

## 🔮 Advanced Patterns

### 📚 Angular Libraries
| Icon | Use Case | Description |
|------|----------|-------------|
| 🏗️ | **Use Case 1**: Create Library | ng generate library |
| 📦 | **Use Case 2**: Build & Publish | npm publishing |
| 🎯 | **Use Case 3**: Secondary Entries | Subpath exports |
| 🔧 | **Use Case 4**: Schematics | Custom CLI commands |
| 🔗 | **Use Case 5**: Peer Dependencies | Dependency management |
| ⚡ | **Use Case 6**: ng-packagr | Build optimization |

---

## 📊 Quick Reference Matrix

| Category | Feature | # Use Cases | Complexity |
|----------|---------|-------------|------------|
| 🏗️ Core | NgModules | 5 | ⭐⭐ |
| 🏗️ Core | Standalone APIs | 5 | ⭐⭐ |
| 🏗️ Core | Services/DI | 6 | ⭐⭐⭐ |
| 🏗️ Core | Lifecycle Hooks | 6 | ⭐⭐ |
| 🧩 Components | Signals | 6 | ⭐⭐ |
| 🧩 Components | Input/Output | 6 | ⭐⭐ |
| 🧩 Components | ViewChild | 5 | ⭐⭐ |
| 🧩 Components | Content Projection | 5 | ⭐⭐⭐ |
| 🧩 Components | Directives | 8 | ⭐⭐⭐ |
| 🧩 Components | Host Listener | 5 | ⭐⭐ |
| 🧩 Components | Dynamic Components | 5 | ⭐⭐⭐⭐ |
| 🧩 Components | Defer Views | 6 | ⭐⭐ |
| 📝 Forms | Template Forms | 5 | ⭐⭐ |
| 📝 Forms | Reactive Forms | 10 | ⭐⭐⭐⭐ |
| 📝 Forms | Pipes | 8 | ⭐⭐ |
| 🧭 Navigation | Routing | 5 | ⭐⭐⭐ |
| 🧭 Navigation | Guards | 8 | ⭐⭐⭐ |
| 📊 State | NgRx | 6 | ⭐⭐⭐⭐⭐ |
| 📊 State | RxJS Subjects | 4 | ⭐⭐⭐ |
| 📊 State | RxJS-Signal Interop | 5 | ⭐⭐⭐ |
| 🌐 HTTP | HTTP Client | 10 | ⭐⭐⭐ |
| 🌐 HTTP | Caching | 5 | ⭐⭐⭐ |
| 🌐 HTTP | Error Handling | 5 | ⭐⭐⭐ |
| ⚡ Performance | Performance | 6 | ⭐⭐⭐⭐ |
| ⚡ Performance | Zone/CD | 5 | ⭐⭐⭐⭐ |
| ⚡ Performance | Service Worker | 5 | ⭐⭐⭐ |
| ⚡ Performance | SSR | 5 | ⭐⭐⭐⭐ |
| 🔐 Security | Security | 5 | ⭐⭐⭐⭐ |
| 🔐 Security | MSAL Auth | 5 | ⭐⭐⭐⭐ |
| 🧪 Testing | Testing | 8 | ⭐⭐⭐⭐ |
| 🔮 Advanced | Angular Libraries | 6 | ⭐⭐⭐⭐ |

---

## 🎯 Learning Path Recommendations

### 🌱 Beginner Path
1. 📦 NgModules / Standalone APIs
2. 💉 Basic Services & DI
3. 📥📤 Input/Output
4. 📋 Template Forms
5. 🛤️ Basic Routing

### 🌿 Intermediate Path
1. ⚡ Reactive Forms
2. 📡 HTTP Client
3. 🛡️ Guards
4. 📡 Signals
5. 🔧 Directives

### 🌳 Advanced Path
1. 🏪 NgRx State Management
2. ⚡ Dynamic Components
3. 🔄 Zone & Change Detection
4. 🖥️ SSR
5. 📚 Angular Libraries

---

> 💡 **Tip**: Each feature folder contains a `guide.md` with detailed explanations, code examples, diagrams, and interview questions!
