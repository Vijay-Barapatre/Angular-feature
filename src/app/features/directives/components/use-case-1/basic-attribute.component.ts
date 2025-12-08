/**
 * ============================================================================
 * USE CASE 1: BASIC ATTRIBUTE DIRECTIVES
 * ============================================================================
 * 
 * 💡 WHAT IS AN ATTRIBUTE DIRECTIVE?
 * ----------------------------------
 * An attribute directive is a class that modifies the appearance or behavior
 * of a DOM element. Unlike components (which have templates), directives work
 * on existing elements.
 * 
 * They are applied like HTML attributes: <div appHighlight>
 * 
 * 📦 KEY ANGULAR CONCEPTS USED:
 * ----------------------------
 * - @Directive decorator: Marks a class as an Angular directive
 * - ElementRef: Provides direct access to the host DOM element
 * - Renderer2: Angular's abstraction for safe DOM manipulation
 * - inject(): Modern way to inject dependencies (Angular 14+)
 * 
 * 🛡️ WHY USE RENDERER2 INSTEAD OF DIRECT DOM ACCESS?
 * --------------------------------------------------
 * 1. Server-Side Rendering (SSR): Direct DOM access doesn't work on server
 * 2. Web Workers: DOM isn't available in web worker context
 * 3. Security: Renderer2 sanitizes inputs preventing XSS attacks
 * 4. Abstraction: Works across different rendering targets (DOM, Native, etc.)
 * 
 * ❌ BAD:  element.nativeElement.style.color = 'red';
 * ✅ GOOD: renderer.setStyle(element.nativeElement, 'color', 'red');
 */

