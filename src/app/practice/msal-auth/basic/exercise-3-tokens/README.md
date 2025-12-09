# Exercise 3: Token Acquisition

## 🎯 Objective

Acquire access tokens for API calls using silent and interactive methods.

## ✅ Requirements

- [ ] Use acquireTokenSilent for cached tokens
- [ ] Handle InteractionRequiredAuthError
- [ ] Extract access token for API calls

## 💻 Solution

```typescript
async getToken(scopes: string[]): Promise<string> {
  const account = this.msalService.instance.getActiveAccount();
  if (!account) throw new Error('No active account');
  
  try {
    const result = await this.msalService.instance.acquireTokenSilent({
      account,
      scopes
    });
    return result.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const result = await this.msalService.instance.acquireTokenPopup({ scopes });
      return result.accessToken;
    }
    throw error;
  }
}
```
