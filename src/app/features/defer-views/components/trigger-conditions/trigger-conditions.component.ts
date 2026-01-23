/**
 * ============================================================================
 * TRIGGER CONDITIONS
 * ============================================================================
 * 
 * Demonstrates all @defer trigger conditions:
 * - on viewport
 * - on interaction  
 * - on hover
 * - on idle (default)
 * - on timer
 * - on immediate
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-viewport-content',
    standalone: true,
    template: `<div class="demo-content viewport">👁️ Loaded on viewport!</div>`,
    styles: [`.demo-content { padding: 1.5rem; border-radius: 8px; text-align: center; font-weight: 500; } .viewport { background: #dbeafe; color: #1d4ed8; }`]
})
export class ViewportContent { }

@Component({
    selector: 'app-interaction-content',
    standalone: true,
    template: `<div class="demo-content interaction">🖱️ Loaded on click!</div>`,
    styles: [`.demo-content { padding: 1.5rem; border-radius: 8px; text-align: center; font-weight: 500; } .interaction { background: #dcfce7; color: #16a34a; }`]
})
export class InteractionContent { }

@Component({
    selector: 'app-hover-content',
    standalone: true,
    template: `<div class="demo-content hover">🎯 Loaded on hover!</div>`,
    styles: [`.demo-content { padding: 1.5rem; border-radius: 8px; text-align: center; font-weight: 500; } .hover { background: #fef3c7; color: #d97706; }`]
})
export class HoverContent { }

@Component({
    selector: 'app-timer-content',
    standalone: true,
    template: `<div class="demo-content timer">⏱️ Loaded after 3 seconds!</div>`,
    styles: [`.demo-content { padding: 1.5rem; border-radius: 8px; text-align: center; font-weight: 500; } .timer { background: #fce7f3; color: #db2777; }`]
})
export class TimerContent { }

@Component({
    selector: 'app-trigger-conditions',
    standalone: true,
    imports: [CommonModule, ViewportContent, InteractionContent, HoverContent, TimerContent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Trigger Conditions</h1>
                <p class="subtitle">Control when deferred content loads</p>
            </header>

            <section class="triggers-grid">
                <!-- ON VIEWPORT -->
                <div class="trigger-card">
                    <h3>on viewport</h3>
                    <p>Loads when element enters viewport</p>
                    <div class="demo-area">
                        @defer (on viewport) {
                            <app-viewport-content />
                        } @placeholder {
                            <div class="placeholder">📦 Scroll to load</div>
                        }
                    </div>
                    <code>&#64;defer (on viewport)</code>
                </div>

                <!-- ON INTERACTION -->
                <div class="trigger-card">
                    <h3>on interaction</h3>
                    <p>Loads on click, focus, or keydown</p>
                    <div class="demo-area" #interactionTrigger>
                        @defer (on interaction(interactionTrigger)) {
                            <app-interaction-content />
                        } @placeholder {
                            <button class="trigger-btn">Click me to load!</button>
                        }
                    </div>
                    <code>&#64;defer (on interaction)</code>
                </div>

                <!-- ON HOVER -->
                <div class="trigger-card">
                    <h3>on hover</h3>
                    <p>Loads when mouse hovers over element</p>
                    <div class="demo-area" #hoverTrigger>
                        @defer (on hover(hoverTrigger)) {
                            <app-hover-content />
                        } @placeholder {
                            <div class="hover-target">🎯 Hover over me!</div>
                        }
                    </div>
                    <code>&#64;defer (on hover)</code>
                </div>

                <!-- ON TIMER -->
                <div class="trigger-card">
                    <h3>on timer</h3>
                    <p>Loads after specified duration</p>
                    <div class="demo-area">
                        @defer (on timer(3s)) {
                            <app-timer-content />
                        } @placeholder {
                            <div class="placeholder">⏱️ Loading in 3s...</div>
                        } @loading {
                            <div class="loading-state">Loading...</div>
                        }
                    </div>
                    <code>&#64;defer (on timer(3s))</code>
                </div>
            </section>

            <section class="reference-table">
                <h2>📋 Trigger Reference</h2>
                <table>
                    <tr><th>Trigger</th><th>Description</th><th>Use Case</th></tr>
                    <tr>
                        <td><code>on viewport</code></td>
                        <td>IntersectionObserver</td>
                        <td>Below-fold content</td>
                    </tr>
                    <tr>
                        <td><code>on interaction</code></td>
                        <td>click, focus, keydown</td>
                        <td>Expandable sections</td>
                    </tr>
                    <tr>
                        <td><code>on hover</code></td>
                        <td>mouseenter event</td>
                        <td>Tooltips, previews</td>
                    </tr>
                    <tr>
                        <td><code>on idle</code></td>
                        <td>requestIdleCallback</td>
                        <td>Default behavior</td>
                    </tr>
                    <tr>
                        <td><code>on timer(Xms)</code></td>
                        <td>setTimeout</td>
                        <td>Delayed content</td>
                    </tr>
                    <tr>
                        <td><code>on immediate</code></td>
                        <td>No delay</td>
                        <td>Code split only</td>
                    </tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .triggers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .trigger-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 12px;
        }
        .trigger-card h3 { margin: 0 0 0.25rem 0; color: var(--primary-color, #667eea); }
        .trigger-card p { margin: 0 0 1rem 0; color: var(--text-secondary, #666); font-size: 0.85rem; }
        .trigger-card code { display: block; margin-top: 1rem; background: #1e1e2e; color: #a6e3a1; padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; }

        .demo-area { min-height: 70px; }
        .placeholder {
            background: #f3f4f6; padding: 1rem; border-radius: 8px;
            text-align: center; border: 2px dashed #d1d5db;
        }
        .trigger-btn {
            width: 100%; padding: 1rem; background: #667eea; color: white;
            border: none; border-radius: 8px; cursor: pointer; font-weight: 500;
        }
        .hover-target {
            background: #fef3c7; padding: 1rem; border-radius: 8px;
            text-align: center; cursor: pointer;
        }
        .loading-state { background: #e0e7ff; padding: 1rem; border-radius: 8px; text-align: center; }

        .reference-table { margin-top: 2rem; }
        .reference-table h2 { margin-bottom: 1rem; }
        .reference-table table { width: 100%; border-collapse: collapse; }
        .reference-table th, .reference-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .reference-table th { background: var(--bg-secondary, #f8f9fa); }
        .reference-table code { background: #e5e7eb; padding: 0.15rem 0.4rem; border-radius: 4px; }
    `]
})
export class TriggerConditionsComponent { }
