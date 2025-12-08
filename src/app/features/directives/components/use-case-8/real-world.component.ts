/**
 * ============================================================================
 * USE CASE 8: REAL-WORLD DIRECTIVES
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
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);
    private hasView = false;

    @Input() appPermission: string[] = [];

    // Simulated current user roles (in real app, inject UserService)
    private currentUserRoles = ['user', 'editor'];

    ngOnInit(): void {
        this.checkPermission();
    }

    private checkPermission(): void {
        const hasPermission = this.appPermission.some(role =>
            this.currentUserRoles.includes(role)
        );

        if (hasPermission && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!hasPermission && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}

// ============================================================================
// DIRECTIVE 2: appLazyLoad - Lazy load images
// ============================================================================
@Directive({
    selector: '[appLazyLoad]',
    standalone: true
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private observer: IntersectionObserver | null = null;

    @Input() appLazyLoad = ''; // The actual image URL
    @Input() placeholder = 'https://via.placeholder.com/300x200?text=Loading...';
    @Output() loaded = new EventEmitter<void>();

    ngAfterViewInit(): void {
        // Set placeholder initially
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholder);

        // Use IntersectionObserver for lazy loading
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage();
                }
            });
        }, { threshold: 0.1 });

        this.observer.observe(this.el.nativeElement);
    }

    private loadImage(): void {
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.appLazyLoad);
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.5s');

        this.el.nativeElement.onload = () => {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.loaded.emit();
        };

        this.observer?.disconnect();
    }

    ngOnDestroy(): void {
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

    constructor() {
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
        this.renderer.listen(this.el.nativeElement, 'click', () => {
            this.copy();
        });
    }

    private copy(): void {
        const text = this.appCopyToClipboard || this.el.nativeElement.textContent;

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

    ngOnInit(): void {
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
            <h1>🌍 Use Case 8: Real-world Directives</h1>
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

    onCopied(text: string): void {
        this.copiedText = text;
        setTimeout(() => this.copiedText = '', 2000);
    }

    onDebounceClick(): void {
        this.debounceClicks++;
    }
}
