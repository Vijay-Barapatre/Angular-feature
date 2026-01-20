/**
 * ============================================================================
 * USE CASE 3: ng-template & ngTemplateOutlet
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * ng-template creates a "blueprint" that doesn't render by default.
 * ngTemplateOutlet "stamps" that blueprint wherever you want, with context data.
 * 
 * 📊 KEY CONCEPT: BLUEPRINT + STAMP = DYNAMIC RENDERING
 * 
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  ng-template = BLUEPRINT (not rendered by default)                  │
 *   │                                                                     │
 *   │  <ng-template #userCard let-user let-idx="index">                  │
 *   │      <div>{{ idx }}: {{ user.name }}</div>                         │
 *   │  </ng-template>                                                     │
 *   │                                                                     │
 *   │  ⚠️ This template is INVISIBLE! It's just a blueprint waiting...   │
 *   └─────────────────────────────────────────────────────────────────────┘
 *                                │
 *                                ▼ ngTemplateOutlet "stamps" it
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  ngTemplateOutlet = STAMP (renders the blueprint)                   │
 *   │                                                                     │
 *   │  <ng-container *ngTemplateOutlet="userCard; context: {              │
 *   │      $implicit: currentUser,   // Maps to let-user                 │
 *   │      index: 0                   // Maps to let-idx="index"         │
 *   │  }"></ng-container>                                                 │
 *   │                                                                     │
 *   │  ✅ NOW it renders! Context provides data to the template.          │
 *   └─────────────────────────────────────────────────────────────────────┘
 * 
 * 🔑 CONTEXT BINDING RULES:
 * 
 *   CONTEXT OBJECT          │ TEMPLATE VARIABLE    │ HOW IT'S DECLARED
 *   ────────────────────────┼──────────────────────┼─────────────────────
 *   { $implicit: value }    │ let-varName          │ Default/implicit
 *   { myKey: value }        │ let-var="myKey"      │ Named binding
 *   
 *   EXAMPLE:
 *   context: { $implicit: user, index: 5 }
 *                  ↓              ↓
 *   <ng-template let-user let-i="index">
 *         user = user     i = 5
 * 
 * ============================================================================
 */

import { Component, TemplateRef, ContentChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * ============================================================================
 * COMPONENT 1: CustomListComponent
 * ============================================================================
 * 
 * 📦 PURPOSE: A reusable list component where the PARENT controls how each
 *            item looks by providing a template.
 * 
 * 🎯 PATTERN: "Template as Input"
 * 
 *   ┌───────────────────────────────────────────────────────────────────────┐
 *   │  PARENT (provides template)                                           │
 *   │                                                                       │
 *   │  <app-custom-list [items]="users">                                   │
 *   │      <ng-template #itemTemplate let-item let-idx="index">            │
 *   │          <div>{{ idx }}: {{ item.name }}</div>    ← Custom rendering │
 *   │      </ng-template>                                                   │
 *   │  </app-custom-list>                                                   │
 *   └───────────────────────────────────────────────────────────────────────┘
 *                           │
 *                           ▼ Child captures template via @ContentChild
 *   ┌───────────────────────────────────────────────────────────────────────┐
 *   │  CHILD (CustomListComponent)                                          │
 *   │                                                                       │
 *   │  @ContentChild('itemTemplate') itemTemplate: TemplateRef;            │
 *   │                                                                       │
 *   │  @for (item of items) {                                              │
 *   │      <ng-container *ngTemplateOutlet="itemTemplate; context: {       │
 *   │          $implicit: item,                                             │
 *   │          index: $index                                                │
 *   │      }">                                                              │
 *   │  }                                                                    │
 *   │                                                                       │
 *   │  ✅ Child handles iteration, Parent controls appearance!              │
 *   └───────────────────────────────────────────────────────────────────────┘
 * 
 * 💡 WHY THIS PATTERN?
 *    - Child component handles LOGIC (iteration, tracking)
 *    - Parent component controls PRESENTATION (how items look)
 *    - Maximum reusability - same list, different templates!
 * 
 */
