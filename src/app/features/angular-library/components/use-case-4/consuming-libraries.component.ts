/**
 * ============================================================================
 * USE CASE 4: CONSUMING LIBRARIES
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-consuming-libraries',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📥 Consuming Libraries</h1>
                <p class="subtitle">Install, Import & Use</p>
            </header>

            <section class="install-section">
                <h2>📦 Installing a Library</h2>
                <pre class="code terminal"><code># From npm
npm install &#64;myorg/ui-kit

# Specific version
npm install &#64;myorg/ui-kit&#64;1.2.0

# From GitHub Packages
npm install &#64;myorg/ui-kit --registry=https://npm.pkg.github.com

# Local development (npm link)
cd dist/my-ui-kit && npm link
cd ../my-app && npm link &#64;myorg/ui-kit</code></pre>
            </section>

            <section class="import-section">
                <h2>📝 Importing Components (Standalone)</h2>
                <pre class="code"><code>// app.component.ts
import {{ '{' }} Component {{ '}' }} from '&#64;angular/core';
import {{ '{' }} ButtonComponent {{ '}' }} from '&#64;myorg/ui-kit';  // 🛡️ Direct import

&#64;Component({{ '{' }}
    selector: 'app-root',
    standalone: true,
    imports: [
        ButtonComponent  // 🛡️ Import in component
    ],
    template: &#96;
        &lt;ui-button variant="primary"&gt;
            Click Me!
        &lt;/ui-button&gt;
    &#96;
{{ '}' }})
export class AppComponent {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="service-section">
                <h2>⚙️ Using Library Services</h2>
                <pre class="code"><code>// feature.component.ts
import {{ '{' }} Component, inject {{ '}' }} from '&#64;angular/core';
import {{ '{' }} NotificationService {{ '}' }} from '&#64;myorg/ui-kit';

&#64;Component({{ '{' }}
    selector: 'app-feature',
    standalone: true,
    template: &#96;
        &lt;button (click)="showNotification()"&gt;
            Show Notification
        &lt;/button&gt;
    &#96;
{{ '}' }})
export class FeatureComponent {{ '{' }}
    // 🛡️ Services with providedIn: 'root' are automatically available
    private notificationService = inject(NotificationService);

    showNotification() {{ '{' }}
        this.notificationService.show('Hello from library!', 'success');
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="module-section">
                <h2>📦 NgModule-based Import (Legacy)</h2>
                <pre class="code"><code>// app.module.ts
import {{ '{' }} NgModule {{ '}' }} from '&#64;angular/core';
import {{ '{' }} MyUiKitModule {{ '}' }} from '&#64;myorg/ui-kit';

&#64;NgModule({{ '{' }}
    imports: [
        MyUiKitModule  // Import the entire module
    ]
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="config-section">
                <h2>⚙️ Configuring Library Providers</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} ApplicationConfig {{ '}' }} from '&#64;angular/core';
import {{ '{' }} provideUiKit {{ '}' }} from '&#64;myorg/ui-kit';

export const appConfig: ApplicationConfig = {{ '{' }}
    providers: [
        // Library provides a configuration function
        provideUiKit({{ '{' }}
            theme: 'dark',
            defaultButtonVariant: 'primary'
        {{ '}' }})
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="types-section">
                <h2>📝 Using Exported Types</h2>
                <pre class="code"><code>// Using interfaces from library
import {{ '{' }}
    ButtonVariant,
    Notification,
    ThemeConfig
{{ '}' }} from '&#64;myorg/ui-kit';

// Now you have type safety!
const variant: ButtonVariant = 'primary';

const notification: Notification = {{ '{' }}
    id: 1,
    message: 'Hello',
    type: 'success'
{{ '}' }};</code></pre>
            </section>

            <section class="troubleshooting">
                <h2>🔧 Troubleshooting</h2>
                <table>
                    <tr><th>Error</th><th>Solution</th></tr>
                    <tr>
                        <td>Cannot find module</td>
                        <td>Check package is installed, check import path</td>
                    </tr>
                    <tr>
                        <td>NullInjectorError</td>
                        <td>Service not exported or wrong providedIn scope</td>
                    </tr>
                    <tr>
                        <td>Unknown element</td>
                        <td>Component not imported in standalone imports</td>
                    </tr>
                    <tr>
                        <td>Version mismatch</td>
                        <td>Check peerDependencies match your Angular version</td>
                    </tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; margin: 0.5rem 0; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        section { margin-bottom: 2rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class ConsumingLibrariesComponent { }
