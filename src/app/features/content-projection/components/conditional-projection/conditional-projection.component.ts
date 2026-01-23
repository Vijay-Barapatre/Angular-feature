/**
 * ============================================================================
 * CONDITIONAL PROJECTION
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * Conditional projection controls WHEN projected content is rendered using:
 * - @if blocks to show/hide projected content
 * - @ContentChild to detect if content was provided
 * - ng-template for fallback/default content
 * 
 * 📊 KEY PATTERNS SHOWN:
 * 
 * PATTERN 1: Expandable Panel (Lazy Rendering)
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  CHILD TEMPLATE                                                     │
 * │                                                                     │
 * │  <div class="header" (click)="toggle()">                           │
 * │      <ng-content select="[panel-title]">  ← ALWAYS shown           │
 * │  </div>                                                             │
 * │                                                                     │
 * │  @if (isExpanded) {                       ← CONDITIONAL!           │
 * │      <div class="body">                                             │
 * │          <ng-content select="[panel-content]">  ← Only when open   │
 * │      </div>                                                         │
 * │  }                                                                  │
 * │                                                                     │
 * └─────────────────────────────────────────────────────────────────────┘
 * 
 * ⚡ BENEFIT: Content inside @if is NOT rendered until needed!
 *    This improves initial load performance for complex hidden content.
 * 
 * PATTERN 2: Smart Container (Fallback Content with @ContentChild)
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  CHILD COMPONENT                                                    │
 * │                                                                     │
 * │  @ContentChild('footerTemplate') footerTemplate?: TemplateRef;     │
 * │                     ↑                                               │
 * │                     Queries for ng-template with #footerTemplate    │
 * │                                                                     │
 * │  CHILD TEMPLATE:                                                    │
 * │                                                                     │
 * │  @if (footerTemplate) {                                            │
 * │      <ng-container *ngTemplateOutlet="footerTemplate">             │
 * │  } @else {                                                          │
 * │      <div class="default-footer">Default Footer</div>              │
 * │  }                                                                  │
 * │                                                                     │
 * └─────────────────────────────────────────────────────────────────────┘
 * 
 * 💡 USE CASE: Show default content when parent doesn't provide template!
 * 
 * ============================================================================
 */

