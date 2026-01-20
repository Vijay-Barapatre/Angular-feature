/**
 * ============================================================================
 * USE CASE 2: MULTI-SLOT PROJECTION
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * Multi-slot projection allows you to define MULTIPLE named slots in a child
 * component, and the parent can target specific content to each slot using
 * the `select` attribute on <ng-content>.
 * 
 * 📊 HOW IT WORKS:
 * 
 *  ┌─────────────────────────────────────────────────────────────────────┐
 *  │  PARENT COMPONENT                                                   │
 *  │                                                                     │
 *  │  <app-card>                                                         │
 *  │      <h3 card-header>Title</h3>    ──┐                             │
 *  │      <p card-body>Content</p>      ──┼── Each has a "label"        │
 *  │      <button card-footer>OK</button>─┘                             │
 *  │  </app-card>                                                        │
 *  │                                                                     │
 *  └─────────────────────────────────────────────────────────────────────┘
 *                           │
 *                           ▼ Angular matches labels to slots
 *  ┌─────────────────────────────────────────────────────────────────────┐
 *  │  CHILD COMPONENT (app-card) TEMPLATE                                │
 *  │                                                                     │
 *  │  <div class="card">                                                 │
 *  │      <div class="header">                                           │
 *  │          <ng-content select="[card-header]"></ng-content>  ← Slot 1 │
 *  │      </div>                                                         │
 *  │      <div class="body">                                             │
 *  │          <ng-content select="[card-body]"></ng-content>    ← Slot 2 │
 *  │      </div>                                                         │
 *  │      <div class="footer">                                           │
 *  │          <ng-content select="[card-footer]"></ng-content>  ← Slot 3 │
 *  │      </div>                                                         │
 *  │  </div>                                                             │
 *  │                                                                     │
 *  └─────────────────────────────────────────────────────────────────────┘
 * 
 * 🔑 KEY CONCEPTS:
 * 
 * 1. SELECTOR TYPES:
 *    - Attribute:  select="[card-header]"  → Matches: <div card-header>
 *    - Element:    select="header"         → Matches: <header>
 *    - Class:      select=".panel-title"   → Matches: <span class="panel-title">
 *    - Multiple:   select="h1, h2, h3"     → Matches: <h1> OR <h2> OR <h3>
 * 
 * 2. CATCH-ALL SLOT:
 *    - <ng-content></ng-content> (no select) catches UNMATCHED content
 *    - Always place it LAST (Angular checks slots top-to-bottom)
 * 
 * 3. CONTENT ROUTING:
 *    - Each piece of content can only go to ONE slot
 *    - Once matched, content is "consumed" and won't match other slots
 *    - Order of slots in child template affects matching priority
 * 
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ============================================================================
 * COMPONENT 1: MultiSlotCardComponent
 * ============================================================================
 * 
 * 📦 PURPOSE: A card component with 3 named slots for structured content
 * 
 * 🎯 HOW THE SLOTS WORK:
 * 
 *   SLOT NAME        │ SELECTOR           │ MATCHES ELEMENTS WITH
 *   ─────────────────┼────────────────────┼───────────────────────────
 *   Header slot      │ [card-header]      │ card-header attribute
 *   Body slot        │ [card-body]        │ card-body attribute
 *   Footer slot      │ [card-footer]      │ card-footer attribute
 * 
 * 💡 USAGE EXAMPLE:
 * 
 *   <app-multi-slot-card>
 *       <h3 card-header>Title</h3>        ← Goes to header slot
 *       <p card-body>Description</p>      ← Goes to body slot
 *       <button card-footer>OK</button>   ← Goes to footer slot
 *   </app-multi-slot-card>
 * 
 * ⚠️ IMPORTANT: The attribute syntax (card-header, card-body, card-footer)
 *    is just a naming convention. You can use ANY valid attribute name!
 */
@Component({
    selector: 'app-multi-slot-card',
    standalone: true,
    template: `
        <!--
            📦 CARD CONTAINER
            The card provides structure - header/body/footer layout
        -->
        <div class="card">
            <!--
                🎯 SLOT 1: HEADER
                ─────────────────────────────────────────────────────────
                select="[card-header]" means:
                  → "Accept ONLY elements that have the 'card-header' attribute"
                
                Example matches:
                  ✅ <h3 card-header>Title</h3>
                  ✅ <span card-header>Subtitle</span>
                  ❌ <h3>Title</h3>  (no attribute = no match!)
            -->
            <div class="card-header">
                <ng-content select="[card-header]"></ng-content>
            </div>
            
            <!--
                🎯 SLOT 2: BODY
                ─────────────────────────────────────────────────────────
                select="[card-body]" means:
                  → "Accept ONLY elements that have the 'card-body' attribute"
                
                The body is where the main content goes.
                You can project ANY HTML here - lists, images, forms, etc.
            -->
            <div class="card-body">
                <ng-content select="[card-body]"></ng-content>
            </div>
            
            <!--
                🎯 SLOT 3: FOOTER
                ─────────────────────────────────────────────────────────
                select="[card-footer]" means:
                  → "Accept ONLY elements that have the 'card-footer' attribute"
                
                Typically used for action buttons or links.
            -->
            <div class="card-footer">
                <ng-content select="[card-footer]"></ng-content>
            </div>
        </div>
    `,
    styles: [`
        /* Card container with shadow and rounded corners */
        .card { 
            background: white; 
            border-radius: 12px; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
            overflow: hidden; 
        }
        
        /* Header with gradient background */
        .card-header { 
            background: linear-gradient(135deg, #8b5cf6, #6366f1); 
            color: white; 
            padding: 1rem 1.5rem; 
        }
        
        /* Body with padding for content */
        .card-body { 
            padding: 1.5rem; 
        }
        
        /* Footer with subtle background */
        .card-footer { 
            background: #f8f9fa; 
            padding: 1rem 1.5rem; 
            border-top: 1px solid #e5e7eb; 
        }
    `]
})
export class MultiSlotCardComponent { }


