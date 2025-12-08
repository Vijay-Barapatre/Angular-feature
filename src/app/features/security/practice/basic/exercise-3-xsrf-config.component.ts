/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: XSRF TOKEN CONFIGURATION
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Configure Angular's HttpClient with XSRF (CSRF) protection
 * and understand how the token flow works.
 * 
 * 📝 DESCRIPTION:
 * Your application needs to make secure API calls that are protected
 * against Cross-Site Request Forgery attacks. Configure the HttpClient
 * to automatically read XSRF tokens from cookies and attach them to requests.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. HttpClient reads XSRF-TOKEN from cookies
 * 2. Mutating requests (POST, PUT, DELETE) include X-XSRF-TOKEN header
 * 3. GET requests do NOT include the token (not needed)
 * 4. Display shows token status and request headers
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Complete the app.config.ts configuration
 * - Complete the makeSecureRequest method
 * - Implement token extraction from cookie
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// ========================================
// PART 1: APP CONFIG (Create this file)
// ========================================
/*
 * TODO: Create/update app.config.ts with XSRF configuration
 * 
 * File: src/app/app.config.ts
 * 
 * import { ApplicationConfig } from '@angular/core';
 * import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
 * 
 * export const appConfig: ApplicationConfig = {
 *     providers: [
 *         provideHttpClient(
 *             // TODO: Add XSRF configuration here
 *             // withXsrfConfiguration({
 *             //     cookieName: 'XSRF-TOKEN',
 *             //     headerName: 'X-XSRF-TOKEN'
 *             // })
 *         )
 *     ]
 * };
 */

@Component({
    selector: 'app-exercise-xsrf-config',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise-container">
            <h2>🔐 Exercise 3: XSRF Token Configuration</h2>
            
            <div class="info-section">
                <h3>📚 How XSRF Protection Works</h3>
                <div class="flow-diagram">
                    <div class="flow-step">
                        <span class="step-num">1</span>
                        <p>Server sets XSRF-TOKEN cookie</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <span class="step-num">2</span>
                        <p>Angular reads token from cookie</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <span class="step-num">3</span>
                        <p>Token added to request header</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <span class="step-num">4</span>
                        <p>Server validates header = cookie</p>
                    </div>
                </div>
            </div>

            <div class="token-section">
                <h3>🍪 Current Token Status</h3>
                <div class="token-display">
                    <span class="label">XSRF-TOKEN:</span>
                    <code>{{ currentToken || 'Not found in cookies' }}</code>
                </div>
                <button (click)="simulateSetToken()">Simulate: Set Token Cookie</button>
            </div>

            <div class="request-section">
                <h3>📤 Test Requests</h3>
                <div class="button-group">
                    <button (click)="makeRequest('GET')" class="safe">GET (No Token)</button>
                    <button (click)="makeRequest('POST')" class="protected">POST (With Token)</button>
                    <button (click)="makeRequest('PUT')" class="protected">PUT (With Token)</button>
                    <button (click)="makeRequest('DELETE')" class="protected">DELETE (With Token)</button>
                </div>
            </div>

            <div class="log-section" *ngIf="requestLog.length > 0">
                <h3>📋 Request Log</h3>
                <div class="log-entry" *ngFor="let log of requestLog">
                    <span class="method" [class]="log.method.toLowerCase()">{{ log.method }}</span>
                    <span class="url">{{ log.url }}</span>
                    <span class="token-status" [class.has-token]="log.hasToken">
                        {{ log.hasToken ? '🔐 Token Attached' : '🔓 No Token' }}
                    </span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 800px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 0.5rem; }
        h3 { margin-top: 1.5rem; }
        
        .flow-diagram { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .flow-step { background: white; padding: 0.75rem; border-radius: 6px; text-align: center; min-width: 120px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .flow-step .step-num { display: block; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; margin: 0 auto 0.5rem; line-height: 24px; font-size: 0.75rem; }
        .flow-step p { margin: 0; font-size: 0.8rem; }
        .flow-arrow { color: #10b981; font-size: 1.25rem; }
        
        .token-display { padding: 1rem; background: #1e1e2e; border-radius: 6px; margin-bottom: 1rem; }
        .token-display .label { color: #a6e3a1; margin-right: 0.5rem; }
        .token-display code { color: #f9e2af; word-break: break-all; }
        
        .button-group { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; }
        button.safe { background: #3b82f6; color: white; }
        button.protected { background: #10b981; color: white; }
        
        .log-section { margin-top: 1.5rem; }
        .log-entry { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .method { padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 0.75rem; color: white; }
        .method.get { background: #3b82f6; }
        .method.post { background: #10b981; }
        .method.put { background: #f59e0b; }
        .method.delete { background: #ef4444; }
        .url { flex: 1; font-family: monospace; font-size: 0.85rem; }
        .token-status { font-size: 0.8rem; }
        .token-status.has-token { color: #10b981; }
    `]
})
export class ExerciseXsrfConfigComponent {
    private http = inject(HttpClient);

    currentToken: string | null = null;
    requestLog: Array<{ method: string; url: string; hasToken: boolean }> = [];

    constructor() {
        this.readTokenFromCookie();
    }

    /**
     * TODO: Implement cookie reading
     * 
     * Read the XSRF-TOKEN value from document.cookie
     * Cookie format: "name1=value1; name2=value2; ..."
     */
    readTokenFromCookie(): void {
        // TODO: Write your logic here
        // HINT: 
        // 1. Get document.cookie
        // 2. Split by '; '
        // 3. Find the cookie named 'XSRF-TOKEN'
        // 4. Extract its value

        // const cookies = document.cookie.split('; ');
        // const xsrfCookie = cookies.find(c => c.startsWith('XSRF-TOKEN='));
        // this.currentToken = xsrfCookie ? xsrfCookie.split('=')[1] : null;
    }

    /**
     * Simulate server setting the XSRF token cookie
     */
    simulateSetToken(): void {
        const token = this.generateToken();
        document.cookie = `XSRF-TOKEN=${token}; path=/`;
        this.currentToken = token;
    }

    /**
     * TODO: Implement request method
     * 
     * For mutating methods (POST, PUT, DELETE):
     * - Angular's XSRF interceptor automatically adds the token
     * - Log that token will be attached
     * 
     * For GET:
     * - No token needed
     * - Log that no token attached
     */
    makeRequest(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): void {
        const url = '/api/secure-endpoint';

        // TODO: Write your logic here
        // Determine if this request type needs XSRF token
        // const needsToken = method !== 'GET';

        // Log the request
        // this.requestLog.unshift({
        //     method,
        //     url,
        //     hasToken: needsToken && !!this.currentToken
        // });

        // Make the actual request (will fail without backend, that's okay)
        // try {
        //     if (method === 'GET') {
        //         this.http.get(url).subscribe();
        //     } else if (method === 'POST') {
        //         this.http.post(url, {}).subscribe();
        //     }
        //     // ... etc
        // } catch (e) {}
    }

    private generateToken(): string {
        return Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
}
