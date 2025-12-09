# Exercise 2: Login/Logout Flows

## 🎯 Objective

Implement login and logout functionality using MSAL popup and redirect methods.

## ✅ Requirements

- [ ] Create AuthService with login/logout methods
- [ ] Support popup login for desktop
- [ ] Handle login success and set active account
- [ ] Implement logout with post-logout redirect

## 💻 Solution

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private msalService = inject(MsalService);
  
  login(): void {
    this.msalService.loginPopup().subscribe({
      next: (result) => {
        this.msalService.instance.setActiveAccount(result.account);
        console.log('Logged in:', result.account?.username);
      },
      error: (error) => console.error('Login failed:', error)
    });
  }
  
  logout(): void {
    this.msalService.logout({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
  
  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }
  
  getUser(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }
}
```
