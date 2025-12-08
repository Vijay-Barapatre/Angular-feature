/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: TIME AGO
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
    transform(date: Date | string | number): string {
        const now = new Date();
        const past = new Date(date);
        const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

        const intervals: [number, string][] = [
            [31536000, 'year'],
            [2592000, 'month'],
            [86400, 'day'],
            [3600, 'hour'],
            [60, 'minute'],
            [1, 'second']
        ];

        for (const [secondsInInterval, name] of intervals) {
            const count = Math.floor(seconds / secondsInInterval);
            if (count >= 1) {
                return `${count} ${name}${count > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    }
}

@Component({
    selector: 'app-scenario-3-time-ago',
    standalone: true,
    imports: [CommonModule, TimeAgoPipe],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Time Ago Pipe</h2>
                <p>Display relative time like "2 hours ago".</p>
            </div>

            <div class="content">
                <div class="timeline">
                    @for (event of events; track event.id) {
                        <div class="event">
                            <span class="event-text">{{ event.text }}</span>
                            <span class="time-ago">{{ event.date | timeAgo }}</span>
                        </div>
                    }
                </div>

                <button (click)="addEvent()">Add New Event</button>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .timeline { margin-bottom: 1rem; }
        .event { display: flex; justify-content: space-between; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 0.5rem; border-left: 3px solid #10b981; }
        .event-text { font-weight: 500; }
        .time-ago { color: #6b7280; font-size: 0.9rem; }
        button { padding: 0.75rem 1.5rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
    `]
})
export class Scenario3TimeAgoComponent {
    events = [
        { id: 1, text: 'User signed up', date: new Date(Date.now() - 1000 * 60 * 2) },
        { id: 2, text: 'Order placed', date: new Date(Date.now() - 1000 * 60 * 60 * 3) },
        { id: 3, text: 'Payment received', date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        { id: 4, text: 'Account created', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
    ];

    addEvent(): void {
        this.events = [{
            id: Date.now(),
            text: 'New event created',
            date: new Date()
        }, ...this.events];
    }
}