import { Component, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * ============================================================================
 * COMPONENT 1: ExpandablePanelComponent
 * ============================================================================
 * 
 * 📦 PURPOSE: An accordion-style panel where body content is ONLY rendered
 *            when the panel is expanded. This is "lazy" content projection.
 * 
 * 🎯 HOW IT WORKS:
 * 
 *   1. Title slot (panel-title) → ALWAYS visible
 *   2. Content slot (panel-content) → ONLY visible when isExpanded = true
 * 
 * 📊 STATE FLOW:
 * 
 *   ┌──────────────────────────────────────────────────────────────────┐
 *   │ isExpanded = false (COLLAPSED)                                   │
 *   │                                                                  │
 *   │  ┌─────────────────────────────────────────────────────┐        │
 *   │  │ [panel-title] ────────────────────────────────► ▶  │ Click! │
 *   │  │               (Content NOT rendered - saves perf)   │        │
 *   │  └─────────────────────────────────────────────────────┘        │
 *   │                           │                                      │
 *   │                           ▼ toggle()                             │
 *   │                                                                  │
 *   │ isExpanded = true (EXPANDED)                                     │
 *   │                                                                  │
 *   │  ┌─────────────────────────────────────────────────────┐        │
 *   │  │ [panel-title] ────────────────────────────────► ▼  │        │
 *   │  ├─────────────────────────────────────────────────────┤        │
 *   │  │ [panel-content]                                     │        │
 *   │  │ Content is NOW rendered!                            │        │
 *   │  └─────────────────────────────────────────────────────┘        │
 *   └──────────────────────────────────────────────────────────────────┘
 * 
 * ⚡ PERFORMANCE BENEFIT:
 *    - Collapsed panels don't render their body content at all
 *    - Good for lists with many panels (accordion)
 *    - Heavy content only loads when user expands
 * 
 */
@Component({
    selector: 'app-expandable-panel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!--
            📦 PANEL CONTAINER
            - [class.expanded] adds 'expanded' class when isExpanded is true
            - Used for styling differences between states
        -->
        <div class="panel" [class.expanded]="isExpanded">
            <!--
                🎯 PANEL HEADER (Always Visible)
                ─────────────────────────────────────────────────────────
                - Contains the title slot and toggle icon
                - Clicking anywhere on header toggles the panel
                - The title content is ALWAYS projected (not conditional)
            -->
            <div class="panel-header" (click)="toggle()">
                <!--
                    📝 TITLE SLOT
                    Always rendered regardless of expanded state.
                    Parent provides: <span panel-title>Section Title</span>
                -->
                <ng-content select="[panel-title]"></ng-content>
                
                <!--
                    🔄 TOGGLE ICON
                    Visual indicator of expanded/collapsed state:
                    - ▼ when expanded (pointing down = content below)
                    - ▶ when collapsed (pointing right = click to expand)
                -->
                <span class="toggle-icon">{{ isExpanded ? '▼' : '▶' }}</span>
            </div>
            
            <!--
                🔀 CONDITIONAL CONTENT SLOT
                ─────────────────────────────────────────────────────────
                This is the KEY FEATURE of this component!
                
                @if (isExpanded) means:
                  → The body div and its ng-content are ONLY in the DOM
                    when isExpanded is true
                  → When collapsed, content is completely REMOVED from DOM
                  → This is NOT just CSS display:none - it's actual removal!
                
                ⚡ WHY THIS MATTERS:
                  - Heavy content (tables, charts, images) won't load until needed
                  - Angular doesn't run change detection on non-existent content
                  - Memory efficient for many collapsed panels
            -->
            @if (isExpanded) {
                <div class="panel-body">
                    <!--
                        📝 CONTENT SLOT
                        Only exists in DOM when panel is expanded.
                        Parent provides: <div panel-content>...</div>
                    -->
                    <ng-content select="[panel-content]"></ng-content>
                </div>
            }
        </div>
    `,
    styles: [`
        /* Panel container */
        .panel { 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            overflow: hidden; 
        }
        
        /* Header - clickable area */
        .panel-header { 
            padding: 1rem; 
            background: var(--bg-secondary); 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            cursor: pointer;  /* Shows it's clickable */
        }
        .panel-header:hover { 
            background: #e5e7eb;  /* Hover feedback */
        }
        
        /* Body - only exists when expanded */
        .panel-body { 
            padding: 1rem; 
        }
        
        /* Toggle icon */
        .toggle-icon { 
            color: #8b5cf6; 
        }
    `]
})
export class ExpandablePanelComponent {
    /**
     * State variable controlling panel expansion
     * - false = collapsed (body content not in DOM)
     * - true = expanded (body content rendered)
     */
    isExpanded = false;

    /**
     * Toggle the expansion state
     * Called when user clicks the header
     */
    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}


/**
 * ============================================================================
 * COMPONENT 2: SmartContainerComponent
 * ============================================================================
 * 
 * 📦 PURPOSE: Demonstrates how to detect if content was provided using
 *            @ContentChild, and show fallback/default content if not.
 * 
 * 🎯 KEY CONCEPT: @ContentChild + ng-template = CONDITIONAL FALLBACK
 * 
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  PARENT PROVIDES FOOTER TEMPLATE:                                   │
 *   │                                                                     │
 *   │  <app-smart-container>                                              │
 *   │      <ng-template #footerTemplate>Custom Footer</ng-template>      │
 *   │  </app-smart-container>                                             │
 *   │              │                                                      │
 *   │              ▼                                                      │
 *   │  @ContentChild('footerTemplate') queries it                        │
 *   │              │                                                      │
 *   │              ▼                                                      │
 *   │  footerTemplate = TemplateRef  ← HAS VALUE!                        │
 *   │              │                                                      │
 *   │              ▼                                                      │
 *   │  @if (footerTemplate) → TRUE → Render custom footer                │
 *   └─────────────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  PARENT DOES NOT PROVIDE FOOTER:                                    │
 *   │                                                                     │
 *   │  <app-smart-container>                                              │
 *   │      <!-- No #footerTemplate provided -->                          │
 *   │  </app-smart-container>                                             │
 *   │              │                                                      │
 *   │              ▼                                                      │
 *   │  @ContentChild finds nothing                                        │
 *   │              │                                                      │
 *   │              ▼                                                      │
 *   │  footerTemplate = undefined  ← NO VALUE!                           │
 *   │              │                                                      │
 *   │              ▼                                                      │
 *   │  @if (footerTemplate) → FALSE → @else → Render DEFAULT footer      │
 *   └─────────────────────────────────────────────────────────────────────┘
 * 
 * 💡 USE CASES:
 *    - Optional slots with sensible defaults
 *    - Plugins/extending components with optional customization
 *    - "Provide your own X or use default" pattern
 * 
 */
@Component({
    selector: 'app-smart-container',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="smart-container">
            <!--
                🎯 HEADER SLOT (Conditional on hasHeader flag)
                ─────────────────────────────────────────────────────────
                This shows how you can use a simple boolean to control
                whether a slot is rendered.
                
                Note: hasHeader is just a class property. In real use,
                you might:
                  - Use @ContentChild to detect if header content exists
                  - Use an @Input() to let parent control visibility
            -->
            @if (hasHeader) {
                <div class="header-slot">
                    <ng-content select="[header]"></ng-content>
                </div>
            }
            
            <!--
                🎯 MAIN CONTENT SLOT (Always Visible)
                ─────────────────────────────────────────────────────────
                The default catch-all slot for main content.
                No conditional - always rendered.
            -->
            <div class="content-slot">
                <ng-content></ng-content>
            </div>
            
            <!--
                🎯 FOOTER SLOT WITH FALLBACK
                ─────────────────────────────────────────────────────────
                THIS IS THE KEY PATTERN!
                
                @if (footerTemplate) checks:
                  → Did the parent provide <ng-template #footerTemplate>?
                  → If YES: Render the parent's template
                  → If NO:  Render our default footer
                
                *ngTemplateOutlet="footerTemplate":
                  → Takes the TemplateRef and renders it here
                  → It's like "stamp this blueprint at this location"
            -->
            @if (footerTemplate) {
                <!--
                    Custom footer provided by parent!
                    Render it using ngTemplateOutlet
                -->
                <div class="footer-slot">
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            } @else {
                <!--
                    No custom footer provided - use default!
                    This is the fallback content
                -->
                <div class="default-footer">
                    Default Footer
                </div>
            }
        </div>
    `,
    styles: [`
        /* Container with purple border */
        .smart-container { 
            border: 2px solid #8b5cf6; 
            border-radius: 12px; 
            overflow: hidden; 
        }
        
        /* Header slot styling */
        .header-slot { 
            background: #8b5cf6; 
            color: white; 
            padding: 1rem; 
            font-weight: bold; 
        }
        
        /* Main content area */
        .content-slot { 
            padding: 1.5rem; 
        }
        
        /* Footer slots (both custom and default) */
        .footer-slot, .default-footer { 
            background: #f8f9fa; 
            padding: 0.75rem; 
            text-align: center; 
            font-size: 0.85rem; 
        }
        
        /* Default footer is dimmed */
        .default-footer { 
            color: var(--text-secondary); 
        }
    `]
})
export class SmartContainerComponent {
    /**
     * Simple flag to control header visibility
     * In a real component, you might derive this from @ContentChild
     */
    hasHeader = true;

    /**
     * 🔑 KEY CONCEPT: @ContentChild with template reference!
     * 
     * @ContentChild('footerTemplate') means:
     *   → "Look for an ng-template with #footerTemplate in my projected content"
     *   → If found, store its TemplateRef here
     *   → If not found, this will be undefined
     * 
     * PARENT USAGE:
     *   <app-smart-container>
     *       <ng-template #footerTemplate>
     *           <button>My Custom Footer</button>
     *       </ng-template>
     *   </app-smart-container>
     * 
     * The ? makes it optional - allows undefined when not provided
     */
    @ContentChild('footerTemplate') footerTemplate?: TemplateRef<any>;
}


/**
 * ============================================================================
 * COMPONENT 3: ConditionalProjectionComponent (DEMO PAGE)
 * ============================================================================
 * 
 * 📦 PURPOSE: Demonstrates both conditional projection patterns in action
 * 
 * 🎯 DEMOS INCLUDED:
 * 
 * 1. EXPANDABLE PANELS (Pattern 1)
 *    - Three panels with titles and content
 *    - Content only renders when panel is expanded
 *    - Click to toggle
 * 
 * 2. SMART CONTAINER (Pattern 2)  
 *    - One with custom footer template
 *    - One without (shows default footer)
 *    - Demonstrates the fallback pattern
 * 
 */
@Component({
    selector: 'app-conditional-projection',
    standalone: true,
    imports: [CommonModule, ExpandablePanelComponent, SmartContainerComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔀 Conditional Projection</h1>
                <p class="subtitle">Show/Hide Projected Content</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    Content projection can be controlled conditionally using 
                    <code>&#64;if</code>, <code>&#64;ContentChild</code>, and template checks.
                </p>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                🎯 DEMO 1: Expandable Panels
                ═══════════════════════════════════════════════════════════════
                
                These panels demonstrate LAZY CONTENT RENDERING:
                - Title is always visible
                - Body content only renders when expanded
                - Click header to toggle
                
                FLOW:
                  [panel-title]   → Always projected to header
                  [panel-content] → Only projected when isExpanded = true
            -->
            <section class="demo-section">
                <h2>🎯 Expandable Panel Demo</h2>
                <p class="hint">Click headers to expand/collapse</p>
                <div class="demo-grid">
                    <!--
                        PANEL 1: Basic expandable panel
                        ─────────────────────────────────────────────────────
                    -->
                    <app-expandable-panel>
                        <!--
                            Title slot: ALWAYS visible
                            Goes to: <ng-content select="[panel-title]">
                        -->
                        <span panel-title>📦 Section 1: Getting Started</span>
                        
                        <!--
                            Content slot: ONLY visible when expanded
                            Goes to: @if (isExpanded) { <ng-content select="[panel-content]"> }
                            
                            ⚡ This <div> is NOT in the DOM when collapsed!
                        -->
                        <div panel-content>
                            <p>This content only renders when the panel is expanded!</p>
                            <p>This improves performance for hidden content.</p>
                        </div>
                    </app-expandable-panel>

                    <!--
                        PANEL 2: Panel with list content
                        ─────────────────────────────────────────────────────
                    -->
                    <app-expandable-panel>
                        <span panel-title>⚙️ Section 2: Configuration</span>
                        <div panel-content>
                            <!--
                                Complex content like lists, forms, tables
                                are great candidates for lazy rendering!
                            -->
                            <ul>
                                <li>Setting 1: Enabled</li>
                                <li>Setting 2: Custom</li>
                                <li>Setting 3: Default</li>
                            </ul>
                        </div>
                    </app-expandable-panel>

                    <!--
                        PANEL 3: Panel with interactive content
                        ─────────────────────────────────────────────────────
                    -->
                    <app-expandable-panel>
                        <span panel-title>🚀 Section 3: Advanced</span>
                        <div panel-content>
                            <p>Advanced configuration options and tips.</p>
                            <button>Configure</button>
                        </div>
                    </app-expandable-panel>
                </div>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                🧠 DEMO 2: Smart Container with Fallback
                ═══════════════════════════════════════════════════════════════
                
                These containers demonstrate FALLBACK CONTENT using @ContentChild:
                - First one provides a custom footer template
                - Second one doesn't provide template → gets default footer
                
                PATTERN:
                  @ContentChild('footerTemplate') footerTemplate?: TemplateRef
                  
                  @if (footerTemplate) {
                      // Render custom footer
                  } @else {
                      // Render default footer
                  }
            -->
            <section class="smart-demo">
                <h2>🧠 Smart Container (Fallback Content)</h2>
                <div class="smart-grid">
                    <!--
                        CONTAINER 1: With Custom Footer Template
                        ─────────────────────────────────────────────────────
                        
                        The <ng-template #footerTemplate> is:
                          1. Queried by @ContentChild('footerTemplate')
                          2. Found! So footerTemplate = TemplateRef
                          3. @if (footerTemplate) → TRUE
                          4. Custom button footer rendered
                    -->
                    <div>
                        <h4>With Custom Footer</h4>
                        <app-smart-container>
                            <!-- Goes to header slot -->
                            <h3 header>Custom Header</h3>
                            
                            <!-- Goes to default/catch-all slot -->
                            <p>Main content area</p>
                            
                            <!--
                                🔑 THE KEY: ng-template with #footerTemplate
                                
                                This template is:
                                - NOT rendered where it's written!
                                - Captured by @ContentChild('footerTemplate')
                                - Rendered via ngTemplateOutlet in smart-container
                            -->
                            <ng-template #footerTemplate>
                                <button>Custom Action</button>
                            </ng-template>
                        </app-smart-container>
                    </div>
                    
                    <!--
                        CONTAINER 2: WITHOUT Custom Footer Template
                        ─────────────────────────────────────────────────────
                        
                        No <ng-template #footerTemplate> provided!
                          1. @ContentChild queries for #footerTemplate
                          2. Not found! So footerTemplate = undefined
                          3. @if (footerTemplate) → FALSE
                          4. @else → Default footer rendered
                    -->
                    <div>
                        <h4>Default Footer (No Template)</h4>
                        <app-smart-container>
                            <h3 header>Another Header</h3>
                            <p>This container uses default footer</p>
                            <!-- 
                                ⚠️ Notice: NO #footerTemplate provided!
                                The component will use its default footer.
                            -->
                        </app-smart-container>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Implementation Pattern</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    template: &#96;
        &lt;div class="panel"&gt;
            &lt;div class="header" (click)="toggle()"&gt;
                &lt;ng-content select="[title]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
            
            &#64;if (isExpanded) {{ '{' }}
                &lt;div class="body"&gt;
                    &lt;ng-content select="[content]"&gt;&lt;/ng-content&gt;
                &lt;/div&gt;
            {{ '}' }}
        &lt;/div&gt;
    &#96;
{{ '}' }})
export class ExpandablePanelComponent {{ '{' }}
    isExpanded = false;
    toggle() {{ '{' }} this.isExpanded = !this.isExpanded; {{ '}' }}
{{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        .hint { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; }
        .demo-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .smart-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .smart-grid h4 { margin: 0 0 0.5rem; font-size: 0.85rem; color: var(--text-secondary); }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class ConditionalProjectionComponent { }
