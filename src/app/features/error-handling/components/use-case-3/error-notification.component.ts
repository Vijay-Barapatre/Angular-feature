/**
 * ============================================================================
 * USE CASE 3: ERROR NOTIFICATION SERVICE
 * ============================================================================
 */

import { Component, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Error Notification Service
@Injectable({ providedIn: 'root' })
export class NotificationService {
    private _notifications = signal<Notification[]>([]);
    notifications = this._notifications.asReadonly();

    private idCounter = 0;

    show(message: string, type: 'error' | 'success' | 'warning' | 'info' = 'info', duration = 5000): void {
        const id = ++this.idCounter;
        const notification: Notification = { id, message, type };

        this._notifications.update(list => [...list, notification]);

        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }
    }

    showError(message: string, duration = 5000): void {
        this.show(message, 'error', duration);
    }

    showSuccess(message: string, duration = 3000): void {
        this.show(message, 'success', duration);
    }

    dismiss(id: number): void {
        this._notifications.update(list => list.filter(n => n.id !== id));
    }

    clear(): void {
        this._notifications.set([]);
    }
}

interface Notification {
    id: number;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
}

@Component({
    selector: 'app-error-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔔 Error Notification</h1>
                <p class="subtitle">Toast/Snackbar Service for User Feedback</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    A notification service provides a centralized way to show user feedback.
                    It can be used by interceptors, guards, and components to display errors, 
                    success messages, and warnings.
                </p>
            </section>

            <section class="code-section">
                <h2>💻 Notification Service (Signals)</h2>
                <pre class="code"><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class NotificationService {{ '{' }}
    private _notifications = signal&lt;Notification[]&gt;([]);
    notifications = this._notifications.asReadonly();
    
    show(message: string, type: NotificationType, duration = 5000): void {{ '{' }}
        const id = Date.now();
        this._notifications.update(list => [...list, {{ '{' }} id, message, type {{ '}' }}]);
        
        if (duration > 0) {{ '{' }}
            setTimeout(() => this.dismiss(id), duration);
        {{ '}' }}
    {{ '}' }}
    
    showError(message: string): void {{ '{' }}
        this.show(message, 'error', 5000);
    {{ '}' }}
    
    dismiss(id: number): void {{ '{' }}
        this._notifications.update(list => list.filter(n => n.id !== id));
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-box">
                    <button (click)="showError()" class="btn error">❌ Show Error</button>
                    <button (click)="showWarning()" class="btn warning">⚠️ Show Warning</button>
                    <button (click)="showSuccess()" class="btn success">✅ Show Success</button>
                    <button (click)="showInfo()" class="btn info">ℹ️ Show Info</button>
                </div>
                
                <!-- Notification Toast Container -->
                <div class="toast-container">
                    @for (n of notificationService.notifications(); track n.id) {
                        <div class="toast" [class]="n.type">
                            <span class="toast-message">{{ n.message }}</span>
                            <button class="toast-close" (click)="notificationService.dismiss(n.id)">×</button>
                        </div>
                    }
                </div>
            </section>

            <section class="container-section">
                <h2>💻 Toast Container Component</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    selector: 'app-toast-container',
    template: &#96;
        &lt;div class="toast-container"&gt;
            &#64;for (n of notificationService.notifications(); track n.id) {{ '{' }}
                &lt;div class="toast" [class]="n.type"&gt;
                    {{ '{{' }} n.message {{ '}}' }}
                    &lt;button (click)="notificationService.dismiss(n.id)"&gt;×&lt;/button&gt;
                &lt;/div&gt;
            {{ '}' }}
        &lt;/div&gt;
    &#96;
{{ '}' }})
export class ToastContainerComponent {{ '{' }}
    notificationService = inject(NotificationService);
{{ '}' }}

// Add to app.component.html
&lt;router-outlet&gt;&lt;/router-outlet&gt;
&lt;app-toast-container&gt;&lt;/app-toast-container&gt;</code></pre>
            </section>

            <section class="integration-section">
                <h2>🔗 Use in Interceptor</h2>
                <pre class="code"><code>export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {{ '{' }}
    const notifications = inject(NotificationService);
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {{ '{' }}
            notifications.showError('Request failed: ' + error.message);
            return throwError(() => error);
        {{ '}' }})
    );
{{ '}' }};</code></pre>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Use Signals for reactive notification list</li>
                    <li>Auto-dismiss with configurable duration</li>
                    <li>Place toast container in app.component</li>
                    <li>Consider using Angular Material Snackbar for production</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #ef4444; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        .demo-box { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-bottom: 1.5rem; }
        .btn { padding: 0.75rem 1.25rem; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9rem; color: white; }
        .btn.error { background: #ef4444; }
        .btn.warning { background: #f59e0b; }
        .btn.success { background: #22c55e; }
        .btn.info { background: #3b82f6; }

        .toast-container { position: fixed; top: 1rem; right: 1rem; display: flex; flex-direction: column; gap: 0.5rem; z-index: 1000; }
        .toast { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-radius: 8px; color: white; min-width: 250px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease; }
        .toast.error { background: #ef4444; }
        .toast.warning { background: #f59e0b; }
        .toast.success { background: #22c55e; }
        .toast.info { background: #3b82f6; }
        .toast-message { flex: 1; }
        .toast-close { background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer; opacity: 0.8; }
        .toast-close:hover { opacity: 1; }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class ErrorNotificationComponent {
    notificationService = new NotificationService();

    showError() {
        this.notificationService.showError('Something went wrong! Please try again.');
    }

    showWarning() {
        this.notificationService.show('This action cannot be undone!', 'warning');
    }

    showSuccess() {
        this.notificationService.showSuccess('Operation completed successfully!');
    }

    showInfo() {
        this.notificationService.show('New updates are available.', 'info');
    }
}
