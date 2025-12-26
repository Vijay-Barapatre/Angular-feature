/**
 * ANIMATIONS FEATURE - Use Case 5: Route Animations
 * 
 * Core concepts: Route transitions, data-based animations, router outlet
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import {
    trigger,
    transition,
    style,
    animate,
    query,
    group
} from '@angular/animations';

// 🎯 Reusable slide animation
export const slideInAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),
        query(':enter', [
            style({ left: '100%', opacity: 0 })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ left: '-100%', opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%', opacity: 1 }))
            ], { optional: true })
        ])
    ])
]);

// 🎯 Fade animation
export const fadeAnimation = trigger('routeFade', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0 })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('200ms', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                animate('300ms 100ms', style({ opacity: 1 }))
            ], { optional: true })
        ])
    ])
]);

@Component({
    selector: 'app-route-animation',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    animations: [slideInAnimation, fadeAnimation],
    template: `
        <div class="demo-container">
            <h2>🛤️ Use Case 5: Route Animations</h2>
            <p class="subtitle">Animate page transitions for smooth navigation</p>
            
            <div class="info-card">
                <h3>📌 How to Implement Route Animations</h3>
                <ol>
                    <li>Define animation trigger with route transitions</li>
                    <li>Add animation data to routes</li>
                    <li>Apply trigger to router-outlet container</li>
                    <li>Use outlet context to get animation state</li>
                </ol>
            </div>

            <section class="demo-section">
                <h3>📝 Step-by-Step Implementation</h3>
                
                <div class="step">
                    <h4>Step 1: Define Animation</h4>
                    <pre><code>export const slideAnimation = trigger('routeAnimations', [
  transition('* &lt;=&gt; *', [
    query(':enter, :leave', [
      style(&#123;
        position: 'absolute',
        width: '100%'
      &#125;)
    ], &#123; optional: true &#125;),
    group([
      query(':leave', [
        animate('300ms ease-out', 
          style(&#123; left: '-100%', opacity: 0 &#125;))
      ], &#123; optional: true &#125;),
      query(':enter', [
        animate('300ms ease-out', 
          style(&#123; left: '0%', opacity: 1 &#125;))
      ], &#123; optional: true &#125;)
    ])
  ])
]);</code></pre>
                </div>

                <div class="step">
                    <h4>Step 2: Add to Routes</h4>
                    <pre><code>const routes: Routes = [
  &#123;
    path: 'home',
    component: HomeComponent,
    data: &#123; animation: 'HomePage' &#125;
  &#125;,
  &#123;
    path: 'about',
    component: AboutComponent,
    data: &#123; animation: 'AboutPage' &#125;
  &#125;
];</code></pre>
                </div>

                <div class="step">
                    <h4>Step 3: Apply to Template</h4>
                    <pre><code>&lt;div [&#64;routeAnimations]="getRouteAnimationData()"&gt;
  &lt;router-outlet&gt;&lt;/router-outlet&gt;
&lt;/div&gt;</code></pre>
                </div>

                <div class="step">
                    <h4>Step 4: Get Animation State</h4>
                    <pre><code>constructor(private contexts: ChildrenOutletContexts) &#123;&#125;

getRouteAnimationData() &#123;
  return this.contexts
    .getContext('primary')
    ?.route?.snapshot?.data?.['animation'];
&#125;</code></pre>
                </div>
            </section>

            <section class="demo-section">
                <h3>🎨 Animation Patterns</h3>
                
                <div class="pattern-grid">
                    <div class="pattern-card">
                        <h4>🔄 Slide</h4>
                        <p>Pages slide left/right</p>
                        <code>translateX</code>
                    </div>
                    <div class="pattern-card">
                        <h4>✨ Fade</h4>
                        <p>Cross-fade between pages</p>
                        <code>opacity</code>
                    </div>
                    <div class="pattern-card">
                        <h4>📐 Scale</h4>
                        <p>Zoom in/out effect</p>
                        <code>scale</code>
                    </div>
                    <div class="pattern-card">
                        <h4>🔀 Directional</h4>
                        <p>Based on navigation direction</p>
                        <code>:increment/:decrement</code>
                    </div>
                </div>
            </section>

            <section class="demo-section tips">
                <h3>💡 Pro Tips</h3>
                <ul>
                    <li><strong>Position absolute:</strong> Both entering and leaving components need absolute positioning during animation</li>
                    <li><strong>Container style:</strong> Parent needs <code>position: relative</code> and defined height</li>
                    <li><strong>Performance:</strong> Use <code>transform</code> and <code>opacity</code> for best performance</li>
                    <li><strong>Optional queries:</strong> Always use <code>&#123; optional: true &#125;</code> to prevent errors</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h2 { color: #a855f7; margin-bottom: 0.5rem; }
        .subtitle { color: #a0a0a0; margin-bottom: 2rem; }
        
        .info-card {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            padding: 1.5rem;
            border-radius: 12px;
            color: white;
            margin-bottom: 2rem;
        }
        
        .info-card h3 { margin: 0 0 1rem; }
        .info-card ol { margin: 0; padding-left: 1.5rem; }
        .info-card li { margin-bottom: 0.5rem; }
        
        .demo-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }
        
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        
        .step {
            margin-bottom: 1.5rem;
        }
        
        .step h4 {
            color: #a855f7;
            margin: 0 0 0.5rem;
        }
        
        pre {
            background: #1a1a2e;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 0;
        }
        
        code {
            color: #a6e3a1;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }
        
        .pattern-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .pattern-card {
            background: #0d0d0d;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .pattern-card h4 {
            color: #a855f7;
            margin: 0 0 0.5rem;
        }
        
        .pattern-card p {
            color: #a0a0a0;
            margin: 0 0 0.5rem;
            font-size: 0.9rem;
        }
        
        .pattern-card code {
            background: #1a1a2e;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
        }
        
        .tips ul {
            margin: 0;
            padding-left: 1.5rem;
        }
        
        .tips li {
            margin-bottom: 0.75rem;
            color: #e0e0e0;
        }
        
        .tips code {
            background: #1a1a2e;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }
    `]
})
export class RouteAnimationComponent {
    constructor(private contexts: ChildrenOutletContexts) { }

    getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
}
