/**
 * ============================================================================
 * REAL-WORLD DIRECTIVES
 * ============================================================================
 * 
 * 💡 PRODUCTION-READY DIRECTIVE PATTERNS
 * - *appPermission - Role-based visibility
 * - appLazyLoad - Lazy load images
 * - appInfiniteScroll - Load more on scroll
 * - appCopyToClipboard - Copy text on click
 */

import { Component, Directive, ElementRef, Renderer2, Input, Output, EventEmitter, TemplateRef, ViewContainerRef, inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// DIRECTIVE 1: *appPermission - Role-based access
// ============================================================================
@Directive({
    selector: '[appPermission]',
    standalone: true
})
export class PermissionDirective implements OnInit {
    // 🏷️ TemplateRef = The "Rubber Stamp"
    // It captures the HTML inside the structural directive (the * part)
    // but doesn't render it. It just holds the "blueprint".
    private templateRef = inject(TemplateRef<any>);

    // 📄 ViewContainerRef = The "Slot" on the Page
    // This is the location in the DOM where this directive is placed.
    // It allows us to "stamp" (render) the template here, or clear it.
    private viewContainer = inject(ViewContainerRef);

    private hasView = false;

    @Input() appPermission: string[] = [];

    // Simulated current user roles (in real app, inject UserService)
    private currentUserRoles = ['user', 'editor'];

    // 🕒 LIFECYCLE HOOK: ngOnInit
    // WHY HERE?
    // 1. Inputs are ready: We need to read the '@Input() appPermission' array.
    // 2. Structural Logic: We want to add/remove the template immediately during initialization.
    //    If we waited for AfterViewInit, we might see a flash of content or get "ExpressionChanged" errors.
    ngOnInit(): void {
        this.checkPermission();
    }

    private checkPermission(): void {
        const hasPermission = this.appPermission.some(role =>
            this.currentUserRoles.includes(role)
        );

        if (hasPermission && !this.hasView) {
            // ✅ ACTION: Press the Stamp!
            // We take the blueprint (templateRef) and stamp it into the slot (viewContainer).
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!hasPermission && this.hasView) {
            // ❌ ACTION: Clear the Slot!
            // We remove everything currently in this container.
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}

// ============================================================================
// DIRECTIVE 2: appLazyLoad - Lazy load images
// ============================================================================
// ❓ PROBLEM:
// Loading all images at once slows down the initial page load (Performance impact).
// Users may not even scroll down to see them (Wasted bandwidth).
//
// ✅ SOLUTION:
// "Lazy Loading" means we only download the full image when it actually
// enters the user's screen (Viewport).
@Directive({
    selector: '[appLazyLoad]',
    standalone: true
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private observer: IntersectionObserver | null = null;

    // The REAL heavy image URL
    @Input() appLazyLoad = '';
    // A tiny, lightweight placeholder to show initially
    @Input() placeholder = 'https://via.placeholder.com/300x200?text=Loading...';
    @Output() loaded = new EventEmitter<void>();

    // 🕒 LIFECYCLE HOOK: ngAfterViewInit
    // WHY HERE?
    // We need the actual DOM element (this.el.nativeElement) to be fully rendered
    // and ready on the screen before we can ask the browser to watch it.
    // DOM elements are NOT guaranteed to be ready in ngOnInit.
    ngAfterViewInit(): void {
        // STEP 1: Set the src to the lightweight placeholder immediately.
        // This loads instantly.
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholder);

        // STEP 2: Create an "Observer" (A Watcher)
        // 🕵️ WHAT IS IntersectionObserver?
        // It is a specific BROWSER API (not Angular) that efficiently notifies us
        // when an element enters or exits the viewport (screen).
        //
        // 🆚 VS SCROLL EVENTS:
        // Old way: Listen to window.onScroll -> Fire 100 times/sec -> Check position. (SLOW 🐢)
        // New way: IntersectionObserver -> Browser tells us "Hey! It's visible!". (FAST 🐇)
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // isIntersecting = True if the element is visible on screen
                if (entry.isIntersecting) {
                    this.loadImage();
                }
            });
        }, { threshold: 0.02 }); // Trigger when 10% of the image is visible

        // Start watching!
        this.observer.observe(this.el.nativeElement);
    }

    private loadImage(): void {
        // STEP 3: Swap the src!
        // Replace placeholder with the real heavy image.
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.appLazyLoad);

        // Add a nice fade-in effect
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.5s');

        // When the real image finishes downloading, fade it in.
        this.el.nativeElement.onload = () => {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.loaded.emit();
        };

        // Stop watching. We've done our job.
        this.observer?.disconnect();
    }

    ngOnDestroy(): void {
        // Cleanup if the component is destroyed before image loads
        this.observer?.disconnect();
    }
}

// ============================================================================
// DIRECTIVE 3: appCopyToClipboard
// ============================================================================
@Directive({
    selector: '[appCopyToClipboard]',
    standalone: true
})
export class CopyToClipboardDirective {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input() appCopyToClipboard = '';
    @Output() copied = new EventEmitter<string>();