import { Component, Directive, ElementRef, Renderer2, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// DIRECTIVE 1: Simple Highlight
// ============================================================================
/**
 * HighlightDirective
 * 
 * PURPOSE: Applies a yellow background highlight to any element.
 * 
 * USAGE: <span appHighlight>This text is highlighted</span>
 * 
 * HOW IT WORKS:
 * 1. Angular finds elements with [appHighlight] attribute
 * 2. Creates an instance of this directive for each match
 * 3. Injects ElementRef (host element) and Renderer2 (DOM helper)
 * 4. On initialization (ngOnInit), applies styles to the element
 */
@Directive({
    selector: '[appHighlight]',   // CSS attribute selector - matches <div appHighlight>
    standalone: true              // Standalone directive (no NgModule required)
})
export class HighlightDirective implements OnInit {
    // 🔧 DEPENDENCY INJECTION (Modern Style)
    // inject() is the modern way to get dependencies (Angular 14+)
    // It's equivalent to constructor injection but more flexible
    private el = inject(ElementRef);       // Reference to the DOM element this directive is on
    private renderer = inject(Renderer2);  // Safe DOM manipulation service

    /**
     * ngOnInit - Angular Lifecycle Hook
     * 
     * Called once after Angular has initialized all data-bound properties.
     * This is the right place to apply our styles because:
     * - The element definitely exists in the DOM
     * - All inputs have been initialized
     */
    ngOnInit(): void {
        // 🛡️ CRITICAL: Use Renderer2 instead of direct DOM manipulation!
        // This ensures compatibility with server-side rendering and web workers.

        // setStyle(element, styleName, value) - Sets a CSS style property
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#fef3c7');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '0.25rem 0.5rem');
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');

        // 📝 EQUIVALENT DIRECT DOM (but NOT recommended):
        // this.el.nativeElement.style.backgroundColor = '#fef3c7';
    }
}

// ============================================================================
// DIRECTIVE 2: Tooltip
// ============================================================================
/**
 * TooltipDirective
 * 
 * PURPOSE: Shows a tooltip popup when user hovers over an element.
 * 
 * USAGE: <button appTooltip>Hover me</button>
 * 
 * HOW IT WORKS:
 * 1. Sets up mouse event listeners on the host element
 * 2. On mouseenter: Creates and appends tooltip element
 * 3. On mouseleave: Removes the tooltip element
 * 
 * DEMONSTRATES:
 * - Dynamic element creation with Renderer2
 * - Event handling with Renderer2.listen()
 * - Cleanup of dynamically created elements
 */
@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    // Store reference to tooltip element so we can remove it later
    private tooltipElement: HTMLElement | null = null;

    ngOnInit(): void {
        // Set up the host element for tooltip positioning
        // 'position: relative' allows tooltip to be positioned relative to this element
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'help');  // Visual hint

        // 🎯 EVENT BINDING WITH RENDERER2
        // renderer.listen(target, eventName, callback) - Attaches event listeners safely
        // Returns an unsubscribe function (not used here, but useful for cleanup)
        this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
        this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
    }

    /**
     * show() - Creates and displays the tooltip
     * 
     * DOM CREATION WITH RENDERER2:
     * - createElement('tagName') - Creates a new element
     * - createText('content') - Creates a text node
     * - appendChild(parent, child) - Appends child to parent
     * - setStyle() - Sets inline CSS styles
     */
    private show(): void {
        // 1️⃣ Create the tooltip container element
        this.tooltipElement = this.renderer.createElement('span');

        // 2️⃣ Create text content and add to tooltip
        const text = this.renderer.createText('This is a tooltip!');
        this.renderer.appendChild(this.tooltipElement, text);

        // 3️⃣ Style the tooltip with absolute positioning
        this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
        this.renderer.setStyle(this.tooltipElement, 'top', '-30px');       // Position above
        this.renderer.setStyle(this.tooltipElement, 'left', '0');
        this.renderer.setStyle(this.tooltipElement, 'backgroundColor', '#1a1a2e');
        this.renderer.setStyle(this.tooltipElement, 'color', 'white');
        this.renderer.setStyle(this.tooltipElement, 'padding', '0.25rem 0.5rem');
        this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
        this.renderer.setStyle(this.tooltipElement, 'fontSize', '0.8rem');
        this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
        this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');     // Above other elements

        // 4️⃣ Append tooltip to the host element
        this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    }

    /**
     * hide() - Removes the tooltip from DOM
     * 
     * ⚠️ IMPORTANT: Always clean up dynamically created elements!
     * Memory leaks can occur if elements aren't properly removed.
     */
    private hide(): void {
        if (this.tooltipElement) {
            // removeChild(parent, child) - Removes child from parent
            this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
            this.tooltipElement = null;  // Clear reference for garbage collection
        }
    }
}

// ============================================================================
// DIRECTIVE 3: Text Transform
// ============================================================================
/**
 * UppercaseDirective
 * 
 * PURPOSE: Transforms text to uppercase via CSS.
 * 
 * USAGE: <p appUppercase>this becomes UPPERCASE</p>
 * 
 * NOTE: This uses CSS text-transform, so the actual text content
 * in the DOM remains unchanged - only the visual display is affected.
 */
@Directive({
    selector: '[appUppercase]',
    standalone: true
})
export class UppercaseDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        // text-transform: uppercase - CSS property that uppercases text
        this.renderer.setStyle(this.el.nativeElement, 'textTransform', 'uppercase');

        // letter-spacing: 0.05em - Adds slight spacing between letters
        // This is a common design pattern for uppercase text (improves readability)
        this.renderer.setStyle(this.el.nativeElement, 'letterSpacing', '0.05em');
    }
}

// ============================================================================
// DIRECTIVE 4: Border Decorator
// ============================================================================
/**
 * BorderDirective
 * 
 * PURPOSE: Applies a decorative border with padding to any element.
 * 
 * USAGE: <div appBorder>Content with border</div>
 * 
 * DEMONSTRATES: Simple styling directive that can be reused
 * across the application for consistent visual styling.
 */
@Directive({
    selector: '[appBorder]',
    standalone: true
})
export class BorderDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        // Apply a purple border with rounded corners
        this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #667eea');
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '8px');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '1rem');
    }
}

