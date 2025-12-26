/**
 * ANIMATIONS FEATURE - Use Case 1: Basic State Animations
 * 
 * Core concepts: trigger, state, style, transition, animate
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';

@Component({
    selector: 'app-basic-state-animation',
    standalone: true,
    imports: [CommonModule],
    animations: [
        // 🎯 Basic fade animation trigger
        trigger('fadeInOut', [
            // Define states
            state('void', style({ opacity: 0 })),
            state('*', style({ opacity: 1 })),
            // Define transitions
            transition('void <=> *', animate('300ms ease-in-out'))
        ]),

        // 🎯 Toggle state animation
        trigger('openClose', [
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: '#a855f7'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.8,
                backgroundColor: '#6366f1'
            })),
            transition('open <=> closed', [
                animate('0.3s ease-in-out')
            ])
        ]),

        // 🎯 Scale animation
        trigger('scale', [
            state('normal', style({ transform: 'scale(1)' })),
            state('scaled', style({ transform: 'scale(1.2)' })),
            transition('normal <=> scaled', animate('200ms ease-out'))
        ])
    ],
    template: `
        <div class="demo-container">
            <h2>🎬 Use Case 1: Basic State Animations</h2>
            
            <!-- Demo 1: Fade In/Out -->
            <section class="demo-section">
                <h3>1️⃣ Fade In/Out Animation</h3>
                <p class="description">Toggle visibility with fade effect</p>
                
                <button class="btn primary" (click)="toggleVisibility()">
                    {{ isVisible() ? 'Hide' : 'Show' }} Box
                </button>
                
                @if (isVisible()) {
                    <div class="animated-box fade" &#64;fadeInOut>
                        ✨ I fade in and out!
                    </div>
                }
            </section>

            <!-- Demo 2: Open/Close State -->
            <section class="demo-section">
                <h3>2️⃣ Open/Close State Animation</h3>
                <p class="description">Animate between defined states</p>
                
                <button class="btn primary" (click)="toggleOpenClose()">
                    {{ isOpen() ? 'Close' : 'Open' }}
                </button>
                
                <div class="animated-box state"
                     [@openClose]="isOpen() ? 'open' : 'closed'">
                    State: {{ isOpen() ? 'OPEN' : 'CLOSED' }}
                </div>
            </section>

            <!-- Demo 3: Scale Animation -->
            <section class="demo-section">
                <h3>3️⃣ Scale Animation</h3>
                <p class="description">Hover or click to scale</p>
                
                <div class="animated-box scale"
                     [@scale]="isScaled() ? 'scaled' : 'normal'"
                     (mouseenter)="isScaled.set(true)"
                     (mouseleave)="isScaled.set(false)">
                    🔍 Hover me!
                </div>
            </section>

            <!-- Code Example -->
            <section class="code-section">
                <h3>📝 Key Code</h3>
                <pre><code>// Define animation trigger
trigger('fadeInOut', [
  state('void', style(&#123; opacity: 0 &#125;)),
  state('*', style(&#123; opacity: 1 &#125;)),
  transition('void &lt;=&gt; *', animate('300ms ease-in-out'))
])

// Use in template
&lt;div &#64;fadeInOut&gt;Content&lt;/div&gt;</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h2 {
            color: #a855f7;
            margin-bottom: 2rem;
        }
        
        .demo-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }
        
        h3 {
            margin: 0 0 0.5rem;
            color: #f5f5f5;
        }
        
        .description {
            color: #a0a0a0;
            margin-bottom: 1rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .btn.primary {
            background: linear-gradient(135deg, #a855f7, #6366f1);
            color: white;
        }
        
        .btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }
        
        .animated-box {
            margin-top: 1rem;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            font-weight: 600;
            color: white;
        }
        
        .animated-box.fade {
            background: linear-gradient(135deg, #a855f7, #ec4899);
        }
        
        .animated-box.state {
            transition: none; /* Let Angular handle it */
        }
        
        .animated-box.scale {
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            cursor: pointer;
        }
        
        .code-section {
            background: #0d0d0d;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #333;
        }
        
        .code-section h3 {
            margin-bottom: 1rem;
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
            font-size: 0.9rem;
            line-height: 1.6;
        }
    `]
})
export class BasicStateAnimationComponent {
    isVisible = signal(true);
    isOpen = signal(false);
    isScaled = signal(false);

    toggleVisibility(): void {
        this.isVisible.update(v => !v);
    }

    toggleOpenClose(): void {
        this.isOpen.update(v => !v);
    }
}
