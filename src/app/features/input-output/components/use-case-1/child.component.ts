/**
 * USE CASE 1: BASIC @Input() and @Output() - CHILD COMPONENT
 * 
 * This child component demonstrates:
 * 1. Receiving data from parent via @Input() decorators
 * 2. Emitting events to parent via @Output() and EventEmitter
 * 3. How child components remain reusable and decoupled from parent
 * 
 * KEY PRINCIPLE: "Props Down, Events Up" (also known as unidirectional data flow)
 * - Data flows DOWN from parent to child via @Input()
 * - Events flow UP from child to parent via @Output()
 * 
 * DATA FLOW DIAGRAM:
 * ```mermaid
 * graph TD
 *     Parent[Parent Component] -->|Data via @Input| Child[Child Component]
 *     Child -->|Events via @Output| Parent
 *     
 *     subgraph Data Flow
 *     Parent -- userName, age, etc. --> Child
 *     end
 *     
 *     subgraph Event Flow
 *     Child -- greetingClick, colorClick --> Parent
 *     end
 * ```
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-use-case-1-child',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './child.component.html',
    styleUrl: './child.component.css'
})
export class UseCase1ChildComponent {
    /**
     * @Input() DECORATORS
     * 
     * The @Input() decorator marks a property as bindable from the parent component.
     * Parent can pass data using property binding: [propertyName]="value"
     * 
     * SYNTAX: @Input() propertyName: type;
     */

    /**
     * userName Input
     * Receives the user's name from the parent
     * Type: string
     */
    @Input() userName: string = '';

    /**
     * age Input
     * Receives the user's age from the parent
     * Type: number
     * Default value: 0 (used if parent doesn't provide a value)
     */
    @Input() age: number = 0;

    /**
     * isActive Input
     * Receives the user's active status from the parent
     * Type: boolean
     */
    @Input() isActive: boolean = false;

    /**
     * colors Input
     * Receives an array of favorite colors from the parent
     * Type: string array
     * 
     * IMPORTANT: When passing arrays/objects, remember that JavaScript
     * passes by reference. Changes to the array here would affect the parent!
     * Best practice: Don't mutate input arrays/objects directly.
     */
    @Input() colors: string[] = [];

    /**
     * @Output() DECORATORS
     * 
     * The @Output() decorator marks a property as an event emitter.
     * Parent can listen to events using event binding: (eventName)="handler($event)"
     * 
     * SYNTAX: @Output() eventName = new EventEmitter<DataType>();
     * 
     * EventEmitter is a class that:
     * - Is imported from '@angular/core'
     * - Has an emit() method to send events
     * - Can specify the type of data to emit using generics <T>
     */

    /**
     * greetingClick Output
     * Emits a string message when the greeting is clicked
     * Type: EventEmitter<string>
     */
    @Output() greetingClick = new EventEmitter<string>();

    /**
     * colorClick Output
     * Emits the clicked color when a color badge is clicked
     * Type: EventEmitter<string>
     */
    @Output() colorClick = new EventEmitter<string>();

    /**
     * METHOD: Handle Greeting Click
     * 
     * When the user clicks the greeting, this method:
     * 1. Creates a message
     * 2. Emits the message to the parent via the greetingClick event
     * 
     * The parent component listens to this event and can handle it however it wants.
     * The child doesn't know or care what the parent does with the event!
     */
    onGreetingClick(): void {
        // emit() sends the event to the parent
        // Any component listening to (greetingClick) will receive this message
        const message = `Hello from ${this.userName}! 👋`;
        this.greetingClick.emit(message);
    }

    /**
     * METHOD: Handle Color Click
     * 
     * When a color badge is clicked, emit that color to the parent
     * 
     * @param color - The color that was clicked
     */
    onColorClick(color: string): void {
        // Emit the clicked color to the parent
        this.colorClick.emit(color);
    }

    /**
     * GETTER: Display Status
     * 
     * Computed property that returns a formatted status message
     * based on the isActive input value
     * 
     * This demonstrates how components can derive values from inputs
     */
    get statusMessage(): string {
        return this.isActive ? '✅ Active' : '⛔ Inactive';
    }

    /**
     * GETTER: Status Class
     * 
     * Returns a CSS class name based on active status
     * This is used for dynamic styling in the template
     */
    get statusClass(): string {
        return this.isActive ? 'status-active' : 'status-inactive';
    }
}
