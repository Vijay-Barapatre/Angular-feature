# Exercise 1: MSAL Configuration

## 🎯 Objective

Configure MSAL (Microsoft Authentication Library) in a standalone Angular application.

## 📋 Scenario

You're building an enterprise application that needs Azure AD authentication. Set up MSAL for popup-based login.

## ✅ Requirements

- [ ] Install @azure/msal-angular and @azure/msal-browser
- [ ] Create MSAL configuration object
- [ ] Configure providers in app.config.ts
- [ ] Set correct redirect URI

## 💡 Hints

1. Client ID comes from Azure Portal > App registrations
2. Authority format: `https://login.microsoftonline.com/{tenant-id}`
3. Redirect URI must match Azure Portal settings
4. Use localStorage for token caching

## 🏁 Starting Point

```typescript
// msal.config.ts
export const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    authority: 'YOUR_AUTHORITY',
    redirectUri: 'http://localhost:4200'
  }
};
```