/**
 * ============================================================================
 * COMPONENT 2: PanelComponent
 * ============================================================================
 * 
 * 📦 PURPOSE: Demonstrates CLASS-based selectors instead of attribute selectors
 * 
 * 🎯 HOW THE SLOTS WORK:
 * 
 *   SLOT NAME        │ SELECTOR           │ MATCHES ELEMENTS WITH
 *   ─────────────────┼────────────────────┼───────────────────────────
 *   Title slot       │ .panel-title       │ class="panel-title"
 *   Icon slot        │ .panel-icon        │ class="panel-icon"
 *   Default slot     │ (none)             │ Everything else (catch-all)
 * 
 * 💡 USAGE EXAMPLE:
 * 
 *   <app-panel>
 *       <span class="panel-icon">📦</span>     ← Goes to icon slot
 *       <span class="panel-title">Title</span> ← Goes to title slot
 *       This text goes to default slot!       ← Goes to catch-all slot
 *   </app-panel>
 * 
 * ⚠️ CLASS VS ATTRIBUTE SELECTORS:
 *    - Attribute: select="[card-header]"  → <div card-header>
 *    - Class:     select=".panel-title"   → <div class="panel-title">
 *    
 *    Both are valid! Choose based on your team's conventions.
 */
@Component({
    selector: 'app-panel',
    standalone: true,
    template: `
        <div class="panel">
            <!--
                🎯 SLOT: TITLE (Class selector)
                ─────────────────────────────────────────────────────────
                select=".panel-title" means:
                  → "Accept elements with class='panel-title'"
                
                ⚠️ Note the DOT (.) - this is CSS class selector syntax!
            -->
            <div class="panel-title">
                <ng-content select=".panel-title"></ng-content>
            </div>
            
            <!--
                🎯 SLOT: ICON (Class selector)
                ─────────────────────────────────────────────────────────
                select=".panel-icon" means:
                  → "Accept elements with class='panel-icon'"
            -->
            <div class="panel-icon">
                <ng-content select=".panel-icon"></ng-content>
            </div>
            
            <!--
                🎯 SLOT: DEFAULT (Catch-all)
                ─────────────────────────────────────────────────────────
                NO select attribute means:
                  → "Accept ALL content that didn't match other slots"
                
                ⚠️ IMPORTANT: 
                  - This is the "catch-all" or "default" slot
                  - Content is checked against named slots FIRST
                  - Only unmatched content ends up here
                  - Place this LAST to catch remaining content
            -->
            <div class="panel-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        /* Grid layout for icon + title side by side */
        .panel { 
            background: white; 
            border-radius: 8px; 
            padding: 1.5rem; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
            display: grid; 
            grid-template-columns: 1fr auto; 
            gap: 1rem; 
        }
        
        .panel-title { font-weight: bold; color: #8b5cf6; }
        .panel-icon { font-size: 1.5rem; }
        
        /* Content spans full width below title/icon */
        .panel-content { 
            grid-column: 1 / -1; 
            color: var(--text-secondary); 
            font-size: 0.9rem; 
        }
    `]
})
export class PanelComponent { }


/**
 * ============================================================================
 * COMPONENT 3: MultiSlotComponent (DEMO PAGE)
 * ============================================================================
 * 
 * 📦 PURPOSE: Demonstrates multi-slot projection in action
 * 
 * 🎯 THIS COMPONENT SHOWS:
 * 
 * 1. ATTRIBUTE SELECTORS - Using card-header, card-body, card-footer
 *    <app-multi-slot-card>
 *        <h3 card-header>Title</h3>     ← Attribute selector
 *        <p card-body>Content</p>        ← Attribute selector
 *        <div card-footer>Footer</div>   ← Attribute selector
 *    </app-multi-slot-card>
 * 
 * 2. CLASS SELECTORS - Using .panel-title, .panel-icon
 *    <app-panel>
 *        <span class="panel-icon">📦</span>     ← Class selector
 *        <span class="panel-title">Title</span> ← Class selector
 *        Default content here                   ← Goes to catch-all
 *    </app-panel>
 * 
 * 3. MIXED CONTENT - Different HTML elements in same slot
 *    - Any element can have the attribute: <h3 card-header>, <span card-header>
 *    - The slot accepts ANY element with the matching selector
 * 
 * ============================================================================
 */