@Component({
    selector: 'app-custom-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!--
            📋 LIST CONTAINER
            The child provides the list structure (ul/li).
            The PARENT provides how each item looks (via template).
        -->
        <ul class="custom-list">
            <!--
                🔄 ITERATION
                We iterate over items, but we don't decide how each item looks!
                That's the parent's job (via the template).
            -->
            @for (item of items; track item.id) {
                <li>
                    <!--
                        🎯 ngTemplateOutlet: STAMP THE PARENT'S TEMPLATE HERE!
                        ─────────────────────────────────────────────────────────
                        
                        *ngTemplateOutlet="itemTemplate" means:
                          → Take the template the parent provided (#itemTemplate)
                          → Render it RIGHT HERE, inside this <li>
                        
                        context: { $implicit: item, index: $index } means:
                          → Pass 'item' as the default variable (let-item)
                          → Pass '$index' as 'index' (let-idx="index")
                        
                        CONTEXT MAPPING:
                          context.{$implicit} ──► let-item    (no ="...")
                          context.{index}     ──► let-idx="index"
                    -->
                    <ng-container 
                        *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: $index }">
                    </ng-container>
                </li>
            }
        </ul>
    `,
    styles: [`
        /* Clean list styling */
        .custom-list { 
            list-style: none; 
            padding: 0; 
            margin: 0; 
        }
        .custom-list li { 
            padding: 0.75rem; 
            border-bottom: 1px solid #e5e7eb; 
        }
        .custom-list li:last-child { 
            border-bottom: none; 
        }
    `]
})
export class CustomListComponent {
    /**
     * The items to iterate over.
     * Parent provides this data.
     */
    items: any[] = [];

    /**
     * 🔑 KEY CONCEPT: @ContentChild captures parent's template!
     * 
     * @ContentChild('itemTemplate') means:
     *   → Look for an ng-template with #itemTemplate in projected content
     *   → Store its TemplateRef here
     * 
     * The parent provides:
     *   <ng-template #itemTemplate let-item let-idx="index">
     *       ...custom rendering...
     *   </ng-template>
     * 
     * We capture it and stamp it for each item using ngTemplateOutlet.
     */
    @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;
}


/**
 * ============================================================================
 * COMPONENT 2: TemplateOutletComponent (DEMO PAGE)
 * ============================================================================
 * 
 * 📦 PURPOSE: Demonstrates multiple ngTemplateOutlet patterns
 * 
 * 🎯 DEMOS INCLUDED:
 * 
 * DEMO 1: DYNAMIC TEMPLATE SWITCHING
 *   - Three different templates (simple, detailed, card)
 *   - Buttons to switch between them
 *   - Shows how to dynamically choose which template to render
 * 
 * DEMO 2: TEMPLATE WITH CONTEXT
 *   - User list with custom template
 *   - Each user rendered with index and data
 *   - Shows how context passes data to template
 * 
 * ============================================================================
 */
@Component({
    selector: 'app-template-outlet',
    standalone: true,
    imports: [CommonModule, CustomListComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>📋 ngTemplateOutlet</h1>
                <p class="subtitle">Dynamic Template Rendering</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    <code>*ngTemplateOutlet</code> allows you to render templates dynamically.
                    Combined with <code>ng-template</code>, it enables powerful patterns like
                    custom item templates and conditional rendering.
                </p>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                SYNTAX REFERENCE
                ═══════════════════════════════════════════════════════════════
                Shows the basic syntax for ng-template and ngTemplateOutlet
            -->
            <section class="syntax-section">
                <h2>📝 Basic Syntax</h2>
                <pre class="code"><code>&lt;!-- Define template --&gt;
&lt;ng-template #myTemplate let-name let-age="age"&gt;
    &lt;p&gt;Name: {{ '{{' }} name {{ '}}' }}, Age: {{ '{{' }} age {{ '}}' }}&lt;/p&gt;
&lt;/ng-template&gt;

&lt;!-- Render template --&gt;
&lt;ng-container *ngTemplateOutlet="myTemplate; context: {{ '{' }} 
    $implicit: 'John',  // Binds to let-name (default)
    age: 30             // Binds to let-age="age"
{{ '}' }}"&gt;&lt;/ng-container&gt;</code></pre>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                🎯 DEMO 1: Dynamic Template Switching
                ═══════════════════════════════════════════════════════════════
                
                This demo shows how to:
                  1. Define multiple templates
                  2. Switch between them dynamically
                  3. Reference templates using ViewChild
                
                FLOW:
                  User clicks button → currentTemplate changes → 
                  getTemplate() returns different TemplateRef → 
                  ngTemplateOutlet renders different content
            -->
            <section class="demo-section">
                <h2>🎯 Live Demo: Dynamic Templates</h2>
                <div class="demo-box">
                    <!--
                        TEMPLATE SELECTOR BUTTONS
                        Each button sets currentTemplate to a different value
                    -->
                    <div class="template-buttons">
                        <button 
                            [class.active]="currentTemplate === 'simple'" 
                            (click)="currentTemplate = 'simple'">
                            Simple
                        </button>
                        <button 
                            [class.active]="currentTemplate === 'detailed'" 
                            (click)="currentTemplate = 'detailed'">
                            Detailed
                        </button>
                        <button 
                            [class.active]="currentTemplate === 'card'" 
                            (click)="currentTemplate = 'card'">
                            Card
                        </button>
                    </div>

                    <!--
                        TEMPLATE OUTPUT AREA
                        ─────────────────────────────────────────────────────────
                        
                        getTemplate() returns the currently selected TemplateRef.
                        ngTemplateOutlet stamps that template here.
                        
                        When user clicks a different button:
                          1. currentTemplate changes
                          2. getTemplate() returns different TemplateRef
                          3. Angular re-renders with new template content
                    -->
                    <div class="template-output">
                        <ng-container *ngTemplateOutlet="getTemplate()"></ng-container>
                    </div>
                </div>

                <!--
                    ═══════════════════════════════════════════════════════════
                    TEMPLATE DEFINITIONS
                    ═══════════════════════════════════════════════════════════
                    
                    ⚠️ These ng-templates are NOT rendered where they're written!
                    They're just blueprints waiting to be stamped by ngTemplateOutlet.
                    
                    Each template has a #reference that we capture with @ViewChild.
                -->
                
                <!--
                    📝 TEMPLATE 1: Simple
                    Just a paragraph with basic text
                -->
                <ng-template #simpleTemplate>
                    <p>👋 Hello! This is the <strong>simple</strong> template.</p>
                </ng-template>

                <!--
                    📝 TEMPLATE 2: Detailed
                    Has heading, paragraph, and list - more complex structure
                -->
                <ng-template #detailedTemplate>
                    <div class="detailed">
                        <h4>📋 Detailed View</h4>
                        <p>This template shows more information with better formatting.</p>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                        </ul>
                    </div>
                </ng-template>

                <!--
                    📝 TEMPLATE 3: Card
                    Card-style layout with icon, heading, and button
                -->
                <ng-template #cardTemplate>
                    <div class="card-tpl">
                        <div class="card-icon">🎨</div>
                        <h4>Card Template</h4>
                        <p>A beautiful card layout created with templates!</p>
                        <button>Action</button>
                    </div>
                </ng-template>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                🎯 DEMO 2: Template with Context
                ═══════════════════════════════════════════════════════════════
                
                This demo shows how to pass DATA to templates via context.
                
                CONTEXT OBJECT                  TEMPLATE VARIABLE
                ─────────────────────────────  ──────────────────────
                { $implicit: user }       →    let-user       (default)
                { index: i }              →    let-idx="index" (named)
                
                The template receives data and can render it however it wants!
            -->
            <section class="context-demo">
                <h2>📊 Template with Context</h2>
                <div class="context-box">
                    <!--
                        📝 USER TEMPLATE DEFINITION
                        ─────────────────────────────────────────────────────────
                        
                        This template expects two context values:
                          - let-user      ← receives $implicit (the user object)
                          - let-idx="index" ← receives 'index' property (number)
                        
                        Inside the template, we can use:
                          - user.name, user.role (from the user object)
                          - idx (the index number)
                    -->
                    <ng-template #userTemplate let-user let-idx="index">
                        <div class="user-row">
                            <!--
                                Display index + 1 (human-readable row number)
                                idx comes from context.index
                            -->
                            <span class="user-num">{{ idx + 1 }}</span>
                            
                            <!--
                                Display user name
                                user comes from context.$implicit
                            -->
                            <span class="user-name">{{ user.name }}</span>
                            
                            <!--
                                Display user role
                            -->
                            <span class="user-role">{{ user.role }}</span>
                        </div>
                    </ng-template>

                    <!--
                        🔄 ITERATE AND STAMP TEMPLATE FOR EACH USER
                        ─────────────────────────────────────────────────────────
                        
                        For each user in the array:
                          1. @for provides user and $index
                          2. ngTemplateOutlet stamps userTemplate
                          3. context passes user and index to template
                          4. Template renders with that data
                        
                        CONTEXT MAPPING:
                          $implicit: user  →  let-user (receives user object)
                          index: i         →  let-idx="index" (receives index)
                    -->
                    @for (user of users; track user.id; let i = $index) {
                        <ng-container *ngTemplateOutlet="userTemplate; context: { $implicit: user, index: i }">
                        </ng-container>
                    }
                </div>
            </section>

            <!--
                ═══════════════════════════════════════════════════════════════
                KEY POINTS SUMMARY
                ═══════════════════════════════════════════════════════════════
            -->
            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li><code>$implicit</code> binds to the default <code>let-variable</code></li>
                    <li>Named context values bind to <code>let-variable="name"</code></li>
                    <li>Templates are not rendered until referenced</li>
                    <li>Use <code>&#64;ContentChild</code> to accept templates from parent</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        .demo-box { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 12px; }
        .template-buttons { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .template-buttons button { padding: 0.5rem 1rem; border: 2px solid #8b5cf6; background: white; border-radius: 6px; cursor: pointer; }
        .template-buttons button.active { background: #8b5cf6; color: white; }
        .template-output { padding: 1rem; background: white; border-radius: 8px; }

        .detailed { padding: 1rem; }
        .detailed h4 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .detailed ul { margin: 0.5rem 0 0; padding-left: 1.25rem; }

        .card-tpl { text-align: center; padding: 1.5rem; }
        .card-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .card-tpl h4 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .card-tpl button { margin-top: 1rem; padding: 0.5rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; }

        .context-box { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .user-row { display: flex; gap: 1rem; padding: 0.75rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; }
        .user-num { background: #8b5cf6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
        .user-name { flex: 1; font-weight: 500; }
        .user-role { color: var(--text-secondary); font-size: 0.9rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class TemplateOutletComponent {
    /**
     * Currently selected template name
     * Changed when user clicks the template selector buttons
     */
    currentTemplate = 'simple';

    /**
     * Sample user data for the context demo
     * Each user has id (for tracking), name, and role
     */
    users = [
        { id: 1, name: 'Alice Johnson', role: 'Developer' },
        { id: 2, name: 'Bob Smith', role: 'Designer' },
        { id: 3, name: 'Carol White', role: 'Manager' }
    ];

    /**
     * 🔑 @ViewChild captures templates defined in THIS component's template
     * 
     * Unlike @ContentChild (for projected content), @ViewChild queries
     * elements in the component's OWN template.
     * 
     * Each @ViewChild('templateName') captures the ng-template with that #reference.
     */
    @ViewChild('simpleTemplate') simpleTemplateRef!: TemplateRef<any>;
    @ViewChild('detailedTemplate') detailedTemplateRef!: TemplateRef<any>;
    @ViewChild('cardTemplate') cardTemplateRef!: TemplateRef<any>;

    /**
     * Returns the currently selected template
     * 
     * Based on currentTemplate value, returns the appropriate TemplateRef.
     * This is used by ngTemplateOutlet to decide which template to render.
     * 
     * FLOW:
     *   User clicks "Card" button
     *   → currentTemplate = 'card'
     *   → getTemplate() returns cardTemplateRef
     *   → ngTemplateOutlet renders the card template
     */
    getTemplate(): TemplateRef<any> | null {
        switch (this.currentTemplate) {
            case 'simple':
                return this.simpleTemplateRef;
            case 'detailed':
                return this.detailedTemplateRef;
            case 'card':
                return this.cardTemplateRef;
            default:
                return this.simpleTemplateRef;
        }
    }
}
