/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: JWT TOKEN REFRESH WITH INTERCEPTOR
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * An enterprise application uses JWT tokens for authentication.
 * Access tokens expire every 15 minutes. The system must:
 * - Automatically refresh tokens before they expire
 * - Handle 401 errors by attempting token refresh
 * - Queue failed requests and retry after refresh
 * - Logout user if refresh fails
 * 
 * 📝 PROBLEM STATEMENT:
 * Implement a complete token refresh flow using Angular interceptors
 * that provides seamless user experience without manual re-login.
 * 
 * ✅ EXPECTED RESULT:
 * - Expired tokens trigger automatic refresh
 * - Multiple simultaneous 401s only cause one refresh
 * - Failed requests are retried with new token
 * - User is logged out on refresh failure
 */

import { Component, Injectable, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    HttpClient,
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';

// ========================================
// INTERFACES
// ========================================

interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // Unix timestamp
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// ========================================
// AUTH SERVICE
// ========================================

@Injectable({ providedIn: 'root' })
export class JwtAuthService {
    private tokenPair = signal<TokenPair | null>(null);
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    getAccessToken(): string | null {
        return this.tokenPair()?.accessToken || null;
    }

    getRefreshToken(): string | null {
        return this.tokenPair()?.refreshToken || null;
    }

    /**
     * TODO: Implement token expiry check
     * 
     * Return true if:
     * - No token exists, OR
     * - Token expires within the buffer time (e.g., 60 seconds)
     */
    isTokenExpired(bufferSeconds = 60): boolean {
        /*
         * TODO: Implement feature logic here
         * 
         * const token = this.tokenPair();
         * if (!token) return true;
         * 
         * const now = Math.floor(Date.now() / 1000);
         * return token.expiresAt - now < bufferSeconds;
         */

        return true; // Replace with your implementation
    }

    /**
     * TODO: Implement token refresh
     * 
     * Make HTTP call to refresh endpoint with refresh token.
     * On success: Store new tokens
     * On failure: Clear tokens and throw error
     * 
     * Must handle concurrent refresh requests (only one should proceed)
     */
    refreshTokens(): Observable<string> {
        /*
         * TODO: Implement feature logic here
         * 
         * if (this.isRefreshing) {
         *     // Wait for ongoing refresh to complete
         *     return this.refreshTokenSubject.pipe(
         *         filter(token => token !== null),
         *         take(1)
         *     );
         * }
         * 
         * this.isRefreshing = true;
         * this.refreshTokenSubject.next(null);
         * 
         * // Simulate API call
         * return http.post<TokenPair>('/api/auth/refresh', {
         *     refreshToken: this.getRefreshToken()
         * }).pipe(
         *     switchMap(response => {
         *         this.setTokens(response);
         *         this.refreshTokenSubject.next(response.accessToken);
         *         return of(response.accessToken);
         *     }),
         *     catchError(error => {
         *         this.logout();
         *         return throwError(() => error);
         *     }),
         *     finalize(() => {
         *         this.isRefreshing = false;
         *     })
         * );
         */

        return throwError(() => new Error('Not implemented'));
    }

    setTokens(tokens: TokenPair): void {
        this.tokenPair.set(tokens);
    }

    logout(): void {
        this.tokenPair.set(null);
        // In real app: Clear storage, redirect to login
    }

    /**
     * Simulate login (for demo)
     */
    simulateLogin(expiresInSeconds = 10): void {
        const now = Math.floor(Date.now() / 1000);
        this.tokenPair.set({
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.DEMO_ACCESS_TOKEN',
            refreshToken: 'DEMO_REFRESH_TOKEN',
            expiresAt: now + expiresInSeconds
        });
    }

    getTokenInfo(): { token: string | null; expiresIn: number; isExpired: boolean } {
        const token = this.tokenPair();
        if (!token) {
            return { token: null, expiresIn: 0, isExpired: true };
        }
        const now = Math.floor(Date.now() / 1000);
        return {
            token: token.accessToken.substring(0, 50) + '...',
            expiresIn: Math.max(0, token.expiresAt - now),
            isExpired: this.isTokenExpired(0)
        };
    }
}

// ========================================
// AUTH INTERCEPTOR
// ========================================

/**
 * TODO: Implement the auth interceptor function
 * 
 * This interceptor should:
 * 1. Clone request with Authorization header if token exists
 * 2. Catch 401 errors
 * 3. If refresh token exists, attempt refresh
 * 4. Retry original request with new token
 * 5. If refresh fails, logout and throw error
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    /*
     * TODO: Implement feature logic here
     * 
     * const authService = inject(JwtAuthService);
     * const token = authService.getAccessToken();
     * 
     * // Clone request with auth header
     * let authReq = req;
     * if (token) {
     *     authReq = req.clone({
     *         setHeaders: {
     *             Authorization: 'Bearer ' + token
     *         }
     *     });
     * }
     * 
     * return next(authReq).pipe(
     *     catchError((error: HttpErrorResponse) => {
     *         if (error.status === 401 && authService.getRefreshToken()) {
     *             return authService.refreshTokens().pipe(
     *                 switchMap(newToken => {
     *                     const retryReq = req.clone({
     *                         setHeaders: {
     *                             Authorization: 'Bearer ' + newToken
     *                         }
     *                     });
     *                     return next(retryReq);
     *                 })
     *             );
     *         }
     *         return throwError(() => error);
     *     })
     * );
     */

    return next(req);
};

// ========================================
// DEMO COMPONENT
// ========================================

