/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: NAVIGATION EVENTS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavEvent {
    type: string;
    url: string;
    time: string;
    color: string;
}

@Component({
    selector: 'app-scenario-4-events',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Navigation Events</h2>
                <p>Track and respond to router events.</p>
            </div>

            <div class="content">
                <div class="event-types">
                    <div class="event-type">
                        <span class="badge blue">NavigationStart</span>
                        <p>Navigation begins</p>
                    </div>
                    <div class="event-type">
                        <span class="badge green">NavigationEnd</span>
                        <p>Navigation completes</p>
                    </div>
                    <div class="event-type">
                        <span class="badge red">NavigationCancel</span>
                        <p>Navigation cancelled</p>
                    </div>
                    <div class="event-type">
                        <span class="badge orange">NavigationError</span>
                        <p>Navigation failed</p>
                    </div>
                </div>

                <h3>🎮 Simulate Navigation</h3>

                <div class="nav-buttons">
                    <button (click)="simulateNavigation('/home', 'success')">
                        Navigate to /home
                    </button>
                    <button (click)="simulateNavigation('/products', 'success')">
                        Navigate to /products
                    </button>
                    <button (click)="simulateNavigation('/admin', 'cancel')" class="cancel">
                        Navigate to /admin (will cancel)
                    </button>
                    <button (click)="simulateNavigation('/error', 'error')" class="error">
                        Navigate to /error (will fail)
                    </button>
                </div>

                <div class="events-log">
                    <h4>📋 Router Events</h4>
                    @for (event of events(); track event.time) {
                        <div class="event" [style.borderLeftColor]="event.color">
                            <span class="event-time">{{ event.time }}</span>
                            <span class="event-type">{{ event.type }}</span>
                            <span class="event-url">{{ event.url }}</span>
                        </div>
                    }
                    @if (events().length === 0) {
                        <p class="empty">Click a button to trigger navigation events</p>
                    }
                </div>

                <div class="code-example">
                    <h4>Listening to Events</h4>
                    <pre><code>constructor(private router: Router) {{ '{' }}
  this.router.events.pipe(
    filter(e => e instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {{ '{' }}
    // Track page view
    analytics.trackPageView(event.urlAfterRedirects);
    
    // Update loading state
    this.loading = false;
  {{ '}' }});
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .event-types { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1.5rem; }
        .event-type { padding: 0.75rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: bold; color: white; }
        .badge.blue { background: #3b82f6; }
        .badge.green { background: #10b981; }
        .badge.red { background: #ef4444; }
        .badge.orange { background: #f59e0b; }
        .event-type p { margin: 0.5rem 0 0; font-size: 0.75rem; color: #6b7280; }
        .nav-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .nav-buttons button { padding: 0.5rem 1rem; background: #ec4899; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .nav-buttons button.cancel { background: #6b7280; }
        .nav-buttons button.error { background: #ef4444; }
        .events-log { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; min-height: 150px; }
        .events-log h4 { margin: 0 0 0.75rem; color: white; font-size: 0.9rem; }
        .event { display: flex; gap: 1rem; padding: 0.5rem; border-left: 3px solid; margin-bottom: 0.5rem; }
        .event-time { color: #6b7280; font-size: 0.75rem; min-width: 70px; }
        .event-type { color: white; font-weight: bold; min-width: 140px; }
        .event-url { color: #a6e3a1; font-family: monospace; font-size: 0.85rem; }
        .empty { color: #6b7280; text-align: center; margin: 2rem 0; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; overflow-x: auto; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario4EventsComponent {
    events = signal<NavEvent[]>([]);

    simulateNavigation(url: string, outcome: 'success' | 'cancel' | 'error'): void {
        const addEvent = (type: string, color: string) => {
            this.events.update(events => [{
                type,
                url,
                time: new Date().toLocaleTimeString(),
                color
            }, ...events].slice(0, 10));
        };

        // NavigationStart
        addEvent('NavigationStart', '#3b82f6');

        setTimeout(() => {
            // RouteConfigLoadStart (for lazy routes)
            addEvent('RoutesRecognized', '#8b5cf6');
        }, 100);

        setTimeout(() => {
            // GuardsCheckStart
            addEvent('GuardsCheckStart', '#06b6d4');
        }, 200);

        setTimeout(() => {
            if (outcome === 'cancel') {
                addEvent('GuardsCheckEnd', '#6b7280');
                addEvent('NavigationCancel', '#ef4444');
            } else if (outcome === 'error') {
                addEvent('NavigationError', '#f59e0b');
            } else {
                addEvent('GuardsCheckEnd', '#06b6d4');
                addEvent('ResolveStart', '#f59e0b');

                setTimeout(() => {
                    addEvent('ResolveEnd', '#f59e0b');
                    addEvent('NavigationEnd', '#10b981');
                }, 200);
            }
        }, 400);
    }
}
