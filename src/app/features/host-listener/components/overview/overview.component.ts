/**
 * ============================================================================
 * HOST LISTENER & HOST BINDING OVERVIEW COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface UseCase {
    id: number;
    title: string;
    description: string;
    path: string;
    icon: string;
}

@Component({
    selector: 'app-host-listener-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="overview-container">
            <header class="header">
                <h1>🎯 HostListener & HostBinding</h1>
                <p class="subtitle">
                    Interact with host elements: listen to events and bind properties dynamically.
                </p>
            </header>

            <section class="concepts">
                <h2>🔑 Key Concepts</h2>
                <div class="concept-grid">
                    <div class="concept-card listener">
                        <h3>&#64;HostListener</h3>
                        <p>Listen to DOM events on the host element or window/document.</p>
                        <code>&#64;HostListener('click', ['$event'])</code>
                    </div>
                    <div class="concept-card binding">
                        <h3>&#64;HostBinding</h3>
                        <p>Bind host element properties, classes, styles, or attributes.</p>
                        <code>&#64;HostBinding('class.active') isActive = true;</code>
                    </div>
                </div>
            </section>

            <section class="use-cases">
                <h2>📚 Use Cases</h2>
                <div class="use-cases-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card">
                            <div class="card-header">
                                <span class="use-case-icon">{{ useCase.icon }}</span>
                                <span class="use-case-number">Use Case {{ useCase.id }}</span>
                            </div>
                            <h3>{{ useCase.title }}</h3>
                            <p>{{ useCase.description }}</p>
                        </a>
                    }
                </div>
            </section>
        </div>
    `,
    styles: [`
        .overview-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; }
        .header h1 { font-size: 2.5rem; color: #1a1a2e; margin-bottom: 1rem; }
        .subtitle { font-size: 1.2rem; color: #666; max-width: 600px; margin: 0 auto; }

        .concepts { margin-bottom: 3rem; }
        .concepts h2 { text-align: center; margin-bottom: 1.5rem; color: #1a1a2e; }
        .concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .concept-card { padding: 1.5rem; border-radius: 12px; color: white; }
        .concept-card.listener { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .concept-card.binding { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .concept-card h3 { margin-top: 0; }
        .concept-card code { background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 6px; display: block; margin-top: 1rem; font-size: 0.85rem; }

        .use-cases h2 { text-align: center; margin-bottom: 1.5rem; color: #1a1a2e; }
        .use-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .use-case-card {
            background: white; border: 1px solid #e0e0e0; border-radius: 12px;
            padding: 1.5rem; text-decoration: none; color: inherit;
            transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .use-case-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(102,126,234,0.2); border-color: #667eea; }
        .card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .use-case-icon { font-size: 1.5rem; }
        .use-case-number { font-size: 0.85rem; color: #667eea; font-weight: 600; }
        .use-case-card h3 { margin: 0 0 0.5rem 0; color: #1a1a2e; font-size: 1.1rem; }
        .use-case-card p { margin: 0; color: #666; font-size: 0.9rem; line-height: 1.5; }
    `]
})
export class HostListenerOverviewComponent {
    useCases: UseCase[] = [
        { id: 1, title: 'Basic HostListener', description: 'Listen to host element events: click, mouseenter, mouseleave.', path: 'basic-host-listener', icon: '👆' },
        { id: 2, title: 'Keyboard Events', description: 'Handle keyboard shortcuts and key combinations.', path: 'keyboard-events', icon: '⌨️' },
        { id: 3, title: 'Window/Document Events', description: 'React to scroll, resize, and window-level events.', path: 'window-events', icon: '🖥️' },
        { id: 4, title: 'HostBinding Basics', description: 'Dynamically bind classes, styles, and attributes.', path: 'host-binding', icon: '🎨' },
        { id: 5, title: 'Combined Pattern', description: 'Interactive components using both decorators together.', path: 'combined', icon: '🔗' },
        { id: 6, title: 'Custom Directive', description: 'Build reusable attribute directive with both decorators.', path: 'custom-directive', icon: '🧩' }
    ];
}