@Component({
    selector: 'app-scenario-jwt-refresh',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario-container">
            <h2>🔐 Scenario 2: JWT Token Refresh</h2>
            
            <div class="token-status">
                <h3>Token Status</h3>
                <div class="status-card" [class.expired]="tokenInfo.isExpired">
                    <div class="token-preview">
                        <span class="label">Access Token:</span>
                        <code>{{ tokenInfo.token || 'No token' }}</code>
                    </div>
                    <div class="token-meta">
                        <span class="expiry">
                            <span class="label">Expires in:</span>
                            <span class="value" [class.warning]="tokenInfo.expiresIn < 30">
                                {{ tokenInfo.expiresIn }}s
                            </span>
                        </span>
                        <span class="status-badge" [class.expired]="tokenInfo.isExpired">
                            {{ tokenInfo.isExpired ? '🔴 Expired' : '🟢 Valid' }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="actions">
                <h3>Actions</h3>
                <div class="button-group">
                    <button (click)="login(60)" class="login">Login (60s token)</button>
                    <button (click)="login(10)" class="login-short">Login (10s token)</button>
                    <button (click)="logout()" class="logout">Logout</button>
                </div>
                <div class="button-group">
                    <button (click)="makeApiCall()" class="api">Make API Call</button>
                    <button (click)="makeMultipleCalls()" class="api-multi">Make 5 Concurrent Calls</button>
                    <button (click)="simulateExpiredCall()" class="api-expired">Simulate 401 Error</button>
                </div>
            </div>

            <div class="request-log">
                <h3>Request Log</h3>
                <div class="log-entry" *ngFor="let log of requestLog">
                    <span class="time">{{ log.time | date:'HH:mm:ss' }}</span>
                    <span class="action">{{ log.action }}</span>
                    <span class="result" [class]="log.status">{{ log.status }}</span>
                </div>
                <div class="empty" *ngIf="requestLog.length === 0">
                    No requests yet
                </div>
            </div>

            <div class="implementation-notes">
                <h3>📝 Implementation Notes</h3>
                <ul>
                    <li>Token refresh should happen transparently</li>
                    <li>Multiple 401s should only trigger one refresh</li>
                    <li>Failed requests should be retried after refresh</li>
                    <li>User sees no interruption unless refresh fails</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 800px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        h3 { margin-top: 1.5rem; margin-bottom: 0.75rem; }
        
        .status-card { background: #f0fdf4; padding: 1rem; border-radius: 8px; border: 2px solid #10b981; }
        .status-card.expired { background: #fef2f2; border-color: #ef4444; }
        .token-preview { margin-bottom: 0.5rem; }
        .token-preview code { display: block; background: #1e1e2e; color: #a6e3a1; padding: 0.5rem; border-radius: 4px; margin-top: 0.25rem; font-size: 0.75rem; word-break: break-all; }
        .token-meta { display: flex; justify-content: space-between; align-items: center; }
        .label { font-weight: 500; font-size: 0.85rem; }
        .value { font-size: 1.5rem; font-weight: bold; }
        .value.warning { color: #f59e0b; }
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; }
        .status-badge.expired { background: #fee2e2; color: #dc2626; }
        
        .button-group { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
        button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; }
        .login { background: #10b981; color: white; }
        .login-short { background: #f59e0b; color: white; }
        .logout { background: #ef4444; color: white; }
        .api { background: #3b82f6; color: white; }
        .api-multi { background: #8b5cf6; color: white; }
        .api-expired { background: #6b7280; color: white; }
        
        .log-entry { display: flex; gap: 1rem; padding: 0.5rem; background: #f8fafc; border-radius: 4px; margin-bottom: 0.25rem; font-size: 0.85rem; }
        .time { font-family: monospace; color: #6b7280; }
        .action { flex: 1; }
        .result { padding: 0.125rem 0.5rem; border-radius: 4px; }
        .result.success { background: #dcfce7; color: #16a34a; }
        .result.error { background: #fee2e2; color: #dc2626; }
        .result.refreshing { background: #fef3c7; color: #b45309; }
        .empty { text-align: center; color: #9ca3af; padding: 1rem; }
        
        .implementation-notes { background: #eff6ff; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; }
        .implementation-notes ul { margin: 0; padding-left: 1.5rem; }
    `]
})
export class ScenarioJwtRefreshComponent {
    private authService = inject(JwtAuthService);

    tokenInfo = { token: null as string | null, expiresIn: 0, isExpired: true };
    requestLog: Array<{ time: Date; action: string; status: string }> = [];

    constructor() {
        // Update token info periodically
        setInterval(() => {
            this.tokenInfo = this.authService.getTokenInfo();
        }, 1000);
    }

    login(expiresIn: number): void {
        this.authService.simulateLogin(expiresIn);
        this.log('User logged in', 'success');
    }

    logout(): void {
        this.authService.logout();
        this.log('User logged out', 'success');
    }

    makeApiCall(): void {
        this.log('API call initiated', this.tokenInfo.isExpired ? 'error' : 'success');
    }

    makeMultipleCalls(): void {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.log(`Concurrent call ${i + 1}`, this.tokenInfo.isExpired ? 'refreshing' : 'success');
            }, i * 100);
        }
    }

    simulateExpiredCall(): void {
        this.log('401 received, attempting refresh...', 'refreshing');
    }

    private log(action: string, status: string): void {
        this.requestLog.unshift({ time: new Date(), action, status });
        if (this.requestLog.length > 10) {
            this.requestLog.pop();
        }
    }
}
