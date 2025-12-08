/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: @OUTPUT WITH CUSTOM EVENTS
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to emit events from child to parent using @Output decorator.
 * 
 * 📝 DESCRIPTION:
 * Create a rating component that emits the selected rating to the parent.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Display 5 stars that can be clicked
 * 2. Emit selected rating when star is clicked
 * 3. Parent receives and displays the rating
 * 4. Hover effect shows preview
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// ========================================
// CHILD COMPONENT (Complete the TODOs)
// ========================================

@Component({
    selector: 'app-star-rating',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="star-rating">
            <span 
                *ngFor="let star of stars; let i = index"
                class="star"
                [class.filled]="i < (hoverRating || rating)"
                [class.hovered]="i < hoverRating"
                (click)="selectRating(i + 1)"
                (mouseenter)="hoverRating = i + 1"
                (mouseleave)="hoverRating = 0">
                ★
            </span>
            <span class="rating-text" *ngIf="rating > 0">
                {{ rating }} / {{ maxRating }}
            </span>
        </div>
    `,
    styles: [`
        .star-rating { display: flex; align-items: center; gap: 0.25rem; }
        .star { font-size: 2rem; cursor: pointer; color: #e5e7eb; transition: all 0.15s; }
        .star.filled { color: #fbbf24; }
        .star.hovered { transform: scale(1.1); }
        .star:hover { transform: scale(1.2); }
        .rating-text { margin-left: 0.5rem; color: #6b7280; font-size: 0.9rem; }
    `]
})
export class StarRatingComponent {
    /**
     * TODO: Add @Input for current rating
     */
    // TODO: @Input() rating = 0;

    /**
     * TODO: Add @Input for max rating (default 5)
     */
    // TODO: @Input() maxRating = 5;

    /**
     * TODO: Add @Output to emit rating changes
     * 
     * Use EventEmitter<number> to emit the selected rating
     */
    // TODO: @Output() ratingChange = new EventEmitter<number>();

    rating = 0;
    maxRating = 5;
    hoverRating = 0;

    get stars(): number[] {
        return Array(this.maxRating).fill(0);
    }

    /**
     * TODO: Implement rating selection
     * 
     * When a star is clicked:
     * 1. Update the internal rating
     * 2. Emit the new rating to the parent
     */
    selectRating(value: number): void {
        // TODO: Write your logic here
        // HINT:
        // this.rating = value;
        // this.ratingChange.emit(value);
    }
}

// ========================================
// PARENT COMPONENT (For testing)
// ========================================

@Component({
    selector: 'app-exercise-2-output-events',
    standalone: true,
    imports: [CommonModule, StarRatingComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: &#64;Output with Custom Events</h2>
                <p>Complete the StarRatingComponent to emit rating changes.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Add &#64;Output() decorator for ratingChange</li>
                    <li>Emit the rating value when star is clicked</li>
                    <li>Handle the event in the parent component</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 Test Your Implementation</h3>
                
                <div class="rating-demo">
                    <h4>Rate this product:</h4>
                    <!-- TODO: Handle (ratingChange) event here -->
                    <app-star-rating></app-star-rating>
                </div>

                <div class="result">
                    <h4>Parent Received:</h4>
                    <p *ngIf="receivedRating > 0">
                        Rating: <strong>{{ receivedRating }}</strong> stars
                    </p>
                    <p *ngIf="receivedRating === 0">
                        No rating selected yet. Click a star above!
                    </p>
                </div>

                <div class="event-log">
                    <h4>Event Log:</h4>
                    <div class="log-entry" *ngFor="let event of eventLog">
                        {{ event }}
                    </div>
                    <div *ngIf="eventLog.length === 0" class="empty">
                        No events yet
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .rating-demo { margin-bottom: 1.5rem; }
        .rating-demo h4 { margin: 0 0 0.5rem; }
        .result { padding: 1rem; background: #f0fdf4; border-radius: 8px; margin-bottom: 1rem; }
        .result h4 { margin: 0 0 0.5rem; }
        .result p { margin: 0; }
        .event-log { padding: 1rem; background: #1e1e2e; border-radius: 8px; color: #a6e3a1; }
        .event-log h4 { margin: 0 0 0.5rem; color: white; }
        .log-entry { padding: 0.25rem 0; font-size: 0.85rem; font-family: monospace; }
        .empty { color: #6b7280; }
    `]
})
export class Exercise2OutputEventsComponent {
    receivedRating = 0;
    eventLog: string[] = [];

    /**
     * TODO: Implement event handler
     * 
     * This method should be called when the rating changes
     */
    onRatingChange(rating: number): void {
        this.receivedRating = rating;
        this.eventLog.unshift(`[${new Date().toLocaleTimeString()}] Rating changed to: ${rating}`);

        if (this.eventLog.length > 5) {
            this.eventLog.pop();
        }
    }
}
