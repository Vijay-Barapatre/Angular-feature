# Use Case 5: canLoad Guard

![Advanced Guards Architecture](guards-advanced-architecture.png)

## 1. 🔍 How It Works

`canLoad` prevents a lazy-loaded module from being **downloaded** at all. If it returns false, the module code is never fetched from the server.

## 🆚 canLoad vs canActivate

| Aspect | canActivate | canLoad |
|--------|-------------|---------|
| **When it runs** | After module downloads | Before module downloads |
| **If blocked** | Module code already in browser | Module code never fetched |
| **Network request** | Module is downloaded | No network request |
| **Security** | Code visible in DevTools | Code stays on server |
| **Best for** | Route-level access | Feature-level access |

## 💡 Real-World Use Cases

1. **Subscription Features** - Don't download premium code for free users
2. **Admin Modules** - Keep admin code hidden from regular users
3. **Feature Flags** - Don't load disabled feature modules
4. **Bandwidth Optimization** - Reduce initial download size

## 📝 Implementation

### 1. Create the Guard

```typescript
// can-load.guard.ts
import { inject } from '@angular/core';
import { CanLoadFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const premiumLoadGuard: CanLoadFn = (route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (!authService.isPremium()) {
        // Option 1: Just block (return false)
        return false;
        
        // Option 2: Redirect
        return router.createUrlTree(['/upgrade']);
    }
    
    return true;  // Allow module to load
};
```

### 2. Apply to Lazy-Loaded Route

```typescript
// app.routes.ts
{
    path: 'premium-features',
    canLoad: [premiumLoadGuard],  // Checked BEFORE download
    loadChildren: () => import('./premium/premium.routes')
}
```

## ⚠️ Important Notes

1. **Only works with lazy loading** - Eager-loaded modules are already bundled
2. **One-time check** - Once loaded, module stays in memory
3. **Use with loadChildren** - Not with loadComponent
4. **Combine with canActivate** - For route-level checks after loading

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  canLoad: PREVENT MODULE DOWNLOAD                           │
│                                                             │
│   Free User navigates to: /premium-features                 │
│                                                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │  🔐 canLoad GUARD (Before Download)                   │ │
│   │                                                       │ │
│   │  export const premiumLoadGuard: CanLoadFn = () => {   │ │
│   │    return authService.isPremium();                    │ │
│   │  };                                                   │ │
│   │                                                       │ │
│   │  isPremium() → false                                  │ │
│   └───────────────────────────────────────────────────────┘ │
│          │                                                  │
│          ▼                                                  │
│   ┌──────────────────────┬────────────────────────────────┐ │
│   │   true (Premium)     │      false (Free)              │ │
│   │        │             │           │                    │ │
│   │        ▼             │           ▼                    │ │
│   │   ┌──────────┐       │      ┌──────────┐              │ │
│   │   │📥 DOWNLOAD│       │      │🚫 BLOCKED│              │ │
│   │   │   │       │       │      │          │              │ │
│   │   │   ▼       │       │      │ Module   │              │ │
│   │   │ premium.  │       │      │ NEVER    │              │ │
│   │   │ module.ts │       │      │ downloads│              │ │
│   │   │ (100KB)   │       │      │          │              │ │
│   │   └──────────┘       │      └──────────┘              │ │
│   │                      │                                │ │
│   │  Code in browser ✅   │    Code stays on server 🔐    │ │
│   └──────────────────────┴────────────────────────────────┘ │
│                                                             │
│   vs canActivate (module already downloaded):               │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ 📥 Module downloads → 🚫 Access blocked at route      │ │
│   │ Premium code is IN browser (visible in DevTools!)     │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: canLoad = "Should I even download this?" guard. Code never leaves server for unauthorized users!

---

## 🔐 Security Consideration

`canLoad` provides **code obfuscation**, not true security:
- Premium features code is never sent to free users
- But server-side validation is still required
- API endpoints must verify permissions independently

---

## 🔐 Treasure Vault Analogy (Easy to Remember!)

Think of canLoad like a **treasure vault**:

| Concept | Vault Analogy | Memory Trick |
|---------|---------------|--------------| 
| **canLoad** | 🔐 **Vault door**: Don't even reveal what's inside | **"Don't download"** |
| **canActivate** | 🚪 **Room door**: Vault visible but locked | **"Don't access"** |
| **Lazy module** | 💎 **Treasure**: Premium code/features | **"Valuable content"** |
| **Free user** | 👀 **Window shopper**: Can't see inside vault | **"No code sent"** |
| **Premium user** | 🔑 **Key holder**: Vault opens, treasure visible | **"Code downloaded"** |

### 📖 Story to Remember:

> 🔐 **The Museum Vault**
>
> Your app is a museum with treasures:
>
> **canActivate (Regular Room):**
> ```
> Visitor walks into exhibit 🚶
> Sees "Premium" rope barrier 🚧
> Can SEE the artifacts already there 👀
> But can't TOUCH (access denied) 🚫
> 
> → Code is IN browser, just blocked!
> ```
>
> **canLoad (Secret Vault):**
> ```
> Visitor doesn't know vault exists 🤔
> No door visible to non-members 🔐
> Artifacts never leave the vault 💎
> Premium members get vault key 🔑
> 
> → Code stays on SERVER until authorized!
> ```

### 🎯 Quick Reference:
```
🔐 canLoad       = Vault (code never sent)
🚪 canActivate   = Room door (code sent, access blocked)
💎 Lazy module   = Treasure (premium features)
👀 Free user     = Doesn't even know vault exists
🔑 Premium       = Has the key
```