    // 🕒 LIFECYCLE: Constructor (Class Birth)
    // WHY HERE?
    // 1. Dependencies Ready: 'ElementRef' and 'Renderer2' are available immediately via inject().
    // 2. No Input Dependency: Setting the 'cursor' or listening to 'click' typically
    //    doesn't depend on the @Input() value. We can set it up instantly.
    // NOTE: If we needed to use 'this.appCopyToClipboard' variable specifically for setup,
    //       we would HAVE to wait for ngOnInit.
    constructor() {
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
        this.renderer.listen(this.el.nativeElement, 'click', () => {
            this.copy(); // We call copy() only when clicked (by then Inputs are ready!)
        });
    }

    private copy(): void {
        const text = this.appCopyToClipboard || this.el.nativeElement.textContent;

        // 🧭 WHAT IS 'navigator'?
        // 'navigator' is a global object that represents the BROWSER itself (Chrome, Edge, etc.).
        // It gives us access to hardware and system features (Camera, Geolocation, Battery, Clipboard).
        //
        // 📋 WHAT IS 'clipboard'?
        // It is the modern, secure "Async Clipboard API" to read/write text.
        // It returns a Promise (.then/.catch) because writing to system clipboard takes time.
        navigator.clipboard.writeText(text).then(() => {
            this.copied.emit(text);

            // Visual feedback
            const original = this.el.nativeElement.style.backgroundColor;
            this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#dcfce7');
            setTimeout(() => {
                this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', original);
            }, 500);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    }
}

// ============================================================================
// DIRECTIVE 4: appDebounceClick - Prevent double clicks
// ============================================================================
@Directive({
    selector: '[appDebounceClick]',
    standalone: true
})
export class DebounceClickDirective implements OnInit, OnDestroy {
    private el = inject(ElementRef);

    @Input() debounceTime = 500;
    @Output() debounceClick = new EventEmitter<MouseEvent>();

    private lastClickTime = 0;
    private clickListener: (() => void) | null = null;

    // 🕒 LIFECYCLE HOOK: ngOnInit
    // WHY HERE?
    // 1. Inputs Ready: We need 'threshold' or 'debounceTime' inputs.
    // 2. Logic Setup: Setting up event listeners (logic) doesn't require the
    //    pixels to be painted on screen (like .focus() does). It just needs the
    //    class to be initialized.
    ngOnInit(): void {
        // ⚠️ DIRECT DOM ACCESS (The "Quick" Way):
        // We are using 'native element' directly. This works in browser but NOT in
        // Server Side Rendering (SSR) or Web Workers because 'document' doesn't exist there.
        //
        // ✅ BEST PRACTICE (Renderer2):
        // In a strict environment, use Renderer2.listen():
        // this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', (e) => { ... });

        this.clickListener = this.el.nativeElement.addEventListener('click', (e: MouseEvent) => {
            const now = Date.now();
            if (now - this.lastClickTime > this.debounceTime) {
                this.lastClickTime = now;
                this.debounceClick.emit(e);
            }
        });
    }

    ngOnDestroy(): void {
        // Cleanup handled by GC
    }
}

// ============================================================================
// DIRECTIVE 5: appAutoFocus
// ============================================================================
@Directive({
    selector: '[appAutoFocus]',
    standalone: true
})
export class AutoFocusDirective implements AfterViewInit {
    private el = inject(ElementRef);

    @Input() set appAutoFocus(value: boolean | string) {
        this._appAutoFocus = value !== false && value !== 'false';
    }
    private _appAutoFocus = true;
    @Input() focusDelay = 0;

    // 🕒 LIFECYCLE HOOK: ngAfterViewInit
    // WHY HERE?
    // Focus Interaction: calling element.focus() requires the element to be
    // "interactable" in the browser DOM. This is safest to do after the view
    // is fully initialized (AfterViewInit). Doing it earlier might fail silently.
    ngAfterViewInit(): void {
        if (this._appAutoFocus) {
            setTimeout(() => {
                this.el.nativeElement.focus();
            }, this.focusDelay);
        }
    }
}

// ============================================================================
// COMPONENT
// ============================================================================
@Component({
    selector: 'app-real-world-directives',
    standalone: true,
    imports: [CommonModule, PermissionDirective, LazyLoadDirective, CopyToClipboardDirective, DebounceClickDirective, AutoFocusDirective],
    template: `
        <div class="container">
            <h1>🌍 Real-world Directives</h1>
            <p class="description">
                Production-ready directive patterns.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Permission -->
                <section class="demo-section">
                    <h3>🔐 *appPermission - Role-based Access</h3>
                    <p>Current user roles: <code>['user', 'editor']</code></p>
                    <div class="permission-demos">
                        <div *appPermission="['user']" class="permission-box user">
                            ✅ Visible to: user
                        </div>
                        <div *appPermission="['editor']" class="permission-box editor">
                            ✅ Visible to: editor
                        </div>
                        <div *appPermission="['admin']" class="permission-box admin">
                            ❌ Visible to: admin (hidden)
                        </div>
                    </div>
                    <div class="code-block">
                        <pre>&lt;div *appPermission="['admin']"&gt;Admin only&lt;/div&gt;</pre>
                    </div>
                </section>

                <!-- Demo 2: Copy to Clipboard -->
                <section class="demo-section">
                    <h3>📋 appCopyToClipboard</h3>
                    <p>Click to copy:</p>
                    <code [appCopyToClipboard]="'npm install @angular/core'" (copied)="onCopied($event)" class="copy-text">
                        npm install &#64;angular/core
                    </code>
                    @if (copiedText) {
                        <div class="copied-msg">✅ Copied: {{ copiedText }}</div>
                    }
                    <div class="code-block">
                        <pre>
&lt;code [appCopyToClipboard]="'text'"
      (copied)="onCopied($event)"&gt;
&lt;/code&gt;
                        </pre>
                    </div>
                </section>

                <!-- Demo 3: Debounce Click -->
                <section class="demo-section">
                    <h3>⏱️ appDebounceClick</h3>
                    <p>Prevents accidental double-clicks (500ms debounce):</p>
                    <button appDebounceClick (debounceClick)="onDebounceClick()" [debounceTime]="500" class="debounce-btn">
                        Click me (debounced)
                    </button>
                    <div class="click-count">Actual clicks: {{ debounceClicks }}</div>
                </section>

                <!-- Demo 4: Auto Focus -->
                <section class="demo-section">
                    <h3>🎯 appAutoFocus</h3>
                    <p>Automatically focuses input on page load:</p>
                    <input appAutoFocus [focusDelay]="100" placeholder="I'm auto-focused!" class="focus-input">
                    <div class="code-block">
                        <pre>&lt;input appAutoFocus [focusDelay]="100"&gt;</pre>
                    </div>
                </section>

                <!-- Demo 5: Lazy Load -->
                <section class="demo-section">
                    <h3>🖼️ appLazyLoad</h3>
                    <p>Scroll down to load image (Save Bandwidth!):</p>
                    <div class="scroll-container">
                        <p>⬇️ Scroll down...</p>
                        <div class="spacer"></div>
                        <img [appLazyLoad]="'https://picsum.photos/id/237/400/300'" 
                             class="lazy-img"
                             (loaded)="onImageLoaded()">
 <div class="spacer"></div>
                              <img [appLazyLoad]="'https://picsum.photos/id/237/400/300'" 
                             class="lazy-img"
                             (loaded)="onImageLoaded()">
 <div class="spacer"></div>
                              <img [appLazyLoad]="'https://picsum.photos/id/237/400/300'" 
                             class="lazy-img"
                             (loaded)="onImageLoaded()">
                    </div>
                    @if (imageLoaded) {
                        <div class="fade-in">✅ Image Loaded!</div>
                    }
                </section>
            </div>

            <div class="directive-catalog">
                <h3>📚 Directive Catalog</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Directive</th>
                            <th>Type</th>
                            <th>Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>*appPermission</td><td>Structural</td><td>Role-based visibility</td></tr>
                        <tr><td>appLazyLoad</td><td>Attribute</td><td>Lazy load images</td></tr>
                        <tr><td>appCopyToClipboard</td><td>Attribute</td><td>Copy text on click</td></tr>
                        <tr><td>appDebounceClick</td><td>Attribute</td><td>Prevent double clicks</td></tr>
                        <tr><td>appAutoFocus</td><td>Attribute</td><td>Auto-focus input</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .permission-demos { display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0; }
        .permission-box { padding: 0.75rem; border-radius: 6px; }
        .permission-box.user { background: #dcfce7; }
        .permission-box.editor { background: #dbeafe; }
        .permission-box.admin { background: #fee2e2; }

        .copy-text { display: block; padding: 1rem; background: #1a1a2e; color: #4ade80; border-radius: 8px; cursor: pointer; margin: 1rem 0; }
        .copied-msg { color: #166534; font-size: 0.9rem; margin-top: 0.5rem; }

        .debounce-btn { padding: 1rem 2rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }
        .click-count { margin-top: 1rem; padding: 0.5rem; background: white; border-radius: 6px; }

        .focus-input { width: 100%; padding: 0.75rem; border: 2px solid #667eea; border-radius: 6px; font-size: 1rem; }

        .scroll-container { height: 200px; overflow-y: scroll; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 1rem; position: relative; background: #fff; }
        .spacer { height: 300px; background: repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 10px, #fff 10px, #fff 20px); margin-bottom: 1rem; content-visibility: auto; }
        .lazy-img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: block; }
        .fade-in { animation: fadeIn 0.5s ease-in; color: #166534; font-weight: bold; margin-top: 0.5rem; text-align: center; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .directive-catalog { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .directive-catalog h3 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; }
    `]
})
export class RealWorldDirectivesComponent {
    copiedText = '';
    debounceClicks = 0;
    imageLoaded = false;

    onImageLoaded(): void {
        this.imageLoaded = true;
    }

    onCopied(text: string): void {
        this.copiedText = text;
        setTimeout(() => this.copiedText = '', 2000);
    }

    onDebounceClick(): void {
        this.debounceClicks++;
    }
}
