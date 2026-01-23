/**
 * ANIMATIONS FEATURE - Keyframes Animations
 * 
 * Core concepts: keyframes, multi-step animations, complex sequences
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    trigger,
    transition,
    style,
    animate,
    keyframes
} from '@angular/animations';

@Component({
    selector: 'app-keyframes-animation',
    standalone: true,
    imports: [CommonModule],
    animations: [
        // 🎯 Bounce animation
        trigger('bounce', [
            transition(':enter', [
                animate('1s', keyframes([
                    style({ transform: 'translateY(-100%)', opacity: 0, offset: 0 }),
                    style({ transform: 'translateY(30px)', opacity: 1, offset: 0.5 }),
                    style({ transform: 'translateY(-15px)', offset: 0.7 }),
                    style({ transform: 'translateY(10px)', offset: 0.85 }),
                    style({ transform: 'translateY(0)', offset: 1 })
                ]))
            ])
        ]),

        // 🎯 Shake animation (for errors)
        trigger('shake', [
            transition('* => shake', [
                animate('0.5s', keyframes([
                    style({ transform: 'translateX(0)', offset: 0 }),
                    style({ transform: 'translateX(-10px)', offset: 0.1 }),
                    style({ transform: 'translateX(10px)', offset: 0.2 }),
                    style({ transform: 'translateX(-10px)', offset: 0.3 }),
                    style({ transform: 'translateX(10px)', offset: 0.4 }),
                    style({ transform: 'translateX(-5px)', offset: 0.5 }),
                    style({ transform: 'translateX(5px)', offset: 0.6 }),
                    style({ transform: 'translateX(0)', offset: 1 })
                ]))
            ])
        ]),

        // 🎯 Pulse animation
        trigger('pulse', [
            transition('* => pulse', [
                animate('0.8s', keyframes([
                    style({ transform: 'scale(1)', offset: 0 }),
                    style({ transform: 'scale(1.1)', offset: 0.5 }),
                    style({ transform: 'scale(1)', offset: 1 })
                ]))
            ])
        ]),

        // 🎯 Flip animation
        trigger('flip', [
            transition('* => flip', [
                animate('0.6s', keyframes([
                    style({ transform: 'perspective(400px) rotateY(0)', offset: 0 }),
                    style({ transform: 'perspective(400px) rotateY(180deg)', offset: 0.5 }),
                    style({ transform: 'perspective(400px) rotateY(360deg)', offset: 1 })
                ]))
            ])
        ]),

        // 🎯 Rainbow color animation
        trigger('rainbow', [
            transition('* => rainbow', [
                animate('2s', keyframes([
                    style({ backgroundColor: '#ef4444', offset: 0 }),
                    style({ backgroundColor: '#f97316', offset: 0.16 }),
                    style({ backgroundColor: '#eab308', offset: 0.33 }),
                    style({ backgroundColor: '#22c55e', offset: 0.5 }),
                    style({ backgroundColor: '#3b82f6', offset: 0.66 }),
                    style({ backgroundColor: '#8b5cf6', offset: 0.83 }),
                    style({ backgroundColor: '#a855f7', offset: 1 })
                ]))
            ])
        ]),

        // 🎯 Swing animation
        trigger('swing', [
            transition('* => swing', [
                animate('1s', keyframes([
                    style({ transform: 'rotate(0deg)', transformOrigin: 'top center', offset: 0 }),
                    style({ transform: 'rotate(15deg)', offset: 0.2 }),
                    style({ transform: 'rotate(-10deg)', offset: 0.4 }),
                    style({ transform: 'rotate(5deg)', offset: 0.6 }),
                    style({ transform: 'rotate(-5deg)', offset: 0.8 }),
                    style({ transform: 'rotate(0deg)', offset: 1 })
                ]))
            ])
        ])
    ],
    template: `
        <div class="demo-container">
            <h2>🎬 Keyframes Animations</h2>
            <p class="subtitle">Multi-step animations with precise control</p>
            
            <div class="demo-grid">
                <!-- Bounce -->
                <div class="demo-card">
                    <h3>🏀 Bounce</h3>
                    <button class="btn" (click)="toggleBounce()">Trigger Bounce</button>
                    @if (showBounce()) {
                        <div class="box purple" @bounce>Bounce!</div>
                    }
                </div>

                <!-- Shake -->
                <div class="demo-card">
                    <h3>📳 Shake</h3>
                    <button class="btn" (click)="triggerShake()">Trigger Shake</button>
                    <div class="box red" [@shake]="shakeState()">Shake!</div>
                </div>

                <!-- Pulse -->
                <div class="demo-card">
                    <h3>💓 Pulse</h3>
                    <button class="btn" (click)="triggerPulse()">Trigger Pulse</button>
                    <div class="box pink" [@pulse]="pulseState()">Pulse!</div>
                </div>

                <!-- Flip -->
                <div class="demo-card">
                    <h3>🔄 Flip</h3>
                    <button class="btn" (click)="triggerFlip()">Trigger Flip</button>
                    <div class="box blue" [@flip]="flipState()">Flip!</div>
                </div>

                <!-- Rainbow -->
                <div class="demo-card">
                    <h3>🌈 Rainbow</h3>
                    <button class="btn" (click)="triggerRainbow()">Trigger Rainbow</button>
                    <div class="box" [class]="rainbowClass()" [@rainbow]="rainbowState()">Rainbow!</div>
                </div>

                <!-- Swing -->
                <div class="demo-card">
                    <h3>🎐 Swing</h3>
                    <button class="btn" (click)="triggerSwing()">Trigger Swing</button>
                    <div class="box green" [@swing]="swingState()">Swing!</div>
                </div>
            </div>

            <!-- Code Example -->
            <section class="code-section">
                <h3>📝 Keyframes Syntax</h3>
                <pre><code>animate('1s', keyframes([
  style(&#123; transform: 'scale(1)', offset: 0 &#125;),      // 0%
  style(&#123; transform: 'scale(1.5)', offset: 0.5 &#125;),  // 50%
  style(&#123; transform: 'scale(1)', offset: 1 &#125;)       // 100%
]))</code></pre>
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
        
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .demo-card {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }
        
        .demo-card h3 { margin: 0 0 1rem; color: #f5f5f5; }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            background: linear-gradient(135deg, #a855f7, #6366f1);
            color: white;
            transition: all 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }
        
        .box {
            margin-top: 1rem;
            padding: 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            color: white;
        }
        
        .box.purple { background: linear-gradient(135deg, #a855f7, #6366f1); }
        .box.red { background: linear-gradient(135deg, #ef4444, #f97316); }
        .box.pink { background: linear-gradient(135deg, #ec4899, #f43f5e); }
        .box.blue { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .box.green { background: linear-gradient(135deg, #22c55e, #14b8a6); }
        .box.rainbow-base { background: #a855f7; }
        
        .code-section {
            background: #0d0d0d;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #333;
        }
        
        .code-section h3 { color: #f5f5f5; margin-bottom: 1rem; }
        
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
        }
    `]
})
export class KeyframesAnimationComponent {
    showBounce = signal(true);
    shakeState = signal('');
    pulseState = signal('');
    flipState = signal('');
    rainbowState = signal('');
    swingState = signal('');
    rainbowClass = signal('rainbow-base');

    toggleBounce(): void {
        this.showBounce.set(false);
        setTimeout(() => this.showBounce.set(true), 100);
    }

    triggerShake(): void {
        this.shakeState.set('');
        setTimeout(() => this.shakeState.set('shake'), 10);
    }

    triggerPulse(): void {
        this.pulseState.set('');
        setTimeout(() => this.pulseState.set('pulse'), 10);
    }

    triggerFlip(): void {
        this.flipState.set('');
        setTimeout(() => this.flipState.set('flip'), 10);
    }

    triggerRainbow(): void {
        this.rainbowState.set('');
        setTimeout(() => this.rainbowState.set('rainbow'), 10);
    }

    triggerSwing(): void {
        this.swingState.set('');
        setTimeout(() => this.swingState.set('swing'), 10);
    }
}