@Component({
    selector: 'app-multi-slot',
    standalone: true,
    imports: [CommonModule, MultiSlotCardComponent, PanelComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Multi-Slot Projection</h1>
                <p class="subtitle">Named Slots with select Attribute</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    Use <code>select</code> attribute to target specific content for projection.
                    Content can be selected by element, class, or attribute.
                </p>
            </section>

            <section class="syntax-section">
                <h2>📝 Select Syntax</h2>
                <table>
                    <tr><th>Selector</th><th>Matches</th></tr>
                    <tr><td>select="header"</td><td>&lt;header&gt; elements</td></tr>
                    <tr><td>select=".title"</td><td>Elements with class="title"</td></tr>
                    <tr><td>select="[card-header]"</td><td>Elements with card-header attribute</td></tr>
                    <tr><td>(no select)</td><td>Remaining unmatched content</td></tr>
                </table>
            </section>

            <section class="code-section">
                <h2>💻 Implementation</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    selector: 'app-card',
    template: &#96;
        &lt;div class="card"&gt;
            &lt;div class="header"&gt;
                &lt;ng-content select="[card-header]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
            &lt;div class="body"&gt;
                &lt;ng-content select="[card-body]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
            &lt;div class="footer"&gt;
                &lt;ng-content select="[card-footer]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &#96;
{{ '}' }})</code></pre>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                🎯 DEMO 1: Attribute Selectors
                ═══════════════════════════════════════════════════════════════
                
                Here we use ATTRIBUTE selectors:
                - card-header, card-body, card-footer
                
                Each element has an attribute that acts as a "label" telling
                Angular which slot it should go to.
            -->
            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-grid">


                    <!--
                        ═══════════════════════════════════════════════════════
                        CARD 1: Basic multi-slot usage
                        ═══════════════════════════════════════════════════════
                        
                        Flow:
                        1. <h3 card-header> → select="[card-header]" → Header slot
                        2. <p card-body>    → select="[card-body]"   → Body slot  
                        3. <div card-footer>→ select="[card-footer]" → Footer slot
                    -->
                    <app-multi-slot-card>
                        <!-- 
                            HEADER SLOT: Uses card-header attribute
                            This <h3> goes to: <ng-content select="[card-header]">
                        -->
                        <h3 card-header>🚀 Feature Card</h3>
                        
                        <!-- 
                            BODY SLOT: Uses card-body attribute
                            This <p> goes to: <ng-content select="[card-body]">
                        -->
                        <p card-body>
                            This content goes into the body slot.
                            Notice how header, body, and footer are separated!
                        </p>
                        
                        <!-- 
                            FOOTER SLOT: Uses card-footer attribute
                            This <div> goes to: <ng-content select="[card-footer]">
                            Contains multiple buttons - ALL go to footer together!
                        -->
                        <div card-footer>
                            <button>Action 1</button>
                            <button>Action 2</button>
                        </div>
                    </app-multi-slot-card>

                    <!--
                        ═══════════════════════════════════════════════════════
                        CARD 2: Different elements, same slots
                        ═══════════════════════════════════════════════════════
                        
                        Shows that ANY element can have the attribute:
                        - <span card-header> instead of <h3 card-header>
                        - <a card-footer> instead of <div card-footer>
                        
                        The slot cares about the ATTRIBUTE, not the element type!
                    -->
                    <app-multi-slot-card>
                        <!-- Using <span> instead of <h3> - still works! -->
                        <span card-header>📊 Dashboard</span>
                        
                        <!-- Complex content in body - lists, nested elements -->
                        <div card-body>
                            <ul>
                                <li>Users: 1,234</li>
                                <li>Revenue: $45,678</li>
                            </ul>
                        </div>
                        
                        <!-- Using <a> instead of <div> - still goes to footer! -->
                        <a card-footer href="#">View Details →</a>
                    </app-multi-slot-card>


                </div>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                🎨 DEMO 2: Class Selectors + Catch-All Slot
                ═══════════════════════════════════════════════════════════════
                
                Here we use CLASS selectors:
                - .panel-icon, .panel-title
                
                Plus a CATCH-ALL slot that captures unmatched content
            -->
            <section class="panel-demo">
                <h2>🎨 Panel Example (Class Selectors)</h2>
                <!--
                    Content matching flow:
                    1. <span class="panel-icon"> → select=".panel-icon" → Icon slot
                    2. <span class="panel-title">→ select=".panel-title"→ Title slot
                    3. "Default content..."      → No match!           → Catch-all slot
                -->
                <app-panel>
                    <!-- Goes to: <ng-content select=".panel-icon"> -->
                    <span class="panel-icon">📦</span>
                    
                    <!-- Goes to: <ng-content select=".panel-title"> -->
                    <span class="panel-title">Content Projection</span>
                    
                    <!-- 
                        This text has NO class that matches any selector!
                        So it goes to: <ng-content> (the catch-all slot)
                    -->
                    Default content goes here when no selector matches.
                </app-panel>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #8b5cf6; }

        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .panel-demo { margin-top: 2rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class MultiSlotComponent { }