// ============================================================================
// COMPONENT - Demonstrates all directives
// ============================================================================
/**
 * BasicAttributeComponent
 * 
 * This component demonstrates how to use the attribute directives defined above.
 * 
 * KEY POINTS:
 * 1. Import directives in the 'imports' array (standalone components)
 * 2. Use directives as HTML attributes in the template
 * 3. Directives can be combined on the same element
 * 
 * Example: <span appHighlight appUppercase>Highlighted and UPPERCASE</span>
 */
@Component({
    selector: 'app-basic-attribute',
    standalone: true,
    // 📦 IMPORTS: Include all directives that will be used in the template
    imports: [CommonModule, HighlightDirective, TooltipDirective, UppercaseDirective, BorderDirective],
    template: `
        <div class="container">
            <h1>🎨 Use Case 1: Basic Attribute Directives</h1>
            <p class="description">
                Simple directives that modify element appearance.
            </p>

            <div class="demo-grid">
                <!-- Demo 1: Highlight -->
                <section class="demo-section">
                    <h3>🌟 appHighlight Directive</h3>
                    <p>Apply a background highlight to text:</p>
                    <p>This is <span appHighlight>highlighted text</span> using a directive.</p>
                    <div class="code-block">
                        <pre>&lt;span appHighlight&gt;highlighted text&lt;/span&gt;</pre>
                    </div>
                </section>

                <!-- Demo 2: Tooltip -->
                <section class="demo-section">
                    <h3>💬 appTooltip Directive</h3>
                    <p>Hover over the element below:</p>
                    <p appTooltip class="tooltip-demo">Hover me for tooltip!</p>
                    <div class="code-block">
                        <pre>&lt;p appTooltip&gt;Hover me&lt;/p&gt;</pre>
                    </div>
                </section>

                <!-- Demo 3: Uppercase -->
                <section class="demo-section">
                    <h3>🔠 appUppercase Directive</h3>
                    <p>Transform text to uppercase:</p>
                    <p appUppercase>this text is uppercased by directive</p>
                    <div class="code-block">
                        <pre>&lt;p appUppercase&gt;text&lt;/p&gt;</pre>
                    </div>
                </section>

                <!-- Demo 4: Border -->
                <section class="demo-section">
                    <h3>📦 appBorder Directive</h3>
                    <p>Add decorative border:</p>
                    <div appBorder>
                        This content has a border applied by directive.
                    </div>
                    <div class="code-block">
                        <pre>&lt;div appBorder&gt;content&lt;/div&gt;</pre>
                    </div>
                </section>
            </div>

            <div class="key-concepts">
                <h3>🔑 Key Concepts</h3>
                <div class="concept-grid">
                    <div class="concept">
                        <h4>&#64;Directive</h4>
                        <p>Decorator that marks a class as a directive</p>
                    </div>
                    <div class="concept">
                        <h4>ElementRef</h4>
                        <p>Reference to the host DOM element</p>
                    </div>
                    <div class="concept">
                        <h4>Renderer2</h4>
                        <p>Safe, platform-agnostic DOM manipulation</p>
                    </div>
                    <div class="concept">
                        <h4>Selector</h4>
                        <p>[appName] - Applied as attribute</p>
                    </div>
                </div>
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

        .tooltip-demo { display: inline-block; background: #667eea; color: white; padding: 0.5rem 1rem; border-radius: 6px; }

        .code-block { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .code-block pre { color: #4ade80; margin: 0; font-size: 0.85rem; }

        .key-concepts { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .key-concepts h3 { margin-top: 0; }
        .concept-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .concept { background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center; }
        .concept h4 { margin: 0 0 0.5rem 0; color: #667eea; font-size: 0.9rem; }
        .concept p { margin: 0; color: #666; font-size: 0.8rem; }
    `]
})
export class BasicAttributeComponent { }
