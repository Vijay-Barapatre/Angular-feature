# Scenario 7: Type-ahead Search

## 🎯 Problem Statement

You are building a **search-as-you-type** feature (like Google Search or GitHub's code search). The challenge is to make it efficient:

1. **Don't search on every keystroke** - wasteful API calls
2. **Cancel previous requests** when user types more
3. **Don't search duplicate terms** - avoid redundant calls
4. **Handle the loading state** properly

## 📋 Requirements

### Functional Requirements
- Search input field
- Show results as user types
- Display efficiency stats (keystrokes vs actual API calls)
- Show request log for debugging

### Technical Requirements
- Use `debounceTime` to wait for user to stop typing
- Use `distinctUntilChanged` to avoid duplicate searches
- Use `switchMap` to cancel previous pending requests
- Minimum 2 characters before searching

## 🔗 The Problem

```
Without optimization (user types "laptop"):
l → API call ❌
la → API call ❌
lap → API call ❌
lapt → API call ❌
lapto → API call ❌
laptop → API call ❌

Result: 6 API calls! 😱
Most return stale data that's immediately replaced.
```

```
With optimization:
l → (wait...)
la → (wait...)
lap → (wait...)
lapt → (wait...)
lapto → (wait...)
laptop → (300ms pause) → API call ✅

Result: 1 API call! 🎉
```

## 💡 Hints

1. Create a `Subject<string>` for search terms
2. Push to Subject on every keystroke
3. Pipe through: `debounceTime` → `distinctUntilChanged` → `switchMap`
4. Subscribe once in `ngOnInit`

## ⚠️ Common Mistakes

- Calling HTTP directly in the input handler (no debounce)
- Using `mergeMap` instead of `switchMap` (doesn't cancel previous)
- Forgetting `distinctUntilChanged` (duplicate searches)
- Not minimum length check (searching for "a")
- Memory leaks (not unsubscribing)

## 📊 Expected Behavior

```
User types: "laptop" (6 keystrokes)

┌─────────────────────────────────────────┐
│ 🔍 [laptop________________]             │
├─────────────────────────────────────────┤
│ 📊 Efficiency Stats                     │
│ Total Keystrokes: 6                     │
│ Actual API Calls: 1                     │
│ Cancelled Requests: 0                   │
│ Bandwidth Saved: 83%                    │
├─────────────────────────────────────────┤
│ 📦 Results (3)                          │
│ • Gaming Laptop - Electronics           │
│ • Laptop Stand - Accessories            │
│ • Laptop Bag - Bags                     │
└─────────────────────────────────────────┘
```

## 🧠 Key Operators

```
debounceTime(300)
├─ Waits 300ms after last emission
└─ Only emits if user stopped typing

distinctUntilChanged()
├─ Compares current value to previous
└─ Only emits if value changed

switchMap(term => search(term))
├─ Subscribes to inner Observable
├─ UNSUBSCRIBES from previous inner Observable
└─ Only latest request completes
```
