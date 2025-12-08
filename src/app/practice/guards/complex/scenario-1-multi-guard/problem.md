# Scenario 1: Multi-Guard Chain

## 🎯 Objective

Combine multiple guards on a single route that execute in sequence.

## 📋 Scenario

An admin settings page requires three levels of checks:
1. User must be authenticated
2. User must have admin role
3. User must have an active subscription

All guards must pass for navigation to succeed.

## ✅ Requirements

- [ ] Create three separate guards (auth, role, subscription)
- [ ] Apply all guards to a single route
- [ ] Guards execute in array order
- [ ] First failing guard stops the chain
- [ ] Each guard can redirect to different pages

## 🔄 Expected Behavior

| Guard Results | Navigation |
|---------------|------------|
| ✅ ✅ ✅ | Allowed |
| ❌ - - | Redirect to login |
| ✅ ❌ - | Redirect to access-denied |
| ✅ ✅ ❌ | Redirect to upgrade |

## 💡 Key Concepts

- Guards run in array order (left to right)
- First `false` or `UrlTree` stops the chain
- Remaining guards are NOT executed
- Each guard is independent and focused
