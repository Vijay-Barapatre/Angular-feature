/**
 * RECEIVER COMPONENT - USE CASE 1: Basic Service & Injection
 * 
 * PURPOSE:
 * Demonstrates that ANY component can inject the SAME service instance.
 * 
 * KEY INSIGHT:
 * This is called "Receiver" (not "Child") because services work
 * independently of component hierarchy. This component could be
 * in a completely different part of the app!
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';

@Component({
    selector: 'app-use-case-1-receiver',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './receiver.component.html',
    styleUrl: './receiver.component.css'
})
export class ReceiverComponent {
    /**
     * Input for receiver's message
     */
    newMessage = '';

    /**
     * SAME SERVICE, SAME INSTANCE!
     * 
     * This component injects the EXACT SAME DataService instance.
     * It doesn't matter where in the app this component is placed!
     */
    constructor(private dataService: DataService) {
        console.log('[ReceiverComponent] DataService injected (same instance!)');
    }

    /**
     * Add message from receiver.
     * This will appear in ALL components using this service!
     */
    addMessage(): void {
        if (this.newMessage.trim()) {
            this.dataService.addMessage(`[Receiver] ${this.newMessage}`);
            this.newMessage = '';
        }
    }

    /**
     * Get messages - same data as Sender component.
     */
    get messages(): string[] {
        return this.dataService.getMessages();
    }

    /**
     * Get message count for display.
     */
    get messageCount(): number {
        return this.dataService.getMessageCount();
    }
}
