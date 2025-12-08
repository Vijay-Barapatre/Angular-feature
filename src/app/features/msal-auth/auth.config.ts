/**
 * ============================================================================
 * MSAL CONFIGURATION
 * ============================================================================
 * Configure Microsoft Authentication Library for Azure AD
 * 
 * IMPORTANT: Replace placeholder values with your Azure AD app registration details:
 * - clientId: Your Application (client) ID
 * - authority: https://login.microsoftonline.com/{your-tenant-id}
 * - redirectUri: Your application's redirect URI
 */

import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import {
    IPublicClientApplication,
    PublicClientApplication,
    InteractionType,
    BrowserCacheLocation,
    LogLevel
} from '@azure/msal-browser';

// ============================================================================
// ENVIRONMENT CONFIGURATION
// Replace these with your Azure AD app registration values
// ============================================================================
export const msalConfig = {
    auth: {
        // 🔑 Your Azure AD Application (client) ID
        clientId: 'YOUR_CLIENT_ID_HERE',

        // 🏢 Your Azure AD Tenant ID or 'common' for multi-tenant
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID_HERE',

        // 🔗 Redirect URI (must match Azure AD app registration)
        redirectUri: 'http://localhost:4200',

        // 🚪 Post-logout redirect
        postLogoutRedirectUri: 'http://localhost:4200',

        // ✅ Navigate to original URL after login
        navigateToLoginRequestUrl: true
    },
    cache: {
        // 💾 Where to store tokens
        cacheLocation: BrowserCacheLocation.LocalStorage,

        // 🔒 Use cookies in iframe for SSO
        storeAuthStateInCookie: false
    },
    system: {
        // 📝 Logging level for debugging
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string) => {
                if (level === LogLevel.Error) {
                    console.error('[MSAL]', message);
                }
            },
            logLevel: LogLevel.Warning,
            piiLoggingEnabled: false
        }
    }
};

// ============================================================================
// PROTECTED RESOURCES
// Define which APIs require authentication and what scopes they need
// ============================================================================
export const protectedResources = {
    // Microsoft Graph API
    graphApi: {
        endpoint: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['user.read']
    },
    // Your custom API (example)
    customApi: {
        endpoint: 'https://your-api.azurewebsites.net/api',
        scopes: ['api://YOUR_API_CLIENT_ID/access_as_user']
    }
};

// ============================================================================
// LOGIN REQUEST CONFIGURATION
// ============================================================================
export const loginRequest = {
    scopes: ['user.read', 'openid', 'profile', 'email']
};

// ============================================================================
// MSAL INSTANCE FACTORY
// ============================================================================
export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication(msalConfig);
}

// ============================================================================
// MSAL GUARD CONFIGURATION
// Protects routes - redirects unauthenticated users to login
// ============================================================================
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest
    };
}

// ============================================================================
// MSAL INTERCEPTOR CONFIGURATION
// Automatically attaches tokens to HTTP requests for protected resources
// ============================================================================
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();

    // Add Microsoft Graph API
    protectedResourceMap.set(
        protectedResources.graphApi.endpoint,
        protectedResources.graphApi.scopes
    );

    // Add your custom API
    protectedResourceMap.set(
        protectedResources.customApi.endpoint,
        protectedResources.customApi.scopes
    );

    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap
    };
}
