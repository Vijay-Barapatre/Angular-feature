/**
 * ============================================================================
 * USE CASE 5: USER PROFILE
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>👤 User Profile</h1>
                <p class="subtitle">Get User Info from Microsoft Graph</p>
            </header>

            <section class="concept-section">
                <h2>Microsoft Graph API</h2>
                <p>
                    Microsoft Graph is the gateway to data in Microsoft 365.
                    Use it to get user profile info, photo, emails, calendar, and more.
                </p>
            </section>

            <section class="endpoints-section">
                <h2>📋 Common Endpoints</h2>
                <table>
                    <tr><th>Endpoint</th><th>Returns</th><th>Scope</th></tr>
                    <tr><td>/me</td><td>User profile</td><td>user.read</td></tr>
                    <tr><td>/me/photo/$value</td><td>Profile photo</td><td>user.read</td></tr>
                    <tr><td>/me/messages</td><td>Emails</td><td>mail.read</td></tr>
                    <tr><td>/me/events</td><td>Calendar events</td><td>calendars.read</td></tr>
                </table>
            </section>

            <section class="service-section">
                <h2>💻 Profile Service</h2>
                <pre class="code"><code>// profile.service.ts
import {{ '{' }} Injectable, inject {{ '}' }} from '&#64;angular/core';
import {{ '{' }} HttpClient {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} Observable {{ '}' }} from 'rxjs';

export interface GraphProfile {{ '{' }}
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    mail: string;
    userPrincipalName: string;
    jobTitle: string;
    officeLocation: string;
{{ '}' }}

&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class ProfileService {{ '{' }}
    private http = inject(HttpClient);
    private graphUrl = 'https://graph.microsoft.com/v1.0';

    getProfile(): Observable&lt;GraphProfile&gt; {{ '{' }}
        return this.http.get&lt;GraphProfile&gt;(this.graphUrl + '/me');
    {{ '}' }}

    getPhoto(): Observable&lt;Blob&gt; {{ '{' }}
        return this.http.get(this.graphUrl + '/me/photo/$value', {{ '{' }}
            responseType: 'blob'
        {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="component-section">
                <h2>💻 Profile Component</h2>
                <pre class="code"><code>// profile.component.ts
&#64;Component({{ '{' }}
    selector: 'app-profile',
    template: &#96;
        &#64;if (profile$ | async; as profile) {{ '{' }}
            &lt;div class="profile-card"&gt;
                &lt;img [src]="photoUrl" alt="Profile"&gt;
                &lt;h2&gt;{{ '{{' }} profile.displayName {{ '}}' }}&lt;/h2&gt;
                &lt;p&gt;{{ '{{' }} profile.mail {{ '}}' }}&lt;/p&gt;
                &lt;p&gt;{{ '{{' }} profile.jobTitle {{ '}}' }}&lt;/p&gt;
            &lt;/div&gt;
        {{ '}' }}
    &#96;
{{ '}' }})
export class ProfileComponent implements OnInit {{ '{' }}
    private profileService = inject(ProfileService);
    
    profile$ = this.profileService.getProfile();
    photoUrl = '';

    ngOnInit() {{ '{' }}
        this.profileService.getPhoto().subscribe(blob => {{ '{' }}
            this.photoUrl = URL.createObjectURL(blob);
        {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="scopes-section">
                <h2>🔑 Required Scopes</h2>
                <pre class="code"><code>// auth.config.ts
export const loginRequest = {{ '{' }}
    scopes: [
        'user.read',        // Basic profile
        'mail.read',        // Emails (optional)
        'calendars.read'    // Calendar (optional)
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="demo-section">
                <h2>📋 Sample Response</h2>
                <pre class="code json"><code>{{ '{' }}
  "id": "abc123...",
  "displayName": "John Doe",
  "givenName": "John",
  "surname": "Doe",
  "mail": "john.doe&#64;company.com",
  "userPrincipalName": "john.doe&#64;company.onmicrosoft.com",
  "jobTitle": "Software Engineer",
  "officeLocation": "Building A"
{{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #0078d4; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; margin: 0.5rem 0; }
        .code.json { color: #f9e2af; }

        section { margin-bottom: 2rem; }

        table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #0078d4; }
    `]
})
export class UserProfileComponent { }
