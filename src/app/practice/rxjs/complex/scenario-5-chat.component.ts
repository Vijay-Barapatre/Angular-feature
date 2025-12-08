/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: REAL-TIME CHAT SIMULATION
 * ============================================================================
 */

import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, interval, Subscription, merge } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

interface Message {
    id: number;
    user: string;
    text: string;
    timestamp: Date;
    isOwn: boolean;
}

@Component({
    selector: 'app-scenario-5-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Real-Time Chat</h2>
                <p>Simulate real-time messaging with multiple streams.</p>
            </div>

            <div class="chat-container">
                <div class="chat-header">
                    <span class="status" [class.online]="isConnected()"></span>
                    <span>{{ isConnected() ? 'Connected' : 'Disconnected' }}</span>
                    <button (click)="toggleConnection()">
                        {{ isConnected() ? 'Disconnect' : 'Connect' }}
                    </button>
                </div>

                <div class="messages">
                    @for (msg of messages(); track msg.id) {
                        <div class="message" [class.own]="msg.isOwn">
                            <span class="user">{{ msg.user }}</span>
                            <span class="text">{{ msg.text }}</span>
                            <span class="time">{{ msg.timestamp | date:'shortTime' }}</span>
                        </div>
                    }
                    @if (typingUser()) {
                        <div class="typing">{{ typingUser() }} is typing...</div>
                    }
                </div>

                <div class="input-area">
                    <input 
                        [(ngModel)]="messageText" 
                        placeholder="Type a message..."
                        (keyup.enter)="sendMessage()"
                        [disabled]="!isConnected()">
                    <button (click)="sendMessage()" [disabled]="!isConnected()">Send</button>
                </div>

                <div class="stats">
                    <span>Messages: {{ messages().length }}</span>
                    <span>Users Online: {{ onlineUsers().length }}</span>
                </div>

                <div class="online-users">
                    @for (user of onlineUsers(); track user) {
                        <span class="user-badge">{{ user }}</span>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 500px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; }
        .chat-container { background: #1e1e2e; border-radius: 12px; overflow: hidden; }
        .chat-header { display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: #334155; color: white; }
        .status { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; }
        .status.online { background: #10b981; }
        .chat-header button { margin-left: auto; padding: 0.25rem 0.75rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
        .messages { height: 300px; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .message { max-width: 80%; padding: 0.75rem; background: #334155; border-radius: 12px; color: white; }
        .message.own { align-self: flex-end; background: #f59e0b; }
        .message .user { display: block; font-size: 0.75rem; color: rgba(255,255,255,0.7); margin-bottom: 0.25rem; }
        .message .text { display: block; }
        .message .time { display: block; font-size: 0.65rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem; text-align: right; }
        .typing { color: #94a3b8; font-size: 0.85rem; font-style: italic; }
        .input-area { display: flex; gap: 0.5rem; padding: 1rem; background: #0f172a; }
        .input-area input { flex: 1; padding: 0.75rem; border: none; border-radius: 8px; background: #334155; color: white; }
        .input-area input::placeholder { color: #94a3b8; }
        .input-area input:disabled { opacity: 0.5; }
        .input-area button { padding: 0.75rem 1.5rem; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer; }
        .input-area button:disabled { opacity: 0.5; }
        .stats { display: flex; justify-content: space-around; padding: 0.75rem; background: #0f172a; color: #94a3b8; font-size: 0.85rem; }
        .online-users { display: flex; gap: 0.5rem; padding: 0.75rem; background: #0f172a; flex-wrap: wrap; }
        .user-badge { padding: 0.25rem 0.5rem; background: #10b981; color: white; border-radius: 4px; font-size: 0.75rem; }
    `]
})
export class Scenario5ChatComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];
    private messageSubject = new Subject<Message>();
    private botMessages = [
        'Hey, how are you?',
        'Did you see the game last night?',
        'I love RxJS!',
        'Angular is amazing',
        'Working on a new project',
        'Coffee break anyone?'
    ];
    private botUsers = ['Alice', 'Bob', 'Charlie', 'Diana'];

    messages = signal<Message[]>([]);
    messageText = '';
    isConnected = signal(false);
    typingUser = signal<string | null>(null);
    onlineUsers = signal<string[]>(['You']);
    private messageId = 0;

    toggleConnection(): void {
        if (this.isConnected()) {
            this.disconnect();
        } else {
            this.connect();
        }
    }

    connect(): void {
        this.isConnected.set(true);
        this.onlineUsers.set(['You', ...this.botUsers.slice(0, 2)]);

        // Simulate incoming messages
        const botMessage$ = interval(4000).pipe(
            map(() => this.createBotMessage())
        );

        // Merge user and bot messages
        this.subscriptions.push(
            merge(this.messageSubject, botMessage$).pipe(
                scan((messages, message) => [...messages, message], [] as Message[])
            ).subscribe(messages => {
                this.messages.set(messages);
            })
        );

        // Simulate typing indicator
        this.subscriptions.push(
            interval(6000).subscribe(() => {
                const user = this.botUsers[Math.floor(Math.random() * this.botUsers.length)];
                this.typingUser.set(user);
                setTimeout(() => this.typingUser.set(null), 2000);
            })
        );

        // Simulate users joining/leaving
        this.subscriptions.push(
            interval(8000).subscribe(() => {
                const allUsers = ['You', ...this.shuffleArray([...this.botUsers]).slice(0, Math.floor(Math.random() * 3) + 1)];
                this.onlineUsers.set(allUsers);
            })
        );
    }

    disconnect(): void {
        this.isConnected.set(false);
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions = [];
        this.onlineUsers.set(['You']);
        this.typingUser.set(null);
    }

    sendMessage(): void {
        if (!this.messageText.trim() || !this.isConnected()) return;

        const message: Message = {
            id: ++this.messageId,
            user: 'You',
            text: this.messageText,
            timestamp: new Date(),
            isOwn: true
        };

        this.messageSubject.next(message);
        this.messageText = '';
    }

    private createBotMessage(): Message {
        return {
            id: ++this.messageId,
            user: this.botUsers[Math.floor(Math.random() * this.botUsers.length)],
            text: this.botMessages[Math.floor(Math.random() * this.botMessages.length)],
            timestamp: new Date(),
            isOwn: false
        };
    }

    private shuffleArray<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
