/**
 * SENDER COMPONENT - USE CASE 1: Basic Service & Injection
 * 
 * PURPOSE:
 * Demonstrates how to inject a service via constructor and use it
 * to share data with OTHER components (not just children!).
 * 
 * KEY INSIGHT:
 * This component is called "Sender" (not "Parent") because services
 * don't require a parent-child relationship. ANY component can inject
 * and use the same service instance.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from './data.service';
import { ReceiverComponent } from './receiver.component';

@Component({
    selector: 'app-use-case-1-sender',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, ReceiverComponent],
    templateUrl: './sender.component.html',
    styleUrl: './sender.component.css'
})
export class SenderComponent {
    /**
     * Input field bound to the new message text
     */
    newMessage = '';

    /**
     * CONSTRUCTOR INJECTION
     * 
     * Angular's DI system:
     * 1. Sees that DataService is needed
     * 2. Finds the root-level singleton (providedIn: 'root')
     * 3. Injects that SAME instance into this component
     */
    constructor(private dataService: DataService) {
        console.log('[SenderComponent] DataService injected');
    }

    /**
     * Add message using the shared service.
     * ANY component with this service will see the message immediately!
     */
    addMessage(): void {
        if (this.newMessage.trim()) {
            this.dataService.addMessage(`[Sender] ${this.newMessage}`);
            this.newMessage = '';
        }
    }

    /**
     * Clear all messages via the service.
     */
    clearAll(): void {
        this.dataService.clearMessages();
    }

    /**
     * Get messages from the service for display.
     */
    get messages(): string[] {
        return this.dataService.getMessages();
    }

    /**
     * Get operation count for display.
     */
    get operationCount(): number {
        return this.dataService.getOperationCount();
    }
}
