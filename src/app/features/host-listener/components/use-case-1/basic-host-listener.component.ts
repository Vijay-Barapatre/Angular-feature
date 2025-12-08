/**
 * ============================================================================
 * USE CASE 1: BASIC @HostListener
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * @HostListener decorates a METHOD that will be called when an event fires
 * on the HOST element (the element this component/directive is attached to).
 * 
 * SYNTAX:
 * @HostListener('eventName', ['$event'])
 * methodName(event: Event) { ... }
 * 
 * EVENT TARGETS:
 * - 'click'       - Host element click
 * - 'mouseenter'  - Mouse enters host element
 * - 'mouseleave'  - Mouse leaves host element
 * - 'focus'       - Host element gains focus
 * - 'blur'        - Host element loses focus
 */

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-basic-host-listener',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>👆 Use Case 1: Basic &#64;HostListener</h1>
            <p class="description">
                Listen to host element events. Click, hover, and interact with elements below.
            </p>

            <!-- This component itself is the host - events bubble up -->
            <div class="demo-box interactive">
                <h3>Interactive Box</h3>
                <p>Click count: <strong>{{ clickCount }}</strong></p>
                <p>Status: <span [class]="isHovered ? 'hovered' : ''">
                    {{ isHovered ? '🟢 Hovering' : '⚪ Not hovering' }}
                </span></p>
            </div>

            <div class="event-log">
                <h3>📋 Event Log</h3>
                <div class="log-entries">
                    @for (log of eventLogs; track $index) {
                        <div class="log-entry">{{ log }}</div>
                    }
                    @empty {
                        <div class="empty">Interact with the page to see events...</div>
                    }
                </div>
                <button (click)="clearLogs()" class="clear-btn">Clear</button>
            </div>

            <div class="code-ref">
                <h3>💻 Code Reference</h3>
                <pre>
&#64;HostListener('click', ['$event'])
onClick(event: MouseEvent) {{ '{' }}
    console.log('Clicked!', event);
{{ '}' }}

&#64;HostListener('mouseenter')
onMouseEnter() {{ '{' }}
    this.isHovered = true;
{{ '}' }}

&#64;HostListener('mouseleave')
onMouseLeave() {{ '{' }}
    this.isHovered = false;
{{ '}' }}
                </pre>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 2rem; border-radius: 12px;
            text-align: center; margin-bottom: 2rem;
            transition: all 0.3s ease; cursor: pointer;
        }
        .demo-box:hover { transform: scale(1.02); box-shadow: 0 8px 30px rgba(102,126,234,0.4); }
        .demo-box h3 { margin-top: 0; }
        .hovered { color: #4ade80; font-weight: bold; }

        .event-log { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .event-log h3 { margin-top: 0; color: #1a1a2e; }
        .log-entries { max-height: 200px; overflow-y: auto; background: #1a1a2e; border-radius: 8px; padding: 1rem; }
        .log-entry { color: #4ade80; font-family: monospace; font-size: 0.85rem; padding: 0.25rem 0; border-bottom: 1px solid #333; }
        .empty { color: #888; font-style: italic; }
        .clear-btn { margin-top: 1rem; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; background: #ef4444; color: white; }

        .code-ref { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-ref h3 { color: white; margin-top: 0; }
        .code-ref pre { color: #4ade80; margin: 0; overflow-x: auto; }
    `]
})
export class BasicHostListenerComponent {
    clickCount = 0;
    isHovered = false;
    eventLogs: string[] = [];

    private log(message: string) {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLogs.unshift(`${timestamp}: ${message}`);
        if (this.eventLogs.length > 20) this.eventLogs.pop();
    }

    /**
     * @HostListener('click')
     * 
     * Listens to ALL click events on the host element.
     * The ['$event'] parameter passes the native event object.
     */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        this.clickCount++;
        this.log(`Click at (${event.clientX}, ${event.clientY})`);
    }

    /**
     * @HostListener('mouseenter')
     * 
     * Fires when mouse enters the host element.
     */
    @HostListener('mouseenter')
    onMouseEnter() {
        this.isHovered = true;
        this.log('Mouse entered host');
    }

    /**
     * @HostListener('mouseleave')
     * 
     * Fires when mouse leaves the host element.
     */
    @HostListener('mouseleave')
    onMouseLeave() {
        this.isHovered = false;
        this.log('Mouse left host');
    }

    clearLogs() {
        this.eventLogs = [];
    }
}
